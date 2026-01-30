import React from 'react';
import { colors } from '../styles';

interface USMapChartProps {
  highlightedStates?: string[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * USMapChart Component
 * 
 * Simplified SVG representation of the US map with state highlighting.
 * Used for regional data visualization in the North America opportunities section.
 */
export const USMapChart: React.FC<USMapChartProps> = ({
  highlightedStates = [],
  width = 200,
  height = 120,
  style,
}) => {
  // Simplified US map outline with major regions
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 120"
      style={style}
    >
      {/* US Map - Simplified continental outline */}
      <g fill={colors.chartBlueLight} stroke={colors.accent} strokeWidth={0.5}>
        {/* Pacific Northwest */}
        <path d="M10,20 L35,15 L40,25 L45,20 L50,30 L35,35 L15,30 Z" />
        
        {/* California */}
        <path 
          d="M15,30 L35,35 L30,55 L25,65 L15,60 L10,45 Z"
          fill={highlightedStates.includes('California') ? colors.chartBlue : colors.chartBlueLight}
        />
        
        {/* Mountain states */}
        <path d="M35,35 L60,30 L70,45 L55,55 L40,50 L35,40 Z" />
        
        {/* Southwest */}
        <path 
          d="M40,55 L55,55 L65,70 L50,80 L35,75 L30,65 Z"
          fill={highlightedStates.includes('Arizona') ? colors.chartBlue : colors.chartBlueLight}
        />
        
        {/* Texas */}
        <path 
          d="M65,65 L85,55 L100,65 L95,90 L75,95 L60,85 L65,70 Z"
          fill={highlightedStates.includes('Texas') ? colors.chartBlue : colors.chartBlueLight}
        />
        
        {/* Midwest North */}
        <path d="M70,30 L100,25 L120,30 L115,45 L90,50 L75,45 Z" />
        
        {/* Great Lakes */}
        <path d="M120,25 L145,20 L155,35 L140,45 L120,40 Z" />
        
        {/* Northeast */}
        <path 
          d="M155,25 L175,20 L185,30 L180,45 L165,50 L155,40 Z"
          fill={highlightedStates.includes('New York') ? colors.chartBlue : colors.chartBlueLight}
        />
        
        {/* Mid-Atlantic */}
        <path d="M160,50 L180,45 L185,60 L175,70 L160,65 Z" />
        
        {/* Southeast */}
        <path d="M140,55 L160,50 L165,70 L155,85 L135,80 L130,65 Z" />
        
        {/* Florida */}
        <path d="M150,80 L160,85 L165,100 L155,105 L145,95 Z" />
        
        {/* Central states */}
        <path d="M90,50 L115,45 L120,60 L110,70 L95,65 L85,55 Z" />
        
        {/* Washington marker */}
        {highlightedStates.includes('Washington') && (
          <circle cx="30" cy="22" r="6" fill={colors.chartBlue} />
        )}
      </g>

      {/* Map points for highlighted states */}
      {highlightedStates.includes('California') && (
        <circle cx="22" cy="50" r="4" fill={colors.accent} />
      )}
      {highlightedStates.includes('Texas') && (
        <circle cx="80" cy="75" r="4" fill={colors.accent} />
      )}
      {highlightedStates.includes('Arizona') && (
        <circle cx="45" cy="65" r="4" fill={colors.accent} />
      )}
      {highlightedStates.includes('New York') && (
        <circle cx="170" cy="35" r="4" fill={colors.accent} />
      )}
      {highlightedStates.includes('Washington') && (
        <circle cx="30" cy="22" r="4" fill={colors.accent} />
      )}

      {/* Connecting lines to show data flow */}
      <g stroke={colors.chartBlue} strokeWidth={1} strokeDasharray="2,2" opacity={0.5}>
        <path d="M22,50 Q100,40 170,35" fill="none" />
        <path d="M80,75 Q120,60 170,35" fill="none" />
      </g>
    </svg>
  );
};

export default USMapChart;
