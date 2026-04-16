import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import AboutHero from '@/components/about/AboutHero';
import AboutCredentials from '@/components/about/AboutCredentials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const BASE_URL = 'https://todea.co.kr';

const localeMetadata: Record<string, { title: string; description: string; ogDescription: string; ogLocale: string }> = {
  en: {
    title: 'About — Todea',
    description: 'Meet the team behind Todea. Cloud native infrastructure consulting based in Seoul, serving enterprises across Asia-Pacific.',
    ogDescription: 'Meet the team behind Todea. Cloud native infrastructure consulting based in Seoul.',
    ogLocale: 'en_US',
  },
  ko: {
    title: '소개 — Todea',
    description: 'Todea 팀을 소개합니다. 서울 기반 클라우드 네이티브 인프라 컨설팅으로, 아시아 태평양 기업을 지원합니다.',
    ogDescription: 'Todea 팀을 소개합니다. 서울 기반 클라우드 네이티브 인프라 컨설팅.',
    ogLocale: 'ko_KR',
  },
  ja: {
    title: '会社概要 — Todea',
    description: 'Todeaのチームをご紹介します。ソウル拠点のクラウドネイティブインフラコンサルティング。',
    ogDescription: 'Todeaのチームをご紹介します。ソウル拠点のクラウドネイティブインフラコンサルティング。',
    ogLocale: 'ja_JP',
  },
  zh: {
    title: '关于 — Todea',
    description: '了解Todea团队。位于首尔的云原生基础设施咨询公司，服务亚太地区企业。',
    ogDescription: '了解Todea团队。位于首尔的云原生基础设施咨询公司。',
    ogLocale: 'zh_CN',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale] || localeMetadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: `${BASE_URL}/${locale}/about`,
      siteName: 'Todea',
      locale: meta.ogLocale,
      type: 'website',
      images: [{ url: '/linkedin.png', width: 400, height: 400, alt: 'Todea' }],
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.ogDescription,
      images: ['/linkedin.png'],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Todea',
    url: `${BASE_URL}/${locale}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Todea',
      url: BASE_URL,
      founder: {
        '@type': 'Person',
        name: 'Ivan Porta',
        jobTitle: 'Founder & Principal Engineer',
        url: 'https://www.linkedin.com/in/ivanporta/',
        sameAs: [
          'https://github.com/GTRekter',
        ],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '396 Seocho-daero, 16th Floor',
        addressLocality: 'Seocho-gu, Seoul',
        postalCode: '06619',
        addressCountry: 'KR',
      },
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
        <AboutHero />
        <AboutCredentials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
