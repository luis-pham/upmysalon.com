import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheck,
  Check,
  Clock3,
  MessagesSquare,
  Globe2,
  Camera,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
} from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import { PrimaryCTA, SectionTitle } from '@/components/ui';
import { FaqAccordion } from '@/components/FaqAccordion';
import { EffortContrastBlock } from '@/app/(site)/_blocks';
import { HeroCarousel } from '@/components/HeroCarousel';
import { DemoCallBlock } from '@/components/demo/DemoCallBlock';
import { HOME_HERO_SLIDES } from '@/content/hero';
import { HOME_PRICING_TEASERS, PRICING_NOTE } from '@/content/pricing';

const painPoints = [
  { icon: PhoneCall, text: 'Khách gọi lúc anh/chị đang bận tay — không ai bắt máy là mất khách.' },
  { icon: Star, text: 'Review thấp, ít sao — khách mới chọn tiệm bên cạnh.' },
  { icon: MessageCircle, text: 'Tin nhắn Facebook, Instagram dồn đống — không có thời gian trả lời.' },
  { icon: Globe2, text: 'Website cũ, không chuẩn SEO — khách tìm không thấy, chọn tiệm khác.' },
];

const services = [
  {
    icon: Phone,
    title: 'Nghe máy & đặt lịch tự động',
    text: 'Không bỏ lỡ cuộc gọi nào, kể cả giờ cao điểm.',
    to: '/le-tan-ai-nghe-may-dat-lich',
  },
  {
    icon: ThumbsUp,
    title: 'Tăng & quản lý review Google',
    text: 'Xin review sau mỗi lần khách tới, trả lời giúp cả review xấu.',
    to: '/danh-gia-google',
  },
  {
    icon: MessageCircle,
    title: 'Trả lời tin nhắn IG & Facebook',
    text: 'Khách nhắn là được phản hồi ngay, giúp chốt lịch nhanh hơn.',
    to: '/ai-quan-ly-inbox-facebook-ig',
  },
  {
    icon: MapPin,
    title: 'Website chuẩn SEO + lên Google Maps',
    text: "Tạo mới hoặc làm lại website cho tiệm, tối ưu SEO để khách tìm 'nail near me' là thấy anh/chị trước.",
    to: '/website-seo',
  },
];

const reasons = [
  {
    icon: Users,
    title: 'Nói chuyện tiếng Việt',
    text: 'Hiểu cách tiệm nail vận hành và cách chủ tiệm người Việt muốn được hỗ trợ.',
  },
  {
    icon: Sparkles,
    title: 'Làm từ A–Z',
    text: 'UpMySalon cài đặt, theo dõi và xử lý hằng ngày — anh/chị chỉ việc làm nail.',
  },
  {
    icon: ShieldCheck,
    title: 'Minh bạch, không ràng buộc, huỷ mọi lúc',
    text: 'Công ty đăng ký tại Mỹ, làm theo tháng, không hợp đồng dài hạn.',
  },
];

const faqs: [string, string][] = [
  ['Có hợp đồng dài hạn không?', 'Không. Thử theo tháng, không hợp lòng thì ngưng.'],
  [
    'Muốn huỷ thì huỷ thế nào?',
    'Anh/chị có thể chủ động huỷ online ngay trên hệ thống, bất cứ lúc nào. Huỷ xong vẫn dùng hết kỳ đã trả rồi mới ngưng, không thu thêm.',
  ],
  ['Có làm ảnh hưởng Google của tiệm không?', 'Không. UpMySalon làm đúng chính sách Google, an toàn cho tiệm.'],
  ['Nhân viên hỗ trợ có nói tiếng Việt không?', 'Có. Toàn bộ trao đổi bằng tiếng Việt.'],
  ['Bao lâu thấy kết quả?', 'Review và Google thường bắt đầu thấy chuyển biến trong 2–4 tuần đầu.'],
];

