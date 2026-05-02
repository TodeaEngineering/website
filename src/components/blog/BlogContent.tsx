import type { ComponentPropsWithoutRef } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import BlogImage from './BlogImage';

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
    <div className="my-10 sm:overflow-x-auto">
      <table
        {...props}
        className="block w-full my-0 sm:table sm:w-full sm:border-collapse sm:table-auto"
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead {...props} className="hidden sm:table-header-group sm:border-b sm:border-neutral-200" />
  ),
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody {...props} className="block sm:table-row-group" />
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
      className="block sm:table-cell align-top first:text-[15px] first:font-medium first:text-black first:pb-1 [&:nth-child(2)]:text-[11px] [&:nth-child(2)]:font-bold [&:nth-child(2)]:uppercase [&:nth-child(2)]:tracking-[.12em] [&:nth-child(2)]:text-neutral-500 [&:nth-child(2)]:pb-3 [&:nth-child(3)]:text-[14px] [&:nth-child(3)]:leading-relaxed [&:nth-child(3)]:font-light [&:nth-child(3)]:text-neutral-600 sm:py-3.5 sm:pr-6 sm:last:pr-0 sm:text-[14px] sm:leading-relaxed sm:font-light sm:text-neutral-600 sm:border-b sm:border-neutral-100 sm:group-[:last-child]:border-0 sm:first:text-[14px] sm:first:font-light sm:first:text-neutral-600 sm:first:pb-3.5 sm:[&:nth-child(2)]:text-[14px] sm:[&:nth-child(2)]:font-light sm:[&:nth-child(2)]:normal-case sm:[&:nth-child(2)]:tracking-normal sm:[&:nth-child(2)]:text-neutral-600 sm:[&:nth-child(2)]:pb-3.5"
    />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr {...props} className="group block sm:table-row py-5 border-b border-neutral-200 last:border-b-0 sm:py-0 sm:border-0" />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => <BlogImage {...props} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => {
    const href = props.href ?? '';
    const isExternal = /^https?:\/\//i.test(href);
    if (isExternal) {
      return <a {...props} target="_blank" rel="noopener noreferrer" />;
    }
    return <a {...props} />;
  },
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
