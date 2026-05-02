import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import BlogPost from '@/components/blog/BlogPost';
import Footer from '@/components/Footer';
import { getAllSlugs, getPostBySlug, parseFaqEntries, type Locale } from '@/lib/blog';
import { routing, localeToHreflang } from '@/i18n/routing';

const BASE_URL = 'https://todea.co.kr';

const BREADCRUMB_LABELS: Record<string, { home: string; blog: string }> = {
  en: { home: 'Home', blog: 'Blog' },
  ko: { home: '홈', blog: '블로그' },
  ja: { home: 'ホーム', blog: 'ブログ' },
  zh: { home: '首页', blog: '博客' },
};

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    return { title: 'Post not found' };
  }

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[localeToHreflang(loc)] = `${BASE_URL}/${loc}/blog/${post.slug}`;
  }
  languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}/blog/${post.slug}`;

  return {
    title: `${post.title} · Todea`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      siteName: 'Todea',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: '/linkedin.png', width: 400, height: 400, alt: post.title }],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
      images: ['/linkedin.png'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale as Locale);
  if (!post) notFound();

  const imagePath = post.image ?? `/blog/${post.slug}/${locale}-cover.svg`;
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Todea',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  };

  const breadcrumbLabels = BREADCRUMB_LABELS[locale] ?? BREADCRUMB_LABELS.en;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumbLabels.home,
        item: `${BASE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbLabels.blog,
        item: `${BASE_URL}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
      },
    ],
  };

  const faqEntries = post.faq ? parseFaqEntries(post.faq) : [];
  const faqJsonLd =
    faqEntries.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqEntries.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Nav />
      <main id="main">
        <BlogPost post={post} />
      </main>
      <Footer />
    </>
  );
}
