import React from 'react';
import { colors, spacing, typography } from '../styles';

interface BarSegment {
  label: string;
  value: number;
  color: string;
}

interface BarData {
  quarter: string;
  segments: BarSegment[];
}

interface StackedBarChartProps {
  title: string;
  yAxisLabel?: string;
  data: BarData[];
  maxValue: number;
  width?: number;
  height?: number;
  showLegend?: boolean;
  style?: React.CSSProperties;
}

/**
 * StackedBarChart Component
 * 
 * SVG-based stacked bar chart for comparing categorical data.
 * Used for TSE ACV by Forecast Category visualization.
 */
export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  title,
  yAxisLabel,
  data,
  maxValue,
  width = 200,
  height = 180,
  showLegend = true,
  style,
}) => {
  const padding = { top: 10, right: 10, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const barWidth = chartWidth / data.length * 0.6;
  const barGap = chartWidth / data.length * 0.4;

  // Y-axis ticks
  const yTicks = [0, maxValue / 3, (maxValue * 2) / 3, maxValue];

  // Get unique segment labels for legend
  const legendItems = data[0]?.segments || [];

  return (
    <div style={{ ...styles.container, ...style }}>
      <h4 style={styles.title}>{title}</h4>
      
      <div style={styles.chartContainer}>
        {/* Y-axis label */}
        {yAxisLabel && (
          <div style={styles.yAxisLabel}>
            <span style={styles.yAxisLabelText}>{yAxisLabel}</span>
          </div>
        )}

        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Y-axis grid lines and labels */}
          {yTicks.map((tick, index) => {
            const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
            return (
              <g key={index}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={colors.border}
                  strokeDasharray="3,3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={10}
                  fill={colors.textSecondary}
                >
                  {tick}M
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((bar, barIndex) => {
            const x = padding.left + barIndex * (barWidth + barGap) + barGap / 2;
            let currentY = padding.top + chartHeight;

            return (
              <g key={barIndex}>
                {bar.segments.map((segment, segmentIndex) => {
                  const segmentHeight = (segment.value / maxValue) * chartHeight;
                  currentY -= segmentHeight;

                  return (
                    <rect
                      key={segmentIndex}
                      x={x}
                      y={currentY}
                      width={barWidth}
                      height={segmentHeight}
                      fill={segment.color}
                      rx={segmentIndex === bar.segments.length - 1 ? 3 : 0}
                    />
                  );
                })}

                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize={11}
                  fill={colors.textSecondary}
                >
                  {bar.quarter}
                </text>
              </g>
            );
          })}

          {/* Y-axis line */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke={colors.border}
          />

          {/* X-axis line */}
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={width - padding.right}
            y2={padding.top + chartHeight}
            stroke={colors.border}
          />
        </svg>
      </div>

      {/* Legend */}
      {showLegend && legendItems.length > 0 && (
        <div style={styles.legend}>
          {legendItems.map((item, index) => (
            <div key={index} style={styles.legendItem}>
              <span
                style={{
                  ...styles.legendDot,
                  backgroundColor: item.color,
                }}
              />
              <span style={styles.legendLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: typography.fontFamily,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing.md,
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },
  yAxisLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    marginRight: spacing.xs,
  },
  yAxisLabelText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  legend: {
    display: 'flex',
    gap: spacing.md,
    marginTop: spacing.md,
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: 11,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    flexShrink: 0,
  },
  legendLabel: {
    color: colors.textSecondary,
  },
};

export default StackedBarChart;
