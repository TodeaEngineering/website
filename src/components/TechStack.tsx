'use client';

import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

const techs = [
  { name: 'AWS', img: '/icons/aws.svg' },
  { name: 'Google Cloud', img: '/icons/googlecloud.svg' },
  { name: 'Azure', img: '/icons/azure.svg' },
  { name: 'Naver Cloud', img: '/icons/naver.svg' },
  { name: 'Kubernetes', img: '/icons/kubernetes.svg' },
  { name: 'Docker', img: '/icons/docker.svg' },
  { name: 'Helm', img: '/icons/helm.svg' },
  { name: 'KEDA', img: '/icons/keda.svg' },
  { name: 'Kyverno', img: '/icons/kyverno.svg' },
  { name: 'Cert-Manager', img: '/icons/cert-manager.svg' },
  { name: 'CoreDNS', img: '/icons/coredns.svg' },
  { name: 'Vault', img: '/icons/vault.svg' },
  { name: 'ArgoCD', img: '/icons/argocd.svg' },
  { name: 'Flux', img: '/icons/flux.svg' },
  { name: 'GitHub Actions', img: '/icons/githubactions.svg' },
  { name: 'Prometheus', img: '/icons/prometheus.svg' },
  { name: 'Grafana', img: '/icons/grafana.svg' },
  { name: 'OpenTelemetry', img: '/icons/opentelemetry.svg' },
  { name: 'Datadog', img: '/icons/datadog.svg' },
  { name: 'Fluentd', img: '/icons/fluentd.svg' },
  { name: 'Terraform', img: '/icons/terraform.svg' },
  { name: 'Crossplane', img: '/icons/crossplane.svg' },
  { name: 'OpenStack', img: '/icons/openstack.svg' },
  { name: 'Linux', img: '/icons/linux.svg' },
];

const row1 = techs.slice(0, 13);
const row2 = techs.slice(13);

function CarouselRow({ items, reverse }: { items: typeof techs; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        className={`flex gap-3 sm:gap-4 w-max ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex flex-col items-center justify-center gap-2.5 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] shrink-0 rounded-xl border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-transparent"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.img}
              alt={tech.name}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
              loading="lazy"
            />
            <span className="text-[11px] font-semibold text-neutral-600 text-center leading-tight px-1">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const t = useTranslations('TechStack');

  return (
    <section id="expertise" className="py-20 sm:py-24 border-t border-neutral-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="max-w-xl mb-12 mx-auto text-center">
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase mb-3">
              {t('label')}
            </p>
            <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-5">
              {t('title')}
            </h2>
            <p className="text-[15px] text-neutral-500 font-light leading-relaxed">{t('subtitle')}</p>
          </div>
        </FadeIn>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <CarouselRow items={row1} />
        <CarouselRow items={row2} reverse />
      </div>
    </section>
  );
}
