/**
 * Version History Data
 * 
 * Tracks version history for Radiant design system updates.
 * Includes component additions, modifications, Figma syncs, and removals.
 */

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
    version: '1.5.0',
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
    version: '1.4.0',
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
    version: '1.3.0',
    date: '2026-01-30',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Popover', description: 'New interactive overlay component' },
      { type: 'added', component: 'Tooltip', description: 'Lightweight tooltip component' },
      { type: 'added', component: 'Table', description: 'Data table with sorting and selection' },
    ],
  },
  {
    version: '1.2.1',
    date: '2026-01-28',
    type: 'figma-sync',
    changes: [
      { type: 'synced', component: 'Button', description: 'Updated hover states from Figma' },
      { type: 'synced', component: 'Chip', description: 'Synced color tokens from Figma' },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-01-25',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Select', description: 'Dropdown select component with search' },
      { type: 'modified', component: 'TextInput', description: 'Added password visibility toggle' },
      { type: 'modified', component: 'Modal', description: 'Improved animation transitions' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-20',
    type: 'minor',
    changes: [
      { type: 'added', component: 'Modal', description: 'Dialog modal component' },
      { type: 'added', component: 'Tabs', description: 'Tab navigation component' },
      { type: 'added', component: 'Alert', description: 'Status alert banners' },
    ],
  },
  {
    version: '1.0.1',
    date: '2026-01-15',
    type: 'patch',
    changes: [
      { type: 'modified', component: 'Button', description: 'Fixed disabled state opacity' },
      { type: 'modified', component: 'Checkbox', description: 'Improved focus ring styling' },
    ],
  },
  {
    version: '1.0.0',
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
  return versionHistory[0]?.version || '1.0.0';
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
      return '#06BF7F'; // green
    case 'modified':
      return '#2770EF'; // blue
    case 'removed':
      return '#E22B3D'; // red
    case 'synced':
      return '#8B5CF6'; // purple
    default:
      return '#777E8B'; // gray
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
