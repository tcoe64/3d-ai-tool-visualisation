import type { AxisConfig, DimensionKey } from '../types';
import { DIMENSION_LABELS } from '../types';

interface Props {
  axisConfig: AxisConfig;
  onChange: (config: AxisConfig) => void;
}

const ALL_KEYS = Object.keys(DIMENSION_LABELS) as DimensionKey[];
const AXES = ['x', 'y', 'z'] as const;
const AXIS_COLORS = { x: '#ff6666', y: '#66ff88', z: '#6699ff' };

export function AxisSelector({ axisConfig, onChange }: Props) {
  function handleChange(axis: 'x' | 'y' | 'z', value: DimensionKey) {
    const swapAxis = AXES.find((a) => a !== axis && axisConfig[a] === value);
    const updated = { ...axisConfig, [axis]: value };
    if (swapAxis) updated[swapAxis] = axisConfig[axis];
    onChange(updated);
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      background: 'rgba(4,20,12,0.92)',
      border: '1px solid rgba(58,170,122,0.3)',
      borderRadius: 12,
      padding: '14px 18px',
      backdropFilter: 'blur(12px)',
      zIndex: 100,
      fontFamily: 'monospace',
      fontSize: 12,
      color: '#a8dfc5',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minWidth: 220,
    }}>
      <div style={{ color: '#e0fff4', fontWeight: 700, marginBottom: 2, fontSize: 11 }}>
        AXIS MAPPING
      </div>

      {AXES.map((axis) => (
        <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            color: AXIS_COLORS[axis],
            fontWeight: 700,
            width: 14,
            textTransform: 'uppercase',
          }}>
            {axis}
          </span>
          <select
            value={axisConfig[axis]}
            onChange={(e) => handleChange(axis, e.target.value as DimensionKey)}
            style={{
              flex: 1,
              background: 'rgba(8,35,20,0.9)',
              border: '1px solid rgba(58,170,122,0.4)',
              borderRadius: 6,
              color: '#e0fff4',
              fontFamily: 'monospace',
              fontSize: 11,
              padding: '4px 6px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {ALL_KEYS.map((key) => (
              <option key={key} value={key}>
                {DIMENSION_LABELS[key]}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div style={{ fontSize: 10, color: '#3a6a52', marginTop: 2, lineHeight: 1.5 }}>
        Color = Reliability &nbsp;|&nbsp; Size = Cost
      </div>
    </div>
  );
}
