import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { ToolWithCoords, PersonaKey } from '../types';

interface Props {
  tool: ToolWithCoords;
  dimmed: boolean;
  onSelect: (tool: ToolWithCoords | null) => void;
  selected: boolean;
  persona: PersonaKey | null;
}

export function ToolNode({ tool, dimmed, onSelect, selected, persona }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const targetPos = useRef(new THREE.Vector3(tool.x, tool.y, tool.z));

  // Cost score (1–10) → radius 0.18 to 0.38
  const baseRadius = 0.18 + ((tool.cost - 1) / 9) * 0.2;

  // Persona state drives scale and opacity
  const personaFit = persona ? tool.personas[persona]?.fit : null;
  const personaScale = persona ? (personaFit ? 1.2 : 0.8) : 1.0;
  const targetScale = selected || hovered ? personaScale * 1.3 : personaScale;
  const opacity = dimmed ? 0.15 : persona ? (personaFit ? 1.0 : 0.15) : 1.0;
  const emissiveIntensity = selected ? 1.5 : hovered ? 0.8 : persona ? (personaFit ? 1.0 : 0.0) : 0.4;

  useFrame((_, delta) => {
    const alpha = 1 - Math.exp(-8 * delta);
    targetPos.current.set(tool.x, tool.y, tool.z);
    if (groupRef.current) groupRef.current.position.lerp(targetPos.current, alpha);
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        1 - Math.exp(-10 * delta)
      );
    }
  });

  return (
    <group ref={groupRef} position={[tool.x, tool.y, tool.z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect(selected ? null : tool); }}
      >
        <sphereGeometry args={[baseRadius, 32, 32]} />
        <meshStandardMaterial
          color={tool.color}
          emissive={tool.color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      <Html
        center
        distanceFactor={10}
        zIndexRange={[50, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          opacity,
          transition: 'opacity 0.3s',
        }}
      >
        <div style={{
          color: '#e0e0ff',
          fontSize: '11px',
          fontFamily: 'monospace',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          textShadow: '0 0 6px rgba(0,0,0,0.9)',
          transform: 'translateY(-28px)',
        }}>
          {tool.name}
        </div>
      </Html>
    </group>
  );
}
