/**
 * Mock Data for Command Palette
 *
 * Phase 1 migration data set:
 * - Rich object metadata (Liveboards, Answers, Collections, Data Models, Tables, Connections)
 * - Expanded admin/navigation command set
 * - Default groups aligned with Figma Make: Recent, Create, Quick links
 */

import type {
  CommandItem,
  FilterOption,
  CommandGroup,
  KeyboardShortcut,
  ContextRankingMap,
  ContextOption,
  PageContext,
  ThoughtSpotObjectType,
  AppTab,
} from '../types';

export interface ThoughtSpotObject {
  id: string;
  name: string;
  type: ThoughtSpotObjectType;
  author: string;
  authorAvatar?: string;
  modified: string;
  tags: string[];
  description?: string;
  views?: number;
  favorites?: number;
  visualizationType?: string;
  chartsCount?: number;
  objectsCount?: number;
  rowCount?: number;
  connectionType?: string;
  status?: 'Active' | 'Inactive' | 'Error';
}

type AdminCommandDef = {
  id: string;
  label: string;
  page: string;
  tab?: string;
  category: string;
  rightLabel: string;
  icon?: CommandItem['icon'];
  appTab?: AppTab;
};

/**
 * Filter options shown when "/" is typed.
 */
export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'admin', label: 'Admin settings', icon: 'cog', rightLabel: 'Filter', filterType: 'Admin Settings' },
  { id: 'answers', label: 'Answers', icon: 'answer', rightLabel: 'Filter', filterType: 'Answers' },
  { id: 'liveboards', label: 'Liveboards', icon: 'liveboard', rightLabel: 'Filter', filterType: 'Liveboards' },
  { id: 'navigate', label: 'Navigate', icon: 'navigate', rightLabel: 'Filter', filterType: 'Navigate' },
  { id: 'create', label: 'Create', icon: 'plus', rightLabel: 'Filter', filterType: 'Create' },
  { id: 'help', label: 'Help', icon: 'info-circle', rightLabel: 'Filter', filterType: 'Help' },
  { id: 'collections', label: 'Collections', icon: 'collection', rightLabel: 'Filter', filterType: 'Collections' },
  { id: 'models', label: 'Models', icon: 'save-worksheet', rightLabel: 'Filter', filterType: 'Models' },
  { id: 'spotter', label: 'Spotter', icon: 'spotter', rightLabel: 'Chat', filterType: 'Spotter' },
];

/**
 * Context-aware filter ranking.
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
 * Context options for demo selector.
 */
export const CONTEXT_OPTIONS: ContextOption[] = [
  { id: 'default', label: 'Default', description: 'Standard filter order' },
  { id: 'answer', label: 'Answer Page', description: 'Answers filter ranked first' },
  { id: 'liveboard', label: 'Liveboard Page', description: 'Liveboards filter ranked first' },
  { id: 'admin', label: 'Admin Page', description: 'Admin settings ranked first' },
  { id: 'spotter', label: 'Spotter Chat', description: 'Spotter filter ranked first' },
  { id: 'create', label: 'Create Mode', description: 'Create filter ranked first' },
  { id: 'navigate', label: 'Navigation', description: 'Navigate filter ranked first' },
  { id: 'help', label: 'Help Center', description: 'Help filter ranked first' },
];

