
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Source & Target",
    description: "Select your source and target databases",
  },
  {
    title: "Conversion Type",
    description: "Select the type of conversion you need",
  },
  {
    title: "Preferences",
    description: "Set your conversion preferences",
  },
  {
    title: "Summary",
    description: "Review your configuration",
  },
];

const QuestionnaireForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sourceDb: "",
    targetDb: "",
    conversionType: "sql",
    optimizationLevel: "moderate",
    strictMode: false,
    useFeedbackDb: true,
  });

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index === currentStep
                    ? "bg-carbon-blue text-white"
                    : index < currentStep
                    ? "bg-carbon-success text-white"
                    : "bg-carbon-gray-20 text-carbon-gray-60"
                }`}
              >
                {index + 1}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-carbon-gray-90">{step.title}</p>
                <p className="text-xs text-carbon-gray-60 hidden md:block">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-carbon-gray-20">
          <div 
            className="absolute left-0 top-0 h-full bg-carbon-blue transition-all" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div>
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-carbon-gray-100">Source & Target Database</h2>
            <p className="text-carbon-gray-70">Select your source database type and target IBM database</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="sourceDb" className="carbon-label">Source Database</Label>
                <Select
                  value={formData.sourceDb}
                  onValueChange={(value) => updateFormData("sourceDb", value)}
                >
                  <SelectTrigger className="carbon-field">
                    <SelectValue placeholder="Select source database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teradata">Teradata</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                    <SelectItem value="sqlserver">SQL Server</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="targetDb" className="carbon-label">Target Database</Label>
                <Select
                  value={formData.targetDb}
                  onValueChange={(value) => updateFormData("targetDb", value)}
                >
                  <SelectTrigger className="carbon-field">
                    <SelectValue placeholder="Select target database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="db2">IBM Db2</SelectItem>
                    <SelectItem value="db2-cloud">IBM Db2 on Cloud</SelectItem>
                    <SelectItem value="db2-warehouse">IBM Db2 Warehouse</SelectItem>
                    <SelectItem value="netezza">IBM Netezza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-carbon-gray-100">Conversion Type</h2>
            <p className="text-carbon-gray-70">Select the type of database objects you want to convert</p>
            
            <RadioGroup
              value={formData.conversionType}
              onValueChange={(value) => updateFormData("conversionType", value)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2 border border-carbon-gray-30 p-4">
                <RadioGroupItem value="sql" id="sql" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="sql" className="text-base font-medium">SQL Queries & Scripts</Label>
                  <p className="text-sm text-carbon-gray-60">
                    Convert standard SQL queries, DDL, and DML statements
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 border border-carbon-gray-30 p-4">
                <RadioGroupItem value="stored-procedures" id="stored-procedures" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="stored-procedures" className="text-base font-medium">Stored Procedures</Label>
                  <p className="text-sm text-carbon-gray-60">
                    Convert procedural code like stored procedures, functions, and triggers
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 border border-carbon-gray-30 p-4">
                <RadioGroupItem value="both" id="both" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="both" className="text-base font-medium">Both</Label>
                  <p className="text-sm text-carbon-gray-60">
                    Convert all types of SQL code (queries, DDL, DML, and procedural code)
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-carbon-gray-100">Preferences</h2>
            <p className="text-carbon-gray-70">Configure your conversion preferences</p>
            
            <div className="space-y-5">
              <div>
                <Label htmlFor="optimizationLevel" className="carbon-label">Optimization Level</Label>
                <Select
                  value={formData.optimizationLevel}
                  onValueChange={(value) => updateFormData("optimizationLevel", value)}
                >
                  <SelectTrigger className="carbon-field">
                    <SelectValue placeholder="Select optimization level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal - Focus on compatibility</SelectItem>
                    <SelectItem value="moderate">Moderate - Balance compatibility and performance</SelectItem>
                    <SelectItem value="aggressive">Aggressive - Focus on performance optimization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between border border-carbon-gray-30 p-4">
                <div>
                  <Label className="text-base font-medium">Strict Mode</Label>
                  <p className="text-sm text-carbon-gray-60">
                    Enforce strict SQL syntax compatibility during conversion
                  </p>
                </div>
                <Switch
                  checked={formData.strictMode}
                  onCheckedChange={(checked) => updateFormData("strictMode", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between border border-carbon-gray-30 p-4">
                <div>
                  <Label className="text-base font-medium">Use Feedback Database</Label>
                  <p className="text-sm text-carbon-gray-60">
                    Store conversion feedback to improve future migrations
                  </p>
                </div>
                <Switch
                  checked={formData.useFeedbackDb}
                  onCheckedChange={(checked) => updateFormData("useFeedbackDb", checked)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-carbon-gray-100">Summary</h2>
            <p className="text-carbon-gray-70">Review your migration configuration</p>
            
            <div className="border border-carbon-gray-30">
              <div className="grid grid-cols-[1fr,2fr] border-b border-carbon-gray-30">
                <div className="bg-carbon-gray-10 p-4 font-medium">Source Database</div>
                <div className="p-4 capitalize">{formData.sourceDb || "Not selected"}</div>
              </div>
              <div className="grid grid-cols-[1fr,2fr] border-b border-carbon-gray-30">
                <div className="bg-carbon-gray-10 p-4 font-medium">Target Database</div>
                <div className="p-4 capitalize">{formData.targetDb || "Not selected"}</div>
              </div>
              <div className="grid grid-cols-[1fr,2fr] border-b border-carbon-gray-30">
                <div className="bg-carbon-gray-10 p-4 font-medium">Conversion Type</div>
                <div className="p-4">
                  {formData.conversionType === "sql" && "SQL Queries & Scripts"}
                  {formData.conversionType === "stored-procedures" && "Stored Procedures"}
                  {formData.conversionType === "both" && "SQL & Stored Procedures"}
                </div>
              </div>
              <div className="grid grid-cols-[1fr,2fr] border-b border-carbon-gray-30">
                <div className="bg-carbon-gray-10 p-4 font-medium">Optimization Level</div>
                <div className="p-4 capitalize">{formData.optimizationLevel}</div>
              </div>
              <div className="grid grid-cols-[1fr,2fr] border-b border-carbon-gray-30">
                <div className="bg-carbon-gray-10 p-4 font-medium">Strict Mode</div>
                <div className="p-4">{formData.strictMode ? "Enabled" : "Disabled"}</div>
              </div>
              <div className="grid grid-cols-[1fr,2fr]">
                <div className="bg-carbon-gray-10 p-4 font-medium">Use Feedback Database</div>
                <div className="p-4">{formData.useFeedbackDb ? "Enabled" : "Disabled"}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={prevStep}
            className="carbon-button-secondary"
            disabled={currentStep === 0}
          >
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="carbon-button-primary"
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              className="carbon-button-primary"
              onClick={() => {
                // For demo purposes, just log the form data
                console.log("Questionnaire submitted:", formData);
                // Redirect to the dashboard
                window.location.href = "/";
              }}
            >
              Start Migration
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
