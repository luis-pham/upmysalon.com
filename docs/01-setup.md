# 01 — Setup: Payload 3.0 + Supabase

Mục tiêu: có một app Next.js chạy được, Payload admin tại `/admin`, dữ liệu lưu trong Supabase Postgres, ảnh trong Supabase Storage.

## 1. Khởi tạo dự án

- Dùng Next.js App Router + TypeScript. **Đã migrate xong từ Vite SPA** (bước 07): App Router, `lib/content.ts`, blocks server/client, home giữ nguyên.
- Cài Payload 3.0 và các package: core Payload, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/plugin-seo`, và storage adapter cho Supabase Storage (S3-compatible: `@payloadcms/storage-s3`).
- Payload 3 tích hợp vào Next App Router: admin phục vụ tại route `/admin`, API tại `/api`.
- **Chưa làm:** cắm Payload + Supabase (cần env). Khi có env, đổi thân `lib/content.ts` sang Payload Local API — không phải sửa UI.

## 2. Kết nối Supabase Postgres

- Dùng **Postgres adapter** của Payload, truyền connection string của Supabase.
- Lấy connection string trong Supabase → Project Settings → Database. **Dùng connection pooler** (cổng 6543, chế độ transaction) cho môi trường serverless/Vercel; dùng direct connection (5432) cho migrations.
- Bật SSL theo yêu cầu của Supabase.
- Payload sẽ tự tạo bảng theo schema đã khai báo. **Khuyến nghị:** đặt các bảng CMS trong một **schema Postgres riêng** (ví dụ `cms`) để không lẫn với bảng ứng dụng khác trong cùng Supabase — cấu hình `schemaName` nếu adapter hỗ trợ, hoặc dùng một Supabase project riêng cho website.
- Dùng **migrations** của Payload (`payload migrate`) thay vì auto-push ở production.

## 3. Media / ảnh → Supabase Storage

- Cấu hình storage adapter S3-compatible trỏ vào Supabase Storage:
  - Endpoint: S3 endpoint của Supabase Storage (dạng `https://<project>.supabase.co/storage/v1/s3`).
  - Region, access key id, secret (tạo trong Supabase Storage → S3 access keys).
  - Bucket công khai cho ảnh public (ví dụ `media`).
- Gắn adapter vào collection `Media` (xem `02-content-model.md`).
- Bật image sizes trong collection Media để Payload sinh sẵn các kích thước (thumbnail, card, hero, og) → phục vụ `next/image` + ảnh OG.

## 4. Admin & Auth

- Collection `users` của Payload làm tài khoản admin (email + password). Tạo user đầu tiên khi khởi động.
- Giới hạn quyền: chỉ role admin/editor mới sửa nội dung. (Có thể thêm role `editor` cho Tiến chỉ sửa content, không đụng cấu hình.)
- Admin UI mặc định tiếng Anh — chấp nhận được (chỉ mày + Tiến dùng). Có thể set locale admin sang tiếng Việt nếu Payload hỗ trợ.

## 5. Biến môi trường (.env)

Khai báo (đặt trong Vercel + `.env.local`, KHÔNG commit):

```
DATABASE_URI=            # Supabase Postgres pooler connection string
PAYLOAD_SECRET=          # chuỗi bí mật ngẫu nhiên dài
NEXT_PUBLIC_SERVER_URL=  # https://upmysalon.com (hoặc domain thật)

# Supabase Storage (S3-compatible)
S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=media
```

## 6. Frontend đọc dữ liệu

- Trong cùng app, ưu tiên **Payload Local API** (gọi trực tiếp trong server component, không qua HTTP) để render trang → nhanh, không tốn round-trip. Đây là lợi thế của Payload nhúng Next.js.
- Dùng REST/GraphQL của Payload chỉ khi cần từ client.

## 7. Kiểm tra Setup xong

- `npm run dev` → mở `/admin`, đăng nhập, tạo được bản ghi thử.
- Bản ghi lưu vào Supabase (kiểm tra bảng trong Supabase).
- Upload một ảnh → file xuất hiện trong Supabase Storage bucket.
- Một trang test server-component đọc được dữ liệu qua Local API.

## Scope guards

- KHÔNG dùng SQLite/Mongo — bắt buộc Supabase Postgres.
- KHÔNG auto-push schema ở production — dùng migrations.
- KHÔNG để bucket chứa ảnh ở chế độ private nếu ảnh cần hiển thị công khai.
