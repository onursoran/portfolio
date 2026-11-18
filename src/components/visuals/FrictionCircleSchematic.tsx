/**
 * Original schematic of the friction circle (combined tire-force limit) in normalised units.
 * The highlighted vector is an example point on the limit (0.6² + 0.8² = 1), not a simulation result.
 */
interface Props {
  variant?: 'hero' | 'cover';
  className?: string;
}

const C = 260;
const R = 200;
const RINGS = [0.25, 0.5, 0.75, 1];

export function FrictionCircleSchematic({ variant = 'hero', className = '' }: Props) {
  const detailed = variant === 'hero';
  const px = C + 0.6 * R;
  const py = C + 0.8 * R;

  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const major = i % 6 === 0;
    const r1 = R + 4;
    const r2 = R + (major ? 14 : 8);
    return (
      <line
        key={i}
        x1={C + r1 * Math.cos(a)}
        y1={C + r1 * Math.sin(a)}
        x2={C + r2 * Math.cos(a)}
        y2={C + r2 * Math.sin(a)}
        className={major ? 'fc-tick fc-tick--major' : 'fc-tick'}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 520 520"
      className={`fc-schematic fc-schematic--${variant} ${className}`.trim()}
      role="img"
      aria-label="Schematic friction circle: longitudinal force on the vertical axis, lateral force on the horizontal axis, with the combined force limited to a circle of radius mu times normal load."
    >
      {RINGS.map((k) => (
        <circle key={k} cx={C} cy={C} r={k * R} className={k === 1 ? 'fc-ring fc-ring--limit' : 'fc-ring'} />
      ))}
      {ticks}

      <line x1={C - R - 30} y1={C} x2={C + R + 30} y2={C} className="fc-axis" />
      <line x1={C} y1={C - R - 30} x2={C} y2={C + R + 30} className="fc-axis" />

      {/* Quadrant being used: braking while cornering */}
      <path d={`M ${C + R} ${C} A ${R} ${R} 0 0 1 ${C} ${C + R}`} className="fc-arc" />

      <line x1={px} y1={C} x2={px} y2={py} className="fc-proj" />
      <line x1={C} y1={py} x2={px} y2={py} className="fc-proj" />
      <line x1={C} y1={C} x2={px} y2={py} className="fc-vector draw" />
      <circle cx={px} cy={py} r={5} className="fc-point" />
      <circle cx={C} cy={C} r={3} className="fc-origin" />

      {detailed && (
        <g className="fc-text">
          <text x={C + 8} y={C - R - 16}>+F<tspan baselineShift="sub" className="fc-sub">x</tspan> ACCEL</text>
          <text x={C + 8} y={C + R + 26}>−F<tspan baselineShift="sub" className="fc-sub">x</tspan> BRAKE</text>
          <text x={C + R + 28} y={C - 8} textAnchor="end">+F<tspan baselineShift="sub" className="fc-sub">y</tspan></text>
          <text x={C - R - 28} y={C - 8}>−F<tspan baselineShift="sub" className="fc-sub">y</tspan></text>
          {RINGS.slice(0, 3).map((k) => (
            <text key={k} x={C - 6} y={C - k * R - 5} textAnchor="end" className="fc-text--dim">
              {k.toFixed(2)}
            </text>
          ))}
          <text x={C - 6} y={C - R - 5} textAnchor="end" className="fc-text--accent">μF<tspan baselineShift="sub" className="fc-sub">z</tspan></text>
          <text x={px + 10} y={C - 8} className="fc-text--dim">F<tspan baselineShift="sub" className="fc-sub">y</tspan></text>
          <text x={C - 10} y={py + 4} textAnchor="end" className="fc-text--dim">F<tspan baselineShift="sub" className="fc-sub">x,avail</tspan></text>
          <text x={24} y={30} className="fc-text--dim">FIG.00 · SCHEMATIC · NORMALISED</text>
          <text x={24} y={50}>√(F<tspan baselineShift="sub" className="fc-sub">x</tspan>² + F<tspan baselineShift="sub" className="fc-sub">y</tspan>²) ≤ μF<tspan baselineShift="sub" className="fc-sub">z</tspan></text>
        </g>
      )}
    </svg>
  );
}
