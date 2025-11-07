// components/ShariahStudies.tsx

import Link from "next/link";
import React from "react";
import styles from '../styles/ShariahStudies.module.css'; // Import the CSS module

const ShariahStudies: React.FC = () => {
  return (
    <article id="shariah-studies" className={styles.container}>
      <div className={styles.imageWrapper} aria-hidden="true">
        <img
          className={styles.image}
          src="/assets/images/shariah-studies.png"
          alt="مكتبة كتب في العلوم الشرعية"
          loading="lazy"
          width={1024}
          height={250}
        />
      </div>

      <section className={styles.content} aria-labelledby="title-shariah">
        <h1 id="title-shariah" className={styles.title}>
          دراسة العلوم الشرعية
        </h1>
        <p className={styles.description}>
          دورة شاملة لدراسة العلوم الشرعية بمنهج يتناسب مع كل فئة وكل مرحلة، وتشمل الفقه
          والتفسير والحديث وغيرها من العلوم الإسلامية.
        </p>

        <ul className={styles.tagsWrapper} aria-label="مواضيع الدراسة">
          <li className={styles.tag}>الفقه الإسلامي</li>
          <li className={styles.tag}>علوم التفسير</li>
          <li className={styles.tag}>علوم الحديث</li>
          <li className={styles.tag}>السيرة النبوية</li>
          <li className={styles.tag}>العقيدة الإسلامية</li>
        </ul>

        <Link
          className="button"
          href="courses/shariah-studies"
        >
          التفاصيل والتسجيل
        </Link>
      </section>
    </article>
  );
};

export default ShariahStudies;