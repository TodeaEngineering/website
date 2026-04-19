#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from blog post frontmatter.
 * Run with: npm run sitemap
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const BASE_URL = 'https://todea.co.kr';
const LOCALES = ['en', 'ko', 'ja', 'zh'];
const DEFAULT_LOCALE = 'en';
const BLOG_DIR = path.join(ROOT, 'src/content/blog/posts');
const OUTPUT = path.join(ROOT, 'public/sitemap.xml');

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

function getPosts() {
  const slugs = readDirSafe(BLOG_DIR);
  const posts = [];
  for (const slug of slugs) {
    // Use the first available locale's frontmatter for the date (post date is the same across translations)
    for (const locale of LOCALES) {
      const file = path.join(BLOG_DIR, slug, locale, 'index.mdx');
      if (!fs.existsSync(file)) continue;
      const { data } = matter(fs.readFileSync(file, 'utf-8'));
      if (data.draft) break;
      posts.push({ slug, date: data.date });
      break;
    }
  }
  return posts;
}

function alternateLinks(pathSuffix) {
  const links = LOCALES.map(
    (loc) => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${BASE_URL}/${loc}${pathSuffix}"/>`
  );
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${DEFAULT_LOCALE}${pathSuffix}"/>`
  );
  return links.join('\n');
}

function urlBlock({ loc, lastmod, changefreq, priority, pathSuffix }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    alternateLinks(pathSuffix),
    '  </url>',
  ].join('\n');
}

function build() {
  const today = isoDate(new Date());
  const posts = getPosts();
  const latestPostDate = posts.length
    ? isoDate(posts.reduce((a, b) => (a.date > b.date ? a : b)).date)
    : today;

  const entries = [];

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '1.0',
      pathSuffix: '',
    });
  }

  for (const locale of LOCALES) {
    entries.push({
      loc: `${BASE_URL}/${locale}/blog`,
      lastmod: latestPostDate,
      changefreq: 'weekly',
      priority: '0.8',
      pathSuffix: '/blog',
    });
  }

  for (const locale of LOCALES) {
    for (const post of posts) {
      entries.push({
        loc: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastmod: isoDate(post.date),
        changefreq: 'monthly',
        priority: '0.7',
        pathSuffix: `/blog/${post.slug}`,
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
