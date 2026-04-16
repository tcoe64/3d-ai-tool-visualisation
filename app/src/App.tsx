import { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import rawTools from './data/tools.json';
import { mapToCoords } from './utils/coordinates';
import type { ToolWithCoords, AxisConfig, DimensionKey, PersonaKey } from './types';
import { DEFAULT_AXIS_CONFIG } from './types';
import { ToolNode } from './components/ToolNode';
import { ConnectionLines } from './components/ConnectionLines';
import { DetailPanel } from './components/DetailPanel';
import { FilterBar } from './components/FilterBar';
import { AxisLabels } from './components/AxisLabels';
import { AxisSelector } from './components/AxisSelector';
import { WelcomeModal } from './components/WelcomeModal';
import { PersonaBar } from './components/PersonaBar';
import { PersonaInsightCard } from './components/PersonaInsightCard';

const WELCOME_KEY = 'ai3d_welcome_seen';

// Smoothly lerps OrbitControls target toward a goal point
function CameraRig({ target }: { target: THREE.Vector3 }) {
  const controlsRef = useRef<any>(null);
  const current = useRef(new THREE.Vector3(5, 5, 5));

  useFrame(() => {
    if (!controlsRef.current) return;
    current.current.lerp(target, 0.04);
    controlsRef.current.target.copy(current.current);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      autoRotate
      autoRotateSpeed={0.4}
      minDistance={4}
      maxDistance={30}
    />
  );
}

export default function App() {
  const [selected, setSelected] = useState<ToolWithCoords | null>(null);
  const [filterDim, setFilterDim] = useState<DimensionKey>('setup');
  const [filterMin, setFilterMin] = useState(1);
  const [axisConfig, setAxisConfig] = useState<AxisConfig>(DEFAULT_AXIS_CONFIG);
  const [persona, setPersona] = useState<PersonaKey | null>(null);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem(WELCOME_KEY));

  function dismissWelcome() {
    localStorage.setItem(WELCOME_KEY, '1');
    setShowWelcome(false);
  }

  const tools = useMemo(() => mapToCoords(rawTools, axisConfig), [axisConfig]);

  // Camera target: centroid of persona "fit" tools, or default (5,5,5)
  const cameraTarget = useMemo(() => {
    if (!persona) return new THREE.Vector3(5, 5, 5);
    const fits = tools.filter((t) => t.personas[persona]?.fit);
    if (!fits.length) return new THREE.Vector3(5, 5, 5);
    const avg = fits.reduce(
      (acc, t) => ({ x: acc.x + t.x, y: acc.y + t.y, z: acc.z + t.z }),
      { x: 0, y: 0, z: 0 }
    );
    return new THREE.Vector3(avg.x / fits.length, avg.y / fits.length, avg.z / fits.length);
  }, [persona, tools]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0f', position: 'relative' }}>
      {/* Logo — top left */}
      <a
        href="https://www.advantageousgroup.com/"
        target="_blank"
        rel="noreferrer"
        style={{ position: 'fixed', top: 16, left: 16, zIndex: 100 }}
      >
        <img src="/logo.png" alt="Advantageous" style={{ height: 36, display: 'block' }} />
      </a>

      <FilterBar
        filterDim={filterDim}
        filterMin={filterMin}
        onDimChange={setFilterDim}
        onMinChange={setFilterMin}
      />

      <Canvas
        camera={{ position: [13, 11, 17], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4040ff" />

        <Stars radius={80} depth={50} count={4000} factor={4} fade speed={0.5} />

        <axesHelper args={[10]} />
        <AxisLabels axisConfig={axisConfig} />

        {tools.map((tool) => (
          <ToolNode
            key={tool.name}
            tool={tool}
            selected={selected?.name === tool.name}
            dimmed={tool[filterDim] < filterMin}
            onSelect={setSelected}
            persona={persona}
          />
        ))}

        <ConnectionLines tools={tools} />

        <CameraRig target={cameraTarget} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            intensity={selected ? 1.4 : 0.6}
          />
        </EffectComposer>
      </Canvas>

      <DetailPanel tool={selected} onClose={() => setSelected(null)} persona={persona} />
      <AxisSelector axisConfig={axisConfig} onChange={setAxisConfig} />
      <PersonaBar active={persona} onChange={setPersona} />
      <PersonaInsightCard persona={persona} />

      {/* ⓘ info button — top right */}
      <button
        onClick={() => setShowWelcome(true)}
        title="Help"
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(4,20,12,0.92)',
          border: '1px solid rgba(58,170,122,0.35)',
          color: '#3aaa7a',
          fontFamily: 'monospace',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          backdropFilter: 'blur(8px)',
        }}
      >
        ⓘ
      </button>

      <WelcomeModal open={showWelcome} onClose={dismissWelcome} />
    </div>
  );
}
