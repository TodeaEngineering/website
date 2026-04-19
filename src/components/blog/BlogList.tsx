import { useTranslations } from 'next-intl';
import FadeIn from '../FadeIn';
import BlogCard from './BlogCard';
import type { PostMeta } from '@/lib/blog';

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const t = useTranslations('Blog');

  return (
    <section className="pt-[140px] pb-24 sm:pb-32 px-6 bg-neutral-50">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-16 sm:mb-20 text-center">
            <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-600 uppercase mb-4">
              {t('label')}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[800] leading-[1.05] tracking-tight mb-6">
              {t('h1')}
            </h1>
            <p className="text-[16px] sm:text-[17px] text-neutral-600 font-light leading-relaxed max-w-[640px] mx-auto">
              {t('desc')}
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        {posts.length === 0 ? (
          <FadeIn delay={0.16}>
            <p className="text-center text-[15px] text-neutral-500 font-light py-20">
              {t('no_posts')}
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
