/**
 * Icon Tokens
 * 
 * Size tokens for the icon system, matching Figma specifications.
 * Icons are designed at L (18px) and scaled down for smaller sizes.
 */

// Icon size scale (in pixels)
export const iconSize = {
  xs: 12,  // Extra small - for chips, badges, compact UI
  s: 14,   // Small - for compact buttons, inline text
  m: 16,   // Medium - default for buttons, form elements
  l: 18,   // Large - for emphasis, headers, standalone icons
} as const;

// Semantic size aliases for component context
export const iconSizeAlias = {
  chip: iconSize.xs,
  badge: iconSize.xs,
  button: {
    small: iconSize.s,
    medium: iconSize.m,
    large: iconSize.l,
  },
  input: iconSize.m,
  alert: iconSize.l,
  navigation: iconSize.m,
} as const;

// Icon stroke width - scales with size for visual consistency
export const iconStrokeWidth = {
  xs: 1.25,
  s: 1.5,
  m: 1.5,
  l: 1.5,
} as const;

// Type exports
export type IconSize = keyof typeof iconSize;
export type IconSizeValue = typeof iconSize[IconSize];
