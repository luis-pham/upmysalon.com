import type { ReactNode } from 'react';
import Link from 'next/link';

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const className =
          'font-semibold text-roseNude underline-offset-2 transition hover:underline';
        if (href.startsWith('/')) {
          nodes.push(
            <Link key={key++} href={href} className={className}>
              {label}
            </Link>,
          );
        } else {
          nodes.push(
            <a key={key++} href={href} target="_blank" rel="noreferrer" className={className}>
              {label}
            </a>,
          );
        }
      }
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * Lightweight markdown for blog seed: ## headings, paragraphs, - / 1. lists,
 * ---, **bold**, *italic*, [links](/path).
 */
export function BlogMarkdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').trim().split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.trim() === '---') {
      blocks.push(<hr key={key++} className="my-10 border-black/10" />);
      i += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={key++} className="mt-10 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          {renderInline(line.slice(3).trim())}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.trimStart().startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith('- ')) {
        items.push(lines[i].trimStart().slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={key++} className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-black/68">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line.trimStart())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        items.push(lines[i].trimStart().replace(/^\d+\.\s/, ''));
        i += 1;
      }
      blocks.push(
        <ol key={key++} className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-8 text-black/68">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('## ') &&
      !lines[i].trimStart().startsWith('- ') &&
      !/^\d+\.\s/.test(lines[i].trimStart()) &&
      lines[i].trim() !== '---'
    ) {
      para.push(lines[i]);
      i += 1;
    }

    const text = para.join(' ').trim();
    const isSource = text.startsWith('*Nguồn');
    blocks.push(
      <p
        key={key++}
        className={
          isSource
            ? 'mt-8 text-sm leading-7 text-black/45'
            : 'mt-5 text-lg leading-8 text-black/68 first:mt-0'
        }
      >
        {renderInline(text)}
      </p>,
    );
  }

  return <div className="blog-body">{blocks}</div>;
}