// Liveboards (10)
export const mockLiveboards: ThoughtSpotObject[] = [
  { id: 'lb-1', name: 'Design : Muze + Tooltips', type: 'Liveboard', author: 'mohammed.faris', modified: '4 days ago', tags: [], description: 'Design variations and tooltip experiments', views: 15, favorites: 3, chartsCount: 8 },
  { id: 'lb-2', name: 'Content Density', type: 'Liveboard', author: 'mohammed.faris', modified: '4 days ago', tags: [], description: 'Testing different content density layouts', views: 3, favorites: 0, chartsCount: 5 },
  { id: 'lb-3', name: 'Billable Query Stats Liveboard', type: 'Liveboard', author: 'System User', modified: '4 days ago', tags: [], description: 'Statistics on billable queries', views: 6, favorites: 0, chartsCount: 12 },
  { id: 'lb-4', name: 'User Adoption', type: 'Liveboard', author: 'System User', modified: '4 days ago', tags: [], description: 'User adoption metrics and trends', views: 23, favorites: 2, chartsCount: 15 },
  { id: 'lb-5', name: 'testing', type: 'Liveboard', author: 'Vikas Gautam', modified: '6 days ago', tags: [], description: 'Testing scratchpad', views: 2, favorites: 0, chartsCount: 3 },
  { id: 'lb-6', name: 'Muze Studio Gallery', type: 'Liveboard', author: 'Nakshatra Mukhopadhyay', modified: '6 days ago', tags: [], description: 'Gallery of Muze Studio creations', views: 2, favorites: 0, chartsCount: 20 },
  { id: 'lb-7', name: 'Arpit Test Liveboard', type: 'Liveboard', author: 'Arpit Rai', modified: '6 days ago', tags: [], description: "Arpit's personal test board", views: 5, favorites: 0, chartsCount: 4 },
  { id: 'lb-8', name: 'Bar/Column Charts Enhancements', type: 'Liveboard', author: 'mohammed.faris', modified: '6 days ago', tags: [], description: 'Testing enhancements for bar and column charts', views: 1, favorites: 0, chartsCount: 7 },
  { id: 'lb-9', name: 'bugs - airplane crashes', type: 'Liveboard', author: 'ash', modified: '6 days ago', tags: [], description: 'Analysis of airplane crash data bugs', views: 5, favorites: 1, chartsCount: 6 },
  { id: 'lb-10', name: 'Sales', type: 'Liveboard', author: 'shubham.agrawal', modified: '6 days ago', tags: [], description: 'General sales overview', views: 15, favorites: 4, chartsCount: 10 },
];

// Answers (7)
export const mockAnswers: ThoughtSpotObject[] = [
  { id: 'ans-1', name: 'Daily Sales vs Target', type: 'Answer', author: 'Anya Sharma', modified: '4 hours ago', tags: ['Sales', 'Daily', 'Target'], description: 'Daily sales comparison against targets', views: 234, favorites: 18, visualizationType: 'Column Chart' },
  { id: 'ans-2', name: 'Top 10 Products by Revenue', type: 'Answer', author: 'Mike Ross', modified: '1 day ago', tags: ['Products', 'Revenue', 'Top Performers'], description: 'Best performing products by revenue', views: 445, favorites: 34, visualizationType: 'Bar Chart' },
  { id: 'ans-3', name: 'Regional Sales Breakdown', type: 'Answer', author: 'Sarah Chen', modified: '6 hours ago', tags: ['Regional', 'Sales', 'Geography'], description: 'Sales distribution across regions', views: 312, favorites: 22, visualizationType: 'Map' },
  { id: 'ans-4', name: 'Customer Acquisition Trends', type: 'Answer', author: 'David Park', modified: '2 days ago', tags: ['Customer', 'Acquisition', 'Trends'], description: 'New customer acquisition over time', views: 189, favorites: 15, visualizationType: 'Line Chart' },
  { id: 'ans-5', name: 'Churn Rate by Segment', type: 'Answer', author: 'Anya Sharma', modified: '3 days ago', tags: ['Churn', 'Retention', 'Segments'], description: 'Customer churn across different segments', views: 276, favorites: 21, visualizationType: 'Stacked Bar' },
  { id: 'ans-6', name: 'Quarterly Revenue Growth', type: 'Answer', author: 'Mike Ross', modified: '1 week ago', tags: ['Revenue', 'Growth', 'Quarterly'], description: 'Quarter over quarter revenue growth', views: 567, favorites: 45, visualizationType: 'Area Chart' },
  { id: 'ans-7', name: 'Product Category Performance', type: 'Answer', author: 'Sarah Chen', modified: '5 days ago', tags: ['Products', 'Categories', 'Performance'], description: 'Sales performance by product category', views: 398, favorites: 28, visualizationType: 'Pie Chart' },
];

