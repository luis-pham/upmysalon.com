'use client';

import { usePathname } from 'next/navigation';
import { PrimaryCTA } from '@/components/ui';
import { stickyCtaLabelForPath } from '@/lib/constants';

export function StickyMobileCta() {
  const pathname = usePathname();
  if (pathname === '/lien-he' || pathname?.startsWith('/en/') || pathname === '/privacy' || pathname === '/terms' || pathname === '/sms-consent' || pathname === '/refund') {
    return null;
  }

  return (
    <div
      data-sticky-mobile-cta
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden"
    >
      <PrimaryCTA className="min-h-12 w-full py-3 text-sm" label={stickyCtaLabelForPath(pathname)} />
    </div>
  );
}
