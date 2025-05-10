
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Questionnaire from "./pages/Questionnaire";
import ScriptUpload from "./pages/ScriptUpload";
import DatabaseConnections from "./pages/DatabaseConnections";
import ConversionEditor from "./pages/ConversionEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // For demo purposes, assume user is authenticated
  const isAuthenticated = true;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Index /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/questionnaire/:id" 
              element={isAuthenticated ? <Questionnaire /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/scripts/upload" 
              element={isAuthenticated ? <ScriptUpload /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/database/connections" 
              element={isAuthenticated ? <DatabaseConnections /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/conversion/editor" 
              element={isAuthenticated ? <ConversionEditor /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
