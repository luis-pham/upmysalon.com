/**
 * Converts docs/legal/*.md → content/legalPages.seed.json (Lexical JSON).
 * Run: node scripts/seed-legal-pages.mjs
 * When Payload + DB are live, extend this script to upsert into legalPages collection.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const legalDir = path.join(root, 'docs', 'legal');
const outFile = path.join(root, 'content', 'legalPages.seed.json');

const PAGES = [
  {
    slug: 'privacy',
    title: 'Chính sách Bảo mật',
    titleEn: 'Privacy Policy',
    viFile: 'privacy-vi.md',
    enFile: 'privacy.md',
    seoVi: {
      title: 'Chính sách Bảo mật',
      description:
        'Cách UpMySalon thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân khi anh/chị dùng website và dịch vụ.',
    },
    seoEn: {
      title: 'Privacy Policy',
      description:
        'How UpMySalon collects, uses, stores, and protects personal data when you use our website and managed services.',
    },
  },
  {
    slug: 'terms',
    title: 'Điều khoản Dịch vụ',
    titleEn: 'Terms of Service',
    viFile: 'terms-vi.md',
    enFile: 'terms.md',
    seoVi: {
      title: 'Điều khoản Dịch vụ',
      description: 'Điều khoản điều chỉnh việc sử dụng website và dịch vụ quản lý số của UpMySalon.',
    },
    seoEn: {
      title: 'Terms of Service',
      description: 'Terms governing your use of the UpMySalon website and managed digital services.',
    },
  },
  {
    slug: 'sms-consent',
    title: 'Đồng ý nhận SMS',
    titleEn: 'SMS Consent',
    viFile: 'sms-consent-vi.md',
    enFile: 'sms-consent.md',
    seoVi: {
      title: 'Đồng ý nhận SMS',
      description: 'Cách UpMySalon xử lý đăng ký nhận SMS cho thông báo review và lịch hẹn thay mặt tiệm.',
    },
    seoEn: {
      title: 'SMS Consent',
      description: 'How UpMySalon handles SMS opt-in for review and appointment messages on behalf of salons.',
    },
  },
  {
    slug: 'refund',
    title: 'Chính sách Hoàn tiền',
    titleEn: 'Refund Policy',
    viFile: 'refund-vi.md',
    enFile: 'refund.md',
    seoVi: {
      title: 'Chính sách Hoàn tiền',
      description: 'Khi nào và cách UpMySalon hoàn tiền cho gói trả phí, phí cài đặt và tiện ích thêm.',
    },
    seoEn: {
      title: 'Refund Policy',
      description: 'When and how UpMySalon refunds paid plans, setup fees, and add-ons.',
    },
  },
];

function textNode(text, bold = false) {
  const node = {
    type: 'text',
    detail: 0,
    format: bold ? 1 : 0,
    mode: 'normal',
    style: '',
    text,
    version: 1,
  };
  return node;
}

function parseInline(text) {
  const children = [];
  const re = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[^*]+|\*)/g;
  let m;
  const src = text;
  let last = 0;
  const boldRe = /\*\*([^*]+)\*\*/g;
  let cursor = 0;
  while (cursor < src.length) {
    boldRe.lastIndex = cursor;
    const bold = boldRe.exec(src);
    if (!bold) {
      const rest = src.slice(cursor);
      if (rest) children.push(...linkifyPlain(rest));
      break;
    }
    if (bold.index > cursor) {
      children.push(...linkifyPlain(src.slice(cursor, bold.index)));
    }
    children.push(textNode(bold[1], true));
    cursor = bold.index + bold[0].length;
  }
  return children.length ? children : [textNode('')];
}

function linkifyPlain(text) {
  const parts = [];
  const re = /(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(textNode(text.slice(last, m.index)));
    parts.push({
      type: 'link',
      fields: { linkType: 'custom', newTab: true, url: m[1] },
      format: '',
      indent: 0,
      version: 3,
      direction: 'ltr',
      children: [textNode(m[1])],
    });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(textNode(text.slice(last)));
  return parts.length ? parts : [textNode(text)];
}

function paragraph(text) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children: parseInline(text),
    direction: 'ltr',
    textStyle: '',
    textFormat: 0,
  };
}

function heading(text, tag = 'h2') {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    children: parseInline(text),
    direction: 'ltr',
  };
}

function list(items, listType = 'bullet') {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'number' ? 'ol' : 'ul',
    format: '',
    indent: 0,
    version: 1,
    children: items.map((item, i) => ({
      type: 'listitem',
      value: i + 1,
      format: '',
      indent: 0,
      version: 1,
      children: [paragraph(item)],
      direction: 'ltr',
    })),
    direction: 'ltr',
  };
}

function markdownToLexical(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const children = [];
  let i = 0;
  let skipFirstH1 = true;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      const title = trimmed.slice(2).trim();
      if (skipFirstH1) {
        skipFirstH1 = false;
        i += 1;
        continue;
      }
      children.push(heading(title, 'h1'));
      i += 1;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      children.push(heading(trimmed.slice(3).trim(), 'h2'));
      i += 1;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      children.push(heading(trimmed.slice(4).trim(), 'h3'));
      i += 1;
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i += 1;
      }
      children.push(list(items, 'bullet'));
      continue;
    }

    const paraLines = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || next.startsWith('#') || /^[-*]\s+/.test(next)) break;
      paraLines.push(next);
      i += 1;
    }
    children.push(paragraph(paraLines.join(' ')));
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
      direction: 'ltr',
    },
  };
}

function readMd(name) {
  return fs.readFileSync(path.join(legalDir, name), 'utf8');
}

const seed = PAGES.map((page) => ({
  slug: page.slug,
  title: page.title,
  titleEn: page.titleEn,
  lastUpdated: null,
  bodyVi: markdownToLexical(readMd(page.viFile)),
  bodyEn: markdownToLexical(readMd(page.enFile)),
  seoVi: page.seoVi,
  seoEn: page.seoEn,
}));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(seed, null, 2));
console.log(`Wrote ${seed.length} legal pages → ${path.relative(root, outFile)}`);
