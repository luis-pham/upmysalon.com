# 05 — Pages Spec + Copy tiếng Việt (seed vào CMS)

Mỗi trang là một bản ghi `Page` với `blocks`. Copy dưới đây **seed làm giá trị mặc định** trong CMS. Mỗi trang dịch vụ nội dung **khác biệt thật** (tránh near-duplicate). Chỗ `[__]` để trống cho Huy điền (giá, link).

CTA chính toàn site: **"Nhắn đội ngũ UpMySalon nhận audit miễn phí"** (link tới Messenger/Zalo/Liên hệ).

---

## `/` — Trang chủ (slug `home`)

> **SKIP triển khai từ doc này.** Trang chủ đã live trong `landing/src/pages/HomePage.jsx` — giữ nguyên copy/layout hiện tại. Mục dưới chỉ để tham chiếu CMS sau này; **không ghi đè home**.

**SEO:** title "UpMySalon — Dịch vụ số cho tiệm nail người Việt" · description "Đội ngũ người Việt giúp tiệm nail ở Mỹ đông khách hơn: nghe máy, review 5 sao, tin nhắn FB/IG, website & Google Maps. Nói tiếng Việt, không hợp đồng dài."

Blocks:
1. **hero** — eyebrow: "Dành cho chủ tiệm nail người Việt" · heading: "Giúp tiệm nail của anh/chị ĐÔNG KHÁCH hơn — người Việt lo trọn gói, từ điện thoại đến Google." · subheading: "UpMySalon lo trọn gói cho tiệm: nghe máy giúp khi anh/chị đang bận làm khách, xin và trả lời review 5 sao, quản lý tin nhắn Facebook & Instagram, tạo mới hoặc thiết kế lại website chuẩn SEO, và đưa tiệm lên top Google Maps. Tất cả bằng tiếng Việt, không hợp đồng dài." · ctaLabel: "Nhận audit Google + review miễn phí (15 phút)" · trustLine: "Người Việt phục vụ người Việt · Không ràng buộc · Thử 1 tháng".
2. **painPoints** (lưới 2×2) — eyebrow "Những việc đang làm tiệm mất khách", heading "Anh/chị có đang gặp những chuyện này?", items:
   - (phone) "Khách gọi lúc anh/chị đang bận tay — không ai bắt máy là mất khách."
   - (star) "Review thấp, ít sao — khách mới chọn tiệm bên cạnh."
   - (message) "Tin nhắn Facebook, Instagram dồn đống — không có thời gian trả lời."
   - (globe) "Website cũ, không chuẩn SEO — khách tìm trên mạng không thấy tiệm, chọn chỗ khác."
3. **demoVoice** — heading "Nghe thử tổng đài AI bắt máy cho tiệm — 60 giây" · intro "Đây là AI bắt máy thay anh/chị khi cả tiệm đang bận tay. Bấm nghe thử một cuộc gọi thật:" · bullets: "Bắt máy 24/7 — kể cả giờ cao điểm hay ngoài giờ", "Tự đặt lịch cho khách vào đúng giờ tiệm còn trống", "Cuộc gọi nhỡ được tự nhắn tin lại ngay" · closingLine "Giọng tự nhiên, nói chuyện với khách Mỹ mượt như người thật." · ctaLabel "Muốn nghe demo bằng chính tên tiệm của anh/chị? Nhắn đội ngũ UpMySalon."
4. **services** — heading "UpMySalon làm những gì", items:
   - "Nghe máy & đặt lịch tự động" — "Không bỏ lỡ cuộc gọi nào, kể cả giờ cao điểm." → /le-tan-ai-nghe-may-dat-lich
   - "Tăng & quản lý review Google" — "Xin review sau mỗi lần khách tới, trả lời giúp cả review xấu." → /danh-gia-google
   - "Trả lời tin nhắn IG & Facebook" — "Khách nhắn là được phản hồi ngay, chốt lịch tự động." → /ai-quan-ly-inbox-facebook-ig
   - "Website chuẩn SEO + Google Maps" — "Tạo mới hoặc làm lại website, tối ưu SEO để khách tìm 'nail near me' thấy anh/chị trước." → /website-seo
