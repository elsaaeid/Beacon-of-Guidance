// components/Navbar.tsx

'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/Navbar.module.css'; // Import the CSS module

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    // set initial hash and listen for changes so we can mark anchor links active
    const update = () => setHash(window.location.hash || '');
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const isActive = (href: string) => {
    if (!href) return false;
    if (href.startsWith('#')) {
      return href === (hash || '') || href === ('#' + (hash.replace(/^#/, '')));
    }
    // compare pathnames (exact match)
    return pathname === href;
  };

  return (
    <>
    <nav className={styles.nav}>
      <div className={styles.container}>
          <img src="/assets/images/logo.png" alt="منارة الهداية" className={styles.logo} />
        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
          className={styles.hamburger}
        >
          {open ? (
            <FiX size={22} color="#1f4f43" />
          ) : (
            <FiMenu size={22} color="#1f4f43" />
          )}
        </button>

        {/* Right Side - Navigation Links */}
        <ul className={`${styles.navList} ${open ? styles.open : ''}`}>
          <li>
            <a href="#" className={`${styles.navItem} ${isActive('#') ? styles.active : ''}`}>الرئيسية</a>
          </li>
          <li>
            <a href="#courses" className={`${styles.navItem} ${isActive('#courses') ? styles.active : ''}`}>الدورات</a>
          </li>
          <li>
            <a href="#teachers" className={`${styles.navItem} ${isActive('#teachers') ? styles.active : ''}`}>المعلمون</a>
          </li>
          <li>
            <a href="#reviews" className={`${styles.navItem} ${isActive('#reviews') ? styles.active : ''}`}>التقييمات</a>
          </li>
        </ul>

        {/* Left Side - Register Button and Icon */}
        <div className={styles.leftSide}>
          <a href="/register" className={styles.button}>سجل الآن</a>
        </div>
      </div>
    </nav>
    {/* spacer to prevent page content jumping under the fixed navbar */}
    <div className={styles.spacer} />
    </>
  );
};

export default Navbar;