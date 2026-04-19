import type { Metadata } from 'next';
import { Sora, Noto_Sans_KR, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import CookieConsent from '@/components/CookieConsent';
import '../globals.css';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const notoKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-kr' });
const notoJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-jp' });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-sc' });

const BASE_URL = 'https://todea.co.kr';

const localeMetadata: Record<string, { title: string; description: string; ogDescription: string; ogLocale: string }> = {
  en: {
    title: 'Todea · Cloud Native Infrastructure Consulting',
    description: 'Todea is a Seoul-based cloud native infrastructure consultancy helping enterprises build resilient platforms on Kubernetes.',
    ogDescription: 'We help enterprises design, build, and operate resilient cloud native platforms.',
    ogLocale: 'en_US',
  },
  ko: {
    title: 'Todea · 클라우드 네이티브 인프라 컨설팅',
    description: 'Todea는 서울 기반 클라우드 네이티브 인프라 컨설팅 기업으로, Kubernetes 기반의 안정적인 플랫폼 구축을 지원합니다.',
    ogDescription: '기업이 안정적인 클라우드 네이티브 플랫폼을 설계, 구축, 운영할 수 있도록 지원합니다.',
    ogLocale: 'ko_KR',
  },
  ja: {
    title: 'Todea · クラウドネイティブインフラコンサルティング',
    description: 'Todeaはソウル拠点のクラウドネイティブインフラコンサルティング企業です。Kubernetes上の堅牢なプラットフォーム構築を支援します。',
    ogDescription: '企業が堅牢なクラウドネイティブプラットフォームを設計・構築・運用できるよう支援します。',
    ogLocale: 'ja_JP',
  },
  zh: {
    title: 'Todea · 云原生基础设施咨询',
    description: 'Todea是一家位于首尔的云原生基础设施咨询公司，帮助企业在Kubernetes上构建可靠的平台。',
    ogDescription: '我们帮助企业设计、构建和运营可靠的云原生平台。',
    ogLocale: 'zh_CN',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale] || localeMetadata.en;
  const alternateLanguages: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternateLanguages[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        ...alternateLanguages,
        'x-default': `${BASE_URL}/en`,
      },
    },
    icons: {
      icon: [{ url: '/favicons/favicon.svg', type: 'image/svg+xml' }],
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: `${BASE_URL}/${locale}`,
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.variable} ${notoKR.variable} ${notoJP.variable} ${notoSC.variable}`}>
      <head>
        <meta name="naver-site-verification" content="d62232868655b0d90718afa157ba294ee71dd601" />
        <link rel="preload" href="/Logo.svg" as="image" type="image/svg+xml" />
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com; base-uri 'self'; form-action 'self'"
        />
      </head>
      <body className="bg-white text-black font-sora antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G8K3GV4DB2" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied'});var c=localStorage.getItem('cookie-consent');if(c==='granted'){gtag('consent','update',{analytics_storage:'granted'});}gtag('js',new Date());gtag('config','G-G8K3GV4DB2');`,
          }}
        />
      </body>
    </html>
  );
}
