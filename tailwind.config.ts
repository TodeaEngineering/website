import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: '#000000',
      },
      fontFamily: {
        sora: ['Sora', 'Noto Sans KR', 'Noto Sans JP', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(48px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'scroll-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        rise: 'rise 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '720px',
            color: '#404040',
            fontWeight: '300',
            lineHeight: '1.75',
            fontSize: '16px',
            'h2, h3, h4': {
              color: '#000000',
              fontWeight: '800',
              letterSpacing: '-0.025em',
              marginTop: '2.5em',
              marginBottom: '0.8em',
            },
            h2: { fontSize: '1.75rem' },
            h3: { fontSize: '1.35rem' },
            a: {
              color: '#000000',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
              fontWeight: '500',
            },
            'a:hover': {
              textDecorationThickness: '2px',
            },
            strong: { color: '#000000', fontWeight: '700' },
            blockquote: {
              borderLeftColor: '#e5e5e5',
              borderLeftWidth: '3px',
              fontStyle: 'normal',
              color: '#525252',
              fontWeight: '300',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: '#f5f5f5',
              color: '#000000',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '400',
              fontSize: '0.9em',
            },
            pre: {
              backgroundColor: '#0a0f10',
              color: '#e5e5e5',
              borderRadius: '8px',
              padding: '1.25rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
            },
            ul: { paddingLeft: '1.5em' },
            ol: { paddingLeft: '1.5em' },
            'li::marker': { color: '#a3a3a3' },
            hr: { borderColor: '#e5e5e5', marginTop: '3em', marginBottom: '3em' },
            img: { borderRadius: '8px' },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
