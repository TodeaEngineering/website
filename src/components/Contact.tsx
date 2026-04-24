'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible' | 'invisible';
          appearance?: 'always' | 'execute' | 'interaction-only';
          execution?: 'render' | 'execute';
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      execute: (widgetId?: string) => void;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    __onTurnstileLoad?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__onTurnstileLoad&render=explicit';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement | null>(null);
  const widgetElRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenResolversRef = useRef<Array<(token: string) => void>>([]);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!SITE_KEY || typeof window === 'undefined') return;

    const resolveToken = (t: string) => {
      const resolvers = tokenResolversRef.current;
      tokenResolversRef.current = [];
      resolvers.forEach((r) => r(t));
    };

    const render = () => {
      if (!widgetElRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(widgetElRef.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        size: 'invisible',
        appearance: 'interaction-only',
        execution: 'execute',
        callback: (t) => resolveToken(t),
        'error-callback': () => resolveToken(''),
        'expired-callback': () => resolveToken(''),
      });
    };

    window.__onTurnstileLoad = render;

    if (window.turnstile) {
      render();
    } else if (!document.querySelector('script[data-turnstile]')) {
      const s = document.createElement('script');
      s.src = TURNSTILE_SRC;
      s.async = true;
      s.defer = true;
      s.dataset.turnstile = '1';
      document.head.appendChild(s);
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  function requestToken(): Promise<string> {
    if (!window.turnstile || !widgetIdRef.current) return Promise.resolve('');
    return new Promise((resolve) => {
      tokenResolversRef.current.push(resolve);
      window.turnstile!.execute(widgetIdRef.current!);
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    const token = await requestToken();
    if (!token) {
      setStatus('error');
      return;
    }

    const body = {
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      interest: String(data.get('interest') ?? ''),
      message: String(data.get('message') ?? ''),
      token,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  }

  const inputCls =
    'w-full bg-transparent border-b border-neutral-200 py-2 text-[15px] focus:outline-none focus:border-black placeholder:text-neutral-300';
  const labelCls = 'block text-[11px] font-semibold tracking-[.15em] text-neutral-400 uppercase mb-1';

  return (
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <div>
              <p className="text-[11px] font-semibold tracking-[.2em] text-neutral-400 uppercase mb-3">
                {t('label')}
              </p>
              <h1 className="text-3xl sm:text-[2.8rem] font-[800] leading-[1.1] tracking-tight mb-5">
                {t('h2')}
              </h1>
              <p className="text-[15px] text-neutral-500 font-light leading-relaxed mb-12">{t('desc')}</p>

              <div className="space-y-5">
                <div>
                  <p className={labelCls}>{t('email_l')}</p>
                  <a href="mailto:hello@todea.co.kr" className="text-[15px] font-medium uline pb-0.5">
                    hello@todea.co.kr
                  </a>
                </div>
                <div>
                  <p className={labelCls}>{t('loc_l')}</p>
                  <p className="text-[15px] text-neutral-500 font-light">{t('loc_v')}</p>
                </div>
                <div>
                  <p className={labelCls}>{t('tz_l')}</p>
                  <p className="text-[15px] text-neutral-500 font-light">{t('tz_v')}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="c-name" className={labelCls}>{t('f_name')}</label>
                  <input id="c-name" name="name" required maxLength={200} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="c-company" className={labelCls}>{t('f_company')}</label>
                  <input id="c-company" name="company" maxLength={200} className={inputCls} />
                </div>
              </div>

              <div>
                <label htmlFor="c-email" className={labelCls}>{t('f_email')}</label>
                <input id="c-email" name="email" type="email" required className={inputCls} />
              </div>

              <div>
                <label htmlFor="c-interest" className={labelCls}>{t('f_interest')}</label>
                <select id="c-interest" name="interest" defaultValue="" className={inputCls}>
                  <option value="" disabled>{t('f_opts_0')}</option>
                  <option>{t('f_opts_1')}</option>
                  <option>{t('f_opts_2')}</option>
                  <option>{t('f_opts_3')}</option>
                  <option>{t('f_opts_4')}</option>
                  <option>{t('f_opts_5')}</option>
                  <option>{t('f_opts_6')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="c-message" className={labelCls}>{t('f_msg')}</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  required
                  maxLength={5000}
                  placeholder={t('f_msg_ph')}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div ref={widgetElRef} className="cf-turnstile" />

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-brand text-white text-[13px] font-semibold px-7 py-3 rounded-full hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  {status === 'sending' ? '…' : status === 'success' ? t('f_sent') : t('f_submit')}
                </button>
                {status === 'error' && (
                  <span className="text-[13px] text-red-600">Please try again.</span>
                )}
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
