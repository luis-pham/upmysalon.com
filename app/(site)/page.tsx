import type { Metadata } from 'next';
import HomePage, { HOME_FAQS } from '@/components/HomePage';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/content';
import { faqPageJsonLd } from '@/lib/seo/jsonld';

const homeSeo = {
  title: 'Dịch vụ AI & marketing cho tiệm nail Việt | UpMySalon',
  description:
    'Đội ngũ người Việt giúp tiệm nail ở Mỹ đông khách hơn: nghe máy, review 5 sao, tin nhắn FB/IG, website & Google Maps. Nói tiếng Việt, không hợp đồng dài.',
};

export const metadata: Metadata = {
  ...buildMetadata(homeSeo, '/'),
  title: {
    absolute: homeSeo.title,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQS.map(([q, a]) => ({ q, a })))} />
      <HomePage />
    </>
  );
}
