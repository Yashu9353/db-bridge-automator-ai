
import { Grid, Column, ClickableTile } from "@carbon/react";
import { Upload, DataBase, Play } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: "Upload Scripts",
      description: "Import SQL and stored procedure scripts",
      icon: Upload,
      href: "/scripts/upload",
      color: "#0f62fe" // IBM blue
    },
    {
      title: "Connect Database",
      description: "Configure source and target connections",
      icon: DataBase,
      href: "/database/connections",
      color: "#0f62fe" // IBM blue
    },
    {
      title: "Run Migration",
      description: "Execute database migration and conversion",
      icon: Play,
      href: "/conversion/editor",
      color: "#0f62fe" // IBM blue
    }
  ];
  
  return (
    <Grid>
      {actions.map((action, index) => (
        <Column sm={4} md={8/3} lg={16/3} key={index}>
          <ClickableTile
            className="cds--tile-action"
            style={{
              backgroundColor: action.color,
              color: '#ffffff',
              height: '100%',
              padding: '1.5rem'
            }}
            onClick={() => navigate(action.href)}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '1rem' 
            }}>
              <action.icon size={24} />
              <div style={{ fontSize: '1.25rem' }}>&rarr;</div>
            </div>
            <h3 className="cds--type-productive-heading-02">{action.title}</h3>
            <p className="cds--type-body-short-01" style={{ marginTop: '0.5rem' }}>
              {action.description}
            </p>
          </ClickableTile>
        </Column>
      ))}
    </Grid>
  );
};

export default QuickActions;
