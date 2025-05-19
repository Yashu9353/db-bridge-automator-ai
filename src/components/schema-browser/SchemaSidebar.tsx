
import React from "react";
import { Loader2, Database, TableIcon, Activity, FileCode, Key } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SchemaItem from "./SchemaItem";
import SidebarItem from "./SidebarItem";

type SchemaSidebarProps = {
  isLoading: boolean;
  schemaData: any;
  activeSchema: string;
  setActiveSchema: (schema: string) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
};

const SchemaSidebar = ({ 
  isLoading, 
  schemaData, 
  activeSchema, 
  setActiveSchema, 
  activeItem, 
  setActiveItem 
}: SchemaSidebarProps) => {
  return (
    <div className="w-64 border-r border-carbon-gray-20 bg-carbon-gray-5">
      <div className="p-4 border-b border-carbon-gray-20 bg-carbon-gray-10">
        <h3 className="font-medium">Database Explorer</h3>
      </div>
      
      <div className="p-2">
        <Accordion 
          type="multiple" 
          defaultValue={["schemas", "scripts"]}
          className="space-y-1"
        >
          <AccordionItem value="schemas" className="border-b-0">
            <AccordionTrigger className="py-2 px-2 hover:bg-carbon-gray-10 hover:no-underline">
              <div className="flex items-center text-sm font-medium">
                <Database size={16} className="mr-2 text-carbon-blue" />
                Schemas
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 size={16} className="animate-spin text-carbon-blue" />
                  <span className="ml-2 text-sm">Loading...</span>
                </div>
              ) : (
                schemaData?.schemas.map((schema: any) => (
                  <SchemaItem 
                    key={schema.name}
                    name={schema.name}
                    isActive={activeSchema === schema.name}
                    onClick={() => setActiveSchema(schema.name)}
                  />
                ))
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="objects" className="border-b-0">
            <AccordionTrigger className="py-2 px-2 hover:bg-carbon-gray-10 hover:no-underline">
              <div className="flex items-center text-sm font-medium">
                <TableIcon size={16} className="mr-2 text-carbon-blue" />
                Database Objects
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-1">
              <SidebarItem 
                name="Tables" 
                isActive={activeItem === "Tables"}
                icon={<TableIcon size={16} className="text-carbon-blue" />}
                onClick={() => setActiveItem("Tables")}
              />
              <SidebarItem 
                name="Views" 
                isActive={activeItem === "Views"}
                icon={<TableIcon size={16} className="text-carbon-green" />}
                onClick={() => setActiveItem("Views")}
              />
              <SidebarItem 
                name="Stored Procedures" 
                isActive={activeItem === "Stored Procedures"}
                icon={<Activity size={16} className="text-carbon-purple" />}
                onClick={() => setActiveItem("Stored Procedures")}
              />
              <SidebarItem 
                name="Functions" 
                isActive={activeItem === "Functions"}
                icon={<Activity size={16} className="text-carbon-teal" />}
                onClick={() => setActiveItem("Functions")}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="scripts" className="border-b-0">
            <AccordionTrigger className="py-2 px-2 hover:bg-carbon-gray-10 hover:no-underline">
              <div className="flex items-center text-sm font-medium">
                <FileCode size={16} className="mr-2 text-carbon-blue" />
                SQL Scripts
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-1">
              <SidebarItem 
                name="SQL" 
                isActive={activeItem === "SQL"}
                icon={<FileCode size={16} className="text-carbon-blue" />}
                onClick={() => setActiveItem("SQL")}
              />
              <SidebarItem 
                name="BTEQ" 
                isActive={activeItem === "BTEQ"}
                icon={<FileCode size={16} className="text-carbon-orange" />}
                onClick={() => setActiveItem("BTEQ")}
              />
              <SidebarItem 
                name="DCL" 
                isActive={activeItem === "DCL"}
                icon={<Key size={16} className="text-carbon-purple" />}
                onClick={() => setActiveItem("DCL")}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SchemaSidebar;
