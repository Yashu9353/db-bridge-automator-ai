
import { Grid, Column, Tile } from "@carbon/react";
import {
  ChartColumnFloating,
  CheckmarkFilled,
  WarningAltFilled,
  CloseFilled
} from "@carbon/icons-react";

const MigrationSummary = () => {
  const stats = [
    { label: "Total Scripts", value: 128, icon: ChartColumnFloating, color: "interactive-01" },
    { label: "Successfully Converted", value: 89, icon: CheckmarkFilled, color: "support-02" },
    { label: "Warnings", value: 32, icon: WarningAltFilled, color: "support-03" },
    { label: "Failed", value: 7, icon: CloseFilled, color: "support-01" },
  ];
  
  return (
    <Grid condensed>
      {stats.map((stat) => (
        <Column sm={4} md={4} lg={4} key={stat.label}>
          <Tile>
            <div className="cds--tile-content">
              <div className="cds--mb-04" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <stat.icon size={24} className={`cds--icon--${stat.color}`} />
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.3 3.7L13.1 7.5 9.3 11.3 8.6 10.6 11.2 8 3 8 3 7 11.2 7 8.6 4.4z" />
                </svg>
              </div>
              <div>
                <div className="cds--type-productive-heading-03 cds--mb-02">
                  {stat.value}
                </div>
                <div className="cds--type-body-short-01">{stat.label}</div>
              </div>
            </div>
          </Tile>
        </Column>
      ))}
    </Grid>
  );
};

export default MigrationSummary;
