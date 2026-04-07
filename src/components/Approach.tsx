import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

const steps = ['step1', 'step2', 'step3', 'step4'];

export default function Approach() {
  const t = useTranslations('Approach');

  return (
    <section id="approach" className="py-24 sm:py-32 px-6 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-6">
              {t('h2')}
            </h2>
            <p className="text-[15px] text-neutral-500 font-light leading-relaxed">{t('desc')}</p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div>
              {steps.map((step, i) => (
                <div
                  key={step}
                  className={`border-t border-neutral-200 py-7 group ${i === steps.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-[11px] font-bold text-brand/50 mt-1 w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold mb-1 group-hover:translate-x-0.5 transition-transform duration-300">
                        {t(`${step}_t`)}
                      </h3>
                      <p className="text-[14px] text-neutral-500 font-light leading-relaxed">
                        {t(`${step}_d`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
