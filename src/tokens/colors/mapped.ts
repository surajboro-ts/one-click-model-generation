/**
 * Mapped/Component Color Tokens
 * 
 * These tokens are component-specific and support theming (light/dark modes).
 * They reference Alias tokens and provide the most specific application context.
 */

import { aliasColors } from './alias';
import { brandColors } from './brand';

/**
 * Light Theme Color Mappings
 */
export const lightThemeColors = {
  // Page/App Level
  page: {
    background: aliasColors.background.secondary,
    foreground: aliasColors.text.default,
  },

  // Card Component
  card: {
    background: aliasColors.surface.default,
    backgroundHover: brandColors.gray[10],
    border: aliasColors.border.subtle,
    borderHover: aliasColors.border.default,
  },

  // Button Components
  button: {
    primary: {
      background: aliasColors.primary.default,
      backgroundHover: aliasColors.primary.hover,
      backgroundActive: aliasColors.primary.active,
      backgroundDisabled: brandColors.gray[30],
      text: aliasColors.text.inverse,
      textDisabled: brandColors.gray[50],
    },
    secondary: {
      background: brandColors.white,
      backgroundHover: brandColors.gray[10],
      backgroundActive: brandColors.gray[20],
      backgroundDisabled: brandColors.white,
      border: aliasColors.border.default,
      borderHover: aliasColors.border.strong,
      borderDisabled: brandColors.gray[30],
      text: aliasColors.text.default,
      textDisabled: brandColors.gray[50],
    },
    tertiary: {
      background: 'transparent',
      backgroundHover: brandColors.gray[10],
      backgroundActive: brandColors.gray[20],
      text: aliasColors.text.accent,
      textHover: brandColors.blue[70],
      textDisabled: brandColors.gray[50],
    },
    ghost: {
      background: 'transparent',
      backgroundHover: `${brandColors.gray[40]}1F`, // 12% opacity
      backgroundActive: `${brandColors.gray[40]}3D`, // 24% opacity
      text: aliasColors.text.default,
      textDisabled: brandColors.gray[50],
    },
  },

  // Input Components
  input: {
    background: brandColors.white,
    backgroundDisabled: brandColors.gray[10],
    backgroundReadOnly: brandColors.gray[10],
    border: aliasColors.border.default,
    borderHover: aliasColors.border.strong,
    borderFocus: aliasColors.border.focus,
    borderError: aliasColors.border.error,
    borderDisabled: brandColors.gray[30],
    text: aliasColors.text.default,
    textPlaceholder: aliasColors.text.tertiary,
    textDisabled: aliasColors.text.disabled,
    label: aliasColors.text.default,
    labelRequired: aliasColors.semantic.failure.default,
    helper: aliasColors.text.secondary,
    error: aliasColors.semantic.failure.default,
  },

  // Checkbox & Radio
  selection: {
    background: brandColors.white,
    backgroundChecked: aliasColors.primary.default,
    backgroundDisabled: brandColors.gray[20],
    backgroundCheckedDisabled: brandColors.gray[40],
    border: aliasColors.border.default,
    borderHover: aliasColors.border.strong,
    borderChecked: aliasColors.primary.default,
    borderError: aliasColors.border.error,
    borderDisabled: brandColors.gray[30],
    checkmark: brandColors.white,
    checkmarkDisabled: brandColors.gray[50],
  },

  // Toggle/Switch
  toggle: {
    backgroundOff: brandColors.gray[40],
    backgroundOn: aliasColors.primary.default,
    backgroundDisabled: brandColors.gray[30],
    handle: brandColors.white,
    handleDisabled: brandColors.gray[10],
  },

  // List Items & Menu
  list: {
    background: brandColors.white,
    backgroundHover: `${brandColors.gray[40]}1F`, // 12% opacity
    backgroundActive: brandColors.blue[10],
    backgroundSelected: brandColors.blue[20],
    text: aliasColors.text.default,
    textSecondary: aliasColors.text.secondary,
    textDisabled: aliasColors.text.disabled,
    divider: aliasColors.divider.default,
  },

  // Tabs
  tab: {
    background: 'transparent',
    backgroundHover: brandColors.gray[10],
    backgroundActive: brandColors.white,
    text: aliasColors.text.secondary,
    textHover: aliasColors.text.default,
    textActive: aliasColors.text.accent,
    indicator: aliasColors.primary.default,
    border: aliasColors.divider.default,
  },

  // Banner/Alert
  banner: {
    success: {
      background: aliasColors.semantic.success.background,
      border: aliasColors.semantic.success.border,
      icon: aliasColors.semantic.success.default,
      text: aliasColors.text.default,
    },
    warning: {
      background: aliasColors.semantic.warning.background,
      border: aliasColors.semantic.warning.border,
      icon: aliasColors.semantic.warning.default,
      text: aliasColors.text.default,
    },
    error: {
      background: aliasColors.semantic.failure.background,
      border: aliasColors.semantic.failure.border,
      icon: aliasColors.semantic.failure.default,
      text: aliasColors.text.default,
    },
    info: {
      background: aliasColors.semantic.info.background,
      border: aliasColors.semantic.info.border,
      icon: aliasColors.semantic.info.default,
      text: aliasColors.text.default,
    },
    neutral: {
      background: aliasColors.semantic.neutral.background,
      border: aliasColors.semantic.neutral.border,
      icon: aliasColors.semantic.neutral.default,
      text: aliasColors.text.default,
    },
  },

  // Tooltip
  tooltip: {
    background: brandColors.gray[90],
    text: brandColors.white,
  },

  // Modal/Dialog
  modal: {
    background: aliasColors.surface.default,
    overlay: `${brandColors.gray[90]}80`, // 50% opacity
    border: aliasColors.border.subtle,
  },

  // Chip/Tag
  chip: {
    background: brandColors.gray[20],
    backgroundHover: brandColors.gray[30],
    backgroundSelected: brandColors.blue[20],
    text: aliasColors.text.default,
    textSelected: brandColors.blue[70],
    border: brandColors.gray[30],
    borderSelected: brandColors.blue[40],
    dismiss: aliasColors.icon.secondary,
    dismissHover: aliasColors.icon.default,
  },

  // Token Types (for data visualization chips)
  token: {
    attribute: {
      background: brandColors.green[20],
      text: brandColors.green[70],
      border: brandColors.green[40],
    },
    measure: {
      background: brandColors.blue[20],
      text: brandColors.blue[70],
      border: brandColors.blue[40],
    },
    condition: {
      background: brandColors.purple[20],
      text: brandColors.purple[70],
      border: brandColors.purple[40],
    },
    date: {
      background: brandColors.teal[20],
      text: brandColors.teal[70],
      border: brandColors.teal[40],
    },
    filter: {
      background: brandColors.orange[20],
      text: brandColors.orange[70],
      border: brandColors.orange[40],
    },
  },

  // Progress/Loading
  progress: {
    track: brandColors.gray[20],
    indicator: aliasColors.primary.default,
    indicatorSuccess: aliasColors.semantic.success.default,
  },

  // Avatar
  avatar: {
    background: brandColors.gray[20],
    text: aliasColors.text.default,
    border: brandColors.white,
  },

  // Table
  table: {
    headerBackground: brandColors.gray[10],
    headerText: aliasColors.text.default,
    rowBackground: brandColors.white,
    rowBackgroundAlt: brandColors.gray[10],
    rowBackgroundHover: `${brandColors.gray[40]}1F`,
    rowBackgroundSelected: brandColors.blue[10],
    cellText: aliasColors.text.default,
    cellTextSecondary: aliasColors.text.secondary,
    border: aliasColors.divider.default,
  },

  // Navigation
  nav: {
    background: brandColors.white,
    backgroundDark: brandColors.gray[90],
    itemBackground: 'transparent',
    itemBackgroundHover: `${brandColors.gray[40]}1F`,
    itemBackgroundActive: brandColors.blue[10],
    itemText: aliasColors.text.default,
    itemTextDark: brandColors.white,
    itemTextActive: aliasColors.text.accent,
    indicator: aliasColors.primary.default,
  },

  // Scrollbar
  scrollbar: {
    track: brandColors.gray[10],
    thumb: brandColors.gray[40],
    thumbHover: brandColors.gray[50],
  },

  // Focus Ring
  focus: {
    ring: aliasColors.primary.default,
    ringOffset: brandColors.white,
  },

  // Skeleton/Shimmer
  skeleton: {
    background: brandColors.gray[20],
    shimmer: brandColors.gray[10],
  },
} as const;

