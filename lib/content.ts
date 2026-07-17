import {
  bangGia,
  blogIndex,
  blogPosts,
  danhGiaGoogle,
  gioiThieu,
  lienHe,
  ngheMay,
  tinNhan,
  websiteSeo,
} from '@/content/pages';
import type { PageSlug } from '@/lib/constants';
import { absoluteUrl } from '@/lib/siteUrl';

const pagesBySlug = {
  'le-tan-ai-nghe-may-dat-lich': ngheMay,
  'danh-gia-google': danhGiaGoogle,
  'ai-quan-ly-inbox-facebook-ig': tinNhan,
  'website-seo': websiteSeo,
  'bang-gia': bangGia,
  'gioi-thieu': gioiThieu,
  'lien-he': lienHe,
} as const;

export type ContentPage = (typeof pagesBySlug)[PageSlug];

export function getPage(slug: string) {
  if (!(slug in pagesBySlug)) return null;
  return pagesBySlug[slug as PageSlug];
}

export function getAllPageSlugs(): PageSlug[] {
  return Object.keys(pagesBySlug) as PageSlug[];
}

export function getPosts() {
  return blogPosts;
}

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getBlogIndex() {
  return blogIndex;
}

/** Self-referencing canonical + OG for marketing/blog pages. */
export function buildMetadata(
  seo: { title: string; description: string },
  path: string,
  options?: { ogType?: 'website' | 'article'; locale?: string },
) {
  const clean = seo.title
    .replace(/\s*[|]\s*UpMySalon\s*$/i, '')
    .replace(/\s*[—–-]\s*UpMySalon\s*$/i, '')
    .trim();
  const canonical = absoluteUrl(path);
  return {
    title: clean,
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${clean} | UpMySalon`,
      description: seo.description,
      locale: options?.locale ?? 'vi_VN',
      type: options?.ogType ?? ('website' as const),
      url: canonical,
    },
  };
}
