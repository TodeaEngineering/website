import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

export default function Contact() {
  const t = useTranslations('Contact');

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
            <div className="flex items-center justify-center">
              <a
                href="mailto:hello@todea.co.kr"
                className="bg-brand text-white text-[13px] font-semibold px-7 py-3 rounded-full hover:opacity-80 transition-opacity inline-block"
              >
                {t('f_submit')}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
