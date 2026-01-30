import React from 'react';
import { Icon } from '../../../components/icons';
import { AreaChart } from './AreaChart';
import { colors, spacing, typography, shadows, borderRadius } from '../styles';

// Types for different card variants
interface BaseCardProps {
  className?: string;
  style?: React.CSSProperties;
}

interface HighlightCardProps extends BaseCardProps {
  variant: 'highlight';
  title: string;
  message: string;
  highlight: string;
  suffix?: string;
  subTitle?: string;
  items?: string[];
}

interface ChartCardProps extends BaseCardProps {
  variant: 'chart';
  label: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
  comparison: string;
  chartData: number[];
  chartColor?: string;
}

interface DualMetricCardProps extends BaseCardProps {
  variant: 'dual-metric';
  title: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

type KPICardProps = HighlightCardProps | ChartCardProps | DualMetricCardProps;

/**
 * KPICard Component
 * 
 * Multi-variant KPI card component for displaying metrics.
 * 
 * Variants:
 * - highlight: Dark blue card with message and bullet list
 * - chart: Metric with trend indicator and mini area chart
 * - dual-metric: Two-column layout with multiple metrics
 */
export const KPICard: React.FC<KPICardProps> = (props) => {
  switch (props.variant) {
    case 'highlight':
      return <HighlightCard {...props} />;
    case 'chart':
      return <ChartCard {...props} />;
    case 'dual-metric':
      return <DualMetricCard {...props} />;
    default:
      return null;
  }
};

// Highlight Card (dark blue with bullet list)
const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  message,
  highlight,
  suffix,
  subTitle,
  items,
  style,
}) => {
  return (
    <div style={{ ...styles.highlightCard, ...style }}>
      <h3 style={styles.highlightTitle}>{title}</h3>
      <p style={styles.highlightMessage}>
        {message} <span style={styles.highlightValue}>{highlight}</span> {suffix}
      </p>
      {subTitle && (
        <>
          <p style={styles.highlightSubTitle}>{subTitle}</p>
          {items && (
            <ul style={styles.highlightList}>
              {items.map((item, index) => (
                <li key={index} style={styles.highlightListItem}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

// Chart Card (metric + trend + area chart)
const ChartCard: React.FC<ChartCardProps> = ({
  label,
  value,
  trend,
  trendValue,
  comparison,
  chartData,
  chartColor,
  style,
}) => {
  const trendColor = trend === 'up' ? colors.positive : colors.negative;
  const lineColor = chartColor || (trend === 'up' ? colors.positive : colors.chartBlue);

  return (
    <div style={{ ...styles.chartCard, ...style }}>
      <span style={styles.chartLabel}>{label}</span>
      <div style={styles.chartValue}>{value}</div>
      <div style={styles.trendRow}>
        <span style={{ ...styles.trendValue, color: trendColor }}>
          <Icon
            name={trend === 'up' ? 'arrow-up' : 'arrow-down'}
            size="xs"
            color={trendColor}
          />
          {trendValue}
        </span>
        <span style={styles.comparison}>{comparison}</span>
      </div>
      <div style={styles.chartContainer}>
        <AreaChart
          data={chartData}
          width={180}
          height={50}
          color={lineColor}
        />
        <span style={styles.chartFooter}>As expected</span>
      </div>
      <a href="#" style={styles.analyzeLink}>
        Analyze <Icon name="arrow-right" size="xs" color={colors.accent} />
      </a>
    </div>
  );
};

// Dual Metric Card (two columns)
const DualMetricCard: React.FC<DualMetricCardProps> = ({
  title,
  metrics,
  style,
}) => {
  return (
    <div style={{ ...styles.dualMetricCard, ...style }}>
      <h3 style={styles.dualMetricTitle}>{title}</h3>
      <div style={styles.metricsRow}>
        {metrics.map((metric, index) => (
          <div key={index} style={styles.metricColumn}>
            <span style={styles.metricLabel}>{metric.label}</span>
            <span style={styles.metricValue}>{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  // Highlight Card styles
  highlightCard: {
    backgroundColor: colors.highlightBg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    fontFamily: typography.fontFamily,
    minHeight: 180,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textOnDark,
    margin: 0,
    marginBottom: spacing.md,
  },
  highlightMessage: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.textOnDark,
    margin: 0,
    marginBottom: spacing.lg,
    lineHeight: 1.5,
  },
  highlightValue: {
    color: colors.positive,
    fontWeight: 600,
  },
  highlightSubTitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    margin: 0,
    marginBottom: spacing.sm,
  },
  highlightList: {
    margin: 0,
    paddingLeft: spacing.lg,
  },
  highlightListItem: {
    fontSize: 13,
    color: colors.textOnDark,
    marginBottom: spacing.xs,
  },

  // Chart Card styles
  chartCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: shadows.card,
    fontFamily: typography.fontFamily,
    minHeight: 180,
    display: 'flex',
    flexDirection: 'column',
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  chartValue: {
    fontSize: 28,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  trendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  trendValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    fontSize: 13,
    fontWeight: 500,
  },
  comparison: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chartContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  chartFooter: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  analyzeLink: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: 13,
    fontWeight: 500,
    color: colors.accent,
    textDecoration: 'none',
    marginTop: 'auto',
  },

  // Dual Metric Card styles
  dualMetricCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: shadows.card,
    fontFamily: typography.fontFamily,
  },
  dualMetricTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing.lg,
  },
  metricsRow: {
    display: 'flex',
    gap: spacing.xl,
  },
  metricColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.textPrimary,
  },
};

export default KPICard;
