
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import IBMLogo from "../icons/IBMLogo";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would authenticate with a backend
    console.log("Login with:", { email, password, rememberMe });
    
    // For demo purposes, redirect to dashboard
    window.location.href = "/";
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
              />
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="carbon-checkbox"
                />
                <Label htmlFor="remember-me" className="text-sm text-carbon-gray-70">
                  Remember me
                </Label>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full carbon-button-primary"
            >
              Sign in
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
