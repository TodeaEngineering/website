import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from './blog';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const FALLBACK_LOCALE: Locale = 'en';

export type LegalDocumentSlug = 'privacy';

export interface LegalDocumentFrontmatter {
  title: string;
  description: string;
  ogLocale: string;
  effectiveDate: string;
  version: string;
}

export interface LegalDocument extends LegalDocumentFrontmatter {
  slug: LegalDocumentSlug;
  locale: Locale;
  fallback: boolean;
  content: string;
}

function readDocFile(
  slug: LegalDocumentSlug,
  locale: Locale,
): { content: string; data: LegalDocumentFrontmatter } | null {
  const filePath = path.join(CONTENT_DIR, slug, locale, 'index.mdx');
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(raw);
  return { content, data: data as LegalDocumentFrontmatter };
}

export function getLegalDocument(
  slug: LegalDocumentSlug,
  locale: Locale,
): LegalDocument | null {
  let result = readDocFile(slug, locale);
  let fallback = false;

  if (!result && locale !== FALLBACK_LOCALE) {
    result = readDocFile(slug, FALLBACK_LOCALE);
    fallback = true;
  }

  if (!result) return null;

  return {
    slug,
    locale,
    fallback,
    title: result.data.title,
    description: result.data.description,
    ogLocale: result.data.ogLocale,
    effectiveDate: result.data.effectiveDate,
    version: result.data.version,
    content: result.content,
  };
}
