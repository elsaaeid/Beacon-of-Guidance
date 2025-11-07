"use client";

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'cookie_consent_v1';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch (e) {
      // if localStorage is unavailable, show banner
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
    setVisible(false);
  };

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, 'dismissed'); } catch (e) {}
    setVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-[92%] sm:w-3/4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-4 rtl" dir="rtl">
      <div className="flex-1 text-sm text-gray-700">
        نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتك على الموقع. باستخدامك لهذا الموقع، فإنك توافق على سياسة الخصوصية واستخدام الكوكيز.
      </div>

      <div className="flex gap-2">
        <button onClick={accept} className="cursor-pointer bg-green-900 text-white px-4 py-2 rounded-md text-sm hover:bg-green-900">موافق</button>
        <button onClick={dismiss} className="cursor-pointer bg-transparent border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm">رفض</button>
      </div>
    </div>
  );
}
