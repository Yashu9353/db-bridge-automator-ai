
import { FormLabel, Select, SelectItem, Stack } from "@carbon/react";

type SourceTargetStepProps = {
  sourceDb: string;
  targetDb: string;
  updateFormData: (key: string, value: string | boolean) => void;
}

const SourceTargetStep = ({ sourceDb, targetDb, updateFormData }: SourceTargetStepProps) => {
  return (
    <div className="cds--form">
      <h2 className="cds--type-productive-heading-03 cds--mb-04">Source & Target Database</h2>
      <p className="cds--type-body-long-01 cds--mb-05">Select your source database type and target IBM database</p>
      
      <Stack gap={7}>
        <div>
          <FormLabel>Source Database</FormLabel>
          <Select
            id="sourceDb"
            labelText=""
            value={sourceDb}
            onChange={(e) => updateFormData("sourceDb", e.target.value)}
            className="cds--mb-05"
          >
            <SelectItem value="" text="Select source database" disabled hidden />
            <SelectItem value="teradata" text="Teradata" />
            <SelectItem value="oracle" text="Oracle" />
            <SelectItem value="sqlserver" text="SQL Server" />
            <SelectItem value="postgresql" text="PostgreSQL" />
            <SelectItem value="mysql" text="MySQL" />
          </Select>
        </div>
        
        <div>
          <FormLabel>Target Database</FormLabel>
          <Select
            id="targetDb"
            labelText=""
            value={targetDb}
            onChange={(e) => updateFormData("targetDb", e.target.value)}
          >
            <SelectItem value="" text="Select target database" disabled hidden />
            <SelectItem value="db2" text="IBM Db2" />
            <SelectItem value="db2-cloud" text="IBM Db2 on Cloud" />
            <SelectItem value="db2-warehouse" text="IBM Db2 Warehouse" />
          </Select>
        </div>
      </Stack>
    </div>
  );
};

export default SourceTargetStep;
