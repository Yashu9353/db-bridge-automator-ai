
import React, { useState } from 'react';
import { ComboBox } from '@carbon/react';

type SourceTargetStepProps = {
  updateStepData: (data: any) => void;
  stepData: any;
};

const sourceOptions = [
  { id: 'teradata', text: 'Teradata' },
  { id: 'oracle', text: 'Oracle' },
  { id: 'sqlserver', text: 'SQL Server' },
  { id: 'db2', text: 'IBM Db2' },
  { id: 'postgres', text: 'PostgreSQL' },
];

const targetOptions = [
  { id: 'db2', text: 'IBM Db2' },
  { id: 'cloudpak', text: 'Cloud Pak for Data' },
  { id: 'watsonx', text: 'watsonx.data' },
];

const SourceTargetStep: React.FC<SourceTargetStepProps> = ({ updateStepData, stepData }) => {
  const [sourceDatabase, setSourceDatabase] = useState(stepData?.sourceDatabase || '');
  const [targetDatabase, setTargetDatabase] = useState(stepData?.targetDatabase || '');

  const handleSourceChange = (selected: { selectedItem?: { id: string, text: string } }) => {
    if (selected.selectedItem) {
      const source = selected.selectedItem.id;
      setSourceDatabase(source);
      updateStepData({ ...stepData, sourceDatabase: source });
    }
  };

  const handleTargetChange = (selected: { selectedItem?: { id: string, text: string } }) => {
    if (selected.selectedItem) {
      const target = selected.selectedItem.id;
      setTargetDatabase(target);
      updateStepData({ ...stepData, targetDatabase: target });
    }
  };

  return (
    <div>
      <div className="cds--form-item cds--mb-05">
        <label htmlFor="source-database" className="cds--label">Source Database</label>
        <ComboBox
          id="source-database"
          titleText=""
          label="Select source database"
          items={sourceOptions}
          initialSelectedItem={sourceOptions.find(item => item.id === sourceDatabase)}
          onChange={handleSourceChange}
          placeholder="Select source database"
        />
      </div>
      
      <div className="cds--form-item">
        <label htmlFor="target-database" className="cds--label">Target Database</label>
        <ComboBox
          id="target-database"
          titleText=""
          label="Select target database"
          items={targetOptions}
          initialSelectedItem={targetOptions.find(item => item.id === targetDatabase)}
          onChange={handleTargetChange}
          placeholder="Select target database"
        />
      </div>
    </div>
  );
};

export default SourceTargetStep;
