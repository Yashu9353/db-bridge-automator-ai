
import { RadioButtonGroup, RadioButton, Tile, FormLabel } from "@carbon/react";

type ConversionTypeStepProps = {
  conversionType: string;
  updateFormData: (key: string, value: string | boolean) => void;
}

const ConversionTypeStep = ({ conversionType, updateFormData }: ConversionTypeStepProps) => {
  return (
    <div className="cds--form">
      <h2 className="cds--type-productive-heading-03 cds--mb-04">Conversion Type</h2>
      <p className="cds--type-body-long-01 cds--mb-05">Select the type of database objects you want to convert</p>
      
      <RadioButtonGroup
        name="conversion-type"
        valueSelected={conversionType}
        onChange={(value) => updateFormData("conversionType", value.toString())}
        orientation="vertical"
      >
        <RadioButton
          id="sql"
          value="sql"
          labelText={
            <Tile className="cds--tile--clickable cds--mb-03">
              <h3 className="cds--type-productive-heading-01">SQL Queries & Scripts</h3>
              <p className="cds--type-body-short-01 cds--mt-02">
                Convert standard SQL queries, DDL, and DML statements
              </p>
            </Tile>
          }
        />
        <RadioButton
          id="stored-procedures"
          value="stored-procedures"
          labelText={
            <Tile className="cds--tile--clickable cds--mb-03">
              <h3 className="cds--type-productive-heading-01">Stored Procedures</h3>
              <p className="cds--type-body-short-01 cds--mt-02">
                Convert procedural code like stored procedures, functions, and triggers
              </p>
            </Tile>
          }
        />
        <RadioButton
          id="both"
          value="both"
          labelText={
            <Tile className="cds--tile--clickable">
              <h3 className="cds--type-productive-heading-01">Both</h3>
              <p className="cds--type-body-short-01 cds--mt-02">
                Convert all types of SQL code (queries, DDL, DML, and procedural code)
              </p>
            </Tile>
          }
        />
      </RadioButtonGroup>
    </div>
  );
};

export default ConversionTypeStep;
