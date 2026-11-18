import type { ReactNode } from 'react';
import type { ProjectStatus } from '../../data/types';

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
  title: string;
  /** Small emoji shown before the title. */
  emoji?: string;
  id?: string;
  intro?: ReactNode;
}

export function SectionHeading({ title, emoji, id, intro }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2 id={id} className="section-heading__title">
        {emoji && (
          <span className="section-heading__emoji" aria-hidden="true">
            {emoji}
          </span>
        )}
        {title}
      </h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
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
