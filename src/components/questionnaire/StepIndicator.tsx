
import { ProgressIndicator, ProgressStep } from "@carbon/react";

type Step = {
  title: string;
  description: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="cds--mb-07">
      <div className="cds--mb-03">
        <strong className="cds--type-productive-heading-02">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </strong>
        <p className="cds--type-body-short-01 cds--mt-02">
          {steps[currentStep].description}
        </p>
      </div>
      
      <ProgressIndicator currentIndex={currentStep} spaceEqually>
        {steps.map((step, index) => (
          <ProgressStep 
            key={index} 
            label={step.title} 
            current={index === currentStep}
            complete={index < currentStep}
          />
        ))}
      </ProgressIndicator>
    </div>
  );
};

export default StepIndicator;