// Collections (5)
export const mockCollections: ThoughtSpotObject[] = [
  { id: 'col-1', name: 'Executive Reports', type: 'Collection', author: 'Anya Sharma', modified: '1 day ago', tags: ['Executive', 'Reports', 'Leadership'], description: 'Executive-level dashboards and reports', views: 892, favorites: 67, objectsCount: 24 },
  { id: 'col-2', name: 'Sales Team Resources', type: 'Collection', author: 'Mike Ross', modified: '3 days ago', tags: ['Sales', 'Team', 'Resources'], description: 'Sales analytics and tracking tools', views: 543, favorites: 41, objectsCount: 18 },
  { id: 'col-3', name: 'Marketing Analytics', type: 'Collection', author: 'Sarah Chen', modified: '2 days ago', tags: ['Marketing', 'Analytics', 'Campaigns'], description: 'Marketing performance and campaign analytics', views: 467, favorites: 35, objectsCount: 15 },
  { id: 'col-4', name: 'Financial Planning', type: 'Collection', author: 'David Park', modified: '1 week ago', tags: ['Finance', 'Planning', 'Budgets'], description: 'Financial planning and budgeting resources', views: 721, favorites: 52, objectsCount: 21 },
  { id: 'col-5', name: 'Customer Analytics Hub', type: 'Collection', author: 'Anya Sharma', modified: '4 days ago', tags: ['Customer', 'Analytics', 'Insights'], description: 'Customer behavior and insights', views: 634, favorites: 48, objectsCount: 19 },
];

// Data models (5)
export const mockDataModels: ThoughtSpotObject[] = [
  { id: 'dm-1', name: 'Retail Sales Model', type: 'Data Model', author: 'Tech Team', modified: '2 weeks ago', tags: ['Sales', 'Retail', 'Core'], description: 'Primary sales data model for retail operations', views: 1834, favorites: 123 },
  { id: 'dm-2', name: 'Customer 360 Model', type: 'Data Model', author: 'Data Engineering', modified: '1 month ago', tags: ['Customer', '360', 'Master'], description: 'Comprehensive customer data model', views: 2156, favorites: 156 },
  { id: 'dm-3', name: 'Financial Reporting Model', type: 'Data Model', author: 'Finance Team', modified: '3 weeks ago', tags: ['Finance', 'Reporting', 'Compliance'], description: 'Financial reporting and compliance model', views: 987, favorites: 78 },
  { id: 'dm-4', name: 'Inventory Management Model', type: 'Data Model', author: 'Tech Team', modified: '1 week ago', tags: ['Inventory', 'Operations', 'Supply Chain'], description: 'Inventory and supply chain data model', views: 654, favorites: 45 },
  { id: 'dm-5', name: 'Marketing Attribution Model', type: 'Data Model', author: 'Marketing Ops', modified: '2 weeks ago', tags: ['Marketing', 'Attribution', 'ROI'], description: 'Marketing campaign attribution model', views: 543, favorites: 38 },
];

// Tables (8)
export const mockTables: ThoughtSpotObject[] = [
  { id: 'tbl-1', name: 'sales_transactions', type: 'Table', author: 'Data Engineering', modified: '1 hour ago', tags: ['Sales', 'Transactions', 'Fact'], description: 'Daily sales transaction records', views: 3421, favorites: 234, rowCount: 15678234 },
  { id: 'tbl-2', name: 'customer_master', type: 'Table', author: 'Data Engineering', modified: '2 hours ago', tags: ['Customer', 'Master', 'Dimension'], description: 'Customer master data', views: 2876, favorites: 198, rowCount: 456789 },
  { id: 'tbl-3', name: 'product_catalog', type: 'Table', author: 'Tech Team', modified: '5 hours ago', tags: ['Product', 'Catalog', 'Dimension'], description: 'Product catalog and attributes', views: 1987, favorites: 145, rowCount: 234567 },
  { id: 'tbl-4', name: 'inventory_levels', type: 'Table', author: 'Data Engineering', modified: '30 minutes ago', tags: ['Inventory', 'Stock', 'Fact'], description: 'Real-time inventory levels by location', views: 1543, favorites: 112, rowCount: 987654 },
  { id: 'tbl-5', name: 'marketing_campaigns', type: 'Table', author: 'Marketing Ops', modified: '1 day ago', tags: ['Marketing', 'Campaigns', 'Dimension'], description: 'Marketing campaign metadata', views: 987, favorites: 76, rowCount: 12345 },
  { id: 'tbl-6', name: 'web_analytics_events', type: 'Table', author: 'Data Engineering', modified: '15 minutes ago', tags: ['Web', 'Analytics', 'Events'], description: 'Website user behavior events', views: 2341, favorites: 167, rowCount: 45678912 },
  { id: 'tbl-7', name: 'order_fulfillment', type: 'Table', author: 'Tech Team', modified: '3 hours ago', tags: ['Orders', 'Fulfillment', 'Fact'], description: 'Order fulfillment and shipping data', views: 1678, favorites: 123, rowCount: 3456789 },
  { id: 'tbl-8', name: 'store_locations', type: 'Table', author: 'Data Engineering', modified: '1 week ago', tags: ['Store', 'Location', 'Dimension'], description: 'Physical store location data', views: 876, favorites: 54, rowCount: 567 },
];

