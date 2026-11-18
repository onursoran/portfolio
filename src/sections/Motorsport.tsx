import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motorsport } from '../data/content';
import { SectionHeading } from '../components/ui/Primitives';

export function Motorsport() {
  return (
    <section id="motorsport" className="section" aria-labelledby="motorsport-title">
      <div className="container">
        <SectionHeading emoji="🏁" title="Racing" id="motorsport-title" />

        <div className="experience">
          {motorsport.map((entry, i) => (
            <article key={entry.organization} className="experience__item" aria-labelledby={`exp-${i}`}>
              <h3 id={`exp-${i}`} className="experience__org">
                {entry.organization}
              </h3>
              <p className="experience__role">{entry.role}</p>
              <p className="experience__desc">{entry.description}</p>
              <ul className="prose-list">
                {entry.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {entry.competitions && (
                <ul className="pill-list" aria-label="Championships">
                  {entry.competitions.map((c) => (
                    <li key={c} className="pill pill--small">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              {entry.projectSlug && (
                <Link to={`/projects/${entry.projectSlug}`} className="text-link">
                  More about this <ArrowRight size={15} aria-hidden="true" />
                  <span className="sr-only">: {entry.organization}</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
