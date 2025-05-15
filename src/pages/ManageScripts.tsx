
import Layout from "@/components/layout/Layout";
import FileUploader from "@/components/migration/FileUploader";
import { Info, Plus, FileCode, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample script data
const scriptSamples = [
  { id: 'script1', name: 'customer_etl.sql', type: 'SQL', size: '12KB', lastModified: '2023-06-15', status: 'Valid' },
  { id: 'script2', name: 'inventory_update.bteq', type: 'BTEQ', size: '18KB', lastModified: '2023-06-14', status: 'Valid' },
  { id: 'script3', name: 'sales_report.sql', type: 'SQL', size: '5KB', lastModified: '2023-06-12', status: 'With Warnings' },
  { id: 'script4', name: 'product_import.sql', type: 'SQL', size: '22KB', lastModified: '2023-06-10', status: 'Valid' },
  { id: 'script5', name: 'user_permissions.sql', type: 'SQL', size: '3KB', lastModified: '2023-06-08', status: 'Invalid' }
];

const ManageScripts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scripts, setScripts] = useState(scriptSamples);
  
  // Filter scripts based on search query
  const filteredScripts = scripts.filter(script => 
    script.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    script.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'text-green-600';
      case 'With Warnings': return 'text-amber-500';
      case 'Invalid': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-carbon-gray-100">Manage SQL Scripts</h1>
          <p className="text-carbon-gray-70 mt-1">
            Upload, organize and manage your SQL, BTEQ, and stored procedure scripts
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Scripts</TabsTrigger>
            <TabsTrigger value="sql">SQL</TabsTrigger>
            <TabsTrigger value="bteq">BTEQ</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search scripts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                New Script
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScripts.map((script) => (
                    <TableRow key={script.id}>
                      <TableCell className="flex items-center gap-2">
                        <FileCode size={16} className="text-carbon-blue" />
                        <span className="font-medium">{script.name}</span>
                      </TableCell>
                      <TableCell>{script.type}</TableCell>
                      <TableCell>{script.size}</TableCell>
                      <TableCell>{script.lastModified}</TableCell>
                      <TableCell>
                        <span className={getStatusColor(script.status)}>
                          {script.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredScripts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No scripts found. Try a different search or upload new scripts.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="sql" className="space-y-4">
            {/* Same structure as "all" tab but filtered for SQL only */}
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search SQL scripts..." className="pl-8" />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScripts
                    .filter(script => script.type === 'SQL')
                    .map((script) => (
                      <TableRow key={script.id}>
                        <TableCell className="flex items-center gap-2">
                          <FileCode size={16} className="text-carbon-blue" />
                          <span className="font-medium">{script.name}</span>
                        </TableCell>
                        <TableCell>{script.size}</TableCell>
                        <TableCell>{script.lastModified}</TableCell>
                        <TableCell>
                          <span className={getStatusColor(script.status)}>
                            {script.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="bteq" className="space-y-4">
            {/* Same structure as "all" tab but filtered for BTEQ only */}
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search BTEQ scripts..." className="pl-8" />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScripts
                    .filter(script => script.type === 'BTEQ')
                    .map((script) => (
                      <TableRow key={script.id}>
                        <TableCell className="flex items-center gap-2">
                          <FileCode size={16} className="text-carbon-blue" />
                          <span className="font-medium">{script.name}</span>
                        </TableCell>
                        <TableCell>{script.size}</TableCell>
                        <TableCell>{script.lastModified}</TableCell>
                        <TableCell>
                          <span className={getStatusColor(script.status)}>
                            {script.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="bg-carbon-blue bg-opacity-10 border-l-4 border-carbon-blue p-4 flex items-start gap-3">
              <Info size={20} className="text-carbon-blue mt-0.5" />
              <div>
                <h3 className="font-medium text-carbon-gray-100">Supported File Types</h3>
                <p className="text-carbon-gray-70 mt-1">
                  You can upload .sql, .bteq, or .txt files containing SQL code. 
                  For best results, each file should contain related queries or a single stored procedure.
                </p>
              </div>
            </div>
            
            <FileUploader />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManageScripts;