5. **proof** — heading "Vì sao chọn UpMySalon" (3 điểm): "Nói chuyện tiếng Việt — hiểu tiệm nail, không phải agency Mỹ." · "Làm từ A–Z — anh/chị chỉ việc làm nail." · "Công ty đăng ký tại Mỹ, minh bạch, không hợp đồng dài."
6. **pricing** (rút gọn, link tới /bang-gia) — heading "Gói linh hoạt, thử theo tháng" · note "Thử 1 tháng, huỷ bất cứ lúc nào."
7. **faq** — 4 câu (xem mục FAQ chung bên dưới).
8. **ctaBanner** — heading "Để UpMySalon check giúp tiệm anh/chị miễn phí" · buttons: Messenger, Zalo, Gọi, Instagram.

---

## `/le-tan-ai-nghe-may-dat-lich` — Tổng đài AI nghe máy & đặt lịch (WEDGE)

**SEO:** title "Tổng đài AI nghe máy & đặt lịch cho tiệm nail" · description "AI bắt máy 24/7 thay anh/chị khi đang bận làm khách, đặt lịch tự động, nhắn lại cuộc gọi nhỡ. Nghe thử demo bằng tên tiệm của anh/chị."

Blocks:
1. **hero** — heading "Không bao giờ bỏ lỡ một cuộc gọi khách nữa." · subheading "Khi cả tiệm đang bận tay, tổng đài AI của UpMySalon bắt máy thay anh/chị: chào khách, báo giá, đặt lịch — giọng tự nhiên như người thật." · ctaLabel "Nghe thử AI bắt máy cho tiệm anh/chị".
2. **painPoints** — riêng cho voice: "Giờ cao điểm không ai rảnh bắt máy — khách gọi 2–3 lần rồi qua tiệm khác." · "Khách gọi ngoài giờ, sáng sớm, tối muộn — không ai nghe." · "Mỗi cuộc gọi nhỡ là một khách $40–60 có thể mất."
3. **demoVoice** — như trang chủ, nhấn mạnh nghe thử.
4. **steps** — "Cách hoạt động": 1) "Đội ngũ UpMySalon cài số cho tiệm, giữ nguyên số hiện tại." 2) "AI bắt máy khi anh/chị bận hoặc ngoài giờ." 3) "Lịch hẹn + cuộc gọi nhỡ báo về cho tiệm."
5. **proof** — nhấn latency thấp, đặt lịch thật; ảnh/mô tả demo.
6. **pricing** (gói nghe máy) — giá `[__]`/tháng.
7. **faq** — riêng voice: "AI có nói tiếng Anh với khách Mỹ tự nhiên không?" · "Có giữ được số điện thoại tiệm không?" · "Nếu khách muốn gặp người thật thì sao?"
8. **ctaBanner** — "Nghe thử bằng chính tên tiệm anh/chị".

---

## `/danh-gia-google` — Tăng & quản lý đánh giá Google (LEAD OFFER)

**SEO:** title "Tăng review Google 5 sao cho tiệm nail — làm A–Z" · description "Đội ngũ UpMySalon xin review sau mỗi lần khách tới, trả lời giúp cả review xấu bằng tiếng Việt. Nhận audit Google + review miễn phí."

Blocks:
1. **hero** — heading "Lên sao, lên khách — đội ngũ UpMySalon lo phần review cho tiệm." · subheading "Điểm sao cao kéo khách mới. Đội ngũ UpMySalon xin review đều đặn sau mỗi lần khách tới và trả lời giúp mọi review — kể cả review xấu — bằng tiếng Việt." · ctaLabel "Nhận audit Google + review miễn phí (15 phút)".
2. **painPoints** — "Ít review, sao thấp — khách mới chọn tiệm 4.8 sao bên cạnh." · "Không có thời gian ngồi xin từng khách review." · "Gặp review xấu không biết trả lời sao cho khéo."
3. **proof** — ảnh before/after số sao (placeholder), giải thích quy trình làm.
4. **steps** — 1) "Đội ngũ UpMySalon dựng cách xin review tự động (QR + tin nhắn) sau mỗi lượt khách." 2) "Khách hài lòng để lại 5 sao trên Google." 3) "Đội ngũ UpMySalon trả lời mọi review, xử lý review xấu khéo léo." (Lưu ý: xin review tất cả, KHÔNG lọc/gate — đúng chính sách Google.)
5. **pricing** (gói review) — giá `[__]`/tháng.
6. **faq** — "Có làm ảnh hưởng Google của tiệm không?" (đúng chính sách, an toàn) · "Bao lâu thấy kết quả?" (2–4 tuần) · "Review xấu xử lý thế nào?"
7. **ctaBanner** — "Nhận audit miễn phí".

