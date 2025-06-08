import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, Mail, Phone, Globe, MapPin, Edit3, X, CheckCircle } from 'lucide-react';
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

interface EditSupplierModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onUpdate: (id: string, supplierData: {
    name: string;
    email: string;
    phone: string;
    country: string;
    website: string;
  }) => void;
}

// قائمة البلدان الأكثر شيوعاً للاستخدام في النموذج
const POPULAR_COUNTRIES = [
  { name: 'United States', emoji: '🇺🇸' },
  { name: 'United Kingdom', emoji: '🇬🇧' },
  { name: 'Germany', emoji: '🇩🇪' },
  { name: 'France', emoji: '🇫🇷' },
  { name: 'Canada', emoji: '🇨🇦' },
  { name: 'Australia', emoji: '🇦🇺' },
  { name: 'Japan', emoji: '🇯🇵' },
  { name: 'China', emoji: '🇨🇳' },
  { name: 'India', emoji: '🇮🇳' },
  { name: 'Brazil', emoji: '🇧🇷' },
  { name: 'Mexico', emoji: '🇲🇽' },
  { name: 'Spain', emoji: '🇪🇸' },
  { name: 'Italy', emoji: '🇮🇹' },
  { name: 'Netherlands', emoji: '🇳🇱' },
  { name: 'Switzerland', emoji: '🇨🇭' },
  { name: 'Sweden', emoji: '🇸🇪' },
  { name: 'Norway', emoji: '🇳🇴' },
  { name: 'Denmark', emoji: '🇩🇰' },
  { name: 'Belgium', emoji: '🇧🇪' },
  { name: 'Austria', emoji: '🇦🇹' },
  { name: 'Poland', emoji: '🇵🇱' },
  { name: 'Portugal', emoji: '🇵🇹' },
  { name: 'Ireland', emoji: '🇮🇪' },
  { name: 'Finland', emoji: '🇫🇮' },
  { name: 'South Korea', emoji: '🇰🇷' },
  { name: 'Singapore', emoji: '🇸🇬' },
  { name: 'Hong Kong', emoji: '🇭🇰' },
  { name: 'New Zealand', emoji: '🇳🇿' },
  { name: 'South Africa', emoji: '🇿🇦' },
  { name: 'Israel', emoji: '🇮🇱' },
  { name: 'United Arab Emirates', emoji: '🇦🇪' },
  { name: 'Saudi Arabia', emoji: '🇸🇦' },
  { name: 'Turkey', emoji: '🇹🇷' },
  { name: 'Russia', emoji: '🇷🇺' },
  { name: 'Ukraine', emoji: '🇺🇦' },
  { name: 'Czech Republic', emoji: '🇨🇿' },
  { name: 'Hungary', emoji: '🇭🇺' },
  { name: 'Romania', emoji: '🇷🇴' },
  { name: 'Bulgaria', emoji: '🇧🇬' },
  { name: 'Croatia', emoji: '🇭🇷' },
  { name: 'Slovenia', emoji: '🇸🇮' },
  { name: 'Slovakia', emoji: '🇸🇰' },
  { name: 'Lithuania', emoji: '🇱🇹' },
  { name: 'Latvia', emoji: '🇱🇻' },
  { name: 'Estonia', emoji: '🇪🇪' },
  { name: 'Greece', emoji: '🇬🇷' },
  { name: 'Cyprus', emoji: '🇨🇾' },
  { name: 'Malta', emoji: '🇲🇹' },
  { name: 'Luxembourg', emoji: '🇱🇺' }
];

export default function EditSupplierModal({ 
  isOpen, 
  supplier, 
  onClose, 
  onUpdate 
}: EditSupplierModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when supplier changes
  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        country: supplier.country,
        website: supplier.website
      });
    }
  }, [supplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supplier && formData.name && formData.email && formData.phone && formData.country) {
      setIsSubmitting(true);
      
      try {
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        onUpdate(supplier.id, formData);
        
        // Show success message with checkmark
        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>✅ Supplier "{formData.name}" updated successfully!</span>
          </div>
        );
        
        onClose();
        
      } catch (error) {
        toast.error('❌ Failed to update supplier. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('⚠️ Please fill in all required fields');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    onClose();
    // Reset form data when closing
    if (supplier) {
      setFormData({
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        country: supplier.country,
        website: supplier.website
      });
    }
  };

  if (!supplier) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Edit3 className="h-5 w-5 text-blue-500" />
            <span>✏️ Edit Supplier</span>
          </DialogTitle>
          <DialogDescription>
            Update the supplier information below. All fields marked with an asterisk (*) are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modal-name" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Name <span className="text-red-500">*</span></span>
              </Label>
              <Input
                id="modal-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter supplier name"
                required
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modal-email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email <span className="text-red-500">*</span></span>
              </Label>
              <Input
                id="modal-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email address"
                required
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modal-phone" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone <span className="text-red-500">*</span></span>
              </Label>
              <Input
                id="modal-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter phone number"
                required
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modal-country" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Country <span className="text-red-500">*</span></span>
              </Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => handleChange('country', value)}
                required
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px] overflow-y-auto">
                  {POPULAR_COUNTRIES.map(country => (
                    <SelectItem key={country.name} value={country.name}>
                      <div className="flex items-center space-x-2">
                        <span>{country.emoji}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="modal-website" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Website</span>
              </Label>
              <Input
                id="modal-website"
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="Enter website URL (optional)"
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4 border-t">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  ✏️ Update Supplier
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}