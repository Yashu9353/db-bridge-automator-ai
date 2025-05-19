
import Layout from "@/components/layout/Layout";
import { Grid, Column, InlineNotification } from "@carbon/react";
import { Information } from "@carbon/icons-react";

const ScriptUpload = () => {
  return (
    <Layout>
      <Grid narrow>
        <Column lg={16} md={8} sm={4}>
          <h1 className="cds--type-productive-heading-04 cds--mb-03">Upload SQL Scripts</h1>
          <p className="cds--type-body-long-01 cds--mb-05">
            Upload SQL, BTEQ, or stored procedure scripts for conversion
          </p>
          
          <InlineNotification
            kind="info"
            title="Supported File Types"
            subtitle="You can upload .sql, .bteq, or .txt files containing SQL code. For best results, each file should contain related queries or a single stored procedure."
            iconDescription="Info"
            className="cds--mb-05"
          />
          
          {/* FileUploader component will be implemented here */}
        </Column>
      </Grid>
    </Layout>
  );
};

export default ScriptUpload;
