export interface PersonaEntry {
  fit: boolean;
  justification: string;
}

export type PersonaKey = 'soloFounder' | 'enterpriseScale' | 'rapidMvp' | 'contentPipeline' | 'internalOps' | 'researchStrategy';

export const PERSONA_LABELS: Record<PersonaKey, string> = {
  soloFounder:     'Solo Founder',
  enterpriseScale: 'Enterprise Scale',
  rapidMvp:        'Rapid MVP',
  contentPipeline: 'Content Pipeline',
  internalOps:     'Internal Ops',
  researchStrategy:'Research Strategy',
};

export const PERSONA_INSIGHTS: Record<PersonaKey, string> = {
  soloFounder:     'Prioritises low setup friction, strong agent capability, and cost value — letting one person punch well above their weight.',
  enterpriseScale: 'Prioritises reliability, breadth of integrations, and governance — tools proven to work at scale in regulated, multi-team environments.',
  rapidMvp:        'Favours zero-to-running speed, built-in hosting, and strong AI generation — validate an idea before committing to a full stack.',
  contentPipeline: 'Covers the full content journey from research and drafting to automation and distribution across channels.',
  internalOps:     'Chosen for deep integration ecosystems and automation power — ideal for digitising workflows and connecting existing business systems.',
  researchStrategy:'Selected for the ability to synthesise large volumes of information, reason across sources, and surface strategic insight quickly.',
};

export interface Tool {
  name: string;
  setup: number;
  connections: number;
  cost: number;
  agentCap: number;
  reliability: number;
  description: string;
  personas: Record<PersonaKey, PersonaEntry>;
}

export interface ToolWithCoords extends Tool {
  x: number;
  y: number;
  z: number;
  color: string;
}

export type DimensionKey = 'setup' | 'connections' | 'cost' | 'agentCap' | 'reliability';

export interface AxisConfig {
  x: DimensionKey;
  y: DimensionKey;
  z: DimensionKey;
}

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  setup:       'Ease of Setup',
  connections: 'Connections',
  cost:        'Cost (Value)',
  agentCap:    'Agent Capability',
  reliability: 'Reliability',
};

export const DEFAULT_AXIS_CONFIG: AxisConfig = {
  x: 'setup',
  y: 'connections',
  z: 'agentCap',
};