---

## `/ai-quan-ly-inbox-facebook-ig` — Trả lời tin nhắn Facebook & Instagram

**SEO:** title "Trả lời tin nhắn Facebook & Instagram tự động cho tiệm nail" · description "Khách nhắn IG/FB là được phản hồi ngay, chốt lịch tự động, chuyển người thật khi cần. Bằng tiếng Việt."

Blocks:
1. **hero** — heading "Khách nhắn tin là được trả lời ngay — kể cả khi tiệm đang đông." · subheading "Đội ngũ UpMySalon quản lý inbox Facebook & Instagram: trả lời câu hỏi giá/giờ, chốt lịch tự động, và chuyển cho người thật khi cần."
2. **painPoints** — "Tin nhắn dồn đống, trả lời trễ — khách mất kiên nhẫn." · "Khách hỏi giá/giờ lặp đi lặp lại cả ngày." · "Nhắn tin đến lúc rảnh trả lời thì khách đã đặt tiệm khác."
3. **steps** — 1) "Kết nối trang FB/IG của tiệm." 2) "AI trả lời câu thường gặp + chốt lịch." 3) "Ca khó chuyển người thật xử lý."
4. **proof** — ảnh minh hoạ hội thoại tự động chốt lịch.
5. **pricing** (gói inbox) — giá `[__]`/tháng.
6. **faq** — "Có trả lời sai làm mất khách không?" (có người giám sát/handoff) · "Kết nối FB/IG có khó không?"
7. **ctaBanner**.

> Lưu ý kỹ thuật: tính năng thật cần duyệt Meta App Review — trang này có thể ra sau (Phase 3). Nội dung vẫn seed sẵn.

---

## `/website-seo` — Website chuẩn SEO + Google Maps

**SEO:** title "Làm website tiệm nail chuẩn SEO + lên Google Maps" · description "Tạo mới hoặc làm lại website cho tiệm, tối ưu SEO, đưa tiệm lên top Google Maps để khách tìm 'nail near me' thấy anh/chị trước."

Blocks:
1. **hero** — heading "Website đẹp + lên top Google — khách tìm là thấy tiệm anh/chị." · subheading "Đội ngũ UpMySalon tạo mới hoặc làm lại website cho tiệm, tối ưu SEO và đưa tiệm lên Google Maps."
2. **painPoints** — "Chưa có website, hoặc web cũ khó xem trên điện thoại." · "Search 'nail near me' không thấy tiệm mình." · "Hồ sơ Google Maps sơ sài, thiếu ảnh, sai giờ."
3. **proof** — mockup web mẫu đẹp (placeholder).
4. **steps** — 1) "Đội ngũ UpMySalon dựng website chuẩn, đẹp trên điện thoại." 2) "Tối ưu SEO + hồ sơ Google Maps." 3) "Duy trì để giữ thứ hạng."
5. **pricing** — web (one-time) `[__]` + duy trì SEO/Maps `[__]`/tháng.
6. **faq** — "Bao lâu có website?" · "Có giữ được tên miền/hồ sơ cũ không?" · "SEO bao lâu lên top?" (đặt kỳ vọng thật: duy trì để giữ top).
7. **ctaBanner** — "Nhận kiểm tra website + Google Maps miễn phí".

---

## `/bang-gia` — Bảng giá dịch vụ

