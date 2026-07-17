# 02 — Content Model (Payload collections, globals, blocks)

Nguyên tắc: **mọi nội dung hiển thị đều sửa được trong CMS**. Component chỉ render, không chứa text cứng. Mỗi trang = một bản ghi `Page` gồm mảng `blocks` linh hoạt + khối `seo`.

## Collections

### 1. `pages`
Dùng cho: trang chủ + 4 trang dịch vụ + Bảng giá + Giới thiệu + Liên hệ.

Fields:
- `title` (text) — tên nội bộ.
- `slug` (text, unique) — ví dụ `home`, `le-tan-ai-nghe-may-dat-lich`, `danh-gia-google`...
- `blocks` (blocks, mảng) — các section của trang (danh sách block bên dưới).
- `seo` (group, do plugin-seo cung cấp) — `title`, `description`, `image` (OG), `noIndex`.
- (tùy chọn) `status` draft/published; bật versions + drafts để xem trước.

### 2. `services` (tùy chọn, gọn hơn nếu muốn tách)
Có thể coi 4 trang dịch vụ là `pages` bình thường (đơn giản hơn — khuyến nghị). Chỉ tách `services` nếu cần list dịch vụ tái sử dụng ở nhiều nơi. **Mặc định: dùng `pages`, bỏ qua collection này.**

### 3. `posts` (blog)
Fields:
- `title` (text)
- `slug` (text, unique)
- `coverImage` (upload → media)
- `excerpt` (textarea) — tóm tắt hiển thị ở list + meta.
- `body` (richText, Lexical) — nội dung bài.
- `publishedAt` (date)
- `author` (text hoặc relationship users)
- `seo` (group) — title, description, image, noIndex.

### 4. `legalPages`
Dùng cho 4 trang pháp lý song ngữ (VI mặc định + EN tại `/en`).

Fields:
- `slug` (select, unique) — `privacy` | `terms` | `sms-consent` | `refund`
- `title` (text) — tiêu đề tiếng Việt
- `titleEn` (text) — tiêu đề tiếng Anh
- `lastUpdated` (date, optional) — để trống thì frontend hiện `[NGÀY]` / `[DATE]`
- `bodyVi` (richText Lexical) — nội dung VI, sửa trong `/admin`
- `bodyEn` (richText Lexical) — nội dung EN, sửa trong `/admin`
- `seoVi` / `seoEn` (group) — `title`, `description`

Config sẵn: `payload/collections/LegalPages.ts`.
Seed từ `docs/legal/*.md` → `content/legalPages.seed.json` (`npm run seed:legal`).
Frontend đọc qua `lib/legal.ts` (seed hiện tại; khi có Payload Local API thì chỉ đổi thân hàm `getLegalPage`).

Routes (không dùng `[slug]` marketing):
- VI: `/privacy`, `/terms`, `/sms-consent`, `/refund`
- EN: `/en/privacy`, `/en/terms`, `/en/sms-consent`, `/en/refund`

### 4. `media`
- Upload collection, storage adapter Supabase Storage.
- Bắt buộc field `alt` (text) cho SEO + accessibility.
- Image sizes: `thumbnail` (~400w), `card` (~800w), `hero` (~1600w), `og` (1200x630).

### 5. `users`
- Tài khoản admin/editor (Payload auth).

## Globals (nội dung dùng chung toàn site)

### `siteSettings`
- `brandName` (text, mặc định "UpMySalon")
- `logo` (upload → media)
- `defaultSeo` (group) — title template, description mặc định, OG mặc định.
- `contact` — `phone`, `zalo`, `messengerUrl`, `instagramUrl`, `email`.
- `footerNote` (text, mặc định "Một sản phẩm của RingBooker LLC").

### `navigation`
- `items` (mảng) — mỗi item: `label`, `href`, `children` (mảng con cho dropdown "Dịch vụ").
- Seed đúng cấu trúc nav đã chốt: Dịch vụ ▾ (4 dịch vụ) · Bảng giá · Cẩm nang · Giới thiệu · Liên hệ.

### `footer`
- `columns` (mảng cột link) + `note`.

## Blocks (các section của trang — mảng `blocks` trong `pages`)

Mỗi block có field text + ảnh sửa được. Danh sách block cần có:

