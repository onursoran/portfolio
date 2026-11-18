import type { Media, Project } from './types';

/**
 * Engineering projects. The order here is the order shown on the site.
 *
 * To add images: drop files into /public/images/<project>/ and set `src` on the matching
 * Media object (the `slot` field suggests a filename). Media with no `src` renders as a
 * labeled placeholder, so nothing is ever shown that does not exist.
 *
 * Content rule: only document work that has actually been done. Use milestones with
 * state 'planned' / 'in-progress' for everything else.
 */

/** A Soran Racing photo: 2000 px full size (lightbox) plus a 900 px copy for the grid. */
const photo = (name: string, alt: string, caption?: string): Media => ({
  src: `images/soran-racing/${name}.jpg`,
  caption,
  srcSet: `images/soran-racing/${name}-900.jpg 900w, images/soran-racing/${name}.jpg 2000w`,
  sizes: '(min-width: 900px) 33vw, 100vw',
  alt,
  width: 2000,
  height: 1333,
  aspect: '3/2',
});

/** A page from the sponsorship proposal: 1200 px full size plus a 600 px copy for the grid. */
const proposalPage = (name: string, alt: string, caption: string): Media => ({
  src: `images/soran-racing/${name}.jpg`,
  srcSet: `images/soran-racing/${name}-600.jpg 600w, images/soran-racing/${name}.jpg 1200w`,
  sizes: '(min-width: 900px) 33vw, 100vw',
  alt,
  caption,
  width: 1200,
  height: 1553,
  aspect: '3/4',
});

/* -------------------------------------------------------------------------- */
/* P-01 · Western Formula Racing — Electromechanical Brake Bias System         */
/* -------------------------------------------------------------------------- */

