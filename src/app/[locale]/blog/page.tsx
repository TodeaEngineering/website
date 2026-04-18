import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import BlogList from '@/components/blog/BlogList';
import Footer from '@/components/Footer';
import { getAllPosts, type Locale } from '@/lib/blog';
import { getPageMeta } from '@/lib/page-meta';
import { routing } from '@/i18n/routing';

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
  const meta = getPageMeta('blog/page', locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/blog`,
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

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale as Locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Todea Insights',
    url: `${BASE_URL}/${locale}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Todea',
      url: BASE_URL,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author },
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}
