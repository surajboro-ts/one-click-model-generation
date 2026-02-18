/**
 * Command Palette Type Definitions
 * 
 * Shared types for the Command Palette prototype.
 */

import type { IconName } from '../../components/icons';
import type { ComponentType } from 'react';

/**
 * Page context for context-aware filter ranking
 */
export type PageContext = 
  | 'default'
  | 'answer'
  | 'liveboard'
  | 'admin'
  | 'spotter'
  | 'help'
  | 'navigate'
  | 'create';

/**
 * UI variant options for result cards
 */
export type CardVariant = 
  | 'figmaSpec'
  | 'compact'
  | 'spacious'
  | 'twoLine16'
  | 'twoLine20';

/**
 * Command item type
 */
export type CommandItemType = 'result' | 'filter' | 'create';

export type AppTab = 'insights' | 'data' | 'develop' | 'admin';

export type ThoughtSpotObjectType =
  | 'Liveboard'
  | 'Answer'
  | 'Collection'
  | 'Data Model'
  | 'Table'
  | 'Connection';

/**
 * Command item data structure
 */
export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description text */
  description?: string;
  /** Context information (e.g., folder path) */
  context?: string;
  /** Right-aligned label (e.g., item type) */
  rightLabel: string;
  /** Icon name from Radiant icon system */
  icon: IconName;
  /** Group/category this item belongs to */
  group: string;
  /** Item type for filtering */
  type?: CommandItemType;
  /** Author/creator name */
  author?: string;
  /** Optional tags used in search matching */
  tags?: string[];
  /** Additional keywords used in search matching */
  keywords?: string[];
  /** Navigation page target */
  page?: string;
  /** Optional tab within a page */
  tab?: string;
  /** Optional top-level app tab target */
  appTab?: AppTab;
  /** Optional action id for non-navigation commands */
  action?: string;
  /** Optional query payload */
  query?: string;
  /** Special marker for Spotter commands */
  isSpotter?: boolean;
  /** Special marker for "View all" command */
  isViewAll?: boolean;
  /** Marker for data-object-backed result */
  isObject?: boolean;
  /** Linked object id */
  objectId?: string;
  /** Linked object type */
  objectType?: ThoughtSpotObjectType;
}

/**
 * Filter option for "/" filter feature
 */
export interface FilterOption {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon name from Radiant icon system */
  icon: IconName;
  /** Right-aligned label */
  rightLabel: string;
  /** Filter type for matching items */
  filterType: string;
}

/**
 * Props for ResultCard components
 */
export interface ResultCardProps {
  /** Command item data */
  item: CommandItem;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Click handler */
  onClick: () => void;
  /** Current search query for highlighting */
  query?: string;
}

/**
 * Props for CommandPalette component
 */
export interface CommandPaletteProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Item selection handler */
  onSelect?: (item: CommandItem) => void;
  /** Filter selection handler */
  onFilterSelect?: (filter: FilterOption) => void;
  /** ResultCard component to use */
  ResultCardComponent?: ComponentType<ResultCardProps>;
  /** Page context for filter ranking */
  context?: PageContext;
  /** Optional filter chip id to pre-select on open */
  initialFilter?: string;
}

/**
 * Grouped command items by category
 */
export interface CommandGroup {
  /** Group identifier */
  id: string;
  /** Group title */
  title: string;
  /** Items in this group */
  items: CommandItem[];
}

/**
 * Keyboard shortcut definition
 */
export interface KeyboardShortcut {
  /** Keys to display */
  keys: string[];
  /** Action description */
  label: string;
}

/**
 * Context ranking configuration
 * Maps page context to ordered filter types
 */
export type ContextRankingMap = Record<PageContext, string[]>;

/**
 * Card variant configuration
 */
export interface CardVariantConfig {
  /** React component for this variant */
  component: ComponentType<ResultCardProps>;
  /** Display label */
  label: string;
  /** Description of the variant */
  description: string;
}

/**
 * Context option for dropdown
 */
export interface ContextOption {
  /** Context identifier */
  id: PageContext;
  /** Display label */
  label: string;
  /** Description text */
  description: string;
}
