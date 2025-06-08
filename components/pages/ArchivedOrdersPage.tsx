import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Search, 
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  Archive,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language } from '../i18n/translations';

interface ArchivedOrder {
  id: string;
  orderNumber: string;
  date: Date;
  customer: {
    name: string;
    email: string;
    country: string;
  };
  shippingConfirmation: string;
  income: number;
  cost: number;
  supplierOrderNo: string;
  status: 'completed' | 'cancelled' | 'refunded';
  platform: 'aliexpress' | 'temu' | 'alibaba' | 'shopify';
  archivedAt: Date;
}

interface ArchivedOrdersPageProps {
  language: Language;
}

export default function ArchivedOrdersPage({ language }: ArchivedOrdersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(40);

  // Mock archived orders data - empty for demonstration of empty state
  const [archivedOrders] = useState<ArchivedOrder[]>([
    // Uncomment below for sample data
    /*
    {
      id: '1',
      orderNumber: 'ORD-2023-001',
      date: new Date('2023-01-15'),
      customer: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        country: 'United States'
      },
      shippingConfirmation: 'CONF-123456',
      income: 199.99,
      cost: 89.99,
      supplierOrderNo: 'SUP-ALI-789012',
      status: 'completed',
      platform: 'aliexpress',
      archivedAt: new Date('2024-01-15')
    }
    */
  ]);

  // Filter orders based on search term and filters
  const filteredOrders = archivedOrders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierOrderNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'completed' && order.status === 'completed') ||
      (filterBy === 'cancelled' && order.status === 'cancelled') ||
      (filterBy === 'refunded' && order.status === 'refunded') ||
      (filterBy === 'aliexpress' && order.platform === 'aliexpress') ||
      (filterBy === 'temu' && order.platform === 'temu') ||
      (filterBy === 'alibaba' && order.platform === 'alibaba') ||
      (filterBy === 'shopify' && order.platform === 'shopify');
    
    return matchesSearch && matchesFilter;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.date.getTime() - a.date.getTime();
      case 'customer':
        return a.customer.name.localeCompare(b.customer.name);
      case 'income':
        return b.income - a.income;
      case 'cost':
        return b.cost - a.cost;
      case 'order':
        return a.orderNumber.localeCompare(b.orderNumber);
      default:
        return 0;
    }
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    toast.success(language === 'ar' ? '🔍 تم البحث في الطلبات المؤرشفة' : '🔍 Searching archived orders');
  };

  const handleExportArchived = () => {
    if (sortedOrders.length === 0) {
      toast.error(language === 'ar' ? '❌ لا توجد طلبات مؤرشفة للتصدير' : '❌ No archived orders to export');
      return;
    }

    const csvContent = [
      'Order Number,Date,Customer,Country,Email,Shipping Confirmation,Income,Cost,Supplier Order No,Status',
      ...sortedOrders.map(order => 
        `${order.orderNumber},${order.date.toLocaleDateString()},${order.customer.name},${order.customer.country},${order.customer.email},${order.shippingConfirmation},$${order.income},$${order.cost},${order.supplierOrderNo},${order.status}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `archived-orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(language === 'ar' ? '📊 تم تصدير الطلبات المؤرشفة!' : '📊 Archived orders exported successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300';
      case 'refunded':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300';
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
      case 'shopify':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            {language === 'ar' ? 'الطلبات المؤرشفة' : 'Archived orders'}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-4xl">
            {language === 'ar' 
              ? 'الطلبات التي لم يتم معالجتها لأكثر من سنة يتم نقلها تلقائياً إلى الأرشيف. يمكنك الوصول إلى الطلبات المؤرشفة من هنا أو إلغاء أرشفتها لإعادتها إلى قائمة الطلبات النشطة.'
              : 'Orders that have not been processed for more than a year will automatically be placed in the Archived Orders menu. You can still un-archive orders to get them more appreciated, click here to learn more.'
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleExportArchived}>
            <Download className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تصدير الأرشيف' : 'Export Archive'}
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
                  ? 'البحث في الطلبات المؤرشفة...'
                  : 'Search archived orders...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-6">
              {language === 'ar' ? 'بحث' : 'Search Order'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </SelectItem>
                    <SelectItem value="order">
                      {language === 'ar' ? 'رقم الطلب' : 'Order'}
                    </SelectItem>
                    <SelectItem value="customer">
                      {language === 'ar' ? 'العميل' : 'Customer'}
                    </SelectItem>
                    <SelectItem value="income">
                      {language === 'ar' ? 'الدخل' : 'Income'}
                    </SelectItem>
                    <SelectItem value="cost">
                      {language === 'ar' ? 'التكلفة' : 'Cost'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>{language === 'ar' ? 'فلتر' : 'Filter'}</span>
              </Button>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={language === 'ar' ? 'فلترة حسب...' : 'Filter by...'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'جميع الطلبات' : 'All Orders'}
                  </SelectItem>
                  <SelectItem value="completed">
                    {language === 'ar' ? 'مكتمل' : 'Completed'}
                  </SelectItem>
                  <SelectItem value="cancelled">
                    {language === 'ar' ? 'ملغي' : 'Cancelled'}
                  </SelectItem>
                  <SelectItem value="refunded">
                    {language === 'ar' ? 'مسترد' : 'Refunded'}
                  </SelectItem>
                  <SelectItem value="aliexpress">AliExpress</SelectItem>
                  <SelectItem value="temu">Temu</SelectItem>
                  <SelectItem value="alibaba">Alibaba</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge variant="outline" className="text-muted-foreground">
              {language === 'ar' 
                ? `${sortedOrders.length} طلب مؤرشف`
                : `${sortedOrders.length} archived orders`
              }
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          {sortedOrders.length === 0 ? (
            /* Empty State - matches the image exactly */
            <div className="p-12 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-muted/30 rounded-lg flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    {language === 'ar' 
                      ? 'قد لا يكون لبحثك أي نتيجة لأحد الأسباب التالية:'
                      : 'Your search may have no result for one of the following reasons:'
                    }
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground max-w-md mx-auto text-left">
                    <div className="flex items-start space-x-2">
                      <span className="font-medium">1.</span>
                      <span>
                        {language === 'ar'
                          ? 'إذا كنت تبحث عن طلب في Shopify، يرجى التحقق من قائمة الطلبات المؤرشفة في Orders للعثور على الطلب'
                          : 'If you archived the order on Shopify, please check the Archived menu in Orders to find the order'
                        }
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium">2.</span>
                      <span>
                        {language === 'ar'
                          ? 'المعلومات التي أدخلتها غير صحيحة'
                          : 'The information you entered is inaccurate'
                        }
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium">3.</span>
                      <span>
                        {language === 'ar'
                          ? 'البحث غير متاح لتلك المنطقة، قم بتعديل النطاق'
                          : 'The search is not within the currently set date range'
                        }
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium">4.</span>
                      <span>
                        {language === 'ar'
                          ? 'قد يتضمن البحث منتجاً متوقفاً'
                          : 'The search may include a Modern product'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Table with data */
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead>{language === 'ar' ? 'الطلب' : 'Order'}</TableHead>
                    <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                    <TableHead>{language === 'ar' ? 'العميل' : 'Customer'}</TableHead>
                    <TableHead>{language === 'ar' ? 'البلد' : 'Country'}</TableHead>
                    <TableHead>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                    <TableHead>{language === 'ar' ? 'تأكيد الشحن' : 'Shipping Confirmation'}</TableHead>
                    <TableHead>{language === 'ar' ? 'الدخل' : 'Income'}</TableHead>
                    <TableHead>{language === 'ar' ? 'التكلفة' : 'Cost'}</TableHead>
                    <TableHead>{language === 'ar' ? 'رقم طلب المورد' : 'Supplier Order No'}</TableHead>
                    <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getPlatformColor(order.platform)}`} />
                          <span className="font-medium">{order.orderNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{order.date.toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{order.customer.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-blue-600 hover:underline cursor-pointer">
                        {order.customer.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {order.shippingConfirmation}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-green-600 font-medium">
                          <DollarSign className="h-3 w-3" />
                          <span>{order.income.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-orange-600 font-medium">
                          <DollarSign className="h-3 w-3" />
                          <span>{order.cost.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-mono">
                          {order.supplierOrderNo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
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
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
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
            
            <Select value={itemsPerPage.toString()} onValueChange={() => {}}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="40">40 {language === 'ar' ? 'لكل صفحة' : 'page'}</SelectItem>
                <SelectItem value="80">80 {language === 'ar' ? 'لكل صفحة' : 'page'}</SelectItem>
                <SelectItem value="120">120 {language === 'ar' ? 'لكل صفحة' : 'page'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}