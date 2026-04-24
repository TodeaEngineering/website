import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogContent from '@/components/blog/BlogContent';
import { routing } from '@/i18n/routing';
import { getLegalDocument } from '@/lib/legal';
import type { Locale } from '@/lib/blog';

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
  const doc = getLegalDocument('privacy', locale as Locale);
  if (!doc) return { title: 'Privacy Policy · Todea' };

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}/privacy`;
  }
  languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}/privacy`;

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages,
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: `${BASE_URL}/${locale}/privacy`,
      siteName: 'Todea',
      locale: doc.ogLocale,
      type: 'article',
      images: [{ url: '/linkedin.png', width: 400, height: 400, alt: 'Todea' }],
    },
    twitter: {
      card: 'summary',
      title: doc.title,
      description: doc.description,
      images: ['/linkedin.png'],
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const doc = getLegalDocument('privacy', locale as Locale);
  if (!doc) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main id="main" className="flex-1 bg-white">
        <article className="pt-[120px] pb-24 sm:pb-32">
          <header className="max-w-[820px] mx-auto px-6 mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-[2.4rem] lg:text-[2.75rem] font-[800] leading-[1.15] tracking-tight mb-4">
              {doc.title.replace(/\s*·\s*Todea\s*$/, '')}
            </h1>
            <p className="text-[13px] text-neutral-500">
              v{doc.version} · {doc.effectiveDate}
            </p>
          </header>
          <div className="max-w-[820px] mx-auto px-6">
            <BlogContent source={doc.content} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
