'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/FadeIn/FadeIn';
import { useContactModal } from '@/components/ContactModal/ContactModalProvider';

function Terminal({ terminalLabel }) {
  return (
    <div className="w-full max-w-[480px] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(10,22,40,0.2)]">
      <div className="bg-[#1a1f2e] flex items-center gap-2 px-4 py-2.5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[0.7rem] text-white/30 font-mono">{terminalLabel}</span>
      </div>
      <div className="bg-navy p-5 font-mono text-[0.78rem] leading-[1.7] overflow-hidden">
        <div>
          <span className="text-[#28c840]">$</span>
          <span className="text-white/80"> kubectl get pods -n production</span>
        </div>
        <div className="mt-3 text-[0.72rem] text-white/40">
          <div>NAME{' '}<span className="ml-16">READY</span><span className="ml-4">STATUS</span><span className="ml-5">AGE</span></div>
        </div>
        <div className="text-[0.72rem] text-[#7dd3fc]">
          <div>api-6d8f9b-x2k9p{'    '}1/1{'   '}Running{'  '}3d</div>
          <div>web-5c4a8d-m7j2n{'    '}1/1{'   '}Running{'  '}3d</div>
          <div>worker-8b2e4f-q5w8{'  '}1/1{'   '}Running{'  '}3d</div>
        </div>
        <div className="mt-3">
          <span className="text-[#28c840]">$</span>
          <span className="text-white/80"> terraform plan</span>
        </div>
        <div className="text-[0.72rem] text-white/40 mt-1">
          <div>Plan: <span className="text-[#28c840]">3 to add</span>, 0 to change, 0 to destroy.</div>
        </div>
        <div className="mt-3">
          <span className="text-[#28c840]">$</span>
          <span className="text-white/50 animate-pulse"> _</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('Hero');
  const { openModal } = useContactModal();

  return (
    <section className="py-20 pb-16 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="max-w-[520px]">
              <h1 className="text-[2.6rem] max-md:text-[2rem] font-semibold leading-[1.2] tracking-tight mb-5 text-navy">
                {t('title')}
              </h1>
              <p className="text-[1.05rem] text-text leading-[1.7] mb-8">
                {t('description')}
              </p>
              <div className="flex gap-3.5 flex-wrap">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 px-[22px] py-[9px] rounded-[5px] text-sm font-semibold bg-primary text-white border-none cursor-pointer transition-all duration-250 hover:bg-primary-hover"
                >
                  {t('cta')} &rarr;
                </button>
                <Button href="#services" variant="outline">{t('secondary')}</Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="flex items-center justify-center max-md:hidden">
              <Terminal terminalLabel={t('terminal')} />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
