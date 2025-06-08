import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/pages/DashboardPage';
import ImportPage from './components/pages/ImportPage';
import MyProductsPage from './components/pages/MyProductsPage';
import OrdersPage from './components/pages/OrdersPage';
import ArchivedOrdersPage from './components/pages/ArchivedOrdersPage';
import TrackingStatusPage from './components/pages/TrackingStatusPage';
import SuppliersPage from './components/pages/SuppliersPage';
import SettingsPage from './components/pages/SettingsPage';
import LoginPage from './components/pages/LoginPage';
import AliExpressStylePage from './components/pages/AliExpressStylePage';
import { Toaster } from './components/ui/sonner';
import { Language, getDirection } from './components/i18n/translations';

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

interface Settings {
  theme: 'light' | 'dark';
  gridColumns: 1 | 2 | 3 | 4;
  autoRefresh: boolean;
  refreshInterval: number;
  language: Language;
}

interface UserCredentials {
  email: string;
  password: string;
  lastUpdated: Date;
}

interface UserProfile {
  name: string;
  email: string;
  lastLogin: Date;
  joinDate: Date;
}

interface AliExpressConfig {
  apiKey: string;
  appKey: string;
  secretKey: string;
  accessToken: string;
  isEnabled: boolean;
  autoImport: boolean;
  syncInterval: number;
  lastSync: Date | null;
  isConnected: boolean;
}

interface ShopifyConfig {
  shopUrl: string;
  accessToken: string;
  apiKey: string;
  apiSecret: string;
  webhookSecret: string;
  isEnabled: boolean;
  autoSync: boolean;
  syncProducts: boolean;
  syncOrders: boolean;
  syncInventory: boolean;
  syncInterval: number;
  lastSync: Date | null;
  isConnected: boolean;
  shopName: string;
  shopPlan: string;
}

// Default values
const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  gridColumns: 3,
  autoRefresh: false,
  refreshInterval: 30,
  language: 'en'
};

const DEFAULT_CREDENTIALS: UserCredentials = {
  email: 'admin@newdropshipping.com',
  password: 'SecurePass123!',
  lastUpdated: new Date()
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'مدير النظام',
  email: 'admin@newdropshipping.com',
  lastLogin: new Date(),
  joinDate: new Date('2024-01-01')
};

const DEFAULT_ALIEXPRESS_CONFIG: AliExpressConfig = {
  apiKey: '',
  appKey: '',
  secretKey: '',
  accessToken: '',
  isEnabled: false,
  autoImport: false,
  syncInterval: 24,
  lastSync: null,
  isConnected: false
};

