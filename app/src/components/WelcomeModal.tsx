import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CONTROLS = [
  { icon: '🖱', label: 'Drag',   desc: 'Rotate the scene' },
  { icon: '🖱', label: 'Scroll', desc: 'Zoom in / out' },
  { icon: '👆', label: 'Click',  desc: 'Open score breakdown' },
  { icon: '🎛', label: 'Axes',   desc: 'Remap X / Y / Z dimensions' },
  { icon: '🔍', label: 'Slider', desc: 'Dim tools below setup threshold' },
];

export function WelcomeModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,8,4,0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{   scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(4,20,12,0.97)',
              border: '1px solid rgba(58,170,122,0.4)',
              borderRadius: 16,
              padding: '32px 36px 28px',
              maxWidth: 420,
              width: '90vw',
              fontFamily: 'monospace',
              color: '#a8dfc5',
            }}
          >
            <h2 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: '#e0fff4' }}>
              3D AI Tool Map
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6aab8a', lineHeight: 1.6 }}>
              Each sphere represents an AI tool, positioned in 3D space by the
              dimensions you care about most. All scores run from 1–10 where a higher
              number is always better. Colour shows reliability (green = high);
              size shows cost value (larger = better value).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {CONTROLS.map(({ icon, label, desc }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{icon}</span>
                  <span style={{ color: '#3aaa7a', fontSize: 12, width: 52 }}>{label}</span>
                  <span style={{ fontSize: 12, color: '#a8dfc5' }}>{desc}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '10px 0',
                background: 'rgba(58,170,122,0.2)',
                border: '1px solid rgba(58,170,122,0.5)',
                borderRadius: 8,
                color: '#e0fff4',
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
