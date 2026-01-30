import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { SearchInput } from '../../components/SearchInput';
import { Chip } from '../../components/Chip';
import { Icon } from '../../components/icons';
import { brandColors } from '../../tokens/colors/brand';

/**
 * Data Dashboard Example
 * 
 * A common ThoughtSpot pattern: analytics dashboard with metrics and data tables.
 * Demonstrates: Tabs, SearchInput, Chip, Button, Icon composition.
 * 
 * Use this as a reference for building dashboard-style interfaces.
 */

// Sample metrics data
const METRICS = [
  { label: 'Total revenue', value: '$1.2M', change: '+12%', trend: 'up' },
  { label: 'Active users', value: '8,432', change: '+5%', trend: 'up' },
  { label: 'Conversion rate', value: '3.2%', change: '-0.3%', trend: 'down' },
  { label: 'Avg. order value', value: '$142', change: '+8%', trend: 'up' },
];

// Sample table data
const TABLE_DATA = [
  { id: 1, name: 'Enterprise Plan', revenue: '$45,000', users: 120, status: 'Active' },
  { id: 2, name: 'Professional', revenue: '$32,500', users: 85, status: 'Active' },
  { id: 3, name: 'Starter', revenue: '$12,800', users: 210, status: 'Active' },
  { id: 4, name: 'Trial', revenue: '$0', users: 45, status: 'Pending' },
  { id: 5, name: 'Legacy', revenue: '$8,200', users: 32, status: 'Inactive' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'users', label: 'Users' },
  { id: 'products', label: 'Products' },
];

export const DataDashboardExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = TABLE_DATA.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Sales Dashboard</h1>
          <Chip label="Q4 2025" />
        </div>
        <div style={styles.headerRight}>
          <Button variant="secondary" icon="download">
            Export
          </Button>
          <Button variant="primary" icon="plus">
            Create Answer
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Metrics Grid */}
      <div style={styles.metricsGrid}>
        {METRICS.map((metric, index) => (
          <div key={index} style={styles.metricCard}>
            <span style={styles.metricLabel}>{metric.label}</span>
            <div style={styles.metricValue}>
              <span style={styles.metricNumber}>{metric.value}</span>
              <span style={{
                ...styles.metricChange,
                color: metric.trend === 'up' ? brandColors.green[60] : brandColors.red[60],
              }}>
                {metric.change}
                <Icon
                  name={metric.trend === 'up' ? 'arrow-up' : 'arrow-down'}
                  size="s"
                />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table Section */}
      <div style={styles.tableSection}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>Plans breakdown</h2>
          <div style={styles.tableActions}>
            <SearchInput
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '240px' }}
            />
            <Button variant="tertiary" icon="filter">
              Filter
            </Button>
          </div>
        </div>

        <div style={styles.table}>
          <div style={styles.tableHeaderRow}>
            <div style={{ ...styles.tableCell, flex: 2 }}>Plan name</div>
            <div style={styles.tableCell}>Revenue</div>
            <div style={styles.tableCell}>Users</div>
            <div style={styles.tableCell}>Status</div>
            <div style={{ ...styles.tableCell, width: '60px' }}></div>
          </div>
          {filteredData.map((row) => (
            <div key={row.id} style={styles.tableRow}>
              <div style={{ ...styles.tableCell, flex: 2, fontWeight: 500 }}>
                {row.name}
              </div>
              <div style={styles.tableCell}>{row.revenue}</div>
              <div style={styles.tableCell}>{row.users}</div>
              <div style={styles.tableCell}>
                <Chip
                  label={row.status}
                  variant={
                    row.status === 'Active' ? 'success' :
                    row.status === 'Pending' ? 'warning' : 'default'
                  }
                />
              </div>
              <div style={{ ...styles.tableCell, width: '60px' }}>
                <Button variant="tertiary" size="small" icon="more" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '32px',
    backgroundColor: brandColors.gray[10],
    minHeight: '100vh',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerRight: {
    display: 'flex',
    gap: '12px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginTop: '24px',
    marginBottom: '32px',
  },
  metricCard: {
    backgroundColor: brandColors.white,
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  metricLabel: {
    fontSize: '13px',
    color: brandColors.gray[60],
    display: 'block',
    marginBottom: '8px',
  },
  metricValue: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  metricNumber: {
    fontSize: '28px',
    fontWeight: 600,
    color: brandColors.gray[90],
  },
  metricChange: {
    fontSize: '14px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  tableSection: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  tableTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  tableActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  table: {
    width: '100%',
  },
  tableHeaderRow: {
    display: 'flex',
    padding: '12px 24px',
    backgroundColor: brandColors.gray[10],
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    display: 'flex',
    padding: '16px 24px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    alignItems: 'center',
    transition: 'background-color 150ms ease',
  },
  tableCell: {
    flex: 1,
    fontSize: '14px',
    color: brandColors.gray[90],
  },
};

export default DataDashboardExample;
