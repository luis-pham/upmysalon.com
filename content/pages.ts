/** Seed content for non-home pages — mirrors docs/05-pages.md (home skipped). */

import {
  BANG_GIA_PRICING,
  CAPTURED_CALL_FAQ,
  PLAN_WEBSITE_BASIC,
  PLAN_WEBSITE_GROWTH,
  SERVICE_PRICING,
} from '@/content/pricing';

export const SITE_CTA = {
  label: 'Nhận kiểm tra Google + review miễn phí',
  to: '/lien-he',
};

export const ngheMay = {
  slug: 'le-tan-ai-nghe-may-dat-lich',
  seo: {
    title: 'Tổng đài AI nghe máy & đặt lịch cho tiệm nail',
    description:
      'AI bắt máy 24/7 thay anh/chị khi đang bận làm khách, đặt lịch tự động, nhắn lại cuộc gọi nhỡ. Nghe thử demo bằng tên tiệm của anh/chị.',
  },
  hero: {
    eyebrow: 'Nghe máy & đặt lịch',
    heading: 'Mỗi cuộc gọi nhỡ là một khách mất đi',
    subheading:
      'Lễ Tân AI của UpMySalon được thiết kế riêng để trả lời điện thoại cho tiệm nail. Dựa trên kinh nghiệm và sự hiểu biết về nghề nail, nó hiểu dịch vụ (full set, gel, bột, pedicure…), hiểu khách walk-in, và trả lời tự nhiên như lễ tân người thật — chào khách, báo giá, đặt lịch — ngay cả khi cả tiệm đang bận tay.',
    ctaLabel: 'Dùng thử AI bắt máy cho tiệm anh/chị',
    image: '/hero/ai_phone.jpg',
    imageAlt: 'AI nghe điện thoại và đặt lịch cho tiệm nail',
  },
  painPoints: {
    eyebrow: 'Những việc đang làm tiệm mất khách',
    heading: 'Anh/chị có đang gặp những chuyện này?',
    items: [
      { icon: 'PhoneCall', text: 'Giờ cao điểm không ai rảnh bắt máy — khách gọi 2–3 lần rồi qua tiệm khác.' },
      { icon: 'Clock3', text: 'Khách gọi ngoài giờ, sáng sớm, tối muộn — không ai nghe.' },
      { icon: 'Search', text: 'Mỗi cuộc gọi nhỡ là một khách $40–60 có thể mất.' },
    ],
  },
  steps: {
    heading: 'Cách hoạt động',
    items: [
      { number: '1', title: 'Cài đặt số cũ cho tiệm', desc: 'Giữ nguyên số hiện tại, hoặc cấp số mới — tùy anh/chị chọn.' },
      { number: '2', title: 'AI bắt máy khi bận', desc: 'AI bắt máy khi anh/chị bận hoặc ngoài giờ.' },
      { number: '3', title: 'Báo lịch về tiệm', desc: 'Lịch hẹn + cuộc gọi nhỡ báo về cho tiệm.' },
    ],
  },

  effortContrast: {
    heading: 'Anh/chị làm rất ít — UpMySalon làm phần còn lại',
    youLabel: 'Anh/chị làm (một lần)',
    weLabel: 'Công việc của UpMySalon',
    youDo: [
      'Giữ nguyên số điện thoại tiệm',
      'Cho đội ngũ biết giờ giấc, bảng giá, danh sách thợ',
      'Xong — anh/chị chỉ việc làm nail',
    ],
    weDo: [
      'Cài đặt tổng đài + gán thợ',
      'Bắt máy 24/7',
      'Đặt lịch vào hệ thống tiệm đang dùng',
      'Nhắn nhắc hẹn + follow-up cuộc gọi nhỡ',
      'Ghi chú khách quen',
      'Cập nhật khi tiệm đổi giá/giờ',
      'Gửi báo cáo tháng',
      'Hỗ trợ ưu tiên',
    ],
  },
  featureBenefit: {
    heading: 'Tổng đài AI làm được gì cho tiệm',
    items: [
      {
        icon: 'Phone',
        feature: 'Bắt máy 24/7 theo gói (Starter 100 / Pro 200 captured calls)',
        benefit:
          'Không bỏ lỡ khách, kể cả ngoài giờ. Chỉ tính captured call theo chuẩn RingBooker — không tính spam, cuộc quá ngắn hay chuyển tiếp thất bại.',
      },
      {
        icon: 'FileText',
        feature: 'Trả lời câu hỏi về giá rõ ràng',
        benefit:
          'Full set, gel, acrylic, bột (dip), pedicure — trả lời đúng theo bảng dịch vụ và giá anh/chị đã cài.',
        highlight: true,
      },
      {
        icon: 'Clock3',
        feature: 'Đặt lịch trong ngày & khách walk-in',
        benefit: 'Giữ chân khách đang muốn có chỗ ngay hôm nay hoặc cuối tuần này.',
        highlight: true,
      },
      {
        icon: 'Languages',
        feature: 'Song ngữ Anh – Tây Ban Nha',
        benefit: 'Bắt được cả khách nói tiếng Tây Ban Nha — không mất nhóm khách đông này.',
        highlight: true,
      },
      {
        icon: 'Bell',
        feature: 'SMS nhắc hẹn + follow-up',
        benefit: 'Tự nhắn nhắc khách trước hẹn → giảm khách quên, bớt ghế trống.',
        highlight: true,
      },
      {
        icon: 'UserRound',
        feature: 'Đặt đúng thợ quen',
        benefit: 'Khách đặt được đúng thợ mình thích.',
        highlight: true,
      },
      {
        icon: 'CalendarClock',
        feature: 'Đồng bộ Square, Mindbody (và thêm)',
        benefit: 'Đặt thẳng vào lịch tiệm đang dùng, không phải đổi hệ thống.',
      },
      {
        icon: 'NotebookPen',
        feature: 'Ghi chú khách quen + sở thích',
        benefit: 'AI nhớ khách như lễ tân lâu năm.',
      },
      {
        icon: 'PhoneForwarded',
        feature: 'Chuyển máy cho chủ kèm ngữ cảnh',
        benefit: 'Cần thì chuyển cho anh/chị, kèm sẵn thông tin khách.',
      },
      {
        icon: 'ChartNoAxesColumn',
        feature: 'Call recovery insights',
        benefit: 'Mỗi tháng thấy rõ cứu được bao nhiêu cuộc gọi nhỡ.',
      },
      {
        icon: 'FileText',
        feature: 'Transcript + ghi âm cuộc gọi',
        benefit: 'Xem lại nội dung mọi cuộc gọi khi cần.',
      },
      {
        icon: 'Headphones',
        feature: 'Hỗ trợ ưu tiên',
        benefit: 'Cần gì có người lo ngay.',
      },
    ],
  },
  monthlyReport: {
    heading: 'Mỗi tháng anh/chị nhận báo cáo',
    items: [
      'Số cuộc gọi bắt được',
      'Số lịch hẹn đặt thành công',
      'Số cuộc gọi nhỡ đã cứu',
      'Giờ nào khách gọi nhiều',
    ],
  },
  proof: {
    heading: 'Vì sao tiệm tin dùng',
    items: [
      { title: 'Latency thấp', text: 'Bắt máy nhanh, khách không phải chờ lâu.' },
      { title: 'Đặt lịch thật', text: 'Lịch vào đúng giờ trống, giảm chồng lịch.' },
      { title: 'Giọng tự nhiên', text: 'Nói chuyện với khách Mỹ mượt như người thật.' },
    ],
  },
  pricing: SERVICE_PRICING.voice,
  faq: {
    heading: 'Câu hỏi thường gặp',
    items: [
      { q: 'AI có nói tiếng Anh với khách Mỹ tự nhiên không?', a: 'Có. Giọng tự nhiên, nói chuyện với khách Mỹ mượt như người thật. AI hỗ trợ tiếng Anh và tiếng Tây Ban Nha theo cấu hình — không phải tiếng Việt, vì AI nói với khách của tiệm.' },
      { q: 'Có giữ được số điện thoại tiệm không?', a: 'Có. Giữ nguyên số hiện tại của tiệm.' },
      { q: 'Nếu khách muốn gặp người thật thì sao?', a: 'Có thể chuyển cho người thật khi cần — anh/chị vẫn kiểm soát được.' },
      CAPTURED_CALL_FAQ,
    ],
  },
  ctaBanner: {
    heading: 'Nghe thử bằng chính tên tiệm anh/chị',
    subheading: 'Nhắn UpMySalon để nhận demo và kiểm tra Google + review miễn phí.',
  },
};

