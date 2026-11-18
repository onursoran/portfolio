/**
 * Copy for the home-page sections. Edit freely — components read from here.
 */

export const hero = {
  greeting: 'Hey, I’m Onur',
  subtitle: 'Mechanical engineering student at Western University',
  intro:
    'I race karts, run a small karting team, and like figuring out why cars do what they do. That curiosity is how I ended up writing a lap-time simulator in Python and working on a brake-bias system for Western Formula Racing.',
  photoNote: 'that’s me in #301!',
};

export const about = {
  paragraphs: [
    'I got into engineering through karting. Racing (and later starting my own team) made me want to know what actually makes a car fast: how the tires share their grip between braking and turning, and why some setups just feel better.',
    'Now I’m in first-year engineering at Western, learning the theory behind all of that. When a question sticks with me, I try to model it. That’s where my lap-time simulator came from, and it’s the same thinking I’m bringing to a brake-bias project for Western Formula Racing.',
    'Mechanical engineering is where I want to end up, ideally somewhere in automotive or motorsport.',
  ],
  facts: [
    { emoji: '🎓', text: 'Engineering, year 1 at Western' },
    { emoji: '📍', text: 'London, Ontario' },
    { emoji: '🏎️', text: 'Kart racer, #301' },
    { emoji: '🛠️', text: 'Mechanical engineering, vehicle dynamics, mechatronics' },
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
      'I started Soran Racing and run it as Team Principal. That means building the team, finding sponsors, and keeping race weekends organized.',
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
      'My recruitment project is an electromechanical brake-bias adjuster for the team’s Formula SAE car: a small actuator that turns the existing Tilton cable adjuster, packaged inside the current pedal box.',
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
    'I’m looking for internships in mechanical engineering (automotive, motorsport or aerospace would be amazing) and software. Email is the easiest way to reach me, and I reply quickly!',
};
