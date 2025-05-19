
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
      <ProgressIndicator currentIndex={currentStep}>
        {steps.map((step, index) => (
          <ProgressStep
            key={index}
            label={step.title}
            secondaryLabel={step.description}
            description={step.title}
          />
        ))}
      </ProgressIndicator>
    </div>
  );
};

export default StepIndicator;
