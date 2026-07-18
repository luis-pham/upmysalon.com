/**
 * Bảng giá UpMySalon — nguồn nội dung duy nhất cho giá trên site.
 * Đồng bộ catalog Stripe (app.upmysalon.com):
 * - Review $49/mo → STRIPE_PRICE_REVIEW_MONTHLY
 * - Inbox $59/mo → STRIPE_PRICE_INBOX_MONTHLY
 * - Voice Starter/Pro → STRIPE_PRICE_VOICE_*_MONTHLY
 * - Website $399+$39 → STRIPE_PRICE_WEBSITE_BASIC_*
 * - Local SEO $99+$59 → STRIPE_PRICE_LOCAL_SEO_*
 * - Website+Growth $499+$79 → STRIPE_PRICE_WEBSITE_GROWTH_*
 * - Bundle $199+$199 → STRIPE_PRICE_BUNDLE_*
 */

export type PricingPlanCard = {
  id?: string;
  name: string;
  price: string;
  /** Dòng mô tả ngắn dưới tên gói (tuỳ chọn). */
  description?: string;
  /** Ví dụ: "Không phí thiết lập" hoặc nhắc phí setup. */
  setupNote?: string;
  features: string[];
  highlighted?: boolean;
  /** Nút chính trên thẻ. */
  ctaLabel?: string;
  /** Link phụ dưới nút chính (trang bảng giá). */
  secondaryCtaLabel?: string;
  /** Dòng nhỏ dưới nút (không phải link) — vd. điều kiện trial voice. */
  footnote?: string;
};

export type PricingBlockContent = {
  heading: string;
  plans: PricingPlanCard[];
  note?: string;
};

export type WebsiteSeoCase = {
  caseLabel: string;
  name: string;
  price: string;
  features: string[];
};

export type WebsiteSeoGroup = {
  id: string;
  name: string;
  prompt: string;
  cases: WebsiteSeoCase[];
  ctaLabel: string;
};

export type PricingPainLink = {
  href: string;
  pain: string;
  packageLabel: string;
};

export type BangGiaPricingLayout = {
  heading: string;
  painLinks: PricingPainLink[];
  standalonePlans: PricingPlanCard[];
  websiteGroup: WebsiteSeoGroup;
  bundle: PricingPlanCard;
  note?: string;
};

/** Chuẩn RingBooker: cuộc gọi được tính khi AI bắt được thông tin hữu ích; không tính spam / quá ngắn / chuyển tiếp thất bại / demo. */
export const CAPTURED_CALL_DEFINITION =
  'Captured call (cuộc gọi được tính) theo chuẩn RingBooker: cuộc gọi mà AI tương tác thành công với khách và bắt được thông tin hữu ích (tên, số điện thoại, dịch vụ, giờ mong muốn, yêu cầu gọi lại, đặt/đổi/hủy lịch…). Không tính spam, cuộc gọi quá ngắn, chuyển tiếp thất bại, cuộc demo/test, hoặc cuộc kết thúc trước khi AI kịp phản hồi.';

export const PRICING_NOTE = 'Dùng thử miễn phí 1 tháng, huỷ bất cứ lúc nào.';
/** Khung dùng thử riêng gói nghe máy. */
export const VOICE_TRIAL_NOTE = 'Dùng thử miễn phí 14 ngày.';
export const VOICE_TRIAL_HINT = 'Miễn phí 14 ngày, không cần thẻ để bắt đầu';

export const CTA_TRIAL_MONTH = 'Đăng ký thử 1 tháng';
export const CTA_VOICE_TRIAL = 'Dùng thử 14 ngày miễn phí';
export const CTA_FREE_AUDIT = 'Nhận kiểm tra Google + review miễn phí';
export const NO_SETUP_FEE = 'Không phí thiết lập';

export const PLAN_REVIEW = {
  id: 'goi-review',
  name: 'Gói Review',
  price: '$49/tháng',
  setupNote: NO_SETUP_FEE,
  features: [
    'Xin review sau mỗi lượt khách',
    'Hệ thống tự động trả lời review bằng tiếng Anh',
    'Phát hiện review xấu sớm — UpMySalon cùng tiệm xử lý',
    'Theo dõi số sao',
    'Giới hạn: 1 địa điểm, tối đa 500 yêu cầu review/tháng',
  ],
} as const;

