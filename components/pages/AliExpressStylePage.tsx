import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter,
  Star,
  ShoppingCart,
  Heart,
  ChevronRight,
  ChevronDown,
  Truck,
  Shield,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown,
  Plus,
  Minus,
  Loader2
} from 'lucide-react';
import { Language } from '../i18n/translations';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface AliExpressStylePageProps {
  language: Language;
}

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviewCount: number;
  discount: number;
  freeShipping: boolean;
  sold: number;
  isChoice: boolean;
  isNew: boolean;
  category: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  subcategories?: Category[];
  productCount?: number;
}

export default function AliExpressStylePage({ language }: AliExpressStylePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>('computer');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [displayedCount, setDisplayedCount] = useState(8); // Start with 8 products
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // جميع فئات AliExpress الحقيقية
  const categories: Category[] = [
    {
      id: 'all',
      name: 'All Categories',
      nameAr: 'جميع الفئات',
      icon: '📱',
      productCount: 1000000
    },
    {
      id: 'womens-clothing',
      name: "Women's Clothing",
      nameAr: 'ملابس نسائية',
      icon: '👗',
      productCount: 450000,
      subcategories: [
        { id: 'dresses', name: 'Dresses', nameAr: 'فساتين', icon: '👗', productCount: 85000 },
        { id: 'tops', name: 'Tops & Tees', nameAr: 'بلوزات وقمصان', icon: '👚', productCount: 120000 },
        { id: 'bottoms', name: 'Bottoms', nameAr: 'بناطيل وتنانير', icon: '👖', productCount: 95000 },
        { id: 'outerwear', name: 'Outerwear', nameAr: 'ملابس خارجية', icon: '🧥', productCount: 65000 },
        { id: 'lingerie', name: 'Lingerie & Sleepwear', nameAr: 'ملابس داخلية ونوم', icon: '👙', productCount: 45000 }
      ]
    },
    {
      id: 'mens-clothing',
      name: "Men's Clothing",
      nameAr: 'ملابس رجالية',
      icon: '👔',
      productCount: 320000,
      subcategories: [
        { id: 'mens-shirts', name: 'Shirts', nameAr: 'قمصان', icon: '👔', productCount: 75000 },
        { id: 'mens-pants', name: 'Pants', nameAr: 'بناطيل', icon: '👖', productCount: 85000 },
        { id: 'mens-suits', name: 'Suits & Blazers', nameAr: 'بدلات وجاكيتات', icon: '🤵', productCount: 35000 },
        { id: 'mens-casual', name: 'Casual Wear', nameAr: 'ملابس كاجوال', icon: '👕', productCount: 95000 },
        { id: 'mens-underwear', name: 'Underwear', nameAr: 'ملابس داخلية', icon: '🩲', productCount: 25000 }
      ]
    },
    {
      id: 'phones',
      name: 'Phones & Telecommunications',
      nameAr: 'هواتف واتصالات',
      icon: '📱',
      productCount: 280000,
      subcategories: [
        { id: 'smartphones', name: 'Mobile Phones', nameAr: 'هواتف ذكية', icon: '📱', productCount: 45000 },
        { id: 'accessories', name: 'Phone Accessories', nameAr: 'إكسسوارات الهواتف', icon: '🔌', productCount: 150000 },
        { id: 'smartwatches', name: 'Smart Watches', nameAr: 'ساعات ذكية', icon: '⌚', productCount: 35000 },
        { id: 'headphones', name: 'Headphones', nameAr: 'سماعات', icon: '🎧', productCount: 50000 }
      ]
    },
    {
      id: 'computer',
      name: 'Computer & Office',
      nameAr: 'حاسوب ومكتب',
      icon: '💻',
      productCount: 350000,
      subcategories: [
        { id: 'laptops', name: 'Laptops', nameAr: 'أجهزة لابتوب', icon: '💻', productCount: 25000 },
        { id: 'desktops', name: 'Desktop Computers', nameAr: 'أجهزة مكتبية', icon: '🖥️', productCount: 15000 },
        { id: 'computer-accessories', name: 'Computer Accessories', nameAr: 'إكسسوارات الحاسوب', icon: '⌨️', productCount: 180000 },
        { id: 'office-supplies', name: 'Office Supplies', nameAr: 'مستلزمات مكتبية', icon: '📄', productCount: 85000 },
        { id: 'printers', name: 'Printers & Scanners', nameAr: 'طابعات وماسحات', icon: '🖨️', productCount: 15000 }
      ]
    },
    {
      id: 'electronics',
      name: 'Consumer Electronics',
      nameAr: 'إلكترونيات استهلاكية',
      icon: '📟',
      productCount: 420000,
      subcategories: [
        { id: 'tv-audio', name: 'TV & Audio', nameAr: 'تلفزيونات وصوتيات', icon: '📺', productCount: 65000 },
        { id: 'cameras', name: 'Cameras & Photo', nameAr: 'كاميرات وتصوير', icon: '📷', productCount: 45000 },
        { id: 'gaming', name: 'Video Games', nameAr: 'ألعاب فيديو', icon: '🎮', productCount: 85000 },
        { id: 'smart-home', name: 'Smart Home', nameAr: 'منازل ذكية', icon: '🏠', productCount: 120000 },
        { id: 'portable-electronics', name: 'Portable Electronics', nameAr: 'إلكترونيات محمولة', icon: '🔋', productCount: 105000 }
      ]
    },
    {
      id: 'jewelry',
      name: 'Jewelry & Accessories',
      nameAr: 'مجوهرات وإكسسوارات',
      icon: '💍',
      productCount: 180000,
      subcategories: [
        { id: 'fine-jewelry', name: 'Fine Jewelry', nameAr: 'مجوهرات فاخرة', icon: '💎', productCount: 35000 },
        { id: 'fashion-jewelry', name: 'Fashion Jewelry', nameAr: 'مجوهرات عصرية', icon: '💍', productCount: 85000 },
        { id: 'watches', name: 'Watches', nameAr: 'ساعات', icon: '⌚', productCount: 45000 },
        { id: 'jewelry-accessories', name: 'Jewelry Accessories', nameAr: 'إكسسوارات المجوهرات', icon: '📿', productCount: 15000 }
      ]
    },
    {
      id: 'home-garden',
      name: 'Home & Garden',
      nameAr: 'منزل وحديقة',
      icon: '🏡',
      productCount: 520000,
      subcategories: [
        { id: 'home-decor', name: 'Home Decor', nameAr: 'ديكور منزلي', icon: '🖼️', productCount: 150000 },
        { id: 'kitchen', name: 'Kitchen & Dining', nameAr: 'مطبخ وطعام', icon: '🍽️', productCount: 120000 },
        { id: 'bedding', name: 'Bedding', nameAr: 'أغطية سرير', icon: '🛏️', productCount: 85000 },
        { id: 'garden', name: 'Garden Supplies', nameAr: 'مستلزمات الحديقة', icon: '🌱', productCount: 95000 },
        { id: 'furniture', name: 'Furniture', nameAr: 'أثاث', icon: '🪑', productCount: 70000 }
      ]
    },
    {
      id: 'bags-shoes',
      name: 'Bags & Shoes',
      nameAr: 'حقائب وأحذية',
      icon: '👜',
      productCount: 240000,
      subcategories: [
        { id: 'womens-bags', name: "Women's Bags", nameAr: 'حقائب نسائية', icon: '👜', productCount: 95000 },
        { id: 'mens-bags', name: "Men's Bags", nameAr: 'حقائب رجالية', icon: '💼', productCount: 35000 },
        { id: 'womens-shoes', name: "Women's Shoes", nameAr: 'أحذية نسائية', icon: '👠', productCount: 85000 },
        { id: 'mens-shoes', name: "Men's Shoes", nameAr: 'أحذية رجالية', icon: '👞', productCount: 25000 }
      ]
    },
    {
      id: 'toys',
      name: 'Toys & Hobbies',
      nameAr: 'ألعاب وهوايات',
      icon: '🧸',
      productCount: 380000,
      subcategories: [
        { id: 'kids-toys', name: 'Kids Toys', nameAr: 'ألعاب أطفال', icon: '🧸', productCount: 180000 },
        { id: 'educational-toys', name: 'Educational Toys', nameAr: 'ألعاب تعليمية', icon: '🎓', productCount: 65000 },
        { id: 'outdoor-toys', name: 'Outdoor Toys', nameAr: 'ألعاب خارجية', icon: '🏀', productCount: 45000 },
        { id: 'hobby-collectibles', name: 'Hobby & Collectibles', nameAr: 'هوايات ومقتنيات', icon: '🎨', productCount: 90000 }
      ]
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      nameAr: 'جمال وصحة',
      icon: '💄',
      productCount: 420000,
      subcategories: [
        { id: 'makeup', name: 'Makeup', nameAr: 'مكياج', icon: '💄', productCount: 120000 },
        { id: 'skincare', name: 'Skincare', nameAr: 'العناية بالبشرة', icon: '🧴', productCount: 150000 },
        { id: 'haircare', name: 'Hair Care', nameAr: 'العناية بالشعر', icon: '💇', productCount: 85000 },
        { id: 'health', name: 'Health & Wellness', nameAr: 'صحة وعافية', icon: '🏥', productCount: 65000 }
      ]
    },
    {
      id: 'sports',
      name: 'Sports & Entertainment',
      nameAr: 'رياضة وترفيه',
      icon: '⚽',
      productCount: 320000,
      subcategories: [
        { id: 'fitness', name: 'Fitness Equipment', nameAr: 'معدات لياقة', icon: '🏋️', productCount: 85000 },
        { id: 'outdoor-sports', name: 'Outdoor Sports', nameAr: 'رياضة خارجية', icon: '🏕️', productCount: 120000 },
        { id: 'team-sports', name: 'Team Sports', nameAr: 'رياضة جماعية', icon: '⚽', productCount: 65000 },
        { id: 'entertainment', name: 'Entertainment', nameAr: 'ترفيه', icon: '🎪', productCount: 50000 }
      ]
    },
    {
      id: 'automotive',
      name: 'Automobiles & Motorcycles',
      nameAr: 'سيارات ودراجات نارية',
      icon: '🚗',
      productCount: 180000,
      subcategories: [
        { id: 'car-accessories', name: 'Car Accessories', nameAr: 'إكسسوارات السيارات', icon: '🚗', productCount: 120000 },
        { id: 'motorcycle-accessories', name: 'Motorcycle Accessories', nameAr: 'إكسسوارات الدراجات', icon: '🏍️', productCount: 35000 },
        { id: 'car-electronics', name: 'Car Electronics', nameAr: 'إلكترونيات السيارات', icon: '📱', productCount: 25000 }
      ]
    },
    {
      id: 'home-improvement',
      name: 'Home Improvement',
      nameAr: 'تحسين المنزل',
      icon: '🔧',
      productCount: 250000,
      subcategories: [
        { id: 'tools', name: 'Tools & Hardware', nameAr: 'أدوات وعتاد', icon: '🔧', productCount: 95000 },
        { id: 'lighting', name: 'Lighting', nameAr: 'إضاءة', icon: '💡', productCount: 65000 },
        { id: 'bathroom', name: 'Bathroom', nameAr: 'حمام', icon: '🚿', productCount: 45000 },
        { id: 'building-supplies', name: 'Building Supplies', nameAr: 'مواد البناء', icon: '🧱', productCount: 45000 }
      ]
    },
    {
      id: 'mother-kids',
      name: 'Mother & Kids',
      nameAr: 'أم وأطفال',
      icon: '👶',
      productCount: 280000,
      subcategories: [
        { id: 'baby-clothing', name: 'Baby Clothing', nameAr: 'ملابس أطفال', icon: '👶', productCount: 95000 },
        { id: 'baby-care', name: 'Baby Care', nameAr: 'رعاية الأطفال', icon: '🍼', productCount: 85000 },
        { id: 'maternity', name: 'Maternity', nameAr: 'ملابس حوامل', icon: '🤱', productCount: 35000 },
        { id: 'kids-accessories', name: 'Kids Accessories', nameAr: 'إكسسوارات أطفال', icon: '🎒', productCount: 65000 }
      ]
    },
    {
      id: 'security',
      name: 'Security & Protection',
      nameAr: 'أمن وحماية',
      icon: '🔒',
      productCount: 120000,
      subcategories: [
        { id: 'security-cameras', name: 'Security Cameras', nameAr: 'كاميرات مراقبة', icon: '📹', productCount: 45000 },
        { id: 'safety-equipment', name: 'Safety Equipment', nameAr: 'معدات السلامة', icon: '🦺', productCount: 35000 },
        { id: 'access-control', name: 'Access Control', nameAr: 'التحكم في الوصول', icon: '🔐', productCount: 25000 },
        { id: 'workplace-safety', name: 'Workplace Safety', nameAr: 'سلامة مكان العمل', icon: '⚠️', productCount: 15000 }
      ]
    }
  ];

  // مصفوفة كبيرة من المنتجات للاختبار
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Gaming Laptop 15.6" Intel i7 RTX 4060',
      image: '',
      originalPrice: 1299.00,
      salePrice: 899.99,
      rating: 4.7,
      reviewCount: 7821,
      discount: 31,
      freeShipping: true,
      sold: 163,
      isChoice: false,
      isNew: true,
      category: 'computer',
      tags: ['computer', 'gaming', 'laptop']
    },
    {
      id: '2',
      name: 'Wireless Gaming Mouse RGB 6400 DPI',
      image: '',
      originalPrice: 79.99,
      salePrice: 45.99,
      rating: 4.5,
      reviewCount: 604,
      discount: 42,
      freeShipping: true,
      sold: 234,
      isChoice: true,
      isNew: false,
      category: 'computer',
      tags: ['computer', 'gaming', 'mouse']
    },
    {
      id: '3',
      name: 'Mechanical Gaming Keyboard Blue Switch',
      image: '',
      originalPrice: 159.99,
      salePrice: 89.99,
      rating: 4.8,
      reviewCount: 952,
      discount: 44,
      freeShipping: true,
      sold: 156,
      isChoice: false,
      isNew: false,
      category: 'computer',
      tags: ['computer', 'gaming', 'keyboard']
    },
    {
      id: '4',
      name: 'Summer Elegant Dress Collection',
      image: '',
      originalPrice: 79.99,
      salePrice: 49.99,
      rating: 4.6,
      reviewCount: 892,
      discount: 38,
      freeShipping: true,
      sold: 234,
      isChoice: false,
      isNew: false,
      category: 'womens-clothing',
      tags: ['womens-clothing', 'dress', 'summer', 'dresses']
    },
    {
      id: '5',
      name: 'Premium Skincare Set Anti-Aging',
      image: '',
      originalPrice: 159.99,
      salePrice: 89.99,
      rating: 4.9,
      reviewCount: 2341,
      discount: 44,
      freeShipping: true,
      sold: 567,
      isChoice: true,
      isNew: true,
      category: 'beauty',
      tags: ['beauty', 'skincare', 'anti-aging']
    },
    {
      id: '6',
      name: 'Smart Air Purifier HEPA Filter',
      image: '',
      originalPrice: 199.99,
      salePrice: 129.99,
      rating: 4.7,
      reviewCount: 1123,
      discount: 35,
      freeShipping: true,
      sold: 445,
      isChoice: true,
      isNew: false,
      category: 'home-garden',
      tags: ['home-garden', 'air-purifier', 'smart']
    },
    {
      id: '7',
      name: 'Fitness Resistance Bands Set',
      image: '',
      originalPrice: 49.99,
      salePrice: 29.99,
      rating: 4.5,
      reviewCount: 678,
      discount: 40,
      freeShipping: true,
      sold: 892,
      isChoice: false,
      isNew: false,
      category: 'sports',
      tags: ['sports', 'fitness', 'resistance-bands']
    },
    {
      id: '8',
      name: 'Wireless Bluetooth Earbuds Pro',
      image: '',
      originalPrice: 89.99,
      salePrice: 59.99,
      rating: 4.4,
      reviewCount: 1456,
      discount: 33,
      freeShipping: true,
      sold: 789,
      isChoice: false,
      isNew: false,
      category: 'phones',
      tags: ['phones', 'earbuds', 'bluetooth']
    },
    // إضافة المزيد من المنتجات للاختبار
    {
      id: '9',
      name: 'USB-C Hub 7 in 1 Multiport Adapter',
      image: '',
      originalPrice: 89.99,
      salePrice: 42.99,
      rating: 4.6,
      reviewCount: 492,
      discount: 52,
      freeShipping: true,
      sold: 89,
      isChoice: false,
      isNew: false,
      category: 'computer',
      tags: ['computer', 'usb', 'adapter']
    },
    {
      id: '10',
      name: '27" 4K Monitor IPS HDR Gaming Display',
      image: '',
      originalPrice: 299.99,
      salePrice: 199.99,
      rating: 4.9,
      reviewCount: 1556,
      discount: 33,
      freeShipping: true,
      sold: 78,
      isChoice: true,
      isNew: false,
      category: 'computer',
      tags: ['computer', 'monitor', 'gaming']
    },
    {
      id: '11',
      name: 'HD Webcam 1080P with Microphone',
      image: '',
      originalPrice: 129.99,
      salePrice: 69.99,
      rating: 4.4,
      reviewCount: 321,
      discount: 46,
      freeShipping: true,
      sold: 345,
      isChoice: false,
      isNew: false,
      category: 'computer',
      tags: ['computer', 'webcam', 'office']
    },
    {
      id: '12',
      name: 'Women Casual Sneakers Comfortable',
      image: '',
      originalPrice: 69.99,
      salePrice: 39.99,
      rating: 4.3,
      reviewCount: 567,
      discount: 43,
      freeShipping: true,
      sold: 234,
      isChoice: false,
      isNew: false,
      category: 'bags-shoes',
      tags: ['bags-shoes', 'sneakers', 'women']
    },
    {
      id: '13',
      name: 'Smart Watch Fitness Tracker Heart Rate',
      image: '',
      originalPrice: 149.99,
      salePrice: 89.99,
      rating: 4.5,
      reviewCount: 1234,
      discount: 40,
      freeShipping: true,
      sold: 456,
      isChoice: true,
      isNew: true,
      category: 'phones',
      tags: ['phones', 'smartwatch', 'fitness']
    },
    {
      id: '14',
      name: 'LED Strip Lights RGB Smart WiFi',
      image: '',
      originalPrice: 39.99,
      salePrice: 24.99,
      rating: 4.2,
      reviewCount: 789,
      discount: 38,
      freeShipping: true,
      sold: 678,
      isChoice: false,
      isNew: false,
      category: 'home-garden',
      tags: ['home-garden', 'lighting', 'smart']
    },
    {
      id: '15',
      name: 'Portable Power Bank 20000mAh Fast Charge',
      image: '',
      originalPrice: 59.99,
      salePrice: 34.99,
      rating: 4.6,
      reviewCount: 892,
      discount: 42,
      freeShipping: true,
      sold: 567,
      isChoice: false,
      isNew: false,
      category: 'electronics',
      tags: ['electronics', 'power-bank', 'portable']
    },
    {
      id: '16',
      name: 'Vintage Leather Handbag Designer Style',
      image: '',
      originalPrice: 89.99,
      salePrice: 54.99,
      rating: 4.7,
      reviewCount: 345,
      discount: 39,
      freeShipping: true,
      sold: 123,
      isChoice: true,
      isNew: false,
      category: 'bags-shoes',
      tags: ['bags-shoes', 'handbag', 'leather']
    },
    {
      id: '17',
      name: 'Bluetooth Speaker Waterproof Portable',
      image: '',
      originalPrice: 79.99,
      salePrice: 49.99,
      rating: 4.4,
      reviewCount: 678,
      discount: 38,
      freeShipping: true,
      sold: 345,
      isChoice: false,
      isNew: false,
      category: 'electronics',
      tags: ['electronics', 'speaker', 'bluetooth']
    },
    {
      id: '18',
      name: 'Hair Styling Tool Curling Iron Professional',
      image: '',
      originalPrice: 129.99,
      salePrice: 79.99,
      rating: 4.5,
      reviewCount: 456,
      discount: 38,
      freeShipping: true,
      sold: 234,
      isChoice: false,
      isNew: false,
      category: 'beauty',
      tags: ['beauty', 'hair', 'styling']
    },
    {
      id: '19',
      name: 'Kids Educational Tablet Learning Games',
      image: '',
      originalPrice: 149.99,
      salePrice: 99.99,
      rating: 4.6,
      reviewCount: 567,
      discount: 33,
      freeShipping: true,
      sold: 178,
      isChoice: true,
      isNew: true,
      category: 'toys',
      tags: ['toys', 'educational', 'tablet']
    },
    {
      id: '20',
      name: 'Car Phone Mount Magnetic Dashboard',
      image: '',
      originalPrice: 29.99,
      salePrice: 19.99,
      rating: 4.3,
      reviewCount: 234,
      discount: 33,
      freeShipping: true,
      sold: 456,
      isChoice: false,
      isNew: false,
      category: 'automotive',
      tags: ['automotive', 'phone-mount', 'magnetic']
    }
  ];

  const handleLikeToggle = (productId: string) => {
    const newLikedProducts = new Set(likedProducts);
    if (newLikedProducts.has(productId)) {
      newLikedProducts.delete(productId);
      toast.success('💔 ' + (language === 'ar' ? 'تم إزالة من المفضلة' : 'Removed from favorites'));
    } else {
      newLikedProducts.add(productId);
      toast.success('❤️ ' + (language === 'ar' ? 'تم إضافة للمفضلة' : 'Added to favorites'));
    }
    setLikedProducts(newLikedProducts);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setDisplayedCount(8); // Reset displayed count when changing category
    toast.success(
      language === 'ar' 
        ? `🎯 تم اختيار الفئة: ${getCategoryDisplayName(categoryId)}`
        : `🎯 Selected category: ${getCategoryDisplayName(categoryId)}`
    );
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || 
      selectedCategory === 'all' || 
      product.category === selectedCategory ||
      product.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.salePrice - b.salePrice;
      case 'price-high':
        return b.salePrice - a.salePrice;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.sold - a.sold;
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  // Get products to display (limited by displayedCount)
  const productsToShow = sortedProducts.slice(0, displayedCount);
  const hasMoreProducts = sortedProducts.length > displayedCount;

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setDisplayedCount(prev => prev + 8); // Load 8 more products
    setIsLoadingMore(false);
    
    toast.success(
      language === 'ar' 
        ? '✅ تم تحميل المزيد من المنتجات!'
        : '✅ More products loaded!'
    );
  };

  const getCategoryDisplayName = (categoryId?: string) => {
    const id = categoryId || selectedCategory;
    const category = categories.find(cat => cat.id === id);
    if (!category) return language === 'ar' ? 'جميع المنتجات' : 'All Products';
    return language === 'ar' ? category.nameAr : category.name;
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
    
    return (
      <div key={category.id} className="space-y-1">
        <div
          className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all duration-200 ${
            isSelected
              ? 'bg-[#ff6b35] text-white shadow-lg'
              : 'hover:bg-gray-700 text-gray-300'
          } ${level > 0 ? 'ml-4 border-l border-gray-600 pl-3' : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="flex items-center space-x-2 flex-1">
            <span className={`text-${level === 0 ? 'base' : 'sm'}`}>{category.icon}</span>
            <div className="flex-1">
              <div className={`text-${level === 0 ? 'sm' : 'xs'} ${level === 0 ? 'font-medium' : ''}`}>
                {language === 'ar' ? category.nameAr : category.name}
              </div>
              {category.productCount && (
                <div className="text-xs text-gray-400">
                  {category.productCount.toLocaleString()} {language === 'ar' ? 'منتج' : 'products'}
                </div>
              )}
            </div>
          </div>
          
          {hasSubcategories && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                toggleCategoryExpansion(category.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
        
        {hasSubcategories && isExpanded && (
          <div className="space-y-1 animate-fadeIn">
            {category.subcategories!.map((subcategory) => 
              renderCategory(subcategory, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#ff6b35] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl text-white font-bold">AliExpress</h1>
            <div className="relative flex-1 max-w-2xl">
              <Input
                placeholder={language === 'ar' ? 'ابحث عن منتج...' : 'Search for products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-black border-none pr-12 h-10 rounded-md"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1 h-8 bg-[#ff6b35] hover:bg-[#e55a2e] text-white border-none rounded-md"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-white border-white/50">
              {language === 'ar' ? 'عروض' : 'ADS'}
            </Badge>
            <Badge variant="outline" className="text-white border-white/50">
              ALIEXPRESS
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#2d2d2d] px-6 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-300">
              {language === 'ar' ? 'الشحن من:' : 'Ship From:'}
            </span>
            <span className="text-sm text-white">
              {language === 'ar' ? 'جميع البلدان' : 'All Countries'}
            </span>
            <span className="text-sm text-gray-300">
              {language === 'ar' ? 'الشحن إلى:' : 'Ship to:'}
            </span>
            <span className="text-sm text-white">
              {language === 'ar' ? 'جميع البلدان العربية' : 'All Arab Countries'}
            </span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'فلترة' : 'Filter'}
            </Button>
          </div>
          <div className="text-sm text-gray-300">
            {language === 'ar' ? 'عروض قائمة الاستيراد 2024' : 'Import List Deals 2024'}
          </div>
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl mb-2 font-bold">
            {language === 'ar' ? 'عروض خاصة لهذا الشهر!' : "Special Deals This Month!"}
          </h2>
          <p className="text-lg text-blue-100 mb-4">
            {language === 'ar' ? 'اكتشف أفضل المنتجات بأسعار لا تُصدق' : 'Discover the best products at incredible prices'}
          </p>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=200&fit=crop"
              alt="Special Deals"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Vertical Categories Sidebar */}
        <div className="w-80 bg-[#2d2d2d] min-h-screen">
          <div className="sticky top-0 max-h-screen overflow-y-auto">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-white mb-3 flex items-center text-lg font-semibold">
                  <span className="mr-2">📂</span>
                  {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                  <span className="text-gray-400 text-sm ml-2">({categories.length})</span>
                </h3>
              </div>

              <div className="space-y-2">
                {categories.map((category) => renderCategory(category))}
              </div>

              {/* Categories Summary */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
                <h4 className="text-white text-sm font-medium mb-2">
                  {language === 'ar' ? '📊 إحصائيات الفئات' : '📊 Categories Stats'}
                </h4>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'إجمالي الفئات:' : 'Total Categories:'}</span>
                    <span className="text-blue-400">{categories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'الفئات الفرعية:' : 'Subcategories:'}</span>
                    <span className="text-purple-400">
                      {categories.reduce((acc, cat) => acc + (cat.subcategories?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'إجمالي المنتجات:' : 'Total Products:'}</span>
                    <span className="text-green-400">
                      {categories.reduce((acc, cat) => acc + (cat.productCount || 0), 0).toLocaleString()}+
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Category Header with Sort Options */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-white">
                {getCategoryDisplayName()}
                <span className="text-gray-400 text-sm ml-2">
                  {productsToShow.length} {language === 'ar' ? 'منتج معروض من' : 'products shown of'} {sortedProducts.length}
                </span>
              </h2>
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 border border-gray-600 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">
                    {language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
                  </span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#2d2d2d] text-white border border-gray-600 rounded px-3 py-1 text-sm"
                  >
                    <option value="default">
                      {language === 'ar' ? 'افتراضي' : 'Default'}
                    </option>
                    <option value="price-low">
                      {language === 'ar' ? 'السعر: منخفض إلى عالي' : 'Price: Low to High'}
                    </option>
                    <option value="price-high">
                      {language === 'ar' ? 'السعر: عالي إلى منخفض' : 'Price: High to Low'}
                    </option>
                    <option value="rating">
                      {language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}
                    </option>
                    <option value="popularity">
                      {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                    </option>
                    <option value="discount">
                      {language === 'ar' ? 'أكبر خصم' : 'Biggest Discount'}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Selected Category Indicator */}
            {selectedCategory && selectedCategory !== 'all' && (
              <div className="mb-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-white">
                      {language === 'ar' 
                        ? `🔍 عرض منتجات فئة: ${getCategoryDisplayName()} (${sortedProducts.length} منتج)`
                        : `🔍 Showing products for: ${getCategoryDisplayName()} (${sortedProducts.length} products)`
                      }
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {language === 'ar' ? 'مفلتر' : 'Filtered'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                      className="text-xs text-white border-gray-600 hover:bg-gray-700"
                    >
                      {language === 'ar' ? 'مسح' : 'Clear'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {productsToShow.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-xl text-gray-400 mb-2">
                {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
              </h3>
              <p className="text-gray-500">
                {language === 'ar'
                  ? 'جرب البحث بكلمات مختلفة أو اختر فئة أخرى'
                  : 'Try searching with different keywords or select another category'
                }
              </p>
            </div>
          ) : (
            <div className={`
              grid gap-4 
              ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
              }
            `}>
              {productsToShow.map((product) => (
                <Card key={product.id} className="bg-[#2d2d2d] border-gray-600 overflow-hidden group hover:border-[#ff6b35] transition-all">
                  <div className="relative">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-800 relative overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        fallbackType="product"
                        placeholderSize="lg"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 space-y-1">
                        {product.isNew && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                            {language === 'ar' ? 'جديد' : 'New'}
                          </Badge>
                        )}
                        {product.isChoice && (
                          <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                            {language === 'ar' ? 'اختيار' : 'Choice'}
                          </Badge>
                        )}
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                          -{product.discount}%
                        </Badge>
                      </div>

                      {/* Heart Icon */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/20 hover:bg-black/40"
                        onClick={() => handleLikeToggle(product.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            likedProducts.has(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-white'
                          }`} 
                        />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-3">
                      <h3 className="text-sm text-white mb-2 line-clamp-2 group-hover:text-[#ff6b35] transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>

                      {/* Prices */}
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg text-[#ff6b35] font-bold">${product.salePrice}</span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Free Shipping */}
                      {product.freeShipping && (
                        <div className="flex items-center space-x-1 mb-2">
                          <Truck className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-400">
                            {language === 'ar' ? 'شحن مجاني' : 'Free shipping'}
                          </span>
                        </div>
                      )}

                      {/* Sales info */}
                      <div className="text-xs text-gray-400 mb-3">
                        {product.sold} {language === 'ar' ? 'مبيع' : 'sold'}
                      </div>

                      {/* Add to Cart Button */}
                      <Button className="w-full bg-[#ff6b35] hover:bg-[#e55a2e] text-white text-sm py-2">
                        {language === 'ar' ? 'إضافة للسلة' : 'Add to cart'}
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {productsToShow.length > 0 && hasMoreProducts && (
            <div className="text-center mt-8">
              <Button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-[#ff6b35] hover:bg-[#e55a2e] text-white px-8 py-3 text-base"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'تحميل المزيد من المنتجات' : 'Load more products'}
                    <span className="ml-2 text-sm opacity-75">
                      ({sortedProducts.length - displayedCount} {language === 'ar' ? 'متبقي' : 'remaining'})
                    </span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* End of products indicator */}
          {productsToShow.length > 0 && !hasMoreProducts && (
            <div className="text-center mt-8 py-6 border-t border-gray-700">
              <div className="text-gray-400 mb-2">
                {language === 'ar' ? '🎉 تم عرض جميع المنتجات!' : '🎉 All products displayed!'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'ar' 
                  ? `عرض ${productsToShow.length} منتجات من إجمالي ${sortedProducts.length}`
                  : `Showing ${productsToShow.length} products out of ${sortedProducts.length} total`
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}