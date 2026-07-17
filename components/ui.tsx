import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CTA_TEXT } from '@/lib/constants';

export function PrimaryCTA({
  className = '',
  label = CTA_TEXT,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href="/lien-he"
      className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-center text-base font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-taupe focus:outline-none focus:ring-4 focus:ring-blush/40 sm:text-lg ${className}`}
    >
      {label}
      <ArrowRight className="h-5 w-5 shrink-0" />
    </Link>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-roseNude">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-8 text-black/65">{description}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  image,
  imageAlt = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  image?: string;
  imageAlt?: string;
}) {
  if (!image) {
    return (
      <section className="relative isolate overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(201,143,158,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(201,163,93,0.14),transparent_30%)]" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-roseNude">{eyebrow}</p>}
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/65">{description}</p>}
          {ctaLabel && (
            <div className="mt-8 flex justify-center">
              <PrimaryCTA className="w-full sm:w-auto" label={ctaLabel} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(201,143,158,0.30),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(201,163,93,0.20),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-24">
        <div>
          {eyebrow && (
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-roseNude">{eyebrow}</p>
          )}
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/68 sm:text-xl sm:leading-9">{description}</p>
          )}
          {ctaLabel && (
            <div className="mt-8 flex flex-col items-start gap-4">
              <PrimaryCTA className="w-full sm:w-auto" label={ctaLabel} />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-blush/30 blur-2xl" />
          <Image
            src={image}
            alt={imageAlt || title}
            width={1400}
            height={1750}
            priority
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}
