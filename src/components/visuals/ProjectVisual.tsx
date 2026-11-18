import type { Cover, VisualId } from '../../data/types';
import { Figure } from '../media/Figure';
import { BrakeBiasConcept } from './BrakeBiasConcept';
import { FrictionCircleSchematic } from './FrictionCircleSchematic';

function SoranRacingStats() {
  return (
    <div className="stat-visual" role="img" aria-label="Soran Racing: 5 drivers, over 15,000 dollars in sponsorship, 9 podium finishes.">
      <p className="stat-visual__name mono">SORAN RACING</p>
      <div className="stat-visual__grid" aria-hidden="true">
        <div>
          <span className="stat-visual__value">5</span>
          <span className="stat-visual__label">Drivers</span>
        </div>
        <div>
          <span className="stat-visual__value">$15K+</span>
          <span className="stat-visual__label">Sponsorship</span>
        </div>
        <div>
          <span className="stat-visual__value">9</span>
          <span className="stat-visual__label">Podiums</span>
        </div>
      </div>
      <div className="stat-visual__stripe" aria-hidden="true" />
    </div>
  );
}

/** Registry of code-drawn visuals referenced from data by id. */
export function ProjectVisual({ visual, variant = 'cover' }: { visual: VisualId; variant?: 'cover' | 'inline' }) {
  switch (visual) {
    case 'brake-bias-concept':
      return <BrakeBiasConcept className={variant === 'cover' ? 'diagram--cover' : ''} />;
    case 'friction-circle':
      return <FrictionCircleSchematic variant={variant === 'cover' ? 'cover' : 'hero'} />;
    case 'soran-racing-stats':
      return <SoranRacingStats />;
  }
}

export function ProjectCover({ cover, priority = false }: { cover: Cover; priority?: boolean }) {
  if (cover.kind === 'image') {
    return <Figure media={cover.media} showCaption={false} priority={priority} />;
  }
  return (
    <div className="cover-visual">
      <ProjectVisual visual={cover.visual} />
      <span className="cover-visual__label mono">{cover.label}</span>
    </div>
  );
}
