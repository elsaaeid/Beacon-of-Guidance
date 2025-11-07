import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.css';

export const metadata = {
  title: 'دراسة العلوم الشرعية - الدورة',
  description: 'دورة شاملة في العلوم الشرعية تشمل الفقه، التفسير، الحديث، والعقيدة مع مدرسين مؤهلين.',
};

export default function ShariahStudiesPage() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>دراسة العلوم الشرعية</h1>
          <p className={styles.lead}>دورة شاملة لدراسة الفقه، التفسير، الحديث وغيرها من العلوم الشرعية على يد معلمين مؤهلين.</p>
        </header>

        <div className={styles.grid}>
          <section>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/images/shariah-studies.png"
                alt="دراسة العلوم الشرعية"
                width={200}
                height={200}
                className={styles.image}
              />
            </div>

            <h2 className={styles.sectionTitle}>وصف الدورة</h2>
            <p className={styles.paragraph}>
              برنامج متدرج يهدف إلى تأصيل الطالب في العلوم الشرعية الأساسية مع ممارسات عملية
              ومتابعة مستمرة من قبل مدرسين مختصين. المنهج مناسب للمبتدئين والراغبين
              في التوسع والتخصص.
            </p>

            <section style={{ marginTop: 20 }}>
              <h3 style={{ color: '#216254' }}>مخرجات التعلم</h3>
              <ul>
                <li>إتقان فهم أساسيات الفقه والتفسير والحديث.</li>
                <li>القدرة على قراءة وتصحيح النصوص الشرعية وفهم سياقاتها.</li>
                <li>التدرج نحو التخصص تحت إشراف معلمين معتمدين.</li>
              </ul>
            </section>
          </section>

          <aside className={styles.aside}>
            <h4 className={styles.asideTitle}>معلومات سريعة</h4>
            <p className={styles.small}>المدة: 12 أسبوعاً</p>
            <p className={styles.small}>الحصص: ثلاث حصص أسبوعياً (60 دقيقة)</p>
            <p className={styles.small}>الشهادة: متاحة عند الإكمال</p>
            <p className={styles.small}>المدرسون: نخبة من المعلمين المتخصصين</p>

            <div style={{ marginTop: 16 }}>
              <Link href="/register">
                <button className={styles.button}>سجل الآن</button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
