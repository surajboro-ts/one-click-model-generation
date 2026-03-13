import { systemColors } from '@tokens/colors/system';

export const colors = {
  pageBg: '#F6F8FA',
  headerBg: '#FFFFFF',
  editHeaderBg: '#1C2029',
  textPrimary: '#1D232F',
  textSecondary: '#777E8B',
  textOnDark: '#FFFFFF',
  textOnDarkMuted: '#C0C6CF',
  brand: '#2770EF',
  border: '#EAEDF2',
  borderDark: '#C0C6CF',
} as const;

export const typography = {
  fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

export const shadows = {
  header: '0px 0px 4px 0px rgba(25,35,49,0.1), 0px 2px 4px 0px rgba(25,35,49,0.04)',
} as const;

export const layout = {
  headerHeight: 60,
  tabBarHeight: 60,
} as const;
