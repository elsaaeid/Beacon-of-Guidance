// components/StudentTestimonials.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from '../styles/StudentTestimonials.module.css'; // Import the CSS module
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  // Intentionally empty for now.
];

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  filled ? (
    <AiFillStar className={`${styles.star} ${styles.starFilled}`} />
  ) : (
    <AiOutlineStar className={`${styles.star} ${styles.starEmpty}`} />
  )
);

const StudentTestimonials: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="reviews" className={styles.section} dir="rtl">
      {/* Section Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>آراء طلابنا</h2>
        <p className={styles.subtitle}>
          استمع إلى تجارب طلابنا الذين استفادوا من دوراتنا وحققوا تقدمًا ملحوظًا في تعلم القرآن الكريم والعلوم الشرعية
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className={styles.grid}>
        {loading &&
          [1, 2, 3].map((id) => (
            <div key={id} className={styles.card}>
              <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />

              <div className={styles.userInfo}>
                <div className={styles.skeletonAvatar} />
                <div className={styles.userDetails}>
                  <div className={`${styles.skeletonLine} ${styles.skeletonName}`} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonRole}`} />
                </div>
              </div>
            </div>
          ))}

        {!loading && testimonials.length === 0 && (
          <div className={styles.emptyState}>لا توجد آراء طلاب متاحة حالياً.</div>
        )}

        {!loading && testimonials.map(({ id, name, role, content, stars }) => (
          <div
            key={id}
            className={styles.card}
          >
            {/* Content */}
            <p className={styles.content}>{content}</p>

            {/* User Info and Stars */}
            <div className={styles.userInfo}>
              {/* Use a react-icon for user avatar to avoid external image requests */}
              <FaUserCircle className={styles.avatar} role="img" aria-label={name} />
              <div className={styles.userDetails}>
                <h4 className={styles.userName}>{name}</h4>
                <p className={styles.userRole}>{role}</p>
              </div>

              {/* Stars */}
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < stars} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentTestimonials;