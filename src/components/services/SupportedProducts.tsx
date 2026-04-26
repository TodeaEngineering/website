import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';

type Product = { name: string; img: string };

const groups: { key: string; products: Product[] }[] = [
  {
    key: 'g1',
    products: [
      { name: 'AWS', img: '/icons/aws.svg' },
      { name: 'Google Cloud', img: '/icons/googlecloud.svg' },
      { name: 'Azure', img: '/icons/azure.svg' },
      { name: 'Naver Cloud', img: '/icons/naver.svg' },
    ],
  },
  {
    key: 'g2',
    products: [
      { name: 'Kubernetes', img: '/icons/kubernetes.svg' },
      { name: 'OpenShift', img: '/icons/openshift.svg' },
      { name: 'Docker', img: '/icons/docker.svg' },
      { name: 'Helm', img: '/icons/helm.svg' },
    ],
  },
  {
    key: 'g3',
    products: [
      { name: 'ArgoCD', img: '/icons/argocd.svg' },
      { name: 'Flux', img: '/icons/flux.svg' },
      { name: 'GitHub Actions', img: '/icons/githubactions.svg' },
      { name: 'Azure DevOps', img: '/icons/azure-devops.svg' },
      { name: 'Harbor', img: '/icons/harbor.svg' },
    ],
  },
  {
    key: 'g4',
    products: [
      { name: 'Prometheus', img: '/icons/prometheus.svg' },
      { name: 'Grafana', img: '/icons/grafana.svg' },
      { name: 'OpenTelemetry', img: '/icons/opentelemetry.svg' },
      { name: 'Datadog', img: '/icons/datadog.svg' },
      { name: 'Fluentd', img: '/icons/fluentd.svg' },
      { name: 'Elasticsearch', img: '/icons/elasticsearch.svg' },
      { name: 'OpenSearch', img: '/icons/opensearch.svg' },
      { name: 'Kubecost', img: '/icons/kubecost.svg' },
    ],
  },
  {
    key: 'g5',
    products: [
      { name: 'Vault', img: '/icons/vault.svg' },
      { name: 'Kyverno', img: '/icons/kyverno.svg' },
      { name: 'Cert-Manager', img: '/icons/cert-manager.svg' },
    ],
  },
  {
    key: 'g8',
    products: [
      { name: 'Istio', img: '/icons/istio.svg' },
    ],
  },
  {
    key: 'g6',
    products: [
      { name: 'Terraform', img: '/icons/terraform.svg' },
      { name: 'Crossplane', img: '/icons/crossplane.svg' },
      { name: 'Ansible', img: '/icons/ansible.svg' },
    ],
  },
  {
    key: 'g7',
    products: [
      { name: 'KEDA', img: '/icons/keda.svg' },
      { name: 'CoreDNS', img: '/icons/coredns.svg' },
    ],
  },
];

export default function SupportedProducts() {
  const t = useTranslations('SupportedProducts');

  return (
    <section className="py-20 sm:py-24 px-6 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-6 mb-12">
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-3">
                {t('label')}
              </p>
              <h2 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight">
                {t('h2')}
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex items-end">
              <p className="text-[15px] text-neutral-600 font-light leading-relaxed">
                {t('desc')}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-neutral-200">
          {groups.map((group, gi) => (
            <FadeIn key={group.key} delay={Math.min(gi * 0.04, 0.2)}>
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start py-8 border-b border-neutral-200">
                <div className="md:col-span-3 flex items-start gap-4">
                  <span className="text-[11px] font-medium text-neutral-400 mt-1.5">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[16px] sm:text-[17px] font-bold tracking-tight text-black leading-snug">
                    {t(`${group.key}_title`)}
                  </h3>
                </div>
                <div className="md:col-span-9">
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {group.products.map((p) => (
                      <div
                        key={p.name}
                        className="group flex items-center gap-2.5 transition-transform duration-300 hover:translate-x-0.5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.img}
                          alt={p.name}
                          width="20"
                          height="20"
                          className="w-5 h-5 object-contain shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                        <span className="text-[13px] font-medium text-neutral-700 group-hover:text-black transition-colors">
                          {p.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
