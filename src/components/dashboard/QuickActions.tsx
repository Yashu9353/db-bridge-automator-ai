
import { Grid, Column, ClickableTile } from "@carbon/react";
import { Upload, DataBase, Play } from "@carbon/icons-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Upload Scripts",
      description: "Import SQL and stored procedure scripts",
      icon: Upload,
      href: "/scripts/upload",
      color: "interactive-01"
    },
    {
      title: "Connect Database",
      description: "Configure source and target connections",
      icon: DataBase,
      href: "/database/connections",
      color: "interactive-02"
    },
    {
      title: "Run Migration",
      description: "Execute database migration and conversion",
      icon: Play,
      href: "/conversion/editor",
      color: "interactive-03"
    }
  ];
  
  return (
    <Grid condensed>
      {actions.map((action) => (
        <Column sm={4} md={4} lg={4} key={action.title}>
          <ClickableTile
            href={action.href}
            className={`cds--bg--${action.color} cds--tile--clickable`}
          >
            <div className="cds--mb-03" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <action.icon size={24} />
              <span>→</span>
            </div>
            <h3 className="cds--type-productive-heading-02 cds--mb-02">{action.title}</h3>
            <p className="cds--type-body-short-01">{action.description}</p>
          </ClickableTile>
        </Column>
      ))}
    </Grid>
  );
};

export default QuickActions;
