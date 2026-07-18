export const CONTACT = {
  messenger: 'https://m.me/upmysalon',
  // Zalo US: zalo.me + số quốc tế không dấu + / khoảng trắng
  zalo: 'https://zalo.me/16265013960',
  phone: '+16265013960',
  phoneDisplay: '+1 (626) 501-3960',
  mailingAddress: '30 N Gould St Ste N\nSheridan, WY 82801',
  instagram: 'https://instagram.com/upmysalon',
};

/** Alias used by Zalo CTA / QR modal. */
export const ZALO_LINK = CONTACT.zalo;

/** QR image for desktop “Nhắn Zalo” modal. */
export const ZALO_QR_URL = 'https://pub-464909a58fec467db9a15df71c98bc24.r2.dev/IMG_9140.JPG';

export const CTA_TEXT = 'Nhận kiểm tra Google + review miễn phí';
/** Dùng cho nút hẹp (sticky mobile, v.v.). */
export const CTA_TEXT_SHORT = 'Kiểm tra tiệm miễn phí';

/** Sticky mobile CTA label — follows each page’s primary CTA (hero.ctaLabel). */
export const STICKY_CTA_BY_PATH: Record<string, string> = {
  '/': CTA_TEXT_SHORT,
  '/le-tan-ai-nghe-may-dat-lich': 'Nghe thử demo ngay',
  '/danh-gia-google': 'Kiểm tra Google + review miễn phí',
  '/ai-quan-ly-inbox-facebook-ig': 'Nhận tư vấn miễn phí',
  '/website-seo': 'Kiểm tra website + Google Maps miễn phí',
  '/bang-gia': CTA_TEXT_SHORT,
  '/gioi-thieu': CTA_TEXT_SHORT,
  '/blog': CTA_TEXT_SHORT,
};

export function stickyCtaLabelForPath(pathname: string | null): string {
  if (!pathname) return CTA_TEXT_SHORT;
  if (pathname.startsWith('/blog/')) return CTA_TEXT_SHORT;
  return STICKY_CTA_BY_PATH[pathname] ?? CTA_TEXT_SHORT;
}

export const SERVICE_LINKS = [
  { href: '/le-tan-ai-nghe-may-dat-lich', label: 'Lễ tân AI nghe điện thoại, đặt lịch' },
  { href: '/danh-gia-google', label: 'Quản lý đánh giá Google' },
  { href: '/ai-quan-ly-inbox-facebook-ig', label: 'Quản lý & trả lời FB/IG' },
  { href: '/website-seo', label: 'Website & SEO' },
] as const;

export const NAV_LINKS: ReadonlyArray<{
  href: string;
  label: string;
  highlight?: boolean;
}> = [
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/blog', label: 'Cẩm nang' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/lien-he', label: 'Liên hệ', highlight: true },
];

export const PAGE_SLUGS = [
  'le-tan-ai-nghe-may-dat-lich',
  'danh-gia-google',
  'ai-quan-ly-inbox-facebook-ig',
  'website-seo',
  'bang-gia',
  'gioi-thieu',
  'lien-he',
] as const;

export type PageSlug = (typeof PAGE_SLUGS)[number];
