/**
 * Site-wide settings: identity and links.
 * Empty strings render as clearly labeled "not yet configured" placeholders.
 */
export const site = {
  name: 'Onur Kaan Soran',
  shortName: 'OKS',
  title: 'Onur Kaan Soran — Engineering Portfolio',
  role: 'Engineering Student | Mechanical Engineering | Vehicle Dynamics | Motorsport | Software Development',
  description:
    'Engineering portfolio of Onur Kaan Soran, an engineering student at Western University focused on mechanical engineering, working on vehicle dynamics, motorsport, brake systems and software.',
  /**
   * Home-page photo of me (path relative to /public). Leave empty to use the
   * karting photo instead.
   */
  photo: '',
  institution: 'Western University',
  location: 'London, Ontario, Canada',

  links: {
    /** e.g. "you@example.com" */
    email: 'onurkaansoran@gmail.com',
    /** e.g. "https://www.linkedin.com/in/your-handle" */
    linkedin: 'https://www.linkedin.com/in/onur-soran-419458304/',
    /** e.g. "https://github.com/your-handle" */
    github: 'https://github.com/onursoran',
  },
} as const;

export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'motorsport', label: 'Motorsport' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof navigation)[number]['id'];
