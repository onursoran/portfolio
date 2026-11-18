import { about } from '../data/content';
import { Reveal, SectionHeading } from '../components/ui/Primitives';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <SectionHeading index="01" label="About" title="From the race track to engineering" id="about-title" />
        </Reveal>
        <div className="about">
          <Reveal className="about__text">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <dl className="facts about__facts">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="about__path" delay={100}>
            <p className="mono muted about__path-title">Path</p>
            <ol className="path">
              {about.path.map((p, i) => (
                <li key={p.step} className="path__item">
                  <span className="path__index mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="path__step">{p.step}</span>
                  <span className="path__text">{p.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
