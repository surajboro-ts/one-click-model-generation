/**
 * Mock data for Command Palette
 * Based on the Figma design: Command-K
 */

export interface CommandItemData {
  id: string;
  icon: string;
  iconColor?: string;
  title: string;
  titleHighlight?: string;
  context?: string;
  author?: string;
  actionType: string;
  hasMenu?: boolean;
  hasChat?: boolean;
}

export interface CommandGroup {
  id: string;
  title: string;
  items: CommandItemData[];
}

// Recent items from the design
export const recentItems: CommandItemData[] = [
  {
    id: '1',
    icon: 'chart',
    iconColor: 'blue',
    title: 'Total',
    titleHighlight: 'Sales',
    context: 'in Customer Sales',
    author: 'by Anya Sharma',
    actionType: 'Answer (in a LB)',
  },
  {
    id: '2',
    icon: 'chart',
    iconColor: 'blue',
    title: 'Total',
    titleHighlight: 'Sales',
    context: 'in ... Sales',
    author: 'by Anya Sharma',
    actionType: 'Answer (in a LB)',
  },
  {
    id: '3',
    icon: 'chart',
    iconColor: 'blue',
    title: 'Total',
    titleHighlight: 'Sales',
    context: 'by Region',
    author: 'by Anya Sharma',
    actionType: 'Answer',
  },
  {
    id: '4',
    icon: 'star',
    iconColor: 'default',
    title: 'Beta access',
    context: 'in Feature management',
    actionType: 'Admin Settings',
  },
  {
    id: '5',
    icon: 'folder',
    iconColor: 'default',
    title: 'Comment validate',
    context: 'in myDBCTest',
    author: 'by bharathram.g',
    actionType: 'Model',
    hasMenu: true,
    hasChat: true,
  },
  {
    id: '6',
    icon: 'play',
    iconColor: 'purple',
    title: 'SpotIQ Analysis',
    context: 'in Develop/ Analytics and alerts',
    actionType: 'Navigate',
  },
];

// Create options from the design
export const createItems: CommandItemData[] = [
  {
    id: 'create-1',
    icon: 'star',
    iconColor: 'default',
    title: 'New Spotter chat',
    actionType: 'Spotter',
  },
  {
    id: 'create-2',
    icon: 'plus',
    iconColor: 'default',
    title: 'New Answer',
    actionType: 'Create',
  },
  {
    id: 'create-3',
    icon: 'plus',
    iconColor: 'default',
    title: 'New Liveboard',
    actionType: 'Create',
  },
  {
    id: 'create-4',
    icon: 'plus',
    iconColor: 'default',
    title: 'New Collection',
    actionType: 'Create',
  },
  {
    id: 'create-5',
    icon: 'plus',
    iconColor: 'default',
    title: 'New Connection',
    actionType: 'Create',
  },
];

// Command groups
export const commandGroups: CommandGroup[] = [
  {
    id: 'recent',
    title: 'Recent',
    items: recentItems,
  },
  {
    id: 'create',
    title: 'Create',
    items: createItems,
  },
];

// Keyboard shortcuts for the bottom bar
export const keyboardShortcuts = [
  { keys: ['↑', '↓'], label: 'Navigate' },
  { keys: ['↵'], label: 'Select' },
  { keys: ['Shift', '↵'], label: 'Open in new tab' },
  { keys: ['*', '↵'], label: 'Open in Spotter' },
];
