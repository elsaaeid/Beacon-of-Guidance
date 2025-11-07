// components/Footer.tsx
import React from "react";
import styles from '../styles/Footer.module.css'; // Import the CSS module
import { FaYoutube, FaInstagram, FaWhatsapp, FaFacebookF, } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Right column: Logo/Description and social icons */}
        <div className={styles.column}>
          <h3 className={styles.title}>
            مركز تعليم القرآن والعلوم الشرعية
          </h3>
          <p className={styles.description}>
            نسعى لنشر تعاليم القرآن الكريم والعلوم الشرعية بأساليب تعليمية حديثة ومبتكرة، على يد نخبة من المعلمين المتميزين.
          </p>

          <div className={styles.socialIcons}>
            {/* Social media icons */}
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <FaYoutube className={styles.icon} />
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <FaInstagram className={styles.icon} />
            </a>
            <a href="https://wa.me/201032372337" aria-label="WhatsApp" className={styles.socialLink}>
              <FaWhatsapp className={styles.icon} />
            </a>
            <a href="https://www.facebook.com/share/14U5UxgcJpV/" aria-label="Facebook" className={styles.socialLink}>
              <FaFacebookF className={styles.icon} />
            </a>
          </div>
        </div>

        {/* Courses */}
        <div className={styles.column}>
          <h4 className={styles.subtitle}>الدورات</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link href="/courses/course1">تحفيظ القرآن الكريم</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/courses/course2">الإجازة في القرآن الكريم</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/courses/course3">أحكام التجويد والتلاوة</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/courses/shariah-studies">العلوم الشرعية</Link>
            </li>
          </ul>
        </div>

  {/* Contact Us */}
    <div id="contacts" className={styles.column}>
          <h4 className={styles.subtitle}>تواصل معنا</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <FiMapPin className={styles.contactIcon} aria-hidden="true" />
              <span>مصر مدينة المنصورة، قرية ميت خميس</span>
            </li>
            <li className={styles.contactItem}>
              <FiPhone className={styles.contactIcon} aria-hidden="true" />
              <span>01032372337</span>
            </li>
            <li className={styles.contactItem}>
              <FiMail className={styles.contactIcon} aria-hidden="true" />
              <span>msd826318@gmail.com</span>
            </li>
            <li className={styles.contactItem}>
              <FiClock className={styles.contactIcon} aria-hidden="true" />
              <span>السبت - الخميس : 9 صباحا - 9 مساء</span>
            </li>
          </ul>
     </div>
    </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p className={styles.copyright}> جميع الحقوق محفوظة 2025 © لدى <Link className={styles.author} target="_blank" href="https://alsaaeid-ellithy.vercel.app">Alsaaeid Ellithy</Link></p>
        <div className={styles.bottomLinks}>
          <span className={styles.bottomLink}>سياسة الخصوصية</span>
          <span className={styles.bottomLink}>الشروط والأحكام</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;