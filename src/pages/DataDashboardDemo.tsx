import React, { useState } from 'react';
import { systemColors, referenceColors } from '../tokens/colors';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { LoadingIndicator } from '../components/LoadingIndicator';

const METRICS = [
  { label: 'Total Revenue', value: '$1.2M', change: '+12.5%', positive: true },
  { label: 'Active Users', value: '45.2K', change: '+8.3%', positive: true },
  { label: 'Conversion Rate', value: '3.2%', change: '-0.4%', positive: false },
  { label: 'Avg. Order Value', value: '$156', change: '+5.7%', positive: true },
];

const TABLE_DATA = [
  { id: 1, name: 'Product A', category: 'Electronics', revenue: '$45,230', units: 342, status: 'active' },
  { id: 2, name: 'Product B', category: 'Clothing', revenue: '$32,150', units: 521, status: 'active' },
  { id: 3, name: 'Product C', category: 'Home', revenue: '$28,400', units: 189, status: 'pending' },
  { id: 4, name: 'Product D', category: 'Electronics', revenue: '$21,890', units: 156, status: 'active' },
  { id: 5, name: 'Product E', category: 'Clothing', revenue: '$18,320', units: 298, status: 'inactive' },
];

const PERIODS = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'quarter', label: 'This Quarter' },
  { id: 'year', label: 'This Year' },
];

export const DataDashboardDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<string[]>(['Electronics', 'Active']);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const filteredData = TABLE_DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Data Dashboard</h1>
          <p style={styles.description}>
            An example prototype demonstrating multiple components working together
            in a data dashboard layout.
          </p>
        </div>
        <div style={styles.headerActions}>
          <Select
            options={PERIODS}
            value={period}
            onChange={(value) => setPeriod(value)}
            size="small"
          />
          <Button variant="secondary" onClick={handleRefresh}>
            Refresh
          </Button>
          <Button variant="primary">Export</Button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabsWrapper}>
        <Tabs
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'Products' },
            { id: 'customers', label: 'Customers' },
            { id: 'analytics', label: 'Analytics' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Metrics Cards */}
      <div style={styles.metricsGrid}>
        {METRICS.map((metric, index) => (
          <div key={index} style={styles.metricCard}>
            <span style={styles.metricLabel}>{metric.label}</span>
            <span style={styles.metricValue}>{metric.value}</span>
            <span
              style={{
                ...styles.metricChange,
                color: metric.positive ? systemColors.light['content-success'] : systemColors.light['content-failure'],
              }}
            >
              {metric.change}
            </span>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div style={styles.filtersRow}>
        <div style={styles.searchWrapper}>
          <SearchInput
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={styles.activeFilters}>
          {filters.map(filter => (
            <Chip
              key={filter}
              type="filter"
              label={filter}
              deletable
              onDelete={() => handleRemoveFilter(filter)}
            />
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div style={styles.tableContainer}>
        {isLoading ? (
          <div style={styles.loadingWrapper}>
            <LoadingIndicator size="large" text="Loading data..." />
          </div>
        ) : (
          <>
            <div style={styles.tableHeader}>
              <div style={styles.colName}>Product Name</div>
              <div style={styles.colCategory}>Category</div>
              <div style={styles.colRevenue}>Revenue</div>
              <div style={styles.colUnits}>Units Sold</div>
              <div style={styles.colStatus}>Status</div>
            </div>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <div key={row.id} style={styles.tableRow}>
                  <div style={styles.colName}>
                    <span style={styles.productName}>{row.name}</span>
                  </div>
                  <div style={styles.colCategory}>
                    <Chip type="attribute" label={row.category} showChevron={false} />
                  </div>
                  <div style={styles.colRevenue}>
                    <span style={styles.revenueValue}>{row.revenue}</span>
                  </div>
                  <div style={styles.colUnits}>
                    <span style={styles.unitsValue}>{row.units}</span>
                  </div>
                  <div style={styles.colStatus}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor:
                          row.status === 'active'
                            ? '#E8F5E9'
                            : row.status === 'pending'
                            ? '#FFF3E0'
                            : '#F5F5F5',
                        color:
                          row.status === 'active'
                            ? '#2E7D32'
                            : row.status === 'pending'
                            ? '#E65100'
                            : '#757575',
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                No products found matching your search.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  headerLeft: {
    flex: 1,
    minWidth: '300px',
  },
  title: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: '8px',
  },
  description: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '24px',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tabsWrapper: {
    marginBottom: '24px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  metricCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  metricLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-tertiary'],
    marginBottom: '8px',
  },
  metricValue: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: '4px',
  },
  metricChange: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
  },
  filtersRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    width: '300px',
  },
  activeFilters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tableContainer: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    border: `1px solid ${systemColors.light['background-subtle']}`,
    overflow: 'hidden',
  },
  loadingWrapper: {
    padding: '60px',
    display: 'flex',
    justifyContent: 'center',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '200px 150px 120px 100px 100px',
    padding: '14px 20px',
    backgroundColor: systemColors.light['background-sunken'],
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: systemColors.light['content-tertiary'],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '200px 150px 120px 100px 100px',
    padding: '14px 20px',
    borderBottom: `1px solid ${systemColors.light['background-sunken']}`,
    alignItems: 'center',
  },
  colName: {},
  colCategory: {},
  colRevenue: {},
  colUnits: {},
  colStatus: {},
  productName: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  revenueValue: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
  },
  unitsValue: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: referenceColors.gray['70'],
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  emptyState: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: systemColors.light['content-tertiary'],
  },
};

export default DataDashboardDemo;