export const HOME_FAQS = faqs;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(201,143,158,0.30),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(201,163,93,0.20),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-roseNude/20 bg-white/80 px-4 py-2 text-sm font-semibold text-roseNude shadow-sm">
              <BadgeCheck className="h-4 w-4" />
              Dịch vụ riêng cho chủ tiệm nail người Việt tại Mỹ
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Giúp tiệm nail của anh/chị <span className="text-roseNude">đông khách hơn</span> — dịch vụ tại Mỹ, giá tại Việt Nam
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/68 sm:text-xl sm:leading-9">
              UpMySalon lo trọn gói cho tiệm: nghe máy giúp khi anh/chị đang bận làm khách, ngoài giờ, xin và trả lời review 5 sao, quản lý tin nhắn Facebook & Instagram, tạo mới hoặc thiết kế lại website đẹp, chuẩn SEO, và đưa tiệm lên top Google Maps. Tất cả bằng tiếng Việt, không hợp đồng dài.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <PrimaryCTA className="w-full sm:w-auto" />
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-black/58">
                <span>Người Việt phục vụ người Việt</span><span>·</span><span>Không ràng buộc</span><span>·</span><span>Thử 1 tháng</span>
              </p>
            </div>
          </div>

          <HeroCarousel slides={HOME_HERO_SLIDES} />
        </div>
      </section>

      <section className="border-y border-black/5 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Những việc đang làm tiệm mất khách" title="Anh/chị có đang gặp những chuyện này?" />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {painPoints.map(({ icon: Icon, text }) => (
              <div key={text} className="flex h-full flex-col rounded-3xl border border-black/5 bg-cream p-6 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush/25 text-roseNude">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg font-semibold leading-8">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoCallBlock />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="UpMySalon làm những gì"
            title="Tìm khách và chăm khách cho tiệm"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text, to }) => (
              <Link
                key={title}
                href={to}
                className="rounded-3xl border border-black/5 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-ink text-cream">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold leading-7">{title}</h3>
                <p className="mt-3 leading-7 text-black/62">{text}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <PrimaryCTA />
          </div>
        </div>
      </section>

      <EffortContrastBlock
        heading="Anh/chị làm 3 việc — UpMySalon làm phần còn lại"
        youLabel="Anh/chị làm"
        weLabel="Công việc của UpMySalon"
        youDo={[
          'Cho biết giờ giấc, bảng giá, ảnh tiệm',
          'Giữ số điện thoại / trang FB–IG như hiện tại',
          'Tập trung làm nail',
        ]}
        weDo={[
          'Cài đặt và quản lý AI nghe điện thoại & đặt lịch',
          'Cài đặt và quản lý hệ thống xin & trả lời review Google',
          'Cài đặt và quản lý AI trả lời tin nhắn & đặt lịch trên Facebook, Instagram',
          'Thiết kế, tối ưu và viết bài cho website chuẩn SEO & Google Maps',
          'Theo dõi, cập nhật và gửi báo cáo',
        ]}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <Image
              src="/hero/upmysalon.jpg"
              alt="Không gian tiệm nail hiện đại — UpMySalon hỗ trợ chủ tiệm người Việt tại Mỹ"
              width={1400}
              height={900}
              className="h-full min-h-[360px] w-full rounded-[2rem] object-cover shadow-soft"
            />
            <div>
              <SectionTitle
                eyebrow="Vì sao chọn UpMySalon"
                title="Anh/chị làm nail, phần tìm khách để UpMySalon lo."
                center={false}
              />
              <div className="mt-8 space-y-5">
                {reasons.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush/25 text-roseNude">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="mt-1 leading-7 text-black/62">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Bảng giá đơn giản"
            title="Chọn phần tiệm đang cần nhất"
            description="Gói linh hoạt theo nhu cầu tiệm. Chất lượng Mỹ, giá Việt Nam."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HOME_PRICING_TEASERS.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-[2rem] border p-7 ${
                  plan.highlighted || index === 2 ? 'border-roseNude bg-roseSoft shadow-soft' : 'border-black/8 bg-cream'
                }`}
              >
                {(plan.highlighted || index === 2) && (
                  <span className="absolute right-5 top-5 rounded-full bg-roseNude px-3 py-1 text-xs font-semibold text-ink">
                    Đủ nhất
                  </span>
                )}
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-4 text-2xl font-semibold text-roseNude">{plan.price}</p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 leading-7">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-roseNude" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/lien-he"
                  className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-roseNude px-5 py-3 font-semibold text-roseNude transition hover:bg-roseNude hover:text-white"
                >
                  Nhận kiểm tra Google + review miễn phí
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-semibold">{PRICING_NOTE}</p>
          <div className="mt-6 text-center">
            <Link href="/bang-gia" className="text-sm font-semibold text-roseNude hover:underline">
              Xem trang bảng giá →
            </Link>
          </div>
        </div>
      </section>

      <FaqAccordion
        eyebrow="Câu hỏi thường gặp"
        heading="Anh/chị có thể hỏi UpMySalon bằng tiếng Việt"
        items={faqs}
      />

      <section className="bg-ink py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">Miễn phí 15 phút</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            Để UpMySalon check giúp tiệm anh/chị miễn phí
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            UpMySalon xem Google, review và cách khách đang tìm thấy tiệm. Sau đó nói thẳng tiệm đang thiếu gì — không ép mua.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <a
              href={CONTACT.messenger}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              <MessagesSquare className="h-5 w-5" />
              Nhắn Messenger
            </a>
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Nhắn Zalo
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5" />
              Gọi ngay: {CONTACT.phone}
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-5 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              <Camera className="h-5 w-5" />
              Instagram
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Phản hồi bằng tiếng Việt
            </span>
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Kiểm tra rõ ràng, dễ hiểu
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              Phục vụ tiệm nail tại Mỹ
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
