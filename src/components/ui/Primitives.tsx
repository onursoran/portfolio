import type { ReactNode } from 'react';
import type { ProjectStatus } from '../../data/types';
import { useRevealOnScroll } from '../../lib/hooks';

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status status--${status.tone}`}>
      <span className="status__dot" aria-hidden="true" />
      <span className="sr-only">Status: </span>
      {status.label}
    </span>
  );
}

export function TagList({ tags, label = 'Technologies and topics' }: { tags: string[]; label?: string }) {
  return (
    <ul className="tags" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  id?: string;
  intro?: ReactNode;
}

export function SectionHeading({ index, label, title, id, intro }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-heading__label mono">
        <span className="accent">{index}</span>
        <span aria-hidden="true"> / </span>
        {label}
      </p>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
  );
}

/** Fades content in once when it scrolls into view. Disabled under reduced motion. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function StatRow({ items, size = 'md' }: { items: { value: string; label: string }[]; size?: 'md' | 'lg' }) {
  return (
    <dl className={`stats stats--${size}`}>
      {items.map((s) => (
        <div key={s.label} className="stats__item">
          <dt className="stats__label">{s.label}</dt>
          <dd className="stats__value">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
