// components/CoursesSection.tsx

import React from "react";
import styles from '../styles/CoursesSection.module.css'; // Import the CSS module
import Image from "next/image";
import Link from "next/link";

const CoursesSection: React.FC = () => {

  return (
    <section id="courses" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>دوراتنا التعليمية</h2>
        <p className={styles.subtitle}>
          نقدم مجموعة متنوعة من الدورات التعليمية المتخصصة في القرآن الكريم والعلوم الشرعية
        </p>

        <div className={styles.cardsWrapper}>
          {/* Card 1 */}
          <div className={styles.card}>
            <img
              src="/assets/images/course1.png"
              width={500}
              height={300}
              alt="أحكام التجويد والتلاوة"
              className={styles.image}
            />
            <h3 className={styles.cardTitle}>أحكام التجويد والتلاوة</h3>
            <p className={styles.cardText}>
              تعليم أحكام التجويد والتلاوة من البداية وحتى الإتقان على يد معلمين ومعلمات مجازين في كتب التجويد.
            </p>
            <Link href="/courses/course1" className="button">التفاصيل والتسجيل</Link>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <img
              src={`/assets/images/course2.png`}
              width={500}
              height={300}
              alt="الإجازة في القرآن الكريم"
              className={styles.image}
            />
            <h3 className={styles.cardTitle}>الإجازة في القرآن الكريم</h3>
            <p className={styles.cardText}>
              الحصول على إجازة في القرآن الكريم بالسند المتصل إلى رسول الله صلى الله عليه وسلم، بأعلى سند في العالم على يد كبار المشايخ.
            </p>
            <Link href="/courses/course2" className="button">التفاصيل والتسجيل</Link>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <Image
              // course3.png was missing; fall back to course1.png (replace with a proper image as needed)
              src="/assets/images/course3.png"
              width={500}
              height={300}
              alt="تحفيظ القرآن الكريم"
              className={styles.image}
            />
            <h3 className={styles.cardTitle}>تحفيظ القرآن الكريم</h3>
            <p className={styles.cardText}>
              دورة متكاملة لتحفيظ القرآن الكريم للرجال والنساء والأطفال على يد معلمين ومعلمات معتمدين من الأزهر الشريف ووزارة الأوقاف المصرية.
            </p>
            <Link href="/courses/course3" className="button">التفاصيل والتسجيل</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;