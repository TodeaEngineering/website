import { useTranslations } from 'next-intl';
import { LOGO_SRC } from '@/components/logo';
import Container from '@/components/ui/Container';

const socials = [
  { label: 'LinkedIn', text: 'in' },
  { label: 'Twitter', text: 'X' },
  { label: 'GitHub', text: 'GH' },
];

export default function Footer() {
  const t = useTranslations('Footer');

  const serviceLinks = [
    t('cloudArch'), t('softwareDev'), t('itConsulting'),
    t('devops'), t('kubernetes'), t('security'),
  ];

  const companyLinks = [
    { label: t('about'), href: '#about' },
    { label: t('howWeWork'), href: '#approach' },
    { label: t('techStack'), href: '#tech' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <footer className="bg-navy text-white pt-[60px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 pb-9 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2.5 text-[1.25rem] font-bold text-white mb-3">
              <img className="h-6 w-auto brightness-0 invert" src={LOGO_SRC} alt="TODEA" />
            </div>
            <p className="text-[0.82rem] text-white/40 leading-[1.7] max-w-[280px]">{t('description')}</p>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-bold tracking-[1.5px] uppercase text-white/30 mb-4">{t('servicesTitle')}</h4>
            <ul className="list-none flex flex-col gap-[9px]">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[0.82rem] text-white/55 hover:text-primary transition-colors duration-200">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-bold tracking-[1.5px] uppercase text-white/30 mb-4">{t('companyTitle')}</h4>
            <ul className="list-none flex flex-col gap-[9px]">
              {companyLinks.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="text-[0.82rem] text-white/55 hover:text-primary transition-colors duration-200">{c.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center py-5 text-[0.78rem] text-white/25">
          <span>{t('copyright')}</span>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8 h-8 rounded-[6px] bg-white/5 flex items-center justify-center text-white/40 text-[0.78rem] hover:bg-primary/20 hover:text-primary transition-all duration-200"
              >
                {s.text}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
