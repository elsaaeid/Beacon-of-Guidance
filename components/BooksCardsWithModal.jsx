"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/BooksCardsWithModal.module.css";
import { getBooks, getHadithsByBook } from "../lib/hadithApi";

const BooksCardsWithModal = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const [apiBooks, setApiBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [booksError, setBooksError] = useState(null);

  const [hadiths, setHadiths] = useState([]);
  const [loadingHadiths, setLoadingHadiths] = useState(false);
  const [hadithError, setHadithError] = useState(null);

  const closeModal = () => setSelectedBook(null);

  const selectedBookInfo = apiBooks.find((b) => b.key === selectedBook);

  // -------------------------------
  // LOAD BOOKS
  // -------------------------------
  useEffect(() => {
    let mounted = true;

    async function loadBooks() {
      setLoadingBooks(true);
      setBooksError(null);

      try {
        const data = await getBooks();
        if (!mounted) return;

        const mapped = data.map((b) => ({
          key: b.slug || b.bookSlug || String(b.id),
          title: b.title || "غير معروف",
          subtitle: b.subtitle || "",
          hadithCount: b.hadiths_count || 0,
        }));

        setApiBooks(mapped);
      } catch (err) {
        setBooksError(err?.message || "حدث خطأ أثناء تحميل الكتب");
      } finally {
        setLoadingBooks(false);
      }
    }

    loadBooks();
    return () => (mounted = false);
  }, []);

  // -------------------------------
  // LOAD HADITHS ON BOOK SELECT
  // -------------------------------
  useEffect(() => {
    if (!selectedBook) return;

    let mounted = true;

    async function loadHadiths() {
      setLoadingHadiths(true);
      setHadithError(null);
      setHadiths([]);

      try {
        const entries = await getHadithsByBook(selectedBook);
        if (!mounted) return;

        const cleaned =
          Array.isArray(entries)
            ? entries.map((h) => ({
                number: h.hadithNumber,
                text: h.arabic_text || h.hadithArabic || "",
              }))
            : [];

        setHadiths(cleaned);
      } catch (err) {
        setHadithError(err?.message || "تعذّر تحميل الأحاديث");
      } finally {
        setLoadingHadiths(false);
      }
    }

    loadHadiths();
    return () => (mounted = false);
  }, [selectedBook]);

  // -------------------------------
  // RENDER UI
  // -------------------------------
  return (
    <>
      <div className={styles.container} id="books">
        <h2 className={styles.title}>كتب الحديث النبوي الشريف</h2>
        <p className={styles.description}>استمتع بقراءة مجموعة من الأحاديث النبوية الشريفة</p>

        {loadingBooks && <p className={styles.loading}>⏳ جاري تحميل الكتب...</p>}
        {booksError && <p className={styles.error}>{booksError}</p>}

        <div className={styles.cardContainer}>
          {apiBooks.map(({ key, title, hadithCount, subtitle }) => (
            <div
              key={key}
              className={styles.card}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedBook(key)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedBook(key)}
            >
              <div className={styles.header}>{title}</div>
              <div className={styles.content}>
                <h3 className={styles.subtitle}>{subtitle}</h3>
                <div className={styles.hadithCount}>{hadithCount} حديث</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBook && (
        <div className={styles.modalOverlay} onClick={closeModal} role="dialog" aria-modal="true">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className={styles.modalCloseBtn}>
              &times;
            </button>

            <h2 className={styles.modalTitle}>
              {selectedBookInfo?.title ? `أحاديث ${selectedBookInfo.title}` : "الأحاديث"}
            </h2>

            {loadingHadiths && <p className={styles.loading}>⏳ جارٍ تحميل الأحاديث...</p>}
            {hadithError && <p className={styles.error}>{hadithError}</p>}

            {hadiths.length > 0 ? (
              <ul className={styles.hadithList}>
                {hadiths.map((h) => (
                  <li key={h.number} className={styles.hadithItem}>
                    <span className={styles.hadithNumber}>حديث رقم {h.number}:</span>
                    <p className={styles.hadithText}>{h.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              !loadingHadiths && <p className={styles.empty}>لا توجد أحاديث متوفرة.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BooksCardsWithModal;
