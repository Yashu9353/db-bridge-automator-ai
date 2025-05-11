
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import IBMLogo from "../icons/IBMLogo";
import { AuthContext } from "../../App";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call login function from context
      const success = login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to IBM Database Migration Tool",
          variant: "default",
        });
        
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-carbon-gray-10">
      <div className="hidden lg:block lg:w-1/2 bg-carbon-blue relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="p-12 relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-12">
            <IBMLogo className="h-10 w-10 text-white" />
            <span className="text-white text-xl font-medium">IBM</span>
          </div>
          <div className="flex-1 flex items-center">
            <div>
              <h1 className="text-white text-4xl font-light mb-6">
                AI-Powered Database Migration
              </h1>
              <p className="text-white/80 text-xl max-w-lg">
                Automate your database migration from Teradata to IBM Db2 with our
                advanced AI agent. Convert SQL scripts and stored procedures with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <IBMLogo className="h-10 w-10 text-carbon-blue" />
              <span className="text-carbon-gray-100 text-xl font-medium">IBM</span>
            </div>
            <h2 className="text-2xl font-light text-carbon-gray-100">
              Sign in to Database Migration Tool
            </h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="email" className="carbon-label">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="carbon-field"
                required
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="carbon-label">Password</Label>
                <a href="/forgot-password" className="text-carbon-blue text-sm">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="carbon-field"
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="carbon-checkbox"
                  disabled={isLoading}
                />
                <Label htmlFor="remember-me" className="text-sm text-carbon-gray-70">
                  Remember me
                </Label>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full carbon-button-primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-sm text-carbon-gray-70">
              Don't have an account?{" "}
              <a href="/register" className="text-carbon-blue">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
