import { ArrowLeft, ArrowRight } from 'lucide-react';
import { site } from '../data/site';
import { usePageMeta } from '../lib/hooks';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  usePageMeta(`Page not found — ${site.name}`, 'The page you were looking for does not exist.');

  return (
    <section className="not-found container" aria-labelledby="nf-title">
      <svg viewBox="0 0 200 200" className="not-found__visual" aria-hidden="true">
        <circle cx="100" cy="100" r="70" className="fc-ring fc-ring--limit" />
        <circle cx="100" cy="100" r="35" className="fc-ring" />
        <line x1="10" y1="100" x2="190" y2="100" className="fc-axis" />
        <line x1="100" y1="10" x2="100" y2="190" className="fc-axis" />
        <line x1="100" y1="100" x2="149.5" y2="50.5" className="fc-vector" />
        <line x1="149.5" y1="50.5" x2="172" y2="28" className="demo__excess" />
        <circle cx="172" cy="28" r="5" className="demo__point demo__point--over" />
      </svg>
      <p className="mono accent">Error 404 · Off the racing line</p>
      <h1 id="nf-title" className="not-found__title">
        Page not found
      </h1>
      <p className="muted not-found__text">
        This page doesn’t exist — demand exceeded the available grip. The link may be outdated or mistyped.
      </p>
      <div className="hero__actions">
        <Button to="/" variant="primary" icon={<ArrowLeft size={16} aria-hidden="true" />}>
          Back to home
        </Button>
        <Button to={{ pathname: '/', hash: '#projects' }} iconRight={<ArrowRight size={16} aria-hidden="true" />}>
          View projects
        </Button>
      </div>
    </section>
  );
}
