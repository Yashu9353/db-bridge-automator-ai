
import Layout from "@/components/layout/Layout";
import { Grid, Column } from "@carbon/react";

const DatabaseConnections = () => {
  return (
    <Layout>
      <Grid narrow>
        <Column lg={16} md={8} sm={4}>
          <h1 className="cds--type-productive-heading-04 cds--mb-03">Database Connections</h1>
          <p className="cds--type-body-long-01 cds--mb-05">
            Configure your source and target database connections
          </p>
          
          <Grid condensed>
            <Column lg={8} md={4} sm={4} className="cds--mb-05">
              <div className="cds--tile">
                <h2 className="cds--type-productive-heading-03 cds--mb-04">Source Database</h2>
                {/* DatabaseConnector component would go here */}
              </div>
            </Column>
            
            <Column lg={8} md={4} sm={4}>
              <div className="cds--tile">
                <h2 className="cds--type-productive-heading-03 cds--mb-04">Target Database</h2>
                {/* DatabaseConnector component would go here */}
              </div>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </Layout>
  );
};

export default DatabaseConnections;
