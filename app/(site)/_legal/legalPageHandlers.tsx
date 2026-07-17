import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPageView } from '@/components/LegalPageView';
import {
  buildLegalMetadata,
  getLegalPage,
  isLegalSlug,
  type LegalLocale,
  type LegalSlug,
} from '@/lib/legal';

export async function generateLegalMetadata(
  slug: LegalSlug,
  locale: LegalLocale,
): Promise<Metadata> {
  const page = await getLegalPage(slug);
  if (!page) return {};
  return buildLegalMetadata(page, locale);
}

export async function LegalPage({
  slug,
  locale,
}: {
  slug: string;
  locale: LegalLocale;
}) {
  if (!isLegalSlug(slug)) notFound();
  const page = await getLegalPage(slug);
  if (!page) notFound();

  return (
    <div lang={locale}>
      <LegalPageView page={page} locale={locale} />
    </div>
  );
}