export const danhGiaGoogle = {
  slug: 'danh-gia-google',
  seo: {
    title: 'Tăng review Google 5 sao cho tiệm nail — làm A–Z',
    description:
      'UpMySalon xin review sau mỗi lần khách tới, trả lời giúp mọi review bằng tiếng Anh chuyên nghiệp. Nhận kiểm tra Google + review miễn phí.',
  },
  hero: {
    eyebrow: 'Đánh giá Google',
    heading: 'Lên sao, lên khách — UpMySalon lo phần review cho tiệm.',
    subheading:
      'Điểm sao cao kéo khách mới. Hệ thống tự động xin đánh giá sau mỗi lượt khách và trả lời review bằng tiếng Anh chuyên nghiệp — đều đặn, không sót review nào. Gặp review xấu, đội ngũ người Việt của UpMySalon bàn với anh/chị (bằng tiếng Việt) cách xử lý khéo léo.',
    ctaLabel: 'Nhận kiểm tra Google + review miễn phí',
    image: '/hero/review.jpg',
    imageAlt: 'Tăng và quản lý đánh giá Google 5 sao cho tiệm nail',
  },
  painPoints: {
    eyebrow: 'Những việc đang làm tiệm mất khách',
    heading: 'Anh/chị có đang gặp những chuyện này?',
    items: [
      { icon: 'Star', text: 'Ít review, sao thấp — khách mới chọn tiệm 4.8 sao bên cạnh.' },
      { icon: 'Clock3', text: 'Không có thời gian ngồi xin từng khách review.' },
      { icon: 'MessageCircle', text: 'Gặp review xấu không biết trả lời sao cho khéo.' },
    ],
  },
  proof: {
    heading: 'Quy trình làm',
    items: [
      { title: 'Xin review đều', text: 'Sau mỗi lần khách tới — QR + tin nhắn, không bỏ sót.' },
      { title: 'Đúng chính sách Google', text: 'Xin tất cả khách hài lòng — không lọc/gate review.' },
      {
        title: 'Trả lời giúp',
        text: 'Đội ngũ UpMySalon trả lời mọi review bằng tiếng Anh chuyên nghiệp thay anh/chị; gặp review xấu, đội ngũ UpMySalon bàn với anh/chị (bằng tiếng Việt) cách xử lý.',
      },
    ],
  },
  steps: {
    heading: 'Cách hoạt động',
    items: [
      { number: '1', title: 'Dựng cách xin review', desc: 'UpMySalon dựng xin review tự động (QR + tin nhắn) sau mỗi lượt khách.' },
      { number: '2', title: 'Khách để 5 sao', desc: 'Khách hài lòng để lại 5 sao trên Google.' },
      { number: '3', title: 'Trả lời mọi review', desc: 'UpMySalon trả lời mọi review, xử lý review xấu khéo léo.' },
    ],
  },

  effortContrast: {
    heading: 'Anh/chị làm rất ít — UpMySalon lo review',
    youLabel: 'Anh/chị làm',
    weLabel: 'Công việc của UpMySalon',
    youDo: [
      'Không làm gì thêm ngoài phục vụ khách như thường',
    ],
    weDo: [
      'Dựng cách xin review tự động (QR + SMS) sau mỗi lượt khách',
      'Theo dõi review mới hàng ngày',
      'Trả lời mọi review bằng tiếng Anh chuyên nghiệp (review xấu bàn với anh/chị bằng tiếng Việt)',
      'Báo cáo điểm sao + số review tăng',
    ],
  },
  monthlyReport: {
    heading: 'Mỗi tháng anh/chị nhận báo cáo',
    items: [
      'Số review mới',
      'Điểm sao thay đổi',
      'Review xấu đã xử lý',
    ],
  },
  pricing: SERVICE_PRICING.review,
  faq: {
    heading: 'Câu hỏi thường gặp',
    items: [
      { q: 'Có làm ảnh hưởng Google của tiệm không?', a: 'Không. UpMySalon làm đúng chính sách Google, an toàn cho tiệm.' },
      { q: 'Bao lâu thấy kết quả?', a: 'Review và Google thường bắt đầu thấy chuyển biến trong 2–4 tuần đầu.' },
      { q: 'Review xấu xử lý thế nào?', a: 'Trả lời khéo, mời xử lý riêng — không tranh cãi công khai, giữ uy tín tiệm.' },
    ],
  },
  ctaBanner: {
    heading: 'Nhận kiểm tra Google + review miễn phí',
    subheading: '15 phút check Google + review — nói thẳng tiệm đang thiếu gì.',
  },
};

