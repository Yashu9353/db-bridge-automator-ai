
import Layout from "@/components/layout/Layout";
import { 
  Grid, 
  Column, 
  Tile,
  Section 
} from "@carbon/react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import MigrationSummary from "@/components/dashboard/MigrationSummary";
import RecentMigrations from "@/components/dashboard/RecentMigrations";
import QuickActions from "@/components/dashboard/QuickActions";
import { InformationFilled } from "@carbon/icons-react";

const Index = () => {
  return (
    <Layout>
      <div className="cds--grid">
        <div className="cds--row cds--mb-07">
          <Column lg={16} md={8} sm={4}>
            <Section className="cds--bg--interactive-01 cds--type--inverse cds--p-05">
              <h1 className="cds--type-productive-heading-04 cds--mb-03">Welcome to IBM Database Modernization</h1>
              <p className="cds--type-body-long-01">
                Automate your database migration from various platforms to IBM databases using our AI-powered conversion tool.
                Configure your databases, upload scripts, and run migrations with ease.
              </p>
            </Section>
          </Column>
        </div>

        <div className="cds--row cds--mb-05">
          <Column lg={16} md={8} sm={4}>
            <h2 className="cds--type-productive-heading-03 cds--mb-04">Migration Summary</h2>
            <MigrationSummary />
          </Column>
        </div>
        
        <div className="cds--row cds--mb-05">
          <Column lg={16} md={8} sm={4}>
            <h2 className="cds--type-productive-heading-03 cds--mb-04">Quick Actions</h2>
            <QuickActions />
          </Column>
        </div>
        
        <div className="cds--row cds--mb-05">
          <Column lg={16} md={8} sm={4}>
            <DashboardCard 
              title="Recent Migrations"
              action={
                <Link href="/migrations" className="cds--link">View all</Link>
              }
            >
              <RecentMigrations />
            </DashboardCard>
          </Column>
        </div>
        
        <div className="cds--row">
          <Column lg={16} md={8} sm={4}>
            <DashboardCard title="Getting Started">
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="cds--bg--interactive-01-hover cds--p-03" style={{ borderRadius: '50%', height: 'fit-content' }}>
                  <InformationFilled size={24} className="cds--icon--interactive-01" />
                </div>
                <div>
                  <h3 className="cds--type-productive-heading-02 cds--mb-03">New to Database Migration?</h3>
                  <p className="cds--type-body-long-01 cds--mb-04">
                    Follow these steps to get started with your first migration project:
                  </p>
                  <ol className="cds--list--ordered cds--mb-04">
                    <li className="cds--list__item">Configure your source and target database connections</li>
                    <li className="cds--list__item">Upload your SQL scripts or stored procedures</li>
                    <li className="cds--list__item">Run the migration analysis to identify potential issues</li>
                    <li className="cds--list__item">Review and approve the converted code</li>
                    <li className="cds--list__item">Execute the migration and verify the results</li>
                  </ol>
                  <div className="cds--mt-04">
                    <Link href="/questionnaire/db-migration" className="cds--link">
                      Start with our setup wizard →
                    </Link>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </Column>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
