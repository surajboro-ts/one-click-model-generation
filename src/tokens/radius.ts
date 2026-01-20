/**
 * Border Radius Tokens
 * 
 * Consistent corner radius values for UI components.
 */

export const radius = {
  // Base scale
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,

  // Semantic aliases
  button: 6,
  input: 6,
  card: 8,
  modal: 12,
  chip: 4,
  tag: 4,
  badge: 4,
  avatar: 9999,  // Full circle
  tooltip: 6,
  popover: 8,
  dropdown: 8,
} as const;

// Component-specific radius mapping
export const componentRadius = {
  // Buttons
  button: {
    small: radius.md,     // 6px
    medium: radius.md,    // 6px
    large: radius.md,     // 6px
    icon: radius.md,      // 6px
    iconRound: radius.full,
  },

  // Inputs & Form Elements
  input: {
    default: radius.md,   // 6px
    textarea: radius.md,  // 6px
    select: radius.md,    // 6px
    search: radius.md,    // 6px
  },

  // Selection Controls
  selection: {
    checkbox: radius.sm,  // 4px
    radio: radius.full,   // Full circle
    toggle: radius.full,  // Pill shape
    toggleThumb: radius.full,
  },

  // Containers
  container: {
    card: radius.lg,      // 8px
    modal: radius.xl,     // 12px
    popover: radius.lg,   // 8px
    dropdown: radius.lg,  // 8px
    tooltip: radius.md,   // 6px
    banner: radius.lg,    // 8px
  },

  // Chips & Tags
  chip: {
    default: radius.sm,   // 4px
    rounded: radius.full, // Pill shape
  },

  // Media
  media: {
    avatar: radius.full,  // Circle
    thumbnail: radius.md, // 6px
    image: radius.lg,     // 8px
  },

  // Progress & Indicators
  progress: {
    bar: radius.full,     // Pill shape
    indicator: radius.full,
  },

  // Navigation
  nav: {
    item: radius.md,      // 6px
    tab: radius.md,       // 6px (top corners only typically)
  },
} as const;

// Type exports
export type Radius = keyof typeof radius;
export type ComponentRadius = typeof componentRadius;

