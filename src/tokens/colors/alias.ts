/**
 * Alias/Semantic Color Tokens
 * 
 * These tokens map brand colors to their intended semantic purpose.
 * They provide meaning and context to the raw color values.
 * Components should primarily use these or Mapped tokens.
 */

import { brandColors } from './brand';

export const aliasColors = {
  // Primary Brand Color
  primary: {
    default: brandColors.blue[60],
    hover: brandColors.blue[70],
    active: brandColors.blue[80],
    subtle: brandColors.blue[20],
  },

  // Semantic Status Colors
  semantic: {
    success: {
      default: brandColors.green[60],
      hover: brandColors.green[70],
      background: brandColors.green[20],
      backgroundSubtle: brandColors.green[10],
      border: brandColors.green[40],
    },
    warning: {
      default: brandColors.yellow[60],
      hover: brandColors.yellow[70],
      background: brandColors.yellow[20],
      backgroundSubtle: brandColors.yellow[10],
      border: brandColors.yellow[40],
    },
    failure: {
      default: brandColors.red[60],
      hover: brandColors.red[70],
      background: brandColors.red[20],
      backgroundSubtle: brandColors.red[10],
      border: brandColors.red[40],
    },
    info: {
      default: brandColors.blue[60],
      hover: brandColors.blue[70],
      background: brandColors.blue[20],
      backgroundSubtle: brandColors.blue[10],
      border: brandColors.blue[40],
    },
    neutral: {
      default: brandColors.gray[60],
      hover: brandColors.gray[70],
      background: brandColors.gray[20],
      backgroundSubtle: brandColors.gray[10],
      border: brandColors.gray[40],
    },
  },

  // Text Colors
  text: {
    default: brandColors.gray[90],
    secondary: brandColors.gray[60],
    tertiary: brandColors.gray[50],
    disabled: brandColors.gray[40],
    inverse: brandColors.white,
    accent: brandColors.blue[60],
    success: brandColors.green[60],
    warning: brandColors.yellow[70], // Darker for readability
    error: brandColors.red[60],
    info: brandColors.blue[60],
  },

  // Icon Colors
  icon: {
    default: brandColors.gray[90],
    secondary: brandColors.gray[60],
    tertiary: brandColors.gray[50],
    disabled: brandColors.gray[40],
    inverse: brandColors.white,
    accent: brandColors.blue[60],
    success: brandColors.green[60],
    warning: brandColors.yellow[60],
    error: brandColors.red[60],
    info: brandColors.blue[60],
  },

  // Background Colors
  background: {
    primary: brandColors.white,
    secondary: brandColors.gray[10],
    tertiary: brandColors.gray[20],
    inverse: brandColors.gray[90],
    accent: brandColors.blue[60],
    accentSubtle: brandColors.blue[10],
  },

  // Border/Outline Colors
  border: {
    default: brandColors.gray[40],
    subtle: brandColors.gray[20],
    strong: brandColors.gray[60],
    focus: brandColors.blue[60],
    error: brandColors.red[60],
    success: brandColors.green[60],
    warning: brandColors.yellow[60],
  },

  // Surface Colors (for cards, modals, etc.)
  surface: {
    default: brandColors.white,
    raised: brandColors.white,
    overlay: brandColors.gray[90],
    sunken: brandColors.gray[10],
  },

  // Divider Colors
  divider: {
    default: brandColors.gray[20],
    strong: brandColors.gray[30],
    onDark: brandColors.gray[60],
  },
} as const;

// Type exports
export type AliasColors = typeof aliasColors;
export type SemanticStatus = keyof typeof aliasColors.semantic;
export type TextColor = keyof typeof aliasColors.text;
export type IconColor = keyof typeof aliasColors.icon;
export type BackgroundColor = keyof typeof aliasColors.background;
export type BorderColor = keyof typeof aliasColors.border;
export type SurfaceColor = keyof typeof aliasColors.surface;

