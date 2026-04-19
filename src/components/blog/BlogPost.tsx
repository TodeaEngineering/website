import { format, parseISO } from 'date-fns';
import { useTranslations, useLocale } from 'next-intl';
import BlogContent from './BlogContent';
import type { Post } from '@/lib/blog';

export default function BlogPost({ post }: { post: Post }) {
  const t = useTranslations('Blog');
  const locale = useLocale();

  const formattedDate = format(parseISO(post.date), 'MMM d, yyyy');

  return (
    <article className="pt-[120px] pb-24 sm:pb-32 bg-white">
      {/* Header (left-aligned, narrow column) */}
      <header className="max-w-[820px] mx-auto px-6 mb-10 sm:mb-12">
        {post.category && (
          <p className="text-[12px] font-semibold tracking-[.15em] text-neutral-500 uppercase mb-5">
            {post.category}
          </p>
        )}

        <div className="flex items-start justify-between gap-6 mb-6">
          <h1 className="flex-1 text-3xl sm:text-[2.4rem] lg:text-[2.75rem] font-[800] leading-[1.15] tracking-tight">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="hidden sm:block shrink-0 text-[13px] text-neutral-500 pt-3"
          >
            {formattedDate}
          </time>
        </div>

        <p className="text-[16px] sm:text-[17px] text-neutral-600 font-light leading-relaxed mb-8">
          {post.description}
        </p>

        {/* Author block */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <p className="text-[14px] font-semibold text-black">{post.author}</p>
            {post.authorRole && (
              <p className="text-[13px] text-neutral-500 mt-0.5">{post.authorRole}</p>
            )}
          </div>
          <div className="flex items-center gap-3 text-[12px] text-neutral-500">
            <time className="sm:hidden" dateTime={post.date}>
              {formattedDate}
            </time>
            <span className="sm:hidden text-neutral-300">·</span>
            <span>
              {post.readingTimeMinutes} {t('reading_time_suffix')}
            </span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] font-medium text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured image */}
      {post.image && (
        <div className="max-w-[820px] mx-auto px-6 mb-12 sm:mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Fallback notice */}
      {post.fallback && (
        <div className="max-w-[820px] mx-auto px-6 mb-10">
          <div className="px-5 py-4 bg-neutral-50 border-l-2 border-neutral-300 text-[14px] text-neutral-600 rounded-r-md">
            {t('fallback_notice')}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-[820px] mx-auto px-6">
        <BlogContent source={post.content} />
      </div>

      {/* Back to list */}
      <div className="max-w-[820px] mx-auto px-6 mt-16 pt-8 border-t border-neutral-100">
        <a
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-[13px] text-neutral-500 hover:text-black transition-colors group"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('back_to_blog')}
        </a>
      </div>
    </article>
  );
}
