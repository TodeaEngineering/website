import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getRequestConfig, type GetRequestConfigParams } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { routing } from './routing';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

function loadFrontmatter(relativePath: string): AbstractIntlMessages {
  const filePath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return data as AbstractIntlMessages;
}

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  // Shared UI strings (Nav, Footer, CookieConsent, Blog)
  const sharedContent = loadFrontmatter(`shared/${locale}/index.mdx`);

  // Homepage content (Hero, Services, Approach, TechStack, CTA, Contact)
  const homepageContent = loadFrontmatter(`homepage/${locale}/index.mdx`);

  return {
    locale,
    messages: {
      ...sharedContent,
      ...homepageContent,
    },
  };
});
