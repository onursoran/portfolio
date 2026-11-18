import { ArrowRight, Mail } from 'lucide-react';
import { hero } from '../data/content';
import { site } from '../data/site';
import { Button } from '../components/ui/Button';
import { GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons';
import { FrictionCircleSchematic } from '../components/visuals/FrictionCircleSchematic';

export function Hero() {
  const roles = site.role.split('|').map((r) => r.trim());

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow mono">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            {site.name}
          </h1>
          <p className="hero__roles">
            <span className="sr-only">{site.role}</span>
            {roles.map((r) => (
              <span key={r} className="hero__role" aria-hidden="true">
                {r}
              </span>
            ))}
          </p>
          <p className="hero__intro">{hero.intro}</p>
          <div className="hero__actions">
            <Button to={{ pathname: '/', hash: '#projects' }} variant="primary" iconRight={<ArrowRight size={16} aria-hidden="true" />}>
              Explore Projects
            </Button>
            <Button to={{ pathname: '/', hash: '#contact' }} icon={<Mail size={16} aria-hidden="true" />}>
              Get in Touch
            </Button>
            <Button href={site.links.github} external variant="ghost" icon={<GitHubIcon size={15} />} unavailableLabel="GitHub profile not yet configured">
              GitHub
            </Button>
            <Button href={site.links.linkedin} external variant="ghost" icon={<LinkedInIcon size={15} />} unavailableLabel="LinkedIn profile not yet configured">
              LinkedIn
            </Button>
          </div>
        </div>

        <figure className="hero__visual">
          <FrictionCircleSchematic variant="hero" />
          <figcaption className="hero__caption mono">
            The friction circle — the combined tire-force limit at the centre of my simulator and brake-bias work.
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <dl className="hero__meta">
          {hero.meta.map((m) => (
            <div key={m.label}>
              <dt className="mono">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
