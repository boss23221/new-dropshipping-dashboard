import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { User, Mail, Calendar, Save, CheckCircle, AlertTriangle } from 'lucide-react';
import { Language, getTranslation } from './i18n/translations';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  email: string;
  lastLogin: Date;
  joinDate: Date;
}

interface ProfileSettingsProps {
  userProfile: UserProfile;
  onProfileChange: (profile: Partial<UserProfile>) => void;
  language: Language;
}

export default function ProfileSettings({ userProfile, onProfileChange, language }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      onProfileChange({
        name: formData.name.trim(),
        email: formData.email.trim()
      });

      toast.success(
        language === 'ar' 
          ? '✅ تم حفظ الملف الشخصي بنجاح!' 
          : '✅ Profile saved successfully!',
        {
          duration: 3000,
          className: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
        }
      );
    } catch (error) {
      toast.error(
        language === 'ar' 
          ? '❌ خطأ في حفظ الملف الشخصي' 
          : '❌ Error saving profile',
        {
          duration: 3000,
          className: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>
                {language === 'ar' ? 'الملف الشخصي' : 'Profile Information'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'تحديث معلوماتك الشخصية وإعدادات الحساب'
                  : 'Update your personal information and account settings'
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.name && (
                  <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-700 dark:text-red-400">
                      {errors.name}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                  className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.email && (
                  <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-700 dark:text-red-400">
                      {errors.email}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Account Information Display */}
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-muted-foreground">
                {language === 'ar' ? 'معلومات الحساب' : 'Account Information'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'تاريخ الانضمام:' : 'Member since:'}
                  </span>
                  <span>{formatDate(userProfile.joinDate)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'آخر تسجيل دخول:' : 'Last login:'}
                  </span>
                  <span>{formatDate(userProfile.lastLogin)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end pt-4 border-t">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Name Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {language === 'ar' ? 'أمثلة سريعة للأسماء' : 'Quick Name Examples'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'اضغط على أي اسم لاستخدامه مباشرة'
              : 'Click any name to use it directly'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'محمد أحمد',
              'فاطمة علي', 
              'عبدالله سالم',
              'نورا محمد',
              'Ahmed Ali',
              'Sarah Johnson',
              'Omar Hassan',
              'Layla Ibrahim'
            ].map((name) => (
              <Button
                key={name}
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('name', name)}
                className="text-left justify-start h-auto py-2 px-3"
              >
                <User className="h-3 w-3 mr-2 opacity-60" />
                {name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}