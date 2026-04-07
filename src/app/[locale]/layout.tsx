import type { Metadata } from 'next';
import { Sora, Noto_Sans_KR, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const notoKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-kr' });
const notoJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-jp' });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-sc' });

export const metadata: Metadata = {
  title: 'Todea — Cloud Native Infrastructure Consulting',
  description: 'Todea is a Seoul-based cloud native infrastructure consultancy helping enterprises build resilient platforms on Kubernetes.',
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Todea — Cloud Native Infrastructure Consulting',
    description: 'We help enterprises design, build, and operate resilient cloud native platforms.',
    url: 'https://todea.co.kr',
    siteName: 'Todea',
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todea — Cloud Native Infrastructure Consulting',
    description: 'We help enterprises design, build, and operate resilient cloud native platforms.',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.variable} ${notoKR.variable} ${notoJP.variable} ${notoSC.variable}`}>
      <body className="bg-white text-black font-sora antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
