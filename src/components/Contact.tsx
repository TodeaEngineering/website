'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

export default function Contact() {
  const t = useTranslations('Contact');
  const [sent, setSent] = useState(false);

  const opts = Array.from({ length: 8 }, (_, i) => t(`f_opts_${i}`));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <div>
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase mb-3">
                {t('label')}
              </p>
              <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-5">
                {t('h2')}
              </h2>
              <p className="text-[15px] text-neutral-500 font-light leading-relaxed mb-12">{t('desc')}</p>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold tracking-[.15em] text-neutral-400 uppercase mb-1">
                    {t('email_l')}
                  </p>
                  <a href="mailto:hello@todea.co.kr" className="text-[15px] font-medium uline pb-0.5">
                    hello@todea.co.kr
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[.15em] text-neutral-400 uppercase mb-1">
                    {t('loc_l')}
                  </p>
                  <p className="text-[15px] text-neutral-500 font-light">{t('loc_v')}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[.15em] text-neutral-400 uppercase mb-1">
                    {t('tz_l')}
                  </p>
                  <p className="text-[15px] text-neutral-500 font-light">{t('tz_v')}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[.12em] text-neutral-400 uppercase mb-1.5">
                    {t('f_name')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-b border-neutral-200 bg-transparent py-2.5 text-[14px] focus:border-brand transition-colors outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-[.12em] text-neutral-400 uppercase mb-1.5">
                    {t('f_company')}
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-neutral-200 bg-transparent py-2.5 text-[14px] focus:border-brand transition-colors outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-[.12em] text-neutral-400 uppercase mb-1.5">
                  {t('f_email')}
                </label>
                <input
                  type="email"
                  required
                  className="w-full border-b border-neutral-200 bg-transparent py-2.5 text-[14px] focus:border-brand transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-[.12em] text-neutral-400 uppercase mb-1.5">
                  {t('f_interest')}
                </label>
                <select className="w-full border-b border-neutral-200 bg-transparent py-2.5 text-[14px] text-neutral-500 focus:border-brand transition-colors outline-none appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%3E%3Cpath%20d%3D%22M1%203l4%204%204-4%22%20stroke%3D%22%23999%22%20fill%3D%22none%22%20stroke-width%3D%221.2%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0_center]">
                  {opts.map((opt, i) => (
                    <option key={i} value={i === 0 ? '' : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-[.12em] text-neutral-400 uppercase mb-1.5">
                  {t('f_msg')}
                </label>
                <textarea
                  rows={3}
                  placeholder={t('f_msg_ph')}
                  className="w-full border-b border-neutral-200 bg-transparent py-2.5 text-[14px] focus:border-brand transition-colors outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className={`bg-brand text-white text-[13px] font-semibold px-7 py-3 rounded-full transition-opacity mt-4 ${
                  sent ? 'opacity-50 cursor-default' : 'hover:opacity-80'
                }`}
              >
                {sent ? t('f_sent') : t('f_submit')}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
