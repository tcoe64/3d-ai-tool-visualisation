import { motion, AnimatePresence } from 'framer-motion';
import type { PersonaKey } from '../types';
import { PERSONA_LABELS, PERSONA_INSIGHTS } from '../types';

interface Props {
  persona: PersonaKey | null;
}

export function PersonaInsightCard({ persona }: Props) {
  return (
    <AnimatePresence>
      {persona && (
        <motion.div
          key={persona}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{   y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: 72,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(4,20,12,0.92)',
            border: '1px solid rgba(58,170,122,0.35)',
            borderRadius: 10,
            padding: '10px 18px',
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            fontFamily: 'monospace',
            maxWidth: 480,
            width: '90vw',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#3aaa7a', fontWeight: 700, fontSize: 11 }}>
            {PERSONA_LABELS[persona].toUpperCase()}
          </span>
          <span style={{ color: '#6aab8a', fontSize: 11 }}> — </span>
          <span style={{ color: '#a8dfc5', fontSize: 11 }}>{PERSONA_INSIGHTS[persona]}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
