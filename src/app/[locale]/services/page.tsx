import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesOverview from '@/components/services/ServicesOverview';
import SupportedProducts from '@/components/services/SupportedProducts';
import SupportTiers from '@/components/services/SupportTiers';
import ServicesCTA from '@/components/services/ServicesCTA';
import { getPageMeta } from '@/lib/page-meta';
import { routing, localeToHreflang } from '@/i18n/routing';

const BASE_URL = 'https://todea.co.kr';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta('services', locale);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[localeToHreflang(loc)] = `${BASE_URL}/${loc}/services`;
  }
  languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}/services`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/services`,
      siteName: 'Todea',
      locale: meta.ogLocale,
      type: 'website',
      images: [{ url: '/linkedin.png', width: 400, height: 400, alt: 'Todea' }],
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
      images: ['/linkedin.png'],
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cloud-native platform engineering and managed operations',
    provider: {
      '@type': 'Organization',
      name: 'Todea',
      url: BASE_URL,
    },
    areaServed: ['Asia Pacific', 'EMEA', 'Americas'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Todea Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Platform Readiness Review' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Implementation Project' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Managed Platform' } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main">
        <ServicesHero />
        <ServicesOverview />
        <div id="tiers">
          <SupportTiers />
        </div>
        <SupportedProducts />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
