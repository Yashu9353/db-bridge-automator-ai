
import React from "react";
import { Loader2 } from "lucide-react";
import TablesView from "./TablesView";
import ViewsView from "./ViewsView";
import StoredProceduresView from "./StoredProceduresView";
import FunctionsView from "./FunctionsView";

type SchemaContentProps = {
  isLoading: boolean;
  schemaData: any;
  activeSchema: string;
  activeItem: string;
};

const SchemaContent = ({ isLoading, schemaData, activeSchema, activeItem }: SchemaContentProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-carbon-blue" />
        <span className="ml-2 text-carbon-gray-70">Loading schema information...</span>
      </div>
    );
  }
  
  if (!schemaData) {
    return (
      <div className="text-center py-16">
        <p className="text-carbon-gray-70">No database connection available.</p>
        <p className="text-carbon-gray-60 mt-2">Please configure a source database connection first.</p>
      </div>
    );
  }
  
  const schema = schemaData.schemas.find((s: any) => s.name === activeSchema);
  if (!schema) {
    return <div>Schema not found</div>;
  }
  
  switch (activeItem) {
    case "Tables":
      return <TablesView schema={schema} activeSchema={activeSchema} />;
    case "Views":
      return <ViewsView schema={schema} activeSchema={activeSchema} />;
    case "Stored Procedures":
      return <StoredProceduresView schema={schema} activeSchema={activeSchema} />;
    case "Functions":
      return <FunctionsView schema={schema} activeSchema={activeSchema} />;
    default:
      return <div>Select an item from the sidebar</div>;
  }
};

export default SchemaContent;
