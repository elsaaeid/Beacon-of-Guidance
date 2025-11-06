// components/StudentTestimonials.tsx
import React from "react";
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
  {
    id: 1,
    name: "تامر علي",
    role: "طالب في دورة تحفيظ القرآن",
    content:
      `الحمد لله، بفضل المعلمين المتميزين في المركز، تمكنت من حفظ عشرة أجزاء من القرآن الكريم خلال عام واحد فقط. أسلوب التدريس ممتاز والمتابعة مستمرة. أنصح به بشدة.`,
    stars: 5,
  },
  {
    id: 2,
    name: "رقية محمد",
    role: "طالبة في دورة العلوم الشرعية",
    content:
      `استفدت كثيراً من دورة العلوم الشرعية، حيث تعلمت أساسيات الفقة والتفسير بطريقة مبسطة وعميقة في نفس الوقت. المعلمون متمكنون من المادة العلمية ويجيبون على جميع الأسئلة بوضوح.`,
    stars: 5,
  },
  {
    id: 3,
    name: "احمد حسن",
    role: "طالب في دورة اللغة العربية",
    content: `الحمد لله، بفضل المعلمين المتميزين في المركز، تمكنت من تحسين مهاراتي في اللغة العربية بشكل كبير. الدروس تفاعلية وممتعة، وأنصح بها بشدة.`,
    stars: 5,
  },
];

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  filled ? (
    <AiFillStar className={`${styles.star} ${styles.starFilled}`} />
  ) : (
    <AiOutlineStar className={`${styles.star} ${styles.starEmpty}`} />
  )
);

const StudentTestimonials: React.FC = () => {
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
        {testimonials.map(({ id, name, role,content, stars }) => (
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