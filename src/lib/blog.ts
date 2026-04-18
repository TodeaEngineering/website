import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog/posts');
const FALLBACK_LOCALE = 'en';

export type Locale = 'en' | 'ko' | 'ja' | 'zh';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole?: string;
  tags?: string[];
  image?: string;
  category?: string;
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  locale: Locale;
  fallback: boolean;
  readingTimeMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((entry) => {
      const full = path.join(dir, entry);
      return fs.statSync(full).isDirectory();
    });
  } catch {
    return [];
  }
}

/**
 * Returns all post slugs that have at least one valid (non-empty) locale variant.
 */
export function getAllSlugs(): string[] {
  return safeReadDir(BLOG_DIR).filter((slug) => {
    const slugDir = path.join(BLOG_DIR, slug);
    const locales = safeReadDir(slugDir);
    return locales.some((locale) => fs.existsSync(path.join(slugDir, locale, 'index.mdx')));
  });
}

/**
 * Reads a post file. Returns null if the file does not exist.
 */
function readPostFile(slug: string, locale: Locale): { content: string; data: PostFrontmatter } | null {
  const filePath = path.join(BLOG_DIR, slug, locale, 'index.mdx');
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(raw);
  return { content, data: data as PostFrontmatter };
}

/**
 * Returns the post for a slug + locale, falling back to English if not present.
 * Returns null if the post does not exist in any locale.
 */
export function getPostBySlug(slug: string, locale: Locale): Post | null {
  let result = readPostFile(slug, locale);
  let fallback = false;

  if (!result && locale !== FALLBACK_LOCALE) {
    result = readPostFile(slug, FALLBACK_LOCALE);
    fallback = true;
  }

  if (!result) return null;

  const { content, data } = result;
  if (data.draft) return null;

  const stats = readingTime(content);

  return {
    slug,
    locale,
    fallback,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    authorRole: data.authorRole,
    tags: data.tags ?? [],
    image: data.image,
    category: data.category,
    draft: data.draft ?? false,
    content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

/**
 * Returns all post metadata for a locale, sorted by date descending.
 * Falls back to English for posts that don't have a translation.
 */
export function getAllPosts(locale: Locale): PostMeta[] {
  const slugs = getAllSlugs();
  const posts: PostMeta[] = [];

  for (const slug of slugs) {
    const post = getPostBySlug(slug, locale);
    if (post) {
      // Strip content for list view to keep memory low
      const { content: _content, ...meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
