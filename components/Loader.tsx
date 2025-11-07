"use client";

import React from 'react';

export default function Loader({ text = 'جاري التحميل...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      {/* Use the loader.gif from public/assets/images */}
      <img src="/assets/images/loader.gif" alt="جاري التحميل" className="object-contain"
        style={{
            width: "500px",
            height: "500px",
        }}
       />
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
