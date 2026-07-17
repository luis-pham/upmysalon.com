/**
 * Server-only helpers for calling RingBooker public demo APIs with the partner key.
 * Never import this from client components.
 */

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`missing_env:${name}`);
  }
  return value;
}

export function getRingbookerSessionUrl(): string {
  return requireEnv('RINGBOOKER_DEMO_SESSION_URL').replace(/\/$/, '');
}

export function getPartnerOrigin(): string {
  return (
    process.env.DEMO_PARTNER_ORIGIN?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SERVER_URL?.trim() ||
    'https://upmysalon.com'
  );
}

export type RingbookerProxyResult = {
  status: number;
  body: Record<string, unknown>;
};

export async function callRingbookerDemo(
  pathSuffix: '' | '/release' | '/validate-appointment-time',
  body: unknown,
): Promise<RingbookerProxyResult> {
  const partnerKey = requireEnv('DEMO_PARTNER_KEY');
  const origin = getPartnerOrigin();
  const url = `${getRingbookerSessionUrl()}${pathSuffix}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
      'X-Demo-Partner-Key': partnerKey,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body: json };
}
