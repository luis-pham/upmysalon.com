import { GoogleTagManager as NextGoogleTagManager } from '@next/third-parties/google';

/** Load GTM only when NEXT_PUBLIC_GTM_ID is set (e.g. GTM-XXXXXXX). */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!gtmId) return null;
  return <NextGoogleTagManager gtmId={gtmId} />;
}
