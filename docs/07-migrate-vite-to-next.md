# 07 — Migrate Vite → Next.js (App Router)

Mục tiêu: chuyển app landing hiện tại (Vite SPA) sang **Next.js App Router (TypeScript)**, **giữ nguyên UI, thiết kế, nội dung và trang home**, để nội dung server-render (SEO) và sẵn sàng cắm Payload (`01`–`03`). Đây là bước làm cho chuẩn — không viết lại giao diện, không đổi copy.

## Nguyên tắc

- **AUDIT trước.** Đọc toàn bộ app Vite hiện có trước khi động: liệt kê routes, `src/components/blocks.jsx`, `src/content/pages.js`, cách styling (Tailwind?), assets, router đang dùng (react-router?).
- **Port, không rewrite.** Tái dùng tối đa component + content đã có. Migration là cơ học.
- **Home không đụng.** Giữ nguyên 1:1 giao diện + nội dung trang chủ.
- **Không thêm tính năng, không đổi thiết kế/màu/copy.**

## Bước 1 — Dựng khung Next.js

- Khởi tạo Next.js App Router + TypeScript **trong cùng repo** (thư mục `landing` hiện tại, hoặc tạo app Next mới rồi chuyển dần — chọn cách ít rủi ro nhất sau khi audit).
- Port **Tailwind config** + **design tokens** từ `04-design-system.md` (cream `#FFFAF8`, roseNude `#B85C73`, blush, ink…). Giữ y hệt giá trị đang chạy ở home.
- Font **Be Vietnam Pro (600…)** qua `next/font` (không dùng `<link>` thủ công) — tối ưu + hỗ trợ tiếng Việt.
- Global CSS / reset port sang `app/globals.css`. Đặt `<html lang="vi">` trong root layout.

## Bước 2 — Routing (react-router → App Router)

Map từng route sang file, **giữ nguyên path**:

- `/` → `app/(site)/page.tsx` (home — port nguyên)
- `/le-tan-ai-nghe-may-dat-lich`, `/danh-gia-google`, `/ai-quan-ly-inbox-facebook-ig`, `/website-seo`, `/bang-gia`, `/gioi-thieu`, `/lien-he` → `app/(site)/[slug]/page.tsx` (dynamic, đọc theo slug) **hoặc** file riêng từng route nếu rõ ràng hơn.
- `/blog` → `app/(site)/blog/page.tsx`; `/blog/:slug` → `app/(site)/blog/[slug]/page.tsx`.
- Layout `(site)` bọc `<Header>` + `<Footer>` (port từ Vite), giữ nav Dịch vụ ▾ + active state + sticky CTA (tắt ở `/lien-he`).

## Bước 3 — Port blocks (quan trọng)

- `blocks.jsx` → các component trong `app/(site)/_blocks/` ở dạng **server component mặc định** (để render server-side, tốt SEO).
- Chỉ đánh dấu **`"use client"`** cho phần thật sự tương tác:
  - Nav dropdown + mobile hamburger
  - FAQ accordion
  - Audio player (demo voice)
  - Sticky mobile CTA
  - Bất kỳ state/hook nào
- Component tĩnh (hero, painPoints, services, steps, proof, pricing text, ctaBanner, richText) để **server component** — không `"use client"`.
- Giữ nguyên props/kiểu dữ liệu block để không phải sửa content.

## Bước 4 — Lớp truy cập nội dung (chìa khoá để cắm CMS sau)

- Tạo `lib/content.ts` với hàm `getPage(slug)`, `getPosts()`, `getPost(slug)`.
- **Hiện tại** các hàm này đọc từ `src/content/pages.js` (giữ nguyên content seed đang có).
- Trang chỉ gọi qua lớp này, **không import trực tiếp** `pages.js`.
- → Khi cắm Payload (`03`), chỉ đổi phần thân các hàm này sang **Payload Local API**; component + trang không phải sửa. Đây là điểm khiến migration + CMS sạch.

## Bước 5 — Ảnh & SEO nền

- Chuyển `<img>` → **`next/image`**, có `alt`. Assets vào `public/` hoặc giữ import.
- Mỗi route export **`generateMetadata()`** đọc từ `lib/content` (title/description/OG). Tạm lấy từ pages.js; sau lấy từ CMS.
- Stub sẵn `app/sitemap.ts`, `app/robots.ts` (điền đầy đủ ở `03`).
- Thêm JSON-LD cơ bản (LocalBusiness ở layout) — hoàn thiện ở `03`.

## Bước 6 — Dọn Vite

- Sau khi các route Next chạy đúng, **gỡ** phần Vite (config, entry, react-router) để tránh hai hệ song song.
- Cập nhật script dev/build về Next (`next dev`, `next build`).
- Cập nhật `README.md` + `01-setup.md`: hiện trạng giờ là **Next.js** (bỏ ghi chú Vite).

## Acceptance (xong khi)

- [ ] `next build` OK; `next dev` chạy.
- [ ] Mọi route HTTP 200 và **server-render** (view-source thấy nội dung + H1, không phải khung trắng chờ JS).
- [ ] **Home giống hệt bản cũ** (giao diện + copy).
- [ ] Nav active, footer links, sticky CTA tắt ở `/lien-he` — như trước.
- [ ] `generateMetadata` xuất title/description mỗi trang (tạm từ pages.js).
- [ ] `<html lang="vi">`, ảnh có alt.
- [ ] Content vẫn đọc qua `lib/content` (chưa cần Payload).
- [ ] Vite đã gỡ, không còn hai router.

## Sau bước này

Tiếp tục `01-setup.md` → `02` → `03`: cắm Payload + Supabase, seed content từ `pages.js` vào Payload, rồi đổi `lib/content` sang Payload Local API. Site giữ nguyên giao diện, chỉ đổi nguồn dữ liệu sang CMS.

## Scope guards

- KHÔNG đổi thiết kế/màu/font/copy đã chốt.
- KHÔNG đụng giao diện home.
- KHÔNG để nội dung render client-only.
- KHÔNG import `pages.js` trực tiếp trong trang — luôn qua `lib/content`.
- KHÔNG thêm tính năng ngoài phạm vi migrate.
