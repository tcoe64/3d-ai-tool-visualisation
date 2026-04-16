import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ToolWithCoords, PersonaKey } from '../types';
import { PERSONA_LABELS } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';

interface Props {
  tool: ToolWithCoords | null;
  onClose: () => void;
  persona: PersonaKey | null;
}

const DIMENSIONS = [
  { key: 'setup',       label: 'Ease of Setup' },
  { key: 'connections', label: 'Connections'   },
  { key: 'cost',        label: 'Cost (Value)'  },
  { key: 'agentCap',    label: 'Agent Capability' },
  { key: 'reliability', label: 'Reliability'   },
] as const;

function ScoreBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        flex: 1,
        height: 6,
        background: 'rgba(8,35,20,0.8)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${value * 10}%`,
          height: '100%',
          background: `hsl(${value * 12}, 80%, 55%)`,
          borderRadius: 3,
          transition: 'width 0.5s ease',
        }} />
      </div>
      <span style={{ color: '#a8dfc5', fontSize: 12, width: 16, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export function DetailPanel({ tool, onClose, persona }: Props) {
  const isMobile = useIsMobile();

  const mobileStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '55vh',
    overflowY: 'auto',
    background: 'rgba(4,20,12,0.97)',
    border: 'none',
    borderTop: '1px solid rgba(58,170,122,0.3)',
    borderRadius: '16px 16px 0 0',
    padding: '20px 20px 24px',
    backdropFilter: 'blur(12px)',
    zIndex: 150,
    color: '#e0fff4',
    fontFamily: 'monospace',
  };

  const desktopStyle: React.CSSProperties = {
    position: 'fixed',
    top: 80,
    right: 16,
    width: 280,
    background: 'rgba(4,20,12,0.92)',
    border: '1px solid rgba(58,170,122,0.3)',
    borderRadius: 12,
    padding: '20px 20px 24px',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
    color: '#e0fff4',
    fontFamily: 'monospace',
  };

  const mobileAnimation = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  };

  const desktopAnimation = {
    initial: { x: 320, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 320, opacity: 0 },
  };

  const anim = isMobile ? mobileAnimation : desktopAnimation;

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          key={tool.name}
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={isMobile ? mobileStyle : desktopStyle}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4a8a6a',
              padding: 4,
            }}
          >
            <X size={16} />
          </button>

          <h2 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#e0fff4' }}>
            {tool.name}
          </h2>

          {persona ? (
            <>
              <div style={{ fontSize: 10, color: '#3aaa7a', fontWeight: 700, marginBottom: 4 }}>
                {PERSONA_LABELS[persona].toUpperCase()}
              </div>
              <p style={{ margin: '0 0 16px', fontSize: 11, color: '#6aab8a', lineHeight: 1.6 }}>
                {tool.personas[persona]?.fit
                  ? tool.personas[persona].justification
                  : 'Not recommended for this use case.'}
              </p>
            </>
          ) : (
            <p style={{ margin: '0 0 16px', fontSize: 11, color: '#6aab8a', lineHeight: 1.6 }}>
              {tool.description}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DIMENSIONS.map(({ key, label }) => (
              <div key={key}>
                <div style={{ fontSize: 11, color: '#4a8a6a', marginBottom: 4 }}>{label}</div>
                <ScoreBar value={tool[key]} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
