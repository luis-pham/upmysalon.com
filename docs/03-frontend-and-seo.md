# 03 — Frontend + SEO

Đây là phần quyết định điểm SEO (không phải CMS). Bắt buộc **server-render + metadata động + structured data**.

## Routing (App Router)

- `app/(site)/page.tsx` → trang chủ (slug `home`).
- `app/(site)/[slug]/page.tsx` → dynamic cho các trang marketing: `le-tan-ai-nghe-may-dat-lich`, `danh-gia-google`, `ai-quan-ly-inbox-facebook-ig`, `website-seo`, `bang-gia`, `gioi-thieu`, `lien-he`. **Không** dùng cho legal slugs.
- `app/(site)/privacy|terms|sms-consent|refund/page.tsx` → trang pháp lý VI (collection `legalPages`).
- `app/(site)/en/[slug]/page.tsx` → trang pháp lý EN (`privacy`, `terms`, `sms-consent`, `refund`).
- `app/(site)/blog/page.tsx` → danh sách posts.
- `app/(site)/blog/[slug]/page.tsx` → chi tiết post.
- `/admin` → Payload admin (tự có).
- `app/sitemap.ts`, `app/robots.ts` → sitemap + robots.

Layout `(site)` render `<Header>` (từ global `navigation`) + `<Footer>` (từ global `footer`) bao quanh nội dung.

## Render nội dung từ CMS

- Server component fetch `Page` (kèm `blocks`) qua **Local API**.
- Một `<BlockRenderer>` map `blockType` → component tương ứng (`Hero`, `PainPoints`, `DemoVoice`, `Services`, `Steps`, `Proof`, `Pricing`, `Faq`, `CtaBanner`, `RichText`, `ContactBlock`).
- Mỗi block component nhận data từ CMS, không chứa text cứng.
- Ảnh render bằng `next/image` với `alt` lấy từ CMS; dùng image sizes Payload sinh sẵn.

## Metadata động (bắt buộc)

- Mỗi route export `generateMetadata()`:
  - Đọc group `seo` của bản ghi từ CMS.
  - Fallback về `siteSettings.defaultSeo` khi trống.
  - Xuất: `title`, `description`, `alternates.canonical`, `openGraph` (title, description, image OG 1200x630, url, type), `twitter` (card summary_large_image), `robots` (noindex nếu `seo.noIndex`).
- Title pattern: `"{seo.title} | UpMySalon"` (cho phép override hoàn toàn).

## Structured data (JSON-LD)

Chèn `<script type="application/ld+json">` (render server-side):

- **Toàn site / trang chủ:** `Organization` + `LocalBusiness` (tên UpMySalon, logo, sameAs mạng xã hội, contactPoint từ `siteSettings.contact`).
- **Trang dịch vụ:** `Service` (name, description, provider = UpMySalon, areaServed = US, audience = chủ tiệm nail).
- **Blog post:** `Article` / `BlogPosting` (headline, image, datePublished, author).
- **FAQ block:** `FAQPage` (từ items của block faq) — giúp hiển thị rich result.
- **Breadcrumb:** `BreadcrumbList` cho trang con.

## Sitemap & robots

- `app/sitemap.ts`: liệt kê động tất cả `pages` + `posts` published (loại trang `noIndex`), kèm `lastModified`.
- `app/robots.ts`: allow all, trỏ tới sitemap; **disallow `/admin` và `/api`**.

## ISR / cập nhật nội dung

- Trang site dùng ISR: `revalidate` theo thời gian (ví dụ 60s) **hoặc** on-demand revalidate.
- On-demand tốt hơn: Payload `afterChange` hook gọi `revalidatePath`/`revalidateTag` khi nội dung đổi → sửa CMS là site cập nhật gần như tức thì mà vẫn static/nhanh.

## Hiệu năng (Core Web Vitals)

- `next/image` cho mọi ảnh; ảnh hero `priority`, phần dưới `loading="lazy"`.
- Font tối ưu qua `next/font`.
- Hạn chế JS client; block tĩnh render server. Audio demo lazy-load.
- Mục tiêu Lighthouse: SEO ~100, Performance mobile tốt.

## i18n / ngôn ngữ

- Nội dung hiển thị **tiếng Việt**. Set `<html lang="vi">`.
- Slug tiếng Việt không dấu (đã chốt). Không cần đa ngôn ngữ ở giai đoạn này.

## Checklist SEO (nghiệm thu)

- [ ] View-source mỗi trang có `<title>` + meta description đúng theo CMS.
- [ ] OG image + Twitter card hiện đúng khi share link.
- [ ] JSON-LD hợp lệ (test bằng Rich Results Test).
- [ ] `/sitemap.xml` liệt kê đủ trang, `/robots.txt` chặn `/admin`.
- [ ] `<html lang="vi">`, heading H1 duy nhất mỗi trang.
- [ ] Ảnh có `alt`. Lighthouse SEO ~100. Mobile responsive.
- [ ] Đổi nội dung trong CMS → site cập nhật.

## Scope guards

- KHÔNG client-side-only rendering cho nội dung chính.
- KHÔNG hard-code metadata — tất cả từ CMS.
- KHÔNG để `/admin`, `/api` lọt vào sitemap/index.
