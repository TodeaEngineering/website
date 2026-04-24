import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://todea.co.kr';

const localeMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Contact · Todea',
    description: 'Get in touch with Todea — Seoul-based cloud native infrastructure consulting.',
  },
  ko: {
    title: '문의 · Todea',
    description: 'Todea에 문의하세요. 서울 기반의 클라우드 네이티브 인프라 컨설팅.',
  },
  ja: {
    title: 'お問い合わせ · Todea',
    description: 'Todeaへのお問い合わせ。ソウル拠点のクラウドネイティブインフラコンサルティング。',
  },
  zh: {
    title: '联系我们 · Todea',
    description: '联系 Todea — 位于首尔的云原生基础设施咨询公司。',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale] ?? localeMetadata.en;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}/contact`;
  }
  languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}/contact`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'Todea',
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main id="main" className="flex-1 bg-white pt-[60px]">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
