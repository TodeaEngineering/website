import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const FALLBACK_LOCALE = 'en';

export interface PageMeta {
  title: string;
  description: string;
  ogLocale: string;
}

/**
 * Reads page-level metadata (title, description, ogLocale) from
 *   src/content/<page>/<locale>/index.mdx
 * Falls back to English if the requested locale is missing.
 */
export function getPageMeta(page: string, locale: string): PageMeta {
  const tryRead = (loc: string): PageMeta | null => {
    const filePath = path.join(CONTENT_DIR, page, loc, 'index.mdx');
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return data as PageMeta;
  };

  const result = tryRead(locale) ?? tryRead(FALLBACK_LOCALE);
  if (!result) {
    throw new Error(`Page metadata not found: src/content/${page}/{${locale}|${FALLBACK_LOCALE}}/index.mdx`);
  }
  return result;
}
