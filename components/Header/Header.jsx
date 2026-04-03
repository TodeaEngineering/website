'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LOGO_SRC } from '@/components/logo';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useContactModal } from '@/components/ContactModal/ContactModalProvider';

export default function Header() {
  const t = useTranslations('Header');
  const { openModal } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '#services', label: t('services') },
    { href: '#approach', label: t('howWeWork') },
    { href: '#about', label: t('about') },
    { href: '#tech', label: t('techStack') },
    { href: '#contact', label: t('contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`sticky top-0 w-full z-[1000] bg-bg-lighter border-b border-border transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_16px_rgba(10,22,40,0.06)]' : ''
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <nav className="flex items-center justify-between py-3.5">
          <a href="#" className="flex items-center gap-2.5 text-[1.35rem] font-bold text-navy">
            <img className="h-7 w-auto" src={LOGO_SRC} alt="TODEA" />
          </a>

          <ul className="flex gap-7 items-center list-none max-md:hidden">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-text hover:text-navy transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {menuOpen && (
            <ul className="md:hidden flex flex-col absolute top-full left-0 right-0 bg-bg-lighter p-6 gap-4 border-b border-border shadow-[0_8px_20px_rgba(0,0,0,0.06)] list-none z-50">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-medium text-text hover:text-navy transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={openModal}
              className="max-md:hidden inline-flex items-center gap-2 px-[22px] py-[9px] rounded-[5px] text-sm font-semibold bg-primary text-white border-none cursor-pointer transition-all duration-250 hover:bg-primary-hover"
            >
              {t('getInTouch')}
            </button>
          </div>

          <button
            className="hidden max-md:flex flex-col gap-[5px] cursor-pointer bg-none border-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="w-[22px] h-0.5 bg-navy" />
            <span className="w-[22px] h-0.5 bg-navy" />
            <span className="w-[22px] h-0.5 bg-navy" />
          </button>
        </nav>
      </div>
    </header>
  );
}
