import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  LayoutDashboard,
  Upload,
  Package,
  ShoppingCart,
  Archive,
  MapPin,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Home,
  Globe
} from 'lucide-react';
import { Language } from './i18n/translations';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  suppliersCount: number;
  onLogout: () => void;
  language: Language;
}

interface NavItem {
  id: string;
  label: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  category?: 'main' | 'ecommerce' | 'management';
}

export default function Sidebar({ 
  currentPage, 
  onPageChange, 
  isCollapsed, 
  onToggleCollapse, 
  suppliersCount,
  onLogout,
  language 
}: SidebarProps) {
  const [notifications] = useState(3); // Mock notifications count

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      labelAr: 'لوحة التحكم',
      icon: LayoutDashboard,
      category: 'main'
    },
    {
      id: 'import',
      label: 'Import',
      labelAr: 'استيراد',
      icon: Upload,
      category: 'main'
    },
    {
      id: 'products',
      label: 'My Products',
      labelAr: 'منتجاتي',
      icon: Package,
      category: 'ecommerce'
    },
    {
      id: 'orders',
      label: 'Orders',
      labelAr: 'الطلبات',
      icon: ShoppingCart,
      category: 'ecommerce'
    },
    {
      id: 'archived-orders',
      label: 'Archived Orders',
      labelAr: 'الطلبات المؤرشفة',
      icon: Archive,
      category: 'ecommerce'
    },
    {
      id: 'tracking',
      label: 'Tracking',
      labelAr: 'التتبع',
      icon: MapPin,
      category: 'ecommerce'
    },
    {
      id: 'aliexpress',
      label: 'AliExpress Style',
      labelAr: 'نمط علي إكسبرس',
      icon: Globe,
      category: 'ecommerce'
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      labelAr: 'الموردون',
      icon: Users,
      badge: suppliersCount,
      category: 'management'
    },
    {
      id: 'settings',
      label: 'Settings',
      labelAr: 'الإعدادات',
      icon: Settings,
      category: 'management'
    }
  ];

  const groupedItems = {
    main: navItems.filter(item => item.category === 'main'),
    ecommerce: navItems.filter(item => item.category === 'ecommerce'),
    management: navItems.filter(item => item.category === 'management')
  };

  const getSectionTitle = (section: string) => {
    const titles = {
      main: language === 'ar' ? 'الرئيسية' : 'Main',
      ecommerce: language === 'ar' ? 'التجارة الإلكترونية' : 'E-commerce',
      management: language === 'ar' ? 'الإدارة' : 'Management'
    };
    return titles[section as keyof typeof titles];
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    const label = language === 'ar' ? item.labelAr : item.label;

    return (
      <Button
        key={item.id}
        variant={isActive ? 'default' : 'ghost'}
        className={`
          w-full justify-start gap-3 h-11 px-3
          ${isActive 
            ? 'bg-primary text-primary-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }
          ${isCollapsed ? 'px-2' : ''}
          transition-all duration-200
        `}
        onClick={() => onPageChange(item.id)}
        title={isCollapsed ? label : undefined}
      >
        <Icon className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{label}</span>
            {item.badge && (
              <Badge 
                variant={isActive ? 'secondary' : 'outline'} 
                className="ml-auto h-5 px-1.5 text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Button>
    );
  };

  return (
    <div className={`
      relative flex flex-col bg-sidebar border-r border-sidebar-border
      ${isCollapsed ? 'w-16' : 'w-64'}
      transition-all duration-300 ease-in-out
      h-screen
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                NEW IN
              </span>
              <span className="text-xs text-sidebar-foreground/70">
                DROPSHIPPING
              </span>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-6">
          {/* Main Section */}
          <div className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                {getSectionTitle('main')}
              </h3>
            )}
            {groupedItems.main.map(renderNavItem)}
          </div>

          <Separator className="bg-sidebar-border" />

          {/* E-commerce Section */}
          <div className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                {getSectionTitle('ecommerce')}
              </h3>
            )}
            {groupedItems.ecommerce.map(renderNavItem)}
          </div>

          <Separator className="bg-sidebar-border" />

          {/* Management Section */}
          <div className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                {getSectionTitle('management')}
              </h3>
            )}
            {groupedItems.management.map(renderNavItem)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {/* Notifications */}
        {!isCollapsed && notifications > 0 && (
          <div className="flex items-center justify-between p-2 bg-sidebar-accent rounded-lg">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-sidebar-foreground" />
              <span className="text-sm text-sidebar-foreground">
                {language === 'ar' ? 'إشعارات جديدة' : 'New notifications'}
              </span>
            </div>
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {notifications}
            </Badge>
          </div>
        )}

        {/* Logout Button */}
        <Button
          variant="ghost"
          className={`
            w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent
            ${isCollapsed ? 'px-2' : 'px-3'}
          `}
          onClick={onLogout}
          title={isCollapsed ? (language === 'ar' ? 'تسجيل الخروج' : 'Logout') : undefined}
        >
          <LogOut className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
          {!isCollapsed && (
            <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
          )}
        </Button>

        {/* Version info */}
        {!isCollapsed && (
          <div className="px-3 py-2">
            <p className="text-xs text-sidebar-foreground/50">
              {language === 'ar' ? 'الإصدار' : 'Version'} 1.0.0
            </p>
          </div>
        )}
      </div>
    </div>
  );
}