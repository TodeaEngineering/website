import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/FadeIn/FadeIn';

const steps = [
  { num: 1, numBg: 'bg-primary', key: 'step1' },
  { num: 2, numBg: 'bg-secondary', key: 'step2' },
  { num: 3, numBg: 'bg-navy', key: 'step3' },
];

export default function Approach() {
  const t = useTranslations('Approach');

  return (
    <section id="approach" className="py-20">
      <Container>
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} center />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {steps.map((s) => (
            <FadeIn key={s.num}>
              <div className="text-center p-9 px-6 rounded-[10px] bg-white shadow-[0_4px_24px_rgba(10,22,40,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_36px_rgba(10,22,40,0.1)]">
                <div className={`w-[52px] h-[52px] rounded-full mx-auto mb-[18px] flex items-center justify-center text-xl font-extrabold text-white ${s.numBg}`}>
                  {s.num}
                </div>
                <h4 className="text-base font-semibold text-navy mb-2">{t(`${s.key}Title`)}</h4>
                <p className="text-[0.85rem] text-text leading-[1.6]">{t(`${s.key}Desc`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
