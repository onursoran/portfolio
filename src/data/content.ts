/**
 * Copy for the home-page sections. Edit freely — components read from here.
 */

export const hero = {
  eyebrow: 'Western University · Engineering',
  intro:
    'I’m an engineering student at Western University focused on mechanical engineering, exploring where mechanical systems, vehicle dynamics and software meet. Through motorsport, computational modeling, and engineering design projects, I apply technical concepts to practical engineering challenges.',
  meta: [
    { label: 'Focus', value: 'Vehicle dynamics · Brake systems · Simulation' },
    { label: 'Current', value: 'Western Formula Racing — 2027 recruitment project' },
    { label: 'Open to', value: 'Engineering internships' },
  ],
};

export const about = {
  paragraphs: [
    'My interest in engineering started at the race track. Competing in karting, and later founding and running a team, made me want to understand what actually determines how a vehicle performs — how it uses its grip under braking, through a corner, and everywhere in between.',
    'I’m now a first-year engineering student at Western University, building the fundamentals behind those questions. Outside the classroom I turn them into models: I wrote a Python vehicle dynamics simulator to study how a tire shares its grip between cornering and braking, and I’m applying the same thinking to an electromechanical brake-bias project for Western Formula Racing.',
    'I’m most engaged where mechanical systems, data and software meet, and I’m working toward a career in mechanical engineering, particularly in automotive and motorsport.',
  ],
  path: [
    { step: 'Compete', text: 'Kart racing, then founding Soran Racing.' },
    { step: 'Observe', text: 'Asking why a vehicle behaves the way it does.' },
    { step: 'Learn', text: 'Engineering fundamentals at Western University.' },
    { step: 'Model', text: 'A Python vehicle dynamics simulator.' },
    { step: 'Design', text: 'Formula SAE brake-bias system research.' },
    { step: 'Build', text: 'Software as an engineering tool.' },
  ],
  facts: [
    { label: 'Institution', value: 'Western University' },
    { label: 'Program', value: 'Engineering — Year 1' },
    { label: 'Location', value: 'London, Ontario' },
    { label: 'Interests', value: 'Mechanical engineering, vehicle dynamics, mechatronics, motorsport, software' },
  ],
};

export interface MotorsportEntry {
  organization: string;
  role: string;
  context: string;
  description: string;
  highlights: string[];
  stats?: { value: string; label: string }[];
  competitions?: string[];
  projectSlug?: string;
}

export const motorsport: MotorsportEntry[] = [
  {
    organization: 'Soran Racing',
    role: 'Founder & Team Principal',
    context: 'Competitive kart racing · Canadian regional and national championships',
    description:
      'I founded Soran Racing and lead it as Team Principal — building the team, securing its funding and coordinating how it operates on race weekends.',
    stats: [
      { value: '5', label: 'Drivers' },
      { value: '$15,000+', label: 'Sponsorship secured' },
      { value: '9', label: 'Podium finishes' },
    ],
    highlights: [
      'Founded and manage a team of 5 drivers and 11 total members.',
      'Secured over $15,000 in sponsorship funding.',
      'Coordinate race operations and collaborative performance reviews.',
      'Contributed to 9 podium finishes.',
    ],
    competitions: ['TRAK', 'KartStars Canada', 'Ontario Interclub Challenge', 'Cup Karts North America'],
    projectSlug: 'soran-racing',
  },
  {
    organization: 'Western Formula Racing',
    role: '2027 Recruitment Project',
    context: 'Formula SAE · Western University',
    description:
      'Working on an electromechanical brake-bias adjustment system for the team’s Formula SAE car — integrating an actuator with the existing Tilton cable adjuster inside the current pedal-box packaging.',
    highlights: [
      'Researching actuator selection, torque and travel requirements, and position feedback.',
      'Investigating braking configurations, wheel-lockup behaviour and yaw stability.',
      'Reviewing FSAE braking regulations, brake-by-wire restrictions and fail-safe requirements.',
    ],
    projectSlug: 'electromechanical-brake-bias',
  },
];

export interface Skill {
  name: string;
  /** Slug of a project where the skill was applied (optional). */
  appliedIn?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

/**
 * Only verified skills are listed. Add CAD, firmware, electronics or other languages
 * here once they have been used in real work. No proficiency ratings by design.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    skills: [{ name: 'Python', appliedIn: 'vehicle-dynamics-simulator' }],
  },
  {
    id: 'tools',
    title: 'Libraries & Development Tools',
    skills: [
      { name: 'NumPy', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Matplotlib', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Visual Studio Code' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering & Analysis',
    skills: [
      { name: 'Vehicle dynamics modeling', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Tire-force modeling', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Numerical optimization', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Parametric analysis', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Engineering data visualization', appliedIn: 'vehicle-dynamics-simulator' },
      { name: 'Brake-system research', appliedIn: 'electromechanical-brake-bias' },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    skills: [
      { name: 'Microsoft Excel' },
      { name: 'Technical research', appliedIn: 'electromechanical-brake-bias' },
      { name: 'Engineering documentation' },
    ],
  },
];

export const contact = {
  intro:
    'I’m looking for engineering internship opportunities in mechanical engineering (especially automotive, motorsport and aerospace) and software. Email is the best way to reach me.',
};
