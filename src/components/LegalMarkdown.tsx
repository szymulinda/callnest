import { type ReactNode } from 'react';
import { AppLink } from '../router';
import './LegalMarkdown.css';

function parseInline(text: string, keyPrefix = ''): ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}${key++}`}>{parseInline(token.slice(2, -2), `${keyPrefix}${key}-`)}</strong>,
      );
    } else if (token.startsWith('*')) {
      nodes.push(
        <em key={`${keyPrefix}${key++}`}>{parseInline(token.slice(1, -1), `${keyPrefix}${key}-`)}</em>,
      );
    } else if (token.startsWith('[')) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        const href = linkMatch[2];
        const label = linkMatch[1];
        if (href.startsWith('/')) {
          nodes.push(
            <AppLink key={`${keyPrefix}${key++}`} to={href} className="legal-md__link">
              {label}
            </AppLink>,
          );
        } else {
          nodes.push(
            <a key={`${keyPrefix}${key++}`} href={href} className="legal-md__link">
              {label}
            </a>,
          );
        }
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

type Block =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'hr' }
  | { type: 'blockquote'; text: string };

function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === '---') {
      blocks.push({ type: 'hr' });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.slice(2).trim() });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3).trim() });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      blocks.push({ type: 'blockquote', text: trimmed.slice(2).trim() });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2).trim());
        index += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        current === '---' ||
        current.startsWith('# ') ||
        current.startsWith('## ') ||
        current.startsWith('> ') ||
        current.startsWith('- ')
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }

    blocks.push({ type: 'p', text: paragraphLines.join(' ') });
  }

  return blocks;
}

interface LegalMarkdownProps {
  source: string;
}

export default function LegalMarkdown({ source }: LegalMarkdownProps) {
  const blocks = parseMarkdown(source);

  return (
    <article className="legal-md">
      {blocks.map((block, blockIndex) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1 key={blockIndex} className="legal-md__h1">
                {parseInline(block.text)}
              </h1>
            );
          case 'h2':
            return (
              <h2 key={blockIndex} className="legal-md__h2">
                {parseInline(block.text)}
              </h2>
            );
          case 'p':
            return (
              <p key={blockIndex} className="legal-md__p">
                {parseInline(block.text)}
              </p>
            );
          case 'ul':
            return (
              <ul key={blockIndex} className="legal-md__ul">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{parseInline(item)}</li>
                ))}
              </ul>
            );
          case 'hr':
            return <hr key={blockIndex} className="legal-md__hr" />;
          case 'blockquote':
            return (
              <blockquote key={blockIndex} className="legal-md__note">
                {parseInline(block.text)}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
