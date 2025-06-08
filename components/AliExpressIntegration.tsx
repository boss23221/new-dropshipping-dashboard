import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertTriangle, CheckCircle, ExternalLink, Key, Settings, Zap, Download, Upload } from 'lucide-react';
import { Language } from './i18n/translations';
import { toast } from 'sonner@2.0.3';

interface AliExpressConfig {
  apiKey: string;
  appKey: string;
  secretKey: string;
  accessToken: string;
  isEnabled: boolean;
  autoImport: boolean;
  syncInterval: number;
  lastSync: Date | null;
  isConnected: boolean;
}

interface AliExpressIntegrationProps {
  config: AliExpressConfig;
  onConfigChange: (config: AliExpressConfig) => void;
  language: Language;
}

export default function AliExpressIntegration({
  config,
  onConfigChange,
  language
}: AliExpressIntegrationProps) {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleConfigChange = (updates: Partial<AliExpressConfig>) => {
    const newConfig = { ...config, ...updates };
    onConfigChange(newConfig);
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    
    // Simulate API connection test
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = config.apiKey && config.appKey && config.secretKey;
      
      if (success) {
        handleConfigChange({ 
          isConnected: true,
          lastSync: new Date()
        });
        toast.success(
          language === 'ar' 
            ? '✅ تم الاتصال بـ AliExpress بنجاح!'
            : '✅ Successfully connected to AliExpress!'
        );
      } else {
        handleConfigChange({ isConnected: false });
        toast.error(
          language === 'ar'
            ? '❌ فشل في الاتصال. تحقق من مفاتيح API'
            : '❌ Connection failed. Please check your API keys'
        );
      }
    } catch (error) {
      toast.error(
        language === 'ar'
          ? '❌ خطأ في الاتصال'
          : '❌ Connection error'
      );
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSync = async () => {
    if (!config.isConnected) {
      toast.error(
        language === 'ar'
          ? '⚠️ يجب الاتصال أولاً'
          : '⚠️ Must connect first'
      );
      return;
    }

    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      handleConfigChange({ lastSync: new Date() });
      toast.success(
        language === 'ar'
          ? '🔄 تم مزامنة المنتجات بنجاح!'
          : '🔄 Products synced successfully!'
      );
    } catch (error) {
      toast.error(
        language === 'ar'
          ? '❌ فشل في المزامنة'
          : '❌ Sync failed'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">A</span>
              </div>
              <div>
                <h3 className="text-xl">
                  {language === 'ar' ? 'تكامل AliExpress' : 'AliExpress Integration'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'اربط حسابك لاستيراد المنتجات وتنفيذ الطلبات'
                    : 'Connect your account to import products and fulfill orders'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {config.isConnected ? (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-orange-500 border-orange-500">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {language === 'ar' ? 'غير متصل' : 'Disconnected'}
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">
                {language === 'ar' ? 'تفعيل التكامل' : 'Enable Integration'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'تشغيل/إيقاف تكامل AliExpress'
                  : 'Turn AliExpress integration on/off'
                }
              </p>
            </div>
            <Switch
              checked={config.isEnabled}
              onCheckedChange={(isEnabled) => handleConfigChange({ isEnabled })}
            />
          </div>
        </CardContent>
      </Card>

      {config.isEnabled && (
        <>
          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-blue-500" />
                <span>
                  {language === 'ar' ? 'إعدادات API' : 'API Configuration'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === 'ar' ? 'مفتاح API' : 'API Key'}
                  </Label>
                  <Input
                    type={showApiKeys ? 'text' : 'password'}
                    placeholder={language === 'ar' ? 'أدخل مفتاح API' : 'Enter API Key'}
                    value={config.apiKey}
                    onChange={(e) => handleConfigChange({ apiKey: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>
                    {language === 'ar' ? 'مفتاح التطبيق' : 'App Key'}
                  </Label>
                  <Input
                    type={showApiKeys ? 'text' : 'password'}
                    placeholder={language === 'ar' ? 'أدخل مفتاح التطبيق' : 'Enter App Key'}
                    value={config.appKey}
                    onChange={(e) => handleConfigChange({ appKey: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>
                    {language === 'ar' ? 'المفتاح السري' : 'Secret Key'}
                  </Label>
                  <Input
                    type={showApiKeys ? 'text' : 'password'}
                    placeholder={language === 'ar' ? 'أدخل المفتاح السري' : 'Enter Secret Key'}
                    value={config.secretKey}
                    onChange={(e) => handleConfigChange({ secretKey: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>
                    {language === 'ar' ? 'رمز الوصول' : 'Access Token'}
                  </Label>
                  <Input
                    type={showApiKeys ? 'text' : 'password'}
                    placeholder={language === 'ar' ? 'أدخل رمز الوصول' : 'Enter Access Token'}
                    value={config.accessToken}
                    onChange={(e) => handleConfigChange({ accessToken: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApiKeys(!showApiKeys)}
                >
                  {showApiKeys ? '🙈' : '👁️'} {language === 'ar' ? 'إظهار/إخفاء المفاتيح' : 'Show/Hide Keys'}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={isTestingConnection || !config.apiKey || !config.appKey}
                  >
                    {isTestingConnection ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current mr-2" />
                        {language === 'ar' ? 'جاري الاختبار...' : 'Testing...'}
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
                      </>
                    )}
                  </Button>
                  
                  <Button asChild>
                    <a 
                      href="https://developers.aliexpress.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'الحصول على المفاتيح' : 'Get API Keys'}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Help Text */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {language === 'ar' ? '📋 كيفية الحصول على مفاتيح API:' : '📋 How to get API keys:'}
                </h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>
                    {language === 'ar' 
                      ? 'قم بزيارة AliExpress Developer Center'
                      : 'Visit AliExpress Developer Center'
                    }
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'أنشئ تطبيق جديد أو استخدم تطبيق موجود'
                      : 'Create a new app or use existing one'
                    }
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'انسخ مفاتيح API والصق هنا'
                      : 'Copy API keys and paste them here'
                    }
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Sync Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-500" />
                <span>
                  {language === 'ar' ? 'إعدادات المزامنة' : 'Sync Settings'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">
                    {language === 'ar' ? 'الاستيراد التلقائي' : 'Auto Import'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar'
                      ? 'استيراد المنتجات الجديدة تلقائياً'
                      : 'Automatically import new products'
                    }
                  </p>
                </div>
                <Switch
                  checked={config.autoImport}
                  onCheckedChange={(autoImport) => handleConfigChange({ autoImport })}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>
                  {language === 'ar' ? 'فترة المزامنة (بالساعات)' : 'Sync Interval (hours)'}
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 6, 12, 24].map((hours) => (
                    <Button
                      key={hours}
                      variant={config.syncInterval === hours ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleConfigChange({ syncInterval: hours })}
                    >
                      {hours} {language === 'ar' ? 'س' : 'h'}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">
                    {language === 'ar' ? 'آخر مزامنة:' : 'Last Sync:'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {config.lastSync 
                      ? config.lastSync.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')
                      : (language === 'ar' ? 'لم تتم مزامنة بعد' : 'Not synced yet')
                    }
                  </p>
                </div>
                <Button
                  onClick={handleSync}
                  disabled={!config.isConnected}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'مزامنة الآن' : 'Sync Now'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-purple-500" />
                <span>
                  {language === 'ar' ? 'إحصائيات التكامل' : 'Integration Stats'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl text-blue-500 mb-1">📦</div>
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'منتجات مستوردة' : 'Imported Products'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl text-green-500 mb-1">✅</div>
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'طلبات منفذة' : 'Orders Fulfilled'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-2xl text-orange-500 mb-1">🔄</div>
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'قيد المعالجة' : 'Processing'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl text-purple-500 mb-1">💰</div>
                  <div className="text-2xl font-bold text-purple-600">$12.4K</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}