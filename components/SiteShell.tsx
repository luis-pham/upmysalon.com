'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { FloatingChat } from '@/components/FloatingChat';
import { MotionRoot } from '@/components/MotionRoot';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSticky =
    pathname === '/lien-he' ||
    pathname?.startsWith('/en/') ||
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname === '/sms-consent' ||
    pathname === '/refund';
  const padBottom = hideSticky ? 'pb-0' : 'pb-24 md:pb-0';

  return (
    <div className={`min-h-screen overflow-x-hidden ${padBottom}`}>
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyMobileCta />
      <FloatingChat />
      <MotionRoot />
    </div>
  );
}
