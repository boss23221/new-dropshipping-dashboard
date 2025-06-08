import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Zap,
  FileText,
  Trash2,
  Eye,
  AlertTriangle,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, getTranslation } from '../i18n/translations';

interface ImportedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  sku: string;
  category: string;
  supplier: string;
  imageUrl?: string;
  status: 'pending' | 'published' | 'failed';
  importedAt: Date;
}

interface ImportPageProps {
  language: Language;
}

export default function ImportPage({ language }: ImportPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('cost');
  const [importStatus, setImportStatus] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [importedProducts, setImportedProducts] = useState<ImportedProduct[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Earbuds',
      description: 'High-quality wireless earbuds with noise cancellation',
      price: 89.99,
      cost: 25.50,
      sku: 'WBE-001',
      category: 'Electronics',
      supplier: 'TechSource Ltd',
      imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
      status: 'published',
      importedAt: new Date('2024-06-01')
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor',
      price: 199.99,
      cost: 75.00,
      sku: 'SFW-002',
      category: 'Wearables',
      supplier: 'FitTech Solutions',
      status: 'pending',
      importedAt: new Date('2024-06-05')
    },
    {
      id: '3',
      name: 'Portable Phone Charger',
      description: 'Fast-charging portable battery pack 10000mAh',
      price: 39.99,
      cost: 12.75,
      sku: 'PPC-003',
      category: 'Accessories',
      supplier: 'PowerGear Inc',
      status: 'failed',
      importedAt: new Date('2024-06-03')
    }
  ]);

  // Filter products based on search and status
  const filteredProducts = importedProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = importStatus === 'all' || 
      (importStatus === 'pending' && product.status === 'pending') ||
      (importStatus === 'completed' && product.status === 'published') ||
      (importStatus === 'failed' && product.status === 'failed');
    
    return matchesSearch && matchesStatus;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'cost':
        return a.cost - b.cost;
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return b.importedAt.getTime() - a.importedAt.getTime();
      default:
        return 0;
    }
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Calculate statistics
  const stats = {
    total: importedProducts.length,
    pending: importedProducts.filter(p => p.status === 'pending').length,
    published: importedProducts.filter(p => p.status === 'published').length,
    failed: importedProducts.filter(p => p.status === 'failed').length
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'text/csv' || 
      file.type === 'application/json' ||
      file.name.endsWith('.csv') ||
      file.name.endsWith('.json')
    );

    if (validFiles.length === 0) {
      toast.error('⚠️ Please upload CSV or JSON files only');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress(((i + 1) / validFiles.length) * 100);
        
        const content = await file.text();
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (file.name.endsWith('.csv')) {
          await parseCSV(content);
        } else if (file.name.endsWith('.json')) {
          await parseJSON(content);
        }
      }

      toast.success(
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>✅ Successfully imported {validFiles.length} file(s)!</span>
        </div>
      );

    } catch (error) {
      toast.error('❌ Failed to import files. Please check the format.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const parseCSV = async (content: string) => {
    // Simple CSV parser - in real app, use a proper CSV library
    const lines = content.split('\n');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= headers.length) {
        const newProduct: ImportedProduct = {
          id: Date.now().toString() + i,
          name: values[0] || 'Untitled Product',
          description: values[1] || 'No description',
          price: parseFloat(values[2]) || 0,
          cost: parseFloat(values[3]) || 0,
          sku: values[4] || `SKU-${Date.now()}`,
          category: values[5] || 'General',
          supplier: values[6] || 'Unknown Supplier',
          status: 'pending',
          importedAt: new Date()
        };
        
        setImportedProducts(prev => [...prev, newProduct]);
      }
    }
  };

  const parseJSON = async (content: string) => {
    try {
      const data = JSON.parse(content);
      const products = Array.isArray(data) ? data : [data];
      
      products.forEach((item: any) => {
        const newProduct: ImportedProduct = {
          id: Date.now().toString() + Math.random(),
          name: item.name || 'Untitled Product',
          description: item.description || 'No description',
          price: parseFloat(item.price) || 0,
          cost: parseFloat(item.cost) || 0,
          sku: item.sku || `SKU-${Date.now()}`,
          category: item.category || 'General',
          supplier: item.supplier || 'Unknown Supplier',
          imageUrl: item.imageUrl,
          status: 'pending',
          importedAt: new Date()
        };
        
        setImportedProducts(prev => [...prev, newProduct]);
      });
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDownloadTemplate = () => {
    const csvContent = `name,description,price,cost,sku,category,supplier
Wireless Earbuds,High-quality wireless earbuds,89.99,25.50,WBE-001,Electronics,TechSource Ltd
Smart Watch,Advanced fitness tracking watch,199.99,75.00,SFW-002,Wearables,FitTech Solutions`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success('📄 Template downloaded successfully!');
  };

  const handlePublishProduct = (productId: string) => {
    setImportedProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, status: 'published' as const }
          : product
      )
    );
    toast.success('✅ Product published to store!');
  };

  const handleDeleteProduct = (productId: string) => {
    setImportedProducts(prev => prev.filter(product => product.id !== productId));
    toast.success('🗑️ Product removed from import list');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <div className="w-2 h-2 bg-orange-500 rounded-full" />;
      case 'failed':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">📦</span>
          <div>
            <h1 className="text-3xl">
              {language === 'ar' ? 'قائمة الاستيراد' : 'Import list'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? 'يمكنك استيراد وإدارة منتجات الموردين هنا قبل نشرها في متجرك'
                : 'You can import and manage your suppliers\' products here before publishing them to your store'
              }
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>{language === 'ar' ? 'تصفية' : 'Filter'}</span>
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' 
                  ? 'ابحث عن المنتجات، الأسماء أو وصف المنتج لاستيرادها إلى متجرك...'
                  : 'Search for products, names or product description to import to your store...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-6">
              {language === 'ar' ? 'موافق' : 'OK'}
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
                    <SelectItem value="cost">
                      {language === 'ar' ? 'التكلفة' : 'Cost'}
                    </SelectItem>
                    <SelectItem value="price">
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </SelectItem>
                    <SelectItem value="name">
                      {language === 'ar' ? 'الاسم' : 'Name'}
                    </SelectItem>
                    <SelectItem value="date">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'حالة الاستيراد:' : 'Import status:'}
                </span>
                <Select value={importStatus} onValueChange={setImportStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center space-x-2">
                        <span>{language === 'ar' ? 'الكل' : 'All'}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span>{language === 'ar' ? 'في الانتظار' : 'Pending'}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{language === 'ar' ? 'مكتمل' : 'Completed'}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="failed">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>{language === 'ar' ? 'فشل' : 'Failed'}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Badge variant="outline" className="text-green-500 border-green-500">
              {stats.published} {language === 'ar' ? 'منشور' : 'Published'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Import Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragOver 
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20' 
            : 'border-muted-foreground/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-orange-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-orange-600">
                    {language === 'ar' ? 'جاري الاستيراد...' : 'Importing...'}
                  </p>
                  <Progress value={uploadProgress} className="w-64 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(uploadProgress)}%
                  </p>
                </div>
              </div>
            )}

            {/* Normal State */}
            {!isUploading && (
              <>
                {/* Empty State Icon */}
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${
                  isDragOver ? 'bg-orange-100' : 'bg-muted/30'
                }`}>
                  <Package className={`h-10 w-10 transition-colors ${
                    isDragOver ? 'text-orange-500' : 'text-muted-foreground/50'
                  }`} />
                </div>

                {/* Empty State Text */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    {language === 'ar' 
                      ? 'استيراد منتجات الموردين هنا ونشرها في المتجر'
                      : 'Import supplier products here and push to the store'
                    }
                  </h3>
                  <p className="text-sm text-muted-foreground/70">
                    {language === 'ar'
                      ? 'اسحب وأفلت ملفات CSV أو JSON هنا أو انقر لتحديد الملفات'
                      : 'Drag and drop CSV or JSON files here or click to select files'
                    }
                  </p>
                </div>

                {/* Import Buttons */}
                <div className="flex items-center justify-center space-x-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".csv,.json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{language === 'ar' ? 'استيراد منتجات' : 'Import Products'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadTemplate}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>{language === 'ar' ? 'تحميل نموذج' : 'Download Template'}</span>
                  </Button>
                </div>

                {/* Supported Formats */}
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <FileSpreadsheet className="h-3 w-3" />
                    <span>CSV</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>JSON</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Imported Products Table */}
      {importedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>{language === 'ar' ? 'المنتجات المستوردة' : 'Imported Products'}</span>
              <Badge variant="secondary">{importedProducts.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'ar' ? 'المنتج' : 'Product'}</TableHead>
                    <TableHead>{language === 'ar' ? 'SKU' : 'SKU'}</TableHead>
                    <TableHead>{language === 'ar' ? 'التكلفة' : 'Cost'}</TableHead>
                    <TableHead>{language === 'ar' ? 'السعر' : 'Price'}</TableHead>
                    <TableHead>{language === 'ar' ? 'المورد' : 'Supplier'}</TableHead>
                    <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {product.imageUrl && (
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {product.sku}
                        </code>
                      </TableCell>
                      <TableCell>${product.cost.toFixed(2)}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(product.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(product.status)}
                            <span className="capitalize">{product.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {product.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handlePublishProduct(product.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {language === 'ar' ? 'نشر' : 'Publish'}
                            </Button>
                          )}
                          {product.status === 'published' && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              {language === 'ar' ? 'عرض' : 'View'}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
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

      {/* PageFly Promotion */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium">
                  {language === 'ar' 
                    ? 'تريد الحصول على مبيعات أكثر؟'
                    : 'Want to get more sales?'
                  }
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar'
                    ? 'جرب PageFly لبناء صفحات مبيعات منتجات عالية التحويل'
                    : 'Try PageFly to build high-converting product sales pages'
                  }
                </p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span>{language === 'ar' ? 'تعرف أكثر' : 'Learn More'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Import Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'إجمالي المنتجات' : 'Total Products'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'في الانتظار' : 'Pending'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'منشور في المتجر' : 'Published to Store'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'فشل' : 'Failed'}
            </div>
          </CardContent>
        </Card>
      </div>

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
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? `صفحة ${currentPage} من ${totalPages}`
                : `Page ${currentPage} of ${totalPages}`
              }
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? `عرض ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, sortedProducts.length)} من ${sortedProducts.length}`
                : `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, sortedProducts.length)} of ${sortedProducts.length}`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}