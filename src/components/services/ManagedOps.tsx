import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const steps = ['step1', 'step2', 'step3'];
const benefits = ['b1', 'b2', 'b3'];

const benefitIcons: Record<string, JSX.Element> = {
  b1: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  b2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  b3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  ),
};

export default function ManagedOps() {
  const t = useTranslations('ManagedOps');

  return (
    <section className="py-20 sm:py-24 px-6 border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-6 mb-16">
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
                {t('label')}
              </p>
              <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight">
                {t('h2')}
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex items-end">
              <p className="text-[15px] text-neutral-600 font-light leading-relaxed">
                {t('desc')}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Process flow */}
        <FadeIn delay={0.08}>
          <h3 className="text-[11px] font-semibold tracking-[.2em] text-neutral-500 uppercase mb-6">
            {t('process_heading')}
          </h3>
          <div className="relative grid md:grid-cols-3 gap-4 md:gap-0 mb-16">
            {steps.map((step, i) => (
              <div key={step} className="relative">
                <div
                  className={`relative bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 h-full ${
                    i < steps.length - 1 ? 'md:mr-6' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-[.2em] text-neutral-500 uppercase">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="text-[17px] font-bold tracking-tight mb-2">
                    {t(`${step}_t`)}
                  </h4>
                  <p className="text-[13.5px] text-neutral-600 font-light leading-relaxed">
                    {t(`${step}_d`)}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 items-center justify-center w-7 h-7 rounded-full bg-black text-white translate-x-1/2 z-10"
                  >
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Benefits */}
        <FadeIn delay={0.12}>
          <h3 className="text-[11px] font-semibold tracking-[.2em] text-neutral-500 uppercase mb-6">
            {t('benefits_heading')}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((b) => (
              <div
                key={b}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 sm:p-7 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-black text-white mb-5">
                  {benefitIcons[b]}
                </div>
                <h4 className="text-[16px] font-bold tracking-tight mb-2">{t(`${b}_t`)}</h4>
                <p className="text-[13.5px] text-neutral-600 font-light leading-relaxed">
                  {t(`${b}_d`)}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
