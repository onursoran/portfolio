import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { prefersReducedMotion } from '../../lib/hooks';

/** Scrolls to hash targets, resets scroll on navigation, and moves focus for screen readers. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstRender = useRef(true);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const pathChanged = lastPath.current !== pathname;
    lastPath.current = pathname;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const scroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: prefersReducedMotion() || pathChanged ? 'auto' : 'smooth' });
        } else if (attempt < 10) {
          window.setTimeout(() => scroll(attempt + 1), 50);
        }
      };
      scroll();
    } else if (pathChanged) {
      window.scrollTo(0, 0);
    }

    if (pathChanged && !firstRender.current) {
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [pathname, hash, key]);

  return null;
}

export function Layout() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollManager />
    </>
  );
}
