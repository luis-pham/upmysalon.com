import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateLegalMetadata, LegalPage } from '@/app/(site)/_legal/legalPageHandlers';
import { getAllLegalSlugs, isLegalSlug } from '@/lib/legal';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  return generateLegalMetadata(slug, 'en');
}

export default async function EnglishLegalPage({ params }: Props) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  return <LegalPage slug={slug} locale="en" />;
}
