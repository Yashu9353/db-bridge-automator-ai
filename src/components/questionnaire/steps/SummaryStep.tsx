
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@carbon/react";

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
      
      <Table size="lg">
        <TableBody>
          <TableRow>
            <TableCell>Source Database</TableCell>
            <TableCell className="cds--capitalize">
              {formData.sourceDb || "Not selected"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Target Database</TableCell>
            <TableCell className="cds--capitalize">
              {formData.targetDb || "Not selected"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Conversion Type</TableCell>
            <TableCell>
              {formData.conversionType === "sql" && "SQL Queries & Scripts"}
              {formData.conversionType === "stored-procedures" && "Stored Procedures"}
              {formData.conversionType === "both" && "SQL & Stored Procedures"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Optimization Level</TableCell>
            <TableCell className="cds--capitalize">
              {formData.optimizationLevel}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Strict Mode</TableCell>
            <TableCell>
              {formData.strictMode ? "Enabled" : "Disabled"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Use Feedback Database</TableCell>
            <TableCell>
              {formData.useFeedbackDb ? "Enabled" : "Disabled"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryStep;
