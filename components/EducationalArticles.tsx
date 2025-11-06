// components/EducationalArticles.tsx
import React from "react";
import styles from '../styles/EducationalArticles.module.css'; // Import the CSS module

interface Article {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

const articles: Article[] = [
  {
    id: 1,
    date: "10 اكتوبر 2025",
    title: "أهمية حفظ القرآن الكريم في حياة المسلم",
    description:
      "يتناول هذا المقال أهمية حفظ القرآن الكريم في حياة المسلم وأثره على تقوية الإيمان وتنمية النفس. مع ذكر فضائل حفظ القرآن الكريم والأجر العظيم للمؤتلف عليه.",
    imageUrl:
      "assets/images/articles/article1.png",
  },
  {
    id: 2,
    date: "14 مايو 2025",
    title: "التعلم الإلكتروني وأثره في نشر العلوم الشرعية",
    description:
      "دراسة تحليلية عن دور التقنيات الحديثة في تيسير تعلم العلوم الشرعية وكيفية الاستفادة من الوسائل التكنولوجية في نشر العلم الشرعي.",
    imageUrl:
      "assets/images/articles/article2.png",
  },
  {
    id: 3,
    date: "15 مارس 2025",
    title: "أساليب تعلم القرآن للأطفال",
    description:
      "دليل شامل للآباء والمعلمين حول أفضل الطرق والاساليب التربوية في تعليم القرآن الكريم للأطفال. مع نصائح عملية وتجارب ناجحة.",
    imageUrl:
      "assets/images/articles/article3.png",
  },
];

const EducationalArticles: React.FC = () => {
  return (
    <section id="articles" className={styles.section} dir="rtl">
      {/* Title */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>مقالات تعليمية</h2>
        <p className={styles.subtitle}>
          مجموعة من المقالات التعليمية والمحتوى الإسلامي المفيد
        </p>
      </div>

      {/* Articles Grid */}
      <div className={styles.grid}>
        {articles.map(({ id, date, title, description, imageUrl }) => (
          <article
            key={id}
            className={styles.article}
          >
            <img
              src={imageUrl}
              alt={title}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.content}>
              <time className={styles.date}>{date}</time>
              <h3 className={styles.articleTitle}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EducationalArticles;