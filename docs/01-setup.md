# 01 — Setup: Payload 3.0 + Supabase + R2

Mục tiêu: có một app Next.js chạy được, Payload admin tại `/admin`, dữ liệu lưu trong Supabase Postgres, ảnh trên Cloudflare R2 (S3-compatible). Deploy production xem `06-deploy.md`.

## 1. Khởi tạo dự án

- Dùng Next.js App Router + TypeScript. **Đã migrate xong từ Vite SPA** (bước 07): App Router, `lib/content.ts`, blocks server/client, home giữ nguyên.
- Cài Payload 3.0 và các package: core Payload, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/plugin-seo`, và `@payloadcms/storage-s3` (trỏ Cloudflare R2).
- Payload 3 tích hợp vào Next App Router: admin phục vụ tại route `/admin`, API tại `/api`.
- **Chưa làm:** cắm Payload + Supabase + R2 (cần env). Khi có env, đổi thân `lib/content.ts` sang Payload Local API — không phải sửa UI.

## 2. Kết nối Supabase Postgres

- Dùng **Postgres adapter** của Payload, truyền connection string của Supabase.
- Lấy connection string trong Supabase → Project Settings → Database.
  - **Pooler** (cổng `6543`, transaction mode) → runtime serverless / Vercel → `DATABASE_URI`.
  - **Direct** (cổng `5432`) → migrations → `DATABASE_URI_DIRECT` (xem `06-deploy.md`).
- Bật SSL theo yêu cầu của Supabase.
- Payload sẽ tự tạo bảng theo schema đã khai báo. **Khuyến nghị:** project Supabase **riêng** cho website (tách RingBooker), hoặc schema Postgres riêng (ví dụ `cms`) nếu buộc dùng chung project.
- Dùng **migrations** của Payload (`payload migrate`) thay vì auto-push ở production.

## 3. Media / ảnh → Cloudflare R2

- Cấu hình `@payloadcms/storage-s3` trỏ vào **Cloudflare R2**:
  - Endpoint: `https://<accountid>.r2.cloudflarestorage.com`
  - Region: `auto`
  - Access Key ID + Secret (R2 API token)
  - Bucket (ví dụ `upmysalon-media` hoặc bucket dev riêng)
  - Public URL: `r2.dev` hoặc custom domain (vd. `cdn.upmysalon.com`) → `R2_PUBLIC_URL`
- Gắn adapter vào collection `Media` (xem `02-content-model.md`).
- Bật image sizes trong collection Media để Payload sinh sẵn các kích thước (thumbnail, card, hero, og) → phục vụ `next/image` + ảnh OG.
- `next.config`: thêm host của `R2_PUBLIC_URL` vào `images.remotePatterns`.
- Chi tiết bucket production, CORS, custom domain: `06-deploy.md`.

## 4. Admin & Auth

- Collection `users` của Payload làm tài khoản admin (email + password). Tạo user đầu tiên khi khởi động.
- Giới hạn quyền: chỉ role admin/editor mới sửa nội dung. (Có thể thêm role `editor` cho Tiến chỉ sửa content, không đụng cấu hình.)
- Admin UI mặc định tiếng Anh — chấp nhận được (chỉ mày + Tiến dùng). Có thể set locale admin sang tiếng Việt nếu Payload hỗ trợ.

## 5. Biến môi trường (.env)

Khai báo (đặt trong Vercel + `.env.local`, KHÔNG commit):

```
DATABASE_URI=                 # Supabase Postgres pooler (6543)
DATABASE_URI_DIRECT=          # optional: direct 5432 cho migrate
PAYLOAD_SECRET=               # chuỗi bí mật ngẫu nhiên dài
NEXT_PUBLIC_SERVER_URL=       # https://upmysalon.com (hoặc localhost khi dev)

# Cloudflare R2 (S3-compatible)
R2_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_PUBLIC_URL=
S3_REGION=auto
```

Production + domain: xem `06-deploy.md`.

## 6. Frontend đọc dữ liệu

- Trong cùng app, ưu tiên **Payload Local API** (gọi trực tiếp trong server component, không qua HTTP) để render trang → nhanh, không tốn round-trip. Đây là lợi thế của Payload nhúng Next.js.
- Dùng REST/GraphQL của Payload chỉ khi cần từ client.

## 7. Kiểm tra Setup xong

- `npm run dev` → mở `/admin`, đăng nhập, tạo được bản ghi thử.
- Bản ghi lưu vào Supabase (kiểm tra bảng trong Supabase).
- Upload một ảnh → file xuất hiện trong bucket R2; URL public load được.
- Một trang test server-component đọc được dữ liệu qua Local API.

## Scope guards

- KHÔNG dùng SQLite/Mongo — bắt buộc Supabase Postgres.
- KHÔNG auto-push schema ở production — dùng migrations.
- KHÔNG để bucket/media ở chế độ private nếu ảnh cần hiển thị công khai (dùng `R2_PUBLIC_URL`).
