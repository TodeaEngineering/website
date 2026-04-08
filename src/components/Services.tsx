import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

const services = [
  { key: 's1' },
  { key: 's3' },
  { key: 's4' },
  { key: 's5' },
  { key: 's6' },
];

export default function Services() {
  const t = useTranslations('Services');

  return (
    <section id="services" className="py-24 sm:py-32 px-6 border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-6 mb-20">
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
                {t('label')}
              </p>
              <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight">
                {t('h2')}
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex items-end">
              <p className="text-[15px] text-neutral-600 font-light leading-relaxed">{t('desc')}</p>
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-neutral-200">
          {services.map((svc, i) => (
            <FadeIn key={svc.key} delay={i * 0.08}>
              <a
                href="#contact"
                className="svc relative block border-b border-neutral-200 py-7 sm:py-9 grid sm:grid-cols-12 gap-3 sm:gap-6 items-baseline group"
              >
                <span className="sm:col-span-1 text-[12px] text-brand/50 font-medium">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="sm:col-span-4 text-xl sm:text-2xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                  {t(`${svc.key}_t`)}
                </span>
                <span className="sm:col-span-5 sm:col-start-7 text-[14px] text-neutral-600 font-light leading-relaxed">
                  {t(`${svc.key}_d`)}
                </span>
                <span className="sm:col-span-1 hidden sm:flex justify-end text-neutral-300 group-hover:text-brand group-hover:translate-x-0.5 transition-all duration-500">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
