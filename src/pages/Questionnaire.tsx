
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { Grid, Column } from "@carbon/react";

const Questionnaire = () => {
  const { id } = useParams<{ id: string }>();
  
  console.log(`Questionnaire page loaded with ID: ${id}`);
  
  return (
    <Layout>
      <Grid narrow>
        <Column lg={16} md={8} sm={4}>
          <h1 className="cds--type-productive-heading-04 cds--mb-03">Migration Setup Wizard</h1>
          <p className="cds--type-body-long-01 cds--mb-06">
            Answer a few questions to configure your database migration project
          </p>
          
          <QuestionnaireForm questionnaireId={id} />
        </Column>
      </Grid>
    </Layout>
  );
};

export default Questionnaire;
