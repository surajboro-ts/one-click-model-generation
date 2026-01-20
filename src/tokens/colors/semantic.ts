/**
 * Semantic/Alias Color Tokens
 * 
 * These tokens provide meaningful names for colors based on their usage.
 * Use these tokens in components instead of brand colors directly.
 */

import { brandColors } from './brand';

/**
 * Primary colors for main actions and branding
 */
export const primaryColors = {
  default: brandColors.blue[60],  // #2770EF
  hover: brandColors.blue[70],    // #2359B6
  active: brandColors.blue[80],   // #163772
  light: brandColors.blue[20],    // #DEE8FA
  lighter: brandColors.blue[10],  // #EBF2FD
} as const;

/**
 * Status colors for feedback states
 */
export const statusColors = {
  info: {
    default: brandColors.blue[60],     // #2770EF
    background: brandColors.blue[20],  // #DEE8FA
  },
  success: {
    default: brandColors.green[60],    // #06BF7F
    background: brandColors.green[20], // #E0F8EF
  },
  warning: {
    default: brandColors.yellow[60],   // #FCC838
    background: brandColors.yellow[20],// #FFF8E5
  },
  error: {
    default: brandColors.red[60],      // #E22B3D
    background: brandColors.red[20],   // #FFEBEC
  },
} as const;

/**
 * Text colors for typography
 */
export const textColors = {
  default: brandColors.gray[90],   // #1D232F
  secondary: brandColors.gray[60], // #777E8B
  tertiary: brandColors.gray[50],  // #A5ACB9
  disabled: brandColors.gray[40],  // #C0C6CF
  inverse: brandColors.white,      // #FFFFFF
  accent: brandColors.blue[60],    // #2770EF
} as const;

/**
 * Background colors for surfaces
 */
export const backgroundColors = {
  primary: brandColors.white,      // #FFFFFF
  secondary: brandColors.gray[10], // #F6F8FA
  tertiary: brandColors.gray[20],  // #EAEDF2
  inverse: brandColors.gray[90],   // #1D232F
} as const;

/**
 * Border colors
 */
export const borderColors = {
  default: brandColors.gray[40],   // #C0C6CF
  subtle: brandColors.gray[20],    // #EAEDF2
  strong: brandColors.gray[60],    // #777E8B
  focus: brandColors.blue[60],     // #2770EF
} as const;

/**
 * Interactive state colors
 */
export const interactiveColors = {
  hover: 'rgba(192, 198, 207, 0.12)',
  active: 'rgba(192, 198, 207, 0.24)',
  selected: brandColors.blue[20],  // #DEE8FA
} as const;

/**
 * Component-specific colors (mapped tokens)
 */
export const componentColors = {
  // Chip colors
  chip: {
    attribute: {
      default: brandColors.blue[20],
      hover: brandColors.blue[30],
      pressed: brandColors.blue[40],
    },
    measure: {
      default: brandColors.green[20],
      hover: brandColors.green[30],
      pressed: brandColors.green[40],
    },
    filter: {
      default: brandColors.gray[20],
      hover: brandColors.gray[30],
      pressed: brandColors.gray[40],
    },
  },
  // Button colors
  button: {
    primary: {
      default: brandColors.blue[60],
      hover: brandColors.blue[70],
      active: brandColors.blue[80],
    },
    secondary: {
      default: brandColors.gray[20],
      hover: brandColors.gray[30],
      active: brandColors.blue[20],
    },
  },
  // Selection control colors
  selection: {
    default: brandColors.gray[50],
    selected: brandColors.blue[60],
    error: brandColors.red[60],
    track: {
      off: brandColors.gray[40],
      on: brandColors.blue[60],
    },
  },
} as const;

// Re-export brand colors for convenience
export { brandColors };

// Type exports
export type PrimaryColors = typeof primaryColors;
export type StatusColors = typeof statusColors;
export type TextColors = typeof textColors;
export type BackgroundColors = typeof backgroundColors;
export type BorderColors = typeof borderColors;
export type InteractiveColors = typeof interactiveColors;
export type ComponentColors = typeof componentColors;

