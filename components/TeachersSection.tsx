// components/TeachersSection.tsx

"use client";

import React from "react";
import styles from '../styles/TeachersSection.module.css'; // Import the CSS module

const TeachersSection: React.FC = () => {
  return (
    <section id="teachers" className={styles.container} aria-label="نخبة من المعلمين">
      <h2 className={styles.title}>نخبة من المعلمين</h2>
      <p className={styles.subtitle}>
        يشرف على التعليم في مركزنا نخبة من المعلمين المتميزين ذوي الخبرة والكفاءة العالية
      </p>

      <div className={styles.cardsContainer}>
        {/* Teacher 1 */}
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src="/assets/images/teacher.png"
              alt="الشيخ مسعد الجندى"
              className={styles.image}
              width={160}
              height={160}
              loading="lazy"
            />
          </div>
          <h3 className={styles.name}>الشيخ مسعد الجندى</h3>
          <p className={styles.role}>شيخ القرآن والإسلاميات</p>
          <p className={styles.description}>
             متخصص في تعليم القرآن ونور البيان للعرب وصاحب موقع منارة الهدى التعليمي.
          </p>
        </article>
      </div>
    </section>
  );
};

export default TeachersSection;