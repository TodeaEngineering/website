import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  defaultLang: 'plaintext',
  keepBackground: false,
};

export default function BlogContent({ source }: { source: string }) {
  return (
    <article className="prose prose-neutral max-w-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rehypePlugins: [[rehypePrettyCode as any, prettyCodeOptions]],
          },
        }}
      />
    </article>
  );
}
