/**
 * Mock Form Data
 * 
 * Sample data for dropdowns, filters, and form options.
 */

export interface SelectOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

/**
 * Country options
 */
export const countries: FilterOption[] = [
  { id: 'us', label: 'United States', count: 245 },
  { id: 'ca', label: 'Canada', count: 89 },
  { id: 'uk', label: 'United Kingdom', count: 156 },
  { id: 'de', label: 'Germany', count: 112 },
  { id: 'fr', label: 'France', count: 78 },
  { id: 'jp', label: 'Japan', count: 95 },
  { id: 'au', label: 'Australia', count: 67 },
  { id: 'in', label: 'India', count: 134 },
  { id: 'br', label: 'Brazil', count: 56 },
  { id: 'mx', label: 'Mexico', count: 42 },
  { id: 'sg', label: 'Singapore', count: 38 },
  { id: 'nl', label: 'Netherlands', count: 29 },
];

/**
 * Region options
 */
export const regions: FilterOption[] = [
  { id: 'na', label: 'North America', count: 334 },
  { id: 'eu', label: 'Europe', count: 375 },
  { id: 'apac', label: 'Asia Pacific', count: 334 },
  { id: 'latam', label: 'Latin America', count: 98 },
  { id: 'mea', label: 'Middle East & Africa', count: 45 },
];

/**
 * Department options
 */
export const departments: FilterOption[] = [
  { id: 'engineering', label: 'Engineering', count: 45 },
  { id: 'sales', label: 'Sales', count: 38 },
  { id: 'marketing', label: 'Marketing', count: 22 },
  { id: 'product', label: 'Product', count: 18 },
  { id: 'finance', label: 'Finance', count: 12 },
  { id: 'hr', label: 'Human Resources', count: 8 },
  { id: 'operations', label: 'Operations', count: 15 },
  { id: 'support', label: 'Customer Support', count: 25 },
];

/**
 * Status options
 */
export const statuses: FilterOption[] = [
  { id: 'active', label: 'Active', count: 156 },
  { id: 'pending', label: 'Pending', count: 23 },
  { id: 'inactive', label: 'Inactive', count: 45 },
  { id: 'archived', label: 'Archived', count: 12 },
];

/**
 * Time range options
 */
export const timeRanges: SelectOption[] = [
  { id: 'today', label: 'Today', value: 'today' },
  { id: 'yesterday', label: 'Yesterday', value: 'yesterday' },
  { id: 'last7', label: 'Last 7 days', value: 'last7' },
  { id: 'last30', label: 'Last 30 days', value: 'last30' },
  { id: 'last90', label: 'Last 90 days', value: 'last90' },
  { id: 'thisMonth', label: 'This month', value: 'thisMonth' },
  { id: 'lastMonth', label: 'Last month', value: 'lastMonth' },
  { id: 'thisQuarter', label: 'This quarter', value: 'thisQuarter' },
  { id: 'lastQuarter', label: 'Last quarter', value: 'lastQuarter' },
  { id: 'thisYear', label: 'This year', value: 'thisYear' },
  { id: 'custom', label: 'Custom range', value: 'custom' },
];

/**
 * Sort options
 */
export const sortOptions: SelectOption[] = [
  { id: 'nameAsc', label: 'Name (A-Z)', value: 'name_asc' },
  { id: 'nameDesc', label: 'Name (Z-A)', value: 'name_desc' },
  { id: 'dateDesc', label: 'Newest first', value: 'date_desc' },
  { id: 'dateAsc', label: 'Oldest first', value: 'date_asc' },
  { id: 'viewsDesc', label: 'Most viewed', value: 'views_desc' },
  { id: 'viewsAsc', label: 'Least viewed', value: 'views_asc' },
];

/**
 * Chart type options
 */
export const chartTypes: SelectOption[] = [
  { id: 'bar', label: 'Bar chart', value: 'bar' },
  { id: 'line', label: 'Line chart', value: 'line' },
  { id: 'pie', label: 'Pie chart', value: 'pie' },
  { id: 'donut', label: 'Donut chart', value: 'donut' },
  { id: 'area', label: 'Area chart', value: 'area' },
  { id: 'scatter', label: 'Scatter plot', value: 'scatter' },
  { id: 'table', label: 'Table', value: 'table' },
  { id: 'headline', label: 'Headline', value: 'headline' },
];

/**
 * Permission options
 */
export const permissions: FilterOption[] = [
  { id: 'view', label: 'Can view', count: 156 },
  { id: 'edit', label: 'Can edit', count: 45 },
  { id: 'share', label: 'Can share', count: 38 },
  { id: 'admin', label: 'Administrator', count: 5 },
];

/**
 * Data source types
 */
export const dataSources: SelectOption[] = [
  { id: 'snowflake', label: 'Snowflake', value: 'snowflake' },
  { id: 'bigquery', label: 'Google BigQuery', value: 'bigquery' },
  { id: 'redshift', label: 'Amazon Redshift', value: 'redshift' },
  { id: 'databricks', label: 'Databricks', value: 'databricks' },
  { id: 'synapse', label: 'Azure Synapse', value: 'synapse' },
  { id: 'postgres', label: 'PostgreSQL', value: 'postgres' },
  { id: 'mysql', label: 'MySQL', value: 'mysql' },
  { id: 'oracle', label: 'Oracle', value: 'oracle' },
];

/**
 * Timezone options
 */
export const timezones: SelectOption[] = [
  { id: 'pst', label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { id: 'mst', label: 'Mountain Time (MT)', value: 'America/Denver' },
  { id: 'cst', label: 'Central Time (CT)', value: 'America/Chicago' },
  { id: 'est', label: 'Eastern Time (ET)', value: 'America/New_York' },
  { id: 'utc', label: 'UTC', value: 'UTC' },
  { id: 'gmt', label: 'GMT', value: 'Europe/London' },
  { id: 'cet', label: 'Central European Time', value: 'Europe/Paris' },
  { id: 'ist', label: 'India Standard Time', value: 'Asia/Kolkata' },
  { id: 'jst', label: 'Japan Standard Time', value: 'Asia/Tokyo' },
  { id: 'aest', label: 'Australian Eastern Time', value: 'Australia/Sydney' },
];

/**
 * Frequency options (for scheduling)
 */
export const frequencies: SelectOption[] = [
  { id: 'once', label: 'Once', value: 'once' },
  { id: 'hourly', label: 'Hourly', value: 'hourly' },
  { id: 'daily', label: 'Daily', value: 'daily' },
  { id: 'weekly', label: 'Weekly', value: 'weekly' },
  { id: 'monthly', label: 'Monthly', value: 'monthly' },
  { id: 'quarterly', label: 'Quarterly', value: 'quarterly' },
];

export default {
  countries,
  regions,
  departments,
  statuses,
  timeRanges,
  sortOptions,
  chartTypes,
  permissions,
  dataSources,
  timezones,
  frequencies,
};
