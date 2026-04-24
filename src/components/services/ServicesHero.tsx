import { useTranslations, useLocale } from 'next-intl';

export default function ServicesHero() {
  const t = useTranslations('ServicesHero');
  const locale = useLocale();

  return (
    <section className="min-h-[70vh] flex items-center pt-[60px] px-6 bg-gradient-to-br from-neutral-200 via-neutral-50 to-neutral-200">
      <div className="max-w-[1200px] mx-auto w-full py-20 sm:py-28">
        <p
          className="opacity-0 animate-rise text-[13px] text-neutral-600 tracking-wide mb-8"
          style={{ animationDelay: '0.1s' }}
        >
          {t('tag')}
        </p>
        <h1
          className="opacity-0 animate-rise text-[clamp(2.3rem,6vw,4.8rem)] font-[800] leading-[1.05] tracking-tight max-w-[900px]"
          style={{ animationDelay: '0.22s' }}
        >
          {t('h1')}
        </h1>
        <p
          className="opacity-0 animate-rise text-[16px] sm:text-[17px] text-neutral-600 font-light leading-relaxed max-w-[620px] mt-7"
          style={{ animationDelay: '0.34s' }}
        >
          {t('sub')}
        </p>
        <div
          className="opacity-0 animate-rise flex flex-wrap gap-3 mt-10"
          style={{ animationDelay: '0.46s' }}
        >
          <a
            href={`/${locale}/contact`}
            className="bg-brand text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            {t('cta1')}
          </a>
          <a
            href="#tiers"
            className="text-[13px] font-semibold text-black border border-neutral-300 px-6 py-3 rounded-full hover:border-black transition-colors"
          >
            {t('cta2')}
          </a>
        </div>
      </div>
    </section>
  );
}
