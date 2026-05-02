declare class HTMLRewriter {
  on(selector: string, handlers: { element?: (element: HTMLRewriterElement) => void }): HTMLRewriter;
  transform(response: Response): Response;
}
interface HTMLRewriterElement {
  setAttribute(name: string, value: string): HTMLRewriterElement;
  getAttribute(name: string): string | null;
}

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

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function buildCSP(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com https://static.cloudflareinsights.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://challenges.cloudflare.com https://cloudflareinsights.com",
    "frame-src https://challenges.cloudflare.com",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

function applySecurityHeaders(headers: Headers): void {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      const locale = pickLocale(request.headers.get('Accept-Language'));
      const headers = new Headers({
        Location: `${url.origin}/${locale}${url.search}`,
        Vary: 'Accept-Language',
        'Cache-Control': 'private, no-store',
      });
      applySecurityHeaders(headers);
      return new Response(null, { status: 302, headers });
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('text/html')) {
      const headers = new Headers(response.headers);
      applySecurityHeaders(headers);
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    const nonce = generateNonce();
    const headers = new Headers(response.headers);
    headers.set('Content-Security-Policy', buildCSP(nonce));
    applySecurityHeaders(headers);

    const rewritten = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });

    return new HTMLRewriter()
      .on('script', {
        element(element) {
          element.setAttribute('nonce', nonce);
        },
      })
      .transform(rewritten);
  },
};
