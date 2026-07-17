import { CONTACT } from '@/lib/constants';
import { absoluteUrl, getSiteUrl } from '@/lib/siteUrl';

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: 'UpMySalon',
    legalName: 'RingBooker LLC',
    url,
    logo: absoluteUrl('/brand/logo-horizontal.svg'),
    image: absoluteUrl('/hero/upmysalon.jpg'),
    description: 'Dịch vụ số cho chủ tiệm nail người Việt tại Mỹ',
    telephone: CONTACT.phone,
    sameAs: [CONTACT.instagram, CONTACT.messenger, CONTACT.zalo, 'https://ringbooker.com'].filter(Boolean),
    parentOrganization: {
      '@type': 'Organization',
      name: 'RingBooker LLC',
      url: 'https://ringbooker.com',
    },
  };
}

export function localBusinessJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}/#localbusiness`,
    name: 'UpMySalon',
    description: 'Dịch vụ số cho chủ tiệm nail người Việt tại Mỹ',
    url,
    logo: absoluteUrl('/brand/logo-horizontal.svg'),
    image: absoluteUrl('/hero/upmysalon.jpg'),
    telephone: CONTACT.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    sameAs: [CONTACT.instagram, CONTACT.messenger, CONTACT.zalo, 'https://ringbooker.com'].filter(Boolean),
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${url}/#organization`,
      name: 'RingBooker LLC',
    },
  };
}

export function serviceJsonLd(params: {
  name: string;
  description: string;
  path: string;
}) {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: absoluteUrl(params.path),
    provider: {
      '@type': 'Organization',
      '@id': `${url}/#organization`,
      name: 'UpMySalon',
      url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

export function faqPageJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function blogPostingJsonLd(params: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}) {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    image: absoluteUrl(params.image || '/hero/upmysalon.jpg'),
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    author: {
      '@type': 'Organization',
      name: 'UpMySalon',
      url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'UpMySalon',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/brand/logo-horizontal.svg'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(params.path),
    },
  };
}
