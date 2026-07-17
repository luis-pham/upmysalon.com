'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string | null) => void;
  resetSignal?: number;
};

export function TurnstileWidget({ siteKey, onToken, resetSignal = 0 }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey) return;

    let cancelled = false;
    let attempts = 0;

    const mount = () => {
      if (cancelled) return;
      const el = hostRef.current;
      const tw = window.turnstile;
      if (!el || !tw) {
        if (attempts++ < 40) window.setTimeout(mount, 100);
        return;
      }
      if (widgetIdRef.current) return;
      try {
        widgetIdRef.current = tw.render(el, {
          sitekey: siteKey,
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
          theme: 'light',
          size: 'flexible',
        });
      } catch {
        /* retry once */
        window.setTimeout(mount, 200);
      }
    };

    mount();
    return () => {
      cancelled = true;
      const id = widgetIdRef.current;
      widgetIdRef.current = null;
      if (id && window.turnstile) {
        try {
          window.turnstile.remove(id);
        } catch {
          /* ignore */
        }
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (!resetSignal || !widgetIdRef.current || !window.turnstile) return;
    try {
      window.turnstile.reset(widgetIdRef.current);
      onTokenRef.current(null);
    } catch {
      /* ignore */
    }
  }, [resetSignal]);

  if (!siteKey) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div ref={hostRef} className="min-h-[65px]" />
    </>
  );
}
