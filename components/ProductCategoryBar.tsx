import { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Truck, 
  Waves, 
  Snowflake, 
  Shirt, 
  Dumbbell, 
  Sun, 
  Sparkles, 
  Lightbulb, 
  Heart, 
  ShirtIcon as Dress,
  Package,
  TrendingUp,
  Home,
  Laptop,
  Watch,
  Headphones,
  Smartphone,
  Camera,
  Car,
  Baby,
  PawPrint,
  Flower2,
  Utensils,
  BookOpen,
  Gamepad2,
  Music,
  Palette,
  Wrench,
  Scissors
} from 'lucide-react';
import { Language } from './i18n/translations';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  hoverColor: string;
  selectedBgColor: string;
  selectedColor: string;
}

interface ProductCategoryBarProps {
  language: Language;
  onCategoryClick?: (categoryId: string) => void;
}

export default function ProductCategoryBar({ language, onCategoryClick }: ProductCategoryBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'home-appliances',
      name: 'Home Appliances',
      nameAr: 'الأجهزة المنزلية',
      icon: <Home className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
      selectedBgColor: 'bg-blue-600 dark:bg-blue-500',
      selectedColor: 'text-white'
    },
    {
      id: 'computer-office',
      name: 'Computer & Office',
      nameAr: 'الكمبيوتر والمكتب',
      icon: <Laptop className="h-5 w-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      hoverColor: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
      selectedBgColor: 'bg-indigo-600 dark:bg-indigo-500',
      selectedColor: 'text-white'
    },
    {
      id: 'consumer-electronics',
      name: 'Consumer Electronics',
      nameAr: 'الإلكترونيات الاستهلاكية',
      icon: <Smartphone className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
      selectedBgColor: 'bg-purple-600 dark:bg-purple-500',
      selectedColor: 'text-white'
    },
    {
      id: 'women-clothing',
      name: 'Women\'s Clothing',
      nameAr: 'ملابس نسائية',
      icon: <Dress className="h-5 w-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      hoverColor: 'hover:bg-pink-100 dark:hover:bg-pink-900/30',
      selectedBgColor: 'bg-pink-600 dark:bg-pink-500',
      selectedColor: 'text-white'
    },
    {
      id: 'men-clothing',
      name: 'Men\'s Clothing',
      nameAr: 'ملابس رجالية',
      icon: <Shirt className="h-5 w-5" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-950/20',
      hoverColor: 'hover:bg-gray-100 dark:hover:bg-gray-900/30',
      selectedBgColor: 'bg-gray-600 dark:bg-gray-500',
      selectedColor: 'text-white'
    },
    {
      id: 'watches',
      name: 'Watches',
      nameAr: 'الساعات',
      icon: <Watch className="h-5 w-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      hoverColor: 'hover:bg-amber-100 dark:hover:bg-amber-900/30',
      selectedBgColor: 'bg-amber-600 dark:bg-amber-500',
      selectedColor: 'text-white'
    },
    {
      id: 'headphones',
      name: 'Headphones',
      nameAr: 'سماعات الرأس',
      icon: <Headphones className="h-5 w-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      hoverColor: 'hover:bg-red-100 dark:hover:bg-red-900/30',
      selectedBgColor: 'bg-red-600 dark:bg-red-500',
      selectedColor: 'text-white'
    },
    {
      id: 'beauty-health',
      name: 'Beauty & Health',
      nameAr: 'الجمال والصحة',
      icon: <Sparkles className="h-5 w-5" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20',
      hoverColor: 'hover:bg-rose-100 dark:hover:bg-rose-900/30',
      selectedBgColor: 'bg-rose-600 dark:bg-rose-500',
      selectedColor: 'text-white'
    },
    {
      id: 'sports-outdoors',
      name: 'Sports & Outdoors',
      nameAr: 'الرياضة والهواء الطلق',
      icon: <Dumbbell className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-900/30',
      selectedBgColor: 'bg-green-600 dark:bg-green-500',
      selectedColor: 'text-white'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      nameAr: 'السيارات',
      icon: <Car className="h-5 w-5" />,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50 dark:bg-slate-950/20',
      hoverColor: 'hover:bg-slate-100 dark:hover:bg-slate-900/30',
      selectedBgColor: 'bg-slate-600 dark:bg-slate-500',
      selectedColor: 'text-white'
    },
    {
      id: 'mother-kids',
      name: 'Mother & Kids',
      nameAr: 'الأم والطفل',
      icon: <Baby className="h-5 w-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      hoverColor: 'hover:bg-orange-100 dark:hover:bg-orange-900/30',
      selectedBgColor: 'bg-orange-600 dark:bg-orange-500',
      selectedColor: 'text-white'
    },
    {
      id: 'pet-supplies',
      name: 'Pet Supplies',
      nameAr: 'مستلزمات الحيوانات',
      icon: <PawPrint className="h-5 w-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      hoverColor: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/30',
      selectedBgColor: 'bg-emerald-600 dark:bg-emerald-500',
      selectedColor: 'text-white'
    },
    {
      id: 'home-garden',
      name: 'Home & Garden',
      nameAr: 'المنزل والحديقة',
      icon: <Flower2 className="h-5 w-5" />,
      color: 'text-lime-600',
      bgColor: 'bg-lime-50 dark:bg-lime-950/20',
      hoverColor: 'hover:bg-lime-100 dark:hover:bg-lime-900/30',
      selectedBgColor: 'bg-lime-600 dark:bg-lime-500',
      selectedColor: 'text-white'
    },
    {
      id: 'food-beverages',
      name: 'Food & Beverages',
      nameAr: 'الطعام والمشروبات',
      icon: <Utensils className="h-5 w-5" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      hoverColor: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
      selectedBgColor: 'bg-yellow-600 dark:bg-yellow-500',
      selectedColor: 'text-white'
    },
    {
      id: 'books-media',
      name: 'Books & Media',
      nameAr: 'الكتب والإعلام',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-950/20',
      hoverColor: 'hover:bg-teal-100 dark:hover:bg-teal-900/30',
      selectedBgColor: 'bg-teal-600 dark:bg-teal-500',
      selectedColor: 'text-white'
    },
    {
      id: 'toys-games',
      name: 'Toys & Games',
      nameAr: 'الألعاب',
      icon: <Gamepad2 className="h-5 w-5" />,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50 dark:bg-violet-950/20',
      hoverColor: 'hover:bg-violet-100 dark:hover:bg-violet-900/30',
      selectedBgColor: 'bg-violet-600 dark:bg-violet-500',
      selectedColor: 'text-white'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    onCategoryClick?.(categoryId);
  };

  return (
    <div className="w-full">
      {/* Category Title */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {language === 'ar' ? 'فئات المنتجات الشائعة' : 'Popular Product Categories'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'اكتشف أحدث الفئات الرائجة واختر المنتجات المناسبة لمتجرك'
                : 'Discover trending categories and choose the right products for your store'
              }
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-full">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="font-medium">{language === 'ar' ? 'رائج الآن' : 'Trending Now'}</span>
        </div>
      </div>

      {/* Scrollable Category Bar */}
      <div className="relative">
        <ScrollArea className="w-full whitespace-nowrap rounded-xl">
          <div className="flex space-x-4 p-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    relative flex-shrink-0 h-auto p-4 rounded-2xl border-2 transition-all duration-300
                    flex flex-col items-center space-y-3 min-w-[120px] max-w-[140px]
                    transform-gpu group
                    ${isSelected 
                      ? `${category.selectedBgColor} border-transparent shadow-xl scale-105 -translate-y-2` 
                      : `${category.bgColor} ${category.hoverColor} border-transparent hover:border-border`
                    }
                    hover:shadow-lg hover:-translate-y-1
                    active:scale-95
                  `}
                >
                  {/* Icon Container */}
                  <div className={`
                    p-2 rounded-xl transition-all duration-300 
                    ${isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/80 dark:bg-gray-800/80 group-hover:bg-white dark:group-hover:bg-gray-700'
                    }
                  `}>
                    <div className={`transition-all duration-300 ${
                      isSelected 
                        ? `${category.selectedColor} scale-110 drop-shadow-sm` 
                        : category.color
                    }`}>
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    text-xs text-center leading-tight font-medium transition-colors duration-300
                    ${isSelected ? category.selectedColor : 'text-foreground'}
                  `}>
                    {language === 'ar' ? category.nameAr : category.name}
                  </span>

                  {/* Selection indicator dot */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-white dark:bg-gray-900 rounded-full border-2 border-current flex items-center justify-center shadow-lg">
                      <div className="w-2.5 h-2.5 bg-current rounded-full animate-pulse" />
                    </div>
                  )}

                  {/* Glow effect for selected */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 animate-pulse" />
                  )}

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                </Button>
              );
            })}
            
            {/* "More" button */}
            <Button
              variant="ghost"
              className="flex-shrink-0 h-auto p-4 rounded-2xl border-2 border-dashed border-muted-foreground/30
                       flex flex-col items-center space-y-3 min-w-[120px] max-w-[140px]
                       hover:border-primary hover:bg-primary/5 transition-all duration-300
                       hover:shadow-lg hover:-translate-y-1 hover:scale-105 group"
            >
              <div className="p-2 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                <Package className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              </div>
              <span className="text-xs text-center leading-tight font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                {language === 'ar' ? 'المزيد' : 'More'}
              </span>
            </Button>
          </div>
        </ScrollArea>

        {/* Gradient fade effects */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Selection indicator */}
      {selectedCategory && (
        <div className="mt-6 flex items-center justify-center animate-fadeIn">
          <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full border border-primary/20 shadow-sm backdrop-blur-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">
              {language === 'ar' 
                ? `تم اختيار: ${categories.find(c => c.id === selectedCategory)?.nameAr}`
                : `Selected: ${categories.find(c => c.id === selectedCategory)?.name}`
              }
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Category Stats */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{language === 'ar' ? 'متوفر' : 'Available'}: {categories.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-blue-500" />
            <span>{language === 'ar' ? 'رائج' : 'Trending'}: 8</span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-purple-500" />
            <span>{language === 'ar' ? 'جديد' : 'New'}: 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}