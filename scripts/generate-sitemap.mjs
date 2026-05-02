#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from blog post frontmatter.
 * Run with: npm run sitemap
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const BASE_URL = 'https://todea.co.kr';
const LOCALES = ['en', 'ko', 'ja', 'zh'];
const DEFAULT_LOCALE = 'en';
// Keep in sync with localeToHreflang in src/i18n/routing.ts.
// `zh` → `zh-Hans` because we ship Simplified (Noto Sans SC).
const LOCALE_TO_HREFLANG = { en: 'en', ko: 'ko', ja: 'ja', zh: 'zh-Hans' };
const BLOG_DIR = path.join(ROOT, 'src/content/blog/posts');
const LEGAL_DOCS = [
  { slug: 'privacy', dir: path.join(ROOT, 'src/content/privacy'), priority: '0.5' },
];
const OUTPUT = path.join(ROOT, 'public/sitemap.xml');

// Sources that influence each static page's rendered output. lastmod is the
// most recent commit touching any of these paths — Google discounts lastmod
// values that always match build date, so we anchor to real content edits.
const PAGE_SOURCES = {
  home: ['src/app/[locale]/page.tsx', 'src/content/homepage'],
  about: ['src/app/[locale]/about/page.tsx', 'src/content/about'],
  services: ['src/app/[locale]/services/page.tsx', 'src/content/services'],
  contact: ['src/app/[locale]/contact/page.tsx'],
  blogIndex: ['src/app/[locale]/blog/page.tsx', 'src/content/blog/page'],
};

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir).filter((e) => fs.statSync(path.join(dir, e)).isDirectory());
  } catch {
    return [];
  }
}

function isoDate(input) {
  const d = typeof input === 'string' ? new Date(input) : input;
  return d.toISOString().split('T')[0];
}

function lastCommitDate(paths) {
  const existing = paths.filter((p) => fs.existsSync(path.join(ROOT, p)));
  if (existing.length === 0) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...existing], {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out ? isoDate(out) : null;
  } catch {
    return null;
  }
}

function pageLastmod(key, fallback) {
  return lastCommitDate(PAGE_SOURCES[key]) ?? fallback;
}

function getPosts() {
  const slugs = readDirSafe(BLOG_DIR);
  const posts = [];
  for (const slug of slugs) {
    let date;
    let draft = false;
    const locales = [];
    for (const locale of LOCALES) {
      const file = path.join(BLOG_DIR, slug, locale, 'index.mdx');
      if (!fs.existsSync(file)) continue;
      const { data } = matter(fs.readFileSync(file, 'utf-8'));
      if (data.draft) {
        draft = true;
        break;
      }
      locales.push(locale);
      if (!date) date = data.date;
    }
    if (draft || locales.length === 0) continue;
    posts.push({ slug, date, locales });
  }
  return posts;
}

function getLegalDocDate(dir) {
  for (const locale of LOCALES) {
    const file = path.join(dir, locale, 'index.mdx');
    if (!fs.existsSync(file)) continue;
    const { data } = matter(fs.readFileSync(file, 'utf-8'));
    if (data.effectiveDate) return data.effectiveDate;
  }
  return null;
}

function alternateLinks(pathSuffix, locales = LOCALES) {
  const links = locales.map(
    (loc) =>
      `    <xhtml:link rel="alternate" hreflang="${LOCALE_TO_HREFLANG[loc] ?? loc}" href="${BASE_URL}/${loc}${pathSuffix}"/>`
  );
  const xDefault = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0];
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${xDefault}${pathSuffix}"/>`
  );
  return links.join('\n');
}

function urlBlock({ loc, lastmod, changefreq, priority, pathSuffix, locales }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    alternateLinks(pathSuffix, locales),
    '  </url>',
  ].join('\n');
}

function build() {
  const today = isoDate(new Date());
  const posts = getPosts();
  const latestPostDate = posts.length
    ? isoDate(posts.reduce((a, b) => (a.date > b.date ? a : b)).date)
    : today;

  const homeLastmod = pageLastmod('home', today);
  const aboutLastmod = pageLastmod('about', today);
  const servicesLastmod = pageLastmod('services', today);
  const contactLastmod = pageLastmod('contact', today);
  const blogIndexSourceDate = pageLastmod('blogIndex', today);
  const blogIndexLastmod =
    blogIndexSourceDate > latestPostDate ? blogIndexSourceDate : latestPostDate;

  const entries = [];

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}`,
      lastmod: homeLastmod,
      changefreq: 'monthly',
      priority: '1.0',
      pathSuffix: '',
    });
  }

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}/about`,
      lastmod: aboutLastmod,
      changefreq: 'monthly',
      priority: '0.9',
      pathSuffix: '/about',
    });
  }

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}/services`,
      lastmod: servicesLastmod,
      changefreq: 'monthly',
      priority: '0.9',
      pathSuffix: '/services',
    });
  }

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}/blog`,
      lastmod: blogIndexLastmod,
      changefreq: 'weekly',
      priority: '0.8',
      pathSuffix: '/blog',
    });
  }

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}/contact`,
      lastmod: contactLastmod,
      changefreq: 'yearly',
      priority: '0.7',
      pathSuffix: '/contact',
    });
  }

  for (const locale of LOCALES) {
    for (const post of posts) {
      if (!post.locales.includes(locale)) continue;
      entries.push({
        loc: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastmod: isoDate(post.date),
        changefreq: 'monthly',
        priority: '0.7',
        pathSuffix: `/blog/${post.slug}`,
        locales: post.locales,
      });
    }
  }

  for (const doc of LEGAL_DOCS) {
    const docDate = getLegalDocDate(doc.dir) ?? today;
    for (const locale of LOCALES) {
      entries.push({
        loc: `${BASE_URL}/${locale}/${doc.slug}`,
        lastmod: isoDate(docDate),
        changefreq: 'yearly',
        priority: doc.priority,
        pathSuffix: `/${doc.slug}`,
      });
    }
  }

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.map(urlBlock).join('\n') +
    '\n</urlset>\n'
  );
}

const xml = build();
fs.writeFileSync(OUTPUT, xml);
console.log(`Wrote ${OUTPUT} (${xml.length} bytes)`);
