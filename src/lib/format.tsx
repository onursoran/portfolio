import { Fragment, type ReactNode } from 'react';

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*)/g;

/** Renders `inline code` and **bold** inside plain content strings. */
export function renderInline(text: string): ReactNode {
  return text.split(INLINE).map((part, i) => {
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const SCRIPT = /([_^])\{([^}]*)\}/g;

/** Renders _{sub} and ^{sup} markup in equation strings. */
export function renderMath(expression: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(SCRIPT.source, 'g');
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(expression)) !== null) {
    if (match.index > last) out.push(expression.slice(last, match.index));
    out.push(match[1] === '_' ? <sub key={match.index}>{match[2]}</sub> : <sup key={match.index}>{match[2]}</sup>);
    last = re.lastIndex;
  }
  if (last < expression.length) out.push(expression.slice(last));
  return out;
}

/** Plain-text version of an equation for screen readers. */
export function plainMath(expression: string): string {
  return expression.replace(SCRIPT, (_m, kind: string, body: string) => (kind === '_' ? body : `^${body}`));
}
