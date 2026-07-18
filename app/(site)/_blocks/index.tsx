import Link from 'next/link';
import {
  Bell,
  CalendarClock,
  Camera,
  Check,
  ChartNoAxesColumn,
  Clock3,
  FileText,
  Globe2,
  Headphones,
  Languages,
  MapPin,
  MessageCircle,
  MessagesSquare,
  NotebookPen,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Search,
  Star,
  UserRound,
} from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import { PageHero } from '@/components/ui';
import { FaqAccordion } from '@/components/FaqAccordion';
import { DemoCallBlock } from '@/components/demo/DemoCallBlock';
import { ZaloContactButton } from '@/components/ZaloContactButton';
import type { BangGiaPricingLayout, WebsiteSeoGroup } from '@/content/pricing';

const ICONS = {
  PhoneCall,
  Phone,
  Star,
  MessageCircle,
  Globe2,
  Clock3,
  Search,
  MapPin,
  MessagesSquare,
  Camera,
  Check,
  Bell,
  Languages,
  CalendarClock,
  NotebookPen,
  PhoneForwarded,
  ChartNoAxesColumn,
  FileText,
  Headphones,
  UserRound,
} as const;

export function resolveIcon(name: string) {
  return ICONS[name as keyof typeof ICONS] || Search;
}

