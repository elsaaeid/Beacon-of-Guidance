# منارة الهداية — واجهة العميل (Next.js)

هذا المستودع يحوي واجهة المستخدم لموقع "منارة الهداية" مبنية بـ Next.js (App Router) وTypeScript.

## ملخص سريع
- Framework: Next.js (App Router)
- Language: TypeScript + React
- Icons: react-icons
- Styling: CSS Modules + globals.css
- App entry: `client/app/`

> ملاحظة: المشروع الذي تعمل عليه موجود داخل المجلد `client/` في هذا الريبو.

## تشغيل المشروع محلياً (PowerShell)
```powershell
cd e:\masget\client
npm install
npm run dev
# افتح http://localhost:3000
```

## أوامر مفيدة
- بناء الإنتاج: `npm run build`
- تشغيل نسخة الإنتاج محليًا: `npm start`
- فحص TypeScript: `npx tsc --noEmit -p .`
- فحص ESLint: `npm run lint`

## بنية المجلدات المهمة
- `client/app/` — صفحات App Router
- `client/components/` — مكونات قابلة لإعادة الاستخدام
- `client/public/assets/images/` — صور وأصول
- `client/styles/` — ملفات CSS Modules

## صفحات ومكونات بارزة
- `app/register/page.tsx` — صفحة نموذج التسجيل
- `app/courses/` — صفحات تفاصيل الدورات (`course1`, `course2`, `course3`, `shariah-studies`)
- `components/Navbar.tsx` — navbar مع دعم الهاتف والرابط النشط
- `components/Footer.tsx` — تذييل الموقع مع روابط الدورات والتواصل
- `components/ScrollToTop.tsx` — زر العودة للأعلى
- `components/StudentTestimonials.tsx` — آراء الطلاب (يستخدم react-icons)

## النشر إلى Vercel
1. ادفع التغييرات إلى GitHub.
2. في Vercel Dashboard اختر Import Project.
3. اضبط Root Directory إلى `client` (مهم إن كان الريبو يحوي أكثر من مشروع).
4. تأكد من إعداد المتغيّرات البيئية في Settings إن لزم.

أو باستخدام CLI (من داخل `client`):
```powershell
npm i -g vercel
cd e:\masget\client
vercel --prod --confirm
```

## نصائح وحلول لمشاكل شائعة
- ENOSPC / EPERM: تحقق من مساحة القرص وأذونات المجلدات، واحذف `node_modules` ثم `npm install` إن لزم.
- dev server locked: اغلق أي عملية Node التي تشغل المنفذ 3000 أو احذف `.next/dev/lock` ثم شغّل `npm run dev`.
- صور خارجية مع `next/image`: أضف `remotePatterns` في `next.config.js` أو ضع الصور في `public/assets/images`.

## كيف تساهم
1. ابدأ فرعًا جديدًا للميزة/التصحيح.
2. شغّل الاختبارات/الفحوص (TypeScript / lint) محليًا.
3. افتح Pull Request إلى `main` مع وصف التغييرات.