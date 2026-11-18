import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motorsport } from '../data/content';
import { Reveal, SectionHeading, StatRow } from '../components/ui/Primitives';

export function Motorsport() {
  return (
    <section id="motorsport" className="section" aria-labelledby="motorsport-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="03"
            label="Motorsport Experience"
            title="Racing, leadership and Formula SAE"
            id="motorsport-title"
          />
        </Reveal>

        <div className="experience">
          {motorsport.map((entry, i) => (
            <Reveal key={entry.organization} delay={i * 80}>
              <article className="experience__item" aria-labelledby={`exp-${i}`}>
                <header className="experience__header">
                  <p className="mono accent">{entry.role}</p>
                  <h3 id={`exp-${i}`} className="experience__org">
                    {entry.organization}
                  </h3>
                  <p className="mono muted experience__context">{entry.context}</p>
                </header>

                <div className="experience__body">
                  {entry.stats && <StatRow items={entry.stats} size="lg" />}
                  <p className="experience__desc">{entry.description}</p>
                  <ul className="prose-list">
                    {entry.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {entry.competitions && (
                    <div className="experience__competitions">
                      <p className="mono muted">Championships</p>
                      <ul className="tags" aria-label="Championships">
                        {entry.competitions.map((c) => (
                          <li key={c} className="tag tag--outline">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {entry.projectSlug && (
                    <Link to={`/projects/${entry.projectSlug}`} className="text-link">
                      Read the case study <ArrowRight size={15} aria-hidden="true" />
                      <span className="sr-only">: {entry.organization}</span>
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
