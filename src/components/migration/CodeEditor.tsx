
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, X, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { convertSqlSyntax, downloadSqlFile } from "@/services/databaseService";

type EditorProps = {
  sourceCode?: string;
  targetCode?: string;
};

const sampleSourceCode = `-- Teradata sample query
SELECT 
  a.customer_id,
  a.customer_name,
  b.order_id,
  b.order_date,
  b.order_amount
FROM customer_db.customers a
INNER JOIN order_db.orders b
ON a.customer_id = b.customer_id
WHERE b.order_date BETWEEN DATE '2023-01-01' AND DATE '2023-12-31'
QUALIFY ROW_NUMBER() OVER (PARTITION BY a.customer_id ORDER BY b.order_date DESC) = 1;`;

const sampleTargetCode = `-- IBM Db2 converted query
SELECT 
  a.customer_id,
  a.customer_name,
  b.order_id,
  b.order_date,
  b.order_amount
FROM customer_db.customers a
INNER JOIN order_db.orders b
ON a.customer_id = b.customer_id
WHERE b.order_date BETWEEN DATE('2023-01-01') AND DATE('2023-12-31')
AND (
  SELECT COUNT(*) 
  FROM order_db.orders b2 
  WHERE b2.customer_id = a.customer_id 
  AND (b2.order_date > b.order_date OR 
      (b2.order_date = b.order_date AND b2.order_id > b.order_id))
) = 0;`;

