import { Search } from 'lucide-react';
import type { DimensionKey } from '../types';
import { DIMENSION_LABELS } from '../types';

interface Props {
  filterDim: DimensionKey;
  filterMin: number;
  onDimChange: (dim: DimensionKey) => void;
  onMinChange: (value: number) => void;
}

const ALL_KEYS = Object.keys(DIMENSION_LABELS) as DimensionKey[];

export function FilterBar({ filterDim, filterMin, onDimChange, onMinChange }: Props) {
  return (
    <div style={{
      position: 'fixed',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(4,20,12,0.92)',
      border: '1px solid rgba(58,170,122,0.3)',
      borderRadius: 40,
      padding: '10px 20px',
      backdropFilter: 'blur(12px)',
      zIndex: 100,
      color: '#a8dfc5',
      fontFamily: 'monospace',
      fontSize: 12,
    }}>
      <Search size={14} color="#3aaa7a" />

      <span style={{ whiteSpace: 'nowrap' }}>Min</span>

      <select
        value={filterDim}
        onChange={(e) => { onDimChange(e.target.value as DimensionKey); onMinChange(1); }}
        style={{
          background: 'rgba(8,35,20,0.9)',
          border: '1px solid rgba(58,170,122,0.4)',
          borderRadius: 6,
          color: '#e0fff4',
          fontFamily: 'monospace',
          fontSize: 11,
          padding: '3px 6px',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {ALL_KEYS.map((key) => (
          <option key={key} value={key}>{DIMENSION_LABELS[key]}</option>
        ))}
      </select>

      <span style={{ whiteSpace: 'nowrap' }}>≥</span>

      <input
        type="range"
        min={1}
        max={10}
        value={filterMin}
        onChange={(e) => onMinChange(Number(e.target.value))}
        style={{ width: 90, accentColor: '#3aaa7a' }}
      />

      <span style={{ color: '#e0fff4', fontWeight: 700, width: 16 }}>{filterMin}</span>
    </div>
  );
}
