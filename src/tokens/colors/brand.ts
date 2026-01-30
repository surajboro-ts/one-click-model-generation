/**
 * Brand/Primitive Color Tokens
 * 
 * These are the raw color values that form the foundation of the color system.
 * Based on ThoughtSpot Radiant design system.
 * These tokens should NOT be used directly in components - use Alias or Mapped tokens instead.
 */

export const brandColors = {
  // Blue Scale (Primary)
  blue: {
    100: '#001740',
    90: '#082559',
    80: '#163772',
    70: '#2359B6',
    60: '#2770EF',
    50: '#71A1F4',
    40: '#ABC7F9',
    30: '#CEDCF5',
    20: '#DEE8FA',
    10: '#F2F7FF',
  },

  // Gray Scale (Neutral)
  gray: {
    100: '#000000',
    90: '#1D232F',
    80: '#323946',
    70: '#4A515E',
    60: '#777E8B',
    50: '#A5ACB9',
    40: '#C0C6CF',
    30: '#DBDFE7',
    20: '#EAEDF2',
    10: '#F6F8FA',
    0: '#FFFFFF',
  },

  // Green Scale (Success)
  green: {
    100: '#001F14',
    90: '#003B26',
    80: '#025B3C',
    70: '#049160',
    60: '#06BF7F',
    50: '#56D3A8',
    40: '#9BE5CB',
    30: '#C7F2E3',
    20: '#E0F8EF',
    10: '#EDFFF9',
  },

  // Yellow Scale (Warning)
  yellow: {
    100: '#2E2200',
    90: '#4F3D09',
    80: '#785F1A',
    70: '#BF982A',
    60: '#FCC838',
    50: '#FCD977',
    40: '#FDE9AF',
    30: '#FCF1D1',
    20: '#FFF8E5',
    10: '#FFFBF0',
  },

  // Red Scale (Error/Failure)
  red: {
    100: '#1F0003',
    90: '#3D090E',
    80: '#721F27',
    70: '#B6313E',
    60: '#E22B3D',
    50: '#F47E89',
    40: '#F9B3B9',
    30: '#FCD4D7',
    20: '#FFEBEC',
    10: '#FFF0F0',
  },

  // Purple Scale (Date/Time)
  purple: {
    100: '#0D0030',
    90: '#210F4F',
    80: '#422E75',
    70: '#6847BA',
    60: '#8C62F5',
    50: '#B094F8',
    40: '#D1C0FB',
    30: '#E3D9FC',
    20: '#F0EBFF',
    10: '#F7F5FF',
  },

  // Orange Scale (Accent)
  orange: {
    100: '#331100',
    90: '#471F0B',
    80: '#7A3D1F',
    70: '#C26232',
    60: '#FF8142',
    50: '#FFA97E',
    40: '#FFCCB3',
    30: '#FFDDCC',
    20: '#FFEEE5',
    10: '#FFF5F0',
  },

  // Teal Scale (Info)
  teal: {
    100: '#002D33',
    90: '#0C3F45',
    80: '#22636B',
    70: '#359FAA',
    60: '#48D1E0',
    50: '#82DFE9',
    40: '#B5ECF2',
    30: '#C9F0F5',
    20: '#E1F7FA',
    10: '#EDFDFF',
  },

  // Base Colors
  white: '#FFFFFF',
  black: '#000000',

  // Toned variants (for subtle backgrounds)
  whiteToned: '#FAFBFC',
  blackToned: '#1C2330',
} as const;

// Type exports for brand colors
export type BrandColors = typeof brandColors;
export type BlueScale = keyof typeof brandColors.blue;
export type GrayScale = keyof typeof brandColors.gray;
export type GreenScale = keyof typeof brandColors.green;
export type YellowScale = keyof typeof brandColors.yellow;
export type RedScale = keyof typeof brandColors.red;
export type PurpleScale = keyof typeof brandColors.purple;
export type OrangeScale = keyof typeof brandColors.orange;
export type TealScale = keyof typeof brandColors.teal;

// Extended color scale type (10-100 range)
export type ColorScale = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

