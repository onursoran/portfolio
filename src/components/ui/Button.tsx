import type { ReactNode } from 'react';
import { Link, type To } from 'react-router-dom';
import { isSet } from '../../lib/asset';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  iconRight?: ReactNode;
  /** Internal route. */
  to?: To;
  /** External or file URL. When empty (and no `to`), renders a disabled placeholder. */
  href?: string;
  external?: boolean;
  download?: string;
  /** Explains why the button is unavailable when `href` is empty. */
  unavailableLabel?: string;
  className?: string;
}

/** Link styled as a button. Handles internal routes, external links and unconfigured placeholders. */
export function Button({
  children,
  variant = 'secondary',
  icon,
  iconRight,
  to,
  href,
  external,
  download,
  unavailableLabel = 'Not yet available',
  className = '',
}: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (to !== undefined) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }

  if (!isSet(href)) {
    return (
      <span className={`${cls} is-disabled`} aria-disabled="true" title={unavailableLabel}>
        {inner}
        <span className="sr-only"> — {unavailableLabel}</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={cls}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