/**
 * Dark Theme Color Mappings
 * Inherits structure from light theme with inverted values
 */
export const darkThemeColors = {
  // Page/App Level
  page: {
    background: brandColors.gray[90],
    foreground: brandColors.white,
  },

  // Card Component
  card: {
    background: brandColors.gray[80],
    backgroundHover: brandColors.gray[70],
    border: brandColors.gray[70],
    borderHover: brandColors.gray[60],
  },

  // Button Components
  button: {
    primary: {
      background: aliasColors.primary.default,
      backgroundHover: brandColors.blue[50],
      backgroundActive: brandColors.blue[40],
      backgroundDisabled: brandColors.gray[70],
      text: brandColors.white,
      textDisabled: brandColors.gray[50],
    },
    secondary: {
      background: brandColors.gray[80],
      backgroundHover: brandColors.gray[70],
      backgroundActive: brandColors.gray[60],
      backgroundDisabled: brandColors.gray[80],
      border: brandColors.gray[60],
      borderHover: brandColors.gray[50],
      borderDisabled: brandColors.gray[70],
      text: brandColors.white,
      textDisabled: brandColors.gray[50],
    },
    tertiary: {
      background: 'transparent',
      backgroundHover: brandColors.gray[70],
      backgroundActive: brandColors.gray[60],
      text: brandColors.blue[50],
      textHover: brandColors.blue[40],
      textDisabled: brandColors.gray[60],
    },
    ghost: {
      background: 'transparent',
      backgroundHover: `${brandColors.gray[60]}3D`,
      backgroundActive: `${brandColors.gray[60]}5C`,
      text: brandColors.white,
      textDisabled: brandColors.gray[60],
    },
  },

  // Input Components
  input: {
    background: brandColors.gray[80],
    backgroundDisabled: brandColors.gray[70],
    backgroundReadOnly: brandColors.gray[70],
    border: brandColors.gray[60],
    borderHover: brandColors.gray[50],
    borderFocus: brandColors.blue[50],
    borderError: brandColors.red[50],
    borderDisabled: brandColors.gray[70],
    text: brandColors.white,
    textPlaceholder: brandColors.gray[50],
    textDisabled: brandColors.gray[60],
    label: brandColors.white,
    labelRequired: brandColors.red[50],
    helper: brandColors.gray[50],
    error: brandColors.red[50],
  },

  // Additional dark theme mappings follow same pattern...
  // Abbreviated for clarity - full implementation would mirror light theme structure

  // Focus Ring (dark)
  focus: {
    ring: brandColors.blue[50],
    ringOffset: brandColors.gray[90],
  },

  // Skeleton/Shimmer (dark)
  skeleton: {
    background: brandColors.gray[70],
    shimmer: brandColors.gray[60],
  },
} as const;

// Type exports
export type LightThemeColors = typeof lightThemeColors;
export type DarkThemeColors = typeof darkThemeColors;
export type ThemeColors = LightThemeColors | DarkThemeColors;

