import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/FadeIn/FadeIn';

const techs = [
  // Cloud Platforms
  { name: 'AWS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Google Cloud', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Azure', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Naver Cloud', img: 'https://cdn.simpleicons.org/naver/03C75A' },
  // Container & Orchestration
  { name: 'Kubernetes', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
  { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Helm', img: 'https://cdn.simpleicons.org/helm/0F1689' },
  { name: 'KEDA', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/keda/icon/color/keda-icon-color.svg' },
  // Networking & Security
  { name: 'Linkerd', img: 'https://cdn.simpleicons.org/linkerd/2BEDA7' },
  { name: 'Kyverno', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/kyverno/icon/color/kyverno-icon-color.svg' },
  { name: 'Cert-Manager', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/cert-manager/icon/color/cert-manager-icon-color.svg' },
  { name: 'CoreDNS', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/coredns/icon/color/coredns-icon-color.svg' },
  { name: 'Vault', img: 'https://cdn.simpleicons.org/vault/FFEC6E' },
  // GitOps & CI/CD
  { name: 'ArgoCD', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg' },
  { name: 'Flux', img: 'https://cdn.simpleicons.org/flux/5468FF' },
  { name: 'GitHub Actions', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
  // Observability
  { name: 'Prometheus', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' },
  { name: 'Grafana', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg' },
  { name: 'OpenTelemetry', img: 'https://cdn.simpleicons.org/opentelemetry/F5A800' },
  { name: 'Datadog', img: 'https://cdn.simpleicons.org/datadog/632CA6' },
  { name: 'Fluentd', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/fluentd/icon/color/fluentd-icon-color.svg' },
  // Infrastructure as Code
  { name: 'Terraform', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'Crossplane', img: 'https://raw.githubusercontent.com/cncf/artwork/master/projects/crossplane/icon/color/crossplane-icon-color.svg' },
  { name: 'OpenStack', img: 'https://cdn.simpleicons.org/openstack/ED1944' },
  // App Runtime
  { name: 'Linux', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

export default function TechStack() {
  const t = useTranslations('TechStack');

  return (
    <section id="tech" className="py-20">
      <Container>
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} center />
        <FadeIn>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-5 max-w-[820px] mx-auto max-md:gap-3.5">
            {techs.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-2.5 py-6 px-3 max-md:py-[18px] max-md:px-2 rounded-[10px] bg-white border border-border transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_36px_rgba(10,22,40,0.1)] hover:border-transparent"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tech.img} alt={tech.name} className="w-10 h-10 max-md:w-8 max-md:h-8 object-contain" />
                <span className="text-xs font-semibold text-navy text-center leading-[1.3]">{tech.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
