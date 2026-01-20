/**
 * Chart Color Tokens
 * 
 * Dedicated color palette for data visualization.
 * These colors are optimized for accessibility and differentiation.
 */

import { brandColors } from './brand';

/**
 * Primary chart color palette
 * Use these as the main colors for data series
 */
export const chartPalette = {
  // Primary data series colors (in order of usage)
  primary: [
    brandColors.blue[60],    // #2770EF - Primary blue
    brandColors.teal[60],    // #48D1E0 - Teal
    brandColors.green[60],   // #06BF7F - Green
    brandColors.yellow[60],  // #FCC838 - Yellow
    brandColors.purple[60],  // #8C62F5 - Purple
    brandColors.orange[60],  // #FF8142 - Orange
    brandColors.red[60],     // #E22B3D - Red
    brandColors.gray[60],    // #777E8B - Gray
  ],

  // Extended palette for more data series
  extended: [
    brandColors.blue[50],
    brandColors.teal[50],
    brandColors.green[50],
    brandColors.yellow[50],
    brandColors.purple[50],
    brandColors.orange[50],
    brandColors.red[50],
    brandColors.blue[70],
    brandColors.teal[70],
    brandColors.green[70],
    brandColors.yellow[70],
    brandColors.purple[70],
    brandColors.orange[70],
    brandColors.red[70],
  ],
} as const;

/**
 * Sequential color scales
 * For showing progression or magnitude
 */
export const sequentialScales = {
  blue: [
    brandColors.blue[10],
    brandColors.blue[20],
    brandColors.blue[30],
    brandColors.blue[40],
    brandColors.blue[50],
    brandColors.blue[60],
    brandColors.blue[70],
    brandColors.blue[80],
  ],
  green: [
    brandColors.green[10],
    brandColors.green[20],
    brandColors.green[30],
    brandColors.green[40],
    brandColors.green[50],
    brandColors.green[60],
    brandColors.green[70],
  ],
  gray: [
    brandColors.gray[10],
    brandColors.gray[20],
    brandColors.gray[30],
    brandColors.gray[40],
    brandColors.gray[50],
    brandColors.gray[60],
    brandColors.gray[70],
    brandColors.gray[80],
    brandColors.gray[90],
  ],
} as const;

/**
 * Diverging color scales
 * For showing deviation from a center point (positive/negative)
 */
export const divergingScales = {
  redToGreen: [
    brandColors.red[60],
    brandColors.red[40],
    brandColors.red[20],
    brandColors.gray[10],
    brandColors.green[20],
    brandColors.green[40],
    brandColors.green[60],
  ],
  blueToOrange: [
    brandColors.blue[60],
    brandColors.blue[40],
    brandColors.blue[20],
    brandColors.gray[10],
    brandColors.orange[20],
    brandColors.orange[40],
    brandColors.orange[60],
  ],
} as const;

/**
 * Semantic chart colors
 * For consistent meaning across visualizations
 */
export const chartSemanticColors = {
  positive: brandColors.green[60],
  negative: brandColors.red[60],
  neutral: brandColors.gray[60],
  warning: brandColors.yellow[60],
  info: brandColors.blue[60],
  
  // Comparison colors
  current: brandColors.blue[60],
  previous: brandColors.gray[40],
  target: brandColors.green[60],
  actual: brandColors.blue[60],
  
  // Threshold colors
  above: brandColors.green[60],
  below: brandColors.red[60],
  onTarget: brandColors.yellow[60],
} as const;

/**
 * Chart background and grid colors
 */
export const chartBackgroundColors = {
  background: brandColors.white,
  backgroundAlt: brandColors.gray[10],
  grid: brandColors.gray[20],
  gridSubtle: brandColors.gray[10],
  axis: brandColors.gray[40],
  axisLabel: brandColors.gray[60],
  tooltip: brandColors.gray[90],
  tooltipText: brandColors.white,
} as const;

/**
 * Generate a color from the palette by index
 * Cycles through the palette if index exceeds length
 */
export const getChartColor = (index: number): string => {
  const palette = [...chartPalette.primary, ...chartPalette.extended];
  return palette[index % palette.length];
};

/**
 * Generate an array of colors for a given number of data series
 */
export const getChartColors = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => getChartColor(i));
};

// Type exports
export type ChartPalette = typeof chartPalette;
export type SequentialScale = keyof typeof sequentialScales;
export type DivergingScale = keyof typeof divergingScales;
export type ChartSemanticColor = keyof typeof chartSemanticColors;

