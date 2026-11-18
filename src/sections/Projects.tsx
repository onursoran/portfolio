import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/types';
import { isSet } from '../lib/asset';
import { GitHubIcon } from '../components/ui/BrandIcons';
import { SectionHeading, StatusBadge, TagList } from '../components/ui/Primitives';
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
        <StatusBadge status={project.status} />
        <h3 id={titleId} className="project-card__title">
          <Link to={href}>{project.title}</Link>
        </h3>
        {project.organization && <p className="project-card__org">{project.organization}</p>}
        <p className="project-card__summary">{project.summary}</p>
        <TagList tags={project.tags.slice(0, 4)} />
        <div className="project-card__links">
          <Link to={href} className="text-link">
            Read more <ArrowRight size={15} aria-hidden="true" />
            <span className="sr-only">: {project.title}</span>
          </Link>
          {isSet(project.repoUrl) && (
            <a href={project.repoUrl} className="text-link text-link--muted" target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={14} /> Code<span className="sr-only"> on GitHub (opens in a new tab)</span>
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
        <SectionHeading
          emoji="🔧"
          title="Things I’ve worked on"
          id="projects-title"
          intro="Click any project for the full write-up: what I was trying to figure out, how I went about it, and where it’s at now."
        />
        <div className="project-list">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
