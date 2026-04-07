'use client';

import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

const techs = [
  { name: 'AWS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Google Cloud', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Azure', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Naver Cloud', img: 'https://cdn.simpleicons.org/naver/03C75A' },
  { name: 'Kubernetes', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
  { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Helm', img: 'https://cdn.simpleicons.org/helm/0F1689' },
  { name: 'KEDA', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/keda/icon/color/keda-icon-color.svg' },
  { name: 'Linkerd', img: 'https://cdn.simpleicons.org/linkerd/2BEDA7' },
  { name: 'Kyverno', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/kyverno/icon/color/kyverno-icon-color.svg' },
  { name: 'Cert-Manager', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/cert-manager/icon/color/cert-manager-icon-color.svg' },
  { name: 'CoreDNS', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/coredns/icon/color/coredns-icon-color.svg' },
  { name: 'Vault', img: 'https://cdn.simpleicons.org/vault/FFEC6E' },
  { name: 'ArgoCD', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg' },
  { name: 'Flux', img: 'https://cdn.simpleicons.org/flux/5468FF' },
  { name: 'GitHub Actions', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
  { name: 'Prometheus', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' },
  { name: 'Grafana', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg' },
  { name: 'OpenTelemetry', img: 'https://cdn.simpleicons.org/opentelemetry/F5A800' },
  { name: 'Datadog', img: 'https://cdn.simpleicons.org/datadog/632CA6' },
  { name: 'Fluentd', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/fluentd/icon/color/fluentd-icon-color.svg' },
  { name: 'Terraform', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'Crossplane', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/crossplane/icon/color/crossplane-icon-color.svg' },
  { name: 'OpenStack', img: 'https://cdn.simpleicons.org/openstack/ED1944' },
  { name: 'Linux', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
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
