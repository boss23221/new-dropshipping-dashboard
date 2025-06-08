import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bug, 
  Database, 
  Trash2, 
  RefreshCw, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface UserCredentials {
  email: string;
  password: string;
  lastUpdated: Date;
}

interface DebugPanelProps {
  userCredentials: UserCredentials;
  language: 'en' | 'ar';
}

export default function DebugPanel({ userCredentials, language }: DebugPanelProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getStoredData = () => {
    try {
      const credentials = localStorage.getItem('newDropshippingCredentials');
      const settings = localStorage.getItem('newDropshippingSettings');
      const profile = localStorage.getItem('newDropshippingProfile');
      const loginStatus = localStorage.getItem('newDropshippingLoggedIn');
      const language = localStorage.getItem('newDropshippingLanguage');

      return {
        credentials: credentials ? JSON.parse(credentials) : null,
        settings: settings ? JSON.parse(settings) : null,
        profile: profile ? JSON.parse(profile) : null,
        loginStatus,
        language,
        storageSize: new Blob([credentials || '', settings || '', profile || '']).size
      };
    } catch (error) {
      return { error: error.message };
    }
  };

  const clearAllData = () => {
    const keys = [
      'newDropshippingCredentials',
      'newDropshippingSettings', 
      'newDropshippingProfile',
      'newDropshippingLoggedIn',
      'newDropshippingLanguage',
      'newDropshippingSuppliers'
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
    
    // Force reload
    window.location.reload();
  };

  const forceReload = () => {
    window.location.reload();
  };

  const storedData = getStoredData();

  return (
    <Card className="border-orange-500/20 bg-orange-50/5 dark:bg-orange-950/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bug className="h-5 w-5 text-orange-500" />
            <span>🐛 Debug Panel</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Current Credentials</span>
            </h4>
            <div className="bg-muted/50 p-3 rounded-lg space-y-1 text-sm">
              <div>Email: <code className="bg-background px-1 rounded">{userCredentials.email}</code></div>
              <div>Password: <code className="bg-background px-1 rounded">
                {showPassword ? userCredentials.password : '••••••••'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-1 h-5 w-5 p-0"
                >
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </code></div>
              <div>Updated: <code className="bg-background px-1 rounded">{userCredentials.lastUpdated.toLocaleString()}</code></div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Storage Status</h4>
            <div className="space-y-2">
              {storedData.error ? (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Error: {storedData.error}</span>
                </Badge>
              ) : (
                <div className="space-y-1">
                  <Badge variant={storedData.credentials ? "default" : "destructive"} className="flex items-center space-x-1">
                    {storedData.credentials ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    <span>Credentials: {storedData.credentials ? 'Stored' : 'Missing'}</span>
                  </Badge>
                  <Badge variant={storedData.settings ? "default" : "destructive"} className="flex items-center space-x-1">
                    {storedData.settings ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                    <span>Settings: {storedData.settings ? 'Stored' : 'Missing'}</span>
                  </Badge>
                  <Badge variant={storedData.loginStatus ? "default" : "secondary"} className="flex items-center space-x-1">
                    <span>Login: {storedData.loginStatus || 'false'}</span>
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {showDetails && !storedData.error && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium">Stored Data Details</h4>
            
            {storedData.credentials && (
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-muted-foreground">Credentials in Storage:</h5>
                <pre className="bg-muted/50 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(storedData.credentials, null, 2)}
                </pre>
              </div>
            )}

            {storedData.settings && (
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-muted-foreground">Settings in Storage:</h5>
                <pre className="bg-muted/50 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(storedData.settings, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={forceReload}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload App
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={clearAllData}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          💡 Use this panel to debug localStorage issues. The app should save credentials automatically when changed in Settings.
        </div>
      </CardContent>
    </Card>
  );
}