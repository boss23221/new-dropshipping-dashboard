export type Language = 'en' | 'ar';

export interface Translation {
  // Navigation
  dashboard: string;
  import: string;
  suppliers: string;
  orders: string;
  archivedOrders: string;
  tracking: string;
  settings: string;
  logout: string;
  
  // Dashboard
  welcomeBack: string;
  supplierOverview: string;
  totalSuppliers: string;
  activeSuppliers: string;
  recentSuppliers: string;
  quickActions: string;
  addNewSupplier: string;
  viewAllSuppliers: string;
  exportData: string;
  
  // Welcome Panel
  welcomeMessage: string;
  todaysUpdates: string;
  newSuppliersAdded: string;
  pendingTasks: string;
  systemStatus: string;
  lastLogin: string;
  currentTime: string;
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  tasksForToday: string;
  reviewSuppliers: string;
  updateProfiles: string;
  checkOrders: string;
  
  // Suppliers
  manageSupplierNetwork: string;
  addSupplier: string;
  supplierName: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  status: string;
  searchSuppliers: string;
  sortBy: string;
  filterByCountry: string;
  filterByStatus: string;
  allSuppliers: string;
  allStatuses: string;
  activeStatus: string;
  inactiveStatus: string;
  noSuppliersFound: string;
  noSuppliersAvailable: string;
  addFirstSupplier: string;
  clearFilters: string;
  edit: string;
  delete: string;
  todayAdded: string;
  differentCountries: string;
  
  // Import
  importList: string;
  importListDescription: string;
  importProducts: string;
  downloadTemplate: string;
  importProductsHere: string;
  wantMoreSales: string;
  tryPageFly: string;
  learnMore: string;
  importedProducts: string;
  publishedToStore: string;
  failed: string;
  itemsPerPage: string;
  page: string;
  sortByCost: string;
  importDone: string;
  importStatus: string;
  filter: string;
  all: string;
  dragDropFiles: string;
  supportedFormats: string;
  importing: string;
  templateDownloaded: string;
  productPublished: string;
  productRemoved: string;
  invalidFileFormat: string;
  importSuccess: string;
  importFailed: string;
  totalProducts: string;
  publish: string;
  view: string;
  
  // Orders
  orderManagement: string;
  addNewOrder: string;
  supplierNameCol: string;
  product: string;
  price: string;
  pending: string;
  completed: string;
  cancelled: string;
  
  // Archived Orders
  archivedOrdersTitle: string;
  archivedOrdersDescription: string;
  searchArchivedOrders: string;
  exportArchive: string;
  noArchivedOrders: string;
  archivedOrdersEmpty: string;
  searchOrder: string;
  orderColumn: string;
  dateColumn: string;
  customerColumn: string;
  countryColumn: string;
  emailColumn: string;
  shippingConfirmation: string;
  incomeColumn: string;
  costColumn: string;
  supplierOrderNo: string;
  actionsColumn: string;
  searchReasons: string;
  reason1: string;
  reason2: string;
  reason3: string;
  reason4: string;
  previous: string;
  next: string;
  showing: string;
  of: string;
  perPage: string;
  
  // Tracking Status
  trackingStatus: string;
  trackingFeatureUpgrade: string;
  upgradeButton: string;
  trackingTabs: {
    all: string;
    pending: string;
    inTransit: string;
    pickup: string;
    delivered: string;
    expired: string;
    attention: string;
  };
  trackingBenefits: {
    timelyAccess: string;
    reduceDelays: string;
    customerFeedback: string;
  };
  noTrackingData: string;
  noTrackingDescription: string;
  upgradeNow: string;
  supportedProviders: string;
  activateTracking: string;
  activateTrackingDescription: string;
  upgradePlan: string;
  
  // Settings
  customizePreferences: string;
  general: string;
  appearance: string;
  security: string;
  language: string;
  autoRefresh: string;
  enableAutoRefresh: string;
  autoRefreshDescription: string;
  refreshInterval: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  brightClean: string;
  easyOnEyes: string;
  layout: string;
  gridColumns: string;
  
