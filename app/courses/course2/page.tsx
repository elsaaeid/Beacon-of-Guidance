import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'الإجازة في القرآن الكريم - الدورة',
  description: 'دورة الإجازة في القرآن الكريم مع سند متصل؛ تدريب وتوثيق على يد كبار المشايخ.',
};

export default function Course2Page() {
  return (
    <main style={{ direction: 'rtl', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '32px 16px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ color: '#216254', fontSize: 30, margin: 0 }}>الإجازة في القرآن الكريم</h1>
          <p style={{ color: '#666', marginTop: 8 }}>احصل على إجازة متصلة بالسند النبوي الشريف من خلال برنامجنا المعتمد.</p>
        </header>

        <div className='flex flex-wrap justify-evenly items-center' style={{ gap: 24, }}>
            <Image
              src="/assets/images/course2.png"
              alt="الإجازة في القرآن الكريم"
              width={200}
              height={200}
              style={{ borderRadius: 8, marginBottom: 18 }}
            />

           <aside style={{ background: '#f6f9f7', padding: 18, borderRadius: 8 }}>
            <h4 style={{ marginTop: 0, color: '#143c33' }}>معلومات سريعة</h4>
            <p style={{ margin: 0 }}>المعلمون: نخبة من كبار المشايخ</p>
            <p>الحصص: ثلاث حصص أسبوعياً (60 دقيقة)</p>
            <p>السعر: تواصل معنا للحصول على الأسعار والخطط</p>
            <div style={{ marginTop: 16 }}>
              <Link href="/register">
                <button className='button'>
                  سجل الآن
                </button>
              </Link>
            </div>
            </aside>

        </div>
        <h2 style={{ color: '#143c33' }}>وصف الدورة</h2>
        <p style={{ color: '#444', lineHeight: 1.7 }}>
          برنامج متدرج يهدف إلى تحقيق الإجازة في القرآن الكريم بالسند المتصل، مع شرح علمي للآيات، ربط
          القرآن بالقراءات المشهورة، وممارسة متواصلة تحت إشراف مشايخ معتمدين.
        </p>
        <section style={{ marginTop: 20 }}>
          <h3 style={{ color: '#216254' }}>مخرجات التعلم</h3>
          <ul>
            <li>إتقان التجويد والقراءة الصحيحة حسب روايات متعددة.</li>
            <li>الحصول على إجازة موثقة بالسند المتصل.</li>
            <li>قدرة على الإقراء والإجازة للطلاب الآخرين.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
