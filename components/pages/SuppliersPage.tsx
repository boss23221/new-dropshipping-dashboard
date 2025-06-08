import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import SupplierForm from '../SupplierForm';
import SupplierCard from '../SupplierCard';
import EditSupplierModal from '../EditSupplierModal';
import ExportButton from '../ExportButton';
import ImportButton from '../ImportButton';
import SearchAndFilter from '../SearchAndFilter';
import { 
  Users, 
  Plus, 
  TrendingUp,
  Globe2,
  Calendar,
  Activity,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, getTranslation } from '../i18n/translations';

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

interface SuppliersPageProps {
  suppliers: Supplier[];
  onSuppliersChange: (suppliers: Supplier[]) => void;
  gridColumns: 1 | 2 | 3 | 4;
  autoRefresh: boolean;
  refreshInterval: number;
  language: Language;
}

export default function SuppliersPage({
  suppliers,
  onSuppliersChange,
  gridColumns,
  autoRefresh,
  refreshInterval,
  language
}: SuppliersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Filter suppliers based on search term, country, and status
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.phone.includes(searchTerm) ||
                         supplier.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = !selectedCountry || supplier.country === selectedCountry;
    const matchesStatus = !selectedStatus || supplier.status === selectedStatus;
    
    return matchesSearch && matchesCountry && matchesStatus;
  });

  // Sort suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'country':
        return a.country.localeCompare(b.country);
      case 'date':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // Get unique countries and statuses for filtering
  const countries = Array.from(new Set(suppliers.map(s => s.country))).sort();
  const statuses = ['active', 'inactive'];

  // Calculate statistics
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const inactiveSuppliers = suppliers.filter(s => s.status === 'inactive').length;
  
  // Today's additions
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySuppliers = suppliers.filter(s => {
    const supplierDate = new Date(s.createdAt);
    supplierDate.setHours(0, 0, 0, 0);
    return supplierDate.getTime() === today.getTime();
  }).length;

  const countriesCount = new Set(suppliers.map(s => s.country)).size;

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // In a real app, this would fetch fresh data from the server
      console.log('Auto-refreshing supplier data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const handleAddSupplier = (newSupplier: Omit<Supplier, 'id' | 'createdAt'>) => {
    const supplier: Supplier = {
      ...newSupplier,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const updatedSuppliers = [...suppliers, supplier];
    onSuppliersChange(updatedSuppliers);
    setShowForm(false);
    
    // Show success notification
    toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>✅ {newSupplier.name} {getTranslation('supplierAdded', language)}</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        },
      }
    );
  };

  const handleUpdateSupplier = (updatedSupplier: Supplier) => {
    const updatedSuppliers = suppliers.map(s => 
      s.id === updatedSupplier.id ? updatedSupplier : s
    );
    onSuppliersChange(updatedSuppliers);
    setEditingSupplier(null);
    
    toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>✅ {updatedSupplier.name} {getTranslation('supplierUpdated', language)}</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        },
      }
    );
  };

  const handleDeleteSupplier = (supplierId: string) => {
    const supplierToDelete = suppliers.find(s => s.id === supplierId);
    const updatedSuppliers = suppliers.filter(s => s.id !== supplierId);
    onSuppliersChange(updatedSuppliers);
    
    if (supplierToDelete) {
      toast.success(
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>✅ {supplierToDelete.name} {getTranslation('supplierDeleted', language)}</span>
        </div>,
        {
          duration: 3000,
          style: {
            background: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          },
        }
      );
    }
  };

  const handleImportSuppliers = (importedSuppliers: Supplier[]) => {
    const newSuppliers = importedSuppliers.map(supplier => ({
      ...supplier,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: supplier.status || 'active' as 'active' | 'inactive'
    }));
    
    onSuppliersChange([...suppliers, ...newSuppliers]);
    
    toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>📁 {language === 'ar' ? `تم استيراد ${newSuppliers.length} مورد بنجاح!` : `Successfully imported ${newSuppliers.length} suppliers!`}</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        },
      }
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedStatus('');
    setSortBy('name');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">📦</span>
          <div>
            <h1 className="text-3xl">{getTranslation('suppliers', language)}</h1>
            <p className="text-muted-foreground">{getTranslation('manageSupplierNetwork', language)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Add Supplier Button */}
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-6 py-3 font-medium"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span className="text-lg">➕ {getTranslation('addNewSupplier', language)}</span>
          </Button>
        </div>
      </div>

      {/* Statistics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{getTranslation('totalSuppliers', language)}</p>
                <p className="text-2xl font-bold text-blue-600">{totalSuppliers}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Activity className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">
                    {activeSuppliers} {getTranslation('active', language).toLowerCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-red-600">
                    {inactiveSuppliers} {getTranslation('inactive', language).toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{getTranslation('todayAdded', language)}</p>
                <p className="text-2xl font-bold text-green-600">{todaySuppliers}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">
                    {language === 'ar' ? 'مضاف اليوم' : 'added today'}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{getTranslation('differentCountries', language)}</p>
                <p className="text-2xl font-bold text-purple-600">{countriesCount}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Globe2 className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-600">
                    {language === 'ar' ? 'دولة مختلفة' : 'countries'}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Globe2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Supplier Form */}
      {showForm && (
        <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 animate-fadeIn">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-600" />
              <span>➕ {getTranslation('addNewSupplier', language)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SupplierForm 
              onSubmit={handleAddSupplier} 
              onCancel={() => setShowForm(false)}
              language={language}
            />
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        countries={countries}
        statuses={statuses}
        onClearFilters={clearFilters}
        language={language}
      />

      {/* Results Info and Export */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? `عرض ${sortedSuppliers.length} من ${totalSuppliers} مورد`
              : `Showing ${sortedSuppliers.length} of ${totalSuppliers} suppliers`
            }
          </p>
          {(searchTerm || selectedCountry || selectedStatus) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs"
            >
              🔄 {getTranslation('clearFilters', language)}
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <ImportButton onImport={handleImportSuppliers} language={language} />
          {suppliers.length > 0 && (
            <ExportButton 
              suppliers={suppliers}
              filteredSuppliers={sortedSuppliers}
              language={language}
            />
          )}
        </div>
      </div>

      {/* Suppliers Grid */}
      {sortedSuppliers.length > 0 ? (
        <div className={`grid gap-6 ${
          gridColumns === 1 ? 'grid-cols-1' :
          gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' :
          gridColumns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {sortedSuppliers.map((supplier, index) => (
            <div key={supplier.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
              <SupplierCard
                supplier={supplier}
                onEdit={setEditingSupplier}
                onDelete={handleDeleteSupplier}
                language={language}
              />
            </div>
          ))}
        </div>
      ) : suppliers.length === 0 ? (
        <Card className="border-dashed border-2 card-hover">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-medium mb-2">
              {getTranslation('noSuppliersAvailable', language)}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {getTranslation('addFirstSupplier', language)}
            </p>
            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                ➕ {getTranslation('addNewSupplier', language)}
              </Button>
              <ImportButton onImport={handleImportSuppliers} language={language} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2">
              {getTranslation('noSuppliersFound', language)}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'جرب تعديل مرشحات البحث أو إضافة موردين جدد.'
                : 'Try adjusting your search filters or add new suppliers.'
              }
            </p>
            <Button variant="outline" onClick={clearFilters}>
              🔄 {getTranslation('clearFilters', language)}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Supplier Modal */}
      {editingSupplier && (
        <EditSupplierModal
          supplier={editingSupplier}
          onSave={handleUpdateSupplier}
          onClose={() => setEditingSupplier(null)}
          language={language}
        />
      )}
    </div>
  );
}