import React from 'react';

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
];

const BooksCards = () => {
  return (
    <div className="flex justify-center gap-6 p-6 flex-wrap">
      {books.map(({ key, title, hadithCount, subtitle }) => (
        <div
          key={key}
          className="w-60 bg-white rounded-b-2xl rounded-tl-3xl rounded-tr-3xl shadow-md overflow-hidden flex flex-col"
        >
          {/* Top colored header with pattern background and rounded corners */}
          <div
            className="text-white py-8 flex items-center justify-center text-xl font-bold rounded-tl-3xl rounded-tr-3xl relative px-4"
            style={{
              backgroundColor: '#008080',
              backgroundImage:
                'radial-gradient(circle at 0 0, rgba(255 255 255 / 0.1) 20%, transparent 21%), radial-gradient(circle at 10px 10px, rgba(255 255 255 / 0.1) 20%, transparent 21%)',
              backgroundSize: '20px 20px',
              backgroundRepeat: 'repeat',
              border: '1.5px solid #ffffff70',
            }}
          >
            <span className="select-none">{title}</span>
          </div>

          {/* Bottom white area with text and optional icon */}
          <div className="p-4 text-center text-gray-700 flex flex-col items-center space-y-1 flex-grow rounded-b-2xl">
            <h3 className="font-semibold text-base">{subtitle}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span>{hadithCount.toLocaleString()} حديث</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCards;
