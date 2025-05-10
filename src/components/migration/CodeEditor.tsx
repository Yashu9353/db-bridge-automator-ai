
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

// Simulated syntax errors for demonstration
const sampleErrors = [
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
];

const CodeEditor = ({ sourceCode = sampleSourceCode, targetCode = sampleTargetCode }: EditorProps) => {
  const [source, setSource] = useState(sourceCode);
  const [target, setTarget] = useState(targetCode);
  const [errors, setErrors] = useState(sampleErrors);
  const [activeTab, setActiveTab] = useState<"source" | "target">("source");
  
  useEffect(() => {
    // Simulate syntax highlighting by replacing with the actual implementation
    // In a real app, we would use a library like Prism.js, Monaco Editor, or CodeMirror
  }, [source, target]);
  
  const sourceLines = source.split('\n');
  const targetLines = target.split('\n');
  
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
              {sourceLines.map((line, i) => {
                const lineErrors = errors.filter(e => e.line === i + 1);
                return (
                  <div key={i} className="leading-6 relative group">
                    <div
                      className={cn(
                        "whitespace-pre",
                        lineErrors.length > 0 && (
                          lineErrors.some(e => e.severity === "error")
                            ? "bg-red-50"
                            : "bg-yellow-50"
                        )
                      )}
                    >
                      {line || ' '}
                    </div>
                    {lineErrors.map((error, errorIndex) => (
                      <div 
                        key={errorIndex}
                        className="hidden group-hover:block absolute -right-4 top-0 transform translate-x-full bg-white shadow-lg border border-carbon-gray-20 p-3 z-10 w-64"
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
                    ))}
                  </div>
                );
              })}
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
              {targetLines.map((line, i) => (
                <div key={i} className="leading-6 whitespace-pre">
                  {line || ' '}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-carbon-gray-20 p-3 flex items-center justify-between bg-carbon-gray-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-carbon-success" />
            <span className="text-sm">2 successful conversions</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-carbon-warning" />
            <span className="text-sm">1 warning</span>
          </div>
          <div className="flex items-center gap-2">
            <X size={16} className="text-carbon-error" />
            <span className="text-sm">1 error</span>
          </div>
        </div>
        <div>
          <Button 
            type="button" 
            className="carbon-button-primary mr-2"
            onClick={() => {
              console.log("Running conversion");
            }}
          >
            Run Conversion
          </Button>
          <Button 
            type="button" 
            className="carbon-button-secondary"
            onClick={() => {
              console.log("Downloading target code");
            }}
          >
            Download Result
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