1. **`hero`** — `eyebrow`, `heading`, `subheading`, `ctaLabel`, `ctaHref`, `trustLine`, `image` (trang dịch vụ) / `carouselSlides` (trang chủ: mảng `image`, `alt`, `caption`, `href`). Seed ảnh local: `public/hero/` + `content/hero.ts`.
2. **`painPoints`** — `eyebrow`, `heading`, `items` (mảng: `icon`, `text`). (Render lưới 2×2/2×N.)
3. **`demoVoice`** — `heading`, `intro`, `audioFile` (upload/URL), `bullets` (mảng text + icon), `closingLine`, `ctaLabel`, `ctaHref`.
4. **`services`** — `heading`, `items` (mảng: `icon`, `title`, `desc`, `href`).
5. **`steps`** — `heading`, `items` (mảng: `number`, `title`, `desc`) — dùng cho "cách hoạt động 3 bước" ở trang dịch vụ.
6. **`proof`** — `heading`, `items` (mảng: `image`, `caption`) + `testimonials` (mảng: `quote`, `author`, `salon`).
7. **`pricing`** — `heading`, `plans` (mảng: `name`, `price`, `period`, `features[]`, `ctaLabel`, `ctaHref`, `highlighted` bool), `note`.
8. **`faq`** — `heading`, `items` (mảng: `question`, `answer`).
9. **`ctaBanner`** — `heading`, `subheading`, `buttons` (mảng: `label`, `href`, `style`).
10. **`richText`** — nội dung tự do (dùng cho Giới thiệu, nội dung dài).
11. **`contactBlock`** — `heading`, hiển thị các nút liên hệ từ `siteSettings.contact` (Messenger/Zalo/gọi/IG) + form tùy chọn.
12. **`effortContrast`** — bảng đối lập "Anh/chị làm ít / Đội ngũ UpMySalon làm nhiều". Fields: `heading`, `youDo` (mảng text — ngắn), `weDo` (mảng text — việc lặp mỗi ngày/tháng). Có ở cả 4 trang dịch vụ (nội dung khác nhau) + tùy chọn trang chủ.
13. **`featureBenefit`** — lưới feature → lợi ích đời thường (chủ yếu trang Voice/nghe máy). Fields: `heading`, `items` (mảng: `icon`, `feature`, `benefit`, `highlight` bool tùy chọn).
14. **`monthlyValue`** — tách phí một lần vs phí tháng (trang website-seo). Fields: `heading`, `intro`, `oneTime` (group: `label`, `desc`), `monthly` (mảng: `title`, `desc`), `note`.
15. **`monthlyReport`** — vật chứng recurring: báo cáo hàng tháng. Fields: `heading`, `items` (mảng text). Có ở cả 4 trang dịch vụ.

> Thứ tự gợi ý trên trang dịch vụ: … → `steps` → **`effortContrast`** → (`featureBenefit` / `monthlyValue` nếu có) → proof/pricing/faq → **`monthlyReport`** → `ctaBanner`.

> Icon: dùng tên icon (chuỗi) map sang thư viện icon ở frontend (ví dụ Lucide/Tabler). Field `icon` là select hoặc text tên icon.

## SEO plugin

- Cài `@payloadcms/plugin-seo`, gắn vào `pages` và `posts`.
- Cấu hình: generate title/description mặc định từ nội dung; cho phép override thủ công; hiện preview snippet Google trong admin.
- Field `image` trong seo = ảnh OG (dùng size `og` 1200x630).
- Frontend đọc group `seo` này để dựng metadata (xem `03`).

## Seed dữ liệu

- Seed tất cả trang trong sitemap với **copy tiếng Việt lấy từ `05-pages.md`** làm giá trị mặc định.
- Seed `navigation`, `footer`, `siteSettings.contact`, `footerNote`.
- Seed 3–5 bài `posts` đầu từ nội dung fanpage đã có (chuyển thành bài dài hơn).

## Scope guards

- KHÔNG hard-code copy trong component — tất cả từ CMS (seed sẵn).
- Mỗi trang dịch vụ nội dung **khác biệt thật**, không copy khung đổi chữ (tránh near-duplicate hại SEO).
- Field `alt` của ảnh là bắt buộc.
