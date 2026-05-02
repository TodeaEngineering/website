import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

export default function BlogFAQ({ source }: { source: string }) {
  return (
    <section className="faq-block mt-12 prose prose-neutral max-w-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </section>
  );
}
