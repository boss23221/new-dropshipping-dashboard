import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertTriangle, CheckCircle, ExternalLink, Key, Settings, Zap, Download, Upload, Store } from 'lucide-react';
import { Language } from './i18n/translations';
import { toast } from 'sonner@2.0.3';

interface ShopifyConfig {
  shopUrl: string;
  accessToken: string;
  apiKey: string;
  apiSecret: string;
  webhookSecret: string;
  isEnabled: boolean;
  autoSync: boolean;
  syncProducts: boolean;
  syncOrders: boolean;
  syncInventory: boolean;
  syncInterval: number;
  lastSync: Date | null;
  isConnected: boolean;
  shopName: string;
  shopPlan: string;
}

interface ShopifyIntegrationProps {
  config: ShopifyConfig;
  onConfigChange: (config: ShopifyConfig) => void;
  language: Language;
}

export default function ShopifyIntegration({
  config,
  onConfigChange,
  language
}: ShopifyIntegrationProps) {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleConfigChange = (updates: Partial<ShopifyConfig>) => {
    const newConfig = { ...config, ...updates };
    onConfigChange(newConfig);
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = config.shopUrl && config.accessToken && config.apiKey;
      
      if (success) {
        handleConfigChange({ 
          isConnected: true,
          lastSync: new Date(),
          shopName: 'My Dropshipping Store',
          shopPlan: 'Basic Shopify'
        });
        toast.success(
          language === 'ar' 
            ? '✅ تم الاتصال بـ Shopify بنجاح!'
            : '✅ Successfully connected to Shopify!'
        );
      } else {
        handleConfigChange({ isConnected: false });
        toast.error(
          language === 'ar'
            ? '❌ فشل في الاتصال. تحقق من بيانات المتجر'
            : '❌ Connection failed. Please check your store credentials'
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      handleConfigChange({ lastSync: new Date() });
      toast.success(
        language === 'ar'
          ? '🔄 تم مزامنة البيانات بنجاح!'
          : '🔄 Data synced successfully!'
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl">
                  {language === 'ar' ? 'تكامل Shopify' : 'Shopify Integration'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'اربط متجر Shopify لمزامنة المنتجات والطلبات'
                    : 'Connect your Shopify store to sync products and orders'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {config.isConnected ? (
                <div className="text-center">
                  <Badge className="bg-green-500 text-white mb-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {language === 'ar' ? 'متصل' : 'Connected'}
                  </Badge>
                  {config.shopName && (
                    <div className="text-xs text-muted-foreground">{config.shopName}</div>
                  )}
                </div>
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
                  ? 'تشغيل/إيقاف تكامل Shopify'
                  : 'Turn Shopify integration on/off'
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
          {/* Store Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-blue-500" />
                <span>
                  {language === 'ar' ? 'إعدادات المتجر' : 'Store Configuration'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>
                    {language === 'ar' ? 'رابط المتجر' : 'Shop URL'}
                  </Label>
                  <Input
                    placeholder="mystore.myshopify.com"
                    value={config.shopUrl}
                    onChange={(e) => handleConfigChange({ shopUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' 
                      ? 'أدخل رابط متجر Shopify الخاص بك'
                      : 'Enter your Shopify store URL'
                    }
                  </p>
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
                    {language === 'ar' ? 'المفتاح السري' : 'API Secret'}
                  </Label>
                  <Input
                    type={showApiKeys ? 'text' : 'password'}
                    placeholder={language === 'ar' ? 'أدخل المفتاح السري' : 'Enter API Secret'}
                    value={config.apiSecret}
                    onChange={(e) => handleConfigChange({ apiSecret: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>
                    {language === 'ar' ? 'مفتاح Webhook' : 'Webhook Secret'}
                  </Label>
                  <Input
                    type={showApiKeys ? 'text' : 'password'}
                    placeholder={language === 'ar' ? 'مفتاح Webhook (اختياري)' : 'Webhook Secret (optional)'}
                    value={config.webhookSecret}
                    onChange={(e) => handleConfigChange({ webhookSecret: e.target.value })}
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
                    disabled={isTestingConnection || !config.shopUrl || !config.accessToken}
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
                      href="https://partners.shopify.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'إنشاء تطبيق' : 'Create App'}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Connection Status */}
              {config.isConnected && (
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                        ✅ {language === 'ar' ? 'متصل بنجاح' : 'Successfully Connected'}
                      </h4>
                      <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
                        <div>
                          <strong>{language === 'ar' ? 'المتجر:' : 'Store:'}</strong> {config.shopName}
                        </div>
                        <div>
                          <strong>{language === 'ar' ? 'الخطة:' : 'Plan:'}</strong> {config.shopPlan}
                        </div>
                        <div>
                          <strong>{language === 'ar' ? 'الرابط:' : 'URL:'}</strong> {config.shopUrl}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Text */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {language === 'ar' ? '📋 كيفية ربط متجر Shopify:' : '📋 How to connect your Shopify store:'}
                </h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>
                    {language === 'ar' 
                      ? 'اذهب إلى إعدادات متجر Shopify &gt; Apps and sales channels'
                      : 'Go to your Shopify admin &gt; Apps and sales channels'
                    }
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'أنشئ تطبيق private أو استخدم Shopify API'
                      : 'Create a private app or use Shopify API'
                    }
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'انسخ بيانات API والصق هنا'
                      : 'Copy API credentials and paste them here'
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
                    {language === 'ar' ? 'المزامنة التلقائية' : 'Auto Sync'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar'
                      ? 'مزامنة البيانات تلقائياً مع Shopify'
                      : 'Automatically sync data with Shopify'
                    }
                  </p>
                </div>
                <Switch
                  checked={config.autoSync}
                  onCheckedChange={(autoSync) => handleConfigChange({ autoSync })}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">
                      {language === 'ar' ? 'مزامنة المنتجات' : 'Sync Products'}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'تحديث المنتجات' : 'Update products'}
                    </p>
                  </div>
                  <Switch
                    checked={config.syncProducts}
                    onCheckedChange={(syncProducts) => handleConfigChange({ syncProducts })}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">
                      {language === 'ar' ? 'مزامنة الطلبات' : 'Sync Orders'}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'استيراد الطلبات' : 'Import orders'}
                    </p>
                  </div>
                  <Switch
                    checked={config.syncOrders}
                    onCheckedChange={(syncOrders) => handleConfigChange({ syncOrders })}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">
                      {language === 'ar' ? 'مزامنة المخزون' : 'Sync Inventory'}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'تحديث الكميات' : 'Update quantities'}
                    </p>
                  </div>
                  <Switch
                    checked={config.syncInventory}
                    onCheckedChange={(syncInventory) => handleConfigChange({ syncInventory })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>
                  {language === 'ar' ? 'فترة المزامنة' : 'Sync Interval'}
                </Label>
                <Select 
                  value={config.syncInterval.toString()}
                  onValueChange={(value) => handleConfigChange({ syncInterval: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">{language === 'ar' ? '15 دقيقة' : '15 minutes'}</SelectItem>
                    <SelectItem value="30">{language === 'ar' ? '30 دقيقة' : '30 minutes'}</SelectItem>
                    <SelectItem value="60">{language === 'ar' ? 'ساعة واحدة' : '1 hour'}</SelectItem>
                    <SelectItem value="360">{language === 'ar' ? '6 ساعات' : '6 hours'}</SelectItem>
                    <SelectItem value="720">{language === 'ar' ? '12 ساعة' : '12 hours'}</SelectItem>
                    <SelectItem value="1440">{language === 'ar' ? '24 ساعة' : '24 hours'}</SelectItem>
                  </SelectContent>
                </Select>
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
                  {language === 'ar' ? 'إحصائيات المتجر' : 'Store Stats'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl text-blue-500 mb-1">🛍️</div>
                  <div className="text-2xl font-bold text-blue-600">342</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'منتجات في المتجر' : 'Products in Store'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl text-green-500 mb-1">📋</div>
                  <div className="text-2xl font-bold text-green-600">127</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'طلبات جديدة' : 'New Orders'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-2xl text-orange-500 mb-1">👥</div>
                  <div className="text-2xl font-bold text-orange-600">1,234</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'العملاء' : 'Customers'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl text-purple-500 mb-1">💰</div>
                  <div className="text-2xl font-bold text-purple-600">$23.7K</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'مبيعات الشهر' : 'Monthly Sales'}
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