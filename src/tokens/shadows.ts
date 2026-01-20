/**
 * Shadow Tokens
 * 
 * Elevation and shadow values for depth and hierarchy.
 */

export const shadows = {
  // Base shadow scale
  none: 'none',
  
  xs: '0px 1px 2px rgba(29, 35, 47, 0.05)',
  
  sm: '0px 1px 3px rgba(29, 35, 47, 0.1), 0px 1px 2px rgba(29, 35, 47, 0.06)',
  
  md: '0px 4px 6px -1px rgba(29, 35, 47, 0.1), 0px 2px 4px -1px rgba(29, 35, 47, 0.06)',
  
  lg: '0px 10px 15px -3px rgba(29, 35, 47, 0.1), 0px 4px 6px -2px rgba(29, 35, 47, 0.05)',
  
  xl: '0px 20px 25px -5px rgba(29, 35, 47, 0.1), 0px 10px 10px -5px rgba(29, 35, 47, 0.04)',
  
  '2xl': '0px 25px 50px -12px rgba(29, 35, 47, 0.25)',

  // Inner shadow
  inner: 'inset 0px 2px 4px rgba(29, 35, 47, 0.06)',

  // Focus ring shadow
  focusRing: '0 0 0 3px rgba(39, 112, 239, 0.4)',
  focusRingError: '0 0 0 3px rgba(226, 43, 61, 0.4)',
  focusRingSuccess: '0 0 0 3px rgba(6, 191, 127, 0.4)',
} as const;

// Semantic shadow mapping
export const elevation = {
  // Elevation levels
  level0: shadows.none,      // Flat, no elevation
  level1: shadows.xs,        // Subtle elevation (cards on page)
  level2: shadows.sm,        // Low elevation (raised cards)
  level3: shadows.md,        // Medium elevation (dropdowns)
  level4: shadows.lg,        // High elevation (modals, popovers)
  level5: shadows.xl,        // Highest elevation (dialogs)
} as const;

// Component-specific shadows
export const componentShadows = {
  // Cards
  card: {
    default: shadows.xs,
    hover: shadows.sm,
    raised: shadows.md,
  },

  // Dropdowns & Popovers
  dropdown: shadows.lg,
  popover: shadows.lg,
  tooltip: shadows.md,

  // Modals & Dialogs
  modal: shadows.xl,
  dialog: shadows.xl,

  // Navigation
  nav: {
    header: shadows.sm,
    sidebar: shadows.sm,
  },

  // Buttons (on hover/active)
  button: {
    hover: shadows.xs,
    active: shadows.inner,
  },

  // Input focus
  input: {
    focus: shadows.focusRing,
    focusError: shadows.focusRingError,
  },
} as const;

// Type exports
export type Shadow = keyof typeof shadows;
export type Elevation = keyof typeof elevation;
export type ComponentShadows = typeof componentShadows;

