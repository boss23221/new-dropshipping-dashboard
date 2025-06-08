import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import { Language, getTranslation } from './i18n/translations';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCountry: string;
  onCountryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  countries: string[];
  statuses: string[];
  onClearFilters: () => void;
  language: Language;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  countries,
  statuses,
  onClearFilters,
  language
}: SearchAndFilterProps) {
  const hasActiveFilters = searchTerm || selectedCountry || selectedStatus || sortBy !== 'name';

  const getStatusLabel = (status: string) => {
    if (status === 'active') return getTranslation('activeStatus', language);
    if (status === 'inactive') return getTranslation('inactiveStatus', language);
    return status;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'active') return '🟢';
    if (status === 'inactive') return '🔴';
    return '';
  };

  const handleCountryChange = (value: string) => {
    const actualValue = value === '__all__' ? '' : value;
    onCountryChange(actualValue);
  };

  const handleStatusChange = (value: string) => {
    const actualValue = value === '__all__' ? '' : value;
    onStatusChange(actualValue);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={getTranslation('searchSuppliers', language)}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 border-2 focus:border-primary/50 rounded-lg"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{language === 'ar' ? 'فلاتر:' : 'Filters:'}</span>
        </div>

        {/* Country Filter */}
        <Select value={selectedCountry || '__all__'} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-[180px] border-2">
            <SelectValue placeholder={getTranslation('filterByCountry', language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">{getTranslation('allSuppliers', language)}</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                <div className="flex items-center space-x-2">
                  <span>🌍</span>
                  <span>{country}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={selectedStatus || '__all__'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] border-2">
            <SelectValue placeholder={getTranslation('filterByStatus', language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">{getTranslation('allStatuses', language)}</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                <div className="flex items-center space-x-2">
                  <span>{getStatusIcon(status)}</span>
                  <span>{getStatusLabel(status)}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px] border-2">
            <SelectValue placeholder={getTranslation('sortBy', language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">
              📝 {language === 'ar' ? 'الاسم' : 'Name'}
            </SelectItem>
            <SelectItem value="country">
              🌍 {getTranslation('country', language)}
            </SelectItem>
            <SelectItem value="status">
              🔄 {getTranslation('status', language)}
            </SelectItem>
            <SelectItem value="date">
              📅 {language === 'ar' ? 'التاريخ' : 'Date'}
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="border-2 hover:bg-destructive/10 hover:border-destructive/50 transition-all"
          >
            <X className="h-4 w-4 mr-1" />
            {getTranslation('clearFilters', language)}
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground flex items-center">
            <Filter className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'الفلاتر النشطة:' : 'Active filters:'}
          </span>
          
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Search className="h-3 w-3" />
              <span>"{searchTerm}"</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange('')}
                className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          {selectedCountry && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>🌍</span>
              <span>{selectedCountry}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCountryChange('')}
                className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          {selectedStatus && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{getStatusIcon(selectedStatus)}</span>
              <span>{getStatusLabel(selectedStatus)}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange('')}
                className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          {sortBy !== 'name' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>📊</span>
              <span>{language === 'ar' ? 'مرتب حسب' : 'Sorted by'}: {sortBy}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSortChange('name')}
                className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}