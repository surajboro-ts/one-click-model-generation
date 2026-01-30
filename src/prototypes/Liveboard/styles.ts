/**
 * Shared styles for Liveboard dashboard
 * Uses Radiant brandColors for consistent theming
 */

import { brandColors } from '../../tokens/colors/brand';

export const colors = {
  // Background colors
  pageBg: brandColors.gray[10],
  cardBg: brandColors.white,
  headerBg: brandColors.gray[90],
  
  // Text colors
  textPrimary: brandColors.gray[90],
  textSecondary: brandColors.gray[60],
  textMuted: brandColors.gray[50],
  textOnDark: brandColors.white,
  
  // Accent colors
  positive: brandColors.green[60],
  negative: brandColors.red[60],
  accent: brandColors.blue[60],
  purple: brandColors.purple[60],
  
  // Chart colors
  chartBlue: brandColors.blue[60],
  chartBlueLight: brandColors.blue[30],
  chartGreen: brandColors.green[60],
  chartYellow: brandColors.yellow[60],
  chartOrange: brandColors.orange[60],
  chartPurple: brandColors.purple[60],
  
  // Border colors
  border: brandColors.gray[20],
  borderLight: brandColors.gray[30],
  
  // Highlight card
  highlightBg: brandColors.blue[100],
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
