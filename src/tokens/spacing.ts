/**
 * Spacing Tokens
 * 
 * Based on a 4px base unit grid system.
 * Named tokens (A, B, C, D, etc.) match the Figma variable naming.
 */

// Base spacing unit
export const SPACING_UNIT = 4;

// Spacing Scale (in pixels)
export const spacing = {
  // Named tokens from Figma
  A: 4,   // 1 unit
  B: 8,   // 2 units
  C: 12,  // 3 units
  D: 16,  // 4 units
  E: 20,  // 5 units
  F: 24,  // 6 units
  G: 28,  // 7 units
  H: 32,  // 8 units
  I: 40,  // 10 units
  J: 48,  // 12 units
  K: 56,  // 14 units
  L: 64,  // 16 units
  M: 80,  // 20 units
  N: 96,  // 24 units

  // Numeric aliases for convenience
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,

  // Semantic aliases
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
} as const;

// Component-specific spacing
export const componentSpacing = {
  // Button padding
  button: {
    small: {
      paddingX: spacing.C,  // 12px
      paddingY: spacing.A,  // 4px
      gap: spacing.A,       // 4px
    },
    medium: {
      paddingX: spacing.D,  // 16px
      paddingY: spacing.B,  // 8px
      gap: spacing.B,       // 8px
    },
    large: {
      paddingX: spacing.F,  // 24px
      paddingY: spacing.C,  // 12px
      gap: spacing.B,       // 8px
    },
  },

  // Input padding
  input: {
    paddingX: spacing.C,    // 12px
    paddingY: spacing.B,    // 8px
    labelGap: spacing.B,    // 8px
    helperGap: spacing.A,   // 4px
  },

  // Card padding
  card: {
    padding: spacing.F,     // 24px
    gap: spacing.D,         // 16px
    headerGap: spacing.C,   // 12px
  },

  // Modal spacing
  modal: {
    padding: spacing.F,     // 24px
    headerPaddingY: spacing.E, // 20px
    footerPaddingY: spacing.D, // 16px
    contentGap: spacing.D,  // 16px
  },

  // List item spacing
  listItem: {
    paddingX: spacing.D,    // 16px
    paddingY: spacing.B,    // 8px
    gap: spacing.C,         // 12px
    iconGap: spacing.B,     // 8px
  },

  // Tab spacing
  tab: {
    paddingX: spacing.D,    // 16px
    paddingY: spacing.B,    // 8px
    gap: spacing.B,         // 8px
  },

  // Chip/Tag spacing
  chip: {
    paddingX: spacing.B,    // 8px
    paddingY: spacing.A,    // 4px
    gap: spacing.A,         // 4px
  },

  // Banner spacing
  banner: {
    padding: spacing.D,     // 16px
    gap: spacing.C,         // 12px
    iconGap: spacing.B,     // 8px
  },

  // Tooltip spacing
  tooltip: {
    paddingX: spacing.B,    // 8px
    paddingY: spacing.A,    // 4px
  },

  // Avatar spacing
  avatar: {
    gap: spacing.B,         // 8px for avatar groups
    stackOverlap: spacing.B, // 8px overlap in stacks
  },

  // Table spacing
  table: {
    cellPaddingX: spacing.D,   // 16px
    cellPaddingY: spacing.C,   // 12px
    headerPaddingY: spacing.B, // 8px
  },

  // Form field spacing
  form: {
    fieldGap: spacing.E,    // 20px between fields
    sectionGap: spacing.H,  // 32px between sections
    groupGap: spacing.D,    // 16px within groups
  },

  // Page layout spacing
  page: {
    paddingX: spacing.F,    // 24px
    paddingY: spacing.F,    // 24px
    sectionGap: spacing.H,  // 32px
    contentGap: spacing.D,  // 16px
  },

  // Navigation spacing
  nav: {
    itemPaddingX: spacing.C,  // 12px
    itemPaddingY: spacing.B,  // 8px
    sectionGap: spacing.D,    // 16px
    groupGap: spacing.B,      // 8px
  },
} as const;

// Gap utilities (for flexbox/grid gaps)
export const gap = {
  none: spacing.none,
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
} as const;

// Margin utilities
export const margin = spacing;

// Padding utilities
export const padding = spacing;

// Type exports
export type Spacing = keyof typeof spacing;
export type ComponentSpacing = typeof componentSpacing;
export type Gap = keyof typeof gap;

