
import { StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody } from "@carbon/react";

type SummaryStepProps = {
  formData: {
    sourceDb: string;
    targetDb: string;
    conversionType: string;
    optimizationLevel: string;
    strictMode: boolean;
    useFeedbackDb: boolean;
  };
}

const SummaryStep = ({ formData }: SummaryStepProps) => {
  return (
    <div className="cds--form">
      <h2 className="cds--type-productive-heading-03 cds--mb-04">Summary</h2>
      <p className="cds--type-body-long-01 cds--mb-05">Review your migration configuration</p>
      
      <StructuredListWrapper>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>Source Database</StructuredListCell>
            <StructuredListCell className="cds--capitalize">
              {formData.sourceDb || "Not selected"}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Target Database</StructuredListCell>
            <StructuredListCell className="cds--capitalize">
              {formData.targetDb || "Not selected"}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Conversion Type</StructuredListCell>
            <StructuredListCell>
              {formData.conversionType === "sql" && "SQL Queries & Scripts"}
              {formData.conversionType === "stored-procedures" && "Stored Procedures"}
              {formData.conversionType === "both" && "SQL & Stored Procedures"}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Optimization Level</StructuredListCell>
            <StructuredListCell className="cds--capitalize">
              {formData.optimizationLevel}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Strict Mode</StructuredListCell>
            <StructuredListCell>
              {formData.strictMode ? "Enabled" : "Disabled"}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Use Feedback Database</StructuredListCell>
            <StructuredListCell>
              {formData.useFeedbackDb ? "Enabled" : "Disabled"}
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  );
};

export default SummaryStep;
