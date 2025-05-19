
import { Grid, Column, Tile, Tag } from "@carbon/react";
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
      <div className="cds--content-banner" style={{ backgroundColor: "#0043ce", color: "#ffffff", padding: "2rem 1rem" }}>
        <div className="cds--grid cds--grid--narrow">
          <div className="cds--row">
            <div className="cds--col-lg-10 cds--col-md-8 cds--col-sm-4">
              <h1 className="cds--type-productive-heading-05 cds--mb-02">
                Welcome to IBM Database Modernization
              </h1>
              <p className="cds--type-body-long-01">
                Automate your database migration from various platforms to IBM databases using our AI-powered
                conversion tool. Configure your databases, upload scripts, and run migrations with ease.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Grid narrow className="cds--mb-07">
        <Column lg={16} md={8} sm={4} className="cds--mb-05">
          <h2 className="cds--type-productive-heading-03">Migration Summary</h2>
        </Column>
      </Grid>

      <Grid narrow className="cds--mb-07">
        <Column lg={16} md={8} sm={4} className="cds--mb-07">
          <MigrationSummary />
        </Column>

        <Column lg={16} md={8} sm={4} className="cds--mb-05">
          <h2 className="cds--type-productive-heading-03">Quick Actions</h2>
        </Column>
        
        <Column lg={16} md={8} sm={4} className="cds--mb-07">
          <QuickActions />
        </Column>

        <Column lg={16} md={8} sm={4} className="cds--mb-05">
          <div className="cds--row cds--row-padding">
            <div className="cds--col-lg-12 cds--col-md-6 cds--col-sm-4">
              <h2 className="cds--type-productive-heading-03">Recent Migrations</h2>
            </div>
            <div className="cds--col-lg-4 cds--col-md-2 cds--col-sm-4" style={{textAlign: 'right'}}>
              <a href="#" className="cds--link">View all</a>
            </div>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <RecentMigrations />
        </Column>
      </Grid>
    </Layout>
  );
};

export default Index;
