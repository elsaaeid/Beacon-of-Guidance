import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 rtl" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-semibold text-green-800 mb-4">الشروط والأحكام</h1>

        <p className="text-gray-700 mb-4">
          يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام موقع منارة الهدى. باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">1. مقدمة</h2>
        <p className="text-gray-700 mb-4">
          تم تصميم هذا الموقع لتقديم دورات تعليمية في القرآن الكريم والعلوم الشرعية. تخضع جميع الخدمات المقدمة لهذه الشروط.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">2. التسجيل والدفع</h2>
        <p className="text-gray-700 mb-4">
          قد تتطلب بعض الدورات التسجيل المسبق أو الدفع. عند التسجيل، تضمن صحة البيانات المقدمة، وتوافق على سياسات الدفع والاسترداد المعمول بها.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">3. السلوك والمحتوى</h2>
        <p className="text-gray-700 mb-4">
          يمنع نشر أي محتوى يخالف القوانين أو يعارض الآداب العامة أو حقوق الطبع والنشر. نحتفظ بالحق في إزالة أي محتوى أو حظر أي مستخدم ينتهك هذه الشروط.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">4. حدود المسؤولية</h2>
        <p className="text-gray-700 mb-4">
          نبذل جهودًا لتقديم معلومات دقيقة ومحدثة، لكن لا نقدم أي ضمانات صريحة أو ضمنية بشأن دقة أو اكتمال المحتوى. نحن غير مسؤولين عن أي أضرار ناتجة عن استخدام الموقع.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">5. التعديلات</h2>
        <p className="text-gray-700 mb-4">
          نحتفظ بالحق في تعديل هذه الشروط أو تحديث الخدمات في أي وقت. ستصبح التعديلات سارية فور نشرها على الموقع.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">6. القانون الواجب التطبيق</h2>
        <p className="text-gray-700 mb-6">
          تخضع هذه الشروط لأحكام القوانين المعمول بها في البلد الذي يدير الموقع، وأي نزاع يتم حله أمام المحاكم المختصة.
        </p>

        <div className="flex justify-between items-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-green-800">العودة إلى الصفحة الرئيسية</Link>
          <Link href="/register" className="bg-green-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-900">سجل الآن</Link>
        </div>
      </div>
    </main>
  );
}
