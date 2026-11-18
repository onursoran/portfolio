import { ArrowRight, Mail } from 'lucide-react';
import { hero } from '../data/content';
import { site } from '../data/site';
import { asset, isSet } from '../lib/asset';
import { Button } from '../components/ui/Button';
import { GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons';

/** My own photo if one is set in site.ts; otherwise the #301 karting photo. */
const KARTING_PHOTO = 'images/soran-racing/karting-04-900.jpg';

export function Hero() {
  const hasPortrait = isSet(site.photo);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            {hero.greeting} <span className="wave" aria-hidden="true">👋</span>
          </h1>
          <p className="hero__subtitle">{hero.subtitle}</p>
          <p className="hero__intro">{hero.intro}</p>
          <div className="hero__actions">
            <Button to={{ pathname: '/', hash: '#projects' }} variant="primary" iconRight={<ArrowRight size={16} aria-hidden="true" />}>
              See my projects
            </Button>
            <Button to={{ pathname: '/', hash: '#contact' }} icon={<Mail size={16} aria-hidden="true" />}>
              Say hi
            </Button>
            <Button href={site.links.github} external variant="ghost" icon={<GitHubIcon size={15} />} unavailableLabel="GitHub profile not yet configured">
              GitHub
            </Button>
            <Button href={site.links.linkedin} external variant="ghost" icon={<LinkedInIcon size={15} />} unavailableLabel="LinkedIn profile not yet configured">
              LinkedIn
            </Button>
          </div>
        </div>

        <figure className={`hero__photo ${hasPortrait ? 'hero__photo--portrait' : ''}`}>
          <img
            src={asset(hasPortrait ? site.photo : KARTING_PHOTO)}
            alt={hasPortrait ? `Photo of ${site.name}` : `${site.name} racing kart number 301`}
            width={hasPortrait ? 400 : 900}
            height={hasPortrait ? 400 : 600}
          />
          {!hasPortrait && <figcaption className="hero__note">{hero.photoNote}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