const brakeBias: Project = {
  slug: 'electromechanical-brake-bias',
  index: 'P-01',
  title: 'Electromechanical Brake Bias System',
  organization: 'Western Formula Racing',
  category: 'Mechatronics · Brake Systems',
  summary:
    'Research and system design for an electromechanical brake-bias adjuster that drives the car’s existing Tilton cable adjuster — integrating mechanical, electrical and firmware components within the current pedal-box packaging.',
  status: {
    label: 'In progress',
    tone: 'active',
    note: 'Research and requirements phase. CAD, schematics, firmware and validation are planned deliverables.',
  },
  role: 'Recruitment project — research & system design',
  context: 'Western Formula Racing · 2027 Recruitment Project',
  timeline: 'Ongoing',
  tags: ['Mechatronics', 'Brake systems', 'Formula SAE', 'Actuator selection', 'Position feedback', 'Vehicle dynamics'],
  cover: { kind: 'visual', visual: 'brake-bias-concept', label: 'Concept-level architecture' },
  contributionSummary:
    'Researching actuator selection, position feedback, braking configurations and FSAE rule compliance to define the system requirements and concept.',
  contributions: [
    'Investigating electromechanical actuator options and the torque and adjustment travel needed to drive the existing Tilton cable adjuster.',
    'Evaluating position-feedback approaches so the system can report and hold a commanded bias setting.',
    'Assessing mechanical integration and clearance within the existing pedal box.',
    'Researching dual-master-cylinder, four-master-cylinder and independent-wheel braking concepts and their trade-offs.',
    'Reviewing Formula SAE braking regulations, brake-by-wire restrictions, fail-safe requirements and power-loss scenarios.',
    'Using my vehicle dynamics simulator to frame how brake force distribution interacts with tire grip.',
  ],
  sections: [
    {
      id: 'engineering-problem',
      title: 'Engineering Problem',
      blocks: [
        {
          type: 'paragraph',
          text: 'Brake bias is the share of total braking force sent to the front axle versus the rear. It decides how close each axle runs to its traction limit under braking. Because load transfers forward as the car decelerates, the bias that makes best use of the available grip changes with deceleration level, track conditions and setup.',
        },
        {
          type: 'paragraph',
          text: 'On the current car, bias is set mechanically through a balance bar in the pedal box and adjusted remotely with a Tilton cable adjuster. The objective of this project is to design an **electromechanical** system that performs that adjustment: an actuator drives the existing cable adjuster rather than manipulating the balance bar directly, so the mechanical and hydraulic braking path stays unchanged.',
        },
        {
          type: 'equation',
          label: 'Eq. 1',
          expression: 'ΔF_{z} = m · a_{x} · h / L',
          caption:
            'Longitudinal load transfer under braking (standard relation). m — vehicle mass, a_x — deceleration, h — centre-of-gravity height, L — wheelbase.',
        },
        {
          type: 'equation',
          label: 'Eq. 2',
          expression: 'F_{x,f} / F_{x,total} = ( b + h · a_{x} / g ) / L',
          caption:
            'Idealised front-axle share of braking force when both axles reach the same friction utilisation. b — distance from the CG to the rear axle. Shown for context; no vehicle parameters are assumed.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'The adjuster changes how braking force is split between axles. It never generates braking force itself — the driver’s pedal input remains the only source of brake pressure.',
        },
      ],
    },
    {
      id: 'system-requirements',
      title: 'System Requirements',
      blocks: [
        {
          type: 'paragraph',
          text: 'The requirements below are derived from the project brief and the Formula SAE rules. They are development objectives; quantitative targets will be defined as the research and design work progresses.',
        },
        {
          type: 'table',
          caption: 'Requirements matrix (qualitative). Quantitative targets will be set as the design develops.',
          columns: ['ID', 'Requirement', 'Source', 'Verification (planned)'],
          rows: [
            ['R-01', 'Adjust front/rear bias by driving the existing Tilton cable adjuster', 'Project brief', 'Bench test'],
            ['R-02', 'Package within the existing pedal box without interfering with pedal travel', 'Project brief', 'CAD clearance check'],
            ['R-03', 'Provide position feedback of the adjuster setting', 'Project brief', 'Bench test'],
            ['R-04', 'Leave the mechanical, driver-actuated hydraulic braking path unchanged', 'FSAE rules', 'Design review'],
            ['R-05', 'Define safe system behaviour on electrical power loss', 'Project brief', 'Fault-injection test'],
            ['R-06', 'Integrate mechanical, electrical and firmware subsystems', 'Project brief', 'Integration review'],
          ],
        },
      ],
    },
    {
      id: 'existing-architecture',
      title: 'Existing Mechanical Architecture',
      blocks: [
        {
          type: 'paragraph',
          text: 'In a balance-bar system, the brake pedal pushes on a bar that pivots between two master-cylinder pushrods, one for each hydraulic circuit. Moving the pivot along a threaded rod changes the lever arms and therefore the force split. A Tilton remote cable adjuster rotates that threaded rod through a flexible cable, which is what lets the bias be changed from the cockpit.',
        },
        {
          type: 'equation',
          label: 'Eq. 3',
          expression: 'F_{front} / F_{rear} = d_{rear} / d_{front}',
          caption:
            'Ideal balance-bar force split from moment balance about the pivot: the pushrod closer to the pivot receives the larger share. d — distance from the pivot to each master-cylinder clevis (friction and bar angle neglected).',
        },
        {
          type: 'paragraph',
          text: 'The resulting front-to-rear brake torque ratio also depends on master-cylinder bore, caliper piston area, effective rotor radius and pad friction, so the balance bar is one term in the overall bias rather than the whole story.',
        },
        {
          type: 'diagram',
          visual: 'brake-bias-concept',
          caption:
            'Concept-level architecture described in the project brief: the actuator works through the existing cable adjuster, and the pedal-to-master-cylinder path is untouched. Component selections are not finalised.',
        },
      ],
    },
    {
      id: 'design-constraints',
      title: 'Design Constraints',
      blocks: [
        {
          type: 'table',
          columns: ['Constraint', 'Description', 'Design implication'],
          rows: [
            ['Packaging', 'Must fit within the existing pedal-box envelope.', 'Actuator size, mounting and cable routing must clear pedal sweep and the driver’s feet.'],
            ['Interface', 'Works through the existing Tilton cable adjuster.', 'No direct manipulation of the balance bar; actuator output must match the adjuster input.'],
            ['Mechanical fail-safe', 'Braking must remain fully functional regardless of actuator state.', 'Actuator failure modes cannot affect the hydraulic path.'],
            ['Electrical', 'Power supply, wiring and behaviour on power loss.', 'Defined fault response; known bias position after a power cycle.'],
            ['Regulatory', 'Must comply with Formula SAE braking rules.', 'Brake-by-wire is not permitted; the system may only adjust the split.'],
          ],
        },
      ],
    },
    {
      id: 'braking-configurations',
      title: 'Braking Configuration Research',
      blocks: [
        {
          type: 'paragraph',
          text: 'Before committing to a design, I’m comparing the braking architectures used in Formula SAE and their effect on hydraulic complexity, force distribution and how adjustable bias can be.',
        },
        {
          type: 'table',
          caption: 'Qualitative comparison — research in progress.',
          columns: ['Configuration', 'Principle', 'Bias adjustment', 'Hydraulic complexity'],
          rows: [
            ['Dual master cylinder + balance bar', 'One master cylinder per circuit (front / rear) linked by a balance bar.', 'Balance-bar pivot position (current baseline).', 'Lower'],
            ['Four master cylinders', 'Additional master cylinders to split circuits further.', 'Depends on linkage arrangement — under investigation.', 'Higher'],
            ['Independent-wheel braking concepts', 'Brake force controlled per wheel.', 'Per-wheel; regulatory feasibility to be confirmed.', 'Highest'],
          ],
        },
        {
          type: 'list',
          items: [
            '**Tire traction utilisation** — how bias determines which axle reaches its friction limit first as deceleration increases.',
            '**Wheel-lockup behaviour** — front lockup costs steering control; rear lockup removes the rear axle’s lateral grip.',
            '**Yaw stability** — rear-biased braking tends to destabilise the car under braking, especially combined with cornering.',
            '**Force distribution** — how load transfer (Eq. 1) shifts the ideal bias (Eq. 2) with deceleration.',
          ],
        },
      ],
    },
    {
      id: 'actuator-feedback',
      title: 'Actuator and Feedback Investigation',
      blocks: [
        {
          type: 'paragraph',
          text: 'The actuator must rotate the cable adjuster against its operating torque and through the full adjustment travel, within the packaging envelope and the car’s electrical budget. Selection is framed by a simple sizing relation, with every term still to be measured or specified:',
        },
        {
          type: 'equation',
          label: 'Eq. 4',
          expression: 'τ_{actuator} ≥ SF · ( τ_{adjuster} + τ_{cable} )',
          caption:
            'Available actuator torque must exceed the adjuster operating torque plus cable losses, with a safety factor SF. Values to be determined.',
        },
        {
          type: 'paragraph',
          text: 'Questions currently under investigation for position feedback:',
        },
        {
          type: 'list',
          items: [
            'Should position be measured at the actuator or at the adjuster, given possible cable compliance and backlash?',
            'Is absolute sensing required so the bias setting is known immediately after a power cycle?',
            'What resolution is meaningful relative to the adjuster’s travel per turn?',
            'How should the current setting be communicated to the driver?',
          ],
        },
      ],
    },
    {
      id: 'safety-regulatory',
      title: 'Safety and Regulatory Considerations',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Formula SAE rules require a hydraulic braking system acting on all four wheels, operated by a single control, with two independent hydraulic circuits — and they prohibit brake-by-wire. An electromechanical adjuster is therefore limited to changing the split of a driver-generated force; it can never be in the force path.',
        },
        {
          type: 'callout',
          tone: 'caution',
          text: 'Rule interpretations here are summaries. Every design decision will be checked against the exact wording of the competition-year FSAE rulebook.',
        },
        {
          type: 'table',
          caption: 'Failure scenarios under evaluation. Responses are design intent and will be validated.',
          columns: ['Scenario', 'Concern', 'Design intent'],
          rows: [
            ['Electrical power loss', 'Actuator stops at an arbitrary position.', 'Braking unaffected; bias remains at its last mechanical setting.'],
            ['Actuator or controller fault', 'Unintended bias change while braking.', 'Bound the adjustment range and rate; detect and stop on fault.'],
            ['Feedback sensor fault', 'Reported bias does not match actual bias.', 'Detect implausible readings; report to driver.'],
            ['Cable or mechanical failure', 'Loss of remote adjustment.', 'Balance bar keeps its current setting; car remains drivable.'],
          ],
        },
      ],
    },
    {
      id: 'simulation-integration',
      title: 'Integration with Vehicle Dynamics Simulation',
      blocks: [
        {
          type: 'paragraph',
          text: 'My Python vehicle dynamics simulator models how lateral force demand reduces the longitudinal force a tire can deliver. That relationship is directly relevant to bias: under braking, each axle’s available longitudinal force depends on its normal load and on how much lateral grip it is already using.',
        },
        {
          type: 'list',
          items: [
            'Estimate how the ideal bias range shifts with deceleration level and CG parameters.',
            'Study combined braking and cornering, where the available longitudinal force is reduced.',
            'Use the results to inform the required adjustment range of the system.',
          ],
        },
        {
          type: 'figure',
          media: {
            src: 'images/simulator/brake-bias-study.png',
            alt: 'Three plots from the simulator: ideal front braking percentage rising with deceleration, maximum deceleration peaking near 70% front bias, and front and rear axle utilization at a fixed 60% front bias.',
            caption: 'From the simulator’s straight-line brake-bias study (illustrative car parameters, not the Western Formula Racing car): the ideal front share rises with deceleration, so a fixed bias is ideal at only one deceleration, which is the case for an adjustable system.',
            width: 2400,
            height: 768,
            aspect: '2400/768',
          },
        },
        {
          type: 'related',
          slug: 'vehicle-dynamics-simulator',
          text: 'See the simulator case study for the models and architecture.',
        },
      ],
    },
    {
      id: 'progress',
      title: 'Current Progress and Next Steps',
      blocks: [
        {
          type: 'milestones',
          items: [
            { label: 'Research: braking configurations and bias principles', state: 'in-progress' },
            { label: 'Research: FSAE braking regulations and fail-safe requirements', state: 'in-progress' },
            { label: 'Define actuator torque and adjustment-travel requirements', state: 'in-progress' },
            { label: 'Actuator and position-feedback selection', state: 'planned' },
            { label: 'SolidWorks CAD — actuator mounting and pedal-box integration', state: 'planned' },
            { label: 'Electrical schematic', state: 'planned' },
            { label: 'Firmware design', state: 'planned' },
            { label: 'Validation plan and bench testing', state: 'planned' },
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* P-02 · Vehicle Dynamics & Lap-Time Simulator                               */
/* -------------------------------------------------------------------------- */

/** A simulator figure, shown at its exact pixel ratio so the plot is never cropped. */
const plot = (file: string, width: number, height: number, alt: string, caption: string): Media => ({
  src: `images/simulator/${file}`,
  alt,
  caption,
  width,
  height,
  aspect: `${width}/${height}`,
});

const simulator: Project = {
  slug: 'vehicle-dynamics-simulator',
  index: 'P-02',
  title: 'Vehicle Dynamics & Lap-Time Simulator',
  category: 'Computational Modeling · Software',
  summary:
    'A Python lap-time simulator with a four-wheel vehicle model and combined tire-grip limits, built to compare braking strategies — fixed bias, passive valves and independent wheel braking — on synthetic tracks and real circuits such as Monza.',
  status: {
    label: 'Developed',
    tone: 'complete',
    note: 'Source code is public on GitHub.',
  },
  role: 'Independent project — sole developer',
  timeline: 'Independent',
  tags: ['Python', 'NumPy', 'Matplotlib', 'Vehicle dynamics', 'Lap-time simulation', 'Brake systems', 'Unit testing'],
  cover: { kind: 'visual', visual: 'friction-circle', label: 'Friction-circle schematic' },
  repoUrl: 'https://github.com/onursoran/vehicle-laptime-simulator',
  stats: [
    { value: '100+', label: 'Automated tests' },
    { value: '6', label: 'Braking systems compared' },
    { value: '3', label: 'Real circuits' },
  ],
  contributionSummary:
    'Designed and implemented the simulator independently — vehicle and tire models, equilibrium and lap-time solvers, braking-system models, a local browser app, plots and a test suite of over 100 tests.',
  contributions: [
    'Designed and implemented the simulator independently in Python (about 3,200 lines plus tests).',
    'Built a four-wheel vehicle model with longitudinal and lateral load transfer, aerodynamic downforce and combined tire-grip limits.',
    'Wrote a quasi-steady equilibrium solver that balances forces and yaw moment at every point on the lap.',
    'Implemented a closed-lap speed-profile solver for synthetic tracks and real circuit layouts (Monza, Montreal, Barcelona-Catalunya).',
    'Modeled and compared six braking systems, including passive hydraulic valves and limited independent wheel braking.',
    'Built a local browser app to run comparisons and play back laps, and a suite of over 100 automated tests including analytical checks.',
  ],
  sections: [
    {
      id: 'problem-motivation',
      title: 'Problem and Motivation',
      blocks: [
        {
          type: 'paragraph',
          text: 'A tire produces cornering force and braking force from the same contact patch, and the total is limited by friction. So the way braking force is shared between the four wheels matters most where a car is braking and turning at the same time. The question this simulator investigates: **over a full lap, how much does the braking strategy actually change lap time — and what does each strategy cost in steering and stability?**',
        },
        {
          type: 'paragraph',
          text: 'It started as a study of the friction circle and brake bias in a straight line, and grew into a lap-time tool that compares conventional front/rear braking with passive valves and limited independent wheel braking. It supports my work on the Western Formula Racing brake-bias project.',
        },
      ],
    },
    {
      id: 'capabilities',
      title: 'What It Does',
      blocks: [
        {
          type: 'list',
          items: [
            '**Tracks** — synthetic oval, technical loop, figure-eight and circle, plus approximate 2020 layouts of **Monza, Montreal and Barcelona-Catalunya** from the open TUM racetrack database, smoothed with a periodic cubic spline.',
            '**Vehicle** — four-wheel load transfer, speed-dependent downforce, rear-wheel-drive force and power limits, steering and sideslip limits, and a check that the car body stays within the road corridor.',
            '**Braking systems** — conventional two-master-cylinder braking, fixed passive valves on one wheel or one side, limited independent left/right assistance, and an experimental inside-rear “fiddle brake”.',
            '**Car profiles** — an illustrative Formula Student car and a profile built from the Western Formula Racing 2026 design specification sheet.',
            '**Outputs** — lap time, speed profile, steering demand, braking zones (light, medium, hard), CSV/JSON exports and plots, through either the command line or a local browser app.',
          ],
        },
      ],
    },
    {
      id: 'mathematical-models',
      title: 'Vehicle and Tire Models',
      blocks: [
        {
          type: 'paragraph',
          text: 'Each tire’s lateral force rises linearly with slip angle and saturates at the friction limit. When a wheel is braking, the lateral force it can still produce is capped by the friction circle:',
        },
        {
          type: 'equation',
          label: 'Eq. 1 — Lateral capacity under braking',
          expression: '| F_{y} | ≤ √( ( μ · F_{z} )^{2} − F_{x}^{2} )',
          caption: 'F_x — longitudinal (braking) force, F_z — normal load, μ — friction coefficient.',
        },
        {
          type: 'paragraph',
          text: 'Normal loads come from four-wheel longitudinal and lateral load transfer. In a straight line the axle loads are:',
        },
        {
          type: 'equation',
          label: 'Eq. 2 — Axle normal loads under braking',
          expression: 'F_{z,front} = m·g·b/L + m·d·h/L,     F_{z,rear} = m·g·a/L − m·d·h/L',
          caption: 'd — deceleration, h — CG height, a / b — CG to front / rear axle, L — wheelbase.',
        },
        {
          type: 'paragraph',
          text: 'At every point on the lap, a solver adjusts brake or drive actuation, steering angle and sideslip until the forces and yaw moment balance:',
        },
        {
          type: 'equation',
          label: 'Eq. 3 — Force and yaw equilibrium',
          expression: 'Σ F_{x} = m·a_{x},     Σ F_{y} = m·a_{y},     Σ ( x·F_{y} − y·F_{x} ) = I_{z}·ṙ',
          caption: 'Summed over all four tires in body coordinates; I_z — yaw inertia, ṙ — yaw acceleration.',
        },
        {
          type: 'paragraph',
          text: 'This matters for braking strategies: any yaw moment from braking one wheel harder than the other must be balanced by the tires’ lateral forces and steering. It is not counted as a free gain.',
        },
        { type: 'demo', demo: 'friction-circle' },
        {
          type: 'code',
          language: 'python',
          caption: 'Excerpt from tire_model.py: scaling a requested force back onto the friction circle.',
          code: `def apply_friction_circle(req_longitudinal_force_n, req_lateral_force_n, maximum_tire_force_n):
    combined_force_magnitude_n = math.hypot(req_lateral_force_n, req_longitudinal_force_n)
    if combined_force_magnitude_n <= maximum_tire_force_n:
        return req_longitudinal_force_n, req_lateral_force_n

    scale_factor = maximum_tire_force_n / combined_force_magnitude_n

    actual_longitudinal_force_n = (req_longitudinal_force_n * scale_factor)
    actual_lateral_force_n = (req_lateral_force_n * scale_factor)

    return actual_longitudinal_force_n, actual_lateral_force_n`,
        },
      ],
    },
    {
      id: 'lap-time-solver',
      title: 'Lap-Time Solver',
      blocks: [
        {
          type: 'pipeline',
          steps: [
            { title: 'Track geometry', description: 'Spline centerline, curvature and its rate of change, road width.' },
            { title: 'Corner speed limits', description: 'Highest speed with a feasible equilibrium at each point.' },
            { title: 'Braking pass', description: 'Backward pass: the latest braking each corner allows.' },
            { title: 'Acceleration pass', description: 'Forward pass: drive force, power and grip limits.' },
            { title: 'Closed-lap check', description: 'Every segment re-checked at start, midpoint and end.' },
            { title: 'Analysis', description: 'Lap time, braking zones, steering demand, plots and exports.' },
          ],
        },
        {
          type: 'equation',
          label: 'Eq. 4 — Segment acceleration and time',
          expression: 'a = ( V_{end}^{2} − V_{start}^{2} ) / ( 2·Δs ),     Δt = 2·Δs / ( V_{start} + V_{end} ),     T_{lap} = Σ Δt',
          caption: 'A lap time is returned only if the whole closed profile, including the start/finish seam, passes the equilibrium checks.',
        },
      ],
    },
    {
      id: 'results-visualization',
      title: 'Results',
      blocks: [
        {
          type: 'paragraph',
          text: 'Monza with the illustrative Formula Student car (fixed driving line, 12 m road). The six braking systems produce nearly identical laps; the differences come only from the braking zones.',
        },
        {
          type: 'table',
          caption: 'Monza (2020 layout), illustrative car, 60% front braking preference. Regenerated from the current code.',
          columns: ['Braking system', 'Lap time', 'vs conventional'],
          rows: [
            ['Independent 50% assistance', '236.818 s', '−0.091 s'],
            ['Conventional front/rear', '236.909 s', '—'],
            ['Rear-left valve', '236.926 s', '+0.017 s'],
            ['Rear-right valve', '236.938 s', '+0.029 s'],
            ['Fixed-left valves', '237.033 s', '+0.124 s'],
            ['Fixed-right valves', '237.052 s', '+0.143 s'],
          ],
        },
        {
          type: 'callout',
          tone: 'caution',
          title: 'How to read these numbers',
          text: 'These are comparative research estimates from a quasi-steady model with assumed tire and brake parameters, not predicted real lap times. Differences of a tenth of a second over a 237-second lap can be smaller than the uncertainty from tire, hardware and driver assumptions.',
        },
        {
          type: 'figure',
          media: plot('monza-lap-comparison.png', 2080, 1280, 'Four plots for Monza: the track map, speed profiles of the six braking systems, cumulative time difference against conventional braking, and steering demand along the lap.', 'Monza lap comparison: track, speed profile, time difference against conventional braking, and steering demand.'),
        },
        {
          type: 'figure',
          media: plot('monza-braking-zones.png', 2080, 800, 'Monza track map colored by braking intensity, next to a plot of deceleration along the lap for each braking system.', 'Braking zones at Monza, classified as light (below 0.3 g), medium or hard (0.7 g and above).'),
        },
      ],
    },
    {
      id: 'braking-studies',
      title: 'Braking Studies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Before the lap model, two focused studies looked at single operating points. The straight-line study finds the front braking fraction that uses both axles’ grip equally; the four-wheel study shows how much braking is available while cornering under different allocation strategies.',
        },
        {
          type: 'figure',
          media: plot('brake-bias-study.png', 2400, 768, 'Three plots: ideal front braking percentage rising with deceleration, maximum deceleration peaking near 70% front bias, and front and rear axle utilization at a fixed 60% front bias.', 'Straight-line brake bias: the ideal front share rises with deceleration, so a fixed bias is ideal at only one deceleration.'),
        },
        {
          type: 'figure',
          media: plot('four-wheel-study.png', 2560, 880, 'Three plots: highest feasible braking deceleration against lateral acceleration for four strategies, wheel normal loads in a left turn, and the achievable yaw-moment range.', 'Braking while cornering: available deceleration falls as lateral demand rises; independent wheel braking adds capacity but also yaw moment that must be controlled.'),
        },
      ],
    },
    {
      id: 'verification',
      title: 'Verification',
      blocks: [
        {
          type: 'list',
          items: [
            '**Over 100 automated tests**, all passing: an analytical constant-radius circle lap, force and yaw closure, load conservation, and acceleration, braking and closed-lap constraints.',
            '**Consistency checks**: zero assistance reproduces the conventional baseline exactly, and mirrored tracks with swapped valves give matching results.',
            '**Result audit**: a validation script re-checks exported laps against the current source fingerprint and declared limits.',
            '**Mesh refinement**: tracks re-run at 2 m, 1 m and 0.5 m spacing to check numerical sensitivity.',
          ],
        },
      ],
    },
    {
      id: 'brake-bias-relationship',
      title: 'Relationship to Brake-Bias Design',
      blocks: [
        {
          type: 'paragraph',
          text: 'The straight-line study shows why a fixed bias can only be ideal at one deceleration, and the lap model shows how small, and how track-dependent, the gains from smarter brake allocation can be. Both feed directly into the requirements for an adjustable brake-bias system.',
        },
        {
          type: 'related',
          slug: 'electromechanical-brake-bias',
          text: 'See how this feeds into the electromechanical brake-bias project.',
        },
      ],
    },
    {
      id: 'limitations',
      title: 'Limitations and Future Improvements',
      blocks: [
        { type: 'paragraph', text: '**Limitations of the current model**' },
        {
          type: 'list',
          items: [
            'Quasi-steady: each point is a balanced operating state, so transient roll, sideslip and yaw are not integrated over the lap.',
            'Linear, saturating tire model with no load sensitivity; it can hold a saturated force but does not simulate a locked wheel.',
            'Fixed driving line on a flat track (no elevation or banking), not an optimized racing line.',
            'Brake hydraulics are idealized: no compliance, hysteresis, delay or temperature effects.',
            'Not validated against measured car or tire data.',
          ],
        },
        { type: 'paragraph', text: '**Candidate improvements**' },
        {
          type: 'list',
          items: [
            'Transient simulation by integrating the yaw and sideslip states through the lap.',
            'Nonlinear tire model with load sensitivity, fitted to tire data.',
            'Racing-line optimization instead of a fixed centerline.',
            'Validation against data logged on the Western Formula Racing car.',
          ],
        },
      ],
    },
    {
      id: 'repository',
      title: 'GitHub Repository',
      blocks: [
        {
          type: 'links',
          items: [
            {
              label: 'Source code on GitHub',
              href: 'https://github.com/onursoran/vehicle-laptime-simulator',
              description: 'Public version with the illustrative car profile; team-specific car data is kept private.',
            },
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* P-03 · Soran Racing                                                         */
/* -------------------------------------------------------------------------- */

const soranRacing: Project = {
  slug: 'soran-racing',
  index: 'P-03',
  title: 'Soran Racing',
  category: 'Motorsport · Leadership',
  summary:
    'Founded and lead a competitive kart racing team competing in Canadian regional and national championships — building the team, securing sponsorship and coordinating race operations.',
  status: { label: 'Active', tone: 'ongoing' },
  role: 'Founder & Team Principal',
  context: 'Canadian regional and national karting championships',
  tags: ['Team leadership', 'Sponsorship', 'Race operations', 'Performance review', 'Karting'],
  cover: { kind: 'visual', visual: 'soran-racing-stats', label: 'Team at a glance' },
  stats: [
    { value: '5', label: 'Drivers' },
    { value: '$15,000+', label: 'Sponsorship secured' },
    { value: '9', label: 'Podium finishes' },
  ],
  contributionSummary:
    'Founded the team, secured over $15,000 in sponsorship, and coordinate race operations and collaborative performance reviews.',
  contributions: [
    'Founded Soran Racing and manage a team of 5 drivers and 11 total members.',
    'Secured over $15,000 in sponsorship funding.',
    'Coordinate race operations across championship events.',
    'Lead collaborative performance reviews with drivers and team members.',
    'Contributed to 9 podium finishes.',
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: 'Soran Racing is a competitive kart racing team I founded and lead as Team Principal; Stanley Houtorski joined as co-founder. The team competes in Canadian regional and national karting championships, and my role covers the organisation behind the drivers: building the team, funding it, and making sure it operates well on race weekends.',
        },
        {
          type: 'links',
          items: [
            {
              label: 'Soran Racing on Instagram',
              href: 'https://www.instagram.com/soranracing/',
              description: 'Race-weekend photos and team updates.',
            },
          ],
        },
      ],
    },
    {
      id: 'team',
      title: 'Team at a Glance',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '5', label: 'Drivers' },
            { value: '11', label: 'Team members' },
            { value: '$15,000+', label: 'Sponsorship secured' },
            { value: '9', label: 'Podium finishes' },
          ],
        },
      ],
    },
    {
      id: 'championships',
      title: 'Championships',
      blocks: [
        {
          type: 'list',
          items: ['TRAK', 'KartStars Canada', 'Ontario Interclub Challenge', 'Cup Karts North America'],
        },
        {
          type: 'table',
          caption: 'Selected results.',
          columns: ['Event', 'Championship', 'Driver', 'Result'],
          rows: [['2025 Race 8', 'TRAK', 'Stefano Rea', 'P2']],
        },
      ],
    },
    {
      id: 'leadership',
      title: 'Leadership and Operations',
      blocks: [
        {
          type: 'list',
          items: [
            '**Team building** — founded the team and manage 5 drivers within an 11-person organisation.',
            '**Sponsorship** — secured more than $15,000 in sponsorship funding to support the racing program.',
            '**Race operations** — coordinate the team’s operations at championship events.',
            '**Performance reviews** — run collaborative reviews with drivers and team members to identify where performance can improve.',
          ],
        },
      ],
    },
    {
      id: 'connection-to-engineering',
      title: 'Connection to Engineering',
      blocks: [
        {
          type: 'paragraph',
          text: 'Soran Racing is where my interest in vehicle performance became an interest in engineering. Reviewing performance with drivers kept raising questions about grip, braking and balance — the same questions I now study through my vehicle dynamics simulator and the Western Formula Racing brake-bias project.',
        },
        {
          type: 'related',
          slug: 'vehicle-dynamics-simulator',
          text: 'Explore the vehicle dynamics simulator.',
        },
      ],
    },
    {
      id: 'sponsorship',
      title: 'Sponsorship Proposal',
      blocks: [
        {
          type: 'paragraph',
          text: 'The team approaches sponsors with a season proposal that sets out what partners receive: tiered **Bronze, Gold and Platinum** packages, social-media and on-track exposure, and planned logo placements on the drivers’ race suits. Selected pages from the 2025 proposal:',
        },
        {
          type: 'gallery',
          items: [
            proposalPage('sponsorship-cover', 'Cover of the Soran Racing 2025 sponsorship proposal, with two team karts on track.', 'Cover'),
            proposalPage('sponsorship-packages', 'Package options page comparing Platinum, Gold and Bronze sponsorship tiers: logo size, digital media, banner, gear, paddock access and uniform placement.', 'Package options'),
            proposalPage('sponsorship-logo-locations', 'Race-suit diagrams from the front, side and back showing where Gold and Platinum sponsor logos are placed.', 'Logo locations on race suits'),
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'The 2025 proposal lists four drivers. The team has since added a fifth driver for the current season.',
        },
      ],
    },
    {
      id: 'gallery',
      title: 'Gallery',
      blocks: [
        {
          type: 'gallery',
          items: [
            {
              src: 'images/soran-racing/team-01.jpg',
              alt: 'Five Soran Racing team members kneeling on the grass in front of their karts in the paddock.',
              caption: 'The Soran Racing team in the paddock',
              width: 940,
              height: 627,
              aspect: '3/2',
            },
            photo('karting-04', 'Onur Kaan Soran in kart number 301 cornering, with another kart and the paddock buildings in the background.', 'Onur Kaan Soran · #301'),
            photo('karting-01', 'Nicolas Hulley in kart number 399 cornering in front of a red-and-black tyre wall, with another kart close behind.', 'Nicolas Hulley · #399'),
            photo('karting-02', 'Stanley Houtorski in kart number 343 turning into a corner past red-and-white kerbs.', 'Stanley Houtorski · #343'),
            photo('karting-03', 'Stefano Rea in kart number 255, racing wheel to wheel with another kart through a corner.', 'Stefano Rea · #255'),
            {
              src: 'images/soran-racing/results-01.jpg',
              alt: 'Stefano Rea smiling on the podium holding a trophy after finishing second.',
              caption: 'Stefano Rea · P2, 2025 TRAK Race 8',
              width: 544,
              height: 363,
              aspect: '3/2',
            },
          ],
        },
      ],
    },
    {
      id: 'instagram',
      title: 'On Instagram',
      blocks: [{ type: 'instagram', postId: 'DWUJhZKlbcV', caption: 'Soran Racing’s 2026 driver lineup announcement.' }],
    },
  ],
};

export const projects: Project[] = [brakeBias, simulator, soranRacing];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
