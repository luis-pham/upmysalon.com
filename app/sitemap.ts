import type { MetadataRoute } from 'next';
import { getAllPageSlugs, getPosts } from '@/lib/content';
import { getAllLegalSlugs } from '@/lib/legal';
import { getSiteUrl } from '@/lib/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes = ['', ...getAllPageSlugs(), 'blog'].map((path) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: now,
  }));

  const legalVi = getAllLegalSlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
  }));

  const legalEn = getAllLegalSlugs().map((slug) => ({
    url: `${base}/en/${slug}`,
    lastModified: now,
  }));

  const posts = getPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...legalVi, ...legalEn, ...posts];
}
