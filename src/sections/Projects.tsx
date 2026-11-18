import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/types';
import { isSet } from '../lib/asset';
import { GitHubIcon } from '../components/ui/BrandIcons';
import { Reveal, SectionHeading, StatusBadge, TagList } from '../components/ui/Primitives';
import { ProjectCover } from '../components/visuals/ProjectVisual';

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  const titleId = `card-${project.slug}`;

  return (
    <article className="project-card" aria-labelledby={titleId}>
      <Link to={href} className="project-card__media" tabIndex={-1} aria-hidden="true">
        <ProjectCover cover={project.cover} />
      </Link>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="mono accent">{project.index}</span>
          <span className="mono muted">{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 id={titleId} className="project-card__title">
          <Link to={href}>
            {project.organization && <span className="project-card__org">{project.organization} — </span>}
            {project.title}
          </Link>
        </h3>
        <p className="project-card__summary">{project.summary}</p>
        <dl className="project-card__contribution">
          <div>
            <dt className="mono">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="mono">Contribution</dt>
            <dd>{project.contributionSummary}</dd>
          </div>
        </dl>
        <TagList tags={project.tags} />
        <div className="project-card__links">
          <Link to={href} className="text-link">
            View project <ArrowRight size={15} aria-hidden="true" />
            <span className="sr-only">: {project.title}</span>
          </Link>
          {isSet(project.repoUrl) && (
            <a href={project.repoUrl} className="text-link text-link--muted" target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={14} /> Repository<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section section--alt" aria-labelledby="projects-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="02"
            label="Engineering Projects"
            title="Selected work"
            id="projects-title"
            intro="Mechanical design research, computational modeling and motorsport operations. Each project links to a case study documenting the problem, approach and current status."
          />
        </Reveal>
        <div className="project-list">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
