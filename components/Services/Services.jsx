import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/FadeIn/FadeIn';

const serviceIcons = [
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>, color: 'primary', key: 'cloud' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, color: 'secondary', key: 'software' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>, color: 'navy', key: 'consulting' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6" /></svg>, color: 'primary', key: 'devops' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, color: 'secondary', key: 'k8s' },
  { icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, color: 'navy', key: 'security' },
];

const iconBg = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  navy: 'bg-navy/8 text-navy',
};

export default function Services() {
  const t = useTranslations('Services');

  return (
    <section id="services" className="py-20 bg-bg-light">
      <Container>
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} center />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {serviceIcons.map((s) => (
            <FadeIn key={s.key}>
              <div className="bg-white rounded-[10px] p-8 px-[26px] shadow-[0_4px_24px_rgba(10,22,40,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_36px_rgba(10,22,40,0.1)]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-[18px] text-xl ${iconBg[s.color]}`}>
                  {s.icon}
                </div>
                <h3 className="text-[1.05rem] font-semibold mb-2 text-navy">{t(`${s.key}Title`)}</h3>
                <p className="text-[0.85rem] text-text leading-[1.65]">{t(`${s.key}Desc`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
