
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

// Import Carbon styles
import '@carbon/styles/css/styles.css';

import Index from "./pages/Index";
import Login from "./pages/Login";
import Questionnaire from "./pages/Questionnaire";
import ScriptUpload from "./pages/ScriptUpload";
import DatabaseConnections from "./pages/DatabaseConnections";
import ConversionEditor from "./pages/ConversionEditor";
import NotFound from "./pages/NotFound";

// Create auth context
export const AuthContext = createContext({
  isAuthenticated: false,
  login: (email: string, password: string): boolean => false,
  logout: () => {}
});

const queryClient = new QueryClient();

const App = () => {
  // Use state to track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage on initial load
  useEffect(() => {
    const auth = localStorage.getItem("ibm-migration-auth");
    if (auth) {
      setIsAuthenticated(true);
    } else {
      // Force logout if no auth data is found
      setIsAuthenticated(false);
    }
  }, []);

  // Login function
  const login = (email: string, password: string): boolean => {
    // For demo purposes, accept any email/password combination
    localStorage.setItem("ibm-migration-auth", JSON.stringify({ email }));
    setIsAuthenticated(true);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("ibm-migration-auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
                path="/questionnaire/create" 
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
    </AuthContext.Provider>
  );
};

export default App;
