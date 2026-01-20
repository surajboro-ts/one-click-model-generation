/**
 * Animation Tokens
 * 
 * Duration, easing, and animation presets for consistent motion.
 */

// Duration values (in milliseconds)
export const duration = {
  instant: 0,
  fastest: 50,
  faster: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
} as const;

// Easing functions
export const easing = {
  // Standard easings
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',

  // Custom cubic-bezier curves
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Material standard
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',      // Acceleration
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',      // Deceleration
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',         // Sharp movement

  // Spring-like
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// Transition presets
export const transition = {
  // Quick interactions
  fast: `${duration.fast}ms ${easing.standard}`,
  
  // Standard interactions
  normal: `${duration.normal}ms ${easing.standard}`,
  
  // Deliberate animations
  slow: `${duration.slow}ms ${easing.standard}`,

  // Specific property transitions
  colors: `color ${duration.fast}ms ${easing.standard}, background-color ${duration.fast}ms ${easing.standard}, border-color ${duration.fast}ms ${easing.standard}`,
  opacity: `opacity ${duration.normal}ms ${easing.standard}`,
  transform: `transform ${duration.normal}ms ${easing.standard}`,
  shadow: `box-shadow ${duration.normal}ms ${easing.standard}`,
  all: `all ${duration.normal}ms ${easing.standard}`,
} as const;

// Component-specific animations
export const componentAnimation = {
  // Button
  button: {
    hover: transition.fast,
    active: `${duration.fastest}ms ${easing.easeOut}`,
  },

  // Input
  input: {
    focus: transition.fast,
  },

  // Dropdown/Popover
  dropdown: {
    enter: `${duration.normal}ms ${easing.decelerate}`,
    exit: `${duration.fast}ms ${easing.accelerate}`,
  },

  // Modal
  modal: {
    enter: `${duration.slow}ms ${easing.decelerate}`,
    exit: `${duration.normal}ms ${easing.accelerate}`,
    overlay: `${duration.slow}ms ${easing.standard}`,
  },

  // Tooltip
  tooltip: {
    enter: `${duration.fast}ms ${easing.decelerate}`,
    exit: `${duration.fastest}ms ${easing.accelerate}`,
  },

  // Accordion/Collapse
  collapse: {
    expand: `${duration.slow}ms ${easing.standard}`,
    collapse: `${duration.normal}ms ${easing.standard}`,
  },

  // Tab indicator
  tab: {
    indicator: `${duration.normal}ms ${easing.standard}`,
  },

  // Progress
  progress: {
    indeterminate: `${duration.slowest * 4}ms ${easing.linear}`,
  },

  // Skeleton shimmer
  skeleton: {
    shimmer: `1500ms ${easing.linear} infinite`,
  },

  // Spinner
  spinner: {
    rotation: `1000ms ${easing.linear} infinite`,
  },
} as const;

// Type exports
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Transition = keyof typeof transition;
export type ComponentAnimation = typeof componentAnimation;

