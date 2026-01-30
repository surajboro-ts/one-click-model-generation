import React from 'react';
import { colors } from '../styles';

interface AreaChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  showLine?: boolean;
  showArea?: boolean;
  showDots?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AreaChart Component
 * 
 * SVG-based mini area/line chart for trend visualization.
 * Used in KPI cards to show metric trends over time.
 */
export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width = 200,
  height = 60,
  color = colors.chartBlue,
  fillColor: _fillColor, // Reserved for custom fill color support
  showLine = true,
  showArea = true,
  showDots = false,
  style,
}) => {
  void _fillColor; // Suppress unused variable warning
  if (!data || data.length === 0) return null;

  const padding = { top: 5, right: 5, bottom: 5, left: 5 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const valueRange = maxValue - minValue || 1;

  // Calculate points
  const points = data.map((value, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    return { x, y };
  });

  // Create path for the line
  const linePath = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      
      // Use smooth curves for better appearance
      const prev = points[index - 1];
      const cpx = (prev.x + point.x) / 2;
      return `C ${cpx} ${prev.y}, ${cpx} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(' ');

  // Create path for the area fill
  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${height - padding.bottom}
    L ${points[0].x} ${height - padding.bottom}
    Z
  `;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={style}
    >
      {/* Gradient for area fill */}
      <defs>
        <linearGradient id={`areaGradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      {showArea && (
        <path
          d={areaPath}
          fill={`url(#areaGradient-${color.replace('#', '')})`}
        />
      )}

      {/* Line */}
      {showLine && (
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Dots */}
      {showDots && points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={colors.cardBg}
          stroke={color}
          strokeWidth={2}
        />
      ))}

      {/* End dot (latest value) */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={4}
        fill={colors.cardBg}
        stroke={color}
        strokeWidth={2}
      />
    </svg>
  );
};

export default AreaChart;
