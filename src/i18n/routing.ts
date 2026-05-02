import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ko', 'ja', 'zh'],
  defaultLocale: 'en',
});

// Maps internal route locales to BCP 47 tags for `<html lang>` and hreflang.
// `zh` → `zh-Hans` because we ship Simplified (Noto Sans SC); without the
// script subtag Google can't tell Simplified from Traditional.
const LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-Hans',
};

export function localeToHreflang(locale: string): string {
  return LOCALE_TO_HREFLANG[locale] ?? locale;
}
