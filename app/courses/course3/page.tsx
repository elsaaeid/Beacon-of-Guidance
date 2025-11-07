import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'تحفيظ القرآن الكريم - الدورة',
  description: 'برنامج تحفيظ القرآن الكريم مع متابعة شخصية وخطط تناسب الأطفال والبالغين.',
};

export default function Course3Page() {
  return (
    <main style={{ direction: 'rtl', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '32px 16px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ color: '#216254', fontSize: 30, margin: 0 }}>تحفيظ القرآن الكريم</h1>
          <p style={{ color: '#666', marginTop: 8 }}>دورة متكاملة لتحفيظ القرآن الكريم لجميع الفئات مع متابعة دورية.</p>
        </header>

        <div className='flex flex-wrap justify-evenly items-center' style={{ gap: 24, }}>
            <Image
              src="/assets/images/course3.png"
              alt="تحفيظ القرآن الكريم"
              width={200}
              height={200}
              style={{ borderRadius: 8, marginBottom: 18 }}
            />


          <aside style={{ background: '#f6f9f7', padding: 18, borderRadius: 8 }}>
            <h4 style={{ marginTop: 0, color: '#143c33' }}>معلومات سريعة</h4>
            <p style={{ margin: 0 }}>الفئات: أطفال، شباب، بالغين</p>
            <p>الحصص: حصتان أو ثلاث حسب الخطة</p>
            <p>السعر: خطط متعددة حسب عدد الحصص</p>
            <div style={{ marginTop: 16 }}>
              <Link className='button' href="/register">
                سجل الآن
              </Link>
            </div>
          </aside>
        </div>
        
        <h2 style={{ color: '#143c33' }}>وصف الدورة</h2>
        <p style={{ color: '#444', lineHeight: 1.7 }}>
          تهدف الدورة إلى تحفيظ المصحف كاملاً بتقسيمات مناسبة، متابعة دورية، واختبارات دورية لضمان
          الثبات والحفظ الصحيح مع التركيز على قواعد التجويد والمراجعة.
        </p>

        <section style={{ marginTop: 20 }}>
          <h3 style={{ color: '#216254' }}>مخرجات التعلم</h3>
          <ul>
            <li>حفظ أجزاء/المصحف حسب الخطة المتفق عليها.</li>
            <li>ثبات الحفظ وتحسين المخارج واللحن.</li>
            <li>القدرة على التلاوة أمام المدرس والحصول على تقارير متابعة.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
