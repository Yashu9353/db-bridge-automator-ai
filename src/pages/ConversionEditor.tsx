
import { useState, useEffect } from "react";
import {
  Content,
  Grid,
  Column,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  InlineNotification
} from "@carbon/react";
import {
  ArrowRight,
  Download,
  WarningAlt,
  CheckmarkFilled,
  Information
} from "@carbon/icons-react";
import { toast } from "sonner";
import { downloadSqlFile, convertSqlSyntax } from "@/services/databaseService";
import CodeEditor from "@/components/migration/CodeEditor";
import PageHeader from "@/components/layout/PageHeader";

const ConversionEditor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedScript, setSelectedScript] = useState<{
    id: string;
    name: string;
    content: string;
    sqlType?: "teradata" | "db2" | "other";
  } | null>(null);
  
  const [sourceCode, setSourceCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  
  const [conversionIssues, setConversionIssues] = useState<Array<{
    line: number;
    message: string;
    severity: 'warning' | 'error';
    solution?: string;
  }>>([]);
  
  // Load the selected script from session storage
  useEffect(() => {
    const storedScript = sessionStorage.getItem('selectedScript');
    if (storedScript) {
      try {
        const parsedScript = JSON.parse(storedScript);
        setSelectedScript(parsedScript);
        setSourceCode(parsedScript.content);
        
        // For demo purposes, if the script contains specific Teradata features, highlight them
        if (parsedScript.sqlType === 'teradata' || parsedScript.content?.toLowerCase().includes('sel ') || 
            parsedScript.content?.toLowerCase().includes('qualify')) {
          const issues = [];
          
          if (parsedScript.content?.toLowerCase().includes('qualify')) {
            issues.push({
              line: parsedScript.content.toLowerCase().split('\n').findIndex(line => 
                line.toLowerCase().includes('qualify')) + 1,
              message: "QUALIFY is not supported in IBM Db2 syntax",
              severity: "error" as const,
              solution: "Use subquery with ROW_NUMBER() function instead"
            });
          }
          
          if (parsedScript.content?.toLowerCase().includes('sel ')) {
            issues.push({
              line: parsedScript.content.toLowerCase().split('\n').findIndex(line => 
                line.toLowerCase().trim().startsWith('sel ')) + 1,
              message: "SEL abbreviation is not supported in Db2, use SELECT instead",
              severity: "warning" as const,
              solution: "Replace 'SEL' with 'SELECT'"
            });
          }
          
          if (parsedScript.content?.toLowerCase().includes('.')) {
            issues.push({
              line: parsedScript.content.toLowerCase().split('\n').findIndex(line => 
                line.toLowerCase().includes('.')) + 1,
              message: "Table references may require schema qualification in Db2",
              severity: "warning" as const,
              solution: "Check schema names in target database"
            });
          }
          
          setConversionIssues(issues);
        }
      } catch (error) {
        console.error("Error loading selected script:", error);
      }
    } else {
      // Default content if no script is selected
      setSourceCode(`-- Teradata sample query
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
QUALIFY ROW_NUMBER() OVER (PARTITION BY a.customer_id ORDER BY b.order_date DESC) = 1;`);
    }
  }, []);

  const handleRunMigration = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate conversion process using the databaseService
      const result = await convertSqlSyntax(
        sourceCode,
        selectedScript?.sqlType === 'teradata' ? 'teradata' : 'other',
        'db2'
      );
      
      setConvertedCode(result.targetCode);
      setConversionIssues(result.issues);
      
      toast.success("Migration completed successfully", {
        description: `SQL conversion applied with ${result.warningCount} warnings and ${result.errorCount} errors`
      });
    } catch (error) {
      toast.error("Migration failed", {
        description: "An error occurred during SQL conversion"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDownload = () => {
    if (!convertedCode) {
      toast.error("No converted code available", {
        description: "Please run the migration process first"
      });
      return;
    }
    
    const fileName = selectedScript?.name 
      ? `${selectedScript.name.split('.')[0]}_db2.sql` 
      : "converted_script.sql";
      
    downloadSqlFile(convertedCode, fileName);
    
    toast.success("Download started", {
      description: "Your converted SQL script is being downloaded"
    });
  };
  
  return (
    <Content>
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <div className="space-y-6">
            <PageHeader 
              title="SQL Conversion"
              description={selectedScript 
                ? `Converting: ${selectedScript.name}`
                : "View and edit your converted SQL code"
              }
              actions={
                <>
                  <Button
                    kind="secondary"
                    renderIcon={Download}
                    disabled={!convertedCode}
                    onClick={handleDownload}
                  >
                    Download Scripts
                  </Button>
                  
                  <Button
                    renderIcon={ArrowRight}
                    disabled={isProcessing || !sourceCode}
                    onClick={handleRunMigration}
                  >
                    {isProcessing ? "Processing..." : "Run Migration"}
                  </Button>
                </>
              }
            />
            
            {selectedScript?.sqlType === 'teradata' && (
              <InlineNotification
                kind="info"
                title="Teradata SQL Detected"
                subtitle="This script has been identified as Teradata SQL. The parser will convert Teradata-specific syntax to IBM Db2 compatible SQL."
                lowContrast
                hideCloseButton
              />
            )}
            
            <Tabs>
              <TabList aria-label="SQL Conversion Tabs">
                <Tab>Code Editor</Tab>
                <Tab>Issues & Feedback</Tab>
                <Tab>Visual Comparison</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <CodeEditor 
                    sourceCode={sourceCode} 
                    targetCode={convertedCode}
                    errors={conversionIssues}
                    onSourceChange={setSourceCode}
                  />
                </TabPanel>
                
                <TabPanel>
                  <div className="border border-gray-100">
                    <div className="border-b p-4 bg-gray-10">
                      <h3 className="font-medium">Conversion Issues</h3>
                    </div>
                    <div>
                      {conversionIssues.map((issue, index) => (
                        <div key={index} className="p-4 border-b">
                          <div className="flex items-start">
                            {issue.severity === 'error' ? (
                              <WarningAlt className="mt-1 mr-2 fill-red-60" />
                            ) : (
                              <Information className="mt-1 mr-2 fill-yellow-30" />
                            )}
                            <div>
                              <p className="font-medium">
                                {issue.severity === 'error' ? 'Error' : 'Warning'} at line {issue.line}
                              </p>
                              <p className="text-gray-70 mt-1">{issue.message}</p>
                              {issue.solution && (
                                <p className="text-blue-60 mt-1 text-sm">
                                  Suggested solution: {issue.solution}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {(!conversionIssues || conversionIssues.length === 0) && (
                        <div className="p-6 text-center text-gray-70">
                          <p>No issues found in your SQL conversion</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>
                
                <TabPanel>
                  <div className="border p-6">
                    <Grid condensed>
                      <Column lg={8} md={4} sm={4}>
                        <h3 className="font-medium mb-3">Teradata (Source)</h3>
                        <div className="border p-3 bg-gray-10 font-mono text-sm whitespace-pre-line">
                          {sourceCode || `SELECT 
  a.customer_id,
  a.customer_name,
  b.order_id,
  b.order_date,
  b.order_amount
FROM customer_db.customers a
INNER JOIN order_db.orders b
ON a.customer_id = b.customer_id
WHERE b.order_date BETWEEN DATE '2023-01-01' AND DATE '2023-12-31'
QUALIFY ROW_NUMBER() OVER (PARTITION BY a.customer_id ORDER BY b.order_date DESC) = 1;`}
                        </div>
                      </Column>
                      <Column lg={8} md={4} sm={4}>
                        <h3 className="font-medium mb-3">IBM Db2 (Target)</h3>
                        <div className="border p-3 bg-gray-10 font-mono text-sm whitespace-pre-line">
                          {convertedCode || `SELECT 
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
) = 0;`}
                        </div>
                      </Column>
                    </Grid>

                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Key Differences</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-80">
                        <li>DATE literal syntax changed from <code>DATE '2023-01-01'</code> to <code>DATE('2023-01-01')</code></li>
                        <li>QUALIFY with ROW_NUMBER() replaced with equivalent subquery logic</li>
                        <li>Table schema references maintained for compatibility</li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </Column>
      </Grid>
    </Content>
  );
};

export default ConversionEditor;
