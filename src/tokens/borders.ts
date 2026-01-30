/**
 * Border Tokens
 * 
 * Border width, style, and composite border values.
 */


// Border widths
export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 3,
} as const;

// Border styles
export const borderStyle = {
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

// Composite border values (width + style)
export const border = {
  none: 'none',
  thin: `${borderWidth.thin}px ${borderStyle.solid}`,
  medium: `${borderWidth.medium}px ${borderStyle.solid}`,
  thick: `${borderWidth.thick}px ${borderStyle.solid}`,
  dashed: `${borderWidth.thin}px ${borderStyle.dashed}`,
  dotted: `${borderWidth.thin}px ${borderStyle.dotted}`,
} as const;

// Component-specific border configurations
export const componentBorders = {
  // Input borders
  input: {
    width: borderWidth.thin,
    style: borderStyle.solid,
    radius: 6,
  },

  // Button borders
  button: {
    primary: {
      width: borderWidth.none,
      style: borderStyle.none,
    },
    secondary: {
      width: borderWidth.thin,
      style: borderStyle.solid,
    },
    tertiary: {
      width: borderWidth.none,
      style: borderStyle.none,
    },
  },

  // Card borders
  card: {
    width: borderWidth.thin,
    style: borderStyle.solid,
    radius: 8,
  },

  // Chip/Tag borders
  chip: {
    width: borderWidth.thin,
    style: borderStyle.solid,
    radius: 4,
  },

  // Table borders
  table: {
    outer: borderWidth.thin,
    cell: borderWidth.thin,
    style: borderStyle.solid,
  },

  // Divider
  divider: {
    width: borderWidth.thin,
    style: borderStyle.solid,
  },

  // Selection controls
  checkbox: {
    width: borderWidth.medium,
    style: borderStyle.solid,
    radius: 4,
  },
  radio: {
    width: borderWidth.medium,
    style: borderStyle.solid,
    radius: 9999,
  },

  // Focus ring
  focus: {
    width: borderWidth.medium,
    style: borderStyle.solid,
    offset: 2,
  },
} as const;

// Type exports
export type BorderWidth = keyof typeof borderWidth;
export type BorderStyle = keyof typeof borderStyle;
export type Border = keyof typeof border;
export type ComponentBorders = typeof componentBorders;

