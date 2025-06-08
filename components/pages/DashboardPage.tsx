import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language } from '../i18n/translations';
import ProductCategoryBar from '../ProductCategoryBar';

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

interface UserProfile {
  name: string;
  email: string;
  lastLogin: Date;
  joinDate: Date;
}

interface DashboardPageProps {
  suppliers: Supplier[];
  language: Language;
  userProfile: UserProfile;
}

export default function DashboardPage({ suppliers, language, userProfile }: DashboardPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for dashboard metrics
  const metrics = {
    totalRevenue: 125842.50,
    revenueChange: 12.5,
    totalOrders: 1247,
    ordersChange: 8.3,
    totalProducts: 3456,
    productsChange: 15.2,
    activeSuppliers: suppliers.filter(s => s.status === 'active').length,
    suppliersChange: 5.7
  };

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'John Smith',
      amount: 89.99,
      status: 'completed',
      date: new Date('2024-06-08T10:30:00')
    },
    {
      id: 'ORD-2024-002',
      customer: 'Sarah Johnson',
      amount: 129.99,
      status: 'processing',
      date: new Date('2024-06-08T09:15:00')
    },
    {
      id: 'ORD-2024-003',
      customer: 'Michael Wilson',
      amount: 45.99,
      status: 'shipped',
      date: new Date('2024-06-08T08:45:00')
    },
    {
      id: 'ORD-2024-004',
      customer: 'Emma Thompson',
      amount: 199.99,
      status: 'pending',
      date: new Date('2024-06-08T07:20:00')
    }
  ];

  const topProducts = [
    {
      id: '1',
      name: 'Wireless Bluetooth Earbuds Pro',
      sales: 245,
      revenue: 17115.00,
      change: 15.3
    },
    {
      id: '2',
      name: 'Summer Elegant Dress Collection',
      sales: 156,
      revenue: 20244.00,
      change: 8.7
    },
    {
      id: '3',
      name: 'Smart Fitness Watch',
      sales: 89,
      revenue: 13335.00,
      change: -2.1
    },
    {
      id: '4',
      name: 'Premium Handbag Classic',
      sales: 67,
      revenue: 9378.00,
      change: 22.5
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    toast.success(
      language === 'ar' 
        ? `🎯 تم اختيار الفئة: ${categoryId}`
        : `🎯 Selected category: ${categoryId}`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: language === 'ar' ? 'مكتمل' : 'Completed',
      processing: language === 'ar' ? 'قيد المعالجة' : 'Processing',
      shipped: language === 'ar' ? 'مشحون' : 'Shipped',
      pending: language === 'ar' ? 'في الانتظار' : 'Pending'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl">
          {language === 'ar' 
            ? `مرحباً، ${userProfile.name}` 
            : `Welcome back, ${userProfile.name}`
          }
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar'
            ? 'إليك نظرة عامة على أداء متجر الدروبشيبينغ الخاص بك'
            : 'Here\'s an overview of your dropshipping store performance'
          }
        </p>
      </div>

      {/* Product Categories Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">
              {language === 'ar' ? '🎪 استكشف الفئات الرائجة' : '🎪 Explore Trending Categories'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'اكتشف أحدث فئات المنتجات والأكثر مبيعاً في السوق'
                : 'Discover the latest trending product categories and bestsellers'
              }
            </p>
          </div>
          <Button variant="outline" className="bg-primary/5 hover:bg-primary/10">
            <Eye className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
          </Button>
        </div>
        
        <ProductCategoryBar 
          language={language}
          onCategoryClick={handleCategoryClick}
        />

        {/* Category Selection Feedback */}
        {selectedCategory && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-sm">
                  {language === 'ar' 
                    ? `📊 عرض البيانات لفئة: ${selectedCategory}` 
                    : `📊 Showing data for category: ${selectedCategory}`
                  }
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs"
                >
                  {language === 'ar' ? 'إلغاء' : 'Clear'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{metrics.revenueChange}% {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalOrders)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{metrics.ordersChange}% {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'إجمالي المنتجات' : 'Total Products'}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalProducts)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{metrics.productsChange}% {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'الموردون النشطون' : 'Active Suppliers'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSuppliers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{metrics.suppliersChange}% {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {language === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}
              </CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'تحديث' : 'Refresh'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{order.id}</span>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.customer} • {order.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(order.amount)}</div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'أفضل المنتجات' : 'Top Products'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium line-clamp-1">
                      {product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.sales} {language === 'ar' ? 'مبيعات' : 'sales'} • {formatCurrency(product.revenue)}
                    </div>
                  </div>
                  <div className="flex items-center text-xs">
                    {product.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={product.change > 0 ? 'text-green-500' : 'text-red-500'}>
                      {Math.abs(product.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-24 flex flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>{language === 'ar' ? 'إضافة منتج' : 'Add Product'}</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>{language === 'ar' ? 'إدارة المخزون' : 'Manage Inventory'}</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>{language === 'ar' ? 'عرض التقارير' : 'View Reports'}</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>{language === 'ar' ? 'إدارة الموردين' : 'Manage Suppliers'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'حالة النظام' : 'System Status'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium text-green-700 dark:text-green-300">
                  {language === 'ar' ? 'مزامنة المنتجات' : 'Product Sync'}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  {language === 'ar' ? 'متصل' : 'Connected'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-300">
                  {language === 'ar' ? 'معالجة الطلبات' : 'Order Processing'}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {language === 'ar' ? 'يعمل' : 'Running'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium text-yellow-700 dark:text-yellow-300">
                  {language === 'ar' ? 'تحديث المخزون' : 'Inventory Update'}
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400">
                  {language === 'ar' ? 'في الانتظار' : 'Pending'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}