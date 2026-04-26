import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const beliefs = ['b1', 'b2', 'b3', 'b4'] as const;

export default function AboutBeliefs() {
  const t = useTranslations('AboutBeliefs');

  return (
    <section className="py-24 sm:py-32 px-6 bg-gradient-to-b from-neutral-50 via-neutral-50 to-white border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight max-w-[760px]">
              {t('h2')}
            </h2>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {beliefs.map((b, i) => (
            <FadeIn key={b} delay={i * 0.06}>
              <div className="group relative h-full bg-white border border-neutral-200 rounded-2xl p-7 sm:p-8 hover:border-black transition-colors duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 text-[140px] sm:text-[160px] font-[800] leading-none text-black/[0.03] tracking-tighter pointer-events-none select-none -mr-3 -mt-2">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-[12px] font-bold tracking-[.05em] mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 leading-tight">
                    {t(`${b}_t`)}
                  </h3>
                  <p className="text-[14px] text-neutral-600 font-light leading-relaxed">
                    {t(`${b}_d`)}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
