/**
 * Typography Tokens
 * 
 * Based on the Figma design system using the "Plain" font family.
 * Includes font families, sizes, weights, line heights, and composite text styles.
 */

// Font Family
export const fontFamily = {
  primary: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace',
} as const;

// Font Sizes (in pixels)
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

// Font Weights
export const fontWeight = {
  light: 375,
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

// Line Heights (in pixels)
export const lineHeight = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

// Letter Spacing
export const letterSpacing = {
  tight: '-0.01em',
  normal: '0',
  wide: '0.01em',
  wider: '0.02em',
} as const;

/**
 * Composite Text Styles
 * These match the Figma text styles exactly
 */
export const textStyles = {
  // Display Styles
  display: {
    largeHeadline: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight['3xl'],
      letterSpacing: letterSpacing.tight,
    },
  },

  // Title Styles
  title: {
    page: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight['2xl'],
      letterSpacing: letterSpacing.normal,
    },
    modal: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.xl,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Heading Styles
  heading: {
    h1: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight['2xl'],
      letterSpacing: letterSpacing.tight,
    },
    h2: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight['2xl'],
      letterSpacing: letterSpacing.normal,
    },
    h3: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.lg,
      letterSpacing: letterSpacing.normal,
    },
    h4: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.lg,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Label Styles
  label: {
    section: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.lg,
      letterSpacing: letterSpacing.normal,
    },
    content: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.lg,
      letterSpacing: letterSpacing.normal,
    },
    contentSubhead: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.md,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Body Styles
  body: {
    large: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.md,
      fontWeight: fontWeight.light,
      lineHeight: lineHeight.lg,
      letterSpacing: letterSpacing.normal,
    },
    normal: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.light,
      lineHeight: lineHeight.md,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.xs,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Caption & Footnote Styles
  caption: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.sm,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.sm,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Overline Styles
  overline: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.sm,
      letterSpacing: letterSpacing.wider,
      textTransform: 'uppercase' as const,
    },
  },

  // Button Text Styles
  button: {
    large: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.lg,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.md,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.xs,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Link Styles
  link: {
    default: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.light,
      lineHeight: lineHeight.md,
      letterSpacing: letterSpacing.normal,
      textDecoration: 'underline' as const,
    },
    medium: {
      fontFamily: fontFamily.primary,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.md,
      letterSpacing: letterSpacing.normal,
      textDecoration: 'underline' as const,
    },
  },

  // Code/Mono Styles
  code: {
    block: {
      fontFamily: fontFamily.mono,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.md,
      letterSpacing: letterSpacing.normal,
    },
    inline: {
      fontFamily: fontFamily.mono,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.sm,
      letterSpacing: letterSpacing.normal,
    },
  },
} as const;

// Type exports
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type TextStyle = typeof textStyles;

// Utility type for text style values
export type TextStyleValue = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
  textDecoration?: string;
  textTransform?: string;
};

