import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Camera,
  Filter,
  Menu
} from 'lucide-react';
import { Language } from './i18n/translations';

interface AliExpressHeaderProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  shipFrom: string;
  onShipFromChange: (value: string) => void;
  shipTo: string;
  onShipToChange: (value: string) => void;
}

export default function AliExpressHeader({ 
  language, 
  searchQuery, 
  onSearchChange, 
  shipFrom,
  onShipFromChange,
  shipTo,
  onShipToChange
}: AliExpressHeaderProps) {
  const handleSearch = () => {
    console.log('Search for:', searchQuery);
  };

  const handleCameraSearch = () => {
    console.log('Camera search triggered');
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      {/* Main Header Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Left - Logo */}
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#ff6600] leading-none">
                  AliExpress
                </span>
              </div>
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="flex items-center bg-white dark:bg-gray-800 border-2 border-[#ff6600] rounded-md overflow-hidden">
                  <Input
                    type="text"
                    placeholder={language === 'ar' ? 'ادخل كلمة البحث' : 'Enter keyword'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1 h-10 border-0 focus:ring-0 bg-transparent px-3 text-sm placeholder:text-gray-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCameraSearch}
                    className="h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <Button
                    onClick={handleSearch}
                    className="h-10 px-4 bg-[#ff6600] hover:bg-[#e55a00] text-white border-0 rounded-none"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right - ADD PLATFORM */}
            <div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white"
              >
                ADD PLATFORM
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left - Ship From/To */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300">Ship From:</span>
                <Select value={shipFrom} onValueChange={onShipFromChange}>
                  <SelectTrigger className="w-16 h-7 text-xs border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ALL</SelectItem>
                    <SelectItem value="us">🇺🇸 US</SelectItem>
                    <SelectItem value="cn">🇨🇳 CN</SelectItem>
                    <SelectItem value="de">🇩🇪 DE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300">Ship to:</span>
                <Select value={shipTo} onValueChange={onShipToChange}>
                  <SelectTrigger className="w-24 h-7 text-xs border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Australia">🇦🇺 Australia</SelectItem>
                    <SelectItem value="United States">🇺🇸 United States</SelectItem>
                    <SelectItem value="Saudi Arabia">🇸🇦 Saudi Arabia</SelectItem>
                    <SelectItem value="UAE">🇦🇪 UAE</SelectItem>
                    <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="sm" className="h-7 px-2 text-xs border-gray-300 dark:border-gray-600">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </Button>
            </div>

            {/* Right - Import List Checkbox */}
            <div className="flex items-center space-x-2 text-sm">
              <input 
                type="checkbox" 
                id="import-list" 
                className="w-3 h-3 text-[#ff6600] border-gray-300 dark:border-gray-600 rounded focus:ring-[#ff6600] focus:ring-2"
              />
              <label htmlFor="import-list" className="text-gray-600 dark:text-gray-300 text-xs">
                Add to Import List 2023
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}