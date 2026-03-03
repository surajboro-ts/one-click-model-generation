import React from 'react';
import { colors } from '../styles';

interface JoinConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  selected?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export const JoinConnector: React.FC<JoinConnectorProps> = ({
  x1, y1, x2, y2, selected, onClick, animate,
}) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const strokeColor = selected ? colors.borderBrand : colors.borderDefault;

  const d =
    Math.abs(y1 - y2) < 20
      ? `M${x1},${y1} L${x2},${y2}`
      : `M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`;

  return (
    <g
      style={{ cursor: 'pointer', ...(animate ? { animation: 'spotterFadeIn 0.5s ease-out forwards' } : {}) }}
      onClick={onClick}
    >
      <path
        d={d}
        stroke={strokeColor}
        strokeWidth={selected ? 2 : 1.5}
        fill="none"
      />
      {/* Join icon at midpoint */}
      <g transform={`translate(${midX - 16}, ${midY - 9})`}>
        <rect width="32" height="18" rx="4" fill={selected ? colors.bgGhostHighlight : colors.bg} stroke={strokeColor} strokeWidth="1" />
        {/* Inner join icon */}
        <circle cx="12" cy="9" r="4" fill="none" stroke={strokeColor} strokeWidth="1" />
        <circle cx="20" cy="9" r="4" fill="none" stroke={strokeColor} strokeWidth="1" />
        {/* Intersection fill */}
        <path
          d="M15,5.8 A4,4,0,0,1,15,12.2 A4,4,0,0,1,15,5.8 Z"
          fill={strokeColor}
          opacity={0.3}
        />
      </g>
    </g>
  );
};