export const tinNhan = {
  slug: 'ai-quan-ly-inbox-facebook-ig',
  seo: {
    title: 'Trả lời tin nhắn Facebook & Instagram tự động cho tiệm nail',
    description:
      'Khách nhắn IG/FB là được phản hồi ngay, chốt lịch tự động, chuyển người thật khi cần. Bằng tiếng Việt.',
  },
  hero: {
    eyebrow: 'Tin nhắn FB & IG',
    heading: 'Khách nhắn tin là được trả lời ngay — kể cả khi tiệm đang đông.',
    subheading:
      'Phần mềm AI quản lý inbox Facebook & Instagram: trả lời câu hỏi giá/giờ, chốt lịch tự động, và chuyển cho người thật khi cần.',
    ctaLabel: 'Nhận tư vấn quản lý tin nhắn FB/IG miễn phí',
    image: '/hero/ig.jpg',
    imageAlt: 'Trả lời tin nhắn Facebook và Instagram cho tiệm nail',
  },
  painPoints: {
    eyebrow: 'Những việc đang làm tiệm mất khách',
    heading: 'Anh/chị có đang gặp những chuyện này?',
    items: [
      { icon: 'MessageCircle', text: 'Tin nhắn dồn đống, trả lời trễ — khách mất kiên nhẫn.' },
      { icon: 'Clock3', text: 'Khách hỏi giá/giờ lặp đi lặp lại cả ngày.' },
      { icon: 'Search', text: 'Nhắn tin đến lúc rảnh trả lời thì khách đã đặt tiệm khác.' },
    ],
  },
  steps: {
    heading: 'Cách hoạt động',
    items: [
      { number: '1', title: 'Kết nối trang', desc: 'Kết nối trang Facebook / Instagram của tiệm.' },
      { number: '2', title: 'AI trả lời + chốt lịch', desc: 'AI trả lời câu thường gặp và chốt lịch.' },
      { number: '3', title: 'Handoff người thật', desc: 'Ca khó chuyển người thật xử lý.' },
    ],
  },

  effortContrast: {
    heading: 'Anh/chị làm rất ít — UpMySalon lo inbox',
    youLabel: 'Anh/chị làm (một lần)',
    weLabel: 'Công việc của UpMySalon',
    youDo: [
      'Kết nối trang Facebook / Instagram một lần',
    ],
    weDo: [
      'Trực trả lời tin nhắn',
      'Trả lời câu hỏi giá/giờ',
      'Chốt lịch',
      'Chuyển ca khó cho người thật',
      'Báo cáo tháng: số tin nhắn đã xử lý + lịch chốt được',
    ],
  },
  monthlyReport: {
    heading: 'Mỗi tháng anh/chị nhận báo cáo',
    items: [
      'Số tin nhắn đã xử lý',
      'Số lịch hẹn chốt được từ inbox',
      'Số ca đã chuyển người thật',
    ],
  },
  proof: {
    heading: 'Kết quả mong đợi',
    items: [
      { title: 'Phản hồi ngay', text: 'Khách không phải chờ đến khi anh/chị rảnh tay.' },
      { title: 'Chốt lịch tự động', text: 'Giảm tin nhắn hỏi đi hỏi lại về giá và giờ.' },
      { title: 'Có người giám sát', text: 'Ca khó luôn chuyển người thật — không bỏ mặc AI.' },
    ],
  },
  pricing: SERVICE_PRICING.inbox,
  faq: {
    heading: 'Câu hỏi thường gặp',
    items: [
      { q: 'Có trả lời sai làm mất khách không?', a: 'Có người giám sát và handoff người thật khi cần — không để AI tự xử lý mọi ca khó.' },
      { q: 'Kết nối FB/IG có khó không?', a: 'UpMySalon hỗ trợ kết nối từng bước bằng tiếng Việt.' },
    ],
  },
  ctaBanner: {
    heading: 'Muốn inbox được lo hộ?',
    subheading: 'Nhắn UpMySalon để nhận kiểm tra tiệm và tư vấn gói tin nhắn.',
  },
};

