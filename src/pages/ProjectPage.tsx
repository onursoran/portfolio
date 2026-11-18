import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import type { Project } from '../data/types';
import { site } from '../data/site';
import { isSet } from '../lib/asset';
import { useActiveSection, usePageMeta } from '../lib/hooks';
import { BlockRenderer } from '../components/case-study/BlockRenderer';
import { Button } from '../components/ui/Button';
import { GitHubIcon } from '../components/ui/BrandIcons';
import { StatusBadge, TagList } from '../components/ui/Primitives';
import { ProjectCover } from '../components/visuals/ProjectVisual';
import NotFoundPage from './NotFoundPage';

function TableOfContents({ project }: { project: Project }) {
  const ids = project.sections.map((s) => s.id);
  const active = useActiveSection(['contributions', ...ids]);
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">On this page</p>
      <ol>
        <li>
          <a href="#contributions" className={active === 'contributions' ? 'is-active' : ''}>
            What I did
          </a>
        </li>
        {project.sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'location' : undefined}>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ProjectPager({ project }: { project: Project }) {
  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  if (projects.length < 2) return null;
  return (
    <nav className="pager container" aria-label="More projects">
      <Link to={`/projects/${prev.slug}`} className="pager__link">
        <span className="muted">
          <ArrowLeft size={13} aria-hidden="true" /> Previous
        </span>
        <span className="pager__title">{prev.title}</span>
      </Link>
      <Link to={`/projects/${next.slug}`} className="pager__link pager__link--next">
        <span className="muted">
          Next <ArrowRight size={13} aria-hidden="true" />
        </span>
        <span className="pager__title">{next.title}</span>
      </Link>
    </nav>
  );
}

function CaseStudy({ project }: { project: Project }) {
  usePageMeta(`${project.title} — ${site.name}`, project.summary);

  const facts = [
    { label: 'Role', value: project.role },
    project.context ? { label: 'Context', value: project.context } : null,
    project.timeline ? { label: 'Timeline', value: project.timeline } : null,
    { label: 'Status', value: project.status.note ? `${project.status.label} — ${project.status.note}` : project.status.label },
  ].filter((f): f is { label: string; value: string } => f !== null);

  return (
    <article className="case">
      <header className="case-hero">
        <div className="container">
          <Link to={{ pathname: '/', hash: '#projects' }} className="text-link text-link--muted case-hero__back">
            <ArrowLeft size={15} aria-hidden="true" /> All projects
          </Link>
          <div className="case-hero__grid">
            <div>
              <StatusBadge status={project.status} />
              {project.organization && <p className="case-hero__org">{project.organization}</p>}
              <h1 className="case-hero__title">{project.title}</h1>
              <p className="case-hero__summary">{project.summary}</p>
              <TagList tags={project.tags} />
              {isSet(project.repoUrl) && (
                <div className="case-hero__actions">
                  <Button href={project.repoUrl} external icon={<GitHubIcon size={15} />}>
                    View repository
                  </Button>
                </div>
              )}
            </div>
            <div className="case-hero__cover">
              <ProjectCover cover={project.cover} priority />
            </div>
          </div>
          <dl className="case-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container case-body">
        <aside className="case-body__aside">
          <TableOfContents project={project} />
        </aside>
        <div className="case-body__content">
          <section id="contributions" className="case-section contributions" aria-labelledby="contributions-title">
            <h2 id="contributions-title" className="case-section__title">
              What I did
            </h2>
            <ul className="prose-list prose-list--check">
              {project.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          {project.sections.map((section) => (
            <section key={section.id} id={section.id} className="case-section" aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`} className="case-section__title">
                {section.title}
              </h2>
              <div className="case-section__blocks">
                {section.blocks.map((block, b) => (
                  <BlockRenderer key={b} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <ProjectPager project={project} />
    </article>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;
  return <CaseStudy key={project.slug} project={project} />;
}
