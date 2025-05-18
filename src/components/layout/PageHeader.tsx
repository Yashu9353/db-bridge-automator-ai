
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
    <Grid fullWidth className="page-header">
      <Column lg={10} md={4} sm={4}>
        <h1 className="text-productive-heading-04">{title}</h1>
        {description && (
          <p className="text-body-short-01 text-text-secondary mt-1">
            {description}
          </p>
        )}
      </Column>
      {actions && (
        <Column lg={6} md={4} sm={4} className="flex justify-end items-center">
          <div className="flex gap-2">
            {actions}
          </div>
        </Column>
      )}
    </Grid>
  );
};

export default PageHeader;
