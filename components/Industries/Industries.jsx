import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/FadeIn/FadeIn';

const industryIcons = [
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-4h6v4" /><path d="M9 10h1" /><path d="M14 10h1" /><path d="M9 14h1" /><path d="M14 14h1" /></svg>, color: 'primary', key: 'banking' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="12" y1="2" x2="12" y2="22" /></svg>, color: 'secondary', key: 'tech' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="14" height="14" rx="2" /><circle cx="11" cy="11" r="2" /><path d="M11 4v3" /><path d="M11 15v3" /><path d="M4 11h3" /><path d="M15 11h3" /></svg>, color: 'navy', key: 'auto' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 6 10-12h-9l1-6z" /></svg>, color: 'primary', key: 'energy' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h3l3-9 4 18 3-9h3" /></svg>, color: 'secondary', key: 'health' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9" /><path d="M2 11h18" /><path d="M11 2a15 15 0 0 1 4 9 15 15 0 0 1-4 9" /><path d="M11 2a15 15 0 0 0-4 9 15 15 0 0 0 4 9" /></svg>, color: 'navy', key: 'travel' },
];

const iconBg = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  navy: 'bg-navy/8 text-navy',
};

export default function Industries() {
  const t = useTranslations('Industries');

  return (
    <section id="industries" className="py-20 bg-bg-light">
      <Container>
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} center />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {industryIcons.map((item) => (
            <FadeIn key={item.key}>
              <div className="bg-white rounded-[10px] p-8 px-[26px] shadow-[0_4px_24px_rgba(10,22,40,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_36px_rgba(10,22,40,0.1)]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-[18px] text-xl ${iconBg[item.color]}`}>
                  {item.icon}
                </div>
                <h3 className="text-[1.05rem] font-semibold mb-2 text-navy">{t(`${item.key}Title`)}</h3>
                <p className="text-[0.85rem] text-text leading-[1.65]">{t(`${item.key}Desc`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
