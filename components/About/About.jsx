import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/FadeIn/FadeIn';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="py-20 bg-bg-light">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] max-md:gap-8 items-center">
          <FadeIn>
            <div className="rounded-[10px] overflow-hidden bg-gradient-to-br from-bg-light to-[#d4ecf8] p-12 px-9 text-center min-h-[340px] flex flex-col items-center justify-center relative">
              <div className="absolute -top-10 -right-10 w-[160px] h-[160px] rounded-full bg-primary/8" />
              <div className="relative z-10 text-[1.6rem] font-bold text-navy leading-[1.3] whitespace-pre-line">
                {t('missionTitle')}
              </div>
              <div className="relative z-10 text-[0.9rem] text-text mt-3">
                {t('missionSub')}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div>
              <div className="text-xs font-bold tracking-[1.5px] uppercase text-primary mb-2.5">{t('label')}</div>
              <h2 className="text-[1.9rem] font-semibold mb-[18px] text-navy">{t('title')}</h2>
              <p className="text-[0.92rem] text-text leading-[1.75] mb-3">{t('p1')}</p>
              <p className="text-[0.92rem] text-text leading-[1.75] mb-3">{t('p2')}</p>
              <p className="text-[0.92rem] text-text leading-[1.75]">{t('p3')}</p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
