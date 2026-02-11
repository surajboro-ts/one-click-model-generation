/**
 * Mock Data for Command Palette
 * 
 * Comprehensive data for testing the command palette with all features.
 */

import type { 
  CommandItem, 
  FilterOption, 
  CommandGroup, 
  KeyboardShortcut,
  ContextRankingMap,
  ContextOption,
  PageContext 
} from '../types';

/**
 * Filter options shown when "/" is typed
 * Order matches Figma spec: Admin Settings, Answers, Liveboard, Navigate, Create, Help, Collections, Models, Spotter
 */
export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'admin', label: 'Admin settings', icon: 'cog', rightLabel: 'Filter', filterType: 'Admin Settings' },
  { id: 'answers', label: 'Answers', icon: 'answer', rightLabel: 'Filter', filterType: 'Answers' },
  { id: 'liveboards', label: 'Liveboard', icon: 'liveboard', rightLabel: 'Filter', filterType: 'Liveboards' },
  { id: 'navigate', label: 'Navigate', icon: 'navigate', rightLabel: 'Filter', filterType: 'Navigate' },
  { id: 'create', label: 'Create', icon: 'plus', rightLabel: 'Filter', filterType: 'Create' },
  { id: 'help', label: 'Help', icon: 'info-circle', rightLabel: 'Filter', filterType: 'Help' },
  { id: 'collections', label: 'Collections', icon: 'collection', rightLabel: 'Filter', filterType: 'Collections' },
  { id: 'models', label: 'Models', icon: 'save-worksheet', rightLabel: 'Filter', filterType: 'Models' },
  { id: 'spotter', label: 'Spotter', icon: 'spotter', rightLabel: 'Chat', filterType: 'Spotter' },
];

/**
 * Context-aware filter ranking
 * Maps page context to ordered filter types
 */
export const CONTEXT_RANKINGS: ContextRankingMap = {
  default: ['Admin Settings', 'Answers', 'Liveboards', 'Navigate', 'Create', 'Help', 'Collections', 'Models', 'Spotter'],
  answer: ['Answers', 'Create', 'Liveboards', 'Help', 'Spotter', 'Navigate', 'Collections', 'Models', 'Admin Settings'],
  liveboard: ['Liveboards', 'Answers', 'Create', 'Help', 'Spotter', 'Navigate', 'Collections', 'Models', 'Admin Settings'],
  admin: ['Admin Settings', 'Navigate', 'Help', 'Answers', 'Liveboards', 'Create', 'Collections', 'Models', 'Spotter'],
  spotter: ['Spotter', 'Answers', 'Liveboards', 'Help', 'Create', 'Navigate', 'Collections', 'Models', 'Admin Settings'],
  create: ['Create', 'Answers', 'Liveboards', 'Help', 'Spotter', 'Navigate', 'Collections', 'Models', 'Admin Settings'],
  navigate: ['Navigate', 'Answers', 'Liveboards', 'Help', 'Create', 'Spotter', 'Collections', 'Models', 'Admin Settings'],
  help: ['Help', 'Navigate', 'Answers', 'Liveboards', 'Create', 'Spotter', 'Collections', 'Models', 'Admin Settings'],
};

/**
 * Context options for dropdown selector
 */
export const CONTEXT_OPTIONS: ContextOption[] = [
  { id: 'default', label: 'Default', description: 'Standard filter order' },
  { id: 'answer', label: 'Answer Page', description: 'Answers filter ranked first' },
  { id: 'liveboard', label: 'Liveboard Page', description: 'Liveboards filter ranked first' },
  { id: 'admin', label: 'Admin Page', description: 'Admin Settings filter ranked first' },
  { id: 'spotter', label: 'Spotter Chat', description: 'Spotter filter ranked first' },
  { id: 'create', label: 'Create Mode', description: 'Create filter ranked first' },
  { id: 'navigate', label: 'Navigation', description: 'Navigate filter ranked first' },
  { id: 'help', label: 'Help Center', description: 'Help filter ranked first' },
];

/**
 * Recent items
 */
