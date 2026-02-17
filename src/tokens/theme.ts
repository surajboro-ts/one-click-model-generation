/**
 * Theme System
 *
 * Provides theme context and utilities for React components.
 * Uses the new 3-layer token architecture (reference -> system -> component).
 */

import { systemColors } from './colors/system';
import type { SystemColorKey } from './colors/system';
import { rdComponentColors } from './colors/component';
import type { RdComponentColorKey } from './colors/component';

// Theme names
export type ThemeName = 'light' | 'dark' | 'system';

// Theme mode (resolved value)
export type ThemeMode = 'light' | 'dark';

// Theme configuration
export interface ThemeConfig {
  name: ThemeName;
  mode: ThemeMode;
  system: Record<SystemColorKey, string>;
  component: Record<RdComponentColorKey, string>;
}

// Light theme configuration
export const lightTheme: ThemeConfig = {
  name: 'light',
  mode: 'light',
  system: systemColors.light,
  component: rdComponentColors.light,
};

// Dark theme configuration
export const darkTheme: ThemeConfig = {
  name: 'dark',
  mode: 'dark',
  system: systemColors.dark,
  component: rdComponentColors.dark,
};

/**
 * Get theme by name
 */
export const getTheme = (name: ThemeMode): ThemeConfig => {
  return name === 'dark' ? darkTheme : lightTheme;
};

/**
 * Resolve system theme preference
 */
export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Apply theme to document
 */
export const applyTheme = (theme: ThemeName): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
};

/**
 * Watch for system theme changes
 */
export const watchSystemTheme = (callback: (mode: ThemeMode) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handler);
  
  return () => mediaQuery.removeEventListener('change', handler);
};

/**
 * Theme tokens object for easy access
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type Themes = typeof themes;

