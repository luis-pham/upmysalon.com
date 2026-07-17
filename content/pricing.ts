/**
 * Bảng giá UpMySalon — nguồn nội dung duy nhất cho giá trên site.
 * Sửa tại đây (hoặc map sang CMS sau); không hard-code giá rải rác ở component.
 */

export type PricingPlanCard = {
  name: string;
  price: string;
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

/** Chuẩn RingBooker: cuộc gọi được tính khi AI bắt được thông tin hữu ích; không tính spam / quá ngắn / chuyển tiếp thất bại / demo. */
export const CAPTURED_CALL_DEFINITION =
  'Captured call (cuộc gọi được tính) theo chuẩn RingBooker: cuộc gọi mà AI tương tác thành công với khách và bắt được thông tin hữu ích (tên, số điện thoại, dịch vụ, giờ mong muốn, yêu cầu gọi lại, đặt/đổi/hủy lịch…). Không tính spam, cuộc gọi quá ngắn, chuyển tiếp thất bại, cuộc demo/test, hoặc cuộc kết thúc trước khi AI kịp phản hồi.';

export const PRICING_NOTE = 'Thử 1 tháng, huỷ bất cứ lúc nào.';
/** Khung dùng thử riêng gói nghe máy. */
export const VOICE_TRIAL_NOTE = 'Dùng thử miễn phí 14 ngày.';
export const VOICE_TRIAL_HINT = 'Miễn phí 14 ngày, không cần thẻ để bắt đầu';

export const CTA_TRIAL_MONTH = 'Đăng ký thử 1 tháng';
export const CTA_VOICE_TRIAL = 'Dùng thử 14 ngày miễn phí';
export const CTA_BUNDLE = 'Liên hệ báo giá';

export const PLAN_REVIEW = {
  id: 'review',
  name: 'Gói Review',
  price: '$49/tháng',
  features: [
    'Xin review sau mỗi lượt khách',
    'Hệ thống tự động trả lời review bằng tiếng Anh',
    'Đội ngũ người Việt bàn cách xử lý review xấu',
    'Theo dõi số sao',
    'Giới hạn: 1 địa điểm, tối đa 500 yêu cầu review/tháng',
  ],
} as const;

export const PLAN_VOICE = {
  id: 'voice',
  name: 'Gói Nghe máy & đặt lịch',
  price: 'Từ $79/tháng',
  features: [
    'Starter $79/tháng — 100 captured calls',
    'Pro $149/tháng — 200 captured calls',
    'Custom (liên hệ) — trên 200 captured calls',
    'Bắt máy khi tiệm bận hoặc ngoài giờ',
    'Trả lời câu hỏi thường gặp; đặt lịch; nhắn lại cuộc gọi nhỡ',
    'Hỗ trợ tiếng Anh và tiếng Tây Ban Nha theo cấu hình (AI nói với khách của tiệm — không phải tiếng Việt)',
    'Captured call theo chuẩn RingBooker — không tính spam, cuộc quá ngắn, chuyển tiếp thất bại',
  ],
} as const;

const VOICE_TIER_CTA = {
  ctaLabel: CTA_VOICE_TRIAL,
  footnote: VOICE_TRIAL_HINT,
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
      'Anh & Tây Ban Nha theo cấu hình (không phải tiếng Việt — AI nói với khách)',
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
      'Anh & Tây Ban Nha theo cấu hình (không phải tiếng Việt — AI nói với khách)',
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
      'Anh & Tây Ban Nha theo cấu hình (không phải tiếng Việt — AI nói với khách)',
    ],
    ...VOICE_TIER_CTA,
  },
];

export const PLAN_INBOX = {
  id: 'inbox',
  name: 'Gói Tin nhắn Facebook & Instagram',
  price: '$59/tháng',
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
  id: 'bundle',
  name: 'Trọn gói',
  price: '$199/tháng + $199 phí thiết lập',
  features: [
    'Nghe máy + review',
    'Facebook & Instagram',
    'Website + Google Maps',
  ],
  highlighted: true,
} as const;

