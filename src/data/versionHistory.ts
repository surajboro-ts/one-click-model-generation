/**
 * Version History Data
 *
 * Tracks version history for Radiant design system updates.
 * Includes component additions, modifications, Figma syncs, and removals.
 */
import { PLATFORM_VERSION } from './platformVersion';

export type ChangeType = 'added' | 'modified' | 'removed' | 'synced';
export type VersionType = 'major' | 'minor' | 'patch' | 'figma-sync';

export interface VersionChange {
  type: ChangeType;
  component: string;
  description: string;
}

export interface VersionEntry {
  version: string;
  date: string;
  type: VersionType;
  changes: VersionChange[];
}

/**
 * Version history entries - newest first
 */
export const versionHistory: VersionEntry[] = [
  {
    version: '26.4.1b',
    date: '2026-04-03',
    type: 'major',
    changes: [
      { type: 'added', component: 'Canvas 3-Tier Split', description: 'liveboard-canvas.md (568 lines) split into core (242), edit (238), advanced (100)' },
      { type: 'added', component: 'Requirements Gate', description: '4-question pre-build gate for Liveboard prototypes (mode, interactions, tiles, data)' },
      { type: 'added', component: 'UserPromptSubmit Hooks', description: 'Liveboard intent detection + post-compact convention recovery (~200 tokens/msg)' },
      { type: 'added', component: 'Claude Code Skills', description: '6 auto-activating skills: component-inventory, content-guidelines, token-usage, layout-patterns, widget-patterns, modal-patterns' },
      { type: 'added', component: 'Shared Tiles', description: '_shared/tiles/ with AnswerTile, ChartRenderer, and 12 chart types' },
      { type: 'added', component: 'SalesDashboard', description: 'Liveboard prototype with view/edit modes and SpotterViz panel' },
      { type: 'modified', component: 'CLAUDE.md', description: 'Trimmed 36% (210 → 135 lines) — guidelines moved to on-demand skills' },
      { type: 'modified', component: 'Always-loaded context', description: 'Reduced from ~424 lines (~3,200 tokens) to ~385 lines (~2,900 tokens)' },
      { type: 'removed', component: 'liveboard-canvas.md', description: 'Replaced by 3-tier canvas files (core + edit + advanced)' },
    ],
  },
  {
    version: '26.4.1a',
    date: '2026-04-01',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Pre-Implementation Gate', description: '4 checks before code: component exists, CSS anti-patterns, icon name, forbidden words' },
      { type: 'added', component: 'Iteration Loop Detection', description: 'Suggests batching after 3+ sequential single-property changes' },
      { type: 'added', component: 'MCP Overhead Awareness', description: 'Flags Figma MCP ~4,000 token overhead when idle' },
      { type: 'modified', component: 'ConfirmDialog', description: 'Removed non-Radiant gradient override from CSS' },
      { type: 'modified', component: 'Button Examples', description: 'All examples now include iconPosition prop' },
    ],
  },
  {
    version: '26.3.5a',
    date: '2026-03-31',
    type: 'major',
    changes: [
      { type: 'added', component: 'Orchestrator Tier System', description: 'Intent-based classification (Tier 0–3) with concern-matching — 81% context reduction' },
      { type: 'added', component: 'Context Budget Check', description: 'Proactive /compact suggestion when topic switches detected' },
      { type: 'added', component: 'Session Memory', description: 'Tracks loaded rule files to prevent redundant reads' },
      { type: 'added', component: 'Public Landing Page', description: 'Route middleware for unauthenticated access' },
      { type: 'modified', component: 'component-summary.md', description: 'Split as always-loaded quick reference (43 lines) from component-inventory (477)' },
      { type: 'modified', component: 'Rule Files', description: 'Reorganized: 21 files with description and globs frontmatter' },
    ],
  },
  {
    version: '26.3.3a',
    date: '2026-03-17',
    type: 'major',
    changes: [
      { type: 'added', component: 'Liveboard Template', description: 'Starter template with AnswerTile, KPI, bar chart, SpotterViz' },
      { type: 'added', component: 'AdminLang', description: 'Admin CSV-based translation settings prototype' },
      { type: 'added', component: 'MiniSpotters', description: 'Domain-specific Spotter instances with bounded context' },
      { type: 'added', component: 'Liveboard Scaffolding', description: 'liveboard-ia.md and liveboard-scaffolding.md rules' },
      { type: 'added', component: 'Workflow Skills', description: '/start, /ship, /release, /status, /sync-upstream commands' },
      { type: 'modified', component: 'Project Name', description: 'Renamed figmaradiant → radiantplay across all config and UI' },
      { type: 'modified', component: 'Playground Gallery', description: 'Redesigned with component counts and metadata cards' },
      { type: 'removed', component: 'Liveboard Prototype', description: 'Removed from gallery (replaced by template system)' },
      { type: 'removed', component: 'Admin Impersonation', description: 'Removed from registry' },
    ],
  },
  {
    version: '26.2.5a',
    date: '2026-03-05',
    type: 'minor',
    changes: [
      { type: 'added', component: 'UX Writing Guidelines', description: 'Spotter Writer rules integrated into Cursor agent (PR #1 by Yash Chauhan)' },
      { type: 'added', component: 'How It Works Page', description: 'Converted to slide-based format with tab navigation' },
      { type: 'added', component: 'Cursor Model Guide', description: 'Model selection guidance for designers' },
      { type: 'modified', component: 'Homepage', description: 'Redesigned with getting started guide' },
    ],
  },
  {
    version: '26.2.4a',
    date: '2026-03-02',
    type: 'minor',
    changes: [
      { type: 'added', component: '35 New Components', description: 'Horizontal, Vertical, View, Grid, SplitPane, NoData, ExplainerCard, Image, Illustration, Legend, SafeHTML, and 24 more' },
      { type: 'modified', component: 'Component Count', description: 'Updated from 38 → 73 in registry and all UI displays' },
      { type: 'modified', component: 'component-inventory.md', description: '6 new decision-tree sections, 4 new combination patterns' },
      { type: 'modified', component: 'widget-patterns.md', description: 'ActionMenu, DragDrop, Tree, and Tour patterns appended' },
    ],
  },
  {
    version: '26.2.2a',
    date: '2026-02-18',
    type: 'major',
    changes: [
      { type: 'added', component: 'Reference Tokens', description: '9 tonal scales (brand, gray, blue, green, red, yellow, orange, purple, teal) × 12 stops' },
      { type: 'added', component: 'System Tokens', description: '42 semantic tokens (background, content, border) with light/dark mode support' },
      { type: 'added', component: 'Component Tokens', description: '46 per-component tokens (button, chip, toggle) with light/dark mode' },
      { type: 'added', component: 'CSS Custom Properties', description: 'rd-sys-color-* and rd-comp-color-* variables in tokens.css' },
      { type: 'added', component: 'Dark Mode', description: 'Built-in light/dark mode via data-theme attribute' },
      { type: 'modified', component: 'All Components', description: 'Migrated 36 CSS modules and 48 TS files to new 3-layer token system' },
      { type: 'modified', component: 'Color System Page', description: 'Added System Tokens preview with 42 semantic tokens' },
      { type: 'modified', component: 'Architecture Page', description: 'Rewritten with Reference → System → Component documentation' },
      { type: 'removed', component: 'brand.ts / alias.ts / mapped.ts', description: 'Replaced by reference.ts, system.ts, and component.ts' },
    ],
  },
  {
    version: '26.2.1b',
    date: '2026-02-03',
    type: 'patch',
    changes: [
      { type: 'modified', component: 'Typography Page', description: 'Fixed page crash by removing invalid body-small variant' },
      { type: 'modified', component: 'Typography Page', description: 'Consolidated Typography documentation to /radiant/typography path' },
      { type: 'modified', component: 'App Routes', description: 'Added redirect from /radiant/components/typography to /radiant/typography' },
    ],
  },
  {
    version: '26.2.1a',
    date: '2026-02-03',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Surfaces Showcase', description: 'New Surfaces section showcasing Modal patterns (M1-M4) with interactive examples' },
      { type: 'added', component: 'ModalFooter', description: 'Reusable footer component with tertiary, secondary, and primary action slots' },
      { type: 'added', component: 'ModalHeader', description: 'Reusable header component with title, eyebrow, and close button' },
      { type: 'added', component: 'ModalWizardProgress', description: 'Progress bar component for wizard-type modals (2-4 steps)' },
      { type: 'added', component: 'ModalNavPanel', description: 'Left navigation panel for sub-navigation type modals' },
      { type: 'added', component: 'ModalSplashContent', description: 'Content component for splash screen modals' },
      { type: 'modified', component: 'Modal', description: 'Fixed spacing to match Figma specs (20px/24px padding), right-aligned CTAs in footer' },
      { type: 'modified', component: 'Modal.module.css', description: 'Added margin-left: auto to primaryActions for proper right alignment' },
      { type: 'removed', component: 'ModalPatterns', description: 'Removed from playground gallery (now available in Surfaces showcase)' },
    ],
  },
  {
    version: '26.1.4c',
    date: '2026-01-30',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Toast', description: 'Temporary notification component with auto-dismiss' },
      { type: 'added', component: 'TextArea', description: 'Multi-line text input with character counter' },
      { type: 'added', component: 'SegmentedControl', description: 'Mutually exclusive segment options (text/icon variants)' },
      { type: 'added', component: 'LoadingIndicator.Skeleton', description: 'Shimmer/skeleton loading placeholder variant' },
      { type: 'added', component: 'AvatarGroup', description: 'Stacked avatars with +N overflow indicator' },
      { type: 'added', component: 'TableCellRenderers', description: 'Helper utilities for Avatar, Chip, Status table cells' },
      { type: 'added', component: 'VersionHistoryPage', description: 'Full changelog page replacing popup panel' },
      { type: 'modified', component: 'DatePicker', description: 'Added Month and Year picker view modes' },
      { type: 'modified', component: 'Sidebar', description: 'Changed version footer to link to changelog page' },
    ],
  },
  {
    version: '26.1.4b',
    date: '2026-01-30',
    type: 'minor',
    changes: [
      // Phase 2: Core Components
      { type: 'added', component: 'LoadingIndicator', description: 'Contextual and global loading spinners' },
      { type: 'added', component: 'Avatar', description: 'User avatars with initials fallback and badges' },
      { type: 'added', component: 'Card', description: 'Content container with header, body, and footer' },
      { type: 'added', component: 'Typography', description: 'V2 typography system with 20+ variants' },
      { type: 'added', component: 'Divider', description: 'Horizontal and vertical line separators' },
      { type: 'added', component: 'Link', description: 'Styled anchor element for navigation' },
      // Phase 3: Interactive Components
      { type: 'added', component: 'Accordion', description: 'Collapsible content sections' },
      { type: 'added', component: 'Menu', description: 'Dropdown menu with items, groups, and dividers' },
      { type: 'added', component: 'Pagination', description: 'Page navigation with numbers, dots, and range' },
      { type: 'added', component: 'ProgressBar', description: 'Determinate and indeterminate progress indicator' },
      { type: 'added', component: 'Stepper', description: 'Multi-step process indicator' },
      // Phase 4: Advanced Components
      { type: 'added', component: 'DatePicker', description: 'Date selection input with calendar dropdown' },
      { type: 'added', component: 'IconGallery', description: 'Searchable gallery of available icons' },
      // Token Enhancements
      { type: 'modified', component: 'Tokens', description: 'Added complete color scales and V2 typography tokens' },
    ],
  },
  {
    version: '26.1.4a',
    date: '2026-01-30',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Popover', description: 'New interactive overlay component' },
      { type: 'added', component: 'Tooltip', description: 'Lightweight tooltip component' },
      { type: 'added', component: 'Table', description: 'Data table with sorting and selection' },
    ],
  },
  {
    version: '26.1.3c',
    date: '2026-01-28',
    type: 'figma-sync',
    changes: [
      { type: 'synced', component: 'Button', description: 'Updated hover states from Figma' },
      { type: 'synced', component: 'Chip', description: 'Synced color tokens from Figma' },
    ],
  },
  {
    version: '26.1.3b',
    date: '2026-01-25',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Select', description: 'Dropdown select component with search' },
      { type: 'modified', component: 'TextInput', description: 'Added password visibility toggle' },
      { type: 'modified', component: 'Modal', description: 'Improved animation transitions' },
    ],
  },
  {
    version: '26.1.3a',
    date: '2026-01-20',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Modal', description: 'Dialog modal component' },
      { type: 'added', component: 'Tabs', description: 'Tab navigation component' },
      { type: 'added', component: 'Alert', description: 'Status alert banners' },
    ],
  },
  {
    version: '26.1.2b',
    date: '2026-01-15',
    type: 'patch',
    changes: [
      { type: 'modified', component: 'Button', description: 'Fixed disabled state opacity' },
      { type: 'modified', component: 'Checkbox', description: 'Improved focus ring styling' },
    ],
  },
  {
    version: '26.1.2a',
    date: '2026-01-10',
    type: 'major',
    changes: [
      { type: 'added', component: 'Button', description: 'Initial button component with 3 variants' },
      { type: 'added', component: 'Checkbox', description: 'Checkbox with indeterminate state' },
      { type: 'added', component: 'Radio', description: 'Radio button group component' },
      { type: 'added', component: 'Toggle', description: 'Toggle switch component' },
      { type: 'added', component: 'TextInput', description: 'Text input with labels and validation' },
      { type: 'added', component: 'SearchInput', description: 'Search input with clear button' },
      { type: 'added', component: 'Chip', description: 'Chip component for tags and filters' },
    ],
  },
];