export const websiteSeo = {
  slug: 'website-seo',
  seo: {
    title: 'Làm website tiệm nail chuẩn SEO + lên Google Maps',
    description:
      "Tạo mới hoặc làm lại website cho tiệm, tối ưu SEO, đưa tiệm lên top Google Maps để khách tìm 'nail near me' thấy anh/chị trước.",
  },
  hero: {
    eyebrow: 'Website & SEO',
    heading: 'Website đẹp + lên top Google — khách tìm là thấy tiệm anh/chị.',
    subheading:
      'UpMySalon tạo mới hoặc làm lại website cho tiệm, tối ưu SEO và đưa tiệm lên Google Maps.',
    ctaLabel: 'Nhận kiểm tra website + Google Maps miễn phí',
    image: '/hero/map.jpg',
    imageAlt: 'Website chuẩn SEO và Google Maps cho tiệm nail',
  },
  painPoints: {
    eyebrow: 'Những việc đang làm tiệm mất khách',
    heading: 'Anh/chị có đang gặp những chuyện này?',
    items: [
      { icon: 'Globe2', text: 'Chưa có website, hoặc web cũ khó xem trên điện thoại.' },
      { icon: 'Search', text: "Search 'nail near me' không thấy tiệm mình." },
      { icon: 'MapPin', text: 'Hồ sơ Google Maps sơ sài, thiếu ảnh, sai giờ.' },
    ],
  },
  proof: {
    heading: 'Website + Maps đi cùng nhau',
    items: [
      { title: 'Đẹp trên điện thoại', text: 'Khách Mỹ hay xem trên phone — site phải rõ dịch vụ và nút gọi/đặt lịch.' },
      { title: 'Chuẩn SEO local', text: 'Hỗ trợ tín hiệu để Google hiểu tiệm và khu vực.' },
      { title: 'Google Maps mạnh', text: 'Hồ sơ đầy đủ, ảnh, giờ, review — dễ được chọn hơn.' },
    ],
  },
  steps: {
    heading: 'Cách hoạt động',
    items: [
      { number: '1', title: 'Dựng website', desc: 'UpMySalon dựng website chuẩn, đẹp trên điện thoại.' },
      { number: '2', title: 'SEO + Maps', desc: 'Tối ưu SEO và hồ sơ Google Maps.' },
      { number: '3', title: 'Duy trì', desc: 'Duy trì để giữ thứ hạng — SEO không phải làm một lần là xong.' },
    ],
  },

  effortContrast: {
    heading: 'Anh/chị làm rất ít — UpMySalon vận hành web mỗi tháng',
    youLabel: 'Anh/chị làm (một lần)',
    weLabel: 'Công việc của UpMySalon',
    youDo: [
      'Gửi ảnh tiệm + thông tin cơ bản (một lần)',
    ],
    weDo: [
      'Dựng & duy trì website',
      'Hosting, SSL, sao lưu, chỉnh nhỏ theo gói',
      'Cập nhật Google Business Profile (gói Growth)',
      '2 bài viết trên website tối ưu SEO/tháng (gói Growth)',
      'Báo cáo đầy đủ (gói Growth)',
    ],
  },
  monthlyValue: {
    heading: 'Phí một lần vs phí tháng — việc nào đáng tiền hàng tháng',
    intro: 'Website không phải làm xong rồi bỏ. UpMySalon vận hành web để nó kéo khách đều.',
    oneTime: {
      label: `Setup website — ${PLAN_WEBSITE_BASIC.price.split(' + ')[0]} (cơ bản) hoặc ${PLAN_WEBSITE_GROWTH.price.split(' + ')[0]} (Growth)`,
      desc: 'Tạo mới hoặc làm lại website chuẩn SEO (tối đa 5 trang). Gói Growth thêm tối ưu Google Business Profile từ đầu.',
    },
    monthly: [
      {
        title: 'Website cơ bản — $39/tháng',
        desc: 'Hosting + SSL + sao lưu + theo dõi hoạt động; thay giờ/số/giá cơ bản; tối đa 30 phút chỉnh nhỏ/tháng.',
      },
      {
        title: 'Website + Google Growth — $79/tháng',
        desc: 'Mọi thứ gói cơ bản, cộng cập nhật Google Business Profile, tối ưu dịch vụ/mô tả/ảnh, 2 bài viết trên website tối ưu SEO/tháng, báo cáo đầy đủ.',
      },
    ],
    note: 'UpMySalon không chỉ làm web — UpMySalon vận hành web để nó kéo khách đều mỗi tháng.',
  },
  monthlyReport: {
    heading: 'Mỗi tháng anh/chị nhận báo cáo',
    items: [
      'Bài viết website đã đăng (gói Growth)',
      'Cập nhật Google Business Profile (gói Growth)',
      'Lượt tìm kiếm / cuộc gọi / chỉ đường (gói Growth)',
      'Chỉnh sửa nhỏ theo yêu cầu tiệm',
    ],
  },
  pricing: SERVICE_PRICING.website,
  faq: {
    heading: 'Câu hỏi thường gặp',
    items: [
      { q: 'Bao lâu có website?', a: 'Thường trong 1–2 ngày làm việc. Tùy phạm vi; UpMySalon báo timeline rõ sau khi xem hiện trạng tiệm.' },
      { q: 'Có giữ được tên miền/hồ sơ cũ không?', a: 'Có. Giữ tên miền và hồ sơ Google hiện có khi chuyển.' },
      { q: 'SEO bao lâu lên top?', a: 'SEO cần thời gian và duy trì để giữ hạng — không phải làm một lần lên top mãi. UpMySalon làm đều mỗi tháng để tiệm giữ và tăng hạng. Không hứa top 1 tuyệt đối.' },
    ],
  },
  ctaBanner: {
    heading: 'Nhận kiểm tra website + Google Maps miễn phí',
    subheading: 'UpMySalon nói thẳng tiệm đang thiếu gì — không ép mua.',
  },
};

