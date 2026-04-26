import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  return (
    <section className="min-h-screen flex items-center pt-[60px] px-6 bg-gradient-to-br from-neutral-200 via-neutral-50 to-neutral-200">
      <div className="max-w-[1200px] mx-auto w-full py-20 sm:py-28">
        <p
          className="opacity-0 animate-rise text-[13px] text-neutral-600 tracking-wide mb-8"
          style={{ animationDelay: '0.1s' }}
        >
          {t('tag')}
        </p>
        <h1
          className="opacity-0 animate-rise text-[clamp(2.6rem,7vw,5.5rem)] font-[800] leading-[1.05] tracking-tight max-w-[820px]"
          style={{ animationDelay: '0.22s' }}
        >
          {t('h1')}
        </h1>
        <div
          className="opacity-0 animate-rise space-y-4 mt-8 max-w-[640px]"
          style={{ animationDelay: '0.34s' }}
        >
          {(t('sub').match(/[^.。]+[.。]/g) ?? [t('sub')]).map((s, i) => (
            <p
              key={i}
              className="text-[17px] sm:text-lg text-neutral-600 font-light leading-relaxed"
            >
              {s.trim()}
            </p>
          ))}
        </div>
        <div
          className="opacity-0 animate-rise flex flex-wrap gap-3 mt-10"
          style={{ animationDelay: '0.46s' }}
        >
          <a
            href={`/${locale}/services`}
            className="bg-brand text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            {t('cta1')}
          </a>
          <a
            href={`/${locale}/contact`}
            className="text-[13px] font-semibold text-black border border-neutral-300 px-6 py-3 rounded-full hover:border-black transition-colors"
          >
            {t('cta2')}
          </a>
        </div>
      </div>
    </section>
  );
}