export const PLAN_VOICE = {
  id: 'goi-nghe-may',
  name: 'Gói Nghe máy & đặt lịch',
  price: 'Từ $79/tháng',
  setupNote: NO_SETUP_FEE,
  features: [
    'Starter $79/tháng — 100 captured calls',
    'Pro $149/tháng — 200 captured calls',
    'Custom (liên hệ) — trên 200 captured calls',
    'Bắt máy khi tiệm bận hoặc ngoài giờ',
    'Trả lời câu hỏi thường gặp; đặt lịch; nhắn lại cuộc gọi nhỡ',
    'AI hỗ trợ tiếng Anh và tiếng Tây Ban Nha với khách hàng',
    'Captured call theo chuẩn RingBooker — không tính spam, cuộc quá ngắn, chuyển tiếp thất bại',
  ],
} as const;

const VOICE_TIER_CTA = {
  ctaLabel: CTA_VOICE_TRIAL,
  footnote: VOICE_TRIAL_HINT,
  setupNote: NO_SETUP_FEE,
} as const;

export const PLAN_VOICE_TIERS: PricingPlanCard[] = [
  {
    name: 'Starter',
    price: '$79/tháng',
    features: [
      '100 captured calls/tháng',
      'Bắt máy khi tiệm bận hoặc ngoài giờ',
      'Trả lời câu hỏi thường gặp',
      'Đặt lịch; nhắn lại cuộc gọi nhỡ',
      'AI hỗ trợ tiếng Anh và tiếng Tây Ban Nha với khách hàng',
    ],
    ...VOICE_TIER_CTA,
  },
  {
    name: 'Pro',
    price: '$149/tháng',
    features: [
      '200 captured calls/tháng',
      'Bắt máy khi tiệm bận hoặc ngoài giờ',
      'Trả lời câu hỏi thường gặp',
      'Đặt lịch; nhắn lại cuộc gọi nhỡ',
      'AI hỗ trợ tiếng Anh và tiếng Tây Ban Nha với khách hàng',
    ],
    ...VOICE_TIER_CTA,
  },
  {
    name: 'Custom',
    price: 'Liên hệ',
    features: [
      'Trên 200 captured calls/tháng',
      'Bắt máy khi tiệm bận hoặc ngoài giờ',
      'Trả lời câu hỏi thường gặp',
      'Đặt lịch; nhắn lại cuộc gọi nhỡ',
      'AI hỗ trợ tiếng Anh và tiếng Tây Ban Nha với khách hàng',
    ],
    ...VOICE_TIER_CTA,
  },
];

export const PLAN_INBOX = {
  id: 'goi-tin-nhan',
  name: 'Gói Tin nhắn Facebook & Instagram',
  price: '$59/tháng',
  setupNote: NO_SETUP_FEE,
  features: [
    'Hệ thống AI tự trả lời inbox FB & IG',
    'Chốt lịch tự động',
    'Chuyển người thật khi cần',
    'Giới hạn: 1 Facebook Page + 1 Instagram, fair use',
  ],
} as const;

export const PLAN_WEBSITE_BASIC = {
  id: 'website-basic',
  name: 'Website cơ bản',
  price: '$399 phí thiết lập + $39/tháng',
  features: [
    'Website mới hoặc làm lại, chuẩn SEO, tối đa 5 trang',
    'Kèm 1 domain .com (nếu tiệm chưa có)',
    'Duy trì: hosting + SSL + sao lưu + theo dõi hoạt động',
    'Thay giờ/số/giá cơ bản + tối đa 30 phút chỉnh nhỏ/tháng',
    'Không gồm: viết bài, thiết kế lại, chụp/chỉnh ảnh, SEO nội dung hàng tháng, quản trị Maps chủ động',
  ],
} as const;

/** Tiệm đã có website — chỉ tăng SEO + Google. Khớp STRIPE_PRICE_LOCAL_SEO_*. */
export const PLAN_LOCAL_SEO = {
  id: 'local-seo',
  name: 'Local SEO / Google Growth',
  price: '$99 phí thiết lập + $59/tháng',
  features: [
    'Kiểm tra (audit) website + Google Maps',
    'Quản lý & tối ưu Google Business Profile',
    'Đăng bài Google + chăm Maps',
    '2 bài viết SEO/tháng — nghiên cứu đúng từ khoá khách tìm ở khu vực tiệm, viết chuẩn SEO, soạn sẵn để tiệm chỉ việc đăng (hoặc UpMySalon đăng nếu quản web của tiệm)',
    'Báo cáo tháng',
    'Không bắt buộc làm web mới',
  ],
} as const;