export const bangGia = {
  slug: 'bang-gia',
  seo: {
    title: 'Bảng giá dịch vụ',
    description: 'Gói linh hoạt cho tiệm nail: review, nghe máy, tin nhắn, website. Thử theo tháng, không hợp đồng dài.',
  },
  hero: {
    eyebrow: 'Bảng giá',
    heading: 'Gói linh hoạt — thử theo tháng, không hợp đồng dài.',
    subheading: 'Gói linh hoạt theo nhu cầu tiệm. Chất lượng Mỹ, giá Việt Nam.',
    ctaLabel: 'Nhận kiểm tra Google + review miễn phí',
  },
  pricing: BANG_GIA_PRICING,
  faq: {
    heading: 'Câu hỏi về thanh toán & huỷ',
    items: [
      { q: 'Có hợp đồng dài hạn không?', a: 'Không. Thử theo tháng, không hợp thì ngưng.' },
      {
        q: 'Muốn huỷ thì huỷ thế nào?',
        a: 'Anh/chị có thể chủ động huỷ online ngay trên hệ thống, bất cứ lúc nào. Huỷ xong vẫn dùng hết kỳ đã trả rồi mới ngưng, không thu thêm.',
      },
      { q: 'Nhân viên hỗ trợ có nói tiếng Việt không?', a: 'Có. Toàn bộ trao đổi bằng tiếng Việt.' },
      { q: 'Bao lâu thấy kết quả?', a: 'Review và Google thường thấy trong 2–4 tuần đầu.' },
      { q: 'Có làm ảnh hưởng Google của tiệm không?', a: 'Không. UpMySalon làm đúng chính sách Google, an toàn cho tiệm.' },
      CAPTURED_CALL_FAQ,
    ],
  },
  ctaBanner: {
    heading: 'Để UpMySalon check giúp tiệm anh/chị miễn phí',
    subheading: 'Nhắn Messenger, Zalo, gọi hoặc Instagram — không ép mua.',
  },
};