/**
 * Get the current version (latest entry)
 */
export const getCurrentVersion = (): string => {
  return PLATFORM_VERSION;
};

/**
 * Get recent version entries
 */
export const getRecentVersions = (count: number = 5): VersionEntry[] => {
  return versionHistory.slice(0, count);
};

/**
 * Get change type icon
 */
export const getChangeTypeIcon = (type: ChangeType): string => {
  switch (type) {
    case 'added':
      return '+';
    case 'modified':
      return '~';
    case 'removed':
      return '-';
    case 'synced':
      return '↻';
    default:
      return '•';
  }
};

/**
 * Get change type color
 */
export const getChangeTypeColor = (type: ChangeType): string => {
  switch (type) {
    case 'added':
      return 'var(--rd-sys-color-content-success, #06BF7F)';
    case 'modified':
      return 'var(--rd-sys-color-content-brand, #2770EF)';
    case 'removed':
      return 'var(--rd-sys-color-content-failure, #E22B3D)';
    case 'synced':
      return 'var(--rd-ref-color-purple-60, #8C62F5)';
    default:
      return 'var(--rd-sys-color-content-secondary, #777E8B)';
  }
};

/**
 * Get version type label
 */
export const getVersionTypeLabel = (type: VersionType): string => {
  switch (type) {
    case 'major':
      return 'Major Release';
    case 'minor':
      return 'Minor Release';
    case 'patch':
      return 'Patch';
    case 'figma-sync':
      return 'Figma Sync';
    default:
      return 'Update';
  }
};
