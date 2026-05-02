interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

const SUPPORTED = ['en', 'ko', 'ja', 'zh'] as const;
const DEFAULT_LOCALE = 'en';

function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const tags = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      const parsed = q ? parseFloat(q) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(parsed) ? parsed : 0 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of tags) {
    const code = tag.split('-')[0];
    if ((SUPPORTED as readonly string[]).includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      const locale = pickLocale(request.headers.get('Accept-Language'));
      return new Response(null, {
        status: 302,
        headers: {
          Location: `${url.origin}/${locale}${url.search}`,
          Vary: 'Accept-Language',
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
