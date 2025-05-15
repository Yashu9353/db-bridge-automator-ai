
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import CodeEditor from "@/components/migration/CodeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { toast } from "sonner";
import { downloadSqlFile } from "@/services/databaseService";

const ConversionEditor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversionIssues, setConversionIssues] = useState<Array<{
    line: number;
    message: string;
    severity: 'warning' | 'error';
    solution?: string;
  }>>([
    {
      line: 8,
      message: "Table references may require schema qualification in Db2",
      severity: "warning",
      solution: "Check schema names in target database"
    },
    {
      line: 10,
      message: "QUALIFY is not supported in IBM Db2 syntax",
      severity: "error",
      solution: "Use subquery with ROW_NUMBER() function instead"
    }
  ]);

  const handleRunMigration = () => {
    setIsProcessing(true);
    
    // Simulate migration process
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Migration completed successfully", {
        description: "SQL conversion has been applied to all scripts"
      });
    }, 3000);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-carbon-gray-100">SQL Conversion</h1>
            <p className="text-carbon-gray-70 mt-1">
              View and edit your converted SQL code
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              className="carbon-button-secondary"
              onClick={() => {
                const sampleCode = "-- Converted IBM Db2 script\nSELECT * FROM schema.table\nWHERE date BETWEEN DATE('2023-01-01') AND DATE('2023-12-31')";
                downloadSqlFile(sampleCode, "converted_script.sql");
                toast.success("Download started", {
                  description: "Your converted SQL script is being downloaded"
                });
              }}
            >
              <Download size={16} className="mr-2" />
              Download Scripts
            </Button>
            
            <Button 
              className="carbon-button-primary"
              disabled={isProcessing}
              onClick={handleRunMigration}
            >
              {isProcessing ? "Processing..." : (
                <>
                  Run Migration
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="editor">
          <TabsList className="carbon-tabs border-none">
            <TabsTrigger value="editor" className="carbon-tab-selected">
              Code Editor
            </TabsTrigger>
            <TabsTrigger value="issues" className="carbon-tab-unselected">
              Issues & Feedback
            </TabsTrigger>
            <TabsTrigger value="visual" className="carbon-tab-unselected">
              Visual Comparison
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="pt-4">
            <CodeEditor />
          </TabsContent>
          
          <TabsContent value="issues" className="pt-4">
            <div className="border border-carbon-gray-20">
              <div className="border-b border-carbon-gray-20 bg-carbon-gray-10 px-4 py-3">
                <h3 className="font-medium">Conversion Issues</h3>
              </div>
              <div className="divide-y divide-carbon-gray-20">
                {conversionIssues.map((issue, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                        issue.severity === 'error' ? 'bg-carbon-error' : 'bg-carbon-warning'
                      }`}></div>
                      <div>
                        <p className="font-medium">
                          {issue.severity === 'error' ? 'Error' : 'Warning'} at line {issue.line}
                        </p>
                        <p className="text-carbon-gray-70 mt-1">{issue.message}</p>
                        {issue.solution && (
                          <p className="text-carbon-blue mt-1 text-sm">
                            Suggested solution: {issue.solution}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {conversionIssues.length === 0 && (
                  <div className="p-6 text-center text-carbon-gray-70">
                    <p>No issues found in your SQL conversion</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visual" className="pt-4">
            <div className="border border-carbon-gray-20 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Teradata (Source)</h3>
                  <div className="border border-carbon-gray-20 p-3 bg-carbon-gray-10 font-mono text-sm whitespace-pre-line">
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
                    QUALIFY ROW_NUMBER() OVER (PARTITION BY a.customer_id ORDER BY b.order_date DESC) = 1;
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">IBM Db2 (Target)</h3>
                  <div className="border border-carbon-gray-20 p-3 bg-carbon-gray-10 font-mono text-sm whitespace-pre-line">
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
                      AND (b2.order_date {'>'} b.order_date OR 
                          (b2.order_date = b.order_date AND b2.order_id {'>'} b.order_id))
                    ) = 0;
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Key Differences</h3>
                <ul className="list-disc list-inside space-y-2 text-carbon-gray-80">
                  <li>DATE literal syntax changed from <code>DATE '2023-01-01'</code> to <code>DATE('2023-01-01')</code></li>
                  <li>QUALIFY with ROW_NUMBER() replaced with equivalent subquery logic</li>
                  <li>Table schema references maintained for compatibility</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ConversionEditor;
