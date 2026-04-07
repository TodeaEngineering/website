'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'granted');
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'denied');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-[480px] mx-auto bg-neutral-900 text-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-lg">
        <p className="text-[13px] font-light leading-snug flex-1">
          {t('message')}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-[12px] text-neutral-400 hover:text-white transition-colors px-3 py-1.5"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="text-[12px] font-semibold bg-brand text-white px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
