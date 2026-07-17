import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CtaBannerBlock } from '@/app/(site)/_blocks';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, getPost, getPosts } from '@/lib/content';
import { blogPostingJsonLd } from '@/lib/seo/jsonld';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata(
    { title: post.title, description: post.excerpt },
    `/blog/${slug}`,
    { ogType: 'article' },
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.publishedAt,
        })}
      />
      <article className="border-b border-black/5">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link href="/blog" className="text-sm font-semibold text-roseNude hover:underline">
            ← Cẩm nang
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-roseNude">{post.tag}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-black/50">{post.publishedAt}</p>
          <div className="mt-10 space-y-6">
            {post.body.map((para) => (
              <p key={para.slice(0, 32)} className="text-lg leading-8 text-black/68">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>
      <CtaBannerBlock
        heading="Muốn UpMySalon giúp tiệm anh/chị?"
        subheading="Nhận kiểm tra Google + review miễn phí 15 phút — Messenger, Zalo, gọi hoặc Instagram."
      />
    </>
  );
}
