
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { fetchDatabaseSchema, getDatabaseConnections } from "@/services/databaseService";
import SchemaSidebar from "@/components/schema-browser/SchemaSidebar";
import SchemaContent from "@/components/schema-browser/SchemaContent";

// Schema browser component
const SchemaBrowser = () => {
  const [activeSchema, setActiveSchema] = useState("SALES");
  const [activeItem, setActiveItem] = useState("Tables");
  const [isLoading, setIsLoading] = useState(true);
  const [schemaData, setSchemaData] = useState<any>(null);
  
  useEffect(() => {
    const loadSchema = async () => {
      setIsLoading(true);
      try {
        // Check for active database connections
        const connections = getDatabaseConnections();
        
        if (!connections.source) {
          toast({
            title: "No source database",
            description: "Please configure a source database connection first",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // Fetch schema data from our simulated backend
        const data = await fetchDatabaseSchema(connections.source.id);
        setSchemaData(data);
      } catch (error) {
        toast({
          title: "Failed to load schema",
          description: "Could not retrieve database schema information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSchema();
  }, []);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-carbon-gray-100">Database Schema Browser</h1>
          <p className="text-carbon-gray-70 mt-1">
            Explore tables, views, stored procedures, and functions in your connected databases
          </p>
        </div>
        
        <div className="flex border border-carbon-gray-20">
          {/* Sidebar navigation */}
          <SchemaSidebar 
            isLoading={isLoading}
            schemaData={schemaData}
            activeSchema={activeSchema}
            setActiveSchema={setActiveSchema}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          
          {/* Main content area */}
          <div className="flex-1 p-6 bg-white">
            <SchemaContent 
              isLoading={isLoading}
              schemaData={schemaData}
              activeSchema={activeSchema}
              activeItem={activeItem}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchemaBrowser;
