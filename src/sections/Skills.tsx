import { skillGroups } from '../data/content';
import { SectionHeading } from '../components/ui/Primitives';

export function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading emoji="🧰" title="Stuff I use" id="skills-title" intro="Only things I’ve actually used in my projects." />
        <div className="skills">
          {skillGroups.map((group) => (
            <div key={group.id} className="skills__group">
              <h3 className="skills__title">{group.title}</h3>
              <ul className="pill-list">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="pill pill--small">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
