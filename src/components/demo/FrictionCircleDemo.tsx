import { useId, useState } from 'react';
import { Info } from 'lucide-react';

/**
 * Interactive, illustrative friction-circle demonstration.
 * Idealised isotropic limit in normalised units (force / μFz). It does NOT run the Python model.
 */
const C = 180;
const R = 140;

const PRESETS = [
  { label: 'Straight-line braking', fy: 0, fx: -100 },
  { label: 'Trail braking', fy: 60, fx: -70 },
  { label: 'Mid-corner', fy: 100, fx: 0 },
  { label: 'Corner exit', fy: 50, fx: 60 },
];

export function FrictionCircleDemo() {
  const id = useId();
  const [fy, setFy] = useState(60);
  const [fx, setFx] = useState(-60);

  const lat = fy / 100;
  const lon = fx / 100;
  const available = Math.sqrt(Math.max(0, 1 - lat * lat));
  const utilisation = Math.hypot(lat, lon);
  const saturated = utilisation > 1.0001;

  const sx = C + lat * R;
  const sy = C - lon * R;
  const dx = C + (lat / Math.max(utilisation, 1)) * R;
  const dy = C - (lon / Math.max(utilisation, 1)) * R;

  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const mode = fx < 0 ? 'braking' : fx > 0 ? 'acceleration' : 'no longitudinal';

  return (
    <section className="demo" aria-labelledby={`${id}-title`}>
      <header className="demo__header">
        <p className="mono accent demo__kicker">Interactive · Illustrative</p>
        <h3 id={`${id}-title`} className="demo__title">
          Friction-circle explorer
        </h3>
        <p className="demo__note">
          <Info size={14} aria-hidden="true" />
          Idealised circular limit in normalised units (force ÷ μF<sub>z</sub>). This browser demo illustrates the concept
          and is not output from the Python simulator.
        </p>
      </header>

      <div className="demo__body">
        <svg viewBox="0 0 360 360" className="demo__plot" aria-hidden="true">
          {[0.25, 0.5, 0.75].map((k) => (
            <circle key={k} cx={C} cy={C} r={k * R} className="fc-ring" />
          ))}
          <circle cx={C} cy={C} r={R} className="fc-ring fc-ring--limit" />
          <line x1={C - R - 20} y1={C} x2={C + R + 20} y2={C} className="fc-axis" />
          <line x1={C} y1={C - R - 20} x2={C} y2={C + R + 20} className="fc-axis" />

          {/* Longitudinal capacity at the chosen lateral demand */}
          <line x1={sx} y1={C - available * R} x2={sx} y2={C + available * R} className="demo__capacity" />
          <circle cx={sx} cy={C - available * R} r={3} className="demo__capacity-end" />
          <circle cx={sx} cy={C + available * R} r={3} className="demo__capacity-end" />

          <line x1={C} y1={C} x2={dx} y2={dy} className="fc-vector" />
          {saturated && <line x1={dx} y1={dy} x2={sx} y2={sy} className="demo__excess" />}
          <circle cx={sx} cy={sy} r={6} className={saturated ? 'demo__point demo__point--over' : 'demo__point'} />

          <g className="fc-text">
            <text x={C + 6} y={C - R - 8}>ACCEL</text>
            <text x={C + 6} y={C + R + 16}>BRAKE</text>
            <text x={C + R + 18} y={C - 6} textAnchor="end">LAT</text>
          </g>
        </svg>

        <div className="demo__controls">
          <div className="field">
            <label htmlFor={`${id}-fy`} className="field__label">
              Lateral demand <span className="mono">F<sub>y</sub></span>
            </label>
            <input id={`${id}-fy`} type="range" min={-100} max={100} step={1} value={fy} onChange={(e) => setFy(Number(e.target.value))} aria-valuetext={`${pct(lat)} of mu F z`} />
            <span className="field__value mono">{pct(lat)}</span>
          </div>
          <div className="field">
            <label htmlFor={`${id}-fx`} className="field__label">
              Longitudinal demand <span className="mono">F<sub>x</sub></span>
            </label>
            <input id={`${id}-fx`} type="range" min={-100} max={100} step={1} value={fx} onChange={(e) => setFx(Number(e.target.value))} aria-valuetext={`${pct(lon)} of mu F z, ${mode}`} />
            <span className="field__value mono">{pct(lon)}</span>
          </div>

          <div className="demo__presets" role="group" aria-label="Example scenarios">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="chip"
                aria-pressed={p.fx === fx && p.fy === fy}
                onClick={() => {
                  setFy(p.fy);
                  setFx(p.fx);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <dl className="demo__readout" aria-live="polite">
            <div>
              <dt>Longitudinal capacity at this lateral demand</dt>
              <dd className="mono">±{pct(available)}</dd>
            </div>
            <div>
              <dt>Combined utilisation</dt>
              <dd className={`mono ${saturated ? 'is-over' : ''}`}>{pct(utilisation)}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd className={saturated ? 'is-over' : 'is-ok'}>
                {saturated ? 'Demand exceeds the friction limit — tire saturates' : 'Within the friction limit'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
