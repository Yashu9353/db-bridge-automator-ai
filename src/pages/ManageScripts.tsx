
import Layout from "@/components/layout/Layout";
import FileUploader from "@/components/migration/FileUploader";
import { Info, Plus, FileCode, Search, Edit, Eye, Trash, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Sample script data
const scriptSamples = [
  { id: 'script1', name: 'customer_etl.sql', type: 'SQL', size: '12KB', lastModified: '2023-06-15', status: 'Valid' },
  { id: 'script2', name: 'inventory_update.bteq', type: 'BTEQ', size: '18KB', lastModified: '2023-06-14', status: 'Valid' },
  { id: 'script3', name: 'sales_report.sql', type: 'SQL', size: '5KB', lastModified: '2023-06-12', status: 'With Warnings' },
  { id: 'script4', name: 'product_import.sql', type: 'SQL', size: '22KB', lastModified: '2023-06-10', status: 'Valid' },
  { id: 'script5', name: 'user_permissions.sql', type: 'SQL', size: '3KB', lastModified: '2023-06-08', status: 'Invalid' }
];

const ManageScripts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [scripts, setScripts] = useState(scriptSamples);
  const [uploadedScripts, setUploadedScripts] = useState<Array<{
    id: string;
    name: string;
    content: string;
    sqlType?: "teradata" | "db2" | "other";
  }>>([]);
  
  // Load uploaded scripts from session storage
  useEffect(() => {
    const storedScripts = sessionStorage.getItem('uploadedScripts');
    if (storedScripts) {
      try {
        const parsedScripts = JSON.parse(storedScripts);
        setUploadedScripts(parsedScripts);
        
        // Add uploaded scripts to the scripts list
        const newScripts = parsedScripts.map((script: any) => ({
          id: script.id,
          name: script.name,
          type: script.sqlType === 'teradata' ? 'BTEQ' : 'SQL',
          size: `${Math.round(script.content.length / 1024)}KB`,
          lastModified: new Date().toISOString().split('T')[0],
          status: 'Valid'
        }));
        
        setScripts(prev => [...newScripts, ...prev]);
      } catch (error) {
        console.error("Error loading scripts from session storage:", error);
      }
    }
  }, []);
  
  // Filter scripts based on search query
  const filteredScripts = scripts.filter(script => 
    script.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    script.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSqlScripts = filteredScripts.filter(script => 
    script.type === 'SQL'
  );

  const filteredBteqScripts = filteredScripts.filter(script => 
    script.type === 'BTEQ'
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'text-green-600';
      case 'With Warnings': return 'text-amber-500';
      case 'Invalid': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // View script content
  const handleViewScript = (scriptId: string) => {
    const uploadedScript = uploadedScripts.find(s => s.id === scriptId);
    
    if (uploadedScript) {
      // Store the selected script in session storage for access in the editor
      sessionStorage.setItem('selectedScript', JSON.stringify(uploadedScript));
      navigate('/conversion/editor');
    } else {
      // For demo scripts
      const demoScript = {
        id: scriptId,
        name: scripts.find(s => s.id === scriptId)?.name || 'script.sql',
        content: `-- This is a sample ${scripts.find(s => s.id === scriptId)?.type} script
SELECT *
FROM customers
WHERE customer_id > 1000
QUALIFY ROW_NUMBER() OVER (PARTITION BY region ORDER BY sales DESC) = 1;`,
        sqlType: scripts.find(s => s.id === scriptId)?.type.toLowerCase() === 'bteq' ? 'teradata' : 'other'
      };
      
      sessionStorage.setItem('selectedScript', JSON.stringify(demoScript));
      navigate('/conversion/editor');
    }
  };

  // Start migration for a script
  const handleMigrate = (scriptId: string) => {
    const script = scripts.find(s => s.id === scriptId);
    
    toast({
      title: "Starting migration",
      description: `Converting script: ${script?.name}`,
    });
    
    // Set up the script and navigate to conversion editor
    handleViewScript(scriptId);
  };

  // Delete a script
  const handleDelete = (scriptId: string) => {
    setScripts(prev => prev.filter(s => s.id !== scriptId));
    setUploadedScripts(prev => {
      const filtered = prev.filter(s => s.id !== scriptId);
      sessionStorage.setItem('uploadedScripts', JSON.stringify(filtered));
      return filtered;
    });
    
    toast({
      title: "Script deleted",
      description: "The script has been removed from your account",
    });
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
              <Button className="gap-2" onClick={() => navigate('/scripts/upload')}>
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex gap-1 items-center"
                            onClick={() => toast({
                              title: "Edit Script",
                              description: "Editor functionality would open here"
                            })}
                          >
                            <Edit size={14} />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex gap-1 items-center"
                            onClick={() => handleViewScript(script.id)}
                          >
                            <Eye size={14} />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex gap-1 items-center" 
                            onClick={() => handleMigrate(script.id)}
                          >
                            Migrate
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-carbon-error border-carbon-error/20 hover:bg-carbon-error/10"
                            onClick={() => handleDelete(script.id)}
                          >
                            <Trash size={14} />
                          </Button>
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
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search SQL scripts..." 
                    className="pl-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button className="gap-2" onClick={() => navigate('/scripts/upload')}>
                <Plus size={16} />
                New SQL Script
              </Button>
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
                  {filteredSqlScripts.map((script) => (
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
                          <Button variant="outline" size="sm" onClick={() => handleViewScript(script.id)}>View</Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleMigrate(script.id)}
                          >
                            Migrate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSqlScripts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No SQL scripts found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="bteq" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search BTEQ scripts..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button className="gap-2" onClick={() => navigate('/scripts/upload')}>
                <Plus size={16} />
                New BTEQ Script
              </Button>
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
                  {filteredBteqScripts.map((script) => (
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
                          <Button variant="outline" size="sm" onClick={() => handleViewScript(script.id)}>View</Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMigrate(script.id)}
                          >
                            Migrate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredBteqScripts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No BTEQ scripts found.
                      </TableCell>
                    </TableRow>
                  )}
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
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start gap-3 mt-6">
              <AlertTriangle size={20} className="text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Teradata Parser Integration</h3>
                <p className="text-yellow-700 mt-1">
                  The Python parser (TeradataSQLParser) will be used to analyze uploaded Teradata scripts.
                  For best results, ensure your scripts follow Teradata SQL syntax conventions.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManageScripts;
