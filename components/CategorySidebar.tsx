import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Home, 
  Monitor, 
  Hammer, 
  Flower, 
  Gamepad2, 
  BookOpen, 
  Baby, 
  Shield, 
  Car, 
  Gem,
  Shirt,
  Heart,
  Watch,
  Smartphone,
  Headphones,
  Camera,
  Lightbulb,
  Dumbbell,
  Utensils,
  Sofa,
  Wrench,
  PaintBucket,
  Trees,
  Trophy,
  Briefcase,
  GraduationCap,
  Gamepad,
  Lock,
  Settings,
  Sparkles,
  ChevronRight,
  Menu,
  Grid3x3,
  Eye
} from 'lucide-react';
import { Language } from './i18n/translations';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ComponentType<any>;
  color: string;
  subcategories?: string[];
}

interface CategorySidebarProps {
  language: Language;
  isCollapsed?: boolean;
  onCategorySelect?: (categoryId: string) => void;
  selectedCategory?: string;
}

export default function CategorySidebar({ 
  language, 
  isCollapsed = false, 
  onCategorySelect,
  selectedCategory 
}: CategorySidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories: Category[] = [
    {
      id: 'home-appliances',
      name: 'Home Appliances',
      nameAr: 'الأجهزة المنزلية',
      icon: Home,
      color: 'text-blue-600',
      subcategories: ['Kitchen Appliances', 'Vacuum Cleaners', 'Air Purifiers']
    },
    {
      id: 'computer-office',
      name: 'Computer & Office',
      nameAr: 'الكمبيوتر والمكتب',
      icon: Monitor,
      color: 'text-purple-600',
      subcategories: ['Laptops', 'Desktops', 'Accessories', 'Office Supplies']
    },
    {
      id: 'home-improvement',
      name: 'Home Improvement',
      nameAr: 'تحسين المنزل',
      icon: Hammer,
      color: 'text-orange-600',
      subcategories: ['Tools', 'Hardware', 'Lighting', 'Plumbing']
    },
    {
      id: 'home-garden',
      name: 'Home & Garden',
      nameAr: 'المنزل والحديقة',
      icon: Flower,
      color: 'text-green-600',
      subcategories: ['Garden Tools', 'Plants', 'Outdoor Furniture', 'Decor']
    },
    {
      id: 'sports-entertainment',
      name: 'Sports & Entertainment',
      nameAr: 'الرياضة والترفيه',
      icon: Gamepad2,
      color: 'text-red-600',
      subcategories: ['Fitness Equipment', 'Outdoor Sports', 'Gaming', 'Musical Instruments']
    },
    {
      id: 'office-school',
      name: 'Office & School Supplies',
      nameAr: 'مستلزمات المكتب والمدرسة',
      icon: BookOpen,
      color: 'text-indigo-600',
      subcategories: ['Stationery', 'School Bags', 'Office Equipment', 'Art Supplies']
    },
    {
      id: 'toys-hobbies',
      name: 'Toys & Hobbies',
      nameAr: 'الألعاب والهوايات',
      icon: Baby,
      color: 'text-pink-600',
      subcategories: ['Action Figures', 'Board Games', 'Remote Control', 'Educational Toys']
    },
    {
      id: 'security-protection',
      name: 'Security & Protection',
      nameAr: 'الأمن والحماية',
      icon: Shield,
      color: 'text-gray-600',
      subcategories: ['Security Cameras', 'Locks', 'Alarm Systems', 'Safety Equipment']
    },
    {
      id: 'automobiles-parts',
      name: 'Automobiles, Parts & Accessories',
      nameAr: 'السيارات وقطع الغيار والإكسسوارات',
      icon: Car,
      color: 'text-blue-700',
      subcategories: ['Car Electronics', 'Interior Accessories', 'Exterior Accessories', 'Tools']
    },
    {
      id: 'jewelry-accessories',
      name: 'Jewelry & Accessories',
      nameAr: 'المجوهرات والإكسسوارات',
      icon: Gem,
      color: 'text-yellow-600',
      subcategories: ['Rings', 'Necklaces', 'Watches', 'Fashion Accessories']
    },
    {
      id: 'womens-clothing',
      name: 'Women\'s Clothing',
      nameAr: 'ملابس نسائية',
      icon: Shirt,
      color: 'text-rose-600',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Outerwear']
    },
    {
      id: 'health-beauty',
      name: 'Health & Beauty',
      nameAr: 'الصحة والجمال',
      icon: Heart,
      color: 'text-teal-600',
      subcategories: ['Skincare', 'Makeup', 'Health Care', 'Personal Care']
    },
    {
      id: 'watches',
      name: 'Watches',
      nameAr: 'الساعات',
      icon: Watch,
      color: 'text-slate-600',
      subcategories: ['Smart Watches', 'Luxury Watches', 'Sport Watches', 'Fashion Watches']
    },
    {
      id: 'consumer-electronics',
      name: 'Consumer Electronics',
      nameAr: 'الإلكترونيات الاستهلاكية',
      icon: Smartphone,
      color: 'text-cyan-600',
      subcategories: ['Smartphones', 'Tablets', 'Audio', 'Cameras']
    },
    {
      id: 'luggage-bags',
      name: 'Luggage & Bags',
      nameAr: 'الحقائب وحقائب السفر',
      icon: Briefcase,
      color: 'text-amber-600',
      subcategories: ['Travel Bags', 'Backpacks', 'Handbags', 'Wallets']
    },
    // Additional categories for "View More"
    {
      id: 'musical-instruments',
      name: 'Musical Instruments',
      nameAr: 'الآلات الموسيقية',
      icon: Headphones,
      color: 'text-violet-600',
      subcategories: ['Guitars', 'Keyboards', 'Drums', 'Audio Equipment']
    },
    {
      id: 'photography',
      name: 'Photography',
      nameAr: 'التصوير',
      icon: Camera,
      color: 'text-emerald-600',
      subcategories: ['Cameras', 'Lenses', 'Tripods', 'Studio Equipment']
    },
    {
      id: 'lighting',
      name: 'Lighting',
      nameAr: 'الإضاءة',
      icon: Lightbulb,
      color: 'text-yellow-500',
      subcategories: ['LED Lights', 'Smart Lighting', 'Decorative Lights', 'Outdoor Lighting']
    },
    {
      id: 'fitness',
      name: 'Fitness Equipment',
      nameAr: 'معدات اللياقة البدنية',
      icon: Dumbbell,
      color: 'text-red-500',
      subcategories: ['Home Gym', 'Cardio Equipment', 'Weights', 'Yoga & Pilates']
    },
    {
      id: 'kitchen-dining',
      name: 'Kitchen & Dining',
      nameAr: 'المطبخ وغرفة الطعام',
      icon: Utensils,
      color: 'text-orange-500',
      subcategories: ['Cookware', 'Small Appliances', 'Dinnerware', 'Kitchen Tools']
    }
  ];

  // Show limited categories initially, all when expanded
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 8);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
    onCategorySelect?.(categoryId);
  };

  const handleAllCategoriesClick = () => {
    onCategorySelect?.('all');
    setExpandedCategory(null);
  };

  const handleViewMoreClick = () => {
    setShowAllCategories(!showAllCategories);
  };

  if (isCollapsed) {
    return (
      <Card className="w-16 h-fit">
        <CardContent className="p-2">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-12 w-12 p-0 flex flex-col items-center justify-center"
              onClick={handleAllCategoriesClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {categories.slice(0, 6).map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  className={`h-12 w-12 p-0 flex flex-col items-center justify-center ${
                    selectedCategory === category.id ? 'bg-primary text-primary-foreground' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Icon className={`h-4 w-4 ${category.color}`} />
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80 h-fit">
      <CardContent className="p-0">
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center space-x-2">
            <Menu className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">
              {language === 'ar' ? 'الفئات' : 'Categories'}
            </h3>
            <Badge variant="secondary" className="ml-auto">
              {categories.length}
            </Badge>
          </div>
        </div>

        {/* All Categories Button */}
        <div className="p-2 border-b">
          <Button
            variant="ghost"
            className={`w-full justify-start p-3 h-auto transition-all duration-200 ${
              selectedCategory === 'all' 
                ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                : 'hover:bg-muted/50'
            }`}
            onClick={handleAllCategoriesClick}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`p-2 rounded-lg bg-background/50 ${
                selectedCategory === 'all' ? 'bg-primary/20' : ''
              }`}>
                <Grid3x3 className={`h-5 w-5 ${selectedCategory === 'all' ? 'text-primary' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm leading-tight">
                  {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'ar' ? 'عرض جميع المنتجات' : 'Show all products'}
                </p>
              </div>
            </div>
          </Button>
        </div>
        
        <ScrollArea className="h-[500px]">
          <div className="p-2">
            {displayedCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div key={category.id} className="mb-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto transition-all duration-200 ${
                      isSelected 
                        ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className={`p-2 rounded-lg bg-background/50 ${
                        isSelected ? 'bg-primary/20' : ''
                      }`}>
                        <Icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm leading-tight">
                          {language === 'ar' ? category.nameAr : category.name}
                        </p>
                        {category.subcategories && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {category.subcategories.length} {language === 'ar' ? 'فئة فرعية' : 'subcategories'}
                          </p>
                        )}
                      </div>
                      {category.subcategories && (
                        <ChevronRight 
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`} 
                        />
                      )}
                    </div>
                  </Button>
                  
                  {/* Subcategories */}
                  {isExpanded && category.subcategories && (
                    <div className="ml-6 mt-2 space-y-1 animate-fadeIn">
                      {category.subcategories.map((subcategory, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 p-2"
                        >
                          <div className="w-2 h-2 bg-muted-foreground/30 rounded-full mr-3" />
                          {subcategory}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        {/* Footer with View More */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {language === 'ar' 
                ? `عرض ${displayedCategories.length} من ${categories.length}` 
                : `Showing ${displayedCategories.length} of ${categories.length}`
              }
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs hover:bg-primary/10 hover:text-primary"
              onClick={handleViewMoreClick}
            >
              <Eye className="h-3 w-3 mr-1" />
              {showAllCategories 
                ? (language === 'ar' ? 'عرض أقل' : 'Show Less')
                : (language === 'ar' ? 'عرض المزيد' : 'View More')
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}