export const recentItems: CommandItem[] = [
  { id: 'recent-1', label: 'Q4 Revenue Analysis', description: 'Revenue breakdown by region', context: 'Sales Analytics', rightLabel: 'Answer', icon: 'answer', group: 'Recent', author: 'Maya Chen' },
  { id: 'recent-2', label: 'Customer Churn Dashboard', description: 'Monthly churn metrics', context: 'Customer Success', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Recent', author: 'James Wilson' },
  { id: 'recent-3', label: 'Product Usage Trends', description: 'Feature adoption rates', context: 'Product Analytics', rightLabel: 'Answer', icon: 'answer', group: 'Recent', author: 'Sarah Kim' },
  { id: 'recent-4', label: 'Sales Pipeline Overview', description: 'Pipeline by stage', context: 'Sales', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Recent', author: 'Alex Rivera' },
  { id: 'recent-5', label: 'Support Ticket Analysis', description: 'Ticket volume and resolution', context: 'Support', rightLabel: 'Answer', icon: 'answer', group: 'Recent', author: 'Jordan Lee' },
];

/**
 * Recommended items
 */
export const recommendedItems: CommandItem[] = [
  { id: 'rec-1', label: 'Weekly Sales Report', description: 'Automated weekly summary', context: 'Sales Analytics', rightLabel: 'Answer', icon: 'answer', group: 'Recommended', author: 'System' },
  { id: 'rec-2', label: 'Marketing ROI Dashboard', description: 'Campaign performance', context: 'Marketing', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Recommended', author: 'Emily Brown' },
  { id: 'rec-3', label: 'Engineering Velocity', description: 'Sprint metrics and velocity', context: 'Engineering', rightLabel: 'Answer', icon: 'answer', group: 'Recommended', author: 'Dev Team' },
  { id: 'rec-4', label: 'Revenue by Product Line', description: 'Product revenue breakdown', context: 'Finance', rightLabel: 'Answer', icon: 'answer', group: 'Recommended', author: 'Finance Team' },
  { id: 'rec-5', label: 'Customer Satisfaction', description: 'NPS and CSAT scores', context: 'Customer Success', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Recommended', author: 'CS Team' },
  { id: 'rec-6', label: 'Inventory Levels', description: 'Stock and reorder points', context: 'Operations', rightLabel: 'Answer', icon: 'answer', group: 'Recommended', author: 'Ops Team' },
  { id: 'rec-7', label: 'Employee Metrics', description: 'Headcount and attrition', context: 'HR', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Recommended', author: 'HR Team' },
];

/**
 * Quick links
 */
export const quickLinkItems: CommandItem[] = [
  { id: 'quick-1', label: 'My Favorites', description: 'Starred items', context: '', rightLabel: 'Navigate', icon: 'star', group: 'Quick Links' },
  { id: 'quick-2', label: 'Shared with Me', description: 'Items shared by others', context: '', rightLabel: 'Navigate', icon: 'share', group: 'Quick Links' },
  { id: 'quick-3', label: 'My Collections', description: 'Organized content', context: '', rightLabel: 'Navigate', icon: 'collection', group: 'Quick Links' },
];

/**
 * Answer items
 */
export const answerItems: CommandItem[] = [
  { id: 'ans-1', label: 'Total Revenue by Quarter', description: 'Quarterly revenue trends', context: 'Finance > Revenue', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'Finance Team' },
  { id: 'ans-2', label: 'Customer Acquisition Cost', description: 'CAC by channel', context: 'Marketing > Metrics', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'Marketing Team' },
  { id: 'ans-3', label: 'Monthly Active Users', description: 'MAU trends over time', context: 'Product > Usage', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'Product Team' },
  { id: 'ans-4', label: 'Average Order Value', description: 'AOV by segment', context: 'Sales > Metrics', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'Sales Ops' },
  { id: 'ans-5', label: 'Net Promoter Score', description: 'NPS by region', context: 'Customer Success', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'CS Team' },
  { id: 'ans-6', label: 'Website Conversion Rate', description: 'Funnel analysis', context: 'Marketing > Web', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'Web Team' },
  { id: 'ans-7', label: 'Employee Engagement Score', description: 'Engagement metrics', context: 'HR > People', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'HR Team' },
  { id: 'ans-8', label: 'Support Response Time', description: 'Average response metrics', context: 'Support > SLA', rightLabel: 'Answer', icon: 'answer', group: 'Answers', author: 'Support Team' },
];

/**
 * Liveboard items
 */
export const liveboardItems: CommandItem[] = [
  { id: 'lb-1', label: 'Executive Dashboard', description: 'High-level KPIs for leadership', context: 'Executive', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Liveboards', author: 'Admin' },
  { id: 'lb-2', label: 'Sales Performance', description: 'Sales team metrics and targets', context: 'Sales', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Liveboards', author: 'Sales Ops' },
  { id: 'lb-3', label: 'Marketing Analytics', description: 'Campaign and channel performance', context: 'Marketing', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Liveboards', author: 'Marketing Team' },
  { id: 'lb-4', label: 'Product Health', description: 'Product usage and health metrics', context: 'Product', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Liveboards', author: 'Product Team' },
  { id: 'lb-5', label: 'Operations Overview', description: 'Operational efficiency metrics', context: 'Operations', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Liveboards', author: 'Ops Team' },
  { id: 'lb-6', label: 'Finance Summary', description: 'Financial performance overview', context: 'Finance', rightLabel: 'Liveboard', icon: 'liveboard', group: 'Liveboards', author: 'Finance Team' },
];

/**
 * Admin Settings items
 */
export const adminItems: CommandItem[] = [
  { id: 'admin-1', label: 'User Management', description: 'Manage users and permissions', context: 'Admin > Users', rightLabel: 'Admin Settings', icon: 'profile', group: 'Admin Settings' },
  { id: 'admin-2', label: 'Group Management', description: 'Manage groups and roles', context: 'Admin > Groups', rightLabel: 'Admin Settings', icon: 'community', group: 'Admin Settings' },
  { id: 'admin-3', label: 'Data Connections', description: 'Manage data sources', context: 'Admin > Data', rightLabel: 'Admin Settings', icon: 'database', group: 'Admin Settings' },
  { id: 'admin-4', label: 'Security Settings', description: 'Security and access controls', context: 'Admin > Security', rightLabel: 'Admin Settings', icon: 'lock', group: 'Admin Settings' },
  { id: 'admin-5', label: 'Org Settings', description: 'Organization preferences', context: 'Admin > Org', rightLabel: 'Admin Settings', icon: 'cog', group: 'Admin Settings' },
  { id: 'admin-6', label: 'Audit Logs', description: 'View system activity', context: 'Admin > Logs', rightLabel: 'Admin Settings', icon: 'clock', group: 'Admin Settings' },
  { id: 'admin-7', label: 'Integrations', description: 'Manage third-party integrations', context: 'Admin > Integrations', rightLabel: 'Admin Settings', icon: 'share', group: 'Admin Settings' },
  { id: 'admin-8', label: 'API Access', description: 'API keys and tokens', context: 'Admin > API', rightLabel: 'Admin Settings', icon: 'key', group: 'Admin Settings' },
];

/**
 * Navigate items
 */
export const navigateItems: CommandItem[] = [
  { id: 'nav-1', label: 'Home', description: 'Go to homepage', context: '', rightLabel: 'Navigate', icon: 'navigate', group: 'Navigate' },
  { id: 'nav-2', label: 'Answers', description: 'Browse all answers', context: '', rightLabel: 'Navigate', icon: 'answer', group: 'Navigate' },
  { id: 'nav-3', label: 'Liveboards', description: 'Browse all liveboards', context: '', rightLabel: 'Navigate', icon: 'liveboard', group: 'Navigate' },
  { id: 'nav-4', label: 'Data', description: 'Explore data sources', context: '', rightLabel: 'Navigate', icon: 'database', group: 'Navigate' },
  { id: 'nav-5', label: 'Spotter', description: 'Open Spotter chat', context: '', rightLabel: 'Navigate', icon: 'star', group: 'Navigate' },
  { id: 'nav-6', label: 'Admin', description: 'Admin console', context: '', rightLabel: 'Navigate', icon: 'cog', group: 'Navigate' },
  { id: 'nav-7', label: 'Profile', description: 'Your profile settings', context: '', rightLabel: 'Navigate', icon: 'profile', group: 'Navigate' },
];

/**
 * Help items
 */
export const helpItems: CommandItem[] = [
  { id: 'help-1', label: 'Getting Started', description: 'Learn the basics', context: 'Documentation', rightLabel: 'Help', icon: 'book', group: 'Help' },
  { id: 'help-2', label: 'Keyboard Shortcuts', description: 'View all shortcuts', context: 'Documentation', rightLabel: 'Help', icon: 'info-circle', group: 'Help' },
  { id: 'help-3', label: 'Contact Support', description: 'Get help from our team', context: 'Support', rightLabel: 'Help', icon: 'paper-plane', group: 'Help' },
  { id: 'help-4', label: 'Community Forum', description: 'Join the community', context: 'Community', rightLabel: 'Help', icon: 'community', group: 'Help' },
  { id: 'help-5', label: 'API Documentation', description: 'Developer resources', context: 'Developers', rightLabel: 'Help', icon: 'documentation', group: 'Help' },
  { id: 'help-6', label: 'Video Tutorials', description: 'Watch and learn', context: 'Learning', rightLabel: 'Help', icon: 'video', group: 'Help' },
  { id: 'help-7', label: 'Release Notes', description: 'Latest updates', context: 'Updates', rightLabel: 'Help', icon: 'note', group: 'Help' },
  { id: 'help-8', label: 'System Status', description: 'Check service status', context: 'Status', rightLabel: 'Help', icon: 'monitor', group: 'Help' },
];

/**
 * Spotter items
 */
export const spotterItems: CommandItem[] = [
  { id: 'spot-1', label: 'New Chat', description: 'Start a new Spotter conversation', context: 'Spotter', rightLabel: 'Spotter', icon: 'star', group: 'Spotter', type: 'create' },
  { id: 'spot-2', label: 'Recent Conversations', description: 'View past Spotter chats', context: 'Spotter', rightLabel: 'Spotter', icon: 'clock', group: 'Spotter' },
  { id: 'spot-3', label: 'Saved Insights', description: 'View saved Spotter insights', context: 'Spotter', rightLabel: 'Spotter', icon: 'bookmark', group: 'Spotter' },
  { id: 'spot-4', label: 'Spotter Settings', description: 'Configure Spotter preferences', context: 'Spotter', rightLabel: 'Spotter', icon: 'cog', group: 'Spotter' },
];

/**
 * Create items
 */
export const createItems: CommandItem[] = [
  { id: 'create-1', label: 'New Answer', description: 'Create a new analysis', context: '', rightLabel: 'Create', icon: 'answer', group: 'Create', type: 'create' },
  { id: 'create-2', label: 'New Liveboard', description: 'Create a new dashboard', context: '', rightLabel: 'Create', icon: 'liveboard', group: 'Create', type: 'create' },
  { id: 'create-3', label: 'New Collection', description: 'Organize content in a collection', context: '', rightLabel: 'Create', icon: 'collection', group: 'Create', type: 'create' },
  { id: 'create-4', label: 'New Connection', description: 'Connect a new data source', context: '', rightLabel: 'Create', icon: 'database', group: 'Create', type: 'create' },
];

/**
 * Collection items
 */
export const collectionItems: CommandItem[] = [
  { id: 'col-1', label: 'Sales Collection', description: 'Curated sales dashboards and answers', context: 'Sales', rightLabel: 'Collection', icon: 'collection', group: 'Collections', author: 'Sales Ops' },
  { id: 'col-2', label: 'Executive Briefing', description: 'Key metrics for leadership', context: 'Executive', rightLabel: 'Collection', icon: 'collection', group: 'Collections', author: 'Admin' },
  { id: 'col-3', label: 'Onboarding Resources', description: 'Getting started content', context: 'HR', rightLabel: 'Collection', icon: 'collection', group: 'Collections', author: 'HR Team' },
  { id: 'col-4', label: 'Marketing Analytics', description: 'Campaign performance collection', context: 'Marketing', rightLabel: 'Collection', icon: 'collection', group: 'Collections', author: 'Marketing Team' },
  { id: 'col-5', label: 'Product Health Metrics', description: 'Product usage and health', context: 'Product', rightLabel: 'Collection', icon: 'collection', group: 'Collections', author: 'Product Team' },
];

/**
 * Model items
 */
export const modelItems: CommandItem[] = [
  { id: 'model-1', label: 'Sales Data Model', description: 'Revenue and pipeline data', context: 'Data > Models', rightLabel: 'Model', icon: 'save-worksheet', group: 'Models', author: 'Data Team' },
  { id: 'model-2', label: 'Customer 360', description: 'Unified customer data model', context: 'Data > Models', rightLabel: 'Model', icon: 'save-worksheet', group: 'Models', author: 'Data Team' },
  { id: 'model-3', label: 'Product Usage Model', description: 'Feature usage and engagement', context: 'Data > Models', rightLabel: 'Model', icon: 'save-worksheet', group: 'Models', author: 'Analytics Team' },
  { id: 'model-4', label: 'HR People Model', description: 'Employee and org data', context: 'Data > Models', rightLabel: 'Model', icon: 'save-worksheet', group: 'Models', author: 'HR Analytics' },
  { id: 'model-5', label: 'Financial Reporting', description: 'Financial metrics and reports', context: 'Data > Models', rightLabel: 'Model', icon: 'save-worksheet', group: 'Models', author: 'Finance Team' },
];

/**
 * All command items combined
 */
export const allItems: CommandItem[] = [
  ...recentItems,
  ...recommendedItems,
  ...quickLinkItems,
  ...answerItems,
  ...liveboardItems,
  ...adminItems,
  ...navigateItems,
  ...helpItems,
  ...spotterItems,
  ...createItems,
  ...collectionItems,
  ...modelItems,
];

/**
 * Command groups with items
 */
export const commandGroups: CommandGroup[] = [
  { id: 'recent', title: 'Recent', items: recentItems },
  { id: 'recommended', title: 'Recommended', items: recommendedItems },
  { id: 'quickLinks', title: 'Quick Links', items: quickLinkItems },
];

/**
 * Get items filtered by type
 */
export function getItemsByFilter(filterType: string): CommandItem[] {
  switch (filterType) {
    case 'Answers':
      return answerItems;
    case 'Liveboards':
      return liveboardItems;
    case 'Admin Settings':
      return adminItems;
    case 'Navigate':
      return navigateItems;
    case 'Help':
      return helpItems;
    case 'Spotter':
      return spotterItems;
    case 'Create':
      return createItems;
    case 'Collections':
      return collectionItems;
    case 'Models':
      return modelItems;
    default:
      return allItems;
  }
}

/**
 * Get filter options ranked by context
 */
export function getRankedFilterOptions(context: PageContext): FilterOption[] {
  const ranking = CONTEXT_RANKINGS[context] || CONTEXT_RANKINGS.default;
  return [...FILTER_OPTIONS].sort((a, b) => {
    const aIndex = ranking.indexOf(a.filterType);
    const bIndex = ranking.indexOf(b.filterType);
    return aIndex - bIndex;
  });
}

/**
 * Keyboard shortcuts for footer
 */
export const keyboardShortcuts: KeyboardShortcut[] = [
  { keys: ['↑ ↓'], label: 'Navigate' },
  { keys: ['↵'], label: 'Select' },
  { keys: ['Shift + ↵'], label: 'Open in new tab' },
  { keys: ['⌘ + ↵'], label: 'Open in Spotter' },
];

export default {
  FILTER_OPTIONS,
  CONTEXT_RANKINGS,
  CONTEXT_OPTIONS,
  allItems,
  commandGroups,
  keyboardShortcuts,
  getItemsByFilter,
  getRankedFilterOptions,
};
