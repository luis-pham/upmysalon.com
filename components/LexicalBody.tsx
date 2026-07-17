import type { ReactNode } from 'react';
import type { LexicalNode } from '@/lib/legal';

function isBold(format: number | string | undefined) {
  if (typeof format === 'number') return (format & 1) === 1;
  return false;
}

function renderChildren(nodes: LexicalNode[] | undefined, keyPrefix: string): ReactNode[] {
  if (!nodes?.length) return [];
  return nodes.map((node, index) => renderNode(node, `${keyPrefix}-${index}`));
}

function renderNode(node: LexicalNode, key: string): ReactNode {
  switch (node.type) {
    case 'text': {
      const text = node.text ?? '';
      if (isBold(node.format)) {
        return (
          <strong key={key} className="font-semibold text-ink">
            {text}
          </strong>
        );
      }
      return <span key={key}>{text}</span>;
    }
    case 'link': {
      const href = node.fields?.url || node.url || '#';
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-roseNude underline-offset-2 hover:underline"
        >
          {renderChildren(node.children, key)}
        </a>
      );
    }
    case 'paragraph':
      return (
        <p key={key} className="my-4 text-base leading-8 text-black/70 first:mt-0">
          {renderChildren(node.children, key)}
        </p>
      );
    case 'heading': {
      const Tag = (node.tag === 'h1' || node.tag === 'h3' ? node.tag : 'h2') as 'h1' | 'h2' | 'h3';
      const className =
        Tag === 'h1'
          ? 'mt-10 text-2xl font-semibold text-ink first:mt-0'
          : Tag === 'h3'
            ? 'mt-8 text-lg font-semibold text-ink'
            : 'mt-10 text-xl font-semibold text-ink';
      return (
        <Tag key={key} className={className}>
          {renderChildren(node.children, key)}
        </Tag>
      );
    }
    case 'list': {
      const ordered = node.listType === 'number' || node.tag === 'ol';
      const ListTag = ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={key}
          className={`my-4 space-y-2 pl-6 text-base leading-8 text-black/70 ${
            ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {renderChildren(node.children, key)}
        </ListTag>
      );
    }
    case 'listitem':
      return (
        <li key={key} className="pl-1">
          {node.children?.map((child, i) => {
            if (child.type === 'paragraph') {
              return (
                <span key={`${key}-p-${i}`} className="leading-8">
                  {renderChildren(child.children, `${key}-p-${i}`)}
                </span>
              );
            }
            return renderNode(child, `${key}-c-${i}`);
          })}
        </li>
      );
    case 'linebreak':
      return <br key={key} />;
    default:
      if (node.children?.length) {
        return <div key={key}>{renderChildren(node.children, key)}</div>;
      }
      return null;
  }
}

export function LexicalBody({ data }: { data: { root: LexicalNode } }) {
  const children = data?.root?.children ?? [];
  return <div className="legal-prose">{renderChildren(children, 'n')}</div>;
}
