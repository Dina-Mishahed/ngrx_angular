# ⚡ Angular + NgRx Store Demo Application (`ngrx_angular`)

تطبيق متكامل وتفاعلي لبناء وفهم **NgRx State Management** بأسلوب عملي محترف باستخدام **Angular Standalone Components**, **NgRx Signals**, **Actions**, **Reducers**, **Effects**, و **Selectors**.

---

## 🌟 المميزات (Features)

- 🛒 **إدارة سلة التسوق (Shopping Cart Store)**: إضافة، تعديل الكميات، وحذف العناصر مع حساب الإجمالي لحظياً.
- 🔍 **البحث والتصفية (Search & Filtering)**: تصفية المنتجات حسب الفئة مع البحث في الاسم والوصف.
- ⚡ **Live Action Inspector**: شاشة تفاعلية مدمجة تُظهر تدفق الـ Actions التي تمر على الـ Store في الوقت الفعلي.
- 🌐 **NgRx Effects Simulation**: محاكاة طلبات الـ HTTP API مع التأخير الشبكي والتعامل مع حالات النجاح والفشل.
- 🎨 **تصميم زجاجي عصري (Modern Dark Glassmorphism)**: واجهة مستخدم سريعة وسلسة ومتجاوبة.

---

## 🏗️ البنية المعمارية لـ NgRx (Architecture)

- **`Actions`**: [products.actions.ts](src/app/state/products.actions.ts) - تعريف الأحداث باستخدام `createActionGroup`.
- **`Reducer`**: [products.reducer.ts](src/app/state/products.reducer.ts) - التعامل مع تغيرات الـ State بدوال نقية (Pure Functions).
- **`Effects`**: [products.effects.ts](src/app/state/products.effects.ts) - جلب البيانات والتعامل مع الـ Async Operations.
- **`Selectors`**: [products.selectors.ts](src/app/state/products.selectors.ts) - قراءة واستقطاع الحالات واستخدام `store.selectSignal`.

---

## 🚀 تشغيل المشروع محلياً (Run Locally)

1. **تثبيت الحزم (Install Dependencies)**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **تشغيل سيرفر التطوير (Start Dev Server)**:
   ```bash
   ng serve
   # أو
   npm start
   ```

3. افتح المتصفح على: `http://localhost:4200`
