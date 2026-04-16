import type { PersonaKey } from '../types';
import { PERSONA_LABELS } from '../types';

interface Props {
  active: PersonaKey | null;
  onChange: (persona: PersonaKey | null) => void;
}

const PERSONAS = Object.keys(PERSONA_LABELS) as PersonaKey[];

export function PersonaBar({ active, onChange }: Props) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(4,20,12,0.92)',
      border: '1px solid rgba(58,170,122,0.3)',
      borderRadius: 40,
      padding: '8px 14px',
      backdropFilter: 'blur(12px)',
      zIndex: 100,
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {PERSONAS.map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(isActive ? null : key)}
            style={{
              padding: '5px 12px',
              borderRadius: 20,
              border: `1px solid ${isActive ? '#3aaa7a' : 'rgba(58,170,122,0.25)'}`,
              background: isActive ? 'rgba(58,170,122,0.25)' : 'transparent',
              color: isActive ? '#e0fff4' : '#6aab8a',
              fontFamily: 'monospace',
              fontSize: 11,
              fontWeight: isActive ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {PERSONA_LABELS[key]}
          </button>
        );
      })}
    </div>
  );
}