export function PainPointsBlock({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string;
  heading: string;
  items: { icon: string; text: string }[];
}) {
  const cols = items.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';
  return (
    <section className="border-y border-black/5 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-roseNude">{eyebrow}</p>}
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        </div>
        <div className={`mx-auto mt-10 grid max-w-4xl gap-5 ${cols}`}>
          {items.map(({ icon, text }) => {
            const Icon = resolveIcon(icon);
            return (
              <div key={text} className="flex h-full flex-col rounded-3xl border border-black/5 bg-cream p-6 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush/25 text-roseNude">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg font-semibold leading-8">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DemoVoiceBlock({
  eyebrow,
  heading,
  intro,
  bullets = [],
  closingLine,
  ctaLabel,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  bullets?: string[];
  closingLine?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-roseNude/15 bg-ink text-white shadow-soft">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">{eyebrow}</p>}
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
              {intro && <p className="mt-4 text-lg leading-8 text-white/72">{intro}</p>}
              {bullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-white/80">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-blush" />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {closingLine && <p className="mt-6 text-base leading-7 text-white/65">{closingLine}</p>}
              {ctaLabel && (
                <Link
                  href="/lien-he"
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white"
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
            <div className="rounded-3xl bg-white p-5 text-ink">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-blush/25 text-roseNude">
                  <PhoneCall className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold">Cuộc gọi mẫu của tiệm nail</p>
                  <p className="text-sm text-black/55">Audio placeholder</p>
                </div>
              </div>
              <audio controls className="w-full" preload="none">
                <source src="/sample-call.mp3" type="audio/mpeg" />
              </audio>
              <p className="mt-3 text-xs leading-5 text-black/50">
                Thay file <strong>/sample-call.mp3</strong> bằng audio thật.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StepsBlock({
  heading,
  items,
}: {
  heading: string;
  items: { number: string; title: string; desc: string }[];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {items.map(({ number, title, desc }) => (
            <div key={number} className="rounded-3xl border border-black/5 bg-cream p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-lg font-semibold text-cream">
                {number}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-black/62">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProofBlock({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; text: string }[];
}) {
  const gridCols =
    items.length === 3
      ? 'max-w-6xl sm:grid-cols-3'
      : items.length === 4
        ? 'max-w-4xl sm:grid-cols-2'
        : 'max-w-5xl sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        <div className={`mx-auto mt-10 grid gap-5 ${gridCols}`}>
          {items.map(({ title, text }) => (
            <div key={title} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-black/62">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanFeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3 text-sm leading-6 sm:text-base sm:leading-7">
          <Check className="mt-1 h-5 w-5 shrink-0 text-roseNude" />
          {feature}
        </li>
      ))}
    </ul>
  );
}

export function WebsiteSeoGroupCard({
  group,
  className = '',
}: {
  group: WebsiteSeoGroup;
  className?: string;
}) {
  return (
    <div
      id={group.id}
      className={`scroll-mt-28 rounded-[2rem] border border-black/8 bg-cream p-7 sm:p-8 ${className}`}
    >
      <h3 className="text-2xl font-semibold sm:text-3xl">{group.name}</h3>
      <p className="mt-3 text-lg font-semibold text-ink/80">{group.prompt}</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {group.cases.map((item) => (
          <div key={item.caseLabel} className="rounded-[1.5rem] border border-black/8 bg-white p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-roseNude">{item.caseLabel}</p>
            <h4 className="mt-3 text-lg font-semibold leading-snug">
              {item.name} — <span className="text-roseNude">{item.price}</span>
            </h4>
            <PlanFeatureList features={item.features} />
          </div>
        ))}
      </div>
      <Link
        href="/lien-he"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-roseNude px-5 py-3 font-semibold text-roseNude transition hover:bg-roseNude hover:text-white sm:w-auto"
      >
        {group.ctaLabel}
      </Link>
    </div>
  );
}

export function PricingBlock({
  heading,
  plans,
  note,
}: {
  heading?: string;
  plans: {
    id?: string;
    name: string;
    price: string;
    description?: string;
    setupNote?: string;
    features: string[];
    highlighted?: boolean;
    ctaLabel?: string;
    secondaryCtaLabel?: string;
    footnote?: string;
  }[];
  note?: string;
}) {
  const gridClass =
    plans.length === 1
      ? 'mx-auto max-w-md grid-cols-1'
      : plans.length === 2
        ? 'mx-auto max-w-4xl sm:grid-cols-2'
        : 'lg:grid-cols-3';
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        )}
        <div className={`mt-12 grid gap-6 ${gridClass}`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              id={plan.id}
              className={`relative scroll-mt-28 rounded-[2rem] border p-7 ${
                plan.highlighted ? 'border-roseNude bg-roseSoft shadow-soft' : 'border-black/8 bg-cream'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-roseNude px-3 py-1 text-xs font-semibold text-ink">
                  Đủ nhất
                </span>
              )}
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              {plan.description ? (
                <p className="mt-2 text-sm leading-6 text-black/62">{plan.description}</p>
              ) : null}
              <p className="mt-4 text-2xl font-semibold text-roseNude">{plan.price}</p>
              {plan.setupNote ? <p className="mt-1 text-sm font-medium text-black/55">{plan.setupNote}</p> : null}
              <PlanFeatureList features={plan.features} />
              <Link
                href="/lien-he"
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-roseNude px-5 py-3 font-semibold text-roseNude transition hover:bg-roseNude hover:text-white"
              >
                {plan.ctaLabel ?? 'Đăng ký thử 1 tháng'}
              </Link>
              {plan.footnote ? (
                <p className="mt-3 text-center text-sm text-black/45">{plan.footnote}</p>
              ) : null}
              {plan.secondaryCtaLabel ? (
                <p className="mt-3 text-center text-sm text-black/45">
                  <Link href="/lien-he" className="underline-offset-2 transition hover:text-roseNude hover:underline">
                    {plan.secondaryCtaLabel}
                  </Link>
                </p>
              ) : null}
            </div>
          ))}
        </div>
        {note && <p className="mt-8 text-center text-lg font-semibold">{note}</p>}
      </div>
    </section>
  );
}

export function WebsitePricingBlock({
  heading,
  group,
  note,
}: {
  heading?: string;
  group: WebsiteSeoGroup;
  note?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        )}
        <div className="mt-12">
          <WebsiteSeoGroupCard group={group} />
        </div>
        {note && <p className="mt-8 text-center text-lg font-semibold">{note}</p>}
      </div>
    </section>
  );
}

export function BangGiaPricingBlock(data: BangGiaPricingLayout) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">
          {data.heading}
        </h2>

        <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] border border-black/8 bg-cream p-6 sm:p-8">
          <h3 className="text-center text-xl font-semibold sm:text-2xl">{data.painHeading}</h3>
          <ul className="mt-6 space-y-3">
            {data.painLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white px-4 py-3 transition hover:border-roseNude/40 hover:bg-roseSoft/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="text-base leading-7 text-ink/80">{link.pain}</span>
                  <span className="shrink-0 text-sm font-semibold text-roseNude">→ {link.packageLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {data.standalonePlans.map((plan) => (
            <div
              key={plan.name}
              id={plan.id}
              className="relative scroll-mt-28 rounded-[2rem] border border-black/8 bg-cream p-7"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-4 text-2xl font-semibold text-roseNude">{plan.price}</p>
              {plan.setupNote ? <p className="mt-1 text-sm font-medium text-black/55">{plan.setupNote}</p> : null}
              <PlanFeatureList features={plan.features} />
              <Link
                href="/lien-he"
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-roseNude px-5 py-3 font-semibold text-roseNude transition hover:bg-roseNude hover:text-white"
              >
                {plan.ctaLabel ?? 'Đăng ký thử 1 tháng'}
              </Link>
              {plan.footnote ? (
                <p className="mt-3 text-center text-sm text-black/45">{plan.footnote}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <WebsiteSeoGroupCard group={data.websiteGroup} />
        </div>

        <div
          id={data.bundle.id}
          className="relative mt-6 scroll-mt-28 rounded-[2rem] border border-roseNude bg-roseSoft p-7 shadow-soft sm:p-8"
        >
          <span className="absolute right-5 top-5 rounded-full bg-roseNude px-3 py-1 text-xs font-semibold text-ink">
            Đủ nhất
          </span>
          <h3 className="pr-20 text-2xl font-semibold sm:text-3xl">{data.bundle.name}</h3>
          <p className="mt-4 text-2xl font-semibold text-roseNude">{data.bundle.price}</p>
          <PlanFeatureList features={data.bundle.features} />
          <Link
            href="/lien-he"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-roseNude px-5 py-3 font-semibold text-roseNude transition hover:bg-roseNude hover:text-white sm:w-auto"
          >
            {data.bundle.ctaLabel ?? 'Đăng ký thử 1 tháng'}
          </Link>
        </div>

        {data.note && <p className="mt-8 text-center text-lg font-semibold">{data.note}</p>}
      </div>
    </section>
  );
}

export function FaqBlock({
  heading,
  items,
}: {
  heading: string;
  items: { q: string; a: string }[];
}) {
  return <FaqAccordion heading={heading} items={items} />;
}

export function CtaBannerBlock({ heading, subheading }: { heading: string; subheading?: string }) {
  return (
    <section className="bg-ink py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">{heading}</h2>
        {subheading && <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{subheading}</p>}
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <a
            href={CONTACT.messenger}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            <MessagesSquare className="h-5 w-5" />
            Nhắn Messenger
          </a>
          <ZaloContactButton className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5">
            <MessageCircle className="h-5 w-5" />
            Nhắn Zalo
          </ZaloContactButton>
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            <Phone className="h-5 w-5" />
            Gọi ngay: {CONTACT.phoneDisplay}
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            <Camera className="h-5 w-5" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export function EffortContrastBlock({
  heading,
  youLabel = 'Anh/chị làm',
  weLabel = 'Công việc của UpMySalon',
  youDo,
  weDo,
}: {
  heading: string;
  youLabel?: string;
  weLabel?: string;
  youDo: string[];
  weDo: string[];
}) {
  return (
    <section className="border-y border-black/5 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/8 bg-cream p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">{youLabel}</p>
            <ul className="mt-5 space-y-4">
              {youDo.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-8 text-black/70">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-black/35" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-roseNude bg-roseSoft p-7 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-roseNude">{weLabel}</p>
            <ul className="mt-5 space-y-4">
              {weDo.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-8 text-ink">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-roseNude" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureBenefitBlock({
  heading,
  items,
}: {
  heading: string;
  items: { icon: string; feature: string; benefit: string; highlight?: boolean }[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon, feature, benefit, highlight }) => {
            const Icon = resolveIcon(icon);
            return (
              <div
                key={feature}
                className={`flex h-full flex-col rounded-3xl border p-6 ${
                  highlight ? 'border-roseNude bg-roseSoft shadow-soft' : 'border-black/5 bg-white shadow-sm'
                }`}
              >
                {highlight && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-roseNude px-3 py-1 text-xs font-semibold text-ink">
                    Điểm nổi
                  </span>
                )}
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush/25 text-roseNude">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold leading-7">{feature}</h3>
                <p className="mt-2 flex-1 leading-7 text-black/62">{benefit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MonthlyValueBlock({
  heading,
  intro,
  oneTime,
  monthly,
  note,
}: {
  heading: string;
  intro?: string;
  oneTime: { label: string; desc: string };
  monthly: { title: string; desc: string }[];
  note?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
          {intro && <p className="mt-4 text-lg leading-8 text-black/65">{intro}</p>}
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/8 bg-cream p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">Phí một lần</p>
            <h3 className="mt-4 text-xl font-semibold">{oneTime.label}</h3>
            <p className="mt-3 leading-7 text-black/62">{oneTime.desc}</p>
          </div>
          <div className="rounded-[2rem] border border-roseNude bg-roseSoft p-7 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-roseNude">Phí tháng — việc làm đều</p>
            <ul className="mt-5 space-y-5">
              {monthly.map(({ title, desc }) => (
                <li key={title}>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 leading-7 text-black/65">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {note && <p className="mx-auto mt-8 max-w-3xl text-center text-lg font-semibold leading-8 text-ink">{note}</p>}
      </div>
    </section>
  );
}

export function MonthlyReportBlock({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-roseNude/20 bg-white p-8 shadow-soft sm:p-10">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl">{heading}</h2>
          <ul className="mx-auto mt-8 max-w-2xl space-y-4">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-8 text-black/70">
                <Check className="mt-1 h-5 w-5 shrink-0 text-roseNude" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type ServicePageData = {
  hero: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    ctaLabel?: string;
    image?: string;
    imageAlt?: string;
  };
  painPoints?: {
    eyebrow?: string;
    heading: string;
    items: { icon: string; text: string }[];
  };
  demoVoice?: Parameters<typeof DemoVoiceBlock>[0];
  proof?: Parameters<typeof ProofBlock>[0];
  steps?: Parameters<typeof StepsBlock>[0];
  effortContrast?: Parameters<typeof EffortContrastBlock>[0];
  featureBenefit?: Parameters<typeof FeatureBenefitBlock>[0];
  monthlyValue?: Parameters<typeof MonthlyValueBlock>[0];
  pricing?: Parameters<typeof PricingBlock>[0] | Parameters<typeof WebsitePricingBlock>[0];
  faq?: Parameters<typeof FaqBlock>[0];
  monthlyReport?: Parameters<typeof MonthlyReportBlock>[0];
  ctaBanner?: Parameters<typeof CtaBannerBlock>[0];
};

function isWebsitePricing(
  pricing: NonNullable<ServicePageData['pricing']>,
): pricing is Parameters<typeof WebsitePricingBlock>[0] {
  return 'group' in pricing && Boolean(pricing.group);
}

export function ServicePageLayout({ data, showDemo = false }: { data: ServicePageData; showDemo?: boolean }) {
  return (
    <>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.heading}
        description={data.hero.subheading}
        ctaLabel={data.hero.ctaLabel}
        image={data.hero.image}
        imageAlt={data.hero.imageAlt}
      />
      {data.painPoints && <PainPointsBlock {...data.painPoints} />}
      {showDemo ? <DemoCallBlock /> : null}
      {data.steps && <StepsBlock {...data.steps} />}
      {data.effortContrast && <EffortContrastBlock {...data.effortContrast} />}
      {data.featureBenefit && <FeatureBenefitBlock {...data.featureBenefit} />}
      {data.monthlyValue && <MonthlyValueBlock {...data.monthlyValue} />}
      {data.proof && <ProofBlock {...data.proof} />}
      {data.pricing &&
        (isWebsitePricing(data.pricing) ? (
          <WebsitePricingBlock {...data.pricing} />
        ) : (
          <PricingBlock {...data.pricing} />
        ))}
      {data.faq && <FaqBlock {...data.faq} />}
      {data.monthlyReport && <MonthlyReportBlock {...data.monthlyReport} />}
      {data.ctaBanner && <CtaBannerBlock {...data.ctaBanner} />}
    </>
  );
}
