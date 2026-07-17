import type { Metadata } from 'next';
import { generateLegalMetadata, LegalPage } from '@/app/(site)/_legal/legalPageHandlers';

export const revalidate = 60;

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata('sms-consent', 'vi');
}

export default function Page() {
  return <LegalPage slug="sms-consent" locale="vi" />;
}
