'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = locales.find((l) => l.code === currentLocale) || locales[0];

  function switchLocale(newLocale) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setOpen(false);
  }

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-text hover:text-navy rounded-[5px] border border-border bg-white cursor-pointer transition-colors duration-200"
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-[5px] shadow-[0_4px_24px_rgba(10,22,40,0.08)] overflow-hidden z-50 min-w-[130px]">
          {locales.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium cursor-pointer border-none transition-colors duration-150 ${
                currentLocale === code
                  ? 'bg-bg-light text-navy font-semibold'
                  : 'bg-white text-text hover:bg-bg-lighter hover:text-navy'
              }`}
            >
              <span>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
