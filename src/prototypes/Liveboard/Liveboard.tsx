import React, { useState } from 'react';
import { Table } from '../../components/Table';
import {
  Header,
  FilterBar,
  KPICard,
  DonutChart,
  StackedBarChart,
  USMapChart,
  StylingPanel,
} from './components';
import type { StylingSettings } from './components';
import { colors, spacing, typography, shadows, borderRadius } from './styles';
import {
  weeklyUpdate,
  cfyMetric,
  currentQuarterMetric,
  tsePipeline,
  tseCommitPipeline,
  pipelineByType,
  acvByForecast,
  updateInfo,
  northAmericaOpportunities,
} from './data/mockData';

/**
 * Liveboard - TSE Business Overview Dashboard
 * 
 * A comprehensive business analytics dashboard showcasing:
 * - KPI metric cards with trend indicators
 * - Area, donut, and bar chart visualizations
 * - US map with regional data
 * - Filter bar with multiple selectors
 * 
 * Built using Radiant design system components.
 */
export const Liveboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [filters, setFilters] = useState({
    view: 'default',
    region: 'north-america',
    opportunityScore: '0.4',
    year: '2025',
    quarter: 'Q1',
  });

  // Styling panel state
  const [isStylingPanelOpen, setIsStylingPanelOpen] = useState(false);
  const [stylingSettings, setStylingSettings] = useState<StylingSettings>({
    colorEnabled: false,
    density: 'comfortable',
    cornerRadius: 'rounded',
    spacing: 'normal',
    groupTitle: true,
    groupDescription: true,
    tilesDescription: false,
    tileDescription: false,
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleStylingPanelToggle = () => {
    setIsStylingPanelOpen((prev) => !prev);
  };

  const handleStylingPanelClose = () => {
    setIsStylingPanelOpen(false);
  };

  const handleStylingPanelSave = () => {
    // Save styling settings (could persist to localStorage or API)
    console.log('Saving styling settings:', stylingSettings);
    setIsStylingPanelOpen(false);
  };

  // Table columns for North America opportunities
  const tableColumns = [
    { key: 'state', label: 'Top 5', width: '100px' },
    { key: 'Q1', label: 'Q1', align: 'right' as const },
    { key: 'Q2', label: 'Q2', align: 'right' as const },
    { key: 'Q3', label: 'Q3', align: 'right' as const },
    { key: 'Q4', label: 'Q3', align: 'right' as const },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onStylingClick={handleStylingPanelToggle}
      />

      {/* Filter Bar */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <main style={styles.main}>
        {/* KPI Cards Row */}
        <div style={styles.kpiRow}>
          {/* Weekly Update - Highlight Card */}
          <KPICard
            variant="highlight"
            title={weeklyUpdate.title}
            message={weeklyUpdate.message}
            highlight={weeklyUpdate.highlight}
            suffix={weeklyUpdate.suffix}
            subTitle={weeklyUpdate.subTitle}
            items={weeklyUpdate.deals}
            style={{ flex: 1 }}
          />

          {/* CFY - Chart Card */}
          <KPICard
            variant="chart"
            label={cfyMetric.label}
            value={cfyMetric.value}
            trend={cfyMetric.trend}
            trendValue={cfyMetric.trendValue}
            comparison={cfyMetric.comparison}
            chartData={cfyMetric.chartData}
            style={{ flex: 1 }}
          />

          {/* Current Quarter - Chart Card */}
          <KPICard
            variant="chart"
            label={currentQuarterMetric.label}
            value={currentQuarterMetric.value}
            trend={currentQuarterMetric.trend}
            trendValue={currentQuarterMetric.trendValue}
            comparison={currentQuarterMetric.comparison}
            chartData={currentQuarterMetric.chartData}
            style={{ flex: 1 }}
          />

          {/* Pipeline Cards Column */}
          <div style={styles.pipelineColumn}>
            <KPICard
              variant="dual-metric"
              title={tsePipeline.title}
              metrics={tsePipeline.metrics}
            />
            <KPICard
              variant="dual-metric"
              title={tseCommitPipeline.title}
              metrics={tseCommitPipeline.metrics}
            />
          </div>
        </div>

        {/* Charts Row */}
        <div style={styles.chartsRow}>
          {/* Cluster Pricing Type Panel */}
          <div style={styles.clusterPanel}>
            <h2 style={styles.panelTitle}>Cluster Pricing Type</h2>
            
            <div style={styles.clusterContent}>
              {/* Donut Chart */}
              <div style={styles.donutSection}>
                <DonutChart
                  title={pipelineByType.title}
                  data={pipelineByType.data}
                  size={150}
                  thickness={35}
                  centerLabel={pipelineByType.centerLabel}
                />
              </div>

              {/* Stacked Bar Chart */}
              <div style={styles.barSection}>
                <StackedBarChart
                  title={acvByForecast.title}
                  yAxisLabel={acvByForecast.yAxisLabel}
                  data={acvByForecast.data}
                  maxValue={acvByForecast.maxValue}
                  width={180}
                  height={160}
                />
              </div>

              {/* Update Section */}
              <div style={styles.updateSection}>
                <h4 style={styles.updateTitle}>Update</h4>
                <span style={styles.updateDate}>{updateInfo.date}</span>
                <ul style={styles.updateList}>
                  {updateInfo.items.map((item, index) => (
                    <li key={index} style={styles.updateItem}>
                      {item.text}
                      {item.highlight && (
                        <span style={styles.updateHighlight}> {item.highlight}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* North America Opportunities Panel */}
          <div style={styles.opportunitiesPanel}>
            <h2 style={styles.panelTitle}>{northAmericaOpportunities.title}</h2>
            
            <div style={styles.opportunitiesContent}>
              <div style={styles.projectedGrowth}>
                <span style={styles.projectedLabel}>
                  {northAmericaOpportunities.projectedGrowth.label}
                </span>
                <span style={styles.projectedValue}>
                  {northAmericaOpportunities.projectedGrowth.value}
                </span>
              </div>

              <USMapChart
                highlightedStates={northAmericaOpportunities.highlightedStates}
                width={160}
                height={100}
              />
            </div>

            {/* Data Table */}
            <div style={styles.tableContainer}>
              <Table
                columns={tableColumns}
                data={northAmericaOpportunities.stateData}
                rowKey="state"
                compact
                hoverable
              />
            </div>
          </div>
        </div>
      </main>

      {/* Styling Panel */}
      <StylingPanel
        isOpen={isStylingPanelOpen}
        onClose={handleStylingPanelClose}
        onSave={handleStylingPanelSave}
        settings={stylingSettings}
        onSettingsChange={setStylingSettings}
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: colors.pageBg,
    fontFamily: typography.fontFamily,
  },
  main: {
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  
  // KPI Cards Row
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: spacing.lg,
  },
  pipelineColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },

  // Charts Row
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: spacing.lg,
  },

  // Cluster Pricing Type Panel
  clusterPanel: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: shadows.card,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing.lg,
  },
  clusterContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: spacing.xl,
  },
  donutSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  barSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  updateSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing.xs,
  },
  updateDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  updateList: {
    margin: 0,
    paddingLeft: spacing.lg,
  },
  updateItem: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 1.5,
  },
  updateHighlight: {
    color: colors.accent,
    fontWeight: 500,
  },

  // North America Opportunities Panel
  opportunitiesPanel: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: shadows.card,
  },
  opportunitiesContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  projectedGrowth: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  projectedLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  projectedValue: {
    fontSize: 24,
    fontWeight: 600,
    color: colors.positive,
  },
  tableContainer: {
    marginTop: spacing.md,
  },
};

export default Liveboard;