// Connections (6)
export const mockConnections: ThoughtSpotObject[] = [
  { id: 'conn-1', name: 'Snowflake Production', type: 'Connection', author: 'Data Engineering', modified: '1 day ago', tags: ['Snowflake', 'Production', 'Primary'], description: 'Primary Snowflake data warehouse connection', views: 456, favorites: 34, connectionType: 'Snowflake', status: 'Active' },
  { id: 'conn-2', name: 'PostgreSQL Analytics', type: 'Connection', author: 'Tech Team', modified: '3 days ago', tags: ['PostgreSQL', 'Analytics', 'Database'], description: 'PostgreSQL analytics database', views: 234, favorites: 23, connectionType: 'PostgreSQL', status: 'Active' },
  { id: 'conn-3', name: 'Google BigQuery', type: 'Connection', author: 'Data Engineering', modified: '1 week ago', tags: ['BigQuery', 'Google', 'Cloud'], description: 'Google BigQuery cloud data warehouse', views: 345, favorites: 28, connectionType: 'BigQuery', status: 'Active' },
  { id: 'conn-4', name: 'Salesforce CRM', type: 'Connection', author: 'Sales Ops', modified: '2 days ago', tags: ['Salesforce', 'CRM', 'SaaS'], description: 'Salesforce CRM integration', views: 567, favorites: 45, connectionType: 'Salesforce', status: 'Active' },
  { id: 'conn-5', name: 'AWS Redshift', type: 'Connection', author: 'Data Engineering', modified: '5 days ago', tags: ['Redshift', 'AWS', 'Warehouse'], description: 'AWS Redshift data warehouse', views: 289, favorites: 19, connectionType: 'Redshift', status: 'Error' },
  { id: 'conn-6', name: 'MongoDB Documents', type: 'Connection', author: 'Tech Team', modified: '1 week ago', tags: ['MongoDB', 'NoSQL', 'Documents'], description: 'MongoDB document database', views: 178, favorites: 12, connectionType: 'MongoDB', status: 'Active' },
];

export const allMockObjects: ThoughtSpotObject[] = [
  ...mockLiveboards,
  ...mockAnswers,
  ...mockCollections,
  ...mockDataModels,
  ...mockTables,
  ...mockConnections,
];

const OBJECT_ICONS: Record<ThoughtSpotObjectType, CommandItem['icon']> = {
  Liveboard: 'liveboard',
  Answer: 'answer',
  Collection: 'collection',
  'Data Model': 'save-worksheet',
  Table: 'table',
  Connection: 'database',
};

function toObjectCommandItem(object: ThoughtSpotObject, group: string): CommandItem {
  return {
    id: `object-${object.id}`,
    label: object.name,
    description: `by ${object.author}`,
    context: object.tags.length > 0 ? `in ${object.tags[0]}` : undefined,
    rightLabel: object.type,
    icon: OBJECT_ICONS[object.type],
    group,
    type: 'result',
    author: object.author,
    tags: object.tags,
    objectId: object.id,
    objectType: object.type,
    isObject: true,
    keywords: [object.modified, object.connectionType ?? '', object.status ?? ''].filter(Boolean),
  };
}

export const answerItems: CommandItem[] = mockAnswers.map((item) => toObjectCommandItem(item, 'Answers'));
export const liveboardItems: CommandItem[] = mockLiveboards.map((item) => toObjectCommandItem(item, 'Liveboards'));
export const collectionItems: CommandItem[] = mockCollections.map((item) => toObjectCommandItem(item, 'Collections'));
export const modelItems: CommandItem[] = [
  ...mockDataModels.map((item) => toObjectCommandItem(item, 'Models')),
  ...mockTables.map((item) => toObjectCommandItem(item, 'Models')),
  ...mockConnections.map((item) => toObjectCommandItem(item, 'Models')),
];

/**
 * Default items shown when the palette opens.
 */
