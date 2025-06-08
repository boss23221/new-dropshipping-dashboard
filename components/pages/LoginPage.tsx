import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Eye, EyeOff, LogIn, Mail, Lock, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserCredentials {
  email: string;
  password: string;
  lastUpdated: Date;
}

interface LoginPageProps {
  onLogin: (email?: string, password?: string) => boolean;
  storedCredentials: UserCredentials;
}

export default function LoginPage({ onLogin, storedCredentials }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('⚠️ Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const loginSuccess = onLogin(formData.email, formData.password);
      
      if (loginSuccess) {
        toast.success(
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>✅ Welcome back! Login successful</span>
          </div>
        );
        setLoginAttempts(0);
      } else {
        setLoginAttempts(prev => prev + 1);
        toast.error(
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>❌ Invalid email or password</span>
          </div>
        );
        
        if (loginAttempts >= 2) {
          toast.warning('🔒 Multiple failed attempts detected. Please use demo access or check your credentials.');
        }
      }
    } catch (error) {
      toast.error('❌ Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuickLogin = () => {
    toast.success(
      <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-green-500" />
        <span>✅ Quick login successful!</span>
      </div>
    );
    onLogin();
  };

  const handleFillCredentials = () => {
    setFormData({
      email: storedCredentials.email,
      password: storedCredentials.password
    });
    toast.info('🔑 Credentials filled for testing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Supply Manager</h1>
          <p className="text-slate-400">Sign in to manage your supplier network</p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
              <LogIn className="h-5 w-5 text-red-500" />
              <span>🔐 Sign In</span>
            </CardTitle>
            {loginAttempts > 0 && (
              <div className="text-center text-xs text-yellow-400 flex items-center justify-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Attempts: {loginAttempts}/3</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2 text-slate-200">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2 text-slate-200">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    🔐 Sign In
                  </>
                )}
              </Button>
            </form>

            <Separator className="bg-slate-600" />

            {/* Quick Access */}
            <div className="space-y-3">
              <p className="text-xs text-center text-slate-400">
                💡 Demo Options
              </p>
              
              <div className="space-y-2">
                <Button
                  onClick={handleFillCredentials}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-xs"
                >
                  🔑 Fill Test Credentials
                </Button>
                
                <Button
                  onClick={handleQuickLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  🚀 Quick Demo Access
                </Button>
              </div>
              
              <div className="text-xs text-center text-slate-500 space-y-1">
                <p>🔒 Secure authentication system</p>
                <p className="text-slate-600">
                  Last updated: {storedCredentials.lastUpdated.toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm">
          <p>🔒 Advanced security features available in Settings</p>
        </div>
      </div>
    </div>
  );
}