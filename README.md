# 🛍️ NEW IN DROPSHIPPING - Dashboard

<div align="center">

![NEW IN DROPSHIPPING](https://img.shields.io/badge/NEW%20IN-DROPSHIPPING-orange?style=for-the-badge&logo=shopify)

**لوحة تحكم احترافية شاملة لإدارة الدروبشيبنغ مع تكاملات AliExpress و Shopify**

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)](https://vitejs.dev/)

[العرض المباشر](https://boss23221.github.io/new-dropshipping-dashboard) • [الوثائق](https://github.com/boss23221/new-dropshipping-dashboard/wiki) • [الإبلاغ عن خطأ](https://github.com/boss23221/new-dropshipping-dashboard/issues)

</div>

## ✨ **المميزات الرئيسية**

### 🔌 **التكاملات المتقدمة**
- **AliExpress API**: استيراد المنتجات وتنفيذ الطلبات تلقائياً
- **Shopify Integration**: مزامنة المنتجات والطلبات مع متجرك
- **مزامنة المخزون**: تحديث الكميات في الوقت الفعلي

### 🎯 **إدارة شاملة**
- **لوحة تحكم ذكية**: إحصائيات شاملة ورسوم بيانية تفاعلية
- **إدارة الموردين**: قاعدة بيانات شاملة للموردين مع معلومات الاتصال
- **تتبع الطلبات**: نظام متقدم لتتبع حالة الطلبات والشحنات
- **أرشفة ذكية**: تنظيم الطلبات المكتملة والملغاة

### 🌐 **تجربة مستخدم متميزة**
- **دعم متعدد اللغات**: العربية والإنجليزية مع RTL support
- **تصميم متجاوب**: يعمل بسلاسة على جميع الأجهزة
- **ثيمات متعددة**: الوضع الفاتح والداكن
- **واجهة سهلة**: تصميم بديهي وسهل الاستخدام

## 🚀 **البدء السريع**

### المتطلبات الأساسية
- Node.js 18.0.0 أو أحدث
- npm أو yarn أو pnpm

### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/boss23221/new-dropshipping-dashboard.git

# الانتقال للمجلد
cd new-dropshipping-dashboard

# تثبيت المكتبات
npm install
# أو
yarn install
# أو
pnpm install

# تشغيل خادم التطوير
npm run dev
# أو
yarn dev
# أو
pnpm dev
```

### إعداد التكاملات

#### AliExpress
1. اذهب إلى [AliExpress Developer Center](https://developers.aliexpress.com/)
2. أنشئ تطبيق جديد واحصل على:
   - API Key
   - App Key  
   - Secret Key
   - Access Token
3. أدخل المفاتيح في الإعدادات → التكاملات → AliExpress

#### Shopify
1. اذهب إلى إعدادات متجر Shopify → Apps and sales channels
2. أنشئ Private App أو استخدم Shopify API
3. احصل على:
   - Shop URL (yourstore.myshopify.com)
   - Access Token
   - API Key
   - API Secret
4. أدخل البيانات في الإعدادات → التكاملات → Shopify

## 📱 **لقطات الشاشة**

<div align="center">

### لوحة التحكم الرئيسية
![Dashboard](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dashboard+Preview)

### صفحة إدارة المنتجات
![Products](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Products+Management)

### تكاملات AliExpress & Shopify
![Integrations](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Integrations+Setup)

</div>

## 🛠️ **التقنيات المستخدمة**

### Frontend Framework
- **React 18.2** - مكتبة JavaScript لبناء واجهات المستخدم
- **TypeScript 5.0** - لكتابة كود آمن ومنظم
- **Vite 5.0** - أداة بناء سريعة وحديثة

### UI/UX
- **Tailwind CSS 4.0** - framework CSS للتصميم السريع
- **Radix UI** - مكونات UI accessible وعالية الجودة
- **Lucide React** - مكتبة أيقونات حديثة
- **Framer Motion** - انتقالات وحركات سلسة

### المكتبات المساعدة
- **React Hook Form** - إدارة النماذج
- **Recharts** - رسوم بيانية تفاعلية  
- **Sonner** - إشعارات جميلة
- **Date-fns** - معالجة التواريخ

## 📂 **بنية المشروع**

```
new-dropshipping-dashboard/
├── src/
│   ├── components/           # المكونات القابلة لإعادة الاستخدام
│   │   ├── ui/              # مكونات UI الأساسية
│   │   ├── pages/           # صفحات التطبيق
│   │   ├── i18n/            # ملفات الترجمة
│   │   └── figma/           # مكونات خاصة بـ Figma
│   ├── styles/              # ملفات التصميم
│   ├── types/               # تعريفات TypeScript
│   ├── utils/               # الوظائف المساعدة
│   └── App.tsx              # المكون الرئيسي
├── public/                  # الملفات العامة
├── package.json             # إعدادات المشروع
└── vite.config.ts          # إعدادات Vite
```

## 🔧 **الأوامر المتاحة**

```bash
# تشغيل خادم التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة البناء
npm run preview

# فحص الكود
npm run lint

# إصلاح مشاكل الكود
npm run lint:fix

# فحص TypeScript
npm run type-check
```

## 🌐 **النشر والاستضافة**

### Vercel (مستحسن)
```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

### Netlify
```bash
# بناء المشروع
npm run build

# رفع مجلد dist إلى Netlify
```

### GitHub Pages
```bash
# تثبيت gh-pages
npm install --save-dev gh-pages

# إضافة script في package.json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# النشر
npm run deploy
```

## 🤝 **المساهمة**

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

### خطوات المساهمة
1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📊 **معلومات المشروع**

![GitHub Stars](https://img.shields.io/github/stars/boss23221/new-dropshipping-dashboard?style=social)
![GitHub Forks](https://img.shields.io/github/forks/boss23221/new-dropshipping-dashboard?style=social)
![GitHub Issues](https://img.shields.io/github/issues/boss23221/new-dropshipping-dashboard)
![GitHub License](https://img.shields.io/github/license/boss23221/new-dropshipping-dashboard)
![GitHub Release](https://img.shields.io/github/v/release/boss23221/new-dropshipping-dashboard)

## 📄 **الترخيص**
📊 **معلومات المشروع**

![GitHub Stars](https://img.shields.io/github/stars/boss23221/new-dropshipping-dashboard?style=social)
![GitHub Forks](https://img.shields.io/github/forks/boss23221/new-dropshipping-dashboard?style=social)
![GitHub Issues](https://img.shields.io/github/issues/boss23221/new-dropshipping-dashboard)
![GitHub License](https://img.shields.io/github/license/boss23221/new-dropshipping-dashboard)
![GitHub Release](https://img.shields.io/github/v/release/boss23221/new-dropshipping-dashboard)

## 📄 **الترخيص**

هذا المشروع مرخص تحت [MIT License](LICENSE) - راجع ملف LICENSE للتفاصيل.

## 🙏 **شكر وتقدير**

- [Radix UI](https://radix-ui.com/) - مكونات UI رائعة
- [Tailwind CSS](https://tailwindcss.com/) - framework CSS مذهل
- [Lucide](https://lucide.dev/) - أيقونات جميلة
- [Unsplash](https://unsplash.com/) - صور عالية الجودة

## 📞 **التواصل والدعم**

- **GitHub**: [boss23221](https://github.com/boss23221)
- **Issues**: [الإبلاغ عن المشاكل](https://github.com/boss23221/new-dropshipping-dashboard/issues)
- **Discussions**: [المناقشات](https://github.com/boss23221/new-dropshipping-dashboard/discussions)

## 🎯 **خريطة الطريق**

- [ ] إضافة تكامل مع Amazon
- [ ] تطبيق موبايل (React Native)
- [ ] API Backend منفصل
- [ ] نظام تقارير متقدم
- [ ] دعم للعملات المتعددة
- [ ] تحليلات متقدمة مع AI

---

<div align="center">

**صُنع بـ ❤️ من boss23221**

إذا أعجبك المشروع، لا تنس إعطاؤه ⭐!

</div>