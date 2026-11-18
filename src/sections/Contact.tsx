import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { contact } from '../data/content';
import { site } from '../data/site';
import { isSet } from '../lib/asset';
import { GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons';
import { SectionHeading } from '../components/ui/Primitives';

interface ContactRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  display?: string;
  external?: boolean;
  copyable?: boolean;
}

function ContactRow({ icon, label, value, href, display, external, copyable }: ContactRowProps) {
  const [copied, setCopied] = useState(false);
  const configured = isSet(value);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <li className={`contact-row ${configured ? '' : 'is-disabled'}`}>
      <span className="contact-row__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact-row__label">{label}</span>
      {configured ? (
        <a href={href} className="contact-row__value" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {display ?? value}
          <ArrowUpRight size={15} aria-hidden="true" />
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ) : (
        <span className="contact-row__value contact-row__value--placeholder">Not yet configured</span>
      )}
      {configured && copyable && (
        <button type="button" className="icon-btn contact-row__copy" onClick={copy} aria-label={copied ? 'Copied' : `Copy ${label.toLowerCase()}`}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        </button>
      )}
    </li>
  );
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function Contact() {
  const { email, linkedin, github } = site.links;
  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-title">
      <div className="container contact">
        <SectionHeading emoji="💌" title="Say hi!" id="contact-title" intro={contact.intro} />
        <div>
          <ul className="contact-list">
            <ContactRow icon={<Mail size={18} />} label="Email" value={email} href={`mailto:${email}`} copyable />
            <ContactRow icon={<LinkedInIcon size={17} />} label="LinkedIn" value={linkedin} href={linkedin} display={stripProtocol(linkedin)} external />
            <ContactRow icon={<GitHubIcon size={17} />} label="GitHub" value={github} href={github} display={stripProtocol(github)} external />
          </ul>
        </div>
      </div>
    </section>
  );
}
