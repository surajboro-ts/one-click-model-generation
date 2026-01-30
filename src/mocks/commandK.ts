/**
 * Command+K Modal Mock Data
 * 
 * Sample data for the Command+K search modal prototype.
 * Includes recent items, recommended actions, and quick links.
 * 
 * @example
 * ```tsx
 * import { commandK } from '../../mocks';
 * 
 * const recentItems = commandK.recent;
 * const recommendations = commandK.recommended;
 * ```
 */

/**
 * Result type identifiers
 */
export type CommandKResultType = 
  | 'answer'
  | 'answer-in-lb'
  | 'model'
  | 'navigate'
  | 'admin-settings'
  | 'spotter'
  | 'create'
  | 'help';

/**
 * Icon names for each result type
 */
export type CommandKIconType =
  | 'answer'
  | 'liveboard'
  | 'model'
  | 'settings'
  | 'create'
  | 'navigate'
  | 'spotter'
  | 'info';

/**
 * Command+K result item interface
 */
export interface CommandKResult {
  id: string;
  type: CommandKResultType;
  icon: CommandKIconType;
  title: string;
  location?: string;
  author?: string;
  typeLabel: string;
}

/**
 * Context filter interface
 */
export interface CommandKFilter {
  id: string;
  type: 'admin-settings' | 'answers' | 'liveboards' | 'models' | 'collections';
  label: string;
  icon: CommandKIconType;
}

/**
 * Keyboard shortcut interface
 */
export interface KeyboardShortcut {
  keys: string;
  label: string;
}

/**
 * Recent search results
 */
export const recent: CommandKResult[] = [
  {
    id: 'recent-1',
    type: 'answer-in-lb',
    icon: 'answer',
    title: 'Total Sales by Region',
    location: 'in Customer Sales',
    author: 'by Anya Sharma',
    typeLabel: 'Answer (in a LB)',
  },
  {
    id: 'recent-2',
    type: 'answer',
    icon: 'answer',
    title: 'Total Sales by Region',
    author: 'by Anya Sharma',
    typeLabel: 'Answer',
  },
  {
    id: 'recent-3',
    type: 'admin-settings',
    icon: 'settings',
    title: 'Beta access',
    location: 'in Feature management',
    typeLabel: 'Admin Settings',
  },
  {
    id: 'recent-4',
    type: 'model',
    icon: 'model',
    title: 'Comment validate',
    location: 'in .myDBCTest',
    author: 'by bharathram.g',
    typeLabel: 'Model',
  },
  {
    id: 'recent-5',
    type: 'navigate',
    icon: 'navigate',
    title: 'SpotIQ Analysis',
    location: 'in Develop/ Analytics and alerts',
    typeLabel: 'Navigate',
  },
];

/**
 * Recommended actions and items
 */
export const recommended: CommandKResult[] = [
  {
    id: 'recommended-1',
    type: 'spotter',
    icon: 'spotter',
    title: 'Start a new spotter chat',
    typeLabel: 'Spotter',
  },
  {
    id: 'recommended-2',
    type: 'create',
    icon: 'create',
    title: 'Create a new answer',
    typeLabel: 'Create',
  },
  {
    id: 'recommended-3',
    type: 'create',
    icon: 'create',
    title: 'Create a new Liveboard',
    typeLabel: 'Create',
  },
  {
    id: 'recommended-4',
    type: 'create',
    icon: 'create',
    title: 'Create a new Collection',
    typeLabel: 'Create',
  },
];

/**
 * Quick links section
 */
export const quickLinks: CommandKResult[] = [
  {
    id: 'quicklink-1',
    type: 'help',
    icon: 'info',
    title: 'Comment validate',
    typeLabel: 'Help',
  },
  {
    id: 'quicklink-2',
    type: 'help',
    icon: 'info',
    title: 'Developer Docs',
    typeLabel: 'Help',
  },
  {
    id: 'quicklink-3',
    type: 'help',
    icon: 'info',
    title: 'Muze Charts Docs',
    typeLabel: 'Help',
  },
];

/**
 * Admin settings results
 */
export const adminSettings: CommandKResult[] = [
  {
    id: 'admin-1',
    type: 'admin-settings',
    icon: 'settings',
    title: 'Admin settings',
    typeLabel: 'Admin Settings',
  },
  {
    id: 'admin-2',
    type: 'admin-settings',
    icon: 'settings',
    title: 'Profile settings',
    typeLabel: 'Admin Settings',
  },
  {
    id: 'admin-3',
    type: 'admin-settings',
    icon: 'settings',
    title: 'Beta access',
    location: 'in Feature management',
    typeLabel: 'Admin Settings',
  },
  {
    id: 'admin-4',
    type: 'admin-settings',
    icon: 'settings',
    title: 'Security settings',
    location: 'in Admin',
    typeLabel: 'Admin Settings',
  },
];

/**
 * Available context filters
 */
export const filters: CommandKFilter[] = [
  {
    id: 'filter-admin',
    type: 'admin-settings',
    label: 'Admin Settings',
    icon: 'settings',
  },
  {
    id: 'filter-answers',
    type: 'answers',
    label: 'Answers',
    icon: 'answer',
  },
  {
    id: 'filter-liveboards',
    type: 'liveboards',
    label: 'Liveboards',
    icon: 'liveboard',
  },
  {
    id: 'filter-models',
    type: 'models',
    label: 'Models',
    icon: 'model',
  },
  {
    id: 'filter-collections',
    type: 'collections',
    label: 'Collections',
    icon: 'liveboard',
  },
];

/**
 * Keyboard shortcuts displayed in footer
 */
export const keyboardShortcuts: KeyboardShortcut[] = [
  { keys: '↑ ↓', label: 'Navigate' },
  { keys: '↵', label: 'Select' },
  { keys: 'Shift + ↵', label: 'Open in new tab' },
  { keys: '⌘ + ↵', label: 'Open in Spotter' },
];

/**
 * Search placeholder text
 */
export const searchPlaceholder = 'Search objects or navigate anywhere in ThoughtSpot';

/**
 * Icon mapping for result types
 */
export const iconMap: Record<CommandKIconType, string> = {
  answer: 'answer',
  liveboard: 'liveboard',
  model: 'save',
  settings: 'cog',
  create: 'plus',
  navigate: 'arrow-right',
  spotter: 'star',
  info: 'info-circle',
};

/**
 * Type label styling variants
 */
export const typeLabelVariants: Record<CommandKResultType, string> = {
  'answer': 'default',
  'answer-in-lb': 'default',
  'model': 'default',
  'navigate': 'default',
  'admin-settings': 'default',
  'spotter': 'info',
  'create': 'success',
  'help': 'muted',
};

/**
 * All results grouped by section
 */
export const allResults = {
  recent,
  recommended,
  quickLinks,
  adminSettings,
};

/**
 * Default export with all command-k mock data
 */
export default {
  recent,
  recommended,
  quickLinks,
  adminSettings,
  filters,
  keyboardShortcuts,
  searchPlaceholder,
  iconMap,
  typeLabelVariants,
  allResults,
};
