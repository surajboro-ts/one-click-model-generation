/**
 * Color Token Exports
 *
 * Main entry point for all color tokens.
 * 3-layer architecture: Reference -> System -> Component
 */

// 3-layer token exports
export { referenceColors } from './reference';
export type { ReferenceColors } from './reference';
export { systemColors } from './system';
export type { SystemColors, SystemColorKey } from './system';
export { rdComponentColors } from './component';
export type { RdComponentColors, RdComponentColorKey } from './component';

// Charts (standalone, no migration needed)
export * from './charts';
