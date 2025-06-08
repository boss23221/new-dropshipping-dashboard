import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Search, Filter, Plus, Eye, Edit, Trash2, Package, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Order {
  id: string;
  supplierName: string;
  product: string;
  price: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  quantity: number;
}

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    supplierName: 'Tech Solutions Inc.',
    product: 'High-Performance Servers',
    price: 12500.00,
    status: 'Pending',
    orderDate: new Date('2024-06-01'),
    deliveryDate: new Date('2024-06-15'),
    quantity: 5
  },
  {
    id: 'ORD-002',
    supplierName: 'Global Manufacturing Co.',
    product: 'Industrial Components',
    price: 8750.50,
    status: 'Completed',
    orderDate: new Date('2024-05-20'),
    deliveryDate: new Date('2024-06-01'),
    quantity: 100
  },
  {
    id: 'ORD-003',
    supplierName: 'Innovative Materials Ltd.',
    product: 'Advanced Polymers',
    price: 15200.00,
    status: 'Completed',
    orderDate: new Date('2024-05-15'),
    deliveryDate: new Date('2024-05-30'),
    quantity: 25
  },
  {
    id: 'ORD-004',
    supplierName: 'Digital Services LLC',
    product: 'Software Licenses',
    price: 4500.00,
    status: 'Cancelled',
    orderDate: new Date('2024-06-03'),
    quantity: 50
  },
  {
    id: 'ORD-005',
    supplierName: 'Advanced Components Corp.',
    product: 'Electronic Modules',
    price: 9800.75,
    status: 'Pending',
    orderDate: new Date('2024-06-05'),
    deliveryDate: new Date('2024-06-20'),
    quantity: 30
  },
  {
    id: 'ORD-006',
    supplierName: 'Tech Solutions Inc.',
    product: 'Network Equipment',
    price: 6200.00,
    status: 'Completed',
    orderDate: new Date('2024-05-28'),
    deliveryDate: new Date('2024-06-07'),
    quantity: 12
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
  const totalValue = orders.reduce((sum, order) => sum + order.price, 0);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">🕒 Pending</Badge>;
      case 'Completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">✅ Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">❌ Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleAddOrder = () => {
    toast.info(
      <div className="flex items-center space-x-2">
        <Plus className="h-4 w-4 text-blue-500" />
        <span>📝 Add Order feature coming soon!</span>
      </div>
    );
    setIsAddOrderOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🧾</span>
          <div>
            <h1 className="text-3xl">Orders</h1>
            <p className="text-muted-foreground">Manage your purchase orders and track deliveries</p>
          </div>
        </div>
        
        <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              📝 Add New Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-500" />
                <span>📝 Add New Order</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech Solutions Inc.</SelectItem>
                    <SelectItem value="global">Global Manufacturing Co.</SelectItem>
                    <SelectItem value="innovative">Innovative Materials Ltd.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Product</Label>
                <Input placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              <Button onClick={handleAddOrder} className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <Trash2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cancelledOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filter Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by supplier, product, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">🕒 Pending</SelectItem>
                <SelectItem value="Completed">✅ Completed</SelectItem>
                <SelectItem value="Cancelled">❌ Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(searchQuery || statusFilter !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {totalOrders} orders
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Purchase Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-mono">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.supplierName}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="font-mono">{formatCurrency(order.price)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>
                        {order.deliveryDate ? formatDate(order.deliveryDate) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="outline" size="sm" title="View details">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" title="Edit order">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" title="Delete order" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-3 text-muted-foreground">
                        <Package className="h-12 w-12 opacity-50" />
                        <div>
                          <p className="font-medium">No orders found</p>
                          <p className="text-sm">
                            {searchQuery || statusFilter !== 'all' 
                              ? 'Try adjusting your search or filter criteria' 
                              : 'Create your first purchase order to get started'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}