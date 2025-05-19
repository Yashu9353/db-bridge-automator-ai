
import { Button } from "@carbon/react";
import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { FormData } from "./constants/steps";

type NavigationButtonsProps = {
  currentStep: number;
  stepsCount: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
};

const NavigationButtons = ({ currentStep, stepsCount, nextStep, prevStep, formData }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // For demo purposes, just log the form data
    console.log("Questionnaire submitted:", formData);
    // Redirect to the dashboard
    navigate("/");
  };
  
  return (
    <div className="cds--btn-set cds--btn-set--stacked cds--mt-07">
      <Button
        kind="secondary"
        onClick={prevStep}
        disabled={currentStep === 0}
        renderIcon={ArrowLeft}
        iconDescription="Previous"
      >
        Previous
      </Button>
      
      {currentStep < stepsCount - 1 ? (
        <Button
          kind="primary"
          onClick={nextStep}
          renderIcon={ArrowRight}
          iconDescription="Next"
        >
          Next
        </Button>
      ) : (
        <Button
          kind="primary"
          onClick={handleSubmit}
        >
          Start Migration
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
