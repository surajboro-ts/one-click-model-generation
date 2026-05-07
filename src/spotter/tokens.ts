/**
 * Spotter-local tokens.
 *
 * Only define tokens here when no Radiant equivalent covers the need.
 * Prefer importing from `@tokens/colors` directly when possible.
 */

import { systemColors } from '../tokens/colors';

const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Soft radial glow behind the welcome prompt. Derived from the brand color at
 * low alpha. Radiant's system tokens are opaque, so this lives in Spotter.
 */
export const spotterGlow = {
  from: hexToRgba(systemColors.light['content-brand'], 0.08),
  to: hexToRgba(systemColors.light['content-brand'], 0),
} as const;

/**
 * Chart-token backgrounds for answer card tokens (column / keyword / filter).
 * Aliases over Radiant system tokens — Spotter components reference these
 * names instead of reaching into the system palette directly.
 */
export const spotterChartBg = {
  measure: systemColors.light['background-success'],
  keyword: systemColors.light['background-information'],
  filter: systemColors.light['background-subtle'],
} as const;

export type SpotterChartTokenKind = keyof typeof spotterChartBg;
