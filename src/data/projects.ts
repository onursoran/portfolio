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

const placeholderImage = (
  placeholder: string,
  slot: string,
  caption?: string,
  aspect: Media['aspect'] = '16/9',
): Media => ({
  alt: placeholder,
  placeholder,
  slot,
  caption,
  aspect,
});

/** A Soran Racing photo: 2000 px full size (lightbox) plus a 900 px copy for the grid. */
const photo = (name: string, alt: string): Media => ({
  src: `images/soran-racing/${name}.jpg`,
  srcSet: `images/soran-racing/${name}-900.jpg 900w, images/soran-racing/${name}.jpg 2000w`,
  sizes: '(min-width: 900px) 33vw, 100vw',
  alt,
  width: 2000,
  height: 1333,
  aspect: '3/2',
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
          caption: 'Requirements matrix (qualitative). Targets marked TBD are not yet defined.',
          columns: ['ID', 'Requirement', 'Source', 'Target', 'Verification (planned)'],
          rows: [
            ['R-01', 'Adjust front/rear bias by driving the existing Tilton cable adjuster', 'Project brief', 'TBD', 'Bench test'],
            ['R-02', 'Package within the existing pedal box without interfering with pedal travel', 'Project brief', 'TBD', 'CAD clearance check'],
            ['R-03', 'Provide position feedback of the adjuster setting', 'Project brief', 'TBD', 'Bench test'],
            ['R-04', 'Leave the mechanical, driver-actuated hydraulic braking path unchanged', 'FSAE rules', '—', 'Design review'],
            ['R-05', 'Define safe system behaviour on electrical power loss', 'Project brief', 'TBD', 'Fault-injection test'],
            ['R-06', 'Integrate mechanical, electrical and firmware subsystems', 'Project brief', '—', 'Integration review'],
          ],
        },
        {
          type: 'callout',
          tone: 'placeholder',
          title: 'Pending',
          text: 'Quantified targets — adjustment range, resolution, actuation time and torque margin — will be added once measured or derived.',
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
        {
          type: 'gallery',
          items: [
            placeholderImage('Pedal-box assembly photograph or CAD view', 'images/brake-bias/pedal-box-assembly.jpg', 'Existing pedal box and balance bar.', '4/3'),
            placeholderImage('Mechanical sketch — cable adjuster interface', 'images/brake-bias/adjuster-interface-sketch.jpg', 'Interface between actuator and cable adjuster.', '4/3'),
          ],
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
        {
          type: 'callout',
          tone: 'placeholder',
          title: 'To be documented',
          text: 'Findings and conclusions from this research will be added here as each topic is completed.',
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
        {
          type: 'table',
          placeholder: true,
          caption: 'Actuator comparison — candidates not yet selected.',
          columns: ['Candidate', 'Type', 'Torque', 'Travel / resolution', 'Feedback', 'Mass', 'Notes'],
          rows: [['—', '—', '—', '—', '—', '—', '—']],
        },
        {
          type: 'gallery',
          items: [
            placeholderImage('Functional block diagram', 'images/brake-bias/functional-block-diagram.png', 'Detailed functional block diagram — controller, actuator, sensing and power.', '16/9'),
            placeholderImage('Electrical schematic', 'images/brake-bias/electrical-schematic.png', 'Actuator drive and sensing schematic.', '16/9'),
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
          type: 'callout',
          tone: 'placeholder',
          title: 'Planned analysis',
          text: 'Results of this analysis are not yet available and will be published here once completed.',
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
        {
          type: 'gallery',
          title: 'Design and test media',
          items: [
            placeholderImage('SolidWorks CAD screenshot — actuator assembly', 'images/brake-bias/cad-actuator-assembly.jpg', undefined, '16/9'),
            placeholderImage('SolidWorks CAD screenshot — pedal-box integration', 'images/brake-bias/cad-pedal-box-integration.jpg', undefined, '16/9'),
            placeholderImage('Testing results', 'images/brake-bias/test-results.png', undefined, '16/9'),
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* P-02 · Python Vehicle Dynamics Simulator                                    */
/* -------------------------------------------------------------------------- */

const simulator: Project = {
  slug: 'vehicle-dynamics-simulator',
  index: 'P-02',
  title: 'Python Vehicle Dynamics Simulator',
  category: 'Computational Modeling · Software',
  summary:
    'A Python simulator modeling tire forces, friction-circle limits and bicycle-model vehicle dynamics to study how lateral grip demand reduces the longitudinal force available for braking and acceleration.',
  status: {
    label: 'Developed',
    tone: 'complete',
    note: 'Source code and result figures are being prepared for publication.',
  },
  role: 'Independent project — sole developer',
  timeline: 'Independent',
  tags: ['Python', 'NumPy', 'Matplotlib', 'Vehicle dynamics', 'Tire modeling', 'Numerical optimization'],
  cover: { kind: 'visual', visual: 'friction-circle', label: 'Friction-circle schematic' },
  /** Add the GitHub URL when the repository is public. */
  repoUrl: '',
  contributionSummary:
    'Designed and implemented the simulator independently — tire models, vehicle model, parameter sweeps, optimization and visualization.',
  contributions: [
    'Designed and implemented the entire simulator independently in Python.',
    'Modeled longitudinal and lateral tire forces using slip ratio and slip angle.',
    'Implemented combined tire-force limits through a friction-circle constraint.',
    'Built bicycle-model vehicle dynamics for steady-state cornering analysis.',
    'Implemented numerical parameter sweeps and optimization of operating parameters with NumPy.',
    'Produced engineering plots of the results with Matplotlib.',
  ],
  sections: [
    {
      id: 'problem-motivation',
      title: 'Problem and Motivation',
      blocks: [
        {
          type: 'paragraph',
          text: 'A tire produces cornering force and braking or driving force from the same contact patch, and the total is limited by friction. The question the simulator investigates is simple to state: **as lateral force demand increases, how much longitudinal force is left for braking or acceleration?**',
        },
        {
          type: 'paragraph',
          text: 'That question sits underneath much of vehicle performance — how late a car can brake into a corner, how early it can accelerate out — and it is central to brake-bias design, where each axle’s braking capacity depends on how much grip it is already using. I built the simulator to answer it quantitatively rather than by feel, and to support the Western Formula Racing brake-bias project.',
        },
      ],
    },
    {
      id: 'mathematical-models',
      title: 'Mathematical Models',
      blocks: [
        {
          type: 'paragraph',
          text: 'The simulator is built on standard vehicle-dynamics relations. Notation below follows common textbook form; implementation details are in the repository.',
        },
        {
          type: 'equation',
          label: 'Eq. 1 — Slip ratio',
          expression: 'κ = ( ω · R_{e} − V_{x} ) / V_{x}',
          caption: 'ω — wheel angular speed, R_e — effective rolling radius, V_x — longitudinal wheel speed.',
        },
        {
          type: 'equation',
          label: 'Eq. 2 — Slip angles (bicycle model)',
          expression: 'α_{f} = δ − arctan( ( v_{y} + a · r ) / v_{x} ),   α_{r} = − arctan( ( v_{y} − b · r ) / v_{x} )',
          caption: 'δ — steer angle, r — yaw rate, a / b — CG to front / rear axle distances.',
        },
        {
          type: 'equation',
          label: 'Eq. 3 — Friction circle',
          expression: '√( F_{x}^{2} + F_{y}^{2} ) ≤ μ · F_{z}',
          caption: 'The combined tire force cannot exceed the friction limit for the given normal load.',
        },
        {
          type: 'equation',
          label: 'Eq. 4 — Available longitudinal force',
          expression: 'F_{x,avail} = √( ( μ · F_{z} )^{2} − F_{y}^{2} )',
          caption: 'Rearranging Eq. 3: the longitudinal capacity remaining for a given lateral demand.',
        },
        {
          type: 'equation',
          label: 'Eq. 5 — Steady-state cornering',
          expression: 'm · V^{2} / R = F_{y,f} + F_{y,r},     a · F_{y,f} − b · F_{y,r} = 0',
          caption: 'Lateral force balance and yaw-moment balance for the bicycle model in steady state.',
        },
      ],
    },
    {
      id: 'simulation-architecture',
      title: 'Simulation Architecture',
      blocks: [
        {
          type: 'paragraph',
          text: 'The simulator is organised as a pipeline: parameters flow through the tire and vehicle models, are constrained by the friction limit, and are evaluated across parameter grids before being plotted.',
        },
        {
          type: 'pipeline',
          steps: [
            { title: 'Parameters', description: 'Vehicle and tire inputs: mass, geometry, friction coefficient, operating conditions.' },
            { title: 'Tire model', description: 'Longitudinal and lateral force from slip ratio and slip angle.' },
            { title: 'Combined limit', description: 'Friction-circle constraint on the combined tire force.' },
            { title: 'Vehicle model', description: 'Bicycle model; steady-state cornering and longitudinal limits.' },
            { title: 'Sweeps & optimization', description: 'Vectorised NumPy parameter sweeps and operating-point optimization.' },
            { title: 'Visualization', description: 'Matplotlib plots of envelopes, characteristics and sweep results.' },
          ],
        },
        {
          type: 'callout',
          tone: 'placeholder',
          title: 'Repository structure',
          text: 'A module-level breakdown of the code will be added when the repository is published.',
        },
      ],
    },
    {
      id: 'tire-force-modeling',
      title: 'Tire Force Modeling',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tire force rises with slip — slip ratio for longitudinal force, slip angle for lateral force — before saturating at the friction limit. The simulator models both characteristics and then applies the combined-force limit, so a tire that is cornering hard has correspondingly less longitudinal capacity.',
        },
        {
          type: 'callout',
          tone: 'placeholder',
          title: 'Model formulation',
          text: 'The specific tire model formulation and its parameters will be documented here alongside the published source code.',
        },
        {
          type: 'gallery',
          items: [
            placeholderImage('Tire-force characteristic — longitudinal force vs slip ratio', 'images/simulator/tire-fx-vs-slip-ratio.png', undefined, '4/3'),
            placeholderImage('Tire-force characteristic — lateral force vs slip angle', 'images/simulator/tire-fy-vs-slip-angle.png', undefined, '4/3'),
          ],
        },
      ],
    },
    {
      id: 'numerical-optimization',
      title: 'Numerical Optimization',
      blocks: [
        {
          type: 'paragraph',
          text: 'Rather than evaluating single operating points, the simulator sweeps parameters across numerical ranges using vectorised NumPy arrays and identifies the operating parameters that perform best within the friction-circle constraint.',
        },
        {
          type: 'code',
          language: 'python',
          illustrative: true,
          caption: 'Illustrative example of the vectorised approach — not an excerpt from the repository.',
          code: `import numpy as np

def available_longitudinal_force(fy, mu, fz):
    """Longitudinal capacity left for a given lateral demand (friction circle)."""
    limit = mu * fz
    return np.sqrt(np.clip(limit**2 - fy**2, 0.0, None))

# Evaluate a full sweep of lateral demand in one vectorised call
fy = np.linspace(0.0, 1.0, 201)          # normalised lateral demand
fx = available_longitudinal_force(fy, mu=1.0, fz=1.0)`,
        },
        {
          type: 'callout',
          tone: 'placeholder',
          title: 'To be documented',
          text: 'Objective function, decision variables and solution method will be described here with the published code.',
        },
      ],
    },
    {
      id: 'results-visualization',
      title: 'Results and Visualization',
      blocks: [
        {
          type: 'paragraph',
          text: 'The interactive demonstration below shows the core relationship the simulator studies. It is a simplified browser illustration — the published figures from the Python model will appear in the gallery underneath.',
        },
        { type: 'demo', demo: 'friction-circle' },
        {
          type: 'gallery',
          title: 'Simulation figures',
          items: [
            placeholderImage('Friction-circle plot', 'images/simulator/friction-circle.png', undefined, '4/3'),
            placeholderImage('Cornering-performance graph', 'images/simulator/cornering-performance.png', undefined, '4/3'),
            placeholderImage('Longitudinal acceleration envelope', 'images/simulator/longitudinal-envelope.png', undefined, '4/3'),
            placeholderImage('Parameter-sweep results', 'images/simulator/parameter-sweep.png', undefined, '4/3'),
            placeholderImage('Code screenshot', 'images/simulator/code-screenshot.png', undefined, '4/3'),
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'No numerical results are presented until the figures from the Python model are published.',
        },
      ],
    },
    {
      id: 'brake-bias-relationship',
      title: 'Relationship to Brake-Bias Design',
      blocks: [
        {
          type: 'paragraph',
          text: 'Brake bias decides how total braking force is divided between axles; the friction circle decides how much longitudinal force each axle can actually use. Combining the two shows why a fixed bias can only be ideal at one operating condition — and why an adjustable system is useful when load transfer and cornering demand change through a lap.',
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
        { type: 'paragraph', text: '**Limitations of the current modeling approach**' },
        {
          type: 'list',
          items: [
            'The bicycle model combines the left and right tires of each axle, so lateral load transfer is not represented.',
            'Steady-state analysis does not capture transient yaw or weight-transfer dynamics.',
            'A circular friction limit treats longitudinal and lateral grip as equal; real tires are closer to an ellipse.',
            'The model has not been validated against measured vehicle or tire data.',
          ],
        },
        { type: 'paragraph', text: '**Candidate improvements**' },
        {
          type: 'list',
          items: [
            'Four-wheel model with lateral and longitudinal load transfer.',
            'Transient simulation by numerically integrating the equations of motion.',
            'Friction-ellipse or empirical combined-slip tire model.',
            'Validation against test data when available.',
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
              href: '',
              description: 'Repository link will be added when the code is published.',
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
          text: 'Soran Racing is a competitive kart racing team I founded and lead as Team Principal. The team competes in Canadian regional and national karting championships, and my role covers the organisation behind the drivers: building the team, funding it, and making sure it operates well on race weekends.',
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
          placeholder: true,
          caption: 'Race results — to be added.',
          columns: ['Event', 'Championship', 'Class', 'Result'],
          rows: [['—', '—', '—', '—']],
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
      id: 'gallery',
      title: 'Gallery',
      blocks: [
        {
          type: 'gallery',
          items: [
            photo('karting-01', 'Kart number 399 cornering in front of a red-and-black tyre wall, with another kart close behind.'),
            photo('karting-02', 'Kart number 343 turning into a corner past red-and-white kerbs.'),
            photo('karting-03', 'Two karts battling side by side through a corner.'),
            photo('karting-04', 'Kart number 311 cornering, with another kart and the paddock buildings in the background.'),
            placeholderImage('Team photograph', 'images/soran-racing/team-01.jpg', undefined, '3/2'),
            placeholderImage('Race results', 'images/soran-racing/results-01.jpg', undefined, '3/2'),
            placeholderImage('Sponsorship materials', 'images/soran-racing/sponsorship-01.jpg', undefined, '3/2'),
          ],
        },
      ],
    },
  ],
};

export const projects: Project[] = [brakeBias, simulator, soranRacing];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
