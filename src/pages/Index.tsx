
import { Grid, Column, Button, Tile } from "@carbon/react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/dashboard/DashboardCard";
import MigrationSummary from "../components/dashboard/MigrationSummary";
import QuickActions from "../components/dashboard/QuickActions";
import RecentMigrations from "../components/dashboard/RecentMigrations";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Grid fullWidth className="cds--mb-07">
        <Column lg={16} md={8} sm={4} className="cds--mb-05">
          <h1 className="cds--type-productive-heading-05">Database Migration Dashboard</h1>
          <p className="cds--type-body-long-01 cds--mt-02 cds--mb-03">
            Monitor, manage, and execute your database migration projects
          </p>
        </Column>
      </Grid>

      <Grid fullWidth className="cds--mb-07">
        <Column lg={16} md={8} sm={4} className="cds--mb-07">
          <MigrationSummary />
        </Column>

        <Column lg={10} md={5} sm={4} className="cds--mb-05">
          <DashboardCard title="Quick Actions" className="cds--dashboard-card cds--h-full">
            <QuickActions />
          </DashboardCard>
        </Column>

        <Column lg={6} md={3} sm={4} className="cds--mb-05">
          <DashboardCard title="Getting Started" className="cds--dashboard-card cds--h-full">
            <p className="cds--type-body-long-01 cds--mb-05">
              New to the migration process? Start with these resources to guide you through your
              database migration journey.
            </p>
            <div className="cds--btn-set cds--btn-set--stacked">
              <Button 
                kind="tertiary" 
                size="md"
                onClick={() => navigate('/questionnaire/create')}
              >
                Setup a New Migration
              </Button>
              <Button
                kind="tertiary"
                size="md"
                onClick={() => navigate('/database/connections')}
              >
                Configure Connections
              </Button>
            </div>
          </DashboardCard>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <DashboardCard title="Recent Migrations" className="cds--dashboard-card">
            <RecentMigrations />
          </DashboardCard>
        </Column>
      </Grid>
    </Layout>
  );
};

export default Index;