export const recentItems: CommandItem[] = [
  {
    id: 'recent-1',
    label: 'Daily Sales vs Target',
    description: 'by Anya Sharma',
    context: 'in Customer Sales',
    rightLabel: 'Answer',
    icon: 'answer',
    group: 'Recent',
    objectId: 'ans-1',
    objectType: 'Answer',
    isObject: true,
  },
  {
    id: 'recent-2',
    label: 'Design : Muze + Tooltips',
    description: 'by mohammed.faris',
    context: 'in Product Design',
    rightLabel: 'Liveboard',
    icon: 'liveboard',
    group: 'Recent',
    objectId: 'lb-1',
    objectType: 'Liveboard',
    isObject: true,
  },
  {
    id: 'recent-3',
    label: 'Beta Access',
    description: 'Application settings',
    context: 'in Feature management',
    rightLabel: 'Admin settings',
    icon: 'settings',
    group: 'Recent',
    page: 'Feature management',
    tab: 'beta access',
  },
  {
    id: 'recent-4',
    label: 'Retail Sales Model',
    description: 'by Tech Team',
    context: 'in Core models',
    rightLabel: 'Data Model',
    icon: 'save-worksheet',
    group: 'Recent',
    objectId: 'dm-1',
    objectType: 'Data Model',
    isObject: true,
  },
  {
    id: 'recent-5',
    label: 'Spotter chat',
    description: 'Ask anything about your data',
    rightLabel: 'Spotter',
    icon: 'spotter',
    group: 'Recent',
    isSpotter: true,
  },
];

export const createItems: CommandItem[] = [
  { id: 'create-1', label: 'Spotter chat', description: 'Start a new conversation', rightLabel: 'Spotter', icon: 'spotter', group: 'Create', type: 'create', isSpotter: true },
  { id: 'create-2', label: 'Answer', description: 'Create a new analysis', rightLabel: 'Create', icon: 'answer', group: 'Create', type: 'create', action: 'create-answer' },
  { id: 'create-3', label: 'Liveboard', description: 'Create a new dashboard', rightLabel: 'Create', icon: 'liveboard', group: 'Create', type: 'create', action: 'create-liveboard' },
  { id: 'create-4', label: 'Connection', description: 'Connect a new data source', rightLabel: 'Create', icon: 'database', group: 'Create', type: 'create', action: 'create-connection' },
  { id: 'create-5', label: 'Collection', description: 'Group related content', rightLabel: 'Create', icon: 'collection', group: 'Create', type: 'create', action: 'create-collection' },
];

export const quickLinkItems: CommandItem[] = [
  { id: 'quick-1', label: 'Admin settings', description: 'Open administration controls', rightLabel: 'Admin settings', icon: 'settings', group: 'Quick links', page: 'General settings', tab: 'administration' },
  { id: 'quick-2', label: 'Profile settings', description: 'Manage your profile', rightLabel: 'Admin settings', icon: 'profile', group: 'Quick links', page: 'Profile' },
  { id: 'quick-3', label: 'Community', description: 'Visit the user community', rightLabel: 'Help', icon: 'community', group: 'Quick links', action: 'open-community' },
  { id: 'quick-4', label: 'Developer docs', description: 'Open embedding documentation', rightLabel: 'Help', icon: 'documentation', group: 'Quick links', action: 'open-docs' },
  { id: 'quick-5', label: 'Muze docs', description: 'Open charting documentation', rightLabel: 'Help', icon: 'book', group: 'Quick links', action: 'open-muze-docs' },
];

