'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/FadeIn/FadeIn';
import { useContactModal } from '@/components/ContactModal/ContactModalProvider';

export default function CtaBanner() {
  const t = useTranslations('CtaBanner');
  const { openModal } = useContactModal();

  return (
    <section className="pt-12 pb-20">
      <Container>
        <FadeIn>
          <div className="bg-navy rounded-[10px] py-[60px] px-[52px] max-md:flex-col max-md:p-9 max-md:text-center flex items-center justify-between gap-9 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.25)_0%,transparent_70%)]" />
            <div className="absolute -bottom-[60px] left-[40%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,184,255,0.15)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-[1.8rem] font-semibold text-white mb-2.5">{t('title')}</h2>
              <p className="text-[0.92rem] text-white/55 leading-[1.65] max-w-[460px]">{t('description')}</p>
            </div>
            <button
              onClick={openModal}
              className="relative z-10 whitespace-nowrap inline-flex items-center gap-2 px-[22px] py-[9px] rounded-[5px] text-sm font-semibold bg-primary text-white border-none cursor-pointer transition-all duration-250 hover:bg-primary-hover"
            >
              {t('cta')} &rarr;
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