**SEO:** title "Bảng giá dịch vụ — UpMySalon" · description "Gói linh hoạt cho tiệm nail: review, nghe máy, tin nhắn, website. Thử theo tháng, không hợp đồng dài."

Blocks:
1. **hero** — heading "Gói linh hoạt — thử theo tháng, không hợp đồng dài."
2. **pricing** — các gói (điền giá `[__]`):
   - Gói Review — từ `[__]`/tháng
   - Gói Nghe máy & đặt lịch — từ `[__]`/tháng
   - Gói Tin nhắn IG/FB — từ `[__]`/tháng
   - Website — từ `[__]` (one-time) + duy trì `[__]`/tháng
   - Trọn gói — "Liên hệ để đội ngũ UpMySalon báo giá theo tiệm" (highlighted)
   note: "Thử 1 tháng, huỷ bất cứ lúc nào."
3. **faq** — về thanh toán, huỷ, cam kết.
4. **ctaBanner**.

---

## `/gioi-thieu` — Về UpMySalon (trang tin cậy)

**SEO:** title "Về UpMySalon — người Việt lo cho tiệm Việt" · description "Đội ngũ người Việt chuyên giúp tiệm nail ở Mỹ hiện diện tốt trên mạng. Minh bạch, nói tiếng Việt, một sản phẩm của RingBooker LLC."

Blocks:
1. **hero** — heading "Người Việt lo cho tiệm Việt."
2. **richText** — câu chuyện: vì sao lập UpMySalon, hiểu nỗi khổ chủ tiệm nail, cam kết làm bằng tiếng Việt, minh bạch. (Nên có mặt/tên thật + ảnh — tăng tin cậy cực mạnh với cộng đồng Việt.)
3. **proof** — giá trị cốt lõi (tiếng Việt, làm A–Z, không hợp đồng dài, đăng ký tại Mỹ / RingBooker LLC).
4. **ctaBanner**.

---

## `/lien-he` — Liên hệ

**SEO:** title "Liên hệ — UpMySalon" · description "Nhắn đội ngũ UpMySalon để nhận audit miễn phí cho tiệm. Messenger, Zalo, gọi, Instagram."

Blocks:
1. **hero** — heading "Để đội ngũ UpMySalon check giúp tiệm anh/chị miễn phí."
2. **contactBlock** — nút Messenger `[__]`, Zalo `[__]`, Gọi `[__]`, Instagram `[__]` (lấy từ `siteSettings.contact`). Form tùy chọn: tên, tên tiệm, số điện thoại/Zalo.
3. (không sticky CTA trên trang này).

---

## `/blog` + `/blog/[slug]` — Cẩm nang cho tiệm nail

- `/blog`: heading "Cẩm nang cho tiệm nail", lưới thẻ bài (coverImage, title, excerpt, ngày).
- Seed 3–5 bài đầu từ nội dung fanpage đã có (mở rộng thành bài dài hơn), ví dụ:
  - "Mỗi cuộc gọi nhỡ, tiệm mất bao nhiêu tiền?"
  - "Checklist 2 phút: hồ sơ Google của tiệm đã chuẩn chưa?"
  - "Vì sao tiệm 4.8 sao luôn đông hơn tiệm 4.2 sao?"
- Mỗi post có seo riêng + JSON-LD Article.

---

## FAQ chung (seed cho trang chủ / bảng giá)

- "Có hợp đồng dài hạn không?" → "Không. Thử theo tháng, không hợp thì ngưng."
- "Có làm ảnh hưởng Google của tiệm không?" → "Không. Đội ngũ UpMySalon làm đúng chính sách Google, an toàn cho tiệm."
- "Em có nói tiếng Việt không?" → "Có. Toàn bộ trao đổi bằng tiếng Việt."
- "Bao lâu thấy kết quả?" → "Review và Google thường thấy trong 2–4 tuần đầu."

## Scope guards

- Copy trên là **mặc định seed**, không viết lại; Huy chỉnh trong CMS sau.
- 4 trang dịch vụ giữ nội dung **khác biệt** (pain/steps/faq riêng), không copy khung.
- Chỗ `[__]` (giá, link liên hệ) để trống — KHÔNG bịa số.
