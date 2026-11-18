import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { projects } from './src/data/projects';

/**
 * BASE_PATH – the sub-path the site is served from.
 *   GitHub project page:  "/<repository-name>/"   (set automatically by the deploy workflow)
 *   User page / custom domain / local: "/"
 *
 * SITE_URL – absolute public URL, no trailing slash (e.g. "https://username.github.io/portfolio").
 *   Used for canonical/Open Graph tags, sitemap.xml and robots.txt. Optional.
 */
const rawBase = process.env.BASE_PATH ?? '/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const siteUrl = (process.env.SITE_URL ?? '').replace(/\/+$/, '');

function portfolioStaticFiles(): Plugin {
  let outDir = 'dist';
  let publicDir = 'public';

  return {
    name: 'portfolio-static-files',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
      publicDir = config.publicDir;
    },
    transformIndexHtml() {
      if (!siteUrl) return [];
      const tags: { tag: string; attrs: Record<string, string> }[] = [
        { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` } },
        { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` } },
      ];
      if (existsSync(resolve(publicDir, 'og-image.png'))) {
        tags.push(
          { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/og-image.png` } },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/og-image.png` } },
        );
      }
      return tags.map((t) => ({ ...t, injectTo: 'head' as const }));
    },
    closeBundle() {
      // GitHub Pages serves 404.html for unknown paths; shipping the SPA shell there
      // lets deep links such as /projects/<slug> resolve client-side.
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));

      if (!siteUrl) return;
      const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)];
      const today = new Date().toISOString().slice(0, 10);
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((u) => `  <url><loc>${siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`),
        '</urlset>',
        '',
      ].join('\n');
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      );
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), portfolioStaticFiles()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
