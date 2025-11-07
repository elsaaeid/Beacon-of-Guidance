import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'أحكام التجويد والتلاوة - الدورة',
  description: 'دورة أحكام التجويد والتلاوة — من البداية حتى الإتقان على يد معلمين مجازين.',
};

export default function Course1Page() {
  return (
    <main style={{ direction: 'rtl', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ color: '#216254', fontSize: 28, marginBottom: 12 }}>أحكام التجويد والتلاوة</h1>
        <p style={{ color: '#444', marginBottom: 20 }}>
          دورة متكاملة لتعليم أحكام التجويد والتلاوة من البداية وحتى الإتقان على يد معلمين ومعلمات
          مجازين في كتب التجويد. مناسبة لجميع المستويات مع متابعة فردية.
        </p>

        <div className='flex flex-wrap justify-evenly items-center' style={{ gap: 24, }}>
          <div>
            <Image
              src="/assets/images/course1.png"
              alt="أحكام التجويد والتلاوة"
              width={200}
              height={200}
              style={{ borderRadius: 8 }}
            />
          </div>

          <aside>
            <div style={{ background: '#f6f9f7', padding: 20, borderRadius: 8 }}>
              <h2 style={{ marginTop: 0, color: '#143c33' }}>معلومات الدورة</h2>
              <ul>
                <li>المستوى: جميع المستويات</li>
                <li>المدة: غير محددة (تابع حسب الخطة)</li>
                <li>المدرسون: معلمون مجازون</li>
                <li>الحصص: حصتان أسبوعياً (45 دقيقة)</li>
              </ul>

              <div style={{ marginTop: 20 }}>
                <Link href="/register" style={{ textDecoration: 'none' }}>
                  <button className='button'>
                    سجل الآن
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section style={{ marginTop: 30 }}>
          <h3 style={{ color: '#216254' }}>منهج ومحتوى الدورة</h3>
          <p style={{ color: '#444', lineHeight: 1.6 }}>
            تغطي الدورة: أحكام النون الساكنة والتنوين، الإدغام، الإظهار، الإقلاب، المدود، التفخيم والترقيق،
            قراءة نموذجية للقرآن، وتصحيح مخارج الحروف، مع تدريبات عملية ومتابعة مستمرة.
          </p>
        </section>
      </div>
    </main>
  );
}
