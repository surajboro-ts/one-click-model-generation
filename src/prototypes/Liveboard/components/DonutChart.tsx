import React from 'react';
import { colors, spacing, typography } from '../styles';

interface DonutChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  data: DonutChartData[];
  size?: number;
  thickness?: number;
  showLegend?: boolean;
  centerLabel?: string;
  style?: React.CSSProperties;
}

/**
 * DonutChart Component
 * 
 * SVG-based donut/pie chart for displaying proportional data.
 * Used for pipeline breakdown and distribution visualizations.
 */
export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  data,
  size = 160,
  thickness = 40,
  showLegend = true,
  centerLabel,
  style,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const center = size / 2;

  // Calculate arc paths
  let currentAngle = -90; // Start from top

  const arcs = data.map((item) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    // Convert angles to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate arc points
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    // Create donut segment path
    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');

    return {
      ...item,
      percentage,
      path,
    };
  });

  return (
    <div style={{ ...styles.container, ...style }}>
      <h4 style={styles.title}>{title}</h4>
      
      <div style={styles.chartWrapper}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {arcs.map((arc, index) => (
            <path
              key={index}
              d={arc.path}
              fill={arc.color}
              stroke={colors.cardBg}
              strokeWidth={2}
            />
          ))}
          
          {/* Center circle */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 4}
            fill={colors.cardBg}
          />
        </svg>

        {/* Center label */}
        {centerLabel && (
          <div style={styles.centerLabel}>
            <span style={styles.centerText}>{centerLabel}</span>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div style={styles.legend}>
          {data.map((item, index) => (
            <div key={index} style={styles.legendItem}>
              <span
                style={{
                  ...styles.legendDot,
                  backgroundColor: item.color,
                }}
              />
              <span style={styles.legendLabel}>{item.label}</span>
              {item.value > 0 && (
                <span style={styles.legendValue}>
                  US${item.value}M, ({((item.value / total) * 100).toFixed(2)}%)
                </span>
              )}
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
  chartWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  centerLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  centerText: {
    fontSize: 11,
    color: colors.textSecondary,
    whiteSpace: 'pre-line',
  },
  legend: {
    marginTop: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: 12,
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
  legendValue: {
    color: colors.textPrimary,
    fontWeight: 500,
    marginLeft: 'auto',
  },
};

export default DonutChart;
