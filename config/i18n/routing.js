import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'it', 'ko'],
  defaultLocale: 'en',
});
