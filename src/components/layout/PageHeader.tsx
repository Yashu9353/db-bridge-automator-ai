
import React from "react";
import { Grid, Column } from "@carbon/react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  actions 
}) => {
  return (
    <Grid fullWidth className="cds--mb-05">
      <Column lg={10} md={4} sm={4}>
        <h1 className="cds--type-productive-heading-04">{title}</h1>
        {description && (
          <p className="cds--type-body-long-01 cds--mt-02">
            {description}
          </p>
        )}
      </Column>
      {actions && (
        <Column lg={6} md={4} sm={4} className="cds--col--end">
          <div className="cds--btn-set">
            {actions}
          </div>
        </Column>
      )}
    </Grid>
  );
};

export default PageHeader;
