import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
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
    },
  },
  plugins: [],
};

export default config;
