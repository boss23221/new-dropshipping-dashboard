import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Languages, Globe, CheckCircle } from 'lucide-react';
import { Language, getLanguageName, getTranslation } from './i18n/translations';
import { toast } from 'sonner@2.0.3';

interface LanguageSettingsProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSettings({ currentLanguage, onLanguageChange }: LanguageSettingsProps) {
  const handleLanguageChange = (language: Language) => {
    if (language === currentLanguage) return;
    
    onLanguageChange(language);
    
    const languageName = getLanguageName(language, language);
    toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>✅ {getTranslation('languageChanged', language)} {languageName}</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Languages className="h-5 w-5 text-blue-500" />
          <span>🌐 {getTranslation('language', currentLanguage)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* English */}
          <div 
            onClick={() => handleLanguageChange('en')}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
              currentLanguage === 'en' 
                ? 'border-blue-500 bg-blue-50/50' 
                : 'border-border hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🇺🇸</div>
                <div>
                  <div className="font-medium">{getLanguageName('en', currentLanguage)}</div>
                  <div className="text-sm text-muted-foreground">English (US)</div>
                </div>
              </div>
              {currentLanguage === 'en' && (
                <Badge variant="outline" className="text-blue-500 border-blue-500">
                  ✅ {getTranslation('active', currentLanguage)}
                </Badge>
              )}
            </div>
          </div>

          {/* Arabic */}
          <div 
            onClick={() => handleLanguageChange('ar')}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
              currentLanguage === 'ar' 
                ? 'border-blue-500 bg-blue-50/50' 
                : 'border-border hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🇸🇦</div>
                <div>
                  <div className="font-medium">{getLanguageName('ar', currentLanguage)}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentLanguage === 'ar' ? 'العربية' : 'Arabic'}
                  </div>
                </div>
              </div>
              {currentLanguage === 'ar' && (
                <Badge variant="outline" className="text-blue-500 border-blue-500">
                  ✅ {getTranslation('active', currentLanguage)}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <Globe className="h-3 w-3" />
            <span>
              {currentLanguage === 'ar' 
                ? 'سيتم تطبيق اللغة الجديدة على جميع أجزاء التطبيق'
                : 'Language will be applied across the entire application'
              }
            </span>
          </div>
          {currentLanguage === 'ar' && (
            <div className="text-blue-400">
              🔄 العربية تدعم الكتابة من اليمين إلى اليسار (RTL)
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}