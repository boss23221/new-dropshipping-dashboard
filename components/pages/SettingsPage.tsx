import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import SecuritySettings from '../SecuritySettings';
import LanguageSettings from '../LanguageSettings';
import ProfileSettings from '../ProfileSettings';
import DebugPanel from '../DebugPanel';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Grid3X3, 
  RefreshCw, 
  Clock, 
  Shield,
  User,
  Monitor,
  Moon,
  Sun,
  Languages,
  Bug
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, getTranslation } from '../i18n/translations';

interface Settings {
  theme: 'light' | 'dark';
  gridColumns: 1 | 2 | 3 | 4;
  autoRefresh: boolean;
  refreshInterval: number;
  language: Language;
}

interface UserCredentials {
  email: string;
  password: string;
  lastUpdated: Date;
}

interface UserProfile {
  name: string;
  email: string;
  lastLogin: Date;
  joinDate: Date;
}

interface SettingsPageProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onLanguageChange: (language: Language) => void;
  userCredentials: UserCredentials;
  onCredentialsChange: (newCredentials: Partial<UserCredentials>) => void;
  userProfile: UserProfile;
  onProfileChange: (profile: Partial<UserProfile>) => void;
  language: Language;
}

export default function SettingsPage({ 
  settings, 
  onSettingsChange, 
  onLanguageChange,
  userCredentials, 
  onCredentialsChange,
  userProfile,
  onProfileChange,
  language 
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('general');

  const handleThemeChange = (theme: 'light' | 'dark') => {
    const newSettings = { ...settings, theme };
    onSettingsChange(newSettings);
    
    // Apply theme immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    const modeText = theme === 'dark' 
      ? (language === 'ar' ? 'الداكن' : 'dark') 
      : (language === 'ar' ? 'الفاتح' : 'light');
    toast.success(`🎨 ${getTranslation('themeChanged', language)} ${modeText} ${language === 'ar' ? '' : 'mode'}`);
  };

  const handleGridColumnsChange = (columns: string) => {
    const gridColumns = parseInt(columns) as 1 | 2 | 3 | 4;
    const newSettings = { ...settings, gridColumns };
    onSettingsChange(newSettings);
    toast.success(`📱 ${getTranslation('layoutUpdated', language)} ${columns} ${language === 'ar' ? 'أعمدة' : 'columns'}`);
  };

  const handleAutoRefreshChange = (autoRefresh: boolean) => {
    const newSettings = { ...settings, autoRefresh };
    onSettingsChange(newSettings);
    toast.success(
      autoRefresh 
        ? `🔄 ${getTranslation('autoRefreshEnabled', language)} (${language === 'ar' ? 'كل' : 'every'} ${settings.refreshInterval}${language === 'ar' ? 'ث' : 's'})`
        : `⏸️ ${getTranslation('autoRefreshDisabled', language)}`
    );
  };

  const handleRefreshIntervalChange = (interval: string) => {
    const refreshInterval = parseInt(interval);
    const newSettings = { ...settings, refreshInterval };
    onSettingsChange(newSettings);
    toast.success(`⏰ ${getTranslation('refreshIntervalSet', language)} ${interval} ${language === 'ar' ? 'ثانية' : 'seconds'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">⚙️</span>
          <div>
            <h1 className="text-3xl">{getTranslation('settings', language)}</h1>
            <p className="text-muted-foreground">{getTranslation('customizePreferences', language)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl">🔧</div>
          <div className="text-sm text-muted-foreground">
            {getTranslation('configuration', language)}
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span>⚙️ {getTranslation('general', language)}</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>👤 {language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>🎨 {getTranslation('appearance', language)}</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <span>🌐 {getTranslation('language', language)}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>🔒 {getTranslation('security', language)}</span>
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex items-center space-x-2">
            <Bug className="h-4 w-4" />
            <span>🐛 Debug</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-blue-500" />
                <span>🔄 {getTranslation('autoRefresh', language)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">{getTranslation('enableAutoRefresh', language)}</Label>
                  <p className="text-sm text-muted-foreground">
                    {getTranslation('autoRefreshDescription', language)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={settings.autoRefresh}
                    onCheckedChange={handleAutoRefreshChange}
                  />
                  {settings.autoRefresh && (
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      ✅ {getTranslation('active', language)}
                    </Badge>
                  )}
                </div>
              </div>

              {settings.autoRefresh && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <Label>{getTranslation('refreshInterval', language)}</Label>
                    </div>
                    <Select 
                      value={settings.refreshInterval.toString()} 
                      onValueChange={handleRefreshIntervalChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">⚡ 10 {language === 'ar' ? 'ثوانِ' : 'seconds'}</SelectItem>
                        <SelectItem value="30">🔄 30 {language === 'ar' ? 'ثانية' : 'seconds'}</SelectItem>
                        <SelectItem value="60">⏰ 1 {language === 'ar' ? 'دقيقة' : 'minute'}</SelectItem>
                        <SelectItem value="300">🕐 5 {language === 'ar' ? 'دقائق' : 'minutes'}</SelectItem>
                        <SelectItem value="600">📅 10 {language === 'ar' ? 'دقائق' : 'minutes'}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      ⏰ {language === 'ar' ? 'الفترة الحالية:' : 'Current interval:'} {settings.refreshInterval} {language === 'ar' ? 'ثانية' : 'seconds'}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings 
            userProfile={userProfile}
            onProfileChange={onProfileChange}
            language={language}
          />
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-purple-500" />
                <span>🎨 {getTranslation('theme', language)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => handleThemeChange('light')}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    settings.theme === 'light' 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">☀️ {getTranslation('lightMode', language)}</div>
                      <div className="text-sm text-muted-foreground">{getTranslation('brightClean', language)}</div>
                    </div>
                  </div>
                  {settings.theme === 'light' && (
                    <div className="mt-2 text-blue-500 text-sm flex items-center space-x-1">
                      <Badge variant="outline" className="text-blue-500 border-blue-500">
                        ✅ {getTranslation('active', language)}
                      </Badge>
                    </div>
                  )}
                </div>

                <div 
                  onClick={() => handleThemeChange('dark')}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    settings.theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Moon className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">🌙 {getTranslation('darkMode', language)}</div>
                      <div className="text-sm text-muted-foreground">{getTranslation('easyOnEyes', language)}</div>
                    </div>
                  </div>
                  {settings.theme === 'dark' && (
                    <div className="mt-2 text-blue-500 text-sm flex items-center space-x-1">
                      <Badge variant="outline" className="text-blue-500 border-blue-500">
                        ✅ {getTranslation('active', language)}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Grid3X3 className="h-5 w-5 text-green-500" />
                <span>📱 {getTranslation('layout', language)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>{getTranslation('gridColumns', language)}</Label>
                <Select 
                  value={settings.gridColumns.toString()} 
                  onValueChange={handleGridColumnsChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">📱 1 {language === 'ar' ? 'عمود (موبايل)' : 'Column (Mobile)'}</SelectItem>
                    <SelectItem value="2">💻 2 {language === 'ar' ? 'أعمدة (تابلت)' : 'Columns (Tablet)'}</SelectItem>
                    <SelectItem value="3">🖥️ 3 {language === 'ar' ? 'أعمدة (سطح المكتب)' : 'Columns (Desktop)'}</SelectItem>
                    <SelectItem value="4">🖱️ 4 {language === 'ar' ? 'أعمدة (عريض)' : 'Columns (Wide)'}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  📐 {language === 'ar' 
                    ? 'التخطيط المتجاوب سيتم تعديله تلقائياً على الشاشات الأصغر'
                    : 'Responsive layout will adjust automatically on smaller screens'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Settings */}
        <TabsContent value="language" className="space-y-6">
          <LanguageSettings 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <SecuritySettings 
            userCredentials={userCredentials}
            onCredentialsChange={onCredentialsChange}
            language={language}
          />
        </TabsContent>

        {/* Debug Panel */}
        <TabsContent value="debug" className="space-y-6">
          <DebugPanel 
            userCredentials={userCredentials}
            language={language}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}