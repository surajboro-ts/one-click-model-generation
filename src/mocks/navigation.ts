/**
 * Mock Navigation Data
 * 
 * Sample menu structures and navigation items.
 */

import type { IconName } from '../components/icons/Icon.types';

export interface NavItem {
  id: string;
  label: string;
  icon?: IconName;
  href?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

/**
 * Main sidebar navigation
 */
export const sidebar: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'folder',
    href: '/',
  },
  {
    id: 'search',
    label: 'Search',
    icon: 'magnifying-glass',
    href: '/search',
  },
  {
    id: 'answers',
    label: 'Answers',
    icon: 'checkmark-circle',
    href: '/answers',
    badge: 12,
  },
  {
    id: 'liveboards',
    label: 'Liveboards',
    icon: 'folder',
    href: '/liveboards',
  },
  {
    id: 'spotiq',
    label: 'SpotIQ',
    icon: 'star',
    href: '/spotiq',
  },
  {
    id: 'monitor',
    label: 'Monitor',
    icon: 'clock',
    href: '/monitor',
    badge: 3,
  },
];

/**
 * Settings sidebar navigation
 */
export const settingsSidebar: NavItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: 'profile',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'info-circle',
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'lock',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: 'cog',
  },
  {
    id: 'connections',
    label: 'Connections',
    icon: 'share',
  },
  {
    id: 'api',
    label: 'API access',
    icon: 'lock',
  },
];

/**
 * Admin sidebar navigation
 */
export const adminSidebar: NavItem[] = [
  {
    id: 'users',
    label: 'Users',
    icon: 'profile',
    children: [
      { id: 'all-users', label: 'All users' },
      { id: 'groups', label: 'Groups' },
      { id: 'roles', label: 'Roles' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    icon: 'folder',
    children: [
      { id: 'connections', label: 'Connections' },
      { id: 'worksheets', label: 'Worksheets' },
      { id: 'tables', label: 'Tables' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'lock',
  },
  {
    id: 'system',
    label: 'System',
    icon: 'cog',
  },
];

/**
 * Common breadcrumb patterns
 */
export const breadcrumbs: Record<string, Breadcrumb[]> = {
  answer: [
    { label: 'Home', href: '/' },
    { label: 'Answers', href: '/answers' },
    { label: 'Revenue by Region' },
  ],
  liveboard: [
    { label: 'Home', href: '/' },
    { label: 'Liveboards', href: '/liveboards' },
    { label: 'Executive Dashboard' },
  ],
  settings: [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ],
  admin: [
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Users' },
  ],
};

/**
 * Common tab patterns
 */
export const tabs: Record<string, TabItem[]> = {
  dashboard: [
    { id: 'overview', label: 'Overview' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'users', label: 'Users' },
    { id: 'products', label: 'Products' },
  ],
  answer: [
    { id: 'chart', label: 'Chart' },
    { id: 'table', label: 'Table' },
    { id: 'sql', label: 'SQL', disabled: true },
  ],
  user: [
    { id: 'profile', label: 'Profile' },
    { id: 'activity', label: 'Activity' },
    { id: 'permissions', label: 'Permissions' },
  ],
  settings: [
    { id: 'general', label: 'General' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications', badge: 2 },
    { id: 'integrations', label: 'Integrations' },
  ],
};

/**
 * Action menu items
 */
export const actionMenuItems: NavItem[] = [
  { id: 'edit', label: 'Edit', icon: 'pencil' },
  { id: 'duplicate', label: 'Duplicate', icon: 'copy' },
  { id: 'share', label: 'Share', icon: 'share' },
  { id: 'pin', label: 'Pin to Liveboard', icon: 'pin' },
  { id: 'download', label: 'Download', icon: 'download' },
  { id: 'delete', label: 'Delete', icon: 'trash-can' },
];

export default {
  sidebar,
  settingsSidebar,
  adminSidebar,
  breadcrumbs,
  tabs,
  actionMenuItems,
};
