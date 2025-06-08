import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Search, 
  Filter,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MapPin,
  RefreshCw,
  Download,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language } from '../i18n/translations';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TrackingOrder {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'pickup' | 'delivered' | 'expired' | 'attention';
  platform: 'aliexpress' | 'temu' | 'alibaba' | 'shopify';
  customer: {
    name: string;
    email: string;
    phone?: string;
    country: string;
  };
  product: {
    name: string;
    imageUrl: string;
    quantity: number;
  };
  shippingProvider: string;
  shippedDate: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  lastUpdate: Date;
  trackingEvents: {
    date: Date;
    status: string;
    location: string;
    description: string;
  }[];
  cost: number;
  shippingCost: number;
}

interface TrackingStatusPageProps {
  language: Language;
}

export default function TrackingStatusPage({ language }: TrackingStatusPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdate');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking orders data
  const [trackingOrders] = useState<TrackingOrder[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      trackingNumber: 'TRK123456789US',
      status: 'in-transit',
      platform: 'aliexpress',
      customer: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-0123',
        country: 'United States'
      },
      product: {
        name: 'Wireless Bluetooth Earbuds Pro Max',
        imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
        quantity: 2
      },
      shippingProvider: 'FedEx',
      shippedDate: new Date('2024-06-01'),
      estimatedDelivery: new Date('2024-06-15'),
      lastUpdate: new Date('2024-06-10T14:30:00'),
      trackingEvents: [
        {
          date: new Date('2024-06-01T09:00:00'),
          status: 'Package shipped',
          location: 'Guangzhou, China',
          description: 'Package has been shipped from origin'
        },
        {
          date: new Date('2024-06-05T16:20:00'),
          status: 'In transit',
          location: 'Hong Kong Hub',
          description: 'Package is in transit to destination country'
        },
        {
          date: new Date('2024-06-10T14:30:00'),
          status: 'Customs cleared',
          location: 'Los Angeles, CA',
          description: 'Package has cleared customs and is in transit'
        }
      ],
      cost: 49.98,
      shippingCost: 15.99
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      trackingNumber: 'TRK987654321CA',
      status: 'delivered',
      platform: 'temu',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1-647-555-0198',
        country: 'Canada'
      },
      product: {
        name: 'Summer Elegant Bandage Dress',
        imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
        quantity: 1
      },
      shippingProvider: 'DHL',
      shippedDate: new Date('2024-05-25'),
      estimatedDelivery: new Date('2024-06-08'),
      actualDelivery: new Date('2024-06-07'),
      lastUpdate: new Date('2024-06-07T11:45:00'),
      trackingEvents: [
        {
          date: new Date('2024-05-25T10:15:00'),
          status: 'Package shipped',
          location: 'Shenzhen, China',
          description: 'Package has been shipped from origin'
        },
        {
          date: new Date('2024-06-02T08:30:00'),
          status: 'In transit',
          location: 'Vancouver, BC',
          description: 'Package arrived at destination country'
        },
        {
          date: new Date('2024-06-07T11:45:00'),
          status: 'Delivered',
          location: 'Toronto, ON',
          description: 'Package delivered successfully'
        }
      ],
      cost: 49.99,
      shippingCost: 12.50
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      trackingNumber: 'TRK456789123AU',
      status: 'pickup',
      platform: 'alibaba',
      customer: {
        name: 'Michael Wilson',
        email: 'mike.wilson@example.com',
        phone: '+61-2-9876-5432',
        country: 'Australia'
      },
      product: {
        name: 'Women Summer Sandals Premium',
        imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
        quantity: 3
      },
      shippingProvider: '4PX',
      shippedDate: new Date('2024-06-08'),
      estimatedDelivery: new Date('2024-06-20'),
      lastUpdate: new Date('2024-06-12T09:15:00'),
      trackingEvents: [
        {
          date: new Date('2024-06-08T14:20:00'),
          status: 'Package shipped',
          location: 'Shanghai, China',
          description: 'Package has been shipped from origin'
        },
        {
          date: new Date('2024-06-12T09:15:00'),
          status: 'Out for delivery',
          location: 'Sydney, NSW',
          description: 'Package is out for delivery'
        }
      ],
      cost: 29.97,
      shippingCost: 18.00
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      trackingNumber: 'TRK789123456UK',
      status: 'attention',
      platform: 'shopify',
      customer: {
        name: 'Emma Thompson',
        email: 'emma.thompson@example.com',
        country: 'United Kingdom'
      },
      product: {
        name: 'High Quality Maxi Dress Collection',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
        quantity: 1
      },
      shippingProvider: 'UPS',
      shippedDate: new Date('2024-06-05'),
      estimatedDelivery: new Date('2024-06-18'),
      lastUpdate: new Date('2024-06-11T16:30:00'),
      trackingEvents: [
        {
          date: new Date('2024-06-05T11:00:00'),
          status: 'Package shipped',
          location: 'Beijing, China',
          description: 'Package has been shipped from origin'
        },
        {
          date: new Date('2024-06-11T16:30:00'),
          status: 'Delivery exception',
          location: 'London, UK',
          description: 'Delivery attempt failed - recipient not available'
        }
      ],
      cost: 26.49,
      shippingCost: 14.99
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      trackingNumber: 'TRK321654987KR',
      status: 'pending',
      platform: 'aliexpress',
      customer: {
        name: 'David Lee',
        email: 'david.lee@example.com',
        country: 'South Korea'
      },
      product: {
        name: 'Women Retro Handbag Classic',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        quantity: 2
      },
      shippingProvider: 'YUN',
      shippedDate: new Date('2024-06-12'),
      estimatedDelivery: new Date('2024-06-25'),
      lastUpdate: new Date('2024-06-12T08:00:00'),
      trackingEvents: [
        {
          date: new Date('2024-06-12T08:00:00'),
          status: 'Package shipped',
          location: 'Hangzhou, China',
          description: 'Package has been shipped from origin'
        }
      ],
      cost: 36.58,
      shippingCost: 16.50
    },
    {
      id: '6',
      orderNumber: 'ORD-2024-006',
      trackingNumber: 'TRK654987321JP',
      status: 'expired',
      platform: 'temu',
      customer: {
        name: 'Yuki Tanaka',
        email: 'yuki.tanaka@example.com',
        country: 'Japan'
      },
      product: {
        name: 'Smart Watch Sport Edition',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        quantity: 1
      },
      shippingProvider: 'CNE',
      shippedDate: new Date('2024-05-15'),
      estimatedDelivery: new Date('2024-06-01'),
      lastUpdate: new Date('2024-05-28T12:00:00'),
      trackingEvents: [
        {
          date: new Date('2024-05-15T15:30:00'),
          status: 'Package shipped',
          location: 'Dongguan, China',
          description: 'Package has been shipped from origin'
        },
        {
          date: new Date('2024-05-28T12:00:00'),
          status: 'Tracking expired',
          location: 'Unknown',
          description: 'Tracking information is no longer available'
        }
      ],
      cost: 89.99,
      shippingCost: 22.00
    }
  ]);

  // Filter orders based on active tab, search, and filters
  const filteredOrders = trackingOrders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'fedex' && order.shippingProvider === 'FedEx') ||
      (filterBy === 'dhl' && order.shippingProvider === 'DHL') ||
      (filterBy === 'ups' && order.shippingProvider === 'UPS') ||
      (filterBy === '4px' && order.shippingProvider === '4PX') ||
      (filterBy === 'yun' && order.shippingProvider === 'YUN') ||
      (filterBy === 'cne' && order.shippingProvider === 'CNE');
    
    return matchesSearch && matchesTab && matchesFilter;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'lastUpdate':
        return b.lastUpdate.getTime() - a.lastUpdate.getTime();
      case 'shippedDate':
        return b.shippedDate.getTime() - a.shippedDate.getTime();
      case 'customer':
        return a.customer.name.localeCompare(b.customer.name);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'provider':
        return a.shippingProvider.localeCompare(b.shippingProvider);
      default:
        return 0;
    }
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'pickup':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
      case 'attention':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'in-transit':
        return <Truck className="h-3 w-3" />;
      case 'pickup':
        return <MapPin className="h-3 w-3" />;
      case 'delivered':
        return <CheckCircle className="h-3 w-3" />;
      case 'expired':
        return <XCircle className="h-3 w-3" />;
      case 'attention':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: language === 'ar' ? 'في الانتظار' : 'Pending',
      'in-transit': language === 'ar' ? 'في النقل' : 'In transit',
      pickup: language === 'ar' ? 'الاستلام' : 'Pick up',
      delivered: language === 'ar' ? 'تم التسليم' : 'Delivered',
      expired: language === 'ar' ? 'منتهي الصلاحية' : 'Expired',
      attention: language === 'ar' ? 'يحتاج انتباه' : 'Attention'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'aliexpress':
        return 'bg-orange-500';
      case 'temu':
        return 'bg-blue-500';
      case 'alibaba':
        return 'bg-yellow-500';
      case 'shopify':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTabCount = (tab: string) => {
    return trackingOrders.filter(order => 
      tab === 'all' || order.status === tab
    ).length;
  };

  const handleRefreshTracking = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('🔄 ' + (language === 'ar' ? 'تم تحديث بيانات التتبع بنجاح!' : 'Tracking data refreshed successfully!'));
    } catch (error) {
      toast.error('❌ ' + (language === 'ar' ? 'فشل في تحديث بيانات التتبع' : 'Failed to refresh tracking data'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportTracking = () => {
    const csvContent = [
      'Order Number,Tracking Number,Customer,Status,Shipping Provider,Shipped Date,Last Update',
      ...sortedOrders.map(order => 
        `${order.orderNumber},${order.trackingNumber},${order.customer.name},${order.status},${order.shippingProvider},${order.shippedDate.toISOString()},${order.lastUpdate.toISOString()}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracking-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success('📊 ' + (language === 'ar' ? 'تم تصدير بيانات التتبع!' : 'Tracking data exported successfully!'));
  };

  const shippingProviders = [
    { name: 'FedEx', icon: '📦', color: 'bg-purple-500' },
    { name: 'DHL', icon: '🚚', color: 'bg-yellow-500' },
    { name: 'UPS', icon: '📋', color: 'bg-brown-500' },
    { name: '4PX', icon: '🔷', color: 'bg-blue-500' },
    { name: 'YUN', icon: '☁️', color: 'bg-gray-500' },
    { name: 'CNE', icon: '🇨🇳', color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            {language === 'ar' ? 'حالة التتبع' : 'Tracking status'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'تتبع ومراقبة جميع طلبات الشحن في الوقت الفعلي'
              : 'Track and monitor all shipping orders in real-time'
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleRefreshTracking}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {language === 'ar' ? 'تحديث التتبع' : 'Refresh Tracking'}
          </Button>
          <Button variant="outline" onClick={handleExportTracking}>
            <Download className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' 
                  ? 'البحث في التتبع...'
                  : 'Search tracking numbers, orders, customers...'
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastUpdate">
                    {language === 'ar' ? 'آخر تحديث' : 'Last Update'}
                  </SelectItem>
                  <SelectItem value="shippedDate">
                    {language === 'ar' ? 'تاريخ الشحن' : 'Shipped Date'}
                  </SelectItem>
                  <SelectItem value="customer">
                    {language === 'ar' ? 'العميل' : 'Customer'}
                  </SelectItem>
                  <SelectItem value="status">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </SelectItem>
                  <SelectItem value="provider">
                    {language === 'ar' ? 'شركة الشحن' : 'Shipping Provider'}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={language === 'ar' ? 'فلترة حسب...' : 'Filter by...'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'جميع الشركات' : 'All Providers'}
                  </SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="4px">4PX</SelectItem>
                  <SelectItem value="yun">YUN</SelectItem>
                  <SelectItem value="cne">CNE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge variant="outline" className="text-muted-foreground">
              {language === 'ar' 
                ? `${sortedOrders.length} طلب تتبع`
                : `${sortedOrders.length} tracking orders`
              }
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start rounded-none h-12 bg-transparent border-b-0">
          <TabsTrigger 
            value="all" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'الكل' : 'All'}</span>
            <Badge variant="secondary">({getTabCount('all')})</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'في الانتظار' : 'Pending'}</span>
            <Badge variant="secondary">({getTabCount('pending')})</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="in-transit" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'في النقل' : 'In transit'}</span>
            <Badge variant="secondary">({getTabCount('in-transit')})</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="pickup" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'الاستلام' : 'Pick up'}</span>
            <Badge variant="secondary">({getTabCount('pickup')})</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="delivered" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'تم التسليم' : 'Delivered'}</span>
            <Badge variant="secondary">({getTabCount('delivered')})</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="expired" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'منتهي الصلاحية' : 'Expired'}</span>
            <Badge variant="secondary">({getTabCount('expired')})</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="attention" 
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
          >
            <span>{language === 'ar' ? 'يحتاج انتباه' : 'Attention'}</span>
            <Badge variant="secondary">({getTabCount('attention')})</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {sortedOrders.length === 0 ? (
                /* Empty State */
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="space-y-6">
                      <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium text-muted-foreground">
                          {language === 'ar' 
                            ? 'لا توجد طلبات تتبع متاحة' 
                            : 'No tracking orders found'
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                          {language === 'ar'
                            ? 'لا توجد طلبات تطابق معايير البحث والفلترة المحددة'
                            : 'No orders match the current search and filter criteria'
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Tracking Table */
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b">
                            <TableHead>{language === 'ar' ? 'الطلب' : 'Order'}</TableHead>
                            <TableHead>{language === 'ar' ? 'العميل' : 'Customer'}</TableHead>
                            <TableHead>{language === 'ar' ? 'رقم التتبع' : 'Tracking Number'}</TableHead>
                            <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                            <TableHead>{language === 'ar' ? 'شركة الشحن' : 'Provider'}</TableHead>
                            <TableHead>{language === 'ar' ? 'آخر تحديث' : 'Last Update'}</TableHead>
                            <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedOrders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-muted/50">
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <ImageWithFallback
                                    src={order.product.imageUrl}
                                    alt={order.product.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                    fallbackType="product"
                                    placeholderSize="sm"
                                  />
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <div className={`w-2 h-2 rounded-full ${getPlatformColor(order.platform)}`} />
                                      <span className="font-medium">{order.orderNumber}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground line-clamp-1">
                                      {order.product.name}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <User className="h-3 w-3 text-muted-foreground" />
                                    <span className="font-medium">{order.customer.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <Mail className="h-3 w-3" />
                                    <span>{order.customer.email}</span>
                                  </div>
                                  {order.customer.phone && (
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                      <Phone className="h-3 w-3" />
                                      <span>{order.customer.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <Badge variant="outline" className="font-mono text-xs">
                                    {order.trackingNumber}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground">
                                    {order.shippingProvider}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getStatusColor(order.status)}>
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(order.status)}
                                    <span>{getStatusLabel(order.status)}</span>
                                  </div>
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                                    📦
                                  </div>
                                  <span className="font-medium">{order.shippingProvider}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-sm">{order.lastUpdate.toLocaleDateString()}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {order.lastUpdate.toLocaleTimeString()}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button size="sm" variant="ghost">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {language === 'ar' ? 'السابق' : 'Previous'}
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = currentPage > 3 ? currentPage - 2 + i : i + 1;
                        if (pageNum > totalPages) return null;
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      {language === 'ar' ? 'التالي' : 'Next'}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' 
                        ? `عرض ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, sortedOrders.length)} من ${sortedOrders.length}`
                        : `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, sortedOrders.length)} of ${sortedOrders.length}`
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tracking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {language === 'ar' ? 'ملخص التتبع' : 'Tracking Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
                    </span>
                    <span className="font-medium">{trackingOrders.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'تم التسليم' : 'Delivered'}
                    </span>
                    <span className="font-medium text-green-600">
                      {trackingOrders.filter(o => o.status === 'delivered').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'في النقل' : 'In Transit'}
                    </span>
                    <span className="font-medium text-blue-600">
                      {trackingOrders.filter(o => o.status === 'in-transit').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'يحتاج انتباه' : 'Need Attention'}
                    </span>
                    <span className="font-medium text-red-600">
                      {trackingOrders.filter(o => o.status === 'attention').length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Providers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {language === 'ar' ? 'شركات الشحن' : 'Shipping Providers'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {shippingProviders.map((provider, index) => (
                      <div key={index} className="flex flex-col items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-8 h-8 ${provider.color} rounded-full flex items-center justify-center text-white text-sm font-medium mb-2`}>
                          {provider.icon}
                        </div>
                        <span className="text-xs font-medium text-center">{provider.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {trackingOrders.filter(o => o.shippingProvider === provider.name).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {language === 'ar' ? 'آخر التحديثات' : 'Recent Updates'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trackingOrders
                    .sort((a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime())
                    .slice(0, 3)
                    .map((order) => (
                      <div key={order.id} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${getPlatformColor(order.platform)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium line-clamp-1">
                            {order.orderNumber}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {order.lastUpdate.toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}