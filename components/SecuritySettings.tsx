import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Key, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, getTranslation } from './i18n/translations';

interface UserCredentials {
  email: string;
  password: string;
  lastUpdated: Date;
}

interface SecuritySettingsProps {
  userCredentials: UserCredentials;
  onCredentialsChange: (newCredentials: Partial<UserCredentials>) => void;
  language: Language;
}

export default function SecuritySettings({ userCredentials, onCredentialsChange, language }: SecuritySettingsProps) {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    confirmPassword: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState({
    email: false,
    password: false
  });

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;
    
    if (strength < 3) return { score: strength, level: getTranslation('weak', language), color: 'text-red-500' };
    if (strength < 4) return { score: strength, level: getTranslation('fair', language), color: 'text-yellow-500' };
    if (strength < 5) return { score: strength, level: getTranslation('good', language), color: 'text-blue-500' };
    return { score: strength, level: getTranslation('strong', language), color: 'text-green-500' };
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailForm.newEmail || !emailForm.confirmPassword) {
      toast.error(`⚠️ ${getTranslation('fillAllFields', language)}`);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.newEmail)) {
      toast.error(`⚠️ ${getTranslation('validEmail', language)}`);
      return;
    }

    if (emailForm.confirmPassword !== userCredentials.password) {
      toast.error(`❌ ${getTranslation('incorrectPassword', language)}`);
      return;
    }

    if (emailForm.newEmail === userCredentials.email) {
      toast.error(`⚠️ ${getTranslation('sameEmail', language)}`);
      return;
    }

    setIsLoading(prev => ({ ...prev, email: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onCredentialsChange({ email: emailForm.newEmail });
      
      setEmailForm({ newEmail: '', confirmPassword: '' });
      
      toast.success(
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>✅ {getTranslation('emailUpdated', language)}</span>
        </div>
      );
    } catch (error) {
      toast.error(`❌ ${language === 'ar' ? 'فشل في تحديث البريد الإلكتروني. يرجى المحاولة مرة أخرى.' : 'Failed to update email. Please try again.'}`);
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error(`⚠️ ${getTranslation('fillAllFields', language)}`);
      return;
    }

    if (passwordForm.currentPassword !== userCredentials.password) {
      toast.error(`❌ ${getTranslation('incorrectPassword', language)}`);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(`❌ ${getTranslation('passwordsNoMatch', language)}`);
      return;
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      toast.error(`⚠️ ${getTranslation('samePassword', language)}`);
      return;
    }

    const strength = getPasswordStrength(passwordForm.newPassword);
    if (strength.score < 3) {
      toast.error(`⚠️ ${getTranslation('weakPassword', language)}`);
      return;
    }

    setIsLoading(prev => ({ ...prev, password: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onCredentialsChange({ password: passwordForm.newPassword });
      
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      toast.success(
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>✅ {getTranslation('passwordUpdated', language)}</span>
        </div>
      );
    } catch (error) {
      toast.error(`❌ ${language === 'ar' ? 'فشل في تحديث كلمة المرور. يرجى المحاولة مرة أخرى.' : 'Failed to update password. Please try again.'}`);
    } finally {
      setIsLoading(prev => ({ ...prev, password: false }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="border-green-500/20 bg-green-50/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>🔒 {getTranslation('securityOverview', language)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{getTranslation('currentEmail', language)}</span>
              </div>
              <span className="text-sm font-mono">{userCredentials.email}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{getTranslation('lastUpdated', language)}</span>
              </div>
              <span className="text-sm">{userCredentials.lastUpdated.toLocaleDateString()}</span>
            </div>
          </div>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              🔐 {language === 'ar' 
                ? 'بيانات حسابك محفوظة بأمان. قم بتحديثها بانتظام لتعزيز الأمان.'
                : 'Your account credentials are stored securely. Update them regularly for enhanced security.'
              }
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Change Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <span>📧 {getTranslation('changeEmail', language)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">{getTranslation('newEmail', language)}</Label>
              <Input
                id="newEmail"
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm(prev => ({ ...prev, newEmail: e.target.value }))}
                placeholder={language === 'ar' ? 'أدخل عنوان البريد الإلكتروني الجديد' : 'Enter new email address'}
                disabled={isLoading.email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPasswordEmail">{getTranslation('confirmCurrentPassword', language)}</Label>
              <div className="relative">
                <Input
                  id="confirmPasswordEmail"
                  type={showPasswords.current ? "text" : "password"}
                  value={emailForm.confirmPassword}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور الحالية للتأكيد' : 'Enter current password to confirm'}
                  disabled={isLoading.email}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('current')}
                  disabled={isLoading.email}
                  className="absolute right-0 top-0 h-full px-3"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading.email}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading.email ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري تحديث البريد الإلكتروني...' : 'Updating Email...'}
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  📧 {getTranslation('update', language)} {getTranslation('email', language)}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-red-500" />
            <span>🔑 {getTranslation('changePassword', language)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{getTranslation('currentPassword', language)}</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور الحالية' : 'Enter current password'}
                  disabled={isLoading.password}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('current')}
                  disabled={isLoading.password}
                  className="absolute right-0 top-0 h-full px-3"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">{getTranslation('newPassword', language)}</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور الجديدة' : 'Enter new password'}
                  disabled={isLoading.password}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('new')}
                  disabled={isLoading.password}
                  className="absolute right-0 top-0 h-full px-3"
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              {/* Password Strength Indicator */}
              {passwordForm.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{getTranslation('passwordStrength', language)}:</span>
                    <span className={passwordStrength.color}>{passwordStrength.level}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.score < 3 ? 'bg-red-500' : 
                        passwordStrength.score < 4 ? 'bg-yellow-500' : 
                        passwordStrength.score < 5 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'ar' 
                      ? 'يجب أن تحتوي على: أحرف كبيرة، أحرف صغيرة، أرقام، رموز خاصة (8+ أحرف)'
                      : 'Include: uppercase, lowercase, numbers, special characters (8+ chars)'
                    }
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{getTranslation('confirmNewPassword', language)}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder={language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm new password'}
                  disabled={isLoading.password}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('confirm')}
                  disabled={isLoading.password}
                  className="absolute right-0 top-0 h-full px-3"
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Password Match Indicator */}
            {passwordForm.newPassword && passwordForm.confirmPassword && (
              <div className="flex items-center space-x-2 text-sm">
                {passwordForm.newPassword === passwordForm.confirmPassword ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">✅ {getTranslation('passwordsMatch', language)}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">❌ {getTranslation('passwordsDoNotMatch', language)}</span>
                  </>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading.password}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading.password ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري تحديث كلمة المرور...' : 'Updating Password...'}
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  🔑 {getTranslation('update', language)} {getTranslation('password', language)}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="border-yellow-500/20 bg-yellow-50/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-yellow-500" />
            <span>💡 {getTranslation('securityTips', language)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <span>🔐</span>
              <span>
                {language === 'ar' 
                  ? 'استخدم كلمة مرور فريدة لا تستخدمها في أي مكان آخر'
                  : 'Use a unique password that you don\'t use anywhere else'
                }
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <span>📱</span>
              <span>
                {language === 'ar' 
                  ? 'فكر في استخدام مدير كلمات المرور لإنشاء وحفظ كلمات مرور آمنة'
                  : 'Consider using a password manager to generate and store secure passwords'
                }
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <span>🔄</span>
              <span>
                {language === 'ar' 
                  ? 'قم بتحديث كلمة المرور كل 3-6 أشهر لتحسين الأمان'
                  : 'Update your password every 3-6 months for better security'
                }
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <span>⚠️</span>
              <span>
                {language === 'ar' 
                  ? 'لا تشارك بيانات تسجيل الدخول مع أي شخص أبداً'
                  : 'Never share your login credentials with anyone'
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}