export const gioiThieu = {
  slug: 'gioi-thieu',
  seo: {
    title: 'Về UpMySalon — người Việt lo cho tiệm Việt',
    description:
      'Đội ngũ người Việt chuyên giúp tiệm nail ở Mỹ hiện diện tốt trên mạng. Minh bạch, nói tiếng Việt, một sản phẩm của RingBooker LLC.',
  },
  hero: {
    eyebrow: 'Giới thiệu',
    heading: 'Nói tiếng Việt, hiểu tiệm nail, lo hộ để anh/chị rảnh tay làm khách.',
    subheading: 'UpMySalon giúp chủ tiệm nail người Việt tại Mỹ đông khách hơn — bằng tiếng Việt, làm A–Z.',
    ctaLabel: 'Nhận kiểm tra Google + review miễn phí',
  },
  richText: [
    'UpMySalon sinh ra vì hiểu nỗi khổ của chủ tiệm nail gốc Việt ở Mỹ: giỏi làm nail nhưng không kịp lo phần online — điện thoại, review, tin nhắn, website, Google Maps.',
    'UpMySalon lo hộ: nghe máy khi tiệm đang bận, xin và trả lời review, quản lý inbox Facebook & Instagram, dựng website chuẩn SEO và đưa tiệm lên Google Maps.',
    'Cam kết: nói chuyện bằng tiếng Việt, minh bạch, không hợp đồng dài, thử theo tháng. UpMySalon là một sản phẩm của RingBooker LLC (https://ringbooker.com) — công ty đăng ký tại Mỹ.',
  ],
  proof: {
    heading: 'Giá trị cốt lõi',
    items: [
      { title: 'Tiếng Việt', text: 'Nói chuyện bằng ngôn ngữ mẹ đẻ.' },
      { title: 'Làm A–Z', text: 'Anh/chị chỉ việc làm nail; phần marketing tìm khách có UpMySalon lo' },
      { title: 'Không hợp đồng dài', text: 'Thử theo tháng, huỷ khi không hợp. Huỷ dễ dàng online' },
      { title: 'Minh bạch tại Mỹ', text: 'Một sản phẩm của RingBooker LLC.' },
    ],
  },
  ctaBanner: {
    heading: 'Muốn biết UpMySalon có hợp với tiệm không?',
    subheading: 'Hãy thử mất 15 phút xem tiệm mình có hợp không',
  },
};

