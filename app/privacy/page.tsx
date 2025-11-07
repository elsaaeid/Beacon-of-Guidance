import React from 'react';
import Link from 'next/link';
import styles from '../../styles/PrivacyPage.module.css';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 rtl" dir="rtl">
      <div className={`${styles.container} max-w-3xl mx-auto p-8` }>
        <h1 className={`${styles.title} text-3xl`}>سياسة الخصوصية</h1>

        <p className={`${styles.text} mb-4`}>
          مرحبًا بكم في موقع "منارة الهدى". نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية
          المعلومات التي تقدمها عند استخدام موقعنا وخدماتنا.
        </p>

        <h2 className={`${styles.sectionTitle}`}>المعلومات التي نجمعها</h2>
        <ul className={`${styles.list} list-disc list-inside mb-4`}>
          <li>المعلومات التي تقدمها طوعًا عند التسجيل أو إرسال نموذج الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف، الدورة المختارة).</li>
          <li>المعلومات الفنية التي يتم جمعها تلقائيًا (مثل بيانات التصفح وعنوان IP وملفات تعريف الارتباط) لتحسين تجربة المستخدم.</li>
        </ul>

        <h2 className={`${styles.sectionTitle}`}>كيفية استخدامنا للمعلومات</h2>
        <p className={`${styles.text} mb-4`}>
          نستخدم المعلومات التي نجمعها لتقديم الخدمات، التواصل معكم بشأن التسجيلات والدورات، وتحسين محتوى وتجربة الموقع. لم نشارك معلوماتك
          مع أطراف ثالثة لأغراض تسويق دون موافقتك المسبقة.
        </p>

        <h2 className={`${styles.sectionTitle}`}>الحماية والأمان</h2>
        <p className={`${styles.text} mb-4`}>
          نتخذ تدابير تقنية وإدارية مناسبة لحماية معلوماتك من الوصول أو الاستخدام أو الإفشاء غير المصرح به، لكن لا يوجد نظام نقل أو تخزين
          آمن تمامًا على الإنترنت، ولا يمكننا ضمان أمان مطلق.
        </p>

        <h2 className={`${styles.sectionTitle}`}>الاحتفاظ بالمعلومات</h2>
        <p className={`${styles.text} mb-4`}>
          نحتفظ بالمعلومات الشخصية طالما كان ذلك ضروريًا لتقديم الخدمات أو للامتثال للالتزامات القانونية. يمكنك طلب حذف بياناتك في أي وقت
          عن طريق التواصل معنا.
        </p>

        <h2 className={`${styles.sectionTitle}`}>حقوقك</h2>
        <p className={`${styles.text} mb-4`}>
          يحق لك الوصول إلى بياناتك الشخصية وتصحيحها أو طلب حذفها. كما يحق لك الاعتراض على بعض أنواع المعالجة والطلب بتقييدها.
        </p>

        <h2 className={`${styles.sectionTitle}`}>اتصل بنا</h2>
        <p className={`${styles.text} mb-6`}>
          إذا كانت لديك أي أسئلة أو طلبات تتعلق بسياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني:
          <br /> <a className={`${styles.link}`} href="mailto:msd826318@gmail.com">msd826318@gmail.com</a>
        </p>

        <div className={`${styles.actions}`}>
          <Link href="/" className={`${styles.link} text-sm`}>العودة إلى الصفحة الرئيسية</Link>
          <Link href="/register" className={`${styles.cta}`}>سجل الآن</Link>
        </div>
      </div>
    </main>
  );
}
