import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

export default function CTA() {
  const t = useTranslations('CTA');
  const nav = useTranslations('Nav');

  return (
    <section className="py-28 sm:py-36 px-6 bg-gradient-to-b from-neutral-200 to-neutral-50">
      <FadeIn>
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[13px] text-neutral-600 mb-5">{t('sub')}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight leading-[1.1] mb-8">
            {t('h2')}
          </h2>
          <a
            href="mailto:ivan@todea.co.kr"
            className="inline-block bg-brand text-white text-[13px] font-semibold px-7 py-3.5 rounded-full hover:opacity-80 transition-opacity"
          >
            {nav('contact')}
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
