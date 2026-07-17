import Link from 'next/link';
import { LexicalBody } from '@/components/LexicalBody';
import {
  formatLegalUpdated,
  legalPath,
  type LegalLocale,
  type LegalPageRecord,
} from '@/lib/legal';

export function LegalPageView({
  page,
  locale,
}: {
  page: LegalPageRecord;
  locale: LegalLocale;
}) {
  const title = locale === 'en' ? page.titleEn : page.title;
  const body = locale === 'en' ? page.bodyEn : page.bodyVi;
  const otherLocale: LegalLocale = locale === 'en' ? 'vi' : 'en';
  const otherHref = legalPath(page.slug, otherLocale);

  return (
    <article className="border-b border-black/5">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-roseNude">
            {locale === 'en' ? 'Legal' : 'Pháp lý'}
          </p>
          <div className="inline-flex overflow-hidden rounded-full border border-black/10 bg-white text-sm font-semibold shadow-sm">
            <Link
              href={legalPath(page.slug, 'vi')}
              className={`px-4 py-2 transition ${
                locale === 'vi' ? 'bg-ink text-cream' : 'text-ink/70 hover:bg-cream'
              }`}
              hrefLang="vi"
              lang="vi"
            >
              VI
            </Link>
            <Link
              href={legalPath(page.slug, 'en')}
              className={`px-4 py-2 transition ${
                locale === 'en' ? 'bg-ink text-cream' : 'text-ink/70 hover:bg-cream'
              }`}
              hrefLang="en"
              lang="en"
            >
              EN
            </Link>
          </div>
        </div>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm font-medium text-black/50">{formatLegalUpdated(page.lastUpdated, locale)}</p>

        <div className="mt-10">
          <LexicalBody data={body} />
        </div>

        <p className="mt-12 text-sm text-black/45">
          {locale === 'en' ? 'Also available in' : 'Xem bản'}{' '}
          <Link href={otherHref} className="font-semibold text-roseNude hover:underline" hrefLang={otherLocale}>
            {otherLocale === 'en' ? 'English' : 'tiếng Việt'}
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
