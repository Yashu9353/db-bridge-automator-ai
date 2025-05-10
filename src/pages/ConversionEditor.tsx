
import Layout from "@/components/layout/Layout";
import CodeEditor from "@/components/migration/CodeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ConversionEditor = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-carbon-gray-100">SQL Conversion</h1>
          <p className="text-carbon-gray-70 mt-1">
            View and edit your converted SQL code
          </p>
        </div>
        
        <Tabs defaultValue="editor">
          <TabsList className="carbon-tabs border-none">
            <TabsTrigger value="editor" className="carbon-tab-selected">
              Code Editor
            </TabsTrigger>
            <TabsTrigger value="issues" className="carbon-tab-unselected">
              Issues & Feedback
            </TabsTrigger>
            <TabsTrigger value="visual" className="carbon-tab-unselected">
              Visual Comparison
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="pt-4">
            <CodeEditor />
          </TabsContent>
          
          <TabsContent value="issues">
            {/* Issues and feedback content would go here */}
            <div className="py-12 text-center text-carbon-gray-70">
              <p>Issues and feedback panel will be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="visual">
            {/* Visual comparison content would go here */}
            <div className="py-12 text-center text-carbon-gray-70">
              <p>Visual comparison will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ConversionEditor;
