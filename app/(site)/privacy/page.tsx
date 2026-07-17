import type { Metadata } from 'next';
import { generateLegalMetadata, LegalPage } from '@/app/(site)/_legal/legalPageHandlers';

export const revalidate = 60;

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata('privacy', 'vi');
}

export default function Page() {
  return <LegalPage slug="privacy" locale="vi" />;
}
