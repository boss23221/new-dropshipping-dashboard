import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Search, 
  Filter,
  Grid3X3,
  Grid2X2,
  List,
  Heart,
  Share2,
  Eye,
  ShoppingCart,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  MoreHorizontal,
  Plus,
  Download,
  RefreshCw,
  Settings,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language } from '../i18n/translations';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import ProductCategoryBar from '../ProductCategoryBar';

interface Product {
  id: string;
  name: string;
  price: {
    original: number;
    sale?: number;
    currency: string;
  };
  image: string;
  category: string;
  supplier: string;
  platform: 'aliexpress' | 'temu' | 'alibaba' | 'unmapped';
  status: 'active' | 'draft' | 'out_of_stock';
  sales: number;
  stock: number;
  rating: number;
  reviews: number;
  addedDate: Date;
  sku: string;
  isLiked: boolean;
  tags: string[];
  variants?: {
    color?: string[];
    size?: string[];
  };
}

interface MyProductsPageProps {
  language: Language;
}

export default function MyProductsPage({ language }: MyProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock products data with more realistic information
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Earbuds Pro Max with Noise Cancellation',
      price: { original: 89.99, sale: 69.99, currency: 'USD' },
      image: '', // Testing placeholder
      category: 'Electronics',
      supplier: 'TechPro Supplier',
      platform: 'aliexpress',
      status: 'active',
      sales: 245,
      stock: 150,
      rating: 4.8,
      reviews: 89,
      addedDate: new Date('2024-05-15'),
      sku: 'WBE-001',
      isLiked: true,
      tags: ['trending', 'electronics', 'audio'],
      variants: {
        color: ['Black', 'White', 'Blue'],
        size: ['Standard']
      }
    },
    {
      id: '2',
      name: 'Summer Elegant Bandage Dress Collection',
      price: { original: 129.99, currency: 'USD' },
      image: '', // Empty to test placeholder
      category: 'Fashion',
      supplier: 'Fashion Elite',
      platform: 'temu',
      status: 'active',
      sales: 156,
      stock: 89,
      rating: 4.6,
      reviews: 67,
      addedDate: new Date('2024-05-20'),
      sku: 'SBD-002',
      isLiked: false,
      tags: ['fashion', 'summer', 'dress', 'dresses'],
      variants: {
        color: ['Red', 'Black', 'Navy'],
        size: ['S', 'M', 'L', 'XL']
      }
    },
    {
      id: '3',
      name: 'Women Summer Sandals Premium Quality',
      price: { original: 45.99, sale: 39.99, currency: 'USD' },
      image: '', // Testing placeholder
      category: 'Shoes',
      supplier: 'Comfort Shoes Co.',
      platform: 'alibaba',
      status: 'active',
      sales: 78,
      stock: 234,
      rating: 4.4,
      reviews: 34,
      addedDate: new Date('2024-06-01'),
      sku: 'NSW-003',
      isLiked: true,
      tags: ['shoes', 'summer', 'comfort'],
      variants: {
        color: ['Brown', 'Black', 'Tan'],
        size: ['6', '7', '8', '9', '10']
      }
    },
    {
      id: '4',
      name: 'High Quality Maxi Dress Collection',
      price: { original: 79.99, currency: 'USD' },
      image: '', // Empty to test placeholder
      category: 'Fashion',
      supplier: 'Elite Fashion House',
      platform: 'aliexpress',
      status: 'draft',
      sales: 0,
      stock: 45,
      rating: 0,
      reviews: 0,
      addedDate: new Date('2024-06-05'),
      sku: 'HQM-004',
      isLiked: false,
      tags: ['dress', 'maxi', 'elegant', 'dresses'],
      variants: {
        color: ['Navy', 'Black', 'Burgundy'],
        size: ['S', 'M', 'L']
      }
    },
    {
      id: '5',
      name: 'Women Retro Handbag Classic Design',
      price: { original: 69.99, sale: 59.99, currency: 'USD' },
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      category: 'Accessories',
      supplier: 'Luxury Bags Ltd.',
      platform: 'temu',
      status: 'out_of_stock',
      sales: 123,
      stock: 0,
      rating: 4.7,
      reviews: 56,
      addedDate: new Date('2024-05-28'),
      sku: 'WBR-005',
      isLiked: true,
      tags: ['handbag', 'retro', 'leather'],
      variants: {
        color: ['Black', 'Brown', 'Burgundy']
      }
    },
    {
      id: '6',
      name: 'Smart Fitness Watch with Heart Rate Monitor',
      price: { original: 199.99, sale: 149.99, currency: 'USD' },
      image: '', // Empty to test placeholder
      category: 'Electronics',
      supplier: 'SmartTech Solutions',
      platform: 'unmapped',
      status: 'active',
      sales: 67,
      stock: 78,
      rating: 4.5,
      reviews: 23,
      addedDate: new Date('2024-06-03'),
      sku: 'SFW-006',
      isLiked: false,
      tags: ['smartwatch', 'fitness', 'health'],
      variants: {
        color: ['Black', 'Silver', 'Rose Gold'],
        size: ['42mm', '46mm']
      }
    },
    {
      id: '7',
      name: 'Luxury Beauty Skincare Set Premium',
      price: { original: 159.99, sale: 119.99, currency: 'USD' },
      image: '', // Empty to test placeholder
      category: 'Beauty',
      supplier: 'Beauty Corp.',
      platform: 'aliexpress',
      status: 'active',
      sales: 234,
      stock: 67,
      rating: 4.9,
      reviews: 145,
      addedDate: new Date('2024-05-10'),
      sku: 'BSK-007',
      isLiked: true,
      tags: ['beauty', 'skincare', 'luxury'],
      variants: {
        color: ['Natural', 'Rose', 'Gold']
      }
    },
    // Adding more products for better grid display
    {
      id: '8',
      name: 'Gaming Mechanical Keyboard RGB',
      price: { original: 89.99, sale: 65.99, currency: 'USD' },
      image: '',
      category: 'Electronics',
      supplier: 'Gaming Gear Pro',
      platform: 'aliexpress',
      status: 'active',
      sales: 189,
      stock: 92,
      rating: 4.6,
      reviews: 156,
      addedDate: new Date('2024-05-25'),
      sku: 'GMK-008',
      isLiked: false,
      tags: ['gaming', 'keyboard', 'rgb'],
      variants: {
        color: ['Black', 'White'],
        size: ['Full', 'Compact']
      }
    },
    {
      id: '9',
      name: 'Portable Bluetooth Speaker',
      price: { original: 59.99, sale: 39.99, currency: 'USD' },
      image: '',
      category: 'Electronics',
      supplier: 'Audio Solutions',
      platform: 'temu',
      status: 'active',
      sales: 312,
      stock: 145,
      rating: 4.4,
      reviews: 89,
      addedDate: new Date('2024-06-02'),
      sku: 'PBS-009',
      isLiked: true,
      tags: ['audio', 'bluetooth', 'portable'],
      variants: {
        color: ['Black', 'Blue', 'Red']
      }
    },
    {
      id: '10',
      name: 'Wireless Phone Charger Stand',
      price: { original: 29.99, sale: 19.99, currency: 'USD' },
      image: '',
      category: 'Electronics',
      supplier: 'Charge Solutions',
      platform: 'alibaba',
      status: 'active',
      sales: 145,
      stock: 234,
      rating: 4.3,
      reviews: 67,
      addedDate: new Date('2024-06-06'),
      sku: 'WCS-010',
      isLiked: false,
      tags: ['charger', 'wireless', 'phone'],
      variants: {
        color: ['Black', 'White']
      }
    }
  ]);

  // Filter products based on active tab, search, and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'aliexpress' && product.platform === 'aliexpress') ||
      (activeTab === 'temu' && product.platform === 'temu') ||
      (activeTab === 'alibaba' && product.platform === 'alibaba') ||
      (activeTab === 'unmapped' && product.platform === 'unmapped');
    
    const matchesCategory = !selectedCategory || 
      product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesTab && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.addedDate.getTime() - a.addedDate.getTime();
      case 'sales':
        return b.sales - a.sales;
      case 'price-low':
        return (a.price.sale || a.price.original) - (b.price.sale || b.price.original);
      case 'price-high':
        return (b.price.sale || b.price.original) - (a.price.sale || a.price.original);
      case 'rating':
        return b.rating - a.rating;
      case 'stock':
        return b.stock - a.stock;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'aliexpress':
        return 'bg-orange-500';
      case 'temu':
        return 'bg-blue-500';
      case 'alibaba':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTabCount = (tab: string) => {
    return products.filter(product => 
      tab === 'all' || product.platform === tab
    ).length;
  };

  const handleLikeToggle = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, isLiked: !product.isLiked }
        : product
    ));
    
    const product = products.find(p => p.id === productId);
    if (product) {
      toast.success(
        product.isLiked 
          ? '💔 ' + (language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Removed from favorites')
          : '❤️ ' + (language === 'ar' ? 'تم إضافة المنتج للمفضلة' : 'Added to favorites')
      );
    }
  };

  const handleSync = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('🔄 ' + (language === 'ar' ? 'تم مزامنة المنتجات بنجاح!' : 'Products synced successfully!'));
    } catch (error) {
      toast.error('❌ ' + (language === 'ar' ? 'فشل في مزامنة المنتجات' : 'Failed to sync products'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    toast.success('📊 ' + (language === 'ar' ? 'تم تصدير المنتجات!' : 'Products exported successfully!'));
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    toast.success(
      language === 'ar' 
        ? `🎯 تم تطبيق فلتر الفئة: ${categoryId}`
        : `🎯 Applied category filter: ${categoryId}`
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group product-card overflow-hidden border hover:shadow-lg transition-all duration-200">
      <div className="relative">
        {/* Product Image - Made smaller */}
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50 dark:bg-gray-900">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            fallbackType="product"
            placeholderSize="md"
          />
          
          {/* Platform Badge */}
          <div className="absolute top-1.5 left-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${getPlatformColor(product.platform)}`} />
          </div>
          
          {/* Sale Badge */}
          {product.price.sale && (
            <div className="absolute top-1.5 right-1.5">
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                {Math.round(((product.price.original - product.price.sale) / product.price.original) * 100)}% OFF
              </Badge>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-1.5">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleLikeToggle(product.id)}
              className={`h-7 w-7 p-0 ${product.isLiked ? 'text-red-500' : 'text-gray-600'}`}
            >
              <Heart className={`h-3.5 w-3.5 ${product.isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button size="sm" variant="secondary" className="h-7 w-7 p-0">
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="secondary" className="h-7 w-7 p-0">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {/* Product Info - Compact */}
        <CardContent className="p-3">
          <div className="space-y-1.5">
            {/* Title */}
            <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
            
            {/* SKU and Category */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>SKU: {product.sku}</span>
              <span>{product.category}</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center space-x-1.5">
              {product.price.sale ? (
                <>
                  <span className="font-bold text-primary">${product.price.sale}</span>
                  <span className="text-xs text-muted-foreground line-through">${product.price.original}</span>
                </>
              ) : (
                <span className="font-bold">${product.price.original}</span>
              )}
            </div>
            
            {/* Rating and Sales */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="text-muted-foreground">
                {product.sales} {language === 'ar' ? 'مبيعات' : 'sales'}
              </div>
            </div>
            
            {/* Status and Stock */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={`text-xs ${getStatusColor(product.status)}`}>
                {product.status === 'active' && (language === 'ar' ? 'نشط' : 'Active')}
                {product.status === 'draft' && (language === 'ar' ? 'مسودة' : 'Draft')}
                {product.status === 'out_of_stock' && (language === 'ar' ? 'نفد المخزون' : 'Out of Stock')}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {language === 'ar' ? 'المخزون:' : 'Stock:'} {product.stock}
              </span>
            </div>
            
            {/* Variants - Compact */}
            {product.variants && (
              <div className="space-y-1">
                {product.variants.color && (
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'الألوان:' : 'Colors:'}
                    </span>
                    <div className="flex space-x-0.5">
                      {product.variants.color.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-2.5 h-2.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                      {product.variants.color.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{product.variants.color.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
                {product.variants.size && (
                  <div className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'المقاسات:' : 'Sizes:'} {product.variants.size.slice(0, 3).join(', ')}
                    {product.variants.size.length > 3 && ` +${product.variants.size.length - 3}`}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            {language === 'ar' ? 'منتجاتي' : 'My Products'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'إدارة مجموعة منتجات الدروبشيبينغ الخاصة بك'
              : 'Manage your dropshipping product collection'
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {language === 'ar' ? 'مزامنة' : 'Sync'}
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة منتج' : 'Add Product'}
          </Button>
        </div>
      </div>

      {/* Product Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl">
              {language === 'ar' ? '🎨 تصفح حسب الفئة' : '🎨 Browse by Category'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'ar'
                ? 'اختر فئة لتصفية المنتجات وعرض النتائج المطابقة'
                : 'Select a category to filter products and view matching results'
              }
            </p>
          </div>
          {selectedCategory && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedCategory(null)}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              {language === 'ar' ? 'مسح الفلتر' : 'Clear Filter'}
            </Button>
          )}
        </div>
        
        <ProductCategoryBar 
          language={language}
          onCategoryClick={handleCategoryClick}
        />

        {/* Active Filter Indicator */}
        {selectedCategory && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-sm">
                    {language === 'ar' 
                      ? `🔍 عرض منتجات فئة: ${selectedCategory} (${filteredProducts.length} منتج)`
                      : `🔍 Showing products for: ${selectedCategory} (${filteredProducts.length} products)`
                    }
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {language === 'ar' ? 'مفلتر' : 'Filtered'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' 
                  ? 'البحث في المنتجات...'
                  : 'Search products, SKU, supplier...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>{language === 'ar' ? 'فلتر' : 'Filter'}</span>
            </Button>
            
            <div className="flex items-center space-x-2 border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    {language === 'ar' ? 'الأحدث' : 'Most Recent'}
                  </SelectItem>
                  <SelectItem value="sales">
                    {language === 'ar' ? 'الأكثر مبيعاً' : 'Best Selling'}
                  </SelectItem>
                  <SelectItem value="price-low">
                    {language === 'ar' ? 'السعر: منخفض إلى عالي' : 'Price: Low to High'}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {language === 'ar' ? 'السعر: عالي إلى منخفض' : 'Price: High to Low'}
                  </SelectItem>
                  <SelectItem value="rating">
                    {language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}
                  </SelectItem>
                  <SelectItem value="stock">
                    {language === 'ar' ? 'المخزون' : 'Stock Level'}
                  </SelectItem>
                  <SelectItem value="name">
                    {language === 'ar' ? 'الاسم' : 'Name A-Z'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge variant="outline" className="text-muted-foreground">
              {language === 'ar' 
                ? `${sortedProducts.length} منتج`
                : `${sortedProducts.length} products`
              }
              {selectedCategory && (
                <span className="ml-2 text-primary">
                  • {language === 'ar' ? 'مفلتر' : 'filtered'}
                </span>
              )}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <span>{language === 'ar' ? 'الكل' : 'All'}</span>
            <Badge variant="secondary">({getTabCount('all')})</Badge>
          </TabsTrigger>
          <TabsTrigger value="aliexpress" className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span>AliExpress</span>
            <Badge variant="secondary">({getTabCount('aliexpress')})</Badge>
          </TabsTrigger>
          <TabsTrigger value="temu" className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Temu</span>
            <Badge variant="secondary">({getTabCount('temu')})</Badge>
          </TabsTrigger>
          <TabsTrigger value="alibaba" className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>Alibaba</span>
            <Badge variant="secondary">({getTabCount('alibaba')})</Badge>
          </TabsTrigger>
          <TabsTrigger value="unmapped" className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-500" />
            <span>{language === 'ar' ? 'غير مصنف' : 'Unmapped'}</span>
            <Badge variant="secondary">({getTabCount('unmapped')})</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {sortedProducts.length === 0 ? (
            /* Empty State */
            <Card className="p-12 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-muted-foreground">
                    {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                    {selectedCategory ? (
                      language === 'ar'
                        ? `لا توجد منتجات في فئة "${selectedCategory}". جرب فئة أخرى أو امسح الفلتر.`
                        : `No products found in "${selectedCategory}" category. Try another category or clear the filter.`
                    ) : (
                      language === 'ar'
                        ? 'لم يتم العثور على منتجات تطابق معايير البحث المحددة'
                        : 'No products match your current search and filter criteria'
                    )}
                  </p>
                </div>
                <div className="flex space-x-2 justify-center">
                  {selectedCategory && (
                    <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                      {language === 'ar' ? 'مسح الفلتر' : 'Clear Filter'}
                    </Button>
                  )}
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            /* Products Grid - Increased columns and reduced gaps */
            <div className={`
              grid gap-4
              ${viewMode === 'grid' 
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' 
                : 'grid-cols-1'
              }
            `}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Summary */}
          {sortedProducts.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar' 
                      ? `عرض ${sortedProducts.length} من ${products.length} منتجات`
                      : `Showing ${sortedProducts.length} of ${products.length} products`
                    }
                    {selectedCategory && (
                      <span className="text-primary ml-2">
                        • {language === 'ar' ? `في فئة ${selectedCategory}` : `in ${selectedCategory} category`}
                      </span>
                    )}
                  </span>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="text-green-600">
                      {language === 'ar' ? 'نشط:' : 'Active:'} {products.filter(p => p.status === 'active').length}
                    </span>
                    <span className="text-yellow-600">
                      {language === 'ar' ? 'مسودة:' : 'Draft:'} {products.filter(p => p.status === 'draft').length}
                    </span>
                    <span className="text-red-600">
                      {language === 'ar' ? 'نفد المخزون:' : 'Out of Stock:'} {products.filter(p => p.status === 'out_of_stock').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}