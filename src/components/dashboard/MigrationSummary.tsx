
import { Grid, Column, Tile } from "@carbon/react";
import {
  ChartColumnFloating,
  CheckmarkFilled,
  WarningAltFilled,
  ErrorFilled
} from "@carbon/icons-react";

const MigrationSummary = () => {
  const stats = [
    { 
      label: "Total Scripts", 
      value: 128, 
      icon: ChartColumnFloating, 
      color: "#0f62fe" // IBM blue
    },
    { 
      label: "Successfully Converted", 
      value: 89, 
      icon: CheckmarkFilled, 
      color: "#24a148" // IBM green  
    },
    { 
      label: "Warnings", 
      value: 32, 
      icon: WarningAltFilled, 
      color: "#f1c21b" // IBM yellow
    },
    { 
      label: "Failed", 
      value: 7, 
      icon: ErrorFilled, 
      color: "#da1e28" // IBM red
    },
  ];
  
  return (
    <Grid>
      {stats.map((stat, index) => (
        <Column sm={4} md={4} lg={4} key={index}>
          <Tile style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <stat.icon size={24} style={{ color: stat.color }} />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.3 3.7L13.1 7.5 9.3 11.3 8.6 10.6 11.2 8 3 8 3 7 11.2 7 8.6 4.4z" />
              </svg>
            </div>
            <div>
              <div className="cds--type-productive-heading-03" style={{ marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div className="cds--type-body-short-01">{stat.label}</div>
            </div>
          </Tile>
        </Column>
      ))}
    </Grid>
  );
};

export default MigrationSummary;
