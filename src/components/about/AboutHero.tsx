import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ivanporta/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/GTRekter',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function AboutHero() {
  const t = useTranslations('About');

  return (
    <>
      {/* Hero */}
      <section className="pt-[140px] pb-24 sm:pb-32 px-6 bg-gradient-to-br from-neutral-200 via-neutral-50 to-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <p
            className="opacity-0 animate-rise text-[13px] text-neutral-600 tracking-wide mb-8"
            style={{ animationDelay: '0.1s' }}
          >
            {t('label')}
          </p>
          <h1
            className="opacity-0 animate-rise text-[clamp(2.6rem,7vw,5.5rem)] font-[800] leading-[1.05] tracking-tight max-w-[820px]"
            style={{ animationDelay: '0.22s' }}
          >
            {t('h1')}
          </h1>
          <p
            className="opacity-0 animate-rise text-[17px] sm:text-lg text-neutral-600 font-light leading-relaxed max-w-[560px] mt-8"
            style={{ animationDelay: '0.34s' }}
          >
            {t('sub')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32 px-6 bg-white border-t border-neutral-100">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <div className="text-center">
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
                {t('story_label')}
              </p>
              <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight">
                {t('story_h2')}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="flex flex-col gap-6 mt-10">
              <p className="text-[18px] sm:text-[20px] text-black font-medium italic leading-snug tracking-tight">
                {t('story_lead')}
              </p>
              <p className="text-[15px] text-neutral-600 font-light leading-relaxed">
                {t('story_p1')}
              </p>
              <p className="text-[15px] text-neutral-600 font-light leading-relaxed">
                {t('story_p2')}
              </p>

              {/* Founder byline */}
              <div className="flex items-center gap-4 mt-4 pt-8 border-t border-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/ivan-porta.jpg"
                  alt="Ivan Porta"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold tracking-tight">
                    {t('byline_name')}
                  </p>
                  <p className="text-[12px] text-neutral-500 font-light">
                    {t('byline_role')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-black transition-colors p-2 -m-2"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
