import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, Table as TableIcon, FileCode, Activity, Key } from "lucide-react";

// Schema browser component
const SchemaBrowser = () => {
  const [selectedDatabase, setSelectedDatabase] = useState("teradata");
  
  // Sample schema data - in a real application, this would come from an API
  const schemaData = {
    tables: [
      { name: "customer", columns: 12, rows: "1.2M", lastUpdated: "2023-06-15" },
      { name: "orders", columns: 8, rows: "3.5M", lastUpdated: "2023-06-14" },
      { name: "products", columns: 15, rows: "45K", lastUpdated: "2023-06-10" },
      { name: "inventory", columns: 6, rows: "120K", lastUpdated: "2023-06-12" },
    ],
    views: [
      { name: "customer_orders", baseTables: "customer, orders", created: "2023-05-10" },
      { name: "inventory_status", baseTables: "inventory, products", created: "2023-04-25" },
      { name: "sales_summary", baseTables: "orders, products", created: "2023-06-01" },
    ],
    procedures: [
      { name: "update_inventory", parameters: 3, lastModified: "2023-05-20" },
      { name: "process_order", parameters: 5, lastModified: "2023-06-05" },
      { name: "generate_report", parameters: 2, lastModified: "2023-05-15" },
    ],
    functions: [
      { name: "calculate_tax", returnType: "DECIMAL", parameters: 2 },
      { name: "format_address", returnType: "VARCHAR", parameters: 4 },
      { name: "validate_email", returnType: "BOOLEAN", parameters: 1 },
    ],
    scripts: [
      { name: "daily_etl.sql", type: "SQL", size: "15KB", lastModified: "2023-06-10" },
      { name: "load_data.bteq", type: "BTEQ", size: "22KB", lastModified: "2023-05-28" },
      { name: "update_stats.sql", type: "SQL", size: "8KB", lastModified: "2023-06-12" },
    ],
    security: [
      { name: "GRANT_SALES_ACCESS", type: "GRANT", object: "sales_data", role: "sales_analyst" },
      { name: "REVOKE_ADMIN", type: "REVOKE", object: "system_config", role: "app_user" },
      { name: "GRANT_REPORTING", type: "GRANT", object: "reporting_views", role: "report_user" },
    ]
  };

  const databases = [
    { id: "teradata", name: "Teradata", type: "Source" },
    { id: "db2", name: "IBM Db2", type: "Target" }
  ];

  const renderSchemaItem = (item: any, icon: React.ReactNode) => (
    <div className="flex items-center gap-3 p-2 hover:bg-carbon-gray-10 rounded cursor-pointer">
      {icon}
      <span>{item.name}</span>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-carbon-gray-100">Schema Browser</h1>
          <p className="text-carbon-gray-70 mt-1">
            Browse and explore database schema objects
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Database selector */}
          <div className="col-span-12 mb-4">
            <div className="flex gap-4">
              {databases.map((db) => (
                <button
                  key={db.id}
                  onClick={() => setSelectedDatabase(db.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedDatabase === db.id
                      ? "bg-carbon-blue text-white"
                      : "bg-carbon-gray-10 text-carbon-gray-80 hover:bg-carbon-gray-20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Database size={18} />
                    <div>
                      <div className="font-medium">{db.name}</div>
                      <div className="text-xs opacity-75">{db.type}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Left sidebar for schema navigation */}
          <div className="col-span-3">
            <div className="border border-carbon-gray-20 rounded-md overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="schema">
                  <AccordionTrigger className="px-3 py-2 bg-carbon-gray-10 font-medium">
                    Schema Objects
                  </AccordionTrigger>
                  <AccordionContent className="p-2 space-y-1">
                    {renderSchemaItem({ name: "Tables" }, <TableIcon size={16} className="text-carbon-blue" />)}
                    {renderSchemaItem({ name: "Views" }, <TableIcon size={16} className="text-carbon-green" />)}
                    {renderSchemaItem({ name: "Stored Procedures" }, <Activity size={16} className="text-carbon-purple" />)}
                    {renderSchemaItem({ name: "Functions" }, <Activity size={16} className="text-carbon-teal" />)}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="scripts">
                  <AccordionTrigger className="px-3 py-2 bg-carbon-gray-10 font-medium">
                    SQL Scripts
                  </AccordionTrigger>
                  <AccordionContent className="p-2 space-y-1">
                    {renderSchemaItem({ name: "SQL" }, <FileCode size={16} className="text-carbon-blue" />)}
                    {renderSchemaItem({ name: "BTEQ" }, <FileCode size={16} className="text-carbon-orange" />)}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="security">
                  <AccordionTrigger className="px-3 py-2 bg-carbon-gray-10 font-medium">
                    Security
                  </AccordionTrigger>
                  <AccordionContent className="p-2 space-y-1">
                    {renderSchemaItem({ name: "DCL (Grant/Revoke)" }, <Key size={16} className="text-carbon-red" />)}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Main content area */}
          <div className="col-span-9">
            <Tabs defaultValue="tables">
              <TabsList className="mb-4">
                <TabsTrigger value="tables">Tables</TabsTrigger>
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="procedures">Stored Procedures</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="scripts">Scripts</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tables" className="border rounded-md border-carbon-gray-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Columns</TableHead>
                      <TableHead>Rows (Est.)</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaData.tables.map((table) => (
                      <TableRow key={table.name}>
                        <TableCell className="font-medium">{table.name}</TableCell>
                        <TableCell>{table.columns}</TableCell>
                        <TableCell>{table.rows}</TableCell>
                        <TableCell>{table.lastUpdated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="views" className="border rounded-md border-carbon-gray-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Base Tables</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaData.views.map((view) => (
                      <TableRow key={view.name}>
                        <TableCell className="font-medium">{view.name}</TableCell>
                        <TableCell>{view.baseTables}</TableCell>
                        <TableCell>{view.created}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="procedures" className="border rounded-md border-carbon-gray-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Parameters</TableHead>
                      <TableHead>Last Modified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaData.procedures.map((proc) => (
                      <TableRow key={proc.name}>
                        <TableCell className="font-medium">{proc.name}</TableCell>
                        <TableCell>{proc.parameters}</TableCell>
                        <TableCell>{proc.lastModified}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="functions" className="border rounded-md border-carbon-gray-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Return Type</TableHead>
                      <TableHead>Parameters</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaData.functions.map((func) => (
                      <TableRow key={func.name}>
                        <TableCell className="font-medium">{func.name}</TableCell>
                        <TableCell>{func.returnType}</TableCell>
                        <TableCell>{func.parameters}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="scripts" className="border rounded-md border-carbon-gray-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Modified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaData.scripts.map((script) => (
                      <TableRow key={script.name}>
                        <TableCell className="font-medium">{script.name}</TableCell>
                        <TableCell>{script.type}</TableCell>
                        <TableCell>{script.size}</TableCell>
                        <TableCell>{script.lastModified}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="security" className="border rounded-md border-carbon-gray-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Object</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemaData.security.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.object}</TableCell>
                        <TableCell>{item.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchemaBrowser;
