"use client";

import React, { useEffect, useRef, useState } from 'react';
// Use next/router events for broader compatibility across Next versions
// @ts-ignore
import Router from 'next/router';
import Loader from './Loader';

/**
 * Shows a full-screen loader during client navigation and keeps it visible
 * for at least `MIN_VISIBLE_MS` milliseconds to avoid flicker.
 */
export default function GlobalLoader() {
  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const MIN_VISIBLE_MS = 5000; 

  useEffect(() => {
    // Handle initial page load: if the document is not fully loaded yet,
    // show the loader until the window `load` event fires (and respect MIN_VISIBLE_MS).
    const onInitialLoad = () => {
      // reuse onDone logic below by calling it
      onDone();
    };

    if (typeof document !== 'undefined' && document.readyState !== 'complete') {
      // mark shown time and show loader
      shownAtRef.current = Date.now();
      setVisible(true);
      window.addEventListener('load', onInitialLoad);
    }

    const onStart = (url?: string) => {
      try {
        if (hideTimeoutRef.current) {
          window.clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }

        // If a URL is provided, check whether the navigation target is the home page.
        // Use URL parsing to handle absolute or relative URLs.
        let isHomeTarget = false;
        if (url) {
          try {
            const targetPath = new URL(url, window.location.href).pathname;
            isHomeTarget = targetPath === '/';
          } catch (e) {
            // If URL parsing fails, fallback to simple equality
            isHomeTarget = url === '/';
          }
        }

        // Show loader for any navigation, but ensure we definitely show it when
        // navigating to home (addressing the reported issue).
        shownAtRef.current = Date.now();
        setVisible(true);
      } catch (e) {
        // swallow errors to avoid breaking navigation
        shownAtRef.current = Date.now();
        setVisible(true);
      }
    };

    const onDone = () => {
      if (!shownAtRef.current) {
        setVisible(false);
        return;
      }

      const elapsed = Date.now() - shownAtRef.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      if (remaining > 0) {
        hideTimeoutRef.current = window.setTimeout(() => {
          setVisible(false);
          shownAtRef.current = null;
          hideTimeoutRef.current = null;
        }, remaining);
      } else {
        setVisible(false);
        shownAtRef.current = null;
      }
    };

    Router.events.on('routeChangeStart', onStart);
    Router.events.on('routeChangeComplete', onDone);
    Router.events.on('routeChangeError', onDone);

    return () => {
      // remove initial load listener if attached
      try {
        window.removeEventListener('load', onInitialLoad);
      } catch {}
      Router.events.off('routeChangeStart', onStart);
      Router.events.off('routeChangeComplete', onDone);
      Router.events.off('routeChangeError', onDone);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 w-full h-full">
        <Loader text="جاري التحميل..." />
    </div>
  );
}