  // Security
  securityOverview: string;
  currentEmail: string;
  lastUpdated: string;
  changeEmail: string;
  changePassword: string;
  newEmail: string;
  confirmCurrentPassword: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordStrength: string;
  weak: string;
  fair: string;
  good: string;
  strong: string;
  passwordsMatch: string;
  passwordsDoNotMatch: string;
  securityTips: string;
  
  // Login
  signIn: string;
  emailAddress: string;
  password: string;
  welcomeBackLogin: string;
  signInToManage: string;
  enterEmail: string;
  enterPassword: string;
  signingIn: string;
  quickDemoAccess: string;
  secureAuth: string;
  advancedSecurity: string;
  
  // Common
  submit: string;
  cancel: string;
  save: string;
  update: string;
  add: string;
  loading: string;
  success: string;
  error: string;
  warning: string;
  active: string;
  inactive: string;
  configuration: string;
  total: string;
  displayed: string;
  
  // Toast Messages
  supplierAdded: string;
  supplierUpdated: string;
  supplierDeleted: string;
  emailUpdated: string;
  passwordUpdated: string;
  loginSuccessful: string;
  quickLoginSuccessful: string;
  themeChanged: string;
  layoutUpdated: string;
  autoRefreshEnabled: string;
  autoRefreshDisabled: string;
  refreshIntervalSet: string;
  languageChanged: string;
  
  // Form Validation
  fillAllFields: string;
  validEmail: string;
  incorrectPassword: string;
  passwordsNoMatch: string;
  weakPassword: string;
  samePassword: string;
  sameEmail: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    import: 'Import',
    suppliers: 'Suppliers',
    orders: 'Orders',
    archivedOrders: 'Archived Orders',
    tracking: 'Tracking',
    settings: 'Settings',
    logout: 'Logout',
    
    // Dashboard
    welcomeBack: 'Welcome Back!',
    supplierOverview: 'Dropshipping Overview',
    totalSuppliers: 'Total Suppliers',
    activeSuppliers: 'Active Suppliers',
    recentSuppliers: 'Recent Suppliers',
    quickActions: 'Quick Actions',
    addNewSupplier: 'Add New Supplier',
    viewAllSuppliers: 'View All Suppliers',
    exportData: 'Export Data',
    
    // Welcome Panel
    welcomeMessage: 'Here are today\'s updates and tasks.',
    todaysUpdates: 'Today\'s Updates',
    newSuppliersAdded: 'New suppliers added',
    pendingTasks: 'Pending tasks',
    systemStatus: 'All systems operational',
    lastLogin: 'Last login',
    currentTime: 'Current time',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon', 
    goodEvening: 'Good evening',
    tasksForToday: 'Tasks for today',
    reviewSuppliers: 'Review new suppliers',
    updateProfiles: 'Update supplier profiles',
    checkOrders: 'Check pending orders',
    
    // Suppliers
    manageSupplierNetwork: 'Manage your dropshipping supplier network',
    addSupplier: 'Add Supplier',
    supplierName: 'Supplier Name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    website: 'Website',
    status: 'Status',
    searchSuppliers: 'Search suppliers...',
    sortBy: 'Sort by',
    filterByCountry: 'Filter by country',
    filterByStatus: 'Filter by status',
    allSuppliers: 'All Suppliers',
    allStatuses: 'All Statuses',
    activeStatus: 'Active',
    inactiveStatus: 'Inactive',
    noSuppliersFound: 'No suppliers found',
    noSuppliersAvailable: 'No suppliers available',
    addFirstSupplier: 'Add your first dropshipping supplier using the form above or import from a file.',
    clearFilters: 'Clear filters and show all suppliers',
    edit: 'Edit',
    delete: 'Delete',
    todayAdded: 'Added Today',
    differentCountries: 'Different Countries',
    
