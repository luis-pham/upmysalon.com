import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { headers } from 'next/headers';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessJsonLd, organizationJsonLd } from '@/lib/seo/jsonld';
import { getSiteUrl } from '@/lib/siteUrl';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Dịch vụ AI & marketing cho tiệm nail Việt | UpMySalon',
    template: '%s | UpMySalon',
  },
  description:
    'Phần mềm tiếp tân AI, Marketing và chăm sóc khách hàng giúp tiệm nail ở Mỹ tăng trưởng doanh thu: nghe máy, review 5 sao, tin nhắn FB/IG, website & Google Maps. Nói tiếng Việt, không hợp đồng dài.',
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get('x-pathname') || '';
  const lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'vi';

  return (
    <html lang={lang} className={beVietnamPro.variable}>
      <body className="bg-cream font-sans text-ink antialiased">
        <GoogleTagManager />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        {children}
      </body>
    </html>
  );
}
