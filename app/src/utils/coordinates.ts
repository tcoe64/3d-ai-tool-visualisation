import type { Tool, ToolWithCoords, AxisConfig } from '../types';

// Map reliability (1–10) to a hex color: red (low) → green (high)
function reliabilityColor(reliability: number): string {
  const t = (reliability - 1) / 9;
  const r = Math.round(255 * (1 - t));
  const g = Math.round(255 * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}33`;
}

export function mapToCoords(tools: Tool[], axisConfig: AxisConfig): ToolWithCoords[] {
  return tools.map((t) => ({
    ...t,
    x: t[axisConfig.x],
    y: t[axisConfig.y],
    z: t[axisConfig.z],
    color: reliabilityColor(t.reliability),
  }));
}
