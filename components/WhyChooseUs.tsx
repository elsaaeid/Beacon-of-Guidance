// components/WhyChooseUs.tsx
'use client'
import React from "react";
import { FiGlobe, FiBookOpen, FiUsers } from 'react-icons/fi';
import styles from '../styles/WhyChooseUs.module.css';

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>لماذا تختارنا؟</h2>
        <p className={styles.subtitle}>
          نقدم تجربة تعليمية متكاملة تجمع بين الأصالة والمعاصرة. مع التركيز على الجودة والإتقان
        </p>

        <div className={styles.cardsContainer}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <FiGlobe size={32} color="#5e8c7f" />
            </div>
            <h3 className={styles.cardTitle}>تعليم عن بعد</h3>
            <p className={styles.cardText}>
              إمكانية التعلم عن بعد من أي مكان في العالم، مع توفير جميع الوسائل التعليمية اللازمة
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <FiBookOpen size={32} color="#5e8c7f" />
            </div>
            <h3 className={styles.cardTitle}>مناهج متكاملة</h3>
            <p className={styles.cardText}>
              مناهج تعليمية متكاملة تناسب جميع المستويات والفئات العمرية، مع مراعاة الفروق الفردية
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <FiUsers size={32} color="#5e8c7f" />
            </div>
            <h3 className={styles.cardTitle}>معلمون معتمدون</h3>
            <p className={styles.cardText}>
              نخبة من المعلمين المعتمدين من الأزهر الشريف ووزارة الأوقاف المصرية. ذوي خبرة طويلة في التعليم
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default WhyChooseUs;
