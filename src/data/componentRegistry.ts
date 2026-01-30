/**
 * Component Registry
 * 
 * Comprehensive metadata for all Radiant design system components.
 * Tracks Figma sync status, component states, and source information.
 */

export type ComponentSource = 'figma' | 'scaligent' | 'custom';
export type ComponentStatus = 'stable' | 'beta' | 'new' | 'deprecated';

export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  states: string[];
  path: string;
  figmaNodeId?: string;
  figmaFileKey?: string;
  lastFigmaSync?: string;
  lastModified: string;
  source: ComponentSource;
  status: ComponentStatus;
  variants: number;
  author?: string;
  category: string;
}

/**
 * Component registry with metadata for all Radiant components
 */
export const componentRegistry: ComponentMeta[] = [
  // Selection Controls
  {
    id: 'button',
    name: 'Button',
    description: 'Primary, secondary, and tertiary buttons for actions',
    states: ['default', 'hover', 'active', 'disabled', 'loading'],
    path: '/radiant/components/button',
    figmaNodeId: '1234:5678',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-28',
    lastModified: '2026-01-30',
    source: 'figma',
    status: 'stable',
    variants: 3,
    author: 'Design Team',
    category: 'Actions',
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Selection controls for multiple choices',
    states: ['unchecked', 'checked', 'indeterminate', 'disabled'],
    path: '/radiant/components/checkbox',
    figmaNodeId: '2345:6789',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-25',
    lastModified: '2026-01-28',
    source: 'figma',
    status: 'stable',
    variants: 3,
    author: 'Design Team',
    category: 'Selection Controls',
  },
  {
    id: 'radio',
    name: 'Radio',
    description: 'Single selection from a group of options',
    states: ['unselected', 'selected', 'disabled'],
    path: '/radiant/components/radio',
    figmaNodeId: '3456:7890',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-25',
    lastModified: '2026-01-25',
    source: 'figma',
    status: 'stable',
    variants: 2,
    author: 'Design Team',
    category: 'Selection Controls',
  },
  {
    id: 'toggle',
    name: 'Toggle',
    description: 'Switch control for on/off states',
    states: ['off', 'on', 'disabled'],
    path: '/radiant/components/toggle',
    figmaNodeId: '4567:8901',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-20',
    lastModified: '2026-01-25',
    source: 'figma',
    status: 'stable',
    variants: 2,
    author: 'Design Team',
    category: 'Selection Controls',
  },

  // Inputs
  {
    id: 'textinput',
    name: 'TextInput',
    description: 'Text input fields with labels and validation',
    states: ['default', 'focus', 'error', 'success', 'disabled'],
    path: '/radiant/components/textinput',
    figmaNodeId: '5678:9012',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-25',
    lastModified: '2026-01-28',
    source: 'figma',
    status: 'stable',
    variants: 3,
    author: 'Design Team',
    category: 'Inputs',
  },
  {
    id: 'searchinput',
    name: 'SearchInput',
    description: 'Search input with clear button',
    states: ['empty', 'filled', 'focus', 'disabled'],
    path: '/radiant/components/searchinput',
    figmaNodeId: '6789:0123',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-20',
    lastModified: '2026-01-22',
    source: 'figma',
    status: 'stable',
    variants: 2,
    author: 'Design Team',
    category: 'Inputs',
  },
  {
    id: 'select',
    name: 'Select',
    description: 'Dropdown select component with search',
    states: ['default', 'open', 'selected', 'disabled'],
    path: '/radiant/components/select',
    figmaNodeId: '7890:1234',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-25',
    lastModified: '2026-01-28',
    source: 'figma',
    status: 'new',
    variants: 3,
    author: 'Design Team',
    category: 'Inputs',
  },

  // Feedback
  {
    id: 'alert',
    name: 'Alert',
    description: 'Status alert banners for feedback',
    states: ['info', 'success', 'warning', 'error'],
    path: '/radiant/components/alert',
    figmaNodeId: '8901:2345',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-20',
    lastModified: '2026-01-22',
    source: 'figma',
    status: 'stable',
    variants: 5,
    author: 'Design Team',
    category: 'Feedback',
  },
  {
    id: 'modal',
    name: 'Modal',
    description: 'Dialog modal for focused interactions',
    states: ['open', 'closed'],
    path: '/radiant/components/modal',
    figmaNodeId: '9012:3456',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-25',
    lastModified: '2026-01-28',
    source: 'figma',
    status: 'stable',
    variants: 2,
    author: 'Design Team',
    category: 'Feedback',
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'Lightweight tooltip for contextual info',
    states: ['hidden', 'visible'],
    path: '/radiant/components/tooltip',
    figmaNodeId: '0123:4567',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-30',
    lastModified: '2026-01-30',
    source: 'figma',
    status: 'new',
    variants: 4,
    author: 'Design Team',
    category: 'Feedback',
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'Interactive overlay for rich content',
    states: ['closed', 'open'],
    path: '/radiant/components/popover',
    figmaNodeId: '1234:5679',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-30',
    lastModified: '2026-01-30',
    source: 'figma',
    status: 'new',
    variants: 2,
    author: 'Design Team',
    category: 'Feedback',
  },

  // Data Display
  {
    id: 'table',
    name: 'Table',
    description: 'Data table with sorting and selection',
    states: ['default', 'loading', 'empty', 'error'],
    path: '/radiant/components/table',
    figmaNodeId: '2345:6790',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-30',
    lastModified: '2026-01-30',
    source: 'scaligent',
    status: 'new',
    variants: 3,
    author: 'Engineering Team',
    category: 'Data Display',
  },
  {
    id: 'chip',
    name: 'Chip',
    description: 'Chips for tags, filters, and selections',
    states: ['default', 'hover', 'pressed', 'disabled'],
    path: '/radiant/components/chip',
    figmaNodeId: '3456:7891',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-28',
    lastModified: '2026-01-28',
    source: 'figma',
    status: 'stable',
    variants: 4,
    author: 'Design Team',
    category: 'Data Display',
  },

  // Navigation
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tab navigation for content sections',
    states: ['default', 'active', 'disabled'],
    path: '/radiant/components/tabs',
    figmaNodeId: '4567:8902',
    figmaFileKey: 'ABC123',
    lastFigmaSync: '2026-01-20',
    lastModified: '2026-01-22',
    source: 'figma',
    status: 'stable',
    variants: 2,
    author: 'Design Team',
    category: 'Navigation',
  },
];

