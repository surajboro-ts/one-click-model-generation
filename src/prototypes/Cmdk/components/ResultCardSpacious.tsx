/**
 * ResultCardSpacious - Spacious Variant
 * 
 * Single line with icon background:
 * - Padding: 16px horizontal, 10px vertical
 * - Icon: 16px with gray background
 * - No description shown
 */

import React from 'react';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import type { ResultCardProps } from '../types';

/**
 * Highlight matching text in a string
 */
function highlightMatch(text: string, query?: string): React.ReactNode {
  if (!query || query.length === 0) return text;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  
  if (index === -1) return text;
  
  return (
    <>
      {text.slice(0, index)}
      <span style={{ backgroundColor: systemColors.light['background-warning'], borderRadius: 2 }}>
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  );
}

export const ResultCardSpacious: React.FC<ResultCardProps> = ({
  item,
  isSelected,
  onClick,
  query,
}) => {
  return (
    <div
      style={{
        ...styles.container,
        ...(isSelected ? styles.selected : {}),
      }}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
    >
      {/* Icon with background */}
      <div style={styles.iconContainer}>
        <Icon name={item.icon} size="s" />
      </div>

      {/* Label */}
      <div style={styles.label}>
        {highlightMatch(item.label, query)}
      </div>

      {/* Context */}
      {item.context && (
        <div style={styles.context}>
          {highlightMatch(item.context, query)}
        </div>
      )}

      {/* Right label */}
      <div style={styles.rightLabel}>
        {item.rightLabel}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: `10px ${spacing.D}px`, // 10px 16px - spacious
    gap: `${spacing.C}px`, // 12px
    cursor: 'pointer',
    borderRadius: 4,
    margin: `0 ${spacing.D}px`,
    transition: 'background-color 0.1s ease',
  },
  selected: {
    backgroundColor: systemColors.light['background-sunken'],
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: 6,
    color: systemColors.light['content-secondary'],
    flexShrink: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: 375,
    lineHeight: '20px',
    color: systemColors.light['content-primary'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    minWidth: 0,
  },
  context: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 150,
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
};

export default ResultCardSpacious;
