import { useEffect, useState } from 'react';
import { site } from '../data/site';

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string, description: string = site.description) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [title, description]);
}

/**
 * Returns the id of the section currently in the middle band of the viewport.
 * Used to highlight navigation and table-of-contents entries.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0 || !('IntersectionObserver' in window)) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = elements.find((el) => visible.has(el.id));
        if (first) setActive(first.id);
        else if (window.scrollY < 200) setActive(null);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return active;
}
