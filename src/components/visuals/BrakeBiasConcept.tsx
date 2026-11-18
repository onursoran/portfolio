/**
 * Concept-level signal/force path for the electromechanical brake-bias project,
 * drawn from the project brief. Not a design drawing: no components are selected.
 */
interface BoxProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  w?: number;
  tone?: 'default' | 'accent' | 'existing';
}

function Box({ x, y, label, sub, w = 130, tone = 'default' }: BoxProps) {
  const h = 46;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} className={`dg-box dg-box--${tone}`} />
      <text x={x + w / 2} y={y + (sub ? 20 : 28)} textAnchor="middle" className="dg-label">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 36} textAnchor="middle" className="dg-sub">
          {sub}
        </text>
      )}
    </g>
  );
}

export function BrakeBiasConcept({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 330"
      className={`diagram ${className}`.trim()}
      role="img"
      aria-label="Concept diagram: driver input goes to a controller, which drives an actuator; the actuator turns the existing Tilton cable adjuster, which sets the balance bar between front and rear master cylinders. Position feedback returns from the actuator to the controller. The brake pedal still acts directly on the balance bar."
    >
      <defs>
        <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="dg-arrowhead" />
        </marker>
      </defs>

      <text x={20} y={26} className="dg-domain">ELECTRICAL · FIRMWARE</text>
      <text x={380} y={26} className="dg-domain dg-domain--accent">ELECTROMECHANICAL</text>
      <text x={560} y={26} className="dg-domain">MECHANICAL · EXISTING</text>

      <Box x={20} y={40} label="Driver input" sub="Bias request" />
      <Box x={200} y={40} label="Controller" sub="Firmware" />
      <Box x={380} y={40} label="Actuator" sub="Selection open" tone="accent" />
      <Box x={560} y={40} label="Cable adjuster" sub="Tilton · existing" tone="existing" />

      <line x1={150} y1={63} x2={198} y2={63} className="dg-line" markerEnd="url(#dg-arrow)" />
      <line x1={330} y1={63} x2={378} y2={63} className="dg-line" markerEnd="url(#dg-arrow)" />
      <line x1={510} y1={63} x2={558} y2={63} className="dg-line dg-line--accent" markerEnd="url(#dg-arrow)" />

      <path d="M 445 86 L 445 126 L 265 126 L 265 88" className="dg-line dg-line--dashed" markerEnd="url(#dg-arrow)" />
      <text x={355} y={144} textAnchor="middle" className="dg-sub">Position feedback</text>

      <line x1={625} y1={86} x2={625} y2={168} className="dg-line" markerEnd="url(#dg-arrow)" />
      <text x={634} y={132} className="dg-sub">Cable rotation</text>

      <Box x={380} y={170} label="Brake pedal" sub="Driver force" tone="existing" />
      <Box x={560} y={170} label="Balance bar" sub="Existing" tone="existing" />
      <line x1={510} y1={193} x2={558} y2={193} className="dg-line" markerEnd="url(#dg-arrow)" />

      <path d="M 625 216 L 625 238 L 480 238 L 480 258" className="dg-line" markerEnd="url(#dg-arrow)" />
      <path d="M 625 238 L 640 238 L 640 258" className="dg-line" markerEnd="url(#dg-arrow)" />
      <Box x={420} y={260} w={120} label="Front MC" sub="Front circuit" tone="existing" />
      <Box x={580} y={260} w={120} label="Rear MC" sub="Rear circuit" tone="existing" />

      <g className="dg-note">
        <line x1={20} y1={196} x2={20} y2={298} className="dg-line dg-line--accent" />
        <text x={32} y={212}>Hydraulic path unchanged.</text>
        <text x={32} y={232}>The actuator only moves the</text>
        <text x={32} y={252}>balance point — no brake-by-wire.</text>
        <text x={32} y={284} className="dg-sub">CONCEPT · NOT A DESIGN DRAWING</text>
      </g>
    </svg>
  );
}
