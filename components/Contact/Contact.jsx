'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/FadeIn/FadeIn';
import { useContactModal } from '@/components/ContactModal/ContactModalProvider';

export default function Contact() {
  const t = useTranslations('Contact');
  const { openModal } = useContactModal();

  return (
    <section id="contact" className="py-20">
      <Container>
        <FadeIn>
          <div className="text-center max-w-[520px] mx-auto">
            <div className="text-xs font-bold tracking-[1.5px] uppercase text-primary mb-2.5">
              {t('label')}
            </div>
            <h2 className="text-[2rem] max-md:text-[1.6rem] font-semibold tracking-tight leading-[1.25] text-navy mb-3.5">
              {t('title')}
            </h2>
            <p className="text-[0.95rem] text-text leading-[1.7] mb-8">
              {t('subtitle')}
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[5px] text-sm font-semibold bg-primary text-white border-none cursor-pointer transition-all duration-250 hover:bg-primary-hover"
            >
              {t('bookCall')} &rarr;
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
