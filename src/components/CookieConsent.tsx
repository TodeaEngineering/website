'use client';

import { useState, useEffect, useId } from 'react';
import { useTranslations } from 'next-intl';
import { CONSENT_KEY, CONSENT_TTL_MS, type ConsentChoice, type StoredConsent } from '@/lib/consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (
      (parsed.choice === 'granted' || parsed.choice === 'denied') &&
      typeof parsed.timestamp === 'number' &&
      Date.now() - parsed.timestamp < CONSENT_TTL_MS
    ) {
      return parsed as StoredConsent;
    }
  } catch {
    // malformed or legacy plain-string value — fall through to re-prompt
  }
  return null;
}

function writeStoredConsent(choice: ConsentChoice) {
  const value: StoredConsent = { choice, timestamp: Date.now() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
}

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [visible, setVisible] = useState(false);
  const messageId = useId();

  useEffect(() => {
    if (!readStoredConsent()) {
      setVisible(true);
    }
  }, []);

  function accept() {
    writeStoredConsent('granted');
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-G8K3GV4DB2';
      document.head.appendChild(s);
    }
    setVisible(false);
  }

  function decline() {
    writeStoredConsent('denied');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t('regionLabel')}
      className="fixed bottom-0 inset-x-0 z-50 p-4"
    >
      <div className="max-w-[480px] mx-auto bg-neutral-900 text-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-lg">
        <p id={messageId} className="text-[13px] font-light leading-snug flex-1">
          {t('message')}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={decline}
            aria-describedby={messageId}
            className="text-[12px] text-neutral-400 hover:text-white transition-colors px-3 py-1.5"
          >
            {t('decline')}
          </button>
          <button
            type="button"
            onClick={accept}
            aria-describedby={messageId}
            className="text-[12px] font-semibold bg-brand text-white px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