const DEFAULT_SHOPIFY_CONFIG: ShopifyConfig = {
  shopUrl: '',
  accessToken: '',
  apiKey: '',
  apiSecret: '',
  webhookSecret: '',
  isEnabled: false,
  autoSync: false,
  syncProducts: true,
  syncOrders: true,
  syncInventory: true,
  syncInterval: 60,
  lastSync: null,
  isConnected: false,
  shopName: '',
  shopPlan: ''
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'DroppShip Pro Solutions',
      email: 'contact@dropshippro.com',
      phone: '+1-555-0123',
      country: 'United States',
      website: 'https://dropshippro.com',
      status: 'active',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Global E-commerce Co.',
      email: 'info@globalecom.com',
      phone: '+44-20-7946-0958',
      country: 'United Kingdom',
      website: 'https://globalecom.com',
      status: 'active',
      createdAt: new Date('2024-02-08')
    },
    {
      id: '3',
      name: 'FastShip Direct Ltd.',
      email: 'sales@fastshipdirect.com',
      phone: '+49-30-12345678',
      country: 'Germany',
      website: 'https://fastshipdirect.de',
      status: 'inactive',
      createdAt: new Date('2024-03-22')
    },
    {
      id: '4',
      name: 'Digital Commerce LLC',
      email: 'hello@digitalcommerce.com',
      phone: '+1-555-9876',
      country: 'Canada',
      website: 'https://digitalcommerce.ca',
      status: 'active',
      createdAt: new Date('2024-04-10')
    },
    {
      id: '5',
      name: 'Premium Dropship Corp.',
      email: 'info@premiumdropship.com',
      phone: '+33-1-45-67-89-12',
      country: 'France',
      website: 'https://premiumdropship.fr',
      status: 'active',
      createdAt: new Date('2024-05-18')
    },
    {
      id: '6',
      name: 'Quick Drop Supplies',
      email: 'support@quickdrop.com',
      phone: '+81-3-1234-5678',
      country: 'Japan',
      website: 'https://quickdrop.jp',
      status: 'inactive',
      createdAt: new Date()
    },
    {
      id: '7',
      name: 'Express Ship Network',
      email: 'orders@expressship.com',
      phone: '+86-10-8765-4321',
      country: 'China',
      website: 'https://expressship.cn',
      status: 'active',
      createdAt: new Date()
    }
  ]);

  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(DEFAULT_CREDENTIALS);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [aliexpressConfig, setAliexpressConfig] = useState<AliExpressConfig>(DEFAULT_ALIEXPRESS_CONFIG);
  const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>(DEFAULT_SHOPIFY_CONFIG);

  // Load all data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        // Load login status
        const savedLoginStatus = localStorage.getItem('newDropshippingLoggedIn');
        if (savedLoginStatus === 'true') {
          setIsLoggedIn(true);
        }

        // Load language preference first
        const savedLanguage = localStorage.getItem('newDropshippingLanguage') as Language;
        
        // Load settings
        const savedSettings = localStorage.getItem('newDropshippingSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings({
            ...DEFAULT_SETTINGS,
            ...parsedSettings,
            language: savedLanguage || DEFAULT_SETTINGS.language
          });
        } else if (savedLanguage) {
          setSettings(prev => ({ ...prev, language: savedLanguage }));
        }

        // Load user credentials
        const savedCredentials = localStorage.getItem('newDropshippingCredentials');
        if (savedCredentials) {
          const parsedCredentials = JSON.parse(savedCredentials);
          setUserCredentials({
            ...parsedCredentials,
            lastUpdated: new Date(parsedCredentials.lastUpdated)
          });
          console.log('Loaded credentials:', parsedCredentials.email);
        } else {
          console.log('No saved credentials found, using defaults');
        }

        // Load user profile
        const savedProfile = localStorage.getItem('newDropshippingProfile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setUserProfile({
            ...parsedProfile,
            lastLogin: new Date(parsedProfile.lastLogin),
            joinDate: new Date(parsedProfile.joinDate)
          });
        }

        // Load suppliers
        const savedSuppliers = localStorage.getItem('newDropshippingSuppliers');
        if (savedSuppliers) {
          const parsedSuppliers = JSON.parse(savedSuppliers);
          const suppliersWithDates = parsedSuppliers.map((supplier: any) => ({
            ...supplier,
            createdAt: new Date(supplier.createdAt)
          }));
          setSuppliers(suppliersWithDates);
        }

        // Load AliExpress config
        const savedAliExpressConfig = localStorage.getItem('newDropshippingAliExpressConfig');
        if (savedAliExpressConfig) {
          const parsedConfig = JSON.parse(savedAliExpressConfig);
          setAliexpressConfig({
            ...parsedConfig,
            lastSync: parsedConfig.lastSync ? new Date(parsedConfig.lastSync) : null
          });
        }

        // Load Shopify config
        const savedShopifyConfig = localStorage.getItem('newDropshippingShopifyConfig');
        if (savedShopifyConfig) {
          const parsedConfig = JSON.parse(savedShopifyConfig);
          setShopifyConfig({
            ...parsedConfig,
            lastSync: parsedConfig.lastSync ? new Date(parsedConfig.lastSync) : null
          });
        }

        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading stored data:', error);
        setDataLoaded(true);
      }
    };

    loadStoredData();
  }, []);

  // Apply language direction and theme when settings change
  useEffect(() => {
    if (!dataLoaded) return;

    const direction = getDirection(settings.language);
    document.documentElement.dir = direction;
    document.documentElement.lang = settings.language;
    
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store language preference
    localStorage.setItem('newDropshippingLanguage', settings.language);
  }, [settings.language, settings.theme, dataLoaded]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!dataLoaded) return;
    
    try {
      localStorage.setItem('newDropshippingSettings', JSON.stringify(settings));
      console.log('Settings saved to localStorage');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings, dataLoaded]);

  // Save credentials to localStorage whenever they change
  useEffect(() => {
    if (!dataLoaded) return;
    
    try {
      localStorage.setItem('newDropshippingCredentials', JSON.stringify(userCredentials));
      console.log('Credentials saved to localStorage:', userCredentials.email);
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  }, [userCredentials, dataLoaded]);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (!dataLoaded) return;
    
    try {
      localStorage.setItem('newDropshippingProfile', JSON.stringify(userProfile));
      console.log('Profile saved to localStorage');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }, [userProfile, dataLoaded]);

  // Save suppliers to localStorage whenever they change
  useEffect(() => {
    if (!dataLoaded) return;
    
    try {
      localStorage.setItem('newDropshippingSuppliers', JSON.stringify(suppliers));
      console.log('Suppliers saved to localStorage');
    } catch (error) {
      console.error('Error saving suppliers:', error);
    }
  }, [suppliers, dataLoaded]);

  // Save AliExpress config to localStorage whenever it changes
  useEffect(() => {
    if (!dataLoaded) return;
    
    try {
      localStorage.setItem('newDropshippingAliExpressConfig', JSON.stringify(aliexpressConfig));
      console.log('AliExpress config saved to localStorage');
    } catch (error) {
      console.error('Error saving AliExpress config:', error);
    }
  }, [aliexpressConfig, dataLoaded]);

  // Save Shopify config to localStorage whenever it changes
  useEffect(() => {
    if (!dataLoaded) return;
    
    try {
      localStorage.setItem('newDropshippingShopifyConfig', JSON.stringify(shopifyConfig));
      console.log('Shopify config saved to localStorage');
    } catch (error) {
      console.error('Error saving Shopify config:', error);
    }
  }, [shopifyConfig, dataLoaded]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSuppliersChange = (newSuppliers: Supplier[]) => {
    setSuppliers(newSuppliers);
  };

  const handleSettingsChange = (newSettings: Settings) => {
    console.log('Settings changed:', newSettings);
    setSettings(newSettings);
  };

  const handleLanguageChange = (language: Language) => {
    console.log('Language changed to:', language);
    setSettings(prev => ({ ...prev, language }));
  };

  const handleCredentialsChange = (newCredentials: Partial<UserCredentials>) => {
    console.log('Credentials change requested:', newCredentials);
    
    const updatedCredentials = {
      ...userCredentials,
      ...newCredentials,
      lastUpdated: new Date()
    };
    
    setUserCredentials(updatedCredentials);
    
    // Update profile email if credentials email changed
    if (newCredentials.email && newCredentials.email !== userProfile.email) {
      const updatedProfile = {
        ...userProfile,
        email: newCredentials.email
      };
      setUserProfile(updatedProfile);
    }

    // Force save to localStorage immediately
    try {
      localStorage.setItem('newDropshippingCredentials', JSON.stringify(updatedCredentials));
      console.log('Credentials force saved:', updatedCredentials.email);
    } catch (error) {
      console.error('Error force saving credentials:', error);
    }
  };

  const handleProfileChange = (newProfile: Partial<UserProfile>) => {
    console.log('Profile change requested:', newProfile);
    
    const updatedProfile = {
      ...userProfile,
      ...newProfile
    };
    
    setUserProfile(updatedProfile);

    // Force save to localStorage immediately
    try {
      localStorage.setItem('newDropshippingProfile', JSON.stringify(updatedProfile));
      console.log('Profile force saved:', updatedProfile.name);
    } catch (error) {
      console.error('Error force saving profile:', error);
    }
  };

  const handleAliExpressConfigChange = (newConfig: AliExpressConfig) => {
    console.log('AliExpress config change requested:', newConfig);
    setAliexpressConfig(newConfig);
  };

  const handleShopifyConfigChange = (newConfig: ShopifyConfig) => {
    console.log('Shopify config change requested:', newConfig);
    setShopifyConfig(newConfig);
  };

  const handleLogin = (email?: string, password?: string) => {
    // Update last login time
    const updatedProfile = {
      ...userProfile,
      lastLogin: new Date()
    };
    setUserProfile(updatedProfile);

    // If no credentials provided, use demo mode
    if (!email || !password) {
      setIsLoggedIn(true);
      localStorage.setItem('newDropshippingLoggedIn', 'true');
      return true;
    }

    // Check against stored credentials
    console.log('Login attempt - Email:', email, 'Stored email:', userCredentials.email);
    console.log('Login attempt - Password:', password, 'Stored password:', userCredentials.password);
    
    if (email === userCredentials.email && password === userCredentials.password) {
      setIsLoggedIn(true);
      localStorage.setItem('newDropshippingLoggedIn', 'true');
      console.log('Login successful');
      return true;
    }

    console.log('Login failed - credentials do not match');
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('newDropshippingLoggedIn');
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage 
            suppliers={suppliers} 
            language={settings.language}
            userProfile={userProfile}
          />
        );
      case 'import':
        return <ImportPage language={settings.language} />;
      case 'products':
        return <MyProductsPage language={settings.language} />;
      case 'orders':
        return <OrdersPage language={settings.language} />;
      case 'archived-orders':
        return <ArchivedOrdersPage language={settings.language} />;
      case 'tracking':
        return <TrackingStatusPage language={settings.language} />;
      case 'aliexpress':
        return <AliExpressStylePage language={settings.language} />;
      case 'suppliers':
        return (
          <SuppliersPage 
            suppliers={suppliers}
            onSuppliersChange={handleSuppliersChange}
            gridColumns={settings.gridColumns}
            autoRefresh={settings.autoRefresh}
            refreshInterval={settings.refreshInterval}
            language={settings.language}
          />
        );
      case 'settings':
        return (
          <SettingsPage 
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onLanguageChange={handleLanguageChange}
            userCredentials={userCredentials}
            onCredentialsChange={handleCredentialsChange}
            userProfile={userProfile}
            onProfileChange={handleProfileChange}
            aliexpressConfig={aliexpressConfig}
            onAliExpressConfigChange={handleAliExpressConfigChange}
            shopifyConfig={shopifyConfig}
            onShopifyConfigChange={handleShopifyConfigChange}
            language={settings.language}
          />
        );
      default:
        return (
          <DashboardPage 
            suppliers={suppliers} 
            language={settings.language}
            userProfile={userProfile}
          />
        );
    }
  };

  // Show loading state while data is being loaded
  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading NEW IN DROPSHIPPING...</p>
        </div>
      </div>
    );
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage 
          onLogin={handleLogin}
          storedCredentials={userCredentials}
          language={settings.language}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        suppliersCount={suppliers.length}
        onLogout={handleLogout}
        language={settings.language}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}