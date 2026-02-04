/**
 * Shared Styles for Command Palette
 * 
 * Uses Radiant design tokens for consistent styling.
 */

import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';

/**
 * Color palette using Radiant tokens
 */
export const colors = {
  // Text colors
  textPrimary: brandColors.gray[90],     // #1D232F
  textSecondary: brandColors.gray[60],   // #777E8B
  textMuted: brandColors.gray[50],       // #A5ACB9
  textDisabled: brandColors.gray[40],    // #C0C6CF
  
  // Background colors
  modalBg: brandColors.white,
  overlay: 'rgba(29, 35, 47, 0.5)',
  hoverBg: brandColors.gray[10],         // #F6F8FA
  selectedBg: brandColors.gray[10],
  footerBg: brandColors.gray[10],
  
  // Border colors
  border: brandColors.gray[20],          // #EAEDF2
  borderHover: brandColors.gray[30],     // #DBDFE7
  
  // Icon colors
  iconDefault: brandColors.gray[50],     // #A5ACB9
  iconActive: brandColors.gray[70],      // #4A515E
  iconBlue: brandColors.blue[60],        // #2770EF
  
  // Filter chip colors
  filterChipBg: brandColors.blue[10],    // #F2F7FF
  filterChipBorder: brandColors.blue[60], // #2770EF
  filterChipText: brandColors.blue[60],
  
  // Keyboard hint colors
  kbdBg: brandColors.gray[10],           // #F6F8FA
  kbdBorder: brandColors.gray[20],       // #EAEDF2
  kbdText: brandColors.gray[60],         // #777E8B
  
  // Highlight colors
  highlightBg: brandColors.yellow[20],   // #FFF8E5
  
  // Status colors
  success: brandColors.green[60],        // #06BF7F
  warning: brandColors.yellow[60],       // #FCC838
  error: brandColors.red[60],            // #E22B3D
  info: brandColors.blue[60],            // #2770EF
};

/**
 * Spacing using Radiant tokens
 */
export { spacing };

/**
 * Typography
 */
export const typography = {
  fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontMono: '"SF Mono", "Monaco", "Inconsolata", "Fira Mono", monospace',
  
  // Font weights
  light: 375,
  regular: 400,
  medium: 500,
  semibold: 600,
  
  // Font sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  
  // Line heights
  tight: 1.25,
  normal: 1.43,
  relaxed: 1.5,
};

/**
 * Border radius
 */
export const borderRadius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
};

/**
 * Shadows
 */
export const shadows = {
  modal: '0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  dropdown: '0 8px 24px rgba(0, 0, 0, 0.15)',
  card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  kbd: '0 1px 0 rgba(0, 0, 0, 0.05)',
};

/**
 * Modal dimensions (fixed)
 */
export const modalDimensions = {
  width: 624,
  height: 540,
  headerHeight: 56,
  footerHeight: 34,
};

/**
 * Common component styles
 */
export const componentStyles = {
  // Search header
  searchHeader: {
    height: modalDimensions.headerHeight,
    padding: `16px ${spacing.D}px 12px`,
    borderBottom: `1px solid ${colors.border}`,
  },
  
  // Result row
  resultRow: {
    padding: `${spacing.B}px ${spacing.D}px`,
    margin: `0 ${spacing.D}px`,
    borderRadius: borderRadius.sm,
    gap: spacing.C,
  },
  
  // Section header
  sectionHeader: {
    padding: `${spacing.D}px ${spacing.D}px ${spacing.B}px`,
    fontSize: typography.xs,
    color: colors.textSecondary,
    letterSpacing: '-0.072px',
  },
  
  // Footer
  footer: {
    height: modalDimensions.footerHeight,
    padding: `${spacing.B}px ${spacing.C}px`,
    backgroundColor: colors.footerBg,
    borderTop: `1px solid ${colors.border}`,
  },
  
  // Filter chip
  filterChip: {
    height: 24,
    padding: '0 4px 0 8px',
    backgroundColor: colors.filterChipBg,
    border: `1px solid ${colors.filterChipBorder}`,
    borderRadius: borderRadius.sm,
    color: colors.filterChipText,
    fontSize: typography.sm,
    fontWeight: typography.light,
  },
  
  // Keyboard hint
  kbd: {
    minWidth: 18,
    height: 18,
    padding: '0 4px',
    backgroundColor: brandColors.white,
    border: `1px solid ${colors.borderHover}`,
    borderRadius: 3,
    fontSize: 11,
    color: colors.kbdText,
    boxShadow: shadows.kbd,
  },
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  modalDimensions,
  componentStyles,
};
