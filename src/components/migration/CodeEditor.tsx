
import { useState, useEffect } from "react";
import { 
  Button,
  TextArea,
  InlineNotification,
  Grid,
  Column
} from "@carbon/react";
import { 
  CheckmarkFilled, 
  WarningAlt, 
  Close, 
  Download, 
  Upload 
} from "@carbon/icons-react";

type EditorProps = {
  sourceCode?: string;
  targetCode?: string;
  errors?: Array<{
    line: number;
    message: string;
    severity: 'warning' | 'error';
    solution?: string;
  }>;
  onSourceChange?: (code: string) => void;
};

const CodeEditor = ({ 
  sourceCode: initialSourceCode = "", 
  targetCode: initialTargetCode = "", 
  errors: initialErrors = [],
  onSourceChange 
}: EditorProps) => {
  const [source, setSource] = useState(initialSourceCode);
  const [target, setTarget] = useState(initialTargetCode);
  const [errors, setErrors] = useState(initialErrors);
  const [activeTab, setActiveTab] = useState<"source" | "target">("source");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionStats, setConversionStats] = useState({
    successCount: 0,
    warningCount: 0,
    errorCount: 0,
  });
  
  // Update state when props change
  useEffect(() => {
    setSource(initialSourceCode);
    setTarget(initialTargetCode);
    setErrors(initialErrors);
    
    // Update stats based on errors
    if (initialErrors) {
      setConversionStats({
        successCount: initialTargetCode ? 1 : 0,
        warningCount: initialErrors.filter(e => e.severity === 'warning').length,
        errorCount: initialErrors.filter(e => e.severity === 'error').length,
      });
    }
  }, [initialSourceCode, initialTargetCode, initialErrors]);
  
  const sourceLines = source.split('\n');
  const targetLines = target.split('\n');
  
  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSource = e.target.value;
    setSource(newSource);
    if (onSourceChange) {
      onSourceChange(newSource);
    }
  };

  return (
    <div className="cds--tile">
      <div className="cds--tabs cds--tabs--contained">
        <div className="cds--tabs__nav">
          <button
            className={`cds--tabs__nav-item ${activeTab === "source" ? 'cds--tabs__nav-item--selected' : ''}`}
            onClick={() => setActiveTab("source")}
          >
            <span className="cds--tabs__nav-link">Source Code</span>
          </button>
          <button
            className={`cds--tabs__nav-item ${activeTab === "target" ? 'cds--tabs__nav-item--selected' : ''}`}
            onClick={() => setActiveTab("target")}
          >
            <span className="cds--tabs__nav-link">Target Code</span>
          </button>
        </div>
      </div>
      
      <div className="h-[500px] overflow-hidden border">
        {activeTab === "source" ? (
          <Grid condensed fullWidth>
            <Column lg={1} md={1} sm={1} className="bg-ui-background text-right p-2 text-text-secondary">
              {sourceLines.map((_, i) => (
                <div key={i} className="text-xs leading-6">
                  {i + 1}
                </div>
              ))}
            </Column>
            <Column lg={15} md={7} sm={3} className="p-0 relative h-full">
              <TextArea
                className="w-full h-full resize-none border-0 p-2 font-mono text-sm"
                value={source}
                onChange={handleSourceChange}
                labelText="Source SQL code"
                hideLabel
                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              />
              
              {/* Overlay for error indicators */}
              <div className="absolute top-2 left-2 right-2 bottom-2 pointer-events-none">
                {errors.map((error, idx) => {
                  const line = error.line - 1;
                  if (line >= 0 && line < sourceLines.length) {
                    return (
                      <div 
                        key={idx}
                        className={`absolute left-0 right-0 ${
                          error.severity === "error" ? "bg-support-error-background" : "bg-support-warning-background"
                        }`}
                        style={{ 
                          top: `${line * 1.5}rem`, 
                          height: "1.5rem",
                          opacity: 0.5
                        }}
                      >
                        <div className="relative h-full group">
                          <div 
                            className="hidden group-hover:block absolute right-0 top-0 transform translate-y-4 z-10 w-64 bg-ui-background shadow-lg border p-3"
                          >
                            <div className="flex items-start gap-2">
                              {error.severity === "error" ? (
                                <WarningAlt size={16} className="fill-support-error mt-0.5" />
                              ) : (
                                <WarningAlt size={16} className="fill-support-warning mt-0.5" />
                              )}
                              <div>
                                <p className="font-medium">{error.message}</p>
                                {error.solution && (
                                  <p className="mt-1 text-xs text-link-primary">
                                    {error.solution}
                                  </p>
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
            </Column>
          </Grid>
        ) : (
          <Grid condensed fullWidth>
            <Column lg={1} md={1} sm={1} className="bg-ui-background text-right p-2 text-text-secondary">
              {targetLines.map((_, i) => (
                <div key={i} className="text-xs leading-6">
                  {i + 1}
                </div>
              ))}
            </Column>
            <Column lg={15} md={7} sm={3} className="p-0">
              <TextArea
                className="w-full h-full resize-none border-0 p-2 font-mono text-sm"
                value={target}
                readOnly
                labelText="Converted SQL code"
                hideLabel
                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              />
            </Column>
          </Grid>
        )}
      </div>
      
      {conversionStats.warningCount > 0 || conversionStats.errorCount > 0 ? (
        <div className="mt-4">
          <InlineNotification
            kind={conversionStats.errorCount > 0 ? "error" : "warning"}
            title="Conversion Results"
            subtitle={`Found ${conversionStats.errorCount} errors and ${conversionStats.warningCount} warnings in conversion.`}
            hideCloseButton
          />
        </div>
      ) : target ? (
        <div className="mt-4">
          <InlineNotification
            kind="success"
            title="Conversion Successful"
            subtitle="SQL converted successfully without any issues."
            hideCloseButton
          />
        </div>
      ) : null}
    </div>
  );
};

export default CodeEditor;
