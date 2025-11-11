'use client';
import React, { useState } from 'react';
import styles from '../styles/BooksCardsWithModal.module.css';

const books = [
  {
    key: 'bukhari',
    title: 'صحيح البخاري',
    hadithCount: 7008,
    subtitle: 'صحيح البخاري',
  },
  {
    key: 'muslim',
    title: 'صحيح مسلم',
    hadithCount: 5362,
    subtitle: 'صحيح مسلم',
  },
  {
    key: 'abiDawood',
    title: 'سنن أبي داود',
    hadithCount: 4590,
    subtitle: 'سنن أبي داود',
  },
  {
    key: 'tirmidhi',
    title: 'سنن الترمذي',
    hadithCount: 3891,
    subtitle: 'سنن الترمذي',
  },
  {
    key: 'nasaei',
    title: 'سنن النسائي',
    hadithCount: 5662,
    subtitle: 'سنن النسائي',
  },
  {
    key: 'ibnMajah',
    title: 'سنن ابن ماجه',
    hadithCount: 4332,
    subtitle: 'سنن ابن ماجه',
  },
  {
    key: 'muwattaMalik',
    title: 'موطأ الإمام مالك',
    hadithCount: 1594,
    subtitle: 'موطأ الإمام مالك',
  },
  {
    key: 'darimi',
    title: 'سنن الدارمي',
    hadithCount: 3367,
    subtitle: 'سنن الدارمي',
  },
];

// Extended sample hadith data (replace or extend with real hadiths)
const hadithData = {
  bukhari: [
    { number: 1, text: `قال رسول الله ﷺ: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى".` },
    { number: 2, text: `قال رسول الله ﷺ: "الحلال بين والحرام بين، وبينهما أمور مشتبهات".` },
    { number: 3, text: `قال رسول الله ﷺ: "المسلم من سلم المسلمون من لسانه ويده".` },
  ],
  muslim: [
    { number: 1, text: `قال رسول الله ﷺ: "من حسن إسلام المرء تركه ما لا يعنيه".` },
    { number: 2, text: `قال رسول الله ﷺ: "لا يحل دم امرئ مسلم إلا بإحدى ثلاث".` },
  ],
  abiDawood: [
    { number: 1, text: `قال رسول الله ﷺ: "من سلك طريقاً يلتمس فيه علماً سهل الله له طريقاً إلى الجنة".` },
    { number: 2, text: `قال رسول الله ﷺ: "خير الناس أنفعهم للناس".` },
  ],
  tirmidhi: [
    { number: 1, text: `قال رسول الله ﷺ: "الدين النصيحة".` },
    { number: 2, text: `قال رسول الله ﷺ: "لا يرد القضاء إلا الدعاء".` },
  ],
  nasaei: [
    { number: 1, text: `هذا حديث نموذجي من سنن النسائي.` },
  ],
  ibnMajah: [
    { number: 1, text: `هذا حديث نموذجي من سنن ابن ماجه.` },
  ],
  muwattaMalik: [
    { number: 1, text: `هذا حديث نموذجي من موطأ الإمام مالك.` },
  ],
  darimi: [
    { number: 1, text: `هذا حديث نموذجي من سنن الدارمي.` },
  ],
};

const BooksCardsWithModal = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const closeModal = () => setSelectedBook(null);

  const hadiths = selectedBook ? hadithData[selectedBook] || [] : [];
  const selectedBookInfo = books.find((book) => book.key === selectedBook);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>قراءة كتب الحديث النبوي الشريف</h2>
        <div className={styles.cardContainer}>
            {books.map(({ key, title, hadithCount, subtitle }) => (
              <div
                key={key}
                className={styles.card}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedBook(key)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedBook(key)}
                aria-label={`عرض أحاديث ${title}`}
              >
                <div className={styles.header}>{title}</div>
                <div className={styles.content}>
                  <h3 className={styles.subtitle}>{subtitle}</h3>
                  <div className={styles.hadithCount}>{hadithCount.toLocaleString()} حديث</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {selectedBook && (
        <div
          className={styles.modalOverlay}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className={styles.modalCloseBtn}
              aria-label="إغلاق النافذة"
            >
              &times;
            </button>
            <h2 id="modal-title" className={styles.modalTitle}>
              {selectedBookInfo ? `أحاديث ${selectedBookInfo.title}` : 'الأحاديث'}
            </h2>
            {hadiths.length > 0 ? (
              <ul className={styles.hadithList}>
                {hadiths.map(({ number, text }) => (
                  <li key={number} className={styles.hadithItem}>
                    <span className={styles.hadithNumber}>حديث رقم {number}:</span>
                    <p className={styles.hadithText}>{text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ textAlign: 'center', color: '#718096' }}>لا توجد أحاديث متوفرة.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BooksCardsWithModal;
