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
  {
    number: 1,
    text: `قال رسول الله ﷺ: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى".`,
  },
  {
    number: 2,
    text: `قال رسول الله ﷺ: "الحلال بين والحرام بين، وبينهما أمور مشتبهات".`,
  },
  {
    number: 3,
    text: `قال رسول الله ﷺ: "المسلم من سلم المسلمون من لسانه ويده".`,
  },
  {
    number: 4,
    text: `قال رسول الله ﷺ: "الدين النصيحة".`,
  },
  {
    number: 5,
    text: `قال رسول الله ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه".`,
  },
  {
    number: 6,
    text: `قال رسول الله ﷺ: "الحياء لا يأتي إلا بخير".`,
  },
  {
    number: 7,
    text: `قال رسول الله ﷺ: "إن الله يحب إذا عمل أحدكم عملاً أن يتقنه".`,
  },
  ],
    muslim: [
    {
      number: 1,
      text: `قال رسول الله ﷺ: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى".`,
    },
    {
      number: 2,
      text: `قال رسول الله ﷺ: "من حسن إسلام المرء تركه ما لا يعنيه".`,
    },
    {
      number: 3,
      text: `قال رسول الله ﷺ: "من صام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه".`,
    },
    {
      number: 4,
      text: `قال رسول الله ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه".`,
    },
    {
      number: 5,
      text: `قال رسول الله ﷺ: "الحياء شعبة من الإيمان".`,
    },
    {
      number: 6,
      text: `قال رسول الله ﷺ: "المسلم أخو المسلم لا يظلمه ولا يخذله ولا يحقره".`,
    },
    {
      number: 7,
      text: `قال رسول الله ﷺ: "الدين النصيحة".`,
    },
  ],
  abiDawood: [
    { number: 1, text: `قال رسول الله ﷺ: "من سلك طريقاً يلتمس فيه علماً سهل الله له طريقاً إلى الجنة".` },
    { number: 2, text: `قال رسول الله ﷺ: "خير الناس أنفعهم للناس".` },
    { number: 3, text: `قال رسول الله ﷺ: "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن".` },
    { number: 4, text: `قال رسول الله ﷺ: "من صلى عليّ صلاةً واحدةً صلى الله عليه بها عشراً".` },
    { number: 5, text: `قال رسول الله ﷺ: "لا حسد إلا في اثنتين: رجل آتاه الله القرآن فقرأه آناء الليل وآناء النهار، ورجل آتاه الله مالاً فسلطه على صراط الله".` },
  ],
  tirmidhi: [
    {
      number: 1,
      text: `قال رسول الله ﷺ: "الدين النصيحة."`,
    },
    {
      number: 2,
      text: `قال رسول الله ﷺ: "من حسن إسلام المرء تركه ما لا يعنيه."`,
    },
    {
      number: 3,
      text: `قال رسول الله ﷺ: "إنما الأعمال بالنيات."`,
    },
    {
      number: 4,
      text: `قال رسول الله ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه."`,
    },
    {
      number: 5,
      text: `قال رسول الله ﷺ: "البر حسن الخلق، والإثم ما حاك في نفسك وكرهت أن يطلع عليه الناس."`,
    },
    {
      number: 6,
      text: `قال رسول الله ﷺ: "أفضل الصدقة أن تصدق وأنت صحيح غنيٌّ تملك فلا تؤجل حتى تصبح فقيرًا."`,
    },
    {
      number: 7,
      text: `قال رسول الله ﷺ: "من صام رمضان إيمانًا واحتسابًا، غفر له ما تقدم من ذنبه."`,
    },
    {
      number: 8,
      text: `قال رسول الله ﷺ: "الحياء لا يأتي إلا بخير."`,
    },
    {
      number: 9,
      text: `قال رسول الله ﷺ: "الكيس من دان نفسه وعمل لما بعد الموت، والعاجز من أتبع نفسه هواها وتمنى على الله الأماني."`,
    },
    {
      number: 10,
      text: `قال رسول الله ﷺ: "من كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت."`,
    },
  ],
  nasaei: [
    {
      number: 1,
      text: `قال رسول الله ﷺ: "مَن نفس عن مؤمن كربة من كرب الدنيا نفس الله عنه كربة من كرب يوم القيامة".`,
    },
    {
      number: 2,
      text: `قال رسول الله ﷺ: "إذا مرض العبد أو سافر كتب له مثل ما كان يعمل مقيمًا صحيحًا".`,
    },
    {
      number: 3,
      text: `قال رسول الله ﷺ: "من حسن إسلام المرء تركه ما لا يعنيه".`,
    },
    {
      number: 4,
      text: `قال رسول الله ﷺ: "الدين النصيحة".`,
    },
    {
      number: 5,
      text: `قال رسول الله ﷺ: "من صام رمضان إيمانًا واحتسابًا، غفر له ما تقدم من ذنبه".`,
    },
    {
      number: 6,
      text: `قال رسول الله ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه".`,
    },
    {
      number: 7,
      text: `قال رسول الله ﷺ: "البر حسن الخلق، والإثم ما حاك في نفسك وكرهت أن يطلع عليه الناس".`,
    },
    {
      number: 8,
      text: `قال رسول الله ﷺ: "أفضل الصدقة أن تصدق وأنت صحيح غنيٌّ تَملك فلا تؤجل حتى تصبح فقيرًا".`,
    },
  ],
  ibnMajah: [
    { number: 1, text: `قال رسول الله ﷺ: "إنما مثل أهل بيتي كمثل سفينة نوح، من ركبها نجا ومن تخلف عنها غرق."` },
    { number: 2, text: `قال رسول الله ﷺ: "المؤمن مرآة المؤمن."` },
    { number: 3, text: `قال رسول الله ﷺ: "أحب الناس إلى الله تعالى أنفعهم للناس."` },
    { number: 4, text: `قال رسول الله ﷺ: "البر حسن الخلق، والفحش ما حاك في نفسك وكرهت أن يطلع عليه الناس."` },
    { number: 5, text: `قال رسول الله ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه."` },
  ],
  muwattaMalik: [
    {
      number: 1,
      text: `قال مالك: سمعت رسول الله ﷺ يقول: "لا يحب الله عبداً عجولاً".`,
    },
    {
      number: 2,
      text: `قال مالك: "الوضوء هو نصف الإيمان".`,
    },
    {
      number: 3,
      text: `قال مالك: "من أحب أن ينظر إلى رجل من أهل الجنة فلينظر إلى أبي بكر".`,
    },
    {
      number: 4,
      text: `قال مالك: "الاستعاذة من الجنة إلى النار".`,
    },
    {
      number: 5,
      text: `قال مالك: "فضل الصلاة في الجماعة على صلاة الفذ بسبع وعشرين درجة".`,
    },
  ],
  darimi: [
    {
      number: 1,
      text: `قال رسول الله ﷺ: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى".`,
    },
    {
      number: 2,
      text: `قال رسول الله ﷺ: "الدين النصيحة".`,
    },
    {
      number: 3,
      text: `قال رسول الله ﷺ: "الحياء من الإيمان".`,
    },
    {
      number: 4,
      text: `قال رسول الله ﷺ: "من حسن إسلام المرء تركه ما لا يعنيه".`,
    },
    {
      number: 5,
      text: `قال رسول الله ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه".`,
    },
  ]
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
