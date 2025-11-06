"use client";
import React, { useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Go to top"
      onClick={handleClick}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 24,
        zIndex: 60,
        display: visible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 8,
        background: '#1f4f43',
        color: '#fff',
        border: 'none',
        boxShadow: '0 6px 20px rgba(31,79,67,0.18)',
        cursor: 'pointer',
      }}
    >
      <FiChevronUp size={20} aria-hidden="true" />
    </button>
  );
}
