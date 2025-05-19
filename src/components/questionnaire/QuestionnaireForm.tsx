
import { useState, useEffect } from "react";
import { steps as questionnaireSteps, getPresetFormData, FormData } from "./constants/steps";
import StepIndicator from "./StepIndicator";
import SourceTargetStep from "./steps/SourceTargetStep";
import ConversionTypeStep from "./steps/ConversionTypeStep";
import PreferencesStep from "./steps/PreferencesStep";
import SummaryStep from "./steps/SummaryStep";
import NavigationButtons from "./NavigationButtons";
import { Grid, Column } from "@carbon/react";

type QuestionnaireFormProps = {
  questionnaireId?: string;
};

const QuestionnaireForm = ({ questionnaireId }: QuestionnaireFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    sourceDb: "",
    targetDb: "",
    conversionType: "sql",
    optimizationLevel: "moderate",
    strictMode: false,
    useFeedbackDb: true,
  });

  // Effect to set form data based on questionnaire ID
  useEffect(() => {
    if (questionnaireId) {
      console.log(`Loading questionnaire: ${questionnaireId}`);
      const presetData = getPresetFormData(questionnaireId);
      if (presetData) {
        setFormData(presetData);
      }
    }
  }, [questionnaireId]);

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateStepData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, questionnaireSteps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Grid narrow className="cds--grid--full-width">
      <Column lg={12} md={8} sm={4} className="cds--offset-lg-2">
        <StepIndicator steps={questionnaireSteps} currentStep={currentStep} />

        {currentStep === 0 && (
          <SourceTargetStep 
            stepData={formData}
            updateStepData={updateStepData}
          />
        )}

        {currentStep === 1 && (
          <ConversionTypeStep 
            conversionType={formData.conversionType}
            updateFormData={updateFormData}
          />
        )}

        {currentStep === 2 && (
          <PreferencesStep 
            stepData={formData}
            updateStepData={updateStepData}
          />
        )}

        {currentStep === 3 && (
          <SummaryStep formData={formData} />
        )}

        <NavigationButtons 
          currentStep={currentStep}
          stepsCount={questionnaireSteps.length}
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
        />
      </Column>
    </Grid>
  );
};

export default QuestionnaireForm;
