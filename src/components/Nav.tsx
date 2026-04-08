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
            <img src="/Logo.svg" alt="Todea" className="w-40 sm:w-48" width="192" height="40" />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#services" className="text-[13px] text-neutral-600 hover:text-black transition-colors">
              {t('services')}
            </a>
            <a href="#approach" className="text-[13px] text-neutral-600 hover:text-black transition-colors">
              {t('approach')}
            </a>
            <a href="#expertise" className="text-[13px] text-neutral-600 hover:text-black transition-colors">
              {t('expertise')}
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

            <a href="mailto:ivan@todea.co.kr" className="text-[13px] font-semibold bg-brand text-white px-5 py-2 rounded-full hover:opacity-80 transition-opacity">
              {t('contact')}
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <svg width="18" height="12" fill="none">
              <line y1=".75" x2="18" y2=".75" stroke="#000" strokeWidth="1.5" />
              <line y1="5.75" x2="18" y2="5.75" stroke="#000" strokeWidth="1.5" />
              <line y1="10.75" x2="18" y2="10.75" stroke="#000" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-400"
          style={{ maxHeight: mobileOpen ? '350px' : '0' }}
        >
          <div className="pb-5 flex flex-col gap-3">
            <a href="#services" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-600">{t('services')}</a>
            <a href="#approach" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-600">{t('approach')}</a>
            <a href="#expertise" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-600">{t('expertise')}</a>
            <div className="flex gap-2 mt-1">
              {langs.map((l) => (
                <button key={l.code} onClick={() => switchLocale(l.code)} className="text-xs border border-neutral-200 px-2.5 py-1 rounded-full">
                  {l.short}
                </button>
              ))}
            </div>
            <a href="mailto:ivan@todea.co.kr" onClick={() => setMobileOpen(false)} className="text-sm font-semibold bg-brand text-white px-5 py-2 rounded-full text-center">
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
