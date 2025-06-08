import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertTriangle, Save, X } from 'lucide-react';
import { Language, getTranslation } from './i18n/translations';

interface Supplier {
  name: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  status: 'active' | 'inactive';
}

interface SupplierFormProps {
  onSubmit: (supplier: Supplier) => void;
  onCancel: () => void;
  initialData?: Supplier;
  language: Language;
}

export default function SupplierForm({ onSubmit, onCancel, initialData, language }: SupplierFormProps) {
  const [formData, setFormData] = useState<Supplier>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    country: initialData?.country || '',
    website: initialData?.website || '',
    status: initialData?.status || 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    'United States', 'United Kingdom', 'Germany', 'France', 'Canada',
    'Australia', 'Japan', 'China', 'India', 'Brazil', 'Mexico',
    'Italy', 'Spain', 'Netherlands', 'South Korea', 'Singapore'
  ].sort();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = getTranslation('fillAllFields', language);
    }

    if (!formData.email.trim()) {
      newErrors.email = getTranslation('fillAllFields', language);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = getTranslation('validEmail', language);
    }

    if (!formData.phone.trim()) {
      newErrors.phone = getTranslation('fillAllFields', language);
    }

    if (!formData.country) {
      newErrors.country = getTranslation('fillAllFields', language);
    }

    if (formData.website && !formData.website.startsWith('http')) {
      setFormData(prev => ({ ...prev, website: `https://${prev.website}` }));
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
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof Supplier, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCountryChange = (value: string) => {
    // Handle placeholder value
    if (value === '__placeholder__') return;
    handleInputChange('country', value);
  };

  const getStatusColor = (status: 'active' | 'inactive') => {
    return status === 'active' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status: 'active' | 'inactive') => {
    return status === 'active' ? '🟢' : '🔴';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <span>📝</span>
                <span>{getTranslation('supplierName', language)} *</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم المورد' : 'Enter supplier name'}
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

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <span>📧</span>
                <span>{getTranslation('email', language)} *</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <span>📞</span>
                <span>{getTranslation('phone', language)} *</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                className={errors.phone ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.phone && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    {errors.phone}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center space-x-2">
                <span>🌍</span>
                <span>{getTranslation('country', language)} *</span>
              </Label>
              <Select value={formData.country || '__placeholder__'} onValueChange={handleCountryChange}>
                <SelectTrigger className={errors.country ? 'border-red-500 focus:border-red-500' : ''}>
                  <SelectValue placeholder={language === 'ar' ? 'اختر البلد' : 'Select country'} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    {errors.country}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center space-x-2">
                <span>🌐</span>
                <span>{getTranslation('website', language)}</span>
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder={language === 'ar' ? 'أدخل الموقع الإلكتروني (اختياري)' : 'Enter website (optional)'}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center space-x-2">
                <span>🔄</span>
                <span>{getTranslation('status', language)} *</span>
              </Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center space-x-2">
                      <span>🟢</span>
                      <span className="text-green-600">{getTranslation('activeStatus', language)}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center space-x-2">
                      <span>🔴</span>
                      <span className="text-red-600">{getTranslation('inactiveStatus', language)}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Status Display */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {getTranslation('status', language)}:
              </span>
              <div className={`flex items-center space-x-2 ${getStatusColor(formData.status)}`}>
                <span>{getStatusIcon(formData.status)}</span>
                <span className="font-medium">
                  {formData.status === 'active' 
                    ? getTranslation('activeStatus', language)
                    : getTranslation('inactiveStatus', language)
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              {getTranslation('cancel', language)}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {getTranslation('loading', language)}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {getTranslation('save', language)}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}