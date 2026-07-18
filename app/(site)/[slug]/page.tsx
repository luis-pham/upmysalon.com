import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CtaBannerBlock,
  FaqBlock,
  PricingBlock,
  ProofBlock,
  ServicePageLayout,
} from '@/app/(site)/_blocks';
import { PageHero } from '@/components/ui';
import { CONTACT } from '@/lib/constants';
import { buildMetadata, getAllPageSlugs, getPage } from '@/lib/content';
import { isLegalSlug } from '@/lib/legal';
import { JsonLd } from '@/components/JsonLd';
import { faqPageJsonLd, serviceJsonLd } from '@/lib/seo/jsonld';
import {
  Camera,
  Clock3,
  Globe2,
  MessageCircle,
  MessagesSquare,
  Phone,
  Search,
} from 'lucide-react';

const SERVICE_SLUGS = new Set([
  'le-tan-ai-nghe-may-dat-lich',
  'danh-gia-google',
  'ai-quan-ly-inbox-facebook-ig',
  'website-seo',
]);

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page?.seo) return {};
  return buildMetadata(page.seo, `/${slug}`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // Legal routes have dedicated pages; never serve them via marketing [slug].
  if (isLegalSlug(slug)) notFound();
  const page = getPage(slug);
  if (!page) notFound();

  if (slug === 'bang-gia') {
    const bangGiaPage = page as unknown as {
      hero: {
        eyebrow?: string;
        heading: string;
        subheading?: string;
        ctaLabel?: string;
        image?: string;
        imageAlt?: string;
      };
      pricing: Parameters<typeof PricingBlock>[0];
      faq: Parameters<typeof FaqBlock>[0];
      ctaBanner: Parameters<typeof CtaBannerBlock>[0];
    };
    return (
      <>
        <JsonLd data={faqPageJsonLd(bangGiaPage.faq.items)} />
        <PageHero
          eyebrow={bangGiaPage.hero.eyebrow}
          title={bangGiaPage.hero.heading}
          description={bangGiaPage.hero.subheading}
          ctaLabel={bangGiaPage.hero.ctaLabel}
          image={bangGiaPage.hero.image}
          imageAlt={bangGiaPage.hero.imageAlt}
        />
        <PricingBlock {...bangGiaPage.pricing} />
        <FaqBlock {...bangGiaPage.faq} />
        <CtaBannerBlock {...bangGiaPage.ctaBanner} />
      </>
    );
  }

  if (slug === 'gioi-thieu') {
    const aboutPage = page as unknown as {
      hero: {
        eyebrow?: string;
        heading: string;
        subheading?: string;
        ctaLabel?: string;
        image?: string;
        imageAlt?: string;
      };
      richText: string[];
      proof: Parameters<typeof ProofBlock>[0];
      ctaBanner: Parameters<typeof CtaBannerBlock>[0];
    };
    return (
      <>
        <PageHero
          eyebrow={aboutPage.hero.eyebrow}
          title={aboutPage.hero.heading}
          description={aboutPage.hero.subheading}
          ctaLabel={aboutPage.hero.ctaLabel}
          image={aboutPage.hero.image}
          imageAlt={aboutPage.hero.imageAlt}
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6 rounded-[2rem] border border-black/5 bg-white p-8 shadow-sm sm:p-10">
            <img
              src="/brand/logo-with-tagline.svg"
              alt="UpMySalon"
              className="mx-auto h-16 w-auto sm:h-20"
            />
            {aboutPage.richText.map((para) => (
              <p key={para.slice(0, 24)} className="text-lg leading-8 text-black/68">
                {para.split(/(https?:\/\/[^\s)]+)/g).map((part, index) =>
                  /^https?:\/\//.test(part) ? (
                    <a
                      key={`${part}-${index}`}
                      href={part}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-roseNude underline-offset-2 hover:underline"
                    >
                      {part.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <span key={`${part.slice(0, 12)}-${index}`}>{part}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </section>
        <ProofBlock {...aboutPage.proof} />
        <CtaBannerBlock {...aboutPage.ctaBanner} />
      </>
    );
  }

  if (slug === 'lien-he') {
    const contactPage = page as unknown as {
      hero: {
        eyebrow?: string;
        heading: string;
        subheading?: string;
        image?: string;
        imageAlt?: string;
      };
    };
    return (
      <>
        <PageHero
          eyebrow={contactPage.hero.eyebrow}
          title={contactPage.hero.heading}
          description={contactPage.hero.subheading}
          image={contactPage.hero.image}
          imageAlt={contactPage.hero.imageAlt}
        />
        <section className="bg-ink py-16 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-white/70">
              UpMySalon xem Google, review và cách khách đang tìm thấy tiệm. Sau đó nói thẳng tiệm đang thiếu gì —
              không ép mua.
            </p>
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
              <a
                href={CONTACT.zalo}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Nhắn Zalo
              </a>
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
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Phản hồi bằng tiếng Việt
              </span>
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Kiểm tra rõ ràng, dễ hiểu
              </span>
              <span className="flex items-center gap-2">
                <Globe2 className="h-4 w-4" />
                Phục vụ tiệm nail tại Mỹ
              </span>
            </div>
          </div>
        </section>
      </>
    );
  }

  const serviceData = page as unknown as Parameters<typeof ServicePageLayout>[0]['data'] & {
    seo: { title: string; description: string };
    faq?: { items: Array<{ q: string; a: string }> };
  };

  return (
    <>
      {SERVICE_SLUGS.has(slug) && (
        <JsonLd
          data={serviceJsonLd({
            name: serviceData.seo.title,
            description: serviceData.seo.description,
            path: `/${slug}`,
          })}
        />
      )}
      {serviceData.faq?.items?.length ? <JsonLd data={faqPageJsonLd(serviceData.faq.items)} /> : null}
      <ServicePageLayout data={serviceData} showDemo={slug === 'le-tan-ai-nghe-may-dat-lich'} />
    </>
  );
}
