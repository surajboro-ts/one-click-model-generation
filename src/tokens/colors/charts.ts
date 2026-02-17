/**
 * Chart Color Tokens
 *
 * Dedicated color palette for data visualization.
 * These colors are optimized for accessibility and differentiation.
 */

import { referenceColors } from './reference';

/**
 * Primary chart color palette
 * Use these as the main colors for data series
 */
export const chartPalette = {
  primary: [
    referenceColors.brand['60'],   // #2770EF - Primary blue
    referenceColors.teal['60'],    // #48D1E0 - Teal
    referenceColors.green['60'],   // #06BF7F - Green
    referenceColors.yellow['60'],  // #FCC838 - Yellow
    referenceColors.purple['60'],  // #8C62F5 - Purple
    referenceColors.orange['60'],  // #FF8142 - Orange
    referenceColors.red['60'],     // #E22B3D - Red
    referenceColors.gray['60'],    // #777E8B - Gray
  ],

  extended: [
    referenceColors.brand['50'],
    referenceColors.teal['50'],
    referenceColors.green['50'],
    referenceColors.yellow['50'],
    referenceColors.purple['50'],
    referenceColors.orange['50'],
    referenceColors.red['50'],
    referenceColors.brand['70'],
    referenceColors.teal['70'],
    referenceColors.green['70'],
    referenceColors.yellow['70'],
    referenceColors.purple['70'],
    referenceColors.orange['70'],
    referenceColors.red['70'],
  ],
} as const;

/**
 * Sequential color scales
 * For showing progression or magnitude
 */
export const sequentialScales = {
  blue: [
    referenceColors.blue['10'],
    referenceColors.blue['20'],
    referenceColors.blue['30'],
    referenceColors.blue['40'],
    referenceColors.blue['50'],
    referenceColors.blue['60'],
    referenceColors.blue['70'],
    referenceColors.blue['80'],
  ],
  green: [
    referenceColors.green['10'],
    referenceColors.green['20'],
    referenceColors.green['30'],
    referenceColors.green['40'],
    referenceColors.green['50'],
    referenceColors.green['60'],
    referenceColors.green['70'],
  ],
  gray: [
    referenceColors.gray['10'],
    referenceColors.gray['20'],
    referenceColors.gray['30'],
    referenceColors.gray['40'],
    referenceColors.gray['50'],
    referenceColors.gray['60'],
    referenceColors.gray['70'],
    referenceColors.gray['80'],
    referenceColors.gray['90'],
  ],
} as const;

/**
 * Diverging color scales
 * For showing deviation from a center point (positive/negative)
 */
export const divergingScales = {
  redToGreen: [
    referenceColors.red['60'],
    referenceColors.red['40'],
    referenceColors.red['20'],
    referenceColors.gray['10'],
    referenceColors.green['20'],
    referenceColors.green['40'],
    referenceColors.green['60'],
  ],
  blueToOrange: [
    referenceColors.brand['60'],
    referenceColors.brand['40'],
    referenceColors.brand['20'],
    referenceColors.gray['10'],
    referenceColors.orange['20'],
    referenceColors.orange['40'],
    referenceColors.orange['60'],
  ],
} as const;

/**
 * Semantic chart colors
 * For consistent meaning across visualizations
 */
export const chartSemanticColors = {
  positive: referenceColors.green['60'],
  negative: referenceColors.red['60'],
  neutral: referenceColors.gray['60'],
  warning: referenceColors.yellow['60'],
  info: referenceColors.brand['60'],

  current: referenceColors.brand['60'],
  previous: referenceColors.gray['40'],
  target: referenceColors.green['60'],
  actual: referenceColors.brand['60'],

  above: referenceColors.green['60'],
  below: referenceColors.red['60'],
  onTarget: referenceColors.yellow['60'],
} as const;

/**
 * Chart background and grid colors
 */
export const chartBackgroundColors = {
  background: referenceColors.white,
  backgroundAlt: referenceColors.gray['10'],
  grid: referenceColors.gray['20'],
  gridSubtle: referenceColors.gray['10'],
  axis: referenceColors.gray['40'],
  axisLabel: referenceColors.gray['60'],
  tooltip: referenceColors.gray['90'],
  tooltipText: referenceColors.white,
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

export type ChartPalette = typeof chartPalette;
export type SequentialScale = keyof typeof sequentialScales;
export type DivergingScale = keyof typeof divergingScales;
export type ChartSemanticColor = keyof typeof chartSemanticColors;
