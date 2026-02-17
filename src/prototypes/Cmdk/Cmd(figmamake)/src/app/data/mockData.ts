// Mock data for all object types across ThoughtSpot

export interface ThoughtSpotObject {
  id: string;
  name: string;
  type: 'Liveboard' | 'Answer' | 'Collection' | 'Data Model' | 'Table' | 'Connection';
  author: string;
  authorAvatar?: string;
  modified: string;
  tags: string[];
  description?: string;
  views?: number;
  favorites?: number;
  // Type-specific fields
  visualizationType?: string; // For Answers
  chartsCount?: number; // For Liveboards
  objectsCount?: number; // For Collections
  rowCount?: number; // For Tables
  connectionType?: string; // For Connections
  status?: 'Active' | 'Inactive' | 'Error'; // For Connections
}

// Liveboards
export const mockLiveboards: ThoughtSpotObject[] = [
  {
    id: 'lb-1',
    name: 'Design : Muze + Tooltips',
    type: 'Liveboard',
    author: 'mohammed.faris',
    authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    modified: '4 days ago',
    tags: [],
    description: 'Design variations and tooltip experiments',
    views: 15,
    favorites: 3,
    chartsCount: 8
  },
  {
    id: 'lb-2',
    name: 'Content Density',
    type: 'Liveboard',
    author: 'mohammed.faris',
    authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    modified: '4 days ago',
    tags: [],
    description: 'Testing different content density layouts',
    views: 3,
    favorites: 0,
    chartsCount: 5
  },
  {
    id: 'lb-3',
    name: 'Billable Query Stats Liveboard',
    type: 'Liveboard',
    author: 'System User',
    authorAvatar: '', // System user often has no avatar or a generic one
    modified: '4 days ago',
    tags: [],
    description: 'Statistics on billable queries',
    views: 6,
    favorites: 0,
    chartsCount: 12
  },
  {
    id: 'lb-4',
    name: 'User Adoption',
    type: 'Liveboard',
    author: 'System User',
    authorAvatar: '',
    modified: '4 days ago',
    tags: [],
    description: 'User adoption metrics and trends',
    views: 23,
    favorites: 2,
    chartsCount: 15
  },
  {
    id: 'lb-5',
    name: 'testing',
    type: 'Liveboard',
    author: 'Vikas Gautam',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    modified: '6 days ago',
    tags: [],
    description: 'Testing scratchpad',
    views: 2,
    favorites: 0,
    chartsCount: 3
  },
  {
    id: 'lb-6',
    name: 'Muze Studio Gallery',
    type: 'Liveboard',
    author: 'Nakshatra Mukhopadhyay',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    modified: '6 days ago',
    tags: [],
    description: 'Gallery of Muze Studio creations',
    views: 2,
    favorites: 0,
    chartsCount: 20
  },
  {
    id: 'lb-7',
    name: 'Arpit Test Liveboard',
    type: 'Liveboard',
    author: 'Arpit Rai',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    modified: '6 days ago',
    tags: [],
    description: 'Arpit\'s personal test board',
    views: 5,
    favorites: 0,
    chartsCount: 4
  },
  {
    id: 'lb-8',
    name: 'Bar/Column Charts Enhancements',
    type: 'Liveboard',
    author: 'mohammed.faris',
    authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    modified: '6 days ago',
    tags: [],
    description: 'Testing enhancements for bar and column charts',
    views: 1,
    favorites: 0,
    chartsCount: 7
  },
  {
    id: 'lb-9',
    name: 'bugs - airplane crashes',
    type: 'Liveboard',
    author: 'ash',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    modified: '6 days ago',
    tags: [],
    description: 'Analysis of airplane crash data bugs',
    views: 5,
    favorites: 1,
    chartsCount: 6
  },
  {
    id: 'lb-10',
    name: 'Sales',
    type: 'Liveboard',
    author: 'shubham.agrawal',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    modified: '6 days ago',
    tags: [],
    description: 'General sales overview',
    views: 15,
    favorites: 4,
    chartsCount: 10
  }
];

