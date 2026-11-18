import { ArrowUp, Mail } from 'lucide-react';
import { site } from '../../data/site';
import { isSet } from '../../lib/asset';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: 'Email', href: isSet(site.links.email) ? `mailto:${site.links.email}` : '', icon: <Mail size={16} aria-hidden="true" /> },
    { label: 'LinkedIn', href: site.links.linkedin, icon: <LinkedInIcon size={15} /> },
    { label: 'GitHub', href: site.links.github, icon: <GitHubIcon size={15} /> },
  ].filter((l) => isSet(l.href));

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">{site.name}</p>
          <p className="site-footer__meta">
            Made by me in {site.location} ✌️
          </p>
        </div>
        {links.length > 0 && (
          <ul className="site-footer__links" aria-label="Profiles">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="icon-btn"
                  aria-label={l.label}
                  {...(l.label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="site-footer__end">
          <p className="site-footer__meta">© {year} {site.name}</p>
          <a href="#top" className="site-footer__top">
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
