/**
 * Mock Analytics Data
 * 
 * Sample data for charts, tables, and dashboards.
 */

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  period: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface TableRow {
  id: string;
  name: string;
  revenue: string;
  users: number;
  growth: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface Answer {
  id: string;
  name: string;
  type: 'chart' | 'table' | 'headline';
  author: string;
  views: number;
  lastViewed: string;
  isPinned: boolean;
}

export interface Liveboard {
  id: string;
  name: string;
  description: string;
  answers: number;
  author: string;
  views: number;
  lastModified: string;
}

/**
 * Key performance metrics
 */
export const metrics: Metric[] = [
  {
    label: 'Total revenue',
    value: '$1.2M',
    change: '+12.5%',
    trend: 'up',
    period: 'vs last month',
  },
  {
    label: 'Active users',
    value: '8,432',
    change: '+5.2%',
    trend: 'up',
    period: 'vs last month',
  },
  {
    label: 'Conversion rate',
    value: '3.2%',
    change: '-0.3%',
    trend: 'down',
    period: 'vs last month',
  },
  {
    label: 'Avg. order value',
    value: '$142',
    change: '+8.1%',
    trend: 'up',
    period: 'vs last month',
  },
  {
    label: 'Customer satisfaction',
    value: '4.6/5',
    change: '0%',
    trend: 'neutral',
    period: 'vs last month',
  },
  {
    label: 'Churn rate',
    value: '2.1%',
    change: '-0.5%',
    trend: 'up', // down is good for churn
    period: 'vs last month',
  },
];

/**
 * Revenue by month
 */
export const revenueByMonth: ChartDataPoint[] = [
  { label: 'Jan', value: 85000 },
  { label: 'Feb', value: 92000 },
  { label: 'Mar', value: 108000 },
  { label: 'Apr', value: 95000 },
  { label: 'May', value: 112000 },
  { label: 'Jun', value: 128000 },
  { label: 'Jul', value: 135000 },
  { label: 'Aug', value: 142000 },
  { label: 'Sep', value: 138000 },
  { label: 'Oct', value: 155000 },
  { label: 'Nov', value: 168000 },
  { label: 'Dec', value: 185000 },
];

/**
 * Revenue by region
 */
export const revenueByRegion: ChartDataPoint[] = [
  { label: 'North America', value: 580000 },
  { label: 'Europe', value: 320000 },
  { label: 'Asia Pacific', value: 210000 },
  { label: 'Latin America', value: 75000 },
  { label: 'Middle East', value: 45000 },
];

/**
 * Product/plan breakdown
 */
export const productBreakdown: TableRow[] = [
  {
    id: 'prod-1',
    name: 'Enterprise Plan',
    revenue: '$450,000',
    users: 1200,
    growth: '+15%',
    status: 'active',
  },
  {
    id: 'prod-2',
    name: 'Professional',
    revenue: '$325,000',
    users: 850,
    growth: '+8%',
    status: 'active',
  },
  {
    id: 'prod-3',
    name: 'Team',
    revenue: '$185,000',
    users: 620,
    growth: '+22%',
    status: 'active',
  },
  {
    id: 'prod-4',
    name: 'Starter',
    revenue: '$128,000',
    users: 2100,
    growth: '+35%',
    status: 'active',
  },
  {
    id: 'prod-5',
    name: 'Trial',
    revenue: '$0',
    users: 450,
    growth: '+12%',
    status: 'pending',
  },
  {
    id: 'prod-6',
    name: 'Legacy',
    revenue: '$82,000',
    users: 320,
    growth: '-5%',
    status: 'inactive',
  },
];

/**
 * Sample Answers (saved queries)
 */
export const answers: Answer[] = [
  {
    id: 'ans-1',
    name: 'Revenue by Region',
    type: 'chart',
    author: 'Alex Johnson',
    views: 245,
    lastViewed: '2 hours ago',
    isPinned: true,
  },
  {
    id: 'ans-2',
    name: 'Monthly Active Users',
    type: 'chart',
    author: 'Sarah Chen',
    views: 189,
    lastViewed: '1 day ago',
    isPinned: true,
  },
  {
    id: 'ans-3',
    name: 'Top Customers by Revenue',
    type: 'table',
    author: 'Alex Johnson',
    views: 156,
    lastViewed: '3 hours ago',
    isPinned: false,
  },
  {
    id: 'ans-4',
    name: 'Conversion Funnel',
    type: 'chart',
    author: 'Michael Roberts',
    views: 98,
    lastViewed: '5 days ago',
    isPinned: false,
  },
  {
    id: 'ans-5',
    name: 'Total Revenue',
    type: 'headline',
    author: 'Sarah Chen',
    views: 312,
    lastViewed: '30 minutes ago',
    isPinned: true,
  },
];

/**
 * Sample Liveboards (dashboards)
 */
export const liveboards: Liveboard[] = [
  {
    id: 'lb-1',
    name: 'Executive Dashboard',
    description: 'High-level KPIs for leadership team',
    answers: 8,
    author: 'Alex Johnson',
    views: 1250,
    lastModified: '2 hours ago',
  },
  {
    id: 'lb-2',
    name: 'Sales Performance',
    description: 'Daily sales metrics and pipeline',
    answers: 12,
    author: 'Sarah Chen',
    views: 890,
    lastModified: '1 day ago',
  },
  {
    id: 'lb-3',
    name: 'Marketing Analytics',
    description: 'Campaign performance and attribution',
    answers: 6,
    author: 'Michael Roberts',
    views: 445,
    lastModified: '3 days ago',
  },
  {
    id: 'lb-4',
    name: 'Product Usage',
    description: 'Feature adoption and user engagement',
    answers: 10,
    author: 'Lisa Thompson',
    views: 678,
    lastModified: '5 hours ago',
  },
];

/**
 * Status variant mapping for chips
 */
export const statusVariants: Record<TableRow['status'], 'success' | 'warning' | 'default'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'default',
};

export default {
  metrics,
  revenueByMonth,
  revenueByRegion,
  productBreakdown,
  answers,
  liveboards,
  statusVariants,
};
