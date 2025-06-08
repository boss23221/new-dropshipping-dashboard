import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductCard from './ProductCard';
import AliExpressHeader from './AliExpressHeader';
import CategorySidebar from './CategorySidebar';
import { 
  ShoppingCart, 
  Eye,
  Gift,
  ArrowRight,
  TrendingUp,
  Package,
  Camera,
  Headphones,
  Watch,
  Shirt
} from 'lucide-react';
import { Language } from './i18n/translations';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: string;
  title: string;
  titleAr: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  badgeAr?: string;
  badgeColor?: string;
  shipping: string;
  shippingAr: string;
  seller: string;
  country: string;
  countryFlag: string;
  category?: string;
}

interface ProductsGridProps {
  language: Language;
}

export default function ProductsGrid({ language }: ProductsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('computer-office');
  const [shipFrom, setShipFrom] = useState('all');
  const [shipTo, setShipTo] = useState('Australia');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('default');

  const products: Product[] = [
    {
      id: '1',
      title: 'Black Sports Sneakers',
      titleAr: 'أحذية رياضية سوداء',
      price: 29.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      badge: 'Choice',
      badgeAr: 'مختار',
      badgeColor: 'bg-orange-500',
      shipping: 'Free shipping',
      shippingAr: 'شحن مجاني',
      seller: 'ShoesStore Pro',
      country: 'China',
      countryFlag: '🇨🇳',
      category: 'consumer-electronics'
    },
    {
      id: '2',
      title: 'Luxury Diamond Ring',
      titleAr: 'خاتم ألماس فاخر',
      price: 45.50,
      originalPrice: 89.99,
      rating: 4.6,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      badge: 'Best Seller',
      badgeAr: 'الأكثر مبيعاً',
      badgeColor: 'bg-green-500',
      shipping: '$2.99 shipping',
      shippingAr: 'شحن 2.99$',
      seller: 'Jewelry Palace',
      country: 'United States',
      countryFlag: '🇺🇸',
      category: 'jewelry-accessories'
    },
    {
      id: '3',
      title: 'Crystal Bracelet Set',
      titleAr: 'مجموعة أساور كريستال',
      price: 75.00,
      rating: 4.9,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop',
      shipping: 'Fast delivery',
      shippingAr: 'توصيل سريع',
      seller: 'Crystal Dreams',
      country: 'Thailand',
      countryFlag: '🇹🇭',
      category: 'jewelry-accessories'
    },
    {
      id: '4',
      title: 'Professional Laptop',
      titleAr: 'لابتوب احترافي',
      price: 899.00,
      originalPrice: 1299.99,
      rating: 4.7,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
      badge: 'New Arrival',
      badgeAr: 'وصل حديثاً',
      badgeColor: 'bg-blue-500',
      shipping: 'Free shipping',
      shippingAr: 'شحن مجاني',
      seller: 'Tech Elite',
      country: 'Taiwan',
      countryFlag: '🇹🇼',
      category: 'computer-office'
    },
    {
      id: '5',
      title: 'Wireless Mouse',
      titleAr: 'فأرة لاسلكية',
      price: 25.99,
      rating: 4.5,
      reviews: 654,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      shipping: '$3.50 shipping',
      shippingAr: 'شحن 3.50$',
      seller: 'ComputerWorld',
      country: 'China',
      countryFlag: '🇨🇳',
      category: 'computer-office'
    },
    {
      id: '6',
      title: 'Mechanical Keyboard',
      titleAr: 'لوحة مفاتيح ميكانيكية',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.9,
      reviews: 432,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
      badge: 'Pro',
      badgeAr: 'احترافي',
      badgeColor: 'bg-purple-500',
      shipping: 'Free shipping',
      shippingAr: 'شحن مجاني',
      seller: 'Gaming Pro',
      country: 'South Korea',
      countryFlag: '🇰🇷',
      category: 'computer-office'
    },
    {
      id: '7',
      title: 'USB-C Hub',
      titleAr: 'موزع USB-C',
      price: 42.99,
      rating: 4.4,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
      shipping: '$4.99 shipping',
      shippingAr: 'شحن 4.99$',
      seller: 'TechHub Co.',
      country: 'Hong Kong',
      countryFlag: '🇭🇰',
      category: 'computer-office'
    },
    {
      id: '8',
      title: 'External Monitor',
      titleAr: 'شاشة خارجية',
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.6,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop',
      badge: 'Smart',
      badgeAr: 'ذكي',
      badgeColor: 'bg-blue-500',
      shipping: 'Free shipping',
      shippingAr: 'شحن مجاني',
      seller: 'DisplayTech Inc.',
      country: 'Japan',
      countryFlag: '🇯🇵',
      category: 'computer-office'
    },
    {
      id: '9',
      title: 'Webcam HD',
      titleAr: 'كاميرا ويب عالية الدقة',
      price: 48.50,
      rating: 4.3,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop',
      shipping: '$2.99 shipping',
      shippingAr: 'شحن 2.99$',
      seller: 'Camera Pro',
      country: 'Germany',
      countryFlag: '🇩🇪',
      category: 'computer-office'
    },
    {
      id: '10',
      title: 'Laptop Stand',
      titleAr: 'حامل اللابتوب',
      price: 24.99,
      originalPrice: 39.99,
      rating: 4.7,
      reviews: 1243,
      image: 'https://images.unsplash.com/photo-1527443060017-4cc67e0b73b1?w=300&h=300&fit=crop',
      shipping: 'Fast delivery',
      shippingAr: 'توصيل سريع',
      seller: 'OfficeSpace Pro',
      country: 'Netherlands',
      countryFlag: '🇳🇱',
      category: 'computer-office'
    },
    {
      id: '11',
      title: 'Power Bank 20000mAh',
      titleAr: 'بطارية محمولة 20000 مللي أمبير',
      price: 35.99,
      rating: 4.8,
      reviews: 756,
      image: 'https://images.unsplash.com/photo-1609592512183-fc8dda39e467?w=300&h=300&fit=crop',
      badge: 'Fast Charge',
      badgeAr: 'شحن سريع',
      badgeColor: 'bg-green-500',
      shipping: 'Free shipping',
      shippingAr: 'شحن مجاني',
      seller: 'PowerTech',
      country: 'China',
      countryFlag: '🇨🇳',
      category: 'computer-office'
    },
    {
      id: '12',
      title: 'Desk Organizer',
      titleAr: 'منظم المكتب',
      price: 18.99,
      rating: 4.5,
      reviews: 423,
      image: 'https://images.unsplash.com/photo-1586281010691-3d8ec2e6e5cf?w=300&h=300&fit=crop',
      shipping: '$3.50 shipping',
      shippingAr: 'شحن 3.50$',
      seller: 'OfficeStyle',
      country: 'Vietnam',
      countryFlag: '🇻🇳',
      category: 'computer-office'
    }
  ];

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
      toast.success(language === 'ar' ? '❤️ تم إزالة المنتج من المفضلة' : '❤️ Removed from favorites');
    } else {
      newLiked.add(productId);
      toast.success(language === 'ar' ? '💖 تم إضافة المنتج للمفضلة' : '💖 Added to favorites');
    }
    setLikedProducts(newLiked);
  };

  const handleQuickView = (product: Product) => {
    toast.info(`${language === 'ar' ? 'معاينة سريعة:' : 'Quick view:'} ${language === 'ar' ? product.titleAr : product.title}`);
  };

  const handleAddToCart = (product: Product) => {
    toast.success(`🛒 ${language === 'ar' ? 'تم إضافة' : 'Added'} "${language === 'ar' ? product.titleAr : product.title}" ${language === 'ar' ? 'إلى السلة' : 'to cart'}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      toast.info(language === 'ar' ? 'عرض جميع المنتجات' : 'Showing all products');
    } else {
      toast.info(`${language === 'ar' ? 'تم اختيار الفئة:' : 'Category selected:'} ${categoryId}`);
    }
  };

  const filteredProducts = products.filter(product => {
    const title = language === 'ar' ? product.titleAr : product.title;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const getCategoryName = (categoryId: string) => {
    const categoryNames: { [key: string]: { en: string; ar: string } } = {
      'all': { en: 'All Categories', ar: 'جميع الفئات' },
      'home-appliances': { en: 'Home Appliances', ar: 'الأجهزة المنزلية' },
      'computer-office': { en: 'Computer & Office', ar: 'الكمبيوتر والمكتب' },
      'home-improvement': { en: 'Home Improvement', ar: 'تحسين المنزل' },
      'home-garden': { en: 'Home & Garden', ar: 'المنزل والحديقة' },
      'sports-entertainment': { en: 'Sports & Entertainment', ar: 'الرياضة والترفيه' },
      'office-school': { en: 'Office & School Supplies', ar: 'مستلزمات المكتب والمدرسة' },
      'toys-hobbies': { en: 'Toys & Hobbies', ar: 'الألعاب والهوايات' },
      'security-protection': { en: 'Security & Protection', ar: 'الأمن والحماية' },
      'automobiles-parts': { en: 'Automobiles, Parts & Accessories', ar: 'السيارات وقطع الغيار والإكسسوارات' },
      'jewelry-accessories': { en: 'Jewelry & Accessories', ar: 'المجوهرات والإكسسوارات' },
      'womens-clothing': { en: "Women's Clothing", ar: 'ملابس نسائية' },
      'health-beauty': { en: 'Health & Beauty', ar: 'الصحة والجمال' },
      'watches': { en: 'Watches', ar: 'الساعات' },
      'consumer-electronics': { en: 'Consumer Electronics', ar: 'الإلكترونيات الاستهلاكية' },
      'luggage-bags': { en: 'Luggage & Bags', ar: 'الحقائب وحقائب السفر' }
    };
    
    return language === 'ar' 
      ? categoryNames[categoryId]?.ar || categoryNames['all'].ar
      : categoryNames[categoryId]?.en || categoryNames['all'].en;
  };

  return (
    <div className="w-full space-y-0">
      {/* AliExpress Header */}
      <AliExpressHeader
        language={language}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        shipFrom={shipFrom}
        onShipFromChange={setShipFrom}
        shipTo={shipTo}
        onShipToChange={setShipTo}
      />

      {/* Dad's Wishlist Banner */}
      <div className="bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 dark:from-orange-950/40 dark:via-orange-950/20 dark:to-orange-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-6">
            {/* Left side - Gift boxes with icons */}
            <div className="flex items-center space-x-4">
              {/* Gift boxes */}
              <div className="grid grid-cols-2 gap-2">
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center transform rotate-12">
                  <div className="w-12 h-12 bg-orange-400 rounded-md flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center transform -rotate-12">
                  <div className="w-12 h-12 bg-blue-400 rounded-md flex items-center justify-center">
                    <Watch className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center transform -rotate-6">
                  <div className="w-12 h-12 bg-gray-400 rounded-md flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center transform rotate-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center">
                    <Shirt className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Text Content */}
            <div className="flex-1 text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-orange-900 dark:text-orange-100">
                Dad's Wishlist,
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-900 dark:text-orange-100">
                Done!
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200">
                Shop Father's Day Gifts
              </div>
            </div>

            {/* Right side - Father and child image */}
            <div className="w-48 h-32 relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=200&fit=crop"
                alt="Father and child"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Categories */}
          <div className="flex-shrink-0">
            <CategorySidebar
              language={language}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Right Content - Products */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold">{getCategoryName(selectedCategory)}</h3>
                <Badge variant="secondary">
                  {sortedProducts.length} {language === 'ar' ? 'منتج' : 'products'}
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Sort by</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  isLiked={likedProducts.has(product.id)}
                  onToggleLike={toggleLike}
                  onQuickView={handleQuickView}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* No Products Found */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {language === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'ar' 
                    ? 'جرب تغيير الفئة أو مصطلح البحث'
                    : 'Try changing the category or search term'
                  }
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('computer-office');
                    setSearchQuery('');
                  }}
                >
                  {language === 'ar' ? 'إعادة تعيين البحث' : 'Reset Search'}
                </Button>
              </div>
            )}

            {/* Load More */}
            {sortedProducts.length > 0 && (
              <div className="text-center py-6">
                <Button variant="outline" size="lg" className="px-8">
                  {language === 'ar' ? 'تحميل المزيد من المنتجات' : 'Load More Products'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}