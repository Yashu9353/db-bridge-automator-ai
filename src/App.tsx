
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect, createContext } from "react";

// Import Carbon styles
import '@carbon/styles/css/styles.css';

import Index from "./pages/Index";
// import Login from "./pages/Login";
import Questionnaire from "./pages/Questionnaire";
import ScriptUpload from "./pages/ScriptUpload";
import ManageScripts from "./pages/ManageScripts";
import DatabaseConnections from "./pages/DatabaseConnections";
import SchemaBrowser from "./pages/SchemaBrowser";
import ConversionEditor from "./pages/ConversionEditor";
import NotFound from "./pages/NotFound";

// Create auth context - COMMENTED OUT FOR NOW
// export const AuthContext = createContext({
//   isAuthenticated: false,
//   login: (email: string, password: string): boolean => false,
//   logout: () => {}
// });

const queryClient = new QueryClient();

const App = () => {
  // COMMENTED OUT - Authentication state management
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage on initial load - COMMENTED OUT
  // useEffect(() => {
  //   const auth = localStorage.getItem("ibm-migration-auth");
  //   if (auth) {
  //     setIsAuthenticated(true);
  //   } else {
  //     // Force logout if no auth data is found
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  // Login function - COMMENTED OUT
  // const login = (email: string, password: string): boolean => {
  //   // For demo purposes, accept any email/password combination
  //   localStorage.setItem("ibm-migration-auth", JSON.stringify({ email }));
  //   setIsAuthenticated(true);
  //   return true;
  // };

  // Logout function - COMMENTED OUT
  // const logout = () => {
  //   localStorage.removeItem("ibm-migration-auth");
  //   setIsAuthenticated(false);
  // };

  return (
    // COMMENTED OUT - Auth context provider
    // <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* COMMENTED OUT - Login route and auth checks */}
              {/* <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
              /> */}
              <Route 
                path="/" 
                element={<Index />}
                // element={isAuthenticated ? <Index /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/questionnaire/:id" 
                element={<Questionnaire />}
                // element={isAuthenticated ? <Questionnaire /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/questionnaire/create" 
                element={<Questionnaire />}
                // element={isAuthenticated ? <Questionnaire /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/scripts/upload" 
                element={<ScriptUpload />}
                // element={isAuthenticated ? <ScriptUpload /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/scripts/manage" 
                element={<ManageScripts />}
                // element={isAuthenticated ? <ManageScripts /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/database/connections" 
                element={<DatabaseConnections />}
                // element={isAuthenticated ? <DatabaseConnections /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/database/schema" 
                element={<SchemaBrowser />}
                // element={isAuthenticated ? <SchemaBrowser /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/conversion/editor" 
                element={<ConversionEditor />}
                // element={isAuthenticated ? <ConversionEditor /> : <Navigate to="/login" />} 
              />
              {/* Add redirect for /run to /conversion/editor */}
              <Route 
                path="/run" 
                element={<Navigate to="/conversion/editor" replace />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    // </AuthContext.Provider>
  );
};

export default App;
