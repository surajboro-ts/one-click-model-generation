/**
 * Mock data for Liveboard dashboard
 * Based on the Figma design: TSE Business Overview
 */

// Navigation tabs
export const navigationTabs = [
  { id: 'scorecard', label: 'Scorecard' },
  { id: 'bookings', label: 'Bookings & Pipeline' },
  { id: 'adoption', label: 'Adoption' },
  { id: 'nps', label: 'NPS' },
];

// Filter options
export const filterOptions = {
  views: [
    { id: 'default', label: 'Default View' },
    { id: 'executive', label: 'Executive View' },
    { id: 'detailed', label: 'Detailed View' },
  ],
  regions: [
    { id: 'north-america', label: 'North America' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia-pacific', label: 'Asia Pacific' },
    { id: 'latam', label: 'Latin America' },
  ],
  opportunityScores: [
    { id: '0.4', label: '0.4' },
    { id: '0.5', label: '0.5' },
    { id: '0.6', label: '0.6' },
    { id: '0.7', label: '0.7' },
  ],
  years: [
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
  ],
  quarters: [
    { id: 'Q1', label: 'Q1' },
    { id: 'Q2', label: 'Q2' },
    { id: 'Q3', label: 'Q3' },
    { id: 'Q4', label: 'Q4' },
  ],
};

// KPI Cards data
export const weeklyUpdate = {
  title: 'Weekly Update',
  message: 'Sales revenue increased by',
  highlight: '30%',
  suffix: 'in 1 week',
  subTitle: 'Major contributing deals -',
  deals: ['Motive', 'Basis Global', 'Enable'],
};

export const cfyMetric = {
  label: 'CFY',
  value: 'US$3.99M',
  trend: 'up' as const,
  trendValue: '74.54%',
  comparison: 'vs FY 2025 (US$15.65M)',
  chartData: [10, 15, 12, 18, 22, 25, 30, 28, 35, 40, 38, 45],
};

export const currentQuarterMetric = {
  label: 'Current Quarter',
  value: 'US$2.76M',
  trend: 'down' as const,
  trendValue: '12.05%',
  comparison: 'vs FY 2025 (US$15.65M)',
  chartData: [20, 25, 22, 28, 30, 35, 32, 38, 42, 45, 48, 52],
};

export const tsePipeline = {
  title: 'TSE Pipeline',
  metrics: [
    { label: 'Current Quarter', value: 'US$17.6M' },
    { label: 'New Quarter', value: 'US$8.14M' },
  ],
};

export const tseCommitPipeline = {
  title: 'TSE Commit Pipeline',
  metrics: [
    { label: 'Current Quarter', value: 'US$4.74M' },
    { label: 'New Quarter', value: 'US$993.02K' },
  ],
};

// Donut chart data - CQ TSE Open Pipeline by Type
export const pipelineByType = {
  title: 'CQ TSE Open Pipeline by Type',
  data: [
    { label: 'Existing Customer', value: 8.6, color: '#2770EF' },
    { label: 'Expansion', value: 0, color: '#48D1E0' },
    { label: 'New Customer', value: 9.0, color: '#FCC838' },
  ],
  total: 17.6,
  centerLabel: 'US$8.6M, (47.86%)',
};

// Stacked bar chart data - TSE ACV by Forecast Category
export const acvByForecast = {
  title: 'TSE ACV by Forecast Category',
  yAxisLabel: 'Total Opportunity ACV',
  data: [
    {
      quarter: 'Q1',
      segments: [
        { label: 'Commit', value: 12, color: '#2770EF' },
        { label: 'Best Case', value: 8, color: '#48D1E0' },
        { label: 'Pipeline', value: 5, color: '#FCC838' },
      ],
    },
    {
      quarter: 'Q2',
      segments: [
        { label: 'Commit', value: 15, color: '#2770EF' },
        { label: 'Best Case', value: 10, color: '#48D1E0' },
        { label: 'Pipeline', value: 7, color: '#FCC838' },
      ],
    },
  ],
  maxValue: 30,
};

// Update section
export const updateInfo = {
  date: '8th Nov, 2024',
  items: [
    { text: 'Projected growth in next quarter is', highlight: 'USD 345.23M' },
    { text: 'Increased incoming opportunities since Q3', highlight: '' },
  ],
};

// North America opportunities
export const northAmericaOpportunities = {
  title: 'North America opportunities',
  projectedGrowth: {
    label: 'Projected growth',
    value: 'US$4.74M',
  },
  stateData: [
    { state: 'Arizona', Q1: '$4.1M', Q2: '$5.6M', Q3: '$5.6M', Q4: '$4.4M', Q5: '$4' },
    { state: 'Texas', Q1: '$4.1M', Q2: '$5.6M', Q3: '$5.6M', Q4: '$4.4M', Q5: '$4' },
    { state: 'Washington', Q1: '$4.1M', Q2: '$5.6M', Q3: '$5.6M', Q4: '$4.4M', Q5: '$4' },
    { state: 'Washington', Q1: '$4.1M', Q2: '$5.6M', Q3: '$5.6M', Q4: '$4.4M', Q5: '$4' },
    { state: 'Washington', Q1: '$4.1M', Q2: '$5.6M', Q3: '$5.6M', Q4: '$4.4M', Q5: '$4' },
  ],
  highlightedStates: ['California', 'Texas', 'Arizona', 'Washington', 'New York'],
};

// User profile
export const userProfile = {
  name: 'Royal Enfield',
  avatar: '', // Will use initials
};
