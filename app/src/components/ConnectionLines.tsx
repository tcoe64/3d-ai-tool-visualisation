import { Line } from '@react-three/drei';
import type { ToolWithCoords } from '../types';

interface Props {
  tools: ToolWithCoords[];
}

export function ConnectionLines({ tools }: Props) {
  const pairs: [ToolWithCoords, ToolWithCoords][] = [];

  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      if (Math.abs(tools[i].connections - tools[j].connections) <= 1) {
        pairs.push([tools[i], tools[j]]);
      }
    }
  }

  return (
    <>
      {pairs.map(([a, b], idx) => (
        <Line
          key={idx}
          points={[[a.x, a.y, a.z], [b.x, b.y, b.z]]}
          color="#4444aa"
          lineWidth={0.5}
          transparent
          opacity={0.25}
        />
      ))}
    </>
  );
}