// Answers
export const mockAnswers: ThoughtSpotObject[] = [
  {
    id: 'ans-1',
    name: 'Daily Sales vs Target',
    type: 'Answer',
    author: 'Anya Sharma',
    modified: '4 hours ago',
    tags: ['Sales', 'Daily', 'Target'],
    description: 'Daily sales comparison against targets',
    views: 234,
    favorites: 18,
    visualizationType: 'Column Chart'
  },
  {
    id: 'ans-2',
    name: 'Top 10 Products by Revenue',
    type: 'Answer',
    author: 'Mike Ross',
    modified: '1 day ago',
    tags: ['Products', 'Revenue', 'Top Performers'],
    description: 'Best performing products by revenue',
    views: 445,
    favorites: 34,
    visualizationType: 'Bar Chart'
  },
  {
    id: 'ans-3',
    name: 'Regional Sales Breakdown',
    type: 'Answer',
    author: 'Sarah Chen',
    modified: '6 hours ago',
    tags: ['Regional', 'Sales', 'Geography'],
    description: 'Sales distribution across regions',
    views: 312,
    favorites: 22,
    visualizationType: 'Map'
  },
  {
    id: 'ans-4',
    name: 'Customer Acquisition Trends',
    type: 'Answer',
    author: 'David Park',
    modified: '2 days ago',
    tags: ['Customer', 'Acquisition', 'Trends'],
    description: 'New customer acquisition over time',
    views: 189,
    favorites: 15,
    visualizationType: 'Line Chart'
  },
  {
    id: 'ans-5',
    name: 'Churn Rate by Segment',
    type: 'Answer',
    author: 'Anya Sharma',
    modified: '3 days ago',
    tags: ['Churn', 'Retention', 'Segments'],
    description: 'Customer churn across different segments',
    views: 276,
    favorites: 21,
    visualizationType: 'Stacked Bar'
  },
  {
    id: 'ans-6',
    name: 'Quarterly Revenue Growth',
    type: 'Answer',
    author: 'Mike Ross',
    modified: '1 week ago',
    tags: ['Revenue', 'Growth', 'Quarterly'],
    description: 'Quarter over quarter revenue growth',
    views: 567,
    favorites: 45,
    visualizationType: 'Area Chart'
  },
  {
    id: 'ans-7',
    name: 'Product Category Performance',
    type: 'Answer',
    author: 'Sarah Chen',
    modified: '5 days ago',
    tags: ['Products', 'Categories', 'Performance'],
    description: 'Sales performance by product category',
    views: 398,
    favorites: 28,
    visualizationType: 'Pie Chart'
  }
];

// Collections
export const mockCollections: ThoughtSpotObject[] = [
  {
    id: 'col-1',
    name: 'Executive Reports',
    type: 'Collection',
    author: 'Anya Sharma',
    modified: '1 day ago',
    tags: ['Executive', 'Reports', 'Leadership'],
    description: 'Executive-level dashboards and reports',
    views: 892,
    favorites: 67,
    objectsCount: 24
  },
  {
    id: 'col-2',
    name: 'Sales Team Resources',
    type: 'Collection',
    author: 'Mike Ross',
    modified: '3 days ago',
    tags: ['Sales', 'Team', 'Resources'],
    description: 'Sales analytics and tracking tools',
    views: 543,
    favorites: 41,
    objectsCount: 18
  },
  {
    id: 'col-3',
    name: 'Marketing Analytics',
    type: 'Collection',
    author: 'Sarah Chen',
    modified: '2 days ago',
    tags: ['Marketing', 'Analytics', 'Campaigns'],
    description: 'Marketing performance and campaign analytics',
    views: 467,
    favorites: 35,
    objectsCount: 15
  },
  {
    id: 'col-4',
    name: 'Financial Planning',
    type: 'Collection',
    author: 'David Park',
    modified: '1 week ago',
    tags: ['Finance', 'Planning', 'Budgets'],
    description: 'Financial planning and budgeting resources',
    views: 721,
    favorites: 52,
    objectsCount: 21
  },
  {
    id: 'col-5',
    name: 'Customer Analytics Hub',
    type: 'Collection',
    author: 'Anya Sharma',
    modified: '4 days ago',
    tags: ['Customer', 'Analytics', 'Insights'],
    description: 'Customer behavior and insights',
    views: 634,
    favorites: 48,
    objectsCount: 19
  }
];

