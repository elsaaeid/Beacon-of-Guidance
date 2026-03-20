"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/BooksCardsWithModal.module.css";
import { getBooks, getHadithsByBook } from "../lib/hadithApi";

const BOOK_LOCALIZATION_AR = {
  "sahih-bukhari": {
    title: "صحيح البخاري",
    writer: "الإمام البخاري",
  },
  "sahih-muslim": {
    title: "صحيح مسلم",
    writer: "الإمام مسلم",
  },
  "al-tirmidhi": {
    title: "جامع الترمذي",
    writer: "أبو عيسى محمد الترمذي",
  },
  "abu-dawood": {
    title: "سنن أبي داود",
    writer: "الإمام أبو داود السجستاني",
  },
  "ibn-e-majah": {
    title: "سنن ابن ماجه",
    writer: "الإمام ابن ماجه القزويني",
  },
  "sunan-nasai": {
    title: "سنن النسائي",
    writer: "الإمام النسائي",
  },
  mishkat: {
    title: "مشكاة المصابيح",
    writer: "الإمام الخطيب التبريزي",
  },
  "musnad-ahmad": {
    title: "مسند أحمد",
    writer: "الإمام أحمد بن حنبل",
  },
  "al-silsila-sahiha": {
    title: "السلسلة الصحيحة",
    writer: "العلامة محمد ناصر الدين الألباني",
  },
};

const BooksCardsWithModal = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const [apiBooks, setApiBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [booksError, setBooksError] = useState(null);

  const [hadiths, setHadiths] = useState([]);
  const [loadingHadiths, setLoadingHadiths] = useState(false);
  const [hadithError, setHadithError] = useState(null);
  const [availabilityByKey, setAvailabilityByKey] = useState({});
  const [loadedCountByKey, setLoadedCountByKey] = useState({});
  const [hiddenBookKeys, setHiddenBookKeys] = useState({});

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
          slug: b.bookSlug || b.slug || "",
          title:
            BOOK_LOCALIZATION_AR[b.bookSlug || b.slug]?.title ||
            b.title ||
            b.bookName ||
            b.name ||
            "غير معروف",
          subtitle:
            BOOK_LOCALIZATION_AR[b.bookSlug || b.slug]?.writer ||
            b.subtitle ||
            b.writerName ||
            "",
          hadithCount: Number(b.hadiths_count || 0),
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
        const result = await getHadithsByBook(selectedBook, {
          expectedCount: Number(selectedBookInfo?.hadithCount || 0),
          limit: 100,
        });
        if (!mounted) return;

        const entries = Array.isArray(result) ? result : (result?.hadiths || []);

        const cleaned =
          Array.isArray(entries)
            ? entries.map((h) => ({
                number: h.hadithNumber || h.hadith_number || h.id || "-",
                text: h.arabic_text || h.hadithArabic || h.hadithUrdu || h.hadithEnglish || "لا يوجد نص متاح",
              }))
            : [];

        if (cleaned.length === 0) {
          setHiddenBookKeys((prev) => ({ ...prev, [selectedBook]: true }));
          setSelectedBook(null);
          return;
        }

        setHadiths(cleaned);
        const expectedCount = Number(selectedBookInfo?.hadithCount || 0);
        setLoadedCountByKey((prev) => ({ ...prev, [selectedBook]: cleaned.length }));
        const resolvedStatus = expectedCount > 0 && cleaned.length >= expectedCount ? "full" : "partial";
        setAvailabilityByKey((prev) => ({ ...prev, [selectedBook]: resolvedStatus }));

        if (Number(selectedBookInfo?.hadithCount || 0) > 0 && cleaned.length < Number(selectedBookInfo?.hadithCount || 0)) {
          setHadithError(`تم تحميل ${cleaned.length} من أصل ${selectedBookInfo.hadithCount} حديث. قد لا تتوفر كل الأحاديث من المصدر الخارجي.`);
        } else if (Number(selectedBookInfo?.hadithCount || 0) === 0 && cleaned.length === 0) {
          if (result?.source === "fallback") {
            setHadithError("لم يتم العثور على أحاديث لهذا الكتاب حتى بعد البحث في المصدر البديل.");
          } else {
            setHadithError(result?.message || "لم يتم العثور على أحاديث في الاستجابة الحالية لهذا الكتاب.");
          }
        } else if (result?.rateLimited) {
          setHadithError("تم التحميل مع وجود ضغط على المصدر الأساسي؛ تم استخدام نتائج متاحة حاليًا.");
        }
      } catch (err) {
        setAvailabilityByKey((prev) => ({ ...prev, [selectedBook]: "partial" }));
        setHadithError(err?.message || "تعذّر تحميل الأحاديث");
      } finally {
        setLoadingHadiths(false);
      }
    }

    loadHadiths();
    return () => (mounted = false);
  }, [selectedBook, selectedBookInfo?.hadithCount]);

  // -------------------------------
  // RENDER UI
  // -------------------------------
  return (
    <>
      <div className={styles.container} id="books">
        <h2 className={styles.title}>كتب الحديث النبوي الشريف</h2>
        <p className={styles.description}>استمتع بقراءة مجموعة من الأحاديث النبوية الشريفة</p>

        {loadingBooks && (
          <p className={styles.loading}>
            <span className={styles.loadingIcon} aria-hidden="true">⏳</span>
            جاري تحميل الكتب...
          </p>
        )}
        {booksError && <p className={styles.error}>{booksError}</p>}

        <div className={styles.cardContainer}>
          {apiBooks.filter((book) => !hiddenBookKeys[book.key]).map((book) => {
            const { key, title, hadithCount, subtitle } = book;
            const currentLoaded = loadedCountByKey[key];
            const hasCurrentCount = Number.isFinite(Number(currentLoaded));
            return (
              <div
                key={key}
              className={styles.card}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedBook(key)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedBook(key)}
              >
                <div className={styles.cardHeader}>{title}</div>
                <div className={styles.content}>
                  <h3 className={styles.subtitle}>{subtitle}</h3>
                  <div className={styles.hadithCount}>
                    <span className={styles.countLabel}>{hasCurrentCount ? "المتاح حاليا:" : "الإجمالي:"}</span>
                    <span className={styles.countValue}>{hasCurrentCount ? currentLoaded : hadithCount}</span>
                    <span>حديث</span>
                  </div>
                </div>
              </div>
            );
          })}
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
            {Number(selectedBookInfo?.hadithCount || 0) > 0 && (
              <p className={styles.availabilityLine}>
                <span className={styles.countLabel}>المتاح حاليا:</span>
                <span className={styles.countValue}>{hadiths.length} / {selectedBookInfo.hadithCount}</span>
              </p>
            )}

            {loadingHadiths && (
              <p className={styles.loading}>
                <span className={styles.loadingIcon} aria-hidden="true">⏳</span>
                جارٍ تحميل الأحاديث...
              </p>
            )}
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
