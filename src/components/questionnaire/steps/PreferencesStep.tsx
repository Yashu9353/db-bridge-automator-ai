
import { 
  FormLabel, 
  Select, 
  SelectItem, 
  Toggle, 
  Tile 
} from "@carbon/react";

type PreferencesStepProps = {
  optimizationLevel: string;
  strictMode: boolean;
  useFeedbackDb: boolean;
  updateFormData: (key: string, value: string | boolean) => void;
}

const PreferencesStep = ({ optimizationLevel, strictMode, useFeedbackDb, updateFormData }: PreferencesStepProps) => {
  return (
    <div className="cds--form">
      <h2 className="cds--type-productive-heading-03 cds--mb-04">Preferences</h2>
      <p className="cds--type-body-long-01 cds--mb-05">Configure your conversion preferences</p>
      
      <div className="cds--mb-07">
        <div>
          <FormLabel>Optimization Level</FormLabel>
          <Select
            id="optimizationLevel"
            defaultValue={optimizationLevel}
            onChange={(e) => updateFormData("optimizationLevel", e.target.value)}
            className="cds--mb-05"
          >
            <SelectItem value="minimal" text="Minimal - Focus on compatibility" />
            <SelectItem value="moderate" text="Moderate - Balance compatibility and performance" />
            <SelectItem value="aggressive" text="Aggressive - Focus on performance optimization" />
          </Select>
        </div>
        
        <Tile className="cds--mb-03">
          <div className="cds--form-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <FormLabel>Strict Mode</FormLabel>
                <p className="cds--type-body-short-01 cds--mt-02">
                  Enforce strict SQL syntax compatibility during conversion
                </p>
              </div>
              <Toggle
                id="strictMode"
                labelA=""
                labelB=""
                toggled={strictMode}
                onToggle={(toggled) => updateFormData("strictMode", toggled)}
              />
            </div>
          </div>
        </Tile>
        
        <Tile>
          <div className="cds--form-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <FormLabel>Use Feedback Database</FormLabel>
                <p className="cds--type-body-short-01 cds--mt-02">
                  Store conversion feedback to improve future migrations
                </p>
              </div>
              <Toggle
                id="useFeedbackDb"
                labelA=""
                labelB=""
                toggled={useFeedbackDb}
                onToggle={(toggled) => updateFormData("useFeedbackDb", toggled)}
              />
            </div>
          </div>
        </Tile>
      </div>
    </div>
  );
};

export default PreferencesStep;