export const PLAN_WEBSITE_GROWTH = {
  id: 'website-growth',
  name: 'Website + Google Growth',
  price: '$499 phí thiết lập + $79/tháng',
  features: [
    'Mọi thứ của gói Website cơ bản',
    'Cập nhật Google Business Profile',
    'Tối ưu dịch vụ / mô tả / hình ảnh',
    '2 bài viết trên website tối ưu SEO mỗi tháng',
    'Báo cáo đầy đủ (lượt tìm kiếm, cuộc gọi, chỉ đường)',
  ],
  highlighted: true,
} as const;

export const PLAN_BUNDLE = {
  id: 'goi-tron-goi',
  name: 'Trọn gói',
  price: '$199/tháng + $199 phí thiết lập',
  features: [
    'Lễ tân AI nghe máy điện thoại và đặt lịch',
    'Hệ thống quản lý Review trên Google Maps (có AI hỗ trợ trả lời comment)',
    'AI tự động trả lời tin nhắn và đặt lịch trên Facebook, Instagram',
    'Thiết kế mới website hoặc tối ưu website cũ, tối ưu SEO website, Google Maps',
  ],
  highlighted: true,
} as const;

export const WEBSITE_SEO_GROUP: WebsiteSeoGroup = {
  id: 'goi-website-seo',
  name: 'Website & SEO',
  prompt: 'Anh/chị thuộc trường hợp nào?',
  cases: [
    {
      caseLabel: 'ĐÃ CÓ WEBSITE',
      name: PLAN_LOCAL_SEO.name,
      price: PLAN_LOCAL_SEO.price,
      features: [...PLAN_LOCAL_SEO.features],
    },
    {
      caseLabel: 'CHƯA CÓ WEBSITE',
      name: PLAN_WEBSITE_BASIC.name,
      price: PLAN_WEBSITE_BASIC.price,
      features: [...PLAN_WEBSITE_BASIC.features],
    },
    {
      caseLabel: 'MUỐN CẢ HAI',
      name: PLAN_WEBSITE_GROWTH.name,
      price: PLAN_WEBSITE_GROWTH.price,
      features: [...PLAN_WEBSITE_GROWTH.features],
    },
  ],
  ctaLabel: CTA_TRIAL_MONTH,
};

function toCard(
  plan: {
    id?: string;
    name: string;
    price: string;
    description?: string;
    setupNote?: string;
    features: readonly string[];
    highlighted?: boolean;
    ctaLabel?: string;
    secondaryCtaLabel?: string;
    footnote?: string;
  },
): PricingPlanCard {
  return {
    id: plan.id,
    name: plan.name,
    price: plan.price,
    description: plan.description,
    setupNote: plan.setupNote,
    features: [...plan.features],
    highlighted: plan.highlighted,
    ctaLabel: plan.ctaLabel,
    secondaryCtaLabel: plan.secondaryCtaLabel,
    footnote: plan.footnote,
  };
}

const BANG_GIA_TRIAL_CTA = {
  ctaLabel: CTA_TRIAL_MONTH,
} as const;

const BANG_GIA_VOICE_CTA = {
  ctaLabel: CTA_VOICE_TRIAL,
  footnote: VOICE_TRIAL_HINT,
} as const;

const SERVICE_TRIAL_CTA = {
  ctaLabel: CTA_TRIAL_MONTH,
} as const;

