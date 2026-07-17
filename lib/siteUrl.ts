/**
 * Canonical site origin for SEO (canonical, sitemap, robots, OG, JSON-LD).
 * Prefer NEXT_PUBLIC_SITE_URL; NEXT_PUBLIC_SERVER_URL kept as fallback alias.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.NEXT_PUBLIC_SERVER_URL?.trim() || '';

  const isProd = process.env.NODE_ENV === 'production';

  if (!raw) {
    if (isProd) {
      throw new Error(
        'Missing NEXT_PUBLIC_SITE_URL (or NEXT_PUBLIC_SERVER_URL). Production builds require a public site origin, e.g. https://upmysalon.com',
      );
    }
    return 'http://localhost:3000';
  }

  let origin: string;
  try {
    origin = new URL(raw).origin;
  } catch {
    throw new Error(`Invalid site URL: ${raw}`);
  }

  if (isProd && /^(localhost|127\.0\.0\.1)$/i.test(new URL(origin).hostname)) {
    throw new Error(
      `Production site URL must not be localhost (got ${origin}). Set NEXT_PUBLIC_SITE_URL=https://upmysalon.com`,
    );
  }

  return origin;
}

/** Absolute URL for a site path (`/` → base, `/blog/x` → base/blog/x). */
export function absoluteUrl(path = '/'): string {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