const ADMIN_COMMAND_DEFS: AdminCommandDef[] = [
  { id: 'cmd-cc', label: 'Resource Control Centre', page: 'Resource control centre', category: 'Overview', rightLabel: 'Admin' },
  { id: 'cmd-ai', label: 'AI and BI Stats', page: 'AI and BI Stats', category: 'Overview', rightLabel: 'Admin' },
  { id: 'cmd-billing', label: 'Billing Stats', page: 'Billing stats', category: 'Overview', rightLabel: 'Admin' },
  { id: 'cmd-users-main', label: 'User Management', page: 'User management', tab: 'users', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-users-users', label: 'Users', page: 'User management', tab: 'users', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-users-groups', label: 'Groups', page: 'User management', tab: 'groups', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-users-auth', label: 'Authentication', page: 'User management', tab: 'authentication', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-org', label: 'Org Management', page: 'Org management', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-usage-main', label: 'Usage Insights', page: 'Usage insights', tab: 'user adoption', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-usage-adoption', label: 'User Adoption', page: 'Usage insights', tab: 'user adoption', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-usage-object', label: 'Object Usage', page: 'Usage insights', tab: 'object usage', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-usage-prod', label: 'User Productivity', page: 'Usage insights', tab: 'user productivity', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-usage-perf', label: 'Performance Tracking', page: 'Usage insights', tab: 'performance tracking', category: 'Users & Orgs', rightLabel: 'Admin' },
  { id: 'cmd-general-main', label: 'General Settings', page: 'General settings', tab: 'language', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-general-lang', label: 'Language', page: 'General settings', tab: 'language', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-general-time', label: 'Time Zone', page: 'General settings', tab: 'time zone', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-general-curr', label: 'Currency', page: 'General settings', tab: 'currency', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-general-admin', label: 'Administration', page: 'General settings', tab: 'administration', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-main', label: 'Agent Settings', page: 'Agent settings', tab: 'spotter', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-spotter', label: 'Spotter', page: 'Agent settings', tab: 'spotter', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-viz', label: 'Spotter Viz', page: 'Agent settings', tab: 'spotter viz', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-model', label: 'Spotter Model', page: 'Agent settings', tab: 'spotter model', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-code', label: 'Spotter Code', page: 'Agent settings', tab: 'spotter code', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-sim-main', label: 'Simulations & Impersonation', page: 'Simulations & Impersonation', tab: 'policy sandbox', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-sim-policy', label: 'Policy Sandbox', page: 'Simulations & Impersonation', tab: 'policy sandbox', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-sim-imp', label: 'Impersonation', page: 'Simulations & Impersonation', tab: 'impersonation', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-features-main', label: 'Feature Management', page: 'Feature management', tab: 'general access', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-features-gen', label: 'General Access', page: 'Feature management', tab: 'general access', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-features-early', label: 'Early Access', page: 'Feature management', tab: 'early access', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-features-beta', label: 'Beta Access', page: 'Feature management', tab: 'beta access', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-custom-main', label: 'Customisations', page: 'Customisations', tab: 'style', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-custom-style', label: 'Style', page: 'Customisations', tab: 'style', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-custom-chart', label: 'Chart', page: 'Customisations', tab: 'chart', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-custom-home', label: 'Homepage', page: 'Customisations', tab: 'homepage', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-custom-email', label: 'Email', page: 'Customisations', tab: 'email', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-custom-help', label: 'Help', page: 'Customisations', tab: 'help', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-core-main', label: 'Core Features', page: 'Core features', tab: 'search and spot iq', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-core-search', label: 'Search and Spot IQ', page: 'Core features', tab: 'search and spot iq', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-core-data', label: 'Data Modelling', page: 'Core features', tab: 'data modelling', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-core-dl', label: 'Downloads & Schedules', page: 'Core features', tab: 'downloads & schedules', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-gov-main', label: 'Governance & Security', page: 'Governance & Security', tab: 'security overview', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-gov-sec', label: 'Security Overview', page: 'Governance & Security', tab: 'security overview', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-gov-audit', label: 'Audit & Logs', page: 'Governance & Security', tab: 'audit & logs', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-gov-pol', label: 'Security Policies', page: 'Governance & Security', tab: 'security policies', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-conn-main', label: 'Connections & Integrations', page: 'Connections & Integrations', tab: 'connections', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-conn-conn', label: 'Connections', page: 'Connections & Integrations', tab: 'connections', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-conn-web', label: 'Webhooks', page: 'Connections & Integrations', tab: 'webhooks', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-conn-api', label: 'API & Service Accounts', page: 'Connections & Integrations', tab: 'api & service accounts', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-infra-main', label: 'Infrastructure & Support', page: 'Infrastructure & Support', tab: 'cluster info', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-infra-cluster', label: 'Cluster Info', page: 'Infrastructure & Support', tab: 'cluster info', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-infra-net', label: 'Network', page: 'Infrastructure & Support', tab: 'network', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-infra-up', label: 'Upgrades', page: 'Infrastructure & Support', tab: 'upgrades', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-infra-supp', label: 'Support', page: 'Infrastructure & Support', tab: 'support', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-ts-ai', label: 'ThoughtSpot AI', page: 'ThoughtSpot AI', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-vars', label: 'Variables', page: 'Variables', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-ver', label: 'Version Control', page: 'Version control', category: 'Application Settings', rightLabel: 'Admin' },
  { id: 'cmd-data-obj', label: 'Data objects', page: 'Data objects', category: 'Data Workspace', rightLabel: 'Data', icon: 'database', appTab: 'data' },
  { id: 'cmd-data-conn', label: 'Connections', page: 'Connections', category: 'Data Workspace', rightLabel: 'Data', icon: 'share', appTab: 'data' },
  { id: 'cmd-data-analyst', label: 'Analyst Studio', page: 'Analyst Studio', category: 'Data Workspace', rightLabel: 'Data', icon: 'chart', appTab: 'data' },
  { id: 'cmd-data-util', label: 'Utilities', page: 'Utilities', category: 'Data Workspace', rightLabel: 'Data', icon: 'wrench', appTab: 'data' },
  { id: 'cmd-data-sync', label: 'Sync', page: 'Sync', category: 'Data Workspace', rightLabel: 'Data', icon: 'sync', appTab: 'data' },
  { id: 'cmd-data-ref', label: 'Reference questions', page: 'Reference questions', category: 'Data Workspace', rightLabel: 'Data', icon: 'question-mark', appTab: 'data' },
  { id: 'cmd-data-terms', label: 'Business terms', page: 'Business terms', category: 'Data Workspace', rightLabel: 'Data', icon: 'book', appTab: 'data' },
  { id: 'cmd-data-cat', label: 'Data catalog', page: 'Data catalog', category: 'Data Workspace', rightLabel: 'Data', icon: 'book-closed', appTab: 'data' },
  { id: 'cmd-data-usage', label: 'Usage', page: 'Usage', category: 'Data Workspace', rightLabel: 'Data', icon: 'monitor', appTab: 'data' },
  { id: 'cmd-data-dbt', label: 'dbt', page: 'dbt', category: 'Data Workspace', rightLabel: 'Data', icon: 'database', appTab: 'data' },
  { id: 'cmd-data-verif', label: 'Liveboard verification', page: 'Liveboard verification', category: 'Data Workspace', rightLabel: 'Data', icon: 'verified', appTab: 'data' },
  { id: 'cmd-dev-home', label: 'Develop Home', page: 'Home', category: 'Develop', rightLabel: 'Develop', icon: 'liveboard', appTab: 'develop' },
  { id: 'cmd-dev-guide', label: 'Visual Embed SDK Guide', page: 'Guide', category: 'Develop', rightLabel: 'Develop', icon: 'book', appTab: 'develop' },
  { id: 'cmd-dev-play', label: 'Playground', page: 'Playground', category: 'Develop', rightLabel: 'Develop', icon: 'chart', appTab: 'develop' },
  { id: 'cmd-dev-rest-guide', label: 'REST API Guide', page: 'REST API Guide', category: 'Develop', rightLabel: 'Develop', icon: 'book-closed', appTab: 'develop' },
  { id: 'cmd-dev-rest-v2', label: 'REST Playground v2.0', page: 'REST Playground v2.0', category: 'Develop', rightLabel: 'Develop', icon: 'chart', appTab: 'develop' },
  { id: 'cmd-dev-rest-v1', label: 'REST Playground v1', page: 'REST Playground v1', category: 'Develop', rightLabel: 'Develop', icon: 'chart', appTab: 'develop' },
  { id: 'cmd-dev-graphql', label: 'GraphQL v2.0', page: 'GraphQL v2.0', category: 'Develop', rightLabel: 'Develop', icon: 'chart', appTab: 'develop' },
  { id: 'cmd-dev-theme', label: 'Theme Builder', page: 'Theme Builder', category: 'Develop', rightLabel: 'Develop', icon: 'brush', appTab: 'develop' },
  { id: 'cmd-dev-action', label: 'Custom actions', page: 'Custom actions', category: 'Develop', rightLabel: 'Develop', icon: 'settings', appTab: 'develop' },
  { id: 'cmd-dev-styles', label: 'Styles', page: 'Styles', category: 'Develop', rightLabel: 'Develop', icon: 'brush', appTab: 'develop' },
  { id: 'cmd-dev-links', label: 'Links settings', page: 'Links settings', category: 'Develop', rightLabel: 'Develop', icon: 'share', appTab: 'develop' },
  { id: 'cmd-dev-sec', label: 'Security settings', page: 'Security settings', category: 'Develop', rightLabel: 'Develop', icon: 'lock', appTab: 'develop' },
  { id: 'cmd-dev-web', label: 'Webhooks', page: 'Webhooks', category: 'Develop', rightLabel: 'Develop', icon: 'sync', appTab: 'develop' },
];

export const adminItems: CommandItem[] = ADMIN_COMMAND_DEFS.map((command) => ({
  id: command.id,
  label: command.label,
  description: `${command.category} / ${command.page}`,
  rightLabel: command.rightLabel,
  icon: command.icon ?? 'settings',
  group: 'Admin Settings',
  page: command.page,
  tab: command.tab,
  appTab: command.appTab,
  keywords: [command.category],
}));

export const navigateItems: CommandItem[] = [
  { id: 'nav-1', label: 'Home', description: 'Go to the home page', rightLabel: 'Navigate', icon: 'navigate', group: 'Navigate', page: 'Home', appTab: 'insights' },
  { id: 'nav-2', label: 'Liveboards', description: 'Browse all liveboards', rightLabel: 'Navigate', icon: 'liveboard', group: 'Navigate', page: 'Liveboards', appTab: 'insights' },
  { id: 'nav-3', label: 'Answers', description: 'Browse all answers', rightLabel: 'Navigate', icon: 'answer', group: 'Navigate', page: 'Answers', appTab: 'insights' },
  { id: 'nav-4', label: 'Spotter', description: 'Open Spotter chat', rightLabel: 'Navigate', icon: 'spotter', group: 'Navigate', page: 'Spotter', appTab: 'insights', isSpotter: true },
  { id: 'nav-5', label: 'Admin', description: 'Open administration section', rightLabel: 'Navigate', icon: 'cog', group: 'Navigate', page: 'General settings', appTab: 'admin' },
];

export const helpItems: CommandItem[] = [
  { id: 'help-1', label: 'Getting started', description: 'Learn the basics', rightLabel: 'Help', icon: 'book', group: 'Help' },
  { id: 'help-2', label: 'Keyboard shortcuts', description: 'View all keyboard shortcuts', rightLabel: 'Help', icon: 'info-circle', group: 'Help' },
  { id: 'help-3', label: 'Contact support', description: 'Get help from our team', rightLabel: 'Help', icon: 'paper-plane', group: 'Help' },
  { id: 'help-4', label: 'Community forum', description: 'Join the community', rightLabel: 'Help', icon: 'community', group: 'Help' },
  { id: 'help-5', label: 'Release notes', description: 'Read latest updates', rightLabel: 'Help', icon: 'note', group: 'Help' },
];

export const spotterItems: CommandItem[] = [
  { id: 'spotter-1', label: 'Spotter chat', description: 'Open a new chat', rightLabel: 'Spotter', icon: 'spotter', group: 'Spotter', isSpotter: true },
  { id: 'spotter-2', label: 'Recent conversations', description: 'View your recent chats', rightLabel: 'Spotter', icon: 'clock', group: 'Spotter' },
  { id: 'spotter-3', label: 'Saved insights', description: 'Open saved Spotter answers', rightLabel: 'Spotter', icon: 'bookmark', group: 'Spotter' },
];

export const allItems: CommandItem[] = [
  ...recentItems,
  ...createItems,
  ...quickLinkItems,
  ...answerItems,
  ...liveboardItems,
  ...collectionItems,
  ...modelItems,
  ...adminItems,
  ...navigateItems,
  ...helpItems,
  ...spotterItems,
];

export const commandGroups: CommandGroup[] = [
  { id: 'recent', title: 'Recent', items: recentItems },
  { id: 'create', title: 'Create', items: createItems },
  { id: 'quick-links', title: 'Quick links', items: quickLinkItems },
];

export function getItemsByFilter(filterType: string): CommandItem[] {
  switch (filterType) {
    case 'Answers':
      return answerItems;
    case 'Liveboards':
      return liveboardItems;
    case 'Admin Settings':
      return adminItems;
    case 'Navigate':
      return [...navigateItems, ...adminItems];
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

export function getRankedFilterOptions(context: PageContext): FilterOption[] {
  const ranking = CONTEXT_RANKINGS[context] || CONTEXT_RANKINGS.default;
  return [...FILTER_OPTIONS].sort((a, b) => ranking.indexOf(a.filterType) - ranking.indexOf(b.filterType));
}

export const keyboardShortcuts: KeyboardShortcut[] = [
  { keys: ['↑ ↓'], label: 'Navigate' },
  { keys: ['Tab'], label: 'Autocomplete' },
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
