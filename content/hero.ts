/**
 * Hero media seed — maps to hero block image fields in CMS (Payload) later.
 * Home carousel + per-service hero images.
 */

export type HeroSlide = {
  src: string;
  alt: string;
  caption: string;
  href: string;
};

export const HOME_HERO_SLIDES: HeroSlide[] = [
  {
    src: '/hero/ai_phone.jpg',
    alt: 'AI nghe điện thoại và đặt lịch cho tiệm nail',
    caption: 'Bận làm khách? AI bắt máy và đặt lịch giúp.',
    href: '/le-tan-ai-nghe-may-dat-lich',
  },
  {
    src: '/hero/review.jpg',
    alt: 'Tăng và quản lý đánh giá Google 5 sao cho tiệm nail',
    caption: 'Nhiều review 5 sao hơn, khách mới chọn tiệm anh/chị.',
    href: '/danh-gia-google',
  },
  {
    src: '/hero/ig.jpg',
    alt: 'Trả lời tin nhắn Facebook và Instagram cho tiệm nail',
    caption: 'Khách nhắn là được trả lời và chốt lịch ngay.',
    href: '/ai-quan-ly-inbox-facebook-ig',
  },
  {
    src: '/hero/map.jpg',
    alt: 'Website chuẩn SEO và Google Maps cho tiệm nail',
    caption: "Khách tìm 'nail near me' là thấy tiệm anh/chị đầu tiên.",
    href: '/website-seo',
  },
];

export const SERVICE_HERO_BY_SLUG = {
  'le-tan-ai-nghe-may-dat-lich': {
    image: '/hero/ai_phone.jpg',
    imageAlt: 'AI nghe điện thoại và đặt lịch cho tiệm nail',
  },
  'danh-gia-google': {
    image: '/hero/review.jpg',
    imageAlt: 'Tăng và quản lý đánh giá Google 5 sao cho tiệm nail',
  },
  'ai-quan-ly-inbox-facebook-ig': {
    image: '/hero/ig.jpg',
    imageAlt: 'Trả lời tin nhắn Facebook và Instagram cho tiệm nail',
  },
  'website-seo': {
    image: '/hero/map.jpg',
    imageAlt: 'Website chuẩn SEO và Google Maps cho tiệm nail',
  },
} as const;
