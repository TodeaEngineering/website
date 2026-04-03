'use client';

import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useContactModal } from './ContactModalProvider';
import Button from '@/components/ui/Button';

const inputClasses =
  'w-full py-[11px] px-[15px] rounded-[5px] border-[1.5px] border-border text-sm font-[inherit] text-navy bg-white transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,184,255,0.1)]';

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const t = useTranslations('Contact');
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeModal]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (executeRecaptcha) {
      const token = await executeRecaptcha('contact_form');
      // TODO: Send token to your backend for verification
      console.log('reCAPTCHA token:', token);
    }

    alert(t('thankYou'));
    closeModal();
  }, [executeRecaptcha, t, closeModal]);

  if (!isOpen) return null;

  const serviceOptions = [
    t('optCloud'), t('optSoftware'), t('optConsulting'),
    t('optDevops'), t('optK8s'), t('optSecurity'), t('optChat'),
  ];

  const contactItems = [
    {
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
      title: t('emailLabel'), info: t('emailValue'),
    },
    {
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
      title: t('locationLabel'), info: t('locationValue'),
    },
    {
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
      title: t('responseLabel'), info: t('responseValue'),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      onClick={closeModal}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-[12px] shadow-[0_20px_60px_rgba(10,22,40,0.2)] w-full max-w-[540px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-bg-light text-text hover:text-navy transition-colors duration-200 cursor-pointer border-none z-10"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18" /><path d="M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 pt-10">
          {/* Header */}
          <h2 className="text-[1.4rem] font-semibold text-navy mb-1">{t('title')}</h2>
          <p className="text-[0.85rem] text-text mb-6">{t('subtitle')}</p>

          {/* Form */}
          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.8rem] font-semibold text-navy mb-[5px]">{t('name')}</label>
                <input type="text" placeholder={t('namePlaceholder')} required className={inputClasses} />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-navy mb-[5px]">{t('company')}</label>
                <input type="text" placeholder={t('companyPlaceholder')} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className="block text-[0.8rem] font-semibold text-navy mb-[5px]">{t('email')}</label>
              <input type="email" placeholder={t('emailPlaceholder')} required className={inputClasses} />
            </div>
            <div>
              <label className="block text-[0.8rem] font-semibold text-navy mb-[5px]">{t('lookingFor')}</label>
              <select className={inputClasses}>
                {serviceOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[0.8rem] font-semibold text-navy mb-[5px]">{t('tellMore')}</label>
              <textarea placeholder={t('tellMorePlaceholder')} className={`${inputClasses} resize-y min-h-[80px]`} />
            </div>
            <Button type="submit">{t('send')} &rarr;</Button>
          </form>
        </div>

        {/* Footer info bar */}
        <div className="bg-bg-light border-t border-border px-8 py-4 rounded-b-[12px]">
          <div className="flex flex-wrap gap-6 justify-center">
            {contactItems.map((item) => (
              <div key={item.title} className="flex gap-2 items-center">
                <span className="text-primary">{item.icon}</span>
                <span className="text-[0.78rem] text-text">{item.info}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
