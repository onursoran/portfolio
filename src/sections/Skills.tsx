import { Link } from 'react-router-dom';
import { skillGroups } from '../data/content';
import { getProject } from '../data/projects';
import { Reveal, SectionHeading } from '../components/ui/Primitives';

export function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="04"
            label="Technical Skills"
            title="Tools and methods"
            id="skills-title"
            intro="Skills I have applied in project work, linked to where they were used."
          />
        </Reveal>
        <div className="skills">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 60} className="skills__group">
              <h3 className="skills__title mono">{group.title}</h3>
              <ul className="skills__list">
                {group.skills.map((skill) => {
                  const project = skill.appliedIn ? getProject(skill.appliedIn) : undefined;
                  return (
                    <li key={skill.name} className="skills__item">
                      <span>{skill.name}</span>
                      {project && (
                        <Link to={`/projects/${project.slug}`} className="skills__applied mono" title={`Applied in ${project.title}`}>
                          <span className="sr-only">Applied in </span>
                          {project.index}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
