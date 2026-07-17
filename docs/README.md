# UpMySalon — Bộ instructions triển khai website + CMS

Bộ docs này để **AI coding tool (Cursor)** đọc và triển khai. Viết theo hướng **mô tả ý định** — AI tự audit codebase và quyết định implementation, không hard-code từng dòng.

## Mục tiêu

Một website marketing đa trang cho **UpMySalon** (dịch vụ số cho chủ tiệm nail người Việt ở Mỹ), có **CMS** để sửa nội dung / ảnh / SEO (title, meta) không cần đụng code, tối ưu SEO thật (server-render + metadata + structured data).

## Stack (bắt buộc)

- **Next.js** (App Router, TypeScript) — cả site lẫn admin chung một app.
- **Payload CMS 3.0** — nhúng trong Next.js, cung cấp admin tại `/admin`.
- **Database:** Supabase **Postgres** (qua Payload postgres adapter / `@payloadcms/db-postgres`). Project/schema **riêng** khỏi RingBooker.
- **Media/ảnh:** Cloudflare **R2** (S3-compatible qua `@payloadcms/storage-s3`).
- **Hosting:** Vercel + domain Namecheap.
- **Styling:** Tailwind CSS (tokens lấy từ **home live** — xem `04-design-system.md`).
- **Hiện trạng repo:** `landing/` là **Next.js App Router (TypeScript)**. Nội dung đọc qua `lib/content.ts` (seed từ `content/pages.ts`). Payload / Supabase / R2 chờ env (`01`–`03`, deploy `06`).

## Cấu trúc bộ docs

| File | Nội dung |
|---|---|
| `README.md` | Tổng quan, thứ tự build, scope guards (file này) |
| `01-setup.md` | Cài Payload + Supabase Postgres + Cloudflare R2 + env |
| `02-content-model.md` | Collections, Globals, Blocks, SEO plugin |
| `03-frontend-and-seo.md` | Routing, render blocks, metadata, JSON-LD, sitemap/robots, ISR |
| `04-design-system.md` | Brand tokens, components, responsive + accessibility |
| `05-pages.md` | Spec + copy tiếng Việt từng trang, mapping field CMS |
| `06-deploy.md` | Deploy Vercel + domain + Supabase production + R2 + SEO ban đầu |
| `08-service-detail.md` | Bổ sung effortContrast / featureBenefit / monthlyValue / monthlyReport |

## Sitemap (các trang)

- `/` — Trang chủ (trọn gói)
- `/le-tan-ai-nghe-may-dat-lich` — Tổng đài AI nghe máy & đặt lịch
- `/danh-gia-google` — Tăng & quản lý đánh giá Google
- `/ai-quan-ly-inbox-facebook-ig` — Trả lời tin nhắn Facebook & Instagram
- `/website-seo` — Website chuẩn SEO + Google Maps
- `/bang-gia` — Bảng giá dịch vụ
- `/gioi-thieu` — Về UpMySalon
- `/lien-he` — Liên hệ
- `/blog` + `/blog/[slug]` — Cẩm nang cho tiệm nail
- `/admin` — Payload admin (CMS)
- `/sitemap.xml`, `/robots.txt`

## Thứ tự triển khai (build order)

1. **Setup** (`01`): dựng Next.js + Payload + Supabase Postgres + R2, chạy được `/admin`.
2. **Content model** (`02`): khai báo collections/globals/blocks + SEO plugin, seed dữ liệu mẫu.
3. **Design system** (`04`): tokens + components dùng chung (nav, footer, button, card).
4. **Frontend + SEO** (`03`): render trang từ CMS, metadata động, JSON-LD, sitemap/robots.
5. **Pages** (`05`): dựng từng trang theo spec, nhập copy tiếng Việt vào CMS.
6. **Deploy** (`06`): Vercel + domain Namecheap + Supabase production + R2 + SEO ban đầu (checklist `03`).

## Quy tắc & scope guards (đọc kỹ)

- **AUDIT trước, code sau.** Nếu repo đã có landing page, audit trước rồi migrate — KHÔNG xoá trắng làm lại nếu không cần.
- **Giữ nguyên thiết kế/tông màu/nội dung hiện có.** Mọi copy tiếng Việt đã có phải được **đưa vào CMS làm giá trị mặc định (seed)**, không viết lại.
- **Mỗi trang là bản ghi trong CMS** — không hard-code nội dung vào JSX. Component chỉ render dữ liệu từ Payload.
- **Không dùng client-side-only rendering cho nội dung** — phải SSR/SSG để Google đọc được.
- **Không thêm dịch vụ/tính năng ngoài spec.** Nếu thiếu thông tin, hỏi lại, đừng tự bịa.
- **Không commit secret.** Mọi key (Supabase, Payload secret) qua env.
- Toàn bộ **UI/nội dung hiển thị bằng tiếng Việt**; giọng "anh/chị", ấm, bán kết quả không bán công nghệ.

## Acceptance (xong khi)

- `/admin` đăng nhập được, sửa được nội dung + ảnh + SEO của mọi trang.
- Đổi nội dung trong CMS → site cập nhật (ISR/revalidate).
- View-source mỗi trang thấy `<title>`, meta description, OG, JSON-LD đúng theo CMS.
- Lighthouse SEO ~100, mobile responsive, `/sitemap.xml` + `/robots.txt` hoạt động.