// Data Models
export const mockDataModels: ThoughtSpotObject[] = [
  {
    id: 'dm-1',
    name: 'Retail Sales Model',
    type: 'Data Model',
    author: 'Tech Team',
    modified: '2 weeks ago',
    tags: ['Sales', 'Retail', 'Core'],
    description: 'Primary sales data model for retail operations',
    views: 1834,
    favorites: 123
  },
  {
    id: 'dm-2',
    name: 'Customer 360 Model',
    type: 'Data Model',
    author: 'Data Engineering',
    modified: '1 month ago',
    tags: ['Customer', '360', 'Master'],
    description: 'Comprehensive customer data model',
    views: 2156,
    favorites: 156
  },
  {
    id: 'dm-3',
    name: 'Financial Reporting Model',
    type: 'Data Model',
    author: 'Finance Team',
    modified: '3 weeks ago',
    tags: ['Finance', 'Reporting', 'Compliance'],
    description: 'Financial reporting and compliance model',
    views: 987,
    favorites: 78
  },
  {
    id: 'dm-4',
    name: 'Inventory Management Model',
    type: 'Data Model',
    author: 'Tech Team',
    modified: '1 week ago',
    tags: ['Inventory', 'Operations', 'Supply Chain'],
    description: 'Inventory and supply chain data model',
    views: 654,
    favorites: 45
  },
  {
    id: 'dm-5',
    name: 'Marketing Attribution Model',
    type: 'Data Model',
    author: 'Marketing Ops',
    modified: '2 weeks ago',
    tags: ['Marketing', 'Attribution', 'ROI'],
    description: 'Marketing campaign attribution model',
    views: 543,
    favorites: 38
  }
];

// Tables
export const mockTables: ThoughtSpotObject[] = [
  {
    id: 'tbl-1',
    name: 'sales_transactions',
    type: 'Table',
    author: 'Data Engineering',
    modified: '1 hour ago',
    tags: ['Sales', 'Transactions', 'Fact'],
    description: 'Daily sales transaction records',
    views: 3421,
    favorites: 234,
    rowCount: 15678234
  },
  {
    id: 'tbl-2',
    name: 'customer_master',
    type: 'Table',
    author: 'Data Engineering',
    modified: '2 hours ago',
    tags: ['Customer', 'Master', 'Dimension'],
    description: 'Customer master data',
    views: 2876,
    favorites: 198,
    rowCount: 456789
  },
  {
    id: 'tbl-3',
    name: 'product_catalog',
    type: 'Table',
    author: 'Tech Team',
    modified: '5 hours ago',
    tags: ['Product', 'Catalog', 'Dimension'],
    description: 'Product catalog and attributes',
    views: 1987,
    favorites: 145,
    rowCount: 234567
  },
  {
    id: 'tbl-4',
    name: 'inventory_levels',
    type: 'Table',
    author: 'Data Engineering',
    modified: '30 minutes ago',
    tags: ['Inventory', 'Stock', 'Fact'],
    description: 'Real-time inventory levels by location',
    views: 1543,
    favorites: 112,
    rowCount: 987654
  },
  {
    id: 'tbl-5',
    name: 'marketing_campaigns',
    type: 'Table',
    author: 'Marketing Ops',
    modified: '1 day ago',
    tags: ['Marketing', 'Campaigns', 'Dimension'],
    description: 'Marketing campaign metadata',
    views: 987,
    favorites: 76,
    rowCount: 12345
  },
  {
    id: 'tbl-6',
    name: 'web_analytics_events',
    type: 'Table',
    author: 'Data Engineering',
    modified: '15 minutes ago',
    tags: ['Web', 'Analytics', 'Events'],
    description: 'Website user behavior events',
    views: 2341,
    favorites: 167,
    rowCount: 45678912
  },
  {
    id: 'tbl-7',
    name: 'order_fulfillment',
    type: 'Table',
    author: 'Tech Team',
    modified: '3 hours ago',
    tags: ['Orders', 'Fulfillment', 'Fact'],
    description: 'Order fulfillment and shipping data',
    views: 1678,
    favorites: 123,
    rowCount: 3456789
  },
  {
    id: 'tbl-8',
    name: 'store_locations',
    type: 'Table',
    author: 'Data Engineering',
    modified: '1 week ago',
    tags: ['Store', 'Location', 'Dimension'],
    description: 'Physical store location data',
    views: 876,
    favorites: 54,
    rowCount: 567
  }
];

