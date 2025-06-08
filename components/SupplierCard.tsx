import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Trash2, Mail, Phone, Globe, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Language, getTranslation } from './i18n/translations';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
  language: Language;
}

export default function SupplierCard({ supplier, onEdit, onDelete, language }: SupplierCardProps) {
  const getCountryEmoji = (country: string) => {
    const countryEmojis: { [key: string]: string } = {
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'Brazil': '🇧🇷'
    };
    return countryEmojis[country] || '🌍';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: 'active' | 'inactive') => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
      : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
  };

  const getStatusIcon = (status: 'active' | 'inactive') => {
    return status === 'active' ? (
      <CheckCircle className="h-3 w-3" />
    ) : (
      <XCircle className="h-3 w-3" />
    );
  };

  const getStatusText = (status: 'active' | 'inactive') => {
    return status === 'active' 
      ? getTranslation('activeStatus', language)
      : getTranslation('inactiveStatus', language);
  };

  const isNewSupplier = () => {
    const daysDiff = Math.floor((new Date().getTime() - supplier.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 card-hover group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <span className="truncate">{supplier.name}</span>
              {isNewSupplier() && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  ✨ {language === 'ar' ? 'جديد' : 'New'}
                </Badge>
              )}
            </CardTitle>
            <div className="mt-2">
              <Badge 
                variant="outline" 
                className={`flex items-center space-x-1 w-fit ${getStatusColor(supplier.status)}`}
              >
                {getStatusIcon(supplier.status)}
                <span>{getStatusText(supplier.status)}</span>
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(supplier)}
              className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              title={getTranslation('edit', language)}
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(supplier.id)}
              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
              title={getTranslation('delete', language)}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="truncate">{supplier.email}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-green-500" />
            <span>{supplier.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-purple-500" />
            <span className="flex items-center space-x-1">
              <span>{getCountryEmoji(supplier.country)}</span>
              <span>{supplier.country}</span>
            </span>
          </div>
          
          {supplier.website && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-orange-500" />
              <a 
                href={supplier.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate hover:underline"
              >
                {supplier.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <span>📅</span>
              <span>{formatDate(supplier.createdAt)}</span>
            </span>
            <div className="flex items-center space-x-1">
              <span>🔗</span>
              <span>{language === 'ar' ? 'معرف:' : 'ID:'} {supplier.id.slice(-4)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}