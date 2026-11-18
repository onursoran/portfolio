import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ArrowUpRight, Check, Circle, CircleDot, Copy, ImageIcon, Info } from 'lucide-react';
import type { Block, Milestone } from '../../data/types';
import { getProject } from '../../data/projects';
import { isSet } from '../../lib/asset';
import { plainMath, renderInline, renderMath } from '../../lib/format';
import { Figure } from '../media/Figure';
import { Gallery } from '../media/Gallery';
import { FrictionCircleDemo } from '../demo/FrictionCircleDemo';
import { ProjectVisual } from '../visuals/ProjectVisual';
import { StatRow } from '../ui/Primitives';

const MILESTONE_LABEL: Record<Milestone['state'], string> = {
  complete: 'Complete',
  'in-progress': 'In progress',
  planned: 'Planned',
};

function MilestoneIcon({ state }: { state: Milestone['state'] }) {
  if (state === 'complete') return <Check size={14} aria-hidden="true" />;
  if (state === 'in-progress') return <CircleDot size={14} aria-hidden="true" />;
  return <Circle size={14} aria-hidden="true" />;
}

function CodeBlock({ code, language, caption, illustrative }: { code: string; language: string; caption?: string; illustrative?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <figure className="code-block">
      <div className="code-block__bar">
        <span className="mono">{language}</span>
        {illustrative && <span className="badge badge--placeholder">Illustrative</span>}
        <button type="button" className="code-block__copy" onClick={copy}>
          <Copy size={13} aria-hidden="true" />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="prose-p">{renderInline(block.text)}</p>;

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className="prose-list">
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    }

    case 'equation':
      return (
        <figure className="equation">
          <div className="equation__row">
            <div className="equation__expr" role="math" aria-label={plainMath(block.expression)}>
              {renderMath(block.expression)}
            </div>
            {block.label && <span className="equation__label mono">{block.label}</span>}
          </div>
          {block.caption && <figcaption className="figure__caption">{block.caption}</figcaption>}
        </figure>
      );

    case 'table':
      return (
        <figure className="table-figure">
          {block.placeholder && (
            <span className="badge badge--placeholder">
              <ImageIcon size={12} aria-hidden="true" /> Placeholder — data pending
            </span>
          )}
          <div className="table-scroll" tabIndex={0} role="region" aria-label={block.caption ?? 'Data table'}>
            <table className="data-table">
              {block.caption && <caption>{block.caption}</caption>}
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );

    case 'figure':
      return <Figure media={block.media} />;

    case 'gallery':
      return <Gallery items={block.items} title={block.title} />;

    case 'code':
      return <CodeBlock {...block} />;

    case 'callout': {
      const Icon = block.tone === 'caution' ? AlertTriangle : block.tone === 'placeholder' ? ImageIcon : Info;
      return (
        <aside className={`callout callout--${block.tone}`}>
          <Icon size={16} aria-hidden="true" className="callout__icon" />
          <div>
            {block.title && <p className="callout__title">{block.title}</p>}
            <p>{renderInline(block.text)}</p>
          </div>
        </aside>
      );
    }

    case 'milestones':
      return (
        <ol className="milestones">
          {block.items.map((m) => (
            <li key={m.label} className={`milestone milestone--${m.state}`}>
              <span className="milestone__icon">
                <MilestoneIcon state={m.state} />
              </span>
              <span className="milestone__label">{m.label}</span>
              <span className="milestone__state mono">{m.date ? `${m.date} · ` : ''}{MILESTONE_LABEL[m.state]}</span>
              {m.note && <span className="milestone__note">{m.note}</span>}
            </li>
          ))}
        </ol>
      );

    case 'links':
      return (
        <ul className="link-list">
          {block.items.map((l) => (
            <li key={l.label}>
              {isSet(l.href) ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-list__item">
                  <span>
                    <span className="link-list__label">{l.label}</span>
                    {l.description && <span className="link-list__desc">{l.description}</span>}
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <div className="link-list__item is-disabled">
                  <span>
                    <span className="link-list__label">{l.label}</span>
                    <span className="link-list__desc">{l.description ?? 'Link not yet available.'}</span>
                  </span>
                  <span className="badge badge--placeholder">Coming soon</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      );

    case 'stats':
      return <StatRow items={block.items} size="lg" />;

    case 'facts':
      return (
        <dl className="facts">
          {block.items.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      );

    case 'pipeline':
      return (
        <ol className="pipeline">
          {block.steps.map((s, i) => (
            <li key={s.title} className="pipeline__step">
              <span className="pipeline__index mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="pipeline__title">{s.title}</span>
              <span className="pipeline__desc">{s.description}</span>
            </li>
          ))}
        </ol>
      );

    case 'diagram':
      return (
        <figure className="diagram-figure">
          <div className="diagram-figure__frame">
            <ProjectVisual visual={block.visual} variant="inline" />
          </div>
          {block.caption && <figcaption className="figure__caption">{block.caption}</figcaption>}
        </figure>
      );

    case 'demo':
      return <FrictionCircleDemo />;

    case 'related': {
      const project = getProject(block.slug);
      if (!project) return null;
      return (
        <Link to={`/projects/${project.slug}`} className="related">
          <span className="related__meta mono">
            {project.index} · {project.category}
          </span>
          <span className="related__title">{project.title}</span>
          <span className="related__text">{block.text}</span>
          <ArrowRight size={16} aria-hidden="true" className="related__arrow" />
        </Link>
      );
    }
  }
}