const CodeEditor = ({ sourceCode = sampleSourceCode, targetCode = sampleTargetCode }: EditorProps) => {
  const [source, setSource] = useState(sourceCode);
  const [target, setTarget] = useState(targetCode);
  const [errors, setErrors] = useState<Array<{
    line: number;
    message: string;
    severity: 'warning' | 'error';
    solution?: string;
  }>>([]);
  const [activeTab, setActiveTab] = useState<"source" | "target">("source");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionStats, setConversionStats] = useState({
    successCount: 2,
    warningCount: 1,
    errorCount: 1,
  });
  
  useEffect(() => {
    // Initialize with some sample errors
    setErrors([
      {
        line: 8,
        message: "Table 'order_db.orders' may require schema qualification in Db2",
        severity: "warning",
        solution: "Check if the schema 'order_db' exists in the target database"
      },
      {
        line: 10,
        message: "QUALIFY is not supported in IBM Db2 syntax",
        severity: "error",
        solution: "Use subquery with ROW_NUMBER() function instead"
      }
    ]);
  }, []);
  
  const sourceLines = source.split('\n');
  const targetLines = target.split('\n');
  
  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSource(e.target.value);
    // In a real app, we would debounce this and send to backend for syntax checking
  };

  const handleRunConversion = async () => {
    setIsConverting(true);
    
    try {
      // Call our simulated backend service
      const result = await convertSqlSyntax(source, 'teradata', 'db2');
      
      // Update the state with conversion results
      setTarget(result.targetCode);
      setErrors(result.issues);
      setConversionStats({
        successCount: result.successCount,
        warningCount: result.warningCount,
        errorCount: result.errorCount,
      });
      
      toast({
        title: "Conversion completed",
        description: `${result.successCount} SQL statements converted successfully`,
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "An error occurred during SQL conversion",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    downloadSqlFile(target, "converted-db2-script.sql");
    toast({
      title: "Download started",
      description: "Your converted SQL script is being downloaded",
    });
  };
  
  return (
    <div className="border border-carbon-gray-20">
      <div className="flex border-b border-carbon-gray-20">
        <button
          className={cn(
            "px-4 py-2 font-medium text-sm border-b-2",
            activeTab === "source"
              ? "border-carbon-blue text-carbon-blue"
              : "border-transparent text-carbon-gray-60 hover:text-carbon-gray-100"
          )}
          onClick={() => setActiveTab("source")}
        >
          Source Code
        </button>
        <button
          className={cn(
            "px-4 py-2 font-medium text-sm border-b-2",
            activeTab === "target"
              ? "border-carbon-blue text-carbon-blue"
              : "border-transparent text-carbon-gray-60 hover:text-carbon-gray-100"
          )}
          onClick={() => setActiveTab("target")}
        >
          Target Code
        </button>
      </div>
      
      <div className="flex h-[500px] overflow-hidden">
        <div className="w-1/2 overflow-auto border-r border-carbon-gray-20">
          <div className="flex">
            <div className="bg-carbon-gray-10 text-carbon-gray-60 p-2 text-right select-none w-12">
              {sourceLines.map((_, i) => (
                <div key={i} className="leading-6 text-xs">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="p-2 flex-1 font-mono text-sm relative">
              <textarea 
                className="w-full h-full resize-none border-0 bg-transparent p-0 font-mono text-sm focus:outline-none focus:ring-0"
                value={source}
                onChange={handleSourceChange}
                spellCheck={false}
                style={{ lineHeight: "1.5rem" }}
              />
              
              {/* Overlay for error indicators */}
              <div className="absolute top-2 left-2 right-2 bottom-2 pointer-events-none">
                {errors.map((error, idx) => {
                  const line = error.line - 1;
                  if (line >= 0 && line < sourceLines.length) {
                    return (
                      <div 
                        key={idx}
                        className={cn(
                          "absolute left-0 right-0",
                          error.severity === "error" ? "bg-red-50" : "bg-yellow-50"
                        )}
                        style={{ 
                          top: `${line * 1.5}rem`, 
                          height: "1.5rem",
                          opacity: 0.5
                        }}
                      >
                        <div className="group relative h-full">
                          <div 
                            className="hidden group-hover:block absolute right-0 top-0 transform translate-y-4 z-10 w-64 bg-white shadow-lg border border-carbon-gray-20 p-3"
                          >
                            <div className="flex items-start gap-2">
                              {error.severity === "error" ? (
                                <X size={16} className="text-carbon-error mt-0.5" />
                              ) : (
                                <AlertTriangle size={16} className="text-carbon-warning mt-0.5" />
                              )}
                              <div>
                                <p className={error.severity === "error" ? "text-carbon-error font-medium" : "text-carbon-warning font-medium"}>
                                  {error.severity === "error" ? "Error" : "Warning"}
                                </p>
                                <p className="text-sm text-carbon-gray-70 mt-1">{error.message}</p>
                                {error.solution && (
                                  <p className="text-sm text-carbon-blue mt-1">Suggestion: {error.solution}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-1/2 overflow-auto">
          <div className="flex">
            <div className="bg-carbon-gray-10 text-carbon-gray-60 p-2 text-right select-none w-12">
              {targetLines.map((_, i) => (
                <div key={i} className="leading-6 text-xs">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="p-2 flex-1 font-mono text-sm">
              <pre className="whitespace-pre-wrap">{target}</pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-carbon-gray-20 p-3 flex items-center justify-between bg-carbon-gray-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-carbon-success" />
            <span className="text-sm">{conversionStats.successCount} successful conversions</span>
          </div>
          {conversionStats.warningCount > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-carbon-warning" />
              <span className="text-sm">{conversionStats.warningCount} warning{conversionStats.warningCount !== 1 ? 's' : ''}</span>
            </div>
          )}
          {conversionStats.errorCount > 0 && (
            <div className="flex items-center gap-2">
              <X size={16} className="text-carbon-error" />
              <span className="text-sm">{conversionStats.errorCount} error{conversionStats.errorCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        <div>
          <Button 
            type="button" 
            className="carbon-button-primary mr-2"
            disabled={isConverting}
            onClick={handleRunConversion}
          >
            {isConverting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Converting...
              </>
            ) : "Run Conversion"}
          </Button>
          <Button 
            type="button" 
            className="carbon-button-secondary"
            onClick={handleDownload}
          >
            <Download size={16} className="mr-2" />
            Download Result
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
