import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Download, FileSpreadsheet, FileText, Database } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language } from './i18n/translations';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  createdAt: Date;
}

interface ExportButtonProps {
  suppliers: Supplier[];
  filteredSuppliers: Supplier[];
  language: Language;
}

export default function ExportButton({ suppliers, filteredSuppliers, language }: ExportButtonProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const exportToCSV = (data: Supplier[], exportType: 'all' | 'filtered') => {
    const headers = language === 'ar' 
      ? ['الاسم', 'البريد الإلكتروني', 'الهاتف', 'البلد', 'الموقع الإلكتروني', 'تاريخ الإنشاء']
      : ['Name', 'Email', 'Phone', 'Country', 'Website', 'Created Date'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(supplier => [
        `"${supplier.name}"`,
        `"${supplier.email}"`,
        `"${supplier.phone}"`,
        `"${supplier.country}"`,
        `"${supplier.website}"`,
        `"${formatDate(supplier.createdAt)}"`
      ].join(','))
    ].join('\n');

    const filename = `suppliers_${exportType}_${new Date().toISOString().split('T')[0]}.csv`;
    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
    
    toast.success(
      <div className="flex items-center space-x-2">
        <FileText className="h-4 w-4 text-green-500" />
        <span>
          📄 {language === 'ar' 
            ? `تم تصدير ${data.length} مورد إلى CSV بنجاح!`
            : `Exported ${data.length} suppliers to CSV successfully!`
          }
        </span>
      </div>
    );
  };

  const exportToExcel = (data: Supplier[], exportType: 'all' | 'filtered') => {
    const headers = language === 'ar' 
      ? ['الاسم', 'البريد الإلكتروني', 'الهاتف', 'البلد', 'الموقع الإلكتروني', 'تاريخ الإنشاء']
      : ['Name', 'Email', 'Phone', 'Country', 'Website', 'Created Date'];
    
    let htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            table { border-collapse: collapse; width: 100%; direction: ${language === 'ar' ? 'rtl' : 'ltr'}; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: ${language === 'ar' ? 'right' : 'left'}; }
            th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(supplier => `
                <tr>
                  <td>${supplier.name}</td>
                  <td>${supplier.email}</td>
                  <td>${supplier.phone}</td>
                  <td>${supplier.country}</td>
                  <td>${supplier.website}</td>
                  <td>${formatDate(supplier.createdAt)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const filename = `suppliers_${exportType}_${new Date().toISOString().split('T')[0]}.xls`;
    downloadFile(htmlContent, filename, 'application/vnd.ms-excel');
    
    toast.success(
      <div className="flex items-center space-x-2">
        <FileSpreadsheet className="h-4 w-4 text-green-500" />
        <span>
          📊 {language === 'ar' 
            ? `تم تصدير ${data.length} مورد إلى Excel بنجاح!`
            : `Exported ${data.length} suppliers to Excel successfully!`
          }
        </span>
      </div>
    );
  };

  const exportToJSON = (data: Supplier[], exportType: 'all' | 'filtered') => {
    const jsonContent = JSON.stringify(data, null, 2);
    const filename = `suppliers_${exportType}_${new Date().toISOString().split('T')[0]}.json`;
    downloadFile(jsonContent, filename, 'application/json');
    
    toast.success(
      <div className="flex items-center space-x-2">
        <Database className="h-4 w-4 text-green-500" />
        <span>
          📋 {language === 'ar' 
            ? `تم تصدير ${data.length} مورد إلى JSON بنجاح!`
            : `Exported ${data.length} suppliers to JSON successfully!`
          }
        </span>
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 dark:bg-green-950 dark:hover:bg-green-900 dark:border-green-800 dark:text-green-400"
        >
          <Download className="h-4 w-4 mr-2" />
          📤 {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>
              {language === 'ar' 
                ? `تصدير جميع الموردين (${suppliers.length})`
                : `Export All Suppliers (${suppliers.length})`
              }
            </span>
          </div>
        </div>
        
        <DropdownMenuItem onClick={() => exportToCSV(suppliers, 'all')}>
          <FileText className="h-4 w-4 mr-2" />
          📄 {language === 'ar' ? 'تصدير الكل إلى CSV' : 'Export All to CSV'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => exportToExcel(suppliers, 'all')}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          📊 {language === 'ar' ? 'تصدير الكل إلى Excel' : 'Export All to Excel'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => exportToJSON(suppliers, 'all')}>
          <Database className="h-4 w-4 mr-2" />
          📋 {language === 'ar' ? 'تصدير الكل إلى JSON' : 'Export All to JSON'}
        </DropdownMenuItem>
        
        {filteredSuppliers.length !== suppliers.length && (
          <>
            <DropdownMenuSeparator />
            <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="px-2 py-0.5">
                  {language === 'ar' 
                    ? `النتائج المفلترة (${filteredSuppliers.length})`
                    : `Filtered Results (${filteredSuppliers.length})`
                  }
                </Badge>
              </div>
            </div>
            
            <DropdownMenuItem onClick={() => exportToCSV(filteredSuppliers, 'filtered')}>
              <FileText className="h-4 w-4 mr-2" />
              📄 {language === 'ar' ? 'تصدير المفلتر إلى CSV' : 'Export Filtered to CSV'}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => exportToExcel(filteredSuppliers, 'filtered')}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              📊 {language === 'ar' ? 'تصدير المفلتر إلى Excel' : 'Export Filtered to Excel'}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => exportToJSON(filteredSuppliers, 'filtered')}>
              <Database className="h-4 w-4 mr-2" />
              📋 {language === 'ar' ? 'تصدير المفلتر إلى JSON' : 'Export Filtered to JSON'}
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <div className="px-3 py-1 text-xs text-muted-foreground">
          💡 {language === 'ar' 
            ? 'نصيحة: استخدم المرشحات لتصدير بيانات محددة'
            : 'Tip: Use filters to export specific data'
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}