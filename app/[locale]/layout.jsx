import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/config/i18n/routing';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactModalProvider from '@/components/ContactModal/ContactModalProvider';
import ContactModal from '@/components/ContactModal/ContactModal';
import RecaptchaProvider from '@/components/RecaptchaProvider';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicons/favicon_16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicons/favicon_32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/favicon_48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/favicons/favicon_64x64.png', sizes: '64x64', type: 'image/png' },
        { url: '/favicons/favicon_128x128.png', sizes: '128x128', type: 'image/png' },
      ],
      apple: [
        { url: '/favicons/favicon_180x180.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <RecaptchaProvider>
            <ContactModalProvider>
              <Header />
              {children}
              <Footer />
              <ContactModal />
            </ContactModalProvider>
          </RecaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
