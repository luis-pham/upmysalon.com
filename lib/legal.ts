import seed from '@/content/legalPages.seed.json';
import { getSiteUrl } from '@/lib/siteUrl';

export const LEGAL_SLUGS = ['privacy', 'terms', 'sms-consent', 'refund'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];
export type LegalLocale = 'vi' | 'en';

export type LexicalNode = {
  type: string;
  tag?: string;
  listType?: string;
  text?: string;
  format?: number | string;
  url?: string;
  fields?: { url?: string; linkType?: string; newTab?: boolean };
  children?: LexicalNode[];
  [key: string]: unknown;
};

export type LexicalRichText = {
  root: LexicalNode;
};

export type LegalPageRecord = {
  slug: LegalSlug;
  title: string;
  titleEn: string;
  lastUpdated: string | null;
  bodyVi: LexicalRichText;
  bodyEn: LexicalRichText;
  seoVi: { title: string; description: string };
  seoEn: { title: string; description: string };
};

const FOOTER_LABELS: Record<LegalSlug, string> = {
  privacy: 'Chính sách Bảo mật',
  terms: 'Điều khoản Dịch vụ',
  'sms-consent': 'Đồng ý nhận SMS',
  refund: 'Chính sách Hoàn tiền',
};

export function isLegalSlug(slug: string): slug is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(slug);
}

/**
 * CMS accessor for legalPages.
 * Today: seed JSON (same shape as Payload collection).
 * When Payload Local API is available, swap the body of this function only.
 */
export async function getLegalPage(slug: string): Promise<LegalPageRecord | null> {
  if (!isLegalSlug(slug)) return null;

  // --- Payload Local API (uncomment when payload.config + DATABASE_URI are live) ---
  // const payload = await getPayload({ config })
  // const { docs } = await payload.find({
  //   collection: 'legalPages',
  //   where: { slug: { equals: slug } },
  //   limit: 1,
  // })
  // return (docs[0] as LegalPageRecord) ?? null

  const doc = (seed as LegalPageRecord[]).find((item) => item.slug === slug);
  return doc ?? null;
}

export function getAllLegalSlugs(): LegalSlug[] {
  return [...LEGAL_SLUGS];
}

export function getLegalFooterLinks() {
  return LEGAL_SLUGS.map((slug) => ({
    href: `/${slug}`,
    label: FOOTER_LABELS[slug],
  }));
}

export function legalPath(slug: LegalSlug, locale: LegalLocale) {
  return locale === 'en' ? `/en/${slug}` : `/${slug}`;
}

export function formatLegalUpdated(lastUpdated: string | null, locale: LegalLocale) {
  if (!lastUpdated) {
    return locale === 'en' ? 'Last updated: [DATE]' : 'Cập nhật lần cuối: [NGÀY]';
  }
  const date = new Date(lastUpdated);
  if (Number.isNaN(date.getTime())) {
    return locale === 'en' ? 'Last updated: [DATE]' : 'Cập nhật lần cuối: [NGÀY]';
  }
  const formatted = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
  return locale === 'en' ? `Last updated: ${formatted}` : `Cập nhật lần cuối: ${formatted}`;
}

export function buildLegalMetadata(page: LegalPageRecord, locale: LegalLocale): MetadataLike {
  const seo = locale === 'en' ? page.seoEn : page.seoVi;
  const path = legalPath(page.slug, locale);
  const base = getSiteUrl();

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        vi: `${base}${legalPath(page.slug, 'vi')}`,
        en: `${base}${legalPath(page.slug, 'en')}`,
        'x-default': `${base}${legalPath(page.slug, 'vi')}`,
      },
    },
    openGraph: {
      title: `${seo.title} | UpMySalon`,
      description: seo.description,
      locale: locale === 'en' ? 'en_US' : 'vi_VN',
      type: 'website' as const,
      url: `${base}${path}`,
    },
    robots: { index: true, follow: true },
  };
}

type MetadataLike = {
  title: string;
  description: string;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  openGraph: {
    title: string;
    description: string;
    locale: string;
    type: 'website';
    url: string;
  };
  robots: { index: boolean; follow: boolean };
};
