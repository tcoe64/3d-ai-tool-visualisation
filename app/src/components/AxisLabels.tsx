import { Html } from '@react-three/drei';
import type { AxisConfig } from '../types';
import { DIMENSION_LABELS } from '../types';

interface Props {
  axisConfig: AxisConfig;
}

export function AxisLabels({ axisConfig }: Props) {
  const style: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 10,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <Html position={[11, 0, 0]} center zIndexRange={[50, 0]}>
        <div style={{ ...style, color: '#ff6666' }}>{DIMENSION_LABELS[axisConfig.x]} →</div>
      </Html>
      <Html position={[0, 11, 0]} center zIndexRange={[50, 0]}>
        <div style={{ ...style, color: '#66ff88' }}>{DIMENSION_LABELS[axisConfig.y]} →</div>
      </Html>
      <Html position={[0, 0, 11]} center zIndexRange={[50, 0]}>
        <div style={{ ...style, color: '#6699ff' }}>{DIMENSION_LABELS[axisConfig.z]} →</div>
      </Html>
    </>
  );
}