/**
 * Get component by ID
 */
export const getComponent = (id: string): ComponentMeta | undefined => {
  return componentRegistry.find((c) => c.id === id);
};

/**
 * Get all components
 */
export const getAllComponents = (): ComponentMeta[] => {
  return componentRegistry;
};

/**
 * Get components by category
 */
export const getComponentsByCategory = (category: string): ComponentMeta[] => {
  return componentRegistry.filter((c) => c.category === category);
};

/**
 * Get components by source
 */
export const getComponentsBySource = (source: ComponentSource): ComponentMeta[] => {
  return componentRegistry.filter((c) => c.source === source);
};

/**
 * Get components by status
 */
export const getComponentsByStatus = (status: ComponentStatus): ComponentMeta[] => {
  return componentRegistry.filter((c) => c.status === status);
};

/**
 * Get unique categories
 */
export const getCategories = (): string[] => {
  return [...new Set(componentRegistry.map((c) => c.category))];
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Get source display label
 */
export const getSourceLabel = (source: ComponentSource): string => {
  switch (source) {
    case 'figma':
      return 'Figma';
    case 'scaligent':
      return 'Scaligent';
    case 'custom':
      return 'Custom';
    default:
      return source;
  }
};

/**
 * Get status color
 */
export const getStatusColor = (status: ComponentStatus): { bg: string; text: string } => {
  switch (status) {
    case 'stable':
      return { bg: '#06BF7F1A', text: '#06BF7F' };
    case 'beta':
      return { bg: '#F5A6231A', text: '#F5A623' };
    case 'new':
      return { bg: '#2770EF1A', text: '#2770EF' };
    case 'deprecated':
      return { bg: '#E22B3D1A', text: '#E22B3D' };
    default:
      return { bg: '#777E8B1A', text: '#777E8B' };
  }
};
