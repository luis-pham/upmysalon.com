# 08 — Bổ sung chi tiết dịch vụ (bổ trợ cho 05-pages.md)

Mục tiêu: mỗi trang con kể được (1) anh/chị làm rất ít (done-for-you), (2) việc lặp mỗi tháng do UpMySalon làm (justify phí tháng).

Blocks mới: xem `02-content-model.md` — `effortContrast`, `featureBenefit`, `monthlyValue`, `monthlyReport`.

Seed copy đã đưa vào `content/pages.ts` và render qua `ServicePageLayout`. Trang chủ có `effortContrast` tổng trong `components/HomePage.tsx`.

## Scope guards

- Feature → lợi ích đời thường tiếng Việt, không tech spec.
- `effortContrast` / `monthlyReport` khác nhau theo dịch vụ.
- Không overpromise SEO ("lên top mãi").
- Giá `[__]` để trống.
