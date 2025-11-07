import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 rtl" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-semibold text-green-800 mb-4">سياسة الخصوصية</h1>

        <p className="text-gray-700 mb-4">
          مرحبًا بكم في موقع "منارة الهدى". نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية
          المعلومات التي تقدمها عند استخدام موقعنا وخدماتنا.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">المعلومات التي نجمعها</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>المعلومات التي تقدمها طوعًا عند التسجيل أو إرسال نموذج الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف، الدورة المختارة).</li>
          <li>المعلومات الفنية التي يتم جمعها تلقائيًا (مثل بيانات التصفح وعنوان IP وملفات تعريف الارتباط) لتحسين تجربة المستخدم.</li>
        </ul>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">كيفية استخدامنا للمعلومات</h2>
        <p className="text-gray-700 mb-4">
          نستخدم المعلومات التي نجمعها لتقديم الخدمات، التواصل معكم بشأن التسجيلات والدورات، وتحسين محتوى وتجربة الموقع. لم نشارك معلوماتك
          مع أطراف ثالثة لأغراض تسويق دون موافقتك المسبقة.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">الحماية والأمان</h2>
        <p className="text-gray-700 mb-4">
          نتخذ تدابير تقنية وإدارية مناسبة لحماية معلوماتك من الوصول أو الاستخدام أو الإفشاء غير المصرح به، لكن لا يوجد نظام نقل أو تخزين
          آمن تمامًا على الإنترنت، ولا يمكننا ضمان أمان مطلق.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">الاحتفاظ بالمعلومات</h2>
        <p className="text-gray-700 mb-4">
          نحتفظ بالمعلومات الشخصية طالما كان ذلك ضروريًا لتقديم الخدمات أو للامتثال للالتزامات القانونية. يمكنك طلب حذف بياناتك في أي وقت
          عن طريق التواصل معنا.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">حقوقك</h2>
        <p className="text-gray-700 mb-4">
          يحق لك الوصول إلى بياناتك الشخصية وتصحيحها أو طلب حذفها. كما يحق لك الاعتراض على بعض أنواع المعالجة والطلب بتقييدها.
        </p>

        <h2 className="text-xl font-medium text-green-800 mt-6 mb-2">اتصل بنا</h2>
        <p className="text-gray-700 mb-6">
          إذا كانت لديك أي أسئلة أو طلبات تتعلق بسياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني:
          <br /> <a className="text-green-800 underline" href="mailto:msd826318@gmail.com">msd826318@gmail.com</a>
        </p>

        <div className="flex justify-between items-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-green-800">العودة إلى الصفحة الرئيسية</Link>
          <Link href="/register" className="bg-green-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-900">سجل الآن</Link>
        </div>
      </div>
    </main>
  );
}