/** Trang /bang-gia — layout đã duyệt (pain links + gộp Website & SEO). */
export const BANG_GIA_PRICING_LAYOUT: BangGiaPricingLayout = {
  heading: 'Chọn phần tiệm đang cần nhất',
  painLinks: [
    { href: `#${PLAN_VOICE.id}`, pain: 'Mất cuộc gọi khi bận tay', packageLabel: 'Nghe máy' },
    { href: `#${PLAN_REVIEW.id}`, pain: 'Ít review, điểm sao thấp', packageLabel: 'Review' },
    { href: `#${PLAN_INBOX.id}`, pain: 'Tin nhắn FB/IG không trả kịp', packageLabel: 'Tin nhắn' },
    {
      href: `#${WEBSITE_SEO_GROUP.id}`,
      pain: 'Khách tìm không thấy tiệm trên Google',
      packageLabel: 'Website & SEO',
    },
    { href: `#${PLAN_BUNDLE.id}`, pain: 'Muốn lo hết một lần', packageLabel: 'Trọn gói' },
  ],
  standalonePlans: [
    toCard({ ...PLAN_REVIEW, ...BANG_GIA_TRIAL_CTA }),
    toCard({ ...PLAN_VOICE, ...BANG_GIA_VOICE_CTA }),
    toCard({ ...PLAN_INBOX, ...BANG_GIA_TRIAL_CTA }),
  ],
  websiteGroup: WEBSITE_SEO_GROUP,
  bundle: toCard({ ...PLAN_BUNDLE, ...BANG_GIA_TRIAL_CTA }),
  note: `${PRICING_NOTE} Gói nghe máy: ${VOICE_TRIAL_NOTE}`,
};

/** @deprecated Dùng BANG_GIA_PRICING_LAYOUT cho trang /bang-gia. */
export const BANG_GIA_PRICING: PricingBlockContent = {
  heading: BANG_GIA_PRICING_LAYOUT.heading,
  plans: [
    ...BANG_GIA_PRICING_LAYOUT.standalonePlans,
    toCard({
      id: WEBSITE_SEO_GROUP.id,
      name: WEBSITE_SEO_GROUP.name,
      price: 'Theo trường hợp tiệm',
      features: WEBSITE_SEO_GROUP.cases.map((c) => `${c.caseLabel}: ${c.name}`),
      ...BANG_GIA_TRIAL_CTA,
    }),
    BANG_GIA_PRICING_LAYOUT.bundle,
  ],
  note: BANG_GIA_PRICING_LAYOUT.note,
};

/** Block giá trên từng trang dịch vụ. */
export const SERVICE_PRICING = {
  review: {
    heading: 'Gói Review',
    plans: [toCard({ ...PLAN_REVIEW, ...SERVICE_TRIAL_CTA })],
    note: PRICING_NOTE,
  } satisfies PricingBlockContent,
  voice: {
    heading: 'Gói nghe máy & đặt lịch',
    plans: PLAN_VOICE_TIERS,
    note: VOICE_TRIAL_NOTE,
  } satisfies PricingBlockContent,
  inbox: {
    heading: 'Gói tin nhắn Facebook & Instagram',
    plans: [toCard({ ...PLAN_INBOX, ...SERVICE_TRIAL_CTA })],
    note: PRICING_NOTE,
  } satisfies PricingBlockContent,
  website: {
    heading: 'Website & SEO — chọn đúng trường hợp tiệm',
    group: WEBSITE_SEO_GROUP,
    note: `${PRICING_NOTE} Local SEO / Google Growth không bắt buộc làm website mới.`,
  },
} as const;

/** Teaser giá trang chủ — Phương án B (gọn, 1 card Trọn gói + chip dịch vụ). */
export const HOME_PRICING_TEASER = {
  eyebrow: 'Bảng giá đơn giản',
  title: 'Chọn phần tiệm đang cần nhất',
  description:
    'Linh hoạt theo nhu cầu — chỉ từ $49/tháng. Thử theo tháng, không hợp đồng dài. Chất lượng Mỹ, giá Việt Nam.',
  chips: [
    { label: 'Review', price: '$49' },
    { label: 'Nghe máy', price: 'từ $79' },
    { label: 'Tin nhắn FB/IG', price: '$59' },
    { label: 'Website & SEO', price: 'từ $59' },
  ],
  bundle: {
    name: PLAN_BUNDLE.name,
    price: PLAN_BUNDLE.price,
    tag: 'Đủ nhất',
    features: ['Nghe máy + Review · Facebook & Instagram · Website + Google Maps'],
    ctaLabel: CTA_TRIAL_MONTH,
  },
  fullPricingLabel: 'Xem bảng giá đầy đủ →',
  auditCtaLabel: CTA_FREE_AUDIT,
} as const;

export const CAPTURED_CALL_FAQ = {
  q: 'Captured call là gì? Cuộc nào được tính?',
  a: CAPTURED_CALL_DEFINITION,
} as const;
