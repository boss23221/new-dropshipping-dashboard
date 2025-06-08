import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  createdAt: Date;
}

interface ImportButtonProps {
  onImport: (suppliers: Supplier[]) => void;
}

interface ImportResult {
  success: boolean;
  total: number;
  imported: number;
  errors: string[];
  duplicates: number;
}

export default function ImportButton({ onImport }: ImportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };

  const validateSupplierData = (data: any, rowIndex: number): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push(`Row ${rowIndex}: Name is required`);
    }
    
    if (!data.email || data.email.trim() === '') {
      errors.push(`Row ${rowIndex}: Email is required`);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push(`Row ${rowIndex}: Invalid email format`);
    }
    
    if (!data.phone || data.phone.trim() === '') {
      errors.push(`Row ${rowIndex}: Phone is required`);
    }
    
    if (!data.country || data.country.trim() === '') {
      errors.push(`Row ${rowIndex}: Country is required`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setImportResult(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length < 2) {
        throw new Error('File must contain at least a header row and one data row');
      }

      // Parse header
      const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z]/g, ''));
      const expectedHeaders = ['name', 'email', 'phone', 'country', 'website'];
      
      // Check if all required headers are present
      const missingHeaders = expectedHeaders.slice(0, 4).filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
      }

      // Process data rows
      const suppliers: Supplier[] = [];
      const errors: string[] = [];
      let duplicates = 0;
      
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        
        // Create supplier object
        const supplierData: any = {};
        headers.forEach((header, index) => {
          if (expectedHeaders.includes(header)) {
            supplierData[header] = values[index] || '';
          }
        });

        // Validate data
        const validation = validateSupplierData(supplierData, i + 1);
        if (!validation.isValid) {
          errors.push(...validation.errors);
          continue;
        }

        // Check for duplicates (simple email check)
        if (suppliers.some(s => s.email === supplierData.email)) {
          duplicates++;
          continue;
        }

        // Create supplier
        const supplier: Supplier = {
          id: generateId(),
          name: supplierData.name.trim(),
          email: supplierData.email.trim(),
          phone: supplierData.phone.trim(),
          country: supplierData.country.trim(),
          website: supplierData.website ? supplierData.website.trim() : '',
          createdAt: new Date()
        };

        suppliers.push(supplier);
        
        // Update progress
        setProgress((i / lines.length) * 100);
        
        // Small delay for better UX
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      const result: ImportResult = {
        success: suppliers.length > 0,
        total: lines.length - 1,
        imported: suppliers.length,
        errors: errors.slice(0, 10), // Limit error display
        duplicates
      };

      setImportResult(result);

      if (suppliers.length > 0) {
        onImport(suppliers);
        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>📥 Successfully imported {suppliers.length} suppliers!</span>
          </div>
        );
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setImportResult({
        success: false,
        total: 0,
        imported: 0,
        errors: [errorMessage],
        duplicates: 0
      });
      
      toast.error(`❌ Import failed: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('❌ Please select a CSV or Excel file');
      return;
    }

    // For this demo, we'll only handle CSV files
    if (fileExtension !== '.csv') {
      toast.info('📝 For this demo, please use CSV format. Excel support coming soon!');
      return;
    }

    processFile(file);
  };

  const downloadTemplate = () => {
    const csvContent = 'Name,Email,Phone,Country,Website\n' +
                      'Tech Solutions Inc.,contact@techsolutions.com,+1-555-0123,United States,https://techsolutions.com\n' +
                      'Global Manufacturing Co.,info@globalmanufacturing.com,+44-20-7946-0958,United Kingdom,https://globalmanufacturing.com';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'suppliers_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success(
      <div className="flex items-center space-x-2">
        <FileSpreadsheet className="h-4 w-4 text-blue-500" />
        <span>📄 Template downloaded successfully!</span>
      </div>
    );
  };

  const resetImport = () => {
    setImportResult(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-800 dark:text-blue-400"
      >
        <Upload className="h-4 w-4 mr-2" />
        📥 Import Data
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!isProcessing) {
          setIsOpen(open);
          if (!open) resetImport();
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-blue-500" />
              <span>📥 Import Suppliers</span>
            </DialogTitle>
            <DialogDescription>
              Upload a CSV file to import supplier data into your dashboard. Make sure your file includes the required columns.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!importResult && (
              <>
                <Alert>
                  <FileSpreadsheet className="h-4 w-4" />
                  <AlertDescription>
                    📋 Upload a CSV file with supplier data. Required columns: Name, Email, Phone, Country. Optional: Website.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Button
                    onClick={downloadTemplate}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    📄 Download Template
                  </Button>

                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      disabled={isProcessing}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isProcessing}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      📤 Select File to Import
                    </Button>
                  </div>
                </div>
              </>
            )}

            {isProcessing && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                  <p className="font-medium">Processing file...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we import your data</p>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-center text-muted-foreground">{Math.round(progress)}% complete</p>
              </div>
            )}

            {importResult && (
              <div className="space-y-4">
                <Alert className={importResult.success ? "border-green-200 bg-green-50 dark:bg-green-950" : "border-red-200 bg-red-50 dark:bg-red-950"}>
                  {importResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">
                        {importResult.success ? '✅ Import Completed' : '❌ Import Failed'}
                      </p>
                      <div className="text-sm space-y-1">
                        <p>📊 Total rows processed: {importResult.total}</p>
                        <p>✅ Successfully imported: {importResult.imported}</p>
                        {importResult.duplicates > 0 && (
                          <p>🔄 Duplicates skipped: {importResult.duplicates}</p>
                        )}
                        {importResult.errors.length > 0 && (
                          <p>❌ Errors: {importResult.errors.length}</p>
                        )}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                {importResult.errors.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-red-600">Errors found:</p>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {importResult.errors.map((error, index) => (
                        <p key={index} className="text-xs text-red-600 bg-red-50 dark:bg-red-950/50 p-2 rounded">
                          {error}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button onClick={resetImport} variant="outline" className="flex-1">
                    Import Another File
                  </Button>
                  <Button onClick={() => setIsOpen(false)} className="flex-1">
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}