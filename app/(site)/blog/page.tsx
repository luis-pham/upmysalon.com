import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { buildMetadata, getBlogIndex, getPosts } from '@/lib/content';

export function generateMetadata(): Metadata {
  return buildMetadata(getBlogIndex().seo, '/blog');
}

export default function BlogIndexPage() {
  const index = getBlogIndex();
  const posts = getPosts();

  return (
    <>
      <PageHero
        eyebrow={index.hero.eyebrow}
        title={index.hero.heading}
        description={index.hero.subheading}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex h-full flex-col rounded-[2rem] border border-black/5 bg-cream p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="inline-flex w-fit rounded-full bg-blush/25 px-3 py-1 text-xs font-semibold text-roseNude">
                  {post.tag}
                </span>
                <h2 className="mt-4 text-xl font-semibold leading-7">{post.title}</h2>
                <p className="mt-3 flex-1 leading-7 text-black/62">{post.excerpt}</p>
                <span className="mt-6 text-sm font-semibold text-roseNude">Đọc bài →</span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-black/50">
            Cần hỗ trợ ngay?{' '}
            <Link href="/lien-he" className="font-semibold text-roseNude hover:underline">
              Liên hệ UpMySalon
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
