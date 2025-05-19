
import { ProgressBar } from "@carbon/react";

type Step = {
  title: string;
  description: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  // Calculate progress percentage
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;
  
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
      
      <ProgressBar 
        value={progressPercentage} 
        max={100} 
        label={`Step ${currentStep + 1} of ${steps.length}`} 
        helperText={steps[currentStep].title}
      />
      
      <div className="cds--mt-05">
        <div className="cds--progress-step-button-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`cds--progress-step-button 
                ${index < currentStep ? 'cds--progress-step-button--complete' : ''} 
                ${index === currentStep ? 'cds--progress-step-button--current' : ''}
                ${index > currentStep ? 'cds--progress-step-button--incomplete' : ''}`}
            >
              <span className="cds--progress-step-button__label">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
