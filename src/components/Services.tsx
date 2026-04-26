import { useTranslations, useLocale } from 'next-intl';
import FadeIn from './FadeIn';

type Service = {
  key: string;
  bullets: string[];
};

const services: Service[] = [
  { key: 's1', bullets: ['s1_b1', 's1_b2', 's1_b3'] },
  { key: 's2', bullets: ['s2_b1', 's2_b2', 's2_b3'] },
  { key: 's3', bullets: ['s3_b1', 's3_b2', 's3_b3'] },
];

const cardThemes = [
  'bg-white border-neutral-200 hover:border-black',
  'bg-neutral-50 border-neutral-200 hover:border-black',
  'bg-black text-white border-black hover:bg-neutral-900',
];

export default function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();

  return (
    <section id="services" className="py-24 sm:py-32 px-6 border-t border-neutral-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="mb-14">
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[3rem] font-[800] leading-[1.05] tracking-tight">
              {t('h2')}
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const isDark = i === 2;
            const theme = cardThemes[i];
            return (
              <FadeIn key={svc.key} delay={i * 0.1}>
                <a
                  href={`/${locale}/services`}
                  className={`group relative flex flex-col h-full border rounded-2xl p-7 sm:p-8 transition-all duration-300 ${theme}`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-[12px] font-bold tracking-[.05em] ${
                        isDark
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`transition-all duration-300 group-hover:translate-x-1 ${
                        isDark ? 'text-white/60 group-hover:text-white' : 'text-neutral-300 group-hover:text-black'
                      }`}
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-[22px] sm:text-2xl font-bold tracking-tight mb-3 leading-tight">
                    {t(`${svc.key}_t`)}
                  </h3>
                  <p
                    className={`text-[14px] font-light leading-relaxed mb-6 ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {t(`${svc.key}_d`)}
                  </p>
                  <ul className={`space-y-2.5 mt-auto pt-6 border-t ${isDark ? 'border-white/15' : 'border-neutral-200'}`}>
                    {svc.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${
                          isDark ? 'text-neutral-300' : 'text-neutral-700'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[7px] inline-block w-1 h-1 rounded-full shrink-0 ${
                            isDark ? 'bg-white/60' : 'bg-black/60'
                          }`}
                        />
                        <span>{t(`${svc.key}_${b.split('_')[1]}`)}</span>
                      </li>
                    ))}
                  </ul>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
