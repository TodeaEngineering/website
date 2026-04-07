import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import TechStack from '@/components/TechStack';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Todea',
    url: 'https://todea.co.kr',
    description: 'Seoul-based cloud native infrastructure consultancy specializing in Kubernetes, observability, and platform engineering.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
    areaServed: ['Asia Pacific', 'EMEA'],
    serviceType: [
      'Platform Engineering',
      'Kubernetes Consulting',
      'Cloud Migration',
      'Observability',
      'Security & Compliance',
    ],
    knowsAbout: [
      'Kubernetes', 'Terraform', 'ArgoCD',
      'OpenTelemetry', 'Prometheus', 'Grafana', 'Docker', 'Helm',
      'GitOps', 'Zero Trust', 'mTLS', 'SPIFFE', 'Cloud Native',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <Hero />
      <Services />
      <Approach />
      <TechStack />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}
