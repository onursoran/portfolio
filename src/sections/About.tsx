import { about } from '../data/content';
import { SectionHeading } from '../components/ui/Primitives';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <SectionHeading emoji="🙋" title="A bit about me" id="about-title" />
        <div className="about__text">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <ul className="pill-list" aria-label="Quick facts">
          {about.facts.map((f) => (
            <li key={f.text} className="pill">
              <span aria-hidden="true">{f.emoji}</span> {f.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