// Connections
export const mockConnections: ThoughtSpotObject[] = [
  {
    id: 'conn-1',
    name: 'Snowflake Production',
    type: 'Connection',
    author: 'Data Engineering',
    modified: '1 day ago',
    tags: ['Snowflake', 'Production', 'Primary'],
    description: 'Primary Snowflake data warehouse connection',
    views: 456,
    favorites: 34,
    connectionType: 'Snowflake',
    status: 'Active'
  },
  {
    id: 'conn-2',
    name: 'PostgreSQL Analytics',
    type: 'Connection',
    author: 'Tech Team',
    modified: '3 days ago',
    tags: ['PostgreSQL', 'Analytics', 'Database'],
    description: 'PostgreSQL analytics database',
    views: 234,
    favorites: 23,
    connectionType: 'PostgreSQL',
    status: 'Active'
  },
  {
    id: 'conn-3',
    name: 'Google BigQuery',
    type: 'Connection',
    author: 'Data Engineering',
    modified: '1 week ago',
    tags: ['BigQuery', 'Google', 'Cloud'],
    description: 'Google BigQuery cloud data warehouse',
    views: 345,
    favorites: 28,
    connectionType: 'BigQuery',
    status: 'Active'
  },
  {
    id: 'conn-4',
    name: 'Salesforce CRM',
    type: 'Connection',
    author: 'Sales Ops',
    modified: '2 days ago',
    tags: ['Salesforce', 'CRM', 'SaaS'],
    description: 'Salesforce CRM integration',
    views: 567,
    favorites: 45,
    connectionType: 'Salesforce',
    status: 'Active'
  },
  {
    id: 'conn-5',
    name: 'AWS Redshift',
    type: 'Connection',
    author: 'Data Engineering',
    modified: '5 days ago',
    tags: ['Redshift', 'AWS', 'Warehouse'],
    description: 'AWS Redshift data warehouse',
    views: 289,
    favorites: 19,
    connectionType: 'Redshift',
    status: 'Error'
  },
  {
    id: 'conn-6',
    name: 'MongoDB Documents',
    type: 'Connection',
    author: 'Tech Team',
    modified: '1 week ago',
    tags: ['MongoDB', 'NoSQL', 'Documents'],
    description: 'MongoDB document database',
    views: 178,
    favorites: 12,
    connectionType: 'MongoDB',
    status: 'Active'
  }
];

// All objects combined
export const allMockObjects: ThoughtSpotObject[] = [
  ...mockLiveboards,
  ...mockAnswers,
  ...mockCollections,
  ...mockDataModels,
  ...mockTables,
  ...mockConnections
];

// Object type metadata
export const objectTypeMetadata = {
  'Liveboard': { icon: 'Layout', color: '#71a1f4', category: 'Insights' },
  'Answer': { icon: 'BarChart2', color: '#9b6dd6', category: 'Insights' },
  'Collection': { icon: 'Folder', color: '#f59e42', category: 'Insights' },
  'Data Model': { icon: 'Database', color: '#4caf50', category: 'Data' },
  'Table': { icon: 'Table', color: '#00bcd4', category: 'Data' },
  'Connection': { icon: 'Link', color: '#ff6b6b', category: 'Data' }
};