    // Import
    importList: 'Import list',
    importListDescription: 'You can import and manage your suppliers\' products here before publishing them to your store',
    importProducts: 'Import Products',
    downloadTemplate: 'Download Template',
    importProductsHere: 'Import supplier products here and push to the store',
    wantMoreSales: 'Want to get more sales?',
    tryPageFly: 'Try PageFly to build high-converting product sales pages',
    learnMore: 'Learn More',
    importedProducts: 'Imported Products',
    publishedToStore: 'Published to Store',
    failed: 'Failed',
    itemsPerPage: 'Items per page:',
    page: 'page',
    sortByCost: 'Cost',
    importDone: 'Import done',
    importStatus: 'Import status:',
    filter: 'Filter',
    all: 'All',
    dragDropFiles: 'Drag and drop CSV or JSON files here or click to select files',
    supportedFormats: 'Supported formats: CSV, JSON',
    importing: 'Importing...',
    templateDownloaded: 'Template downloaded successfully!',
    productPublished: 'Product published to store!',
    productRemoved: 'Product removed from import list',
    invalidFileFormat: 'Please upload CSV or JSON files only',
    importSuccess: 'Successfully imported files!',
    importFailed: 'Failed to import files. Please check the format.',
    totalProducts: 'Total Products',
    publish: 'Publish',
    view: 'View',
    
    // Orders
    orderManagement: 'Dropshipping Order Management',
    addNewOrder: 'Add New Order',
    supplierNameCol: 'Supplier Name',
    product: 'Product',
    price: 'Price',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Archived Orders
    archivedOrdersTitle: 'Archived orders',
    archivedOrdersDescription: 'Orders that have not been processed for more than a year will automatically be placed in the Archived Orders menu. You can still un-archive orders to get them more appreciated, click here to learn more.',
    searchArchivedOrders: 'Search archived orders...',
    exportArchive: 'Export Archive',
    noArchivedOrders: 'No archived orders found',
    archivedOrdersEmpty: 'No archived orders available',
    searchOrder: 'Search Order',
    orderColumn: 'Order',
    dateColumn: 'Date',
    customerColumn: 'Customer',
    countryColumn: 'Country',
    emailColumn: 'Email',
    shippingConfirmation: 'Shipping Confirmation',
    incomeColumn: 'Income',
    costColumn: 'Cost',
    supplierOrderNo: 'Supplier Order No',
    actionsColumn: 'Actions',
    searchReasons: 'Your search may have no result for one of the following reasons:',
    reason1: 'If you archived the order on Shopify, please check the Archived menu in Orders to find the order',
    reason2: 'The information you entered is inaccurate',
    reason3: 'The search is not within the currently set date range',
    reason4: 'The search may include a Modern product',
    previous: 'Previous',
    next: 'Next',
    showing: 'Showing',
    of: 'of',
    perPage: 'page',
    
    // Tracking Status
    trackingStatus: 'Tracking status',
    trackingFeatureUpgrade: 'Tracking is a paid feature. Please upgrade your plan to activate it. Activate tracking to track the tracking status of orders that have been shipped',
    upgradeButton: 'UPGRADE',
    trackingTabs: {
      all: 'All',
      pending: 'Pending',
      inTransit: 'In transit',
      pickup: 'Pick up',
      delivered: 'Delivered',
      expired: 'Expired',
      attention: 'Attention'
    },
    trackingBenefits: {
      timelyAccess: 'Timely access to package status',
      reduceDelays: 'Reduce delivery delays',
      customerFeedback: 'Give feedback to customers in time'
    },
    noTrackingData: 'No tracking data available',
    noTrackingDescription: 'Upgrade your plan to start tracking your orders and get real-time updates on shipping status',
    upgradeNow: 'Upgrade Now',
    supportedProviders: 'Supported Shipping Providers',
    activateTracking: 'Activate Tracking Today',
    activateTrackingDescription: 'Get real-time updates for all your orders',
    upgradePlan: 'Upgrade Plan',
    
