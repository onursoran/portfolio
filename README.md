# Onur Kaan Soran — Engineering Portfolio

Personal engineering portfolio built with **React + TypeScript + Vite**, deployed to **GitHub Pages**.
Single-page home (About, Projects, Motorsport, Skills, Contact) plus a dedicated
case-study page per project at `/projects/<slug>`.

- No backend, database or CMS — all content lives in typed data files.
- Dependencies: `react`, `react-dom`, `react-router-dom`, `lucide-react`.
- Hand-written CSS with design tokens (`src/styles/index.css`); respects `prefers-reduced-motion`.

---

## Local development

Requires **Node.js 20+**.

```bash
npm install        # once
npm run dev        # http://localhost:5173 with hot reload
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

In dev mode, image placeholders also show the suggested file path (e.g. `public/images/simulator/friction-circle.png`) so you know where each file goes. Production builds hide those paths.

---

## Project structure

```
public/
  favicon.svg
  images/<project>/        ← project screenshots, photos, figures
src/
  data/
    site.ts                ← name, links (email/LinkedIn/GitHub)
    content.ts             ← hero, about, motorsport, skills, contact copy
    projects.ts            ← all projects and case-study content
    types.ts               ← content model (Project, Block, Media, …)
  components/
    case-study/BlockRenderer.tsx   ← renders every case-study block type
    demo/FrictionCircleDemo.tsx    ← interactive illustrative demo
    media/Figure.tsx, Gallery.tsx  ← images, placeholders, lightbox
    visuals/                       ← code-drawn diagrams and covers
    layout/, ui/
  sections/                ← home-page sections
  pages/                   ← HomePage, ProjectPage, NotFoundPage
  styles/index.css
vite.config.ts             ← base path, 404.html, sitemap.xml, robots.txt
.github/workflows/deploy.yml
```

---

## Updating content

### Contact links and email
Edit `src/data/site.ts`:

```ts
links: {
  email: 'you@example.com',
  linkedin: 'https://www.linkedin.com/in/your-handle',
  github: 'https://github.com/your-handle',
},
```

Empty values show as "Not yet configured" and the related buttons render disabled. Once a value is filled in, the links work automatically.

### Images and figures
1. Copy the image into `public/images/<project>/` (for example `public/images/simulator/friction-circle.png`).
2. In `src/data/projects.ts`, find the matching placeholder (its `slot` field shows the suggested path) and add `src`:

```ts
{ src: 'images/simulator/friction-circle.png', alt: 'Friction-circle plot from the simulator', caption: '…', aspect: '4/3' }
```

Write a meaningful `alt`. Optionally add `width`/`height` and `srcSet`/`sizes` for responsive images. Prefer compressed `.jpg`/`.webp` for photos and `.png`/`.svg` for plots, around 1600px wide at most.

To use a photo as a project **cover** instead of the drawn visual:

```ts
cover: { kind: 'image', media: { src: 'images/soran-racing/team-01.jpg', alt: '…', aspect: '4/3' } },
```

### Project status, milestones, GitHub links
In `src/data/projects.ts`:

- `status: { label: 'In progress', tone: 'active' }` — tones: `active`, `complete`, `ongoing`, `planned`.
- `repoUrl: 'https://github.com/…'` — adds a Repository link to the card and the case study.
- Milestones: change `state` to `'complete'` / `'in-progress'` / `'planned'`, and optionally add `date` or `note`.

### Case-study content blocks
Each section is `{ id, title, blocks: [...] }`. Available block types (see `src/data/types.ts`):

| Block | Use |
|---|---|
| `paragraph` | Text. Supports `` `code` `` and `**bold**` |
| `list` | Bullet or numbered (`ordered: true`) list |
| `equation` | Formula with `_{sub}` / `^{sup}` markup, label and caption |
| `table` | Columns and rows; `placeholder: true` adds a "data pending" badge |
| `figure` / `gallery` | One image, or a grid with a lightbox |
| `code` | Code snippet with a copy button; `illustrative: true` adds a label |
| `callout` | `note`, `placeholder` or `caution` |
| `milestones` | Progress tracker |
| `links` | External links (an empty `href` shows "Coming soon") |
| `stats`, `facts`, `pipeline` | Key figures, key/value facts, process steps |
| `diagram`, `demo`, `related` | Code-drawn visual, interactive demo, link to another project |

### Adding a new project
Add a `Project` object to `src/data/projects.ts` and include it in the exported `projects` array. The card, case-study route, navigation between projects and sitemap entry are all generated automatically.

### Skills
Edit `skillGroups` in `src/data/content.ts`. Only add tools you have actually used. `appliedIn` links a skill to the project where it was used.

---

## Deployment (GitHub Pages)

1. Install Git, create a GitHub repository (e.g. `portfolio`), and push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and deploys the site to
   `https://<username>.github.io/<repo>/`.

The workflow reads the correct base path and public URL from GitHub Pages automatically. It works for:

- project pages (`/<repo>/`),
- a `<username>.github.io` repository (`/`),
- a custom domain added later in Settings → Pages.

The build also writes `sitemap.xml`, `robots.txt` and canonical/Open Graph URLs. It copies `index.html` to `404.html` so that direct links to `/projects/<slug>` work on GitHub Pages.

### Building manually for a sub-path

```bash
# PowerShell
$env:BASE_PATH="/portfolio/"; $env:SITE_URL="https://<username>.github.io/portfolio"; npm run build
# bash
BASE_PATH=/portfolio/ SITE_URL=https://<username>.github.io/portfolio npm run build
```

### Social preview image (optional)
Add a 1200×630 `public/og-image.png`. When `SITE_URL` is set, the build adds `og:image` and `twitter:image` tags automatically.

---

## Content integrity

The site is intentionally conservative:

- No invented results, numbers, completed milestones or skills.
- Missing images, tables and results appear as clearly labeled placeholders.
- The friction-circle demo is labeled as an illustration, not output from the Python model.

Keep it that way as you add content.
