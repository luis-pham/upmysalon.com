# 06 — Deploy: Vercel + Domain + Supabase production

Mục tiêu: đưa site + Payload admin lên production, domain thật, Supabase production, Cloudflare R2 cho ảnh, và setup SEO ban đầu.

## 1. Supabase (production)

- Dùng **project Supabase production** (không dùng chung với dev).
- Cân nhắc **project hoặc schema riêng** cho website, tách khỏi DB sản phẩm RingBooker.
- Lấy **2 connection string**:
  - **Pooler** (cổng `6543`, transaction mode) → dùng cho app runtime trên Vercel (serverless).
  - **Direct** (cổng `5432`) → dùng để chạy migrations.
- Bật SSL. Giới hạn IP nếu cần.
- **Migrations:** chạy `payload migrate` với direct connection trước/khi deploy (**không** auto-push schema ở production). Có thể chạy trong build step hoặc thủ công một lần.
  - Env gợi ý cho migrate: `DATABASE_URI_DIRECT` (direct `5432`); runtime Vercel dùng `DATABASE_URI` (pooler `6543`).

## 2. Cloudflare R2 (ảnh production)

Ảnh/media để trên **Cloudflare R2** (S3-compatible) — Payload dùng storage adapter S3 trỏ vào R2.

- Tạo bucket R2 production (ví dụ `upmysalon-media`).
- Bật public access: dùng `r2.dev` public URL, hoặc gắn **custom domain** (khuyến nghị, ví dụ `cdn.upmysalon.com`) cho URL ảnh đẹp + ổn định.
- Tạo R2 API token (Access Key ID + Secret) cho adapter S3.
- Endpoint R2 dạng `https://<accountid>.r2.cloudflarestorage.com`.
- Cấu hình **CORS** trên bucket R2 nếu upload từ admin trên domain production.
- `next.config`: thêm domain public của R2 (`r2.dev` hoặc custom domain) vào `images.remotePatterns` để `next/image` load được ảnh.

## 3. Vercel

- Import repo vào Vercel, framework Next.js (auto).
- **Environment Variables** (Production + Preview) — khớp `01-setup.md`:

```
DATABASE_URI=                 # Supabase pooler (6543)
DATABASE_URI_DIRECT=          # optional: direct 5432 nếu migrate trong build
PAYLOAD_SECRET=               # bí mật production (khác dev)
NEXT_PUBLIC_SERVER_URL=https://upmysalon.com

# Cloudflare R2 (S3-compatible)
R2_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=upmysalon-media
R2_PUBLIC_URL=                # https://cdn.upmysalon.com hoặc *.r2.dev
S3_REGION=auto
```

- Build command mặc định Next.js. Nếu chạy migrate trong build: thêm bước `payload migrate` (dùng direct connection qua `DATABASE_URI_DIRECT`).
- Sau deploy đầu: tạo **user admin production** (qua trang `/admin` lần đầu hoặc seed script).

## 4. Domain (Namecheap → Vercel)

- Mua/dùng domain đã chốt (ví dụ `upmysalon.com`) trên Namecheap.
- Trong Vercel → Project → Domains: thêm `upmysalon.com` + `www.upmysalon.com`.
- Trên Namecheap DNS, trỏ theo hướng dẫn Vercel:
  - Apex `@`: A record về IP Vercel, hoặc dùng ALIAS/ANAME nếu Namecheap hỗ trợ.
  - `www`: CNAME → `cname.vercel-dns.com`.
- Chọn **một bản chính** (khuyến nghị non-www hoặc www) và **redirect 301** bản kia về bản chính (Vercel làm được) — tránh trùng lặp nội dung.
- Chờ SSL tự cấp (Vercel tự động). Kiểm tra HTTPS.
- Cập nhật `NEXT_PUBLIC_SERVER_URL` = domain chính đã chọn.

## 5. Payload trên production — lưu ý

- `serverURL` / `NEXT_PUBLIC_SERVER_URL` phải là domain production (ảnh hưởng link admin, OG, sitemap).
- CORS/CSRF của Payload: cho phép domain production.
- Bảo vệ `/admin` bằng auth mạnh; cân nhắc rate-limit.
- Bật on-demand revalidate (hook `afterChange` gọi `revalidatePath`) để sửa CMS là site cập nhật ngay.

## 6. SEO ban đầu (sau khi domain sống)

- Xác nhận `/sitemap.xml` và `/robots.txt` (chặn `/admin`, `/api`).
- View-source: `<title>`, meta description, canonical, OG dùng `NEXT_PUBLIC_SERVER_URL`.
- Đăng ký domain trên Google Search Console; submit sitemap.
- Kiểm tra checklist cuối `03-frontend-and-seo.md`.

## Kiểm tra Deploy xong

- [ ] `https://upmysalon.com` (và www → 301 về bản chính) HTTPS OK.
- [ ] `/admin` đăng nhập được trên production.
- [ ] Upload ảnh → nằm trên R2; `next/image` load được qua `R2_PUBLIC_URL`.
- [ ] Bản ghi CMS lưu vào Supabase production.
- [ ] Sửa nội dung trong CMS → trang cập nhật (revalidate).
- [ ] Sitemap/robots/canonical đúng domain chính.

## Scope guards

- KHÔNG dùng chung Supabase production với DB RingBooker (project hoặc schema riêng).
- KHÔNG auto-push schema ở production — chỉ `payload migrate` qua direct connection.
- KHÔNG để `PAYLOAD_SECRET` / R2 keys / DB URI trong git.
- KHÔNG index `/admin`.