    // Settings
    customizePreferences: 'Customize your dropshipping platform preferences',
    general: 'General',
    appearance: 'Appearance',
    security: 'Security',
    language: 'Language',
    autoRefresh: 'Auto Refresh',
    enableAutoRefresh: 'Enable Auto Refresh',
    autoRefreshDescription: 'Automatically refresh supplier data at regular intervals',
    refreshInterval: 'Refresh Interval',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    brightClean: 'Bright and clean',
    easyOnEyes: 'Easy on the eyes',
    layout: 'Layout',
    gridColumns: 'Grid Columns',
    
    // Security
    securityOverview: 'Security Overview',
    currentEmail: 'Current Email',
    lastUpdated: 'Last Updated',
    changeEmail: 'Change Email Address',
    changePassword: 'Change Password',
    newEmail: 'New Email Address',
    confirmCurrentPassword: 'Confirm Current Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    passwordStrength: 'Password Strength',
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
    passwordsMatch: 'Passwords match',
    passwordsDoNotMatch: 'Passwords do not match',
    securityTips: 'Security Tips',
    
    // Login
    signIn: 'Sign In',
    emailAddress: 'Email Address',
    password: 'Password',
    welcomeBackLogin: 'Welcome back! Login successful',
    signInToManage: 'Sign in to manage your dropshipping network',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    signingIn: 'Signing In...',
    quickDemoAccess: 'Quick Demo Access',
    secureAuth: 'Secure dropshipping management system',
    advancedSecurity: 'Advanced security features available in Settings',
    
    // Common
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    update: 'Update',
    add: 'Add',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    active: 'Active',
    inactive: 'Inactive',
    configuration: 'Configuration',
    total: 'Total',
    displayed: 'displayed',
    
    // Toast Messages
    supplierAdded: 'has been added successfully!',
    supplierUpdated: 'has been updated successfully!',
    supplierDeleted: 'has been deleted successfully!',
    emailUpdated: 'Email updated successfully!',
    passwordUpdated: 'Password updated successfully!',
    loginSuccessful: 'Welcome to NEW IN DROPSHIPPING! Login successful',
    quickLoginSuccessful: 'Quick login successful!',
    themeChanged: 'Theme switched to',
    layoutUpdated: 'Grid layout updated to',
    autoRefreshEnabled: 'Auto-refresh enabled',
    autoRefreshDisabled: 'Auto-refresh disabled',
    refreshIntervalSet: 'Refresh interval set to',
    languageChanged: 'Language changed to',
    
