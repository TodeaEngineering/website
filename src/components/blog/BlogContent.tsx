import type { ComponentPropsWithoutRef } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  defaultLang: 'plaintext',
  keepBackground: false,
};

const components = {
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-10 -mx-6 sm:mx-0 overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse mx-6 sm:mx-0 my-0"
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead {...props} className="border-b border-neutral-200" />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      {...props}
      className="text-left text-[11px] font-bold tracking-[.12em] uppercase text-black pb-3 pr-6 last:pr-0 align-bottom"
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      {...props}
      className="py-3.5 pr-6 last:pr-0 align-top text-[14px] leading-relaxed font-light text-neutral-600 border-b border-neutral-100 group-[:last-child]:border-0"
    />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr {...props} className="group" />
  ),
};

export default function BlogContent({ source }: { source: string }) {
  return (
    <article className="prose prose-neutral max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rehypePlugins: [[rehypePrettyCode as any, prettyCodeOptions]],
          },
        }}
      />
    </article>
  );
}