export const lienHe = {
  slug: 'lien-he',
  seo: {
    title: 'Liên hệ',
    description: 'Nhắn UpMySalon để nhận kiểm tra Google + review miễn phí cho tiệm. Messenger, Zalo, gọi, Instagram.',
  },
  hero: {
    eyebrow: 'Liên hệ',
    heading: 'Để UpMySalon check giúp tiệm anh/chị miễn phí.',
    subheading: 'Kiểm tra Google + review 15 phút. Nhắn hoặc gọi bằng tiếng Việt.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=88',
    imageAlt: 'Đội ngũ chăm sóc khách hàng',
  },
};

export const blogIndex = {
  seo: {
    title: 'Cẩm nang cho tiệm nail',
    description: 'Bài viết hướng dẫn cho chủ tiệm nail người Việt tại Mỹ: review, Google Maps, nghe máy, đông khách.',
  },
  hero: {
    eyebrow: 'Cẩm nang',
    heading: 'Cẩm nang cho tiệm nail',
    subheading: 'Hướng dẫn thực tế cho chủ tiệm nail người Việt tại Mỹ.',
  },
};

export const blogPosts = [
  {
    slug: 'moi-cuoc-goi-nho-tiem-mat-bao-nhieu-tien',
    title: 'Mỗi cuộc gọi nhỡ, tiệm mất bao nhiêu tiền?',
    excerpt: 'Khách gọi 2–3 lần không ai nghe rồi qua tiệm khác. Ước tính nhanh số tiền tiệm có thể đang mất mỗi tuần.',
    tag: 'Nghe máy',
    publishedAt: '2026-07-01',
    body: [
      'Giờ cao điểm, cả tiệm đang bận tay — điện thoại reo. Khách gọi lần hai, lần ba, rồi đặt chỗ khác.',
      'Nếu mỗi khách mang lại khoảng $40–60, chỉ vài cuộc gọi nhỡ mỗi ngày đã đủ làm doanh thu “biến mất” im lặng.',
      'UpMySalon giúp bắt máy 24/7, đặt lịch và nhắn lại cuộc gọi nhỡ — anh/chị tập trung làm nail.',
    ],
  },
  {
    slug: 'checklist-2-phut-ho-so-google-tiem',
    title: 'Checklist 2 phút: hồ sơ Google của tiệm đã chuẩn chưa?',
    excerpt: 'Giờ mở cửa, ảnh, danh mục dịch vụ, nút gọi — checklist nhanh để tiệm dễ được chọn hơn trên Maps.',
    tag: 'Google Maps',
    publishedAt: '2026-07-05',
    body: [
      'Khách Mỹ hay tìm tiệm trên Google Maps. Hồ sơ sơ sài = dễ mất lượt click.',
      'Checklist nhanh: giờ mở cửa đúng chưa? Ảnh thật đủ chưa? Có nút gọi rõ không? Review gần đây có đều không?',
      'UpMySalon có thể kiểm tra hồ sơ Google miễn phí 15 phút và nói thẳng tiệm đang thiếu gì.',
    ],
  },
  {
    slug: 'vi-sao-tiem-48-sao-dong-hon-42',
    title: 'Vì sao tiệm 4.8 sao luôn đông hơn tiệm 4.2 sao?',
    excerpt: 'Điểm sao và số lượng review ảnh hưởng mạnh đến quyết định của khách mới. Xin review đều đặn là việc nên làm.',
    tag: 'Review',
    publishedAt: '2026-07-10',
    body: [
      'Khách mới thường so sánh sao và số review trước khi gọi. Chênh lệch 4.2 và 4.8 nhìn nhỏ nhưng quyết định rất lớn.',
      'Xin review sau mỗi lần khách tới (QR + tin nhắn) giúp số sao tăng đều — đúng chính sách Google, không lọc/gate.',
      'UpMySalon làm phần xin và trả lời review bằng tiếng Việt.',
    ],
  },
];
