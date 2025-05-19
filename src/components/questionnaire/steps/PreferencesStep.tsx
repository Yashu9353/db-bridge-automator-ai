
import React, { useState } from 'react';
import { 
  ComboBox, 
  Checkbox, 
  RadioButtonGroup, 
  RadioButton 
} from '@carbon/react';

type PreferencesStepProps = {
  updateStepData: (data: any) => void;
  stepData: any;
};

const optimizationLevels = [
  { id: 'auto', text: 'Automatic (recommended)' },
  { id: 'balanced', text: 'Balanced' },
  { id: 'performance', text: 'Performance optimized' },
  { id: 'compatibility', text: 'Compatibility optimized' },
];

const PreferencesStep: React.FC<PreferencesStepProps> = ({ updateStepData, stepData }) => {
  const [optimizationLevel, setOptimizationLevel] = useState(stepData?.optimizationLevel || '');
  const [includeComments, setIncludeComments] = useState(stepData?.includeComments ?? true);
  const [validateConversion, setValidateConversion] = useState(stepData?.validateConversion ?? true);
  const [conversionMode, setConversionMode] = useState(stepData?.conversionMode || 'automated');

  const handleOptimizationChange = (selected: { selectedItem?: { id: string, text: string } }) => {
    if (selected.selectedItem) {
      const level = selected.selectedItem.id;
      setOptimizationLevel(level);
      updateStepData({ ...stepData, optimizationLevel: level });
    }
  };

  const handleCommentsChange = (checked: boolean) => {
    setIncludeComments(checked);
    updateStepData({ ...stepData, includeComments: checked });
  };

  const handleValidationChange = (checked: boolean) => {
    setValidateConversion(checked);
    updateStepData({ ...stepData, validateConversion: checked });
  };

  const handleModeChange = (value: string) => {
    setConversionMode(value);
    updateStepData({ ...stepData, conversionMode: value });
  };

  return (
    <div>
      <div className="cds--form-item cds--mb-05">
        <label htmlFor="optimization-level" className="cds--label">Optimization Level</label>
        <ComboBox
          id="optimization-level"
          titleText=""
          label="Select optimization level"
          items={optimizationLevels}
          initialSelectedItem={optimizationLevels.find(item => item.id === optimizationLevel)}
          onChange={handleOptimizationChange}
          className="cds--mb-04"
          placeholder="Select optimization level"
        />
      </div>
      
      <div className="cds--form-item cds--mb-05">
        <fieldset className="cds--fieldset">
          <legend className="cds--label">Conversion Mode</legend>
          <RadioButtonGroup 
            name="conversion-mode" 
            valueSelected={conversionMode}
            onChange={handleModeChange}
          >
            <RadioButton
              id="conversion-automated"
              labelText="Automated (AI-powered)"
              value="automated"
            />
            <RadioButton
              id="conversion-interactive" 
              labelText="Interactive (manual review)" 
              value="interactive"
            />
          </RadioButtonGroup>
        </fieldset>
      </div>
      
      <div className="cds--form-item cds--mb-04">
        <Checkbox
          id="include-comments"
          labelText="Include comments in converted code"
          checked={includeComments}
          onChange={(_, { checked }) => handleCommentsChange(checked)}
        />
      </div>
      
      <div className="cds--form-item">
        <Checkbox
          id="validate-conversion"
          labelText="Validate conversion results"
          checked={validateConversion}
          onChange={(_, { checked }) => handleValidationChange(checked)}
        />
      </div>
    </div>
  );
};

export default PreferencesStep;
