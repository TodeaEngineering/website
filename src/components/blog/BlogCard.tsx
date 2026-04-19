import { format, parseISO } from 'date-fns';
import { useTranslations, useLocale } from 'next-intl';
import type { PostMeta } from '@/lib/blog';

export default function BlogCard({ post }: { post: PostMeta }) {
  const t = useTranslations('Blog');
  const locale = useLocale();

  const formattedDate = format(parseISO(post.date), 'MMM d, yyyy');

  return (
    <a
      href={`/${locale}/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.15)]"
    >
      {/* Featured image */}
      <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase">Todea</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        {post.category && (
          <p className="text-[11px] font-semibold tracking-[.15em] text-neutral-500 uppercase mb-3">
            {post.category}
          </p>
        )}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight mb-3 group-hover:text-black transition-colors">
          {post.title}
        </h3>
        <p className="text-[14px] text-neutral-600 font-light leading-relaxed mb-5 line-clamp-3">
          {post.description}
        </p>

        {/* Footer meta */}
        <div className="mt-auto flex items-center gap-2 text-[12px] text-neutral-500">
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="text-neutral-300">·</span>
          <span>
            {post.readingTimeMinutes} {t('reading_time_suffix')}
          </span>
        </div>
      </div>
    </a>
  );
}