function toCard(
  plan: {
    name: string;
    price: string;
    features: readonly string[];
    highlighted?: boolean;
    ctaLabel?: string;
    secondaryCtaLabel?: string;
    footnote?: string;
  },
): PricingPlanCard {
  return {
    name: plan.name,
    price: plan.price,
    features: [...plan.features],
    highlighted: plan.highlighted,
    ctaLabel: plan.ctaLabel,
    secondaryCtaLabel: plan.secondaryCtaLabel,
    footnote: plan.footnote,
  };
}

const BANG_GIA_TRIAL_CTA = {
  ctaLabel: CTA_TRIAL_MONTH,
  secondaryCtaLabel: 'Nhận kiểm tra Google + review của tiệm miễn phí trước.',
} as const;

const BANG_GIA_VOICE_CTA = {
  ctaLabel: CTA_VOICE_TRIAL,
  footnote: VOICE_TRIAL_HINT,
} as const;

const SERVICE_TRIAL_CTA = {
  ctaLabel: CTA_TRIAL_MONTH,
} as const;

/** Trang /bang-gia — đủ các gói. */
export const BANG_GIA_PRICING: PricingBlockContent = {
  heading: 'Chọn phần tiệm đang cần nhất',
  plans: [
    toCard({ ...PLAN_REVIEW, ...BANG_GIA_TRIAL_CTA }),
    toCard({ ...PLAN_VOICE, ...BANG_GIA_VOICE_CTA }),
    toCard({ ...PLAN_INBOX, ...BANG_GIA_TRIAL_CTA }),
    toCard({ ...PLAN_WEBSITE_BASIC, ...BANG_GIA_TRIAL_CTA }),
    toCard({ ...PLAN_WEBSITE_GROWTH, highlighted: false, ...BANG_GIA_TRIAL_CTA }),
    toCard({
      ...PLAN_BUNDLE,
      ctaLabel: CTA_BUNDLE,
      secondaryCtaLabel: 'Nhận kiểm tra Google + review của tiệm miễn phí trước.',
    }),
  ],
  note: `${PRICING_NOTE} Gói nghe máy: ${VOICE_TRIAL_NOTE}`,
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
    heading: 'Website + duy trì',
    plans: [
      toCard({ ...PLAN_WEBSITE_BASIC, ...SERVICE_TRIAL_CTA }),
      toCard({ ...PLAN_WEBSITE_GROWTH, ...SERVICE_TRIAL_CTA }),
    ],
    note: `${PRICING_NOTE} Kỳ vọng thật: SEO cần duy trì để giữ top — không hứa top 1 tuyệt đối.`,
  } satisfies PricingBlockContent,
} as const;

/** Teaser giá trên trang chủ (3 cột). */
export const HOME_PRICING_TEASERS: PricingPlanCard[] = [
  toCard(PLAN_REVIEW),
  toCard({
    name: PLAN_VOICE.name,
    price: PLAN_VOICE.price,
    features: [
      'Starter $79 / 100 · Pro $149 / 200 · Custom trên 200',
      'Bắt máy khi tiệm bận hoặc ngoài giờ',
      'Đặt lịch; nhắn lại cuộc gọi nhỡ',
      'Anh & Tây Ban Nha theo cấu hình',
    ],
  }),
  toCard({
    ...PLAN_BUNDLE,
    features: [
      'Nghe máy + review',
      'Facebook & Instagram',
      'Làm mới / thiết kế lại website theo nhu cầu',
      'Tối ưu GBP, Google Maps',
      '2 bài viết trên website tối ưu SEO/tháng, báo cáo đầy đủ',
    ],
  }),
];

export const CAPTURED_CALL_FAQ = {
  q: 'Captured call là gì? Cuộc nào được tính?',
  a: CAPTURED_CALL_DEFINITION,
} as const;
