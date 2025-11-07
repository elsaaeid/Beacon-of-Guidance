// components/HeroSection.tsx

import Image from 'next/image';
import React from 'react';
import styles from '../styles/HeroSection.module.css'; // Import the CSS module

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>
          منصة تعليمية متخصصة في تعليم القرآن الكريم والعلوم الشرعية
        </h1>
        <p className={styles.subheading}>
          تقدم منارة الهدى تعليم القرآن الكريم والعلوم الشرعية على يد نخبة من المعلمين المعتمدين من الأزهر الشريف ووزارة الأوقاف المصرية. بأساليب تعليمية حديثة ومبتكر
        </p>
        <div className={styles.buttonsContainer}>
          <a className="button" href="/register">
            ابدأ التعلم الآن
          </a>
          <a className={styles.outlineButton} href="#courses">
            استعرض الدورات
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;