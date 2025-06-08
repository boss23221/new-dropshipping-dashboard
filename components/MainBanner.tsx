import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  Star, 
  ShoppingCart, 
  Zap,
  ArrowRight,
  Gift,
  Target,
  Sparkles
} from 'lucide-react';
import { Language } from './i18n/translations';

interface MainBannerProps {
  language: Language;
}

export default function MainBanner({ language }: MainBannerProps) {
  const handleExploreClick = () => {
    // Handle explore products action
    console.log('Explore products clicked');
  };

  const handleTrendingClick = () => {
    // Handle trending products action
    console.log('Trending products clicked');
  };

  return (
    <div className="w-full mb-8">
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-0 shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute top-8 right-8 w-24 h-24 bg-purple-400 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-1/2 w-28 h-28 bg-pink-400 rounded-full blur-3xl" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 px-3 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {language === 'ar' ? 'جديد' : 'NEW'}
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {language === 'ar' ? '+25% مبيعات' : '+25% Sales'}
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  {language === 'ar' 
                    ? 'اكتشف منتجات الصيف الجديدة' 
                    : 'Discover New Summer Products'
                  }
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {language === 'ar'
                    ? 'استكشف آلاف المنتجات عالية الجودة من أفضل الموردين حول العالم. ابدأ رحلة التجارة الإلكترونية اليوم!'
                    : 'Explore thousands of high-quality products from top suppliers worldwide. Start your e-commerce journey today!'
                  }
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 md:space-x-8">
                <div className="text-center">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-blue-600">50K+</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'منتج' : 'Products'}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-green-600">99%</span>
                    <Target className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'نجاح' : 'Success'}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-purple-600">24h</span>
                    <Zap className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'شحن' : 'Shipping'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleExploreClick}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'استكشف المنتجات' : 'Explore Products'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                
                <Button 
                  onClick={handleTrendingClick}
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-950/20 px-8"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'المنتجات الرائجة' : 'Trending Now'}
                </Button>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-80">
                {/* Main Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full animate-pulse" />
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-float">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                
                <div className="absolute top-16 right-12 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <Star className="h-6 w-6 text-yellow-500 fill-current" />
                </div>
                
                <div className="absolute bottom-16 left-16 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <Gift className="h-6 w-6 text-pink-600" />
                </div>
                
                <div className="absolute bottom-8 right-8 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>

                {/* Center Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-4 border-purple-100 dark:border-purple-900">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        NEW
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'منتجات' : 'Products'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>


    </div>
  );
}