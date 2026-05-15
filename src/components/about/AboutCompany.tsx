import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const fields = ['established', 'registered', 'brn', 'address', 'contact'] as const;

export default function AboutCompany() {
  const t = useTranslations('AboutCompany');

  return (
    <section className="py-20 sm:py-24 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-[760px] mx-auto">
        <FadeIn>
          <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
            {t('label')}
          </p>
          <h2 className="text-3xl sm:text-[2.4rem] font-[800] leading-[1.1] tracking-tight">
            {t('h2')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <dl className="grid sm:grid-cols-[180px_1fr] gap-x-8 gap-y-4 sm:gap-y-5 mt-10">
              {fields.map((field) => {
                const valueRaw = t(`${field}_v`);
                const isEmail = field === 'contact';
                const isAddress = field === 'address';
                const mapHref = `https://map.naver.com/v5/search/${encodeURIComponent(
                  '396 Seocho-daero 16F Seocho-gu Seoul',
                )}`;
                return (
                  <div key={field} className="contents">
                    <dt className="text-[11px] font-bold tracking-[.18em] uppercase text-neutral-500 sm:pt-0.5">
                      {t(`${field}_l`)}
                    </dt>
                    <dd className="text-[14px] sm:text-[15px] text-neutral-800 font-light leading-relaxed">
                      {isEmail ? (
                        <a
                          href={`mailto:${valueRaw}`}
                          className="hover:text-black underline-offset-4 hover:underline transition-colors"
                        >
                          {valueRaw}
                        </a>
                      ) : (
                        <>
                          {valueRaw}
                          {isAddress && (
                            <>
                              {' '}
                              <a
                                href={mapHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[12px] font-semibold tracking-wide text-neutral-500 hover:text-black underline-offset-4 hover:underline transition-colors ml-1 whitespace-nowrap"
                              >
                                {t('map_label')}
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M7 17 17 7M9 7h8v8" />
                                </svg>
                              </a>
                            </>
                          )}
                        </>
                      )}
                    </dd>
                  </div>
                );
              })}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
