/**
 * Content model for the portfolio.
 * Everything rendered on the site is described by these types, so new projects,
 * images and milestones can be added by editing data files only.
 */

/** Common ratios, or an exact "width/height" (e.g. '2080/1280') so plots are never cropped. */
export type AspectRatio = '16/9' | '4/3' | '3/2' | '1/1' | '21/9' | '3/4' | `${number}/${number}`;

export interface Media {
  /**
   * Path relative to /public (e.g. "images/brake-bias/cad-overview.jpg") or an absolute URL.
   * Leave empty to render a clearly labeled placeholder instead of an image.
   */
  src?: string;
  /** Optional responsive sources, e.g. "images/x-800.jpg 800w, images/x-1600.jpg 1600w" (paths relative to /public). */
  srcSet?: string;
  sizes?: string;
  /** Required: describes the image for screen readers. */
  alt: string;
  caption?: string;
  /** What belongs here while `src` is empty (shown on the placeholder). */
  placeholder?: string;
  /** Suggested file location; shown on placeholders in development builds only. */
  slot?: string;
  width?: number;
  height?: number;
  aspect?: AspectRatio;
}

/** Original, code-drawn visuals that can be used as covers or inline diagrams. */
export type VisualId = 'brake-bias-concept' | 'friction-circle' | 'soran-racing-stats';

export type PastelColor = 'peach' | 'mint' | 'sky' | 'butter' | 'lilac';

export type Cover =
  | { kind: 'image'; media: Media }
  | { kind: 'visual'; visual: VisualId; label: string }
  /** A big emoji on a pastel tile. */
  | { kind: 'emoji'; emoji: string; color: PastelColor };

export type StatusTone = 'active' | 'complete' | 'ongoing' | 'planned';

export interface ProjectStatus {
  label: string;
  tone: StatusTone;
  note?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type MilestoneState = 'complete' | 'in-progress' | 'planned';

export interface Milestone {
  label: string;
  state: MilestoneState;
  note?: string;
  /** Free-form, e.g. "Jan 2027". */
  date?: string;
}

export interface LinkItem {
  label: string;
  /** Leave empty to show a "not yet available" placeholder row. */
  href: string;
  description?: string;
}

export interface PipelineStep {
  title: string;
  description: string;
}

/**
 * Case-study content blocks. Paragraph/list text supports `inline code` and **bold**.
 * Equations support _{subscript} and ^{superscript}.
 */
export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'equation'; expression: string; label?: string; caption?: string }
  | { type: 'table'; columns: string[]; rows: string[][]; caption?: string; placeholder?: boolean }
  | { type: 'figure'; media: Media }
  | { type: 'gallery'; items: Media[]; title?: string }
  | { type: 'code'; code: string; language: string; caption?: string; illustrative?: boolean }
  | { type: 'callout'; tone: 'note' | 'placeholder' | 'caution'; title?: string; text: string }
  | { type: 'milestones'; items: Milestone[] }
  | { type: 'links'; items: LinkItem[] }
  | { type: 'stats'; items: Stat[] }
  | { type: 'facts'; items: { label: string; value: string }[] }
  | { type: 'pipeline'; steps: PipelineStep[] }
  | { type: 'diagram'; visual: VisualId; caption?: string }
  | { type: 'demo'; demo: 'friction-circle' }
  /** Instagram post embed; postId is the code in instagram.com/p/<postId>/. */
  | { type: 'instagram'; postId: string; caption?: string }
  | { type: 'related'; slug: string; text: string };

export interface CaseStudySection {
  /** URL anchor, e.g. "engineering-problem". */
  id: string;
  title: string;
  blocks: Block[];
}

export interface Project {
  slug: string;
  /** Short reference shown on cards, e.g. "P-01". */
  index: string;
  title: string;
  organization?: string;
  category: string;
  summary: string;
  status: ProjectStatus;
  role: string;
  context?: string;
  timeline?: string;
  tags: string[];
  cover: Cover;
  /** GitHub repository URL. Leave empty until published. */
  repoUrl?: string;
  /** One sentence on the card describing personal contribution. */
  contributionSummary: string;
  /** Detailed list shown at the top of the case study. */
  contributions: string[];
  stats?: Stat[];
  sections: CaseStudySection[];
}
