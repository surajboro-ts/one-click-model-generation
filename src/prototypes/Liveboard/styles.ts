/**
 * Shared styles for Liveboard dashboard
 * Uses Radiant brandColors for consistent theming
 */

import { systemColors, referenceColors } from '../../tokens/colors';

export const colors = {
  // Background colors
  pageBg: systemColors.light['background-sunken'],
  cardBg: systemColors.light['background-base'],
  headerBg: systemColors.light['content-primary'],
  
  // Text colors
  textPrimary: systemColors.light['content-primary'],
  textSecondary: systemColors.light['content-secondary'],
  textMuted: systemColors.light['content-tertiary'],
  textOnDark: systemColors.light['background-base'],
  
  // Accent colors
  positive: systemColors.light['content-success'],
  negative: systemColors.light['content-failure'],
  accent: systemColors.light['content-brand'],
  purple: referenceColors.purple['60'],
  
  // Chart colors
  chartBlue: systemColors.light['content-brand'],
  chartBlueLight: referenceColors.brand['30'],
  chartGreen: systemColors.light['content-success'],
  chartYellow: systemColors.light['content-warning'],
  chartOrange: referenceColors.orange['60'],
  chartPurple: referenceColors.purple['60'],
  
  // Border colors
  border: systemColors.light['background-subtle'],
  borderLight: referenceColors.gray['30'],
  
  // Highlight card
  highlightBg: referenceColors.brand['100'],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const typography = {
  fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  
  h1: {
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  metric: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  metricLarge: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1.2,
  },
} as const;

export const shadows = {
  card: '0 1px 3px rgba(0, 0, 0, 0.08)',
  cardHover: '0 4px 12px rgba(0, 0, 0, 0.12)',
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;
