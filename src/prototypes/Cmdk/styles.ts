/**
 * Shared styles for Command Palette
 * Uses Radiant brandColors for consistent theming
 */

import { brandColors } from '../../tokens/colors/brand';

export const colors = {
  // Background colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  modalBg: brandColors.white,
  inputBg: brandColors.white,
  hoverBg: brandColors.gray[10],
  selectedBg: brandColors.blue[10],
  
  // Text colors
  textPrimary: brandColors.gray[90],
  textSecondary: brandColors.gray[60],
  textMuted: brandColors.gray[50],
  textHighlight: brandColors.blue[60],
  
  // Border colors
  border: brandColors.gray[20],
  borderLight: brandColors.gray[30],
  
  // Icon colors
  iconDefault: brandColors.gray[60],
  iconBlue: brandColors.blue[60],
  iconGreen: brandColors.green[60],
  iconPurple: brandColors.purple[60],
  iconOrange: brandColors.orange[60],
  
  // Keyboard shortcut
  kbdBg: brandColors.gray[10],
  kbdBorder: brandColors.gray[30],
  kbdText: brandColors.gray[70],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const typography = {
  fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  
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
  label: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.3,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
} as const;

export const shadows = {
  modal: '0 16px 48px rgba(0, 0, 0, 0.2)',
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;
