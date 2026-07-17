# 04 — Design System

**Nguồn sự thật:** tokens lấy từ trang landing home đang live (`landing/index.html` + `HomePage`). KHÔNG dùng palette rose/nude cũ trong bản nháp trước.

Giữ đúng tông thiết kế hiện có: sạch, hiện đại, beauty/nail, ấm.

## Nguyên tắc (đối tượng: chủ tiệm nail Việt, lớn tuổi, đọc mobile)

- **Mobile-first**, chữ to dễ đọc, nhiều khoảng trắng, tải nhanh.
- Bán **kết quả**, không phô công nghệ. Không jargon tiếng Anh ở vị trí nổi bật.
- Một CTA chính rõ ràng mỗi trang.

## Màu (palette từ home live)

| Token | Giá trị | Cách dùng trên home |
|---|---|---|
| `--bg` / `cream` | `#FFFAF8` | Nền trang (`body`) |
| `--surface` / white | `#FFFFFF` | Thẻ FAQ, khối trắng trên cream |
| `--surface-soft` | `#FFFAF8` (cream) | Thẻ pain/service trên nền trắng |
| `--blush` | `#EFA9B8` | Nền icon nhạt, accent phụ |
| `--accent` / `roseNude` | `#B85C73` | CTA, eyebrow, icon đậm, link nhấn |
| `--accent-hover` | `#9f4f64` | Hover nút primary |
| `--goldSoft` | `#C7A565` | Nhấn phụ (sao, gradient) |
| `--text` / `ink` | `#2E2327` | Tiêu đề, chữ chính |
| `--text-body` | `ink` ~68% opacity (`text-black/68`) | Đoạn mô tả |
| `--text-muted` | `ink` ~55–58% | Dòng phụ, trust line |
| `--footer-bg` | `#24191D` | Footer |
| `--cta-dark` | `#32242A` / `#3A2A30` | Banner liên hệ / demo voice |

Shadow: `soft` = `0 14px 40px rgba(94, 54, 66, 0.10)`.

Tailwind (CDN config hiện tại):

```js
colors: {
  blush: '#EFA9B8',
  roseNude: '#B85C73',
  cream: '#FFFAF8',
  goldSoft: '#C7A565',
  ink: '#2E2327',
}
```

Giữ tương phản đạt WCAG AA.

## Typography

- Font: **Be Vietnam Pro** (Google Fonts), weights dùng chính: **600** (`font-semibold`).
- Hero heading ~36–60px (responsive), body 16–18px, chữ tối thiểu 15px.
- Line-height thoáng (~1.6–1.8). Tránh chữ mảnh / extrabold nặng.

## Bo góc & khoảng cách

- Thẻ: `rounded-3xl` (~24px) hoặc `rounded-[2rem]`, padding ~24–28px.
- Ô icon: ~48px (`h-12 w-12`), `rounded-2xl`, nền `blush/25`, icon `roseNude` (hoặc nền `roseNude` + icon trắng trên service cards).
- Grid gap ~20–24px. Section padding dọc rộng (`py-16` / `py-24`).

## Components dùng chung

- **Header/Nav:** sticky, logo trái; menu: Dịch vụ ▾ (4 dịch vụ) · Bảng giá · Cẩm nang · Giới thiệu · Liên hệ (nổi nhẹ). Desktop có thể kèm CTA audit; mobile: hamburger, "Dịch vụ" bấm xổ con. Active state cho trang hiện tại.
- **Footer:** cột link tất cả trang + note "Một sản phẩm của RingBooker LLC".
- **Button:** primary (`bg-roseNude`, chữ trắng, `rounded-full`); secondary (viền `roseNude`). Touch target ≥ 44px.
- **Card (pain/service):** nền cream trên section trắng (hoặc ngược lại), ô icon trên, text dưới. Equal height trong grid.
- **Contact buttons:** Messenger / Zalo / Gọi / Instagram.
- **Sticky mobile CTA:** nút audit dính đáy trên mobile — **ẩn trên `/lien-he`**.

## Accessibility

- Tương phản AA; touch target ≥ 44px; alt cho mọi ảnh; heading có thứ bậc; focus visible.
- Ngôn ngữ trang `vi`.

## Responsive

- Desktop: grid 2–4 cột tùy section; mobile dồn 1 cột.
- Pain points: **lưới 2×2 cân đối** (desktop/tablet 2 cột, mobile 1 cột), 4 thẻ equal height.

## Scope guards

- KHÔNG đổi tông màu đã chốt trên home live.
- KHÔNG dùng chữ nhỏ hơn 15px cho nội dung.
- KHÔNG ảnh stock salon Tây; ưu tiên ảnh tiệm/khách gốc Á, ấm (placeholder tạm được).
