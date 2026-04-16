import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const events = [
  { name: 'KCD Kuala Lumpur 2026', detail: 'June 2026 · Kuala Lumpur' },
  { name: 'Cloud Native Kuala Lumpur 2026', detail: 'April 2026 · Kuala Lumpur' },
  { name: 'Cloud Native Kolkata 2026', detail: 'March 2026 · Virtual' },
  { name: 'KubeCon + CloudNativeCon NA 2025', detail: 'November 2025 · Atlanta' },
  { name: 'KCD Seoul 2025', detail: 'May 2025 · Seoul' },
];

export default function AboutCredentials() {
  const t = useTranslations('AboutCredentials');

  return (
    <section className="py-24 sm:py-32 px-6 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-6">
              {t('h2')}
            </h2>
            <p className="text-[15px] text-neutral-600 font-light leading-relaxed">
              {t('desc')}
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="border-t border-neutral-200">
              {events.map((event, i) => (
                <div
                  key={event.name}
                  className={`border-neutral-200 py-7 group ${i === events.length - 1 ? 'border-b' : 'border-b'}`}
                >
                  <p className="text-[15px] font-bold tracking-tight group-hover:translate-x-0.5 transition-transform duration-300">
                    {event.name}
                  </p>
                  <p className="text-[13px] text-neutral-500 font-light mt-1">
                    {event.detail}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