    // Form Validation
    fillAllFields: 'Please fill in all fields',
    validEmail: 'Please enter a valid email address',
    incorrectPassword: 'Current password is incorrect',
    passwordsNoMatch: 'New passwords do not match',
    weakPassword: 'Password is too weak. Please choose a stronger password.',
    samePassword: 'New password must be different from current password',
    sameEmail: 'New email must be different from current email'
  },
  
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    import: 'الاستيراد',
    suppliers: 'الموردين',
    orders: 'الطلبات',
    archivedOrders: 'الطلبات المؤرشفة',
    tracking: 'التتبع',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Dashboard
    welcomeBack: 'مرحباً بك مرة أخرى!',
    supplierOverview: 'نظرة عامة على الدروبشيبينغ',
    totalSuppliers: 'إجمالي الموردين',
    activeSuppliers: 'الموردين النشطين',
    recentSuppliers: 'الموردين الجدد',
    quickActions: 'إجراءات سريعة',
    addNewSupplier: 'إضافة مورد جديد',
    viewAllSuppliers: 'عرض جميع الموردين',
    exportData: 'تصدير البيانات',
    
    // Welcome Panel
    welcomeMessage: 'إليك آخر التحديثات والمهام لهذا اليوم.',
    todaysUpdates: 'تحديثات اليوم',
    newSuppliersAdded: 'موردين جدد تم إضافتهم',
    pendingTasks: 'مهام معلقة',
    systemStatus: 'جميع الأنظمة تعمل بكفاءة',
    lastLogin: 'آخر تسجيل دخول',
    currentTime: 'الوقت الحالي',
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    tasksForToday: 'مهام اليوم',
    reviewSuppliers: 'مراجعة الموردين الجدد',
    updateProfiles: 'تحديث ملفات الموردين',
    checkOrders: 'فحص الطلبات المعلقة',
    
    // Suppliers
    manageSupplierNetwork: 'إدارة شبكة موردي الدروبشيبينغ الخاصة بك',
    addSupplier: 'إضافة مورد',
    supplierName: 'اسم المورد',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    country: 'البلد',
    website: 'الموقع الإلكتروني',
    status: 'الحالة',
    searchSuppliers: 'البحث في الموردين...',
    sortBy: 'ترتيب حسب',
    filterByCountry: 'تصفية حسب البلد',
    filterByStatus: 'تصفية حسب الحالة',
    allSuppliers: 'جميع الموردين',
    allStatuses: 'جميع الحالات',
    activeStatus: 'نشط',
    inactiveStatus: 'غير نشط',
    noSuppliersFound: 'لم يتم العثور على موردين',
    noSuppliersAvailable: 'لا توجد موردين متاحين',
    addFirstSupplier: 'أضف أول مورد دروبشيبينغ لك باستخدام النموذج أعلاه أو استورد من ملف.',
    clearFilters: 'مسح المرشحات وإظهار جميع الموردين',
    edit: 'تعديل',
    delete: 'حذف',
    todayAdded: 'أضيف اليوم',
    differentCountries: 'دول مختلفة',
    
    // Import
    importList: 'قائمة الاستيراد',
    importListDescription: 'يمكنك استيراد وإدارة منتجات الموردين هنا قبل نشرها في متجرك',
    importProducts: 'استيراد منتجات',
    downloadTemplate: 'تحميل نموذج',
    importProductsHere: 'استيراد منتجات الموردين هنا ونشرها في المتجر',
    wantMoreSales: 'تريد الحصول على مبيعات أكثر؟',
    tryPageFly: 'جرب PageFly لبناء صفحات مبيعات منتجات عالية التحويل',
    learnMore: 'تعرف أكثر',
    importedProducts: 'منتجات مستوردة',
    publishedToStore: 'منشور في المتجر',
    failed: 'فشل',
    itemsPerPage: 'عناصر لكل صفحة:',
    page: 'صفحة',
    sortByCost: 'التكلفة',
    importDone: 'استيراد مكتمل',
    importStatus: 'حالة الاستيراد:',
    filter: 'تصفية',
    all: 'الكل',
    dragDropFiles: 'اسحب وأفلت ملفات CSV أو JSON هنا أو انقر لتحديد الملفات',
    supportedFormats: 'الصيغ المدعومة: CSV، JSON',
    importing: 'جاري الاستيراد...',
    templateDownloaded: 'تم تحميل النموذج بنجاح!',
    productPublished: 'تم نشر المنتج في المتجر!',
    productRemoved: 'تم إزالة المنتج من قائمة الاستيراد',
    invalidFileFormat: 'يرجى رفع ملفات CSV أو JSON فقط',
    importSuccess: 'تم استيراد الملفات بنجاح!',
    importFailed: 'فشل في استيراد الملفات. يرجى التحقق من التنسيق.',
    totalProducts: 'إجمالي المنتجات',
    publish: 'نشر',
    view: 'عرض',
    
    // Orders
    orderManagement: 'إدارة طلبات الدروبشيبينغ',
    addNewOrder: 'إضافة طلب جديد',
    supplierNameCol: 'اسم المورد',
    product: 'المنتج',
    price: 'السعر',
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    
    // Archived Orders
    archivedOrdersTitle: 'الطلبات المؤرشفة',
    archivedOrdersDescription: 'الطلبات التي لم يتم معالجتها لأكثر من سنة يتم نقلها تلقائياً إلى الأرشيف. يمكنك الوصول إلى الطلبات المؤرشفة من هنا أو إلغاء أرشفتها لإعادتها إلى قائمة الطلبات النشطة.',
    searchArchivedOrders: 'البحث في الطلبات المؤرشفة...',
    exportArchive: 'تصدير الأرشيف',
    noArchivedOrders: 'لا توجد طلبات مؤرشفة',
    archivedOrdersEmpty: 'لا توجد طلبات مؤرشفة متاحة',
    searchOrder: 'بحث',
    orderColumn: 'الطلب',
    dateColumn: 'التاريخ',
    customerColumn: 'العميل',
    countryColumn: 'البلد',
    emailColumn: 'البريد الإلكتروني',
    shippingConfirmation: 'تأكيد الشحن',
    incomeColumn: 'الدخل',
    costColumn: 'التكلفة',
    supplierOrderNo: 'رقم طلب المورد',
    actionsColumn: 'الإجراءات',
    searchReasons: 'قد لا يكون لبحثك أي نتيجة لأحد الأسباب التالية:',
    reason1: 'إذا كنت تبحث عن طلب في Shopify، يرجى التحقق من قائمة الطلبات المؤرشفة في Orders للعثور على الطلب',
    reason2: 'المعلومات التي أدخلتها غير صحيحة',
    reason3: 'البحث غير متاح لتلك المنطقة، قم بتعديل النطاق',
    reason4: 'قد يتضمن البحث منتجاً متوقفاً',
    previous: 'السابق',
    next: 'التالي',
    showing: 'عرض',
    of: 'من',
    perPage: 'لكل صفحة',
    
    // Tracking Status
    trackingStatus: 'حالة التتبع',
    trackingFeatureUpgrade: 'التتبع هو ميزة مدفوعة. يرجى ترقية خطتك لتفعيلها. فعّل التتبع لتتبع حالة التتبع للطلبات التي تم شحنها',
    upgradeButton: 'ترقية',
    trackingTabs: {
      all: 'الكل',
      pending: 'في الانتظار',
      inTransit: 'في النقل',
      pickup: 'الاستلام',
      delivered: 'تم التسليم',
      expired: 'منتهي الصلاحية',
      attention: 'يحتاج انتباه'
    },
    trackingBenefits: {
      timelyAccess: 'الوصول المبكر لحالة الطرد',
      reduceDelays: 'تقليل تأخير التسليم',
      customerFeedback: 'إعطاء ملاحظات للعملاء في الوقت المناسب'
    },
    noTrackingData: 'لا توجد بيانات تتبع متاحة',
    noTrackingDescription: 'قم بترقية خطتك لبدء تتبع طلباتك والحصول على تحديثات فورية حول حالة الشحن',
    upgradeNow: 'ترقية الآن',
    supportedProviders: 'شركات الشحن المدعومة',
    activateTracking: 'فعّل التتبع اليوم',
    activateTrackingDescription: 'احصل على تحديثات فورية لجميع طلباتك',
    upgradePlan: 'ترقية الخطة',
    
    // Settings
    customizePreferences: 'تخصيص تفضيلات منصة الدروبشيبينغ الخاصة بك',
    general: 'عام',
    appearance: 'المظهر',
    security: 'الأمان',
    language: 'اللغة',
    autoRefresh: 'التحديث التلقائي',
    enableAutoRefresh: 'تمكين التحديث التلقائي',
    autoRefreshDescription: 'تحديث بيانات الموردين تلقائياً على فترات منتظمة',
    refreshInterval: 'فترة التحديث',
    theme: 'السمة',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    brightClean: 'مشرق ونظيف',
    easyOnEyes: 'مريح للعيون',
    layout: 'التخطيط',
    gridColumns: 'أعمدة الشبكة',
    
    // Security
    securityOverview: 'نظرة عامة على الأمان',
    currentEmail: 'البريد الإلكتروني الحالي',
    lastUpdated: 'آخر تحديث',
    changeEmail: 'تغيير عنوان البريد الإلكتروني',
    changePassword: 'تغيير كلمة المرور',
    newEmail: 'عنوان البريد الإلكتروني الجديد',
    confirmCurrentPassword: 'تأكيد كلمة المرور الحالية',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    passwordStrength: 'قوة كلمة المرور',
    weak: 'ضعيفة',
    fair: 'مقبولة',
    good: 'جيدة',
    strong: 'قوية',
    passwordsMatch: 'كلمات المرور متطابقة',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    securityTips: 'نصائح الأمان',
    
    // Login
    signIn: 'تسجيل الدخول',
    emailAddress: 'عنوان البريد الإلكتروني',
    password: 'كلمة المرور',
    welcomeBackLogin: 'مرحباً بك مرة أخرى! تم تسجيل الدخول بنجاح',
    signInToManage: 'سجل الدخول لإدارة شبكة الدروبشيبينغ الخاصة بك',
    enterEmail: 'أدخل بريدك الإلكتروني',
    enterPassword: 'أدخل كلمة المرور',
    signingIn: 'جاري تسجيل الدخول...',
    quickDemoAccess: 'وصول سريع للعرض التجريبي',
    secureAuth: 'نظام إدارة دروبشيبينغ آمن',
    advancedSecurity: 'ميزات أمان متقدمة متاحة في الإعدادات',
    
    // Common
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    update: 'تحديث',
    add: 'إضافة',
    loading: 'جاري التحميل...',
    success: 'نجح',
    error: 'خطأ',
    warning: 'تحذير',
    active: 'نشط',
    inactive: 'غير نشط',
    configuration: 'التكوين',
    total: 'المجموع',
    displayed: 'معروض',
    
    // Toast Messages
    supplierAdded: 'تم إضافته بنجاح!',
    supplierUpdated: 'تم تحديثه بنجاح!',
    supplierDeleted: 'تم حذفه بنجاح!',
    emailUpdated: 'تم تحديث البريد الإلكتروني بنجاح!',
    passwordUpdated: 'تم تحديث كلمة المرور بنجاح!',
    loginSuccessful: 'مرحباً بك في منصة NEW IN DROPSHIPPING! تم تسجيل الدخول بنجاح',
    quickLoginSuccessful: 'تم تسجيل الدخول السريع بنجاح!',
    themeChanged: 'تم تغيير السمة إلى',
    layoutUpdated: 'تم تحديث تخطيط الشبكة إلى',
    autoRefreshEnabled: 'تم تمكين التحديث التلقائي',
    autoRefreshDisabled: 'تم تعطيل التحديث التلقائي',
    refreshIntervalSet: 'تم تعيين فترة التحديث إلى',
    languageChanged: 'تم تغيير اللغة إلى',
    
    // Form Validation
    fillAllFields: 'يرجى ملء جميع الحقول',
    validEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    incorrectPassword: 'كلمة المرور الحالية غير صحيحة',
    passwordsNoMatch: 'كلمات المرور الجديدة غير متطابقة',
    weakPassword: 'كلمة المرور ضعيفة جداً. يرجى اختيار كلمة مرور أقوى.',
    samePassword: 'كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية',
    sameEmail: 'البريد الإلكتروني الجديد يجب أن يكون مختلفاً عن الحالي'
  }
};

export const getTranslation = (key: keyof Translation, language: Language): string => {
  return translations[language][key] || translations['en'][key];
};

export const getDirection = (language: Language): 'ltr' | 'rtl' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

export const getLanguageName = (language: Language, currentLanguage: Language): string => {
  const names = {
    en: { en: 'English', ar: 'الإنجليزية' },
    ar: { en: 'العربية', ar: 'العربية' }
  };
  return names[language][currentLanguage];
};