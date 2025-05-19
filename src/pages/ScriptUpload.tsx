
import Layout from "@/components/layout/Layout";
import { Grid, Column, InlineNotification, FileUploader } from "@carbon/react";
import { Upload } from "@carbon/icons-react";
import PageHeader from "@/components/layout/PageHeader";

const ScriptUpload = () => {
  return (
    <Layout>
      <Grid narrow>
        <Column lg={16} md={8} sm={4}>
          <PageHeader 
            title="Upload SQL Scripts"
            description="Upload SQL, BTEQ, or stored procedure scripts for conversion"
          />
          
          <InlineNotification
            kind="info"
            title="Supported File Types"
            subtitle="You can upload .sql, .bteq, or .txt files containing SQL code. For best results, each file should contain related queries or a single stored procedure."
            className="cds--mb-05"
          />
          
          <div className="cds--mb-07">
            <FileUploader
              labelTitle="Upload SQL Scripts"
              labelDescription="Drag and drop files here or click to upload"
              buttonLabel="Add files"
              filenameStatus="edit"
              accept={['.sql', '.bteq', '.txt']}
              multiple={true}
              iconDescription="Clear file"
              name="fileUploader"
            />
          </div>
        </Column>
      </Grid>
    </Layout>
  );
};

export default ScriptUpload;
