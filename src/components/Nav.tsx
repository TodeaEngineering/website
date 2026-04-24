'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

const langs = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ko', label: '한국어', short: '한국어' },
  { code: 'ja', label: '日本語', short: '日本語' },
  { code: 'zh', label: '中文', short: '中文' },
];

export default function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = langs.find((l) => l.code === locale) || langs[0];

  function switchLocale(code: string) {
    router.replace(pathname, { locale: code });
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 border-b border-neutral-100 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          <a href={`/${locale}`} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo.svg" alt="Todea" className="w-40 sm:w-48" width="192" height="40" fetchPriority="high" />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            <a href={`/${locale}/services`} className="text-[13px] text-neutral-600 hover:text-black transition-colors">
              {t('services')}
            </a>
            <a href={`/${locale}/blog`} className="text-[13px] text-neutral-600 hover:text-black transition-colors">
              {t('blog')}
            </a>

            {/* Lang switcher */}
            <div className="relative group">
              <button className="text-[13px] text-neutral-600 hover:text-black transition-colors flex items-center gap-1">
                {currentLang.short}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <div className="absolute top-full right-0 pt-1 bg-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 min-w-[120px] translate-y-[-4px] group-hover:translate-y-0">
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`block w-full text-left px-3.5 py-2 text-[13px] hover:bg-neutral-50 transition-colors ${
                      l.code === locale ? 'text-black font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              </div>
            </div>

            <a href={`/${locale}/contact`} className="text-[13px] font-semibold bg-brand text-white px-5 py-2 rounded-full hover:opacity-80 transition-opacity">
              {t('contact')}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <line y1=".75" x2="20" y2=".75" stroke="#000" strokeWidth="1.5" />
                <line y1="6.75" x2="20" y2="6.75" stroke="#000" strokeWidth="1.5" />
                <line y1="12.75" x2="20" y2="12.75" stroke="#000" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-[max-height] duration-300 ease-out -mx-6"
          style={{ maxHeight: mobileOpen ? '600px' : '0' }}
          aria-hidden={!mobileOpen}
        >
          <div className="border-t border-neutral-100 pb-5">
            {/* Primary nav */}
            <a
              href={`/${locale}/services`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-[15px] text-neutral-800 border-b border-neutral-100 active:bg-neutral-50"
            >
              <span>{t('services')}</span>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true" className="text-neutral-300">
                <path d="M1.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href={`/${locale}/blog`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-[15px] text-neutral-800 border-b border-neutral-100 active:bg-neutral-50"
            >
              <span>{t('blog')}</span>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true" className="text-neutral-300">
                <path d="M1.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>

            {/* Language section */}
            <p className="px-6 pt-6 pb-2 text-[10px] font-semibold tracking-[.22em] uppercase text-neutral-400">
              {t('language')}
            </p>
            {langs.map((l) => {
              const isActive = l.code === locale;
              return (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={`flex w-full items-center justify-between px-6 py-3 text-[15px] text-left active:bg-neutral-50 ${
                    isActive ? 'text-black font-medium' : 'text-neutral-500'
                  }`}
                >
                  <span>{l.label}</span>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7.5l3 3 7-8" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}

            {/* CTA */}
            <div className="px-6 pt-6">
              <a
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center text-[15px] font-semibold bg-brand text-white px-5 py-3.5 rounded-full"
              >
                {t('contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
