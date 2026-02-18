/**
 * ResultCardTwoLine - Two-Line Variants
 * 
 * Two variants exported:
 * - ResultCardTwoLine16: 16px icon with background
 * - ResultCardTwoLine20: 20px icon with background (larger)
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

/**
 * Two-Line 16px variant
 */
export const ResultCardTwoLine16: React.FC<ResultCardProps> = ({
  item,
  isSelected,
  onClick,
  query,
}) => {
  return (
    <div
      style={{
        ...styles16.container,
        ...(isSelected ? styles16.selected : {}),
      }}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
    >
      {/* Icon with background */}
      <div style={styles16.iconContainer}>
        <Icon name={item.icon} size="s" />
      </div>

      {/* Text content - two lines */}
      <div style={styles16.textContent}>
        <div style={styles16.topRow}>
          <span style={styles16.label}>
            {highlightMatch(item.label, query)}
          </span>
          {item.context && (
            <span style={styles16.context}>
              {highlightMatch(item.context, query)}
            </span>
          )}
        </div>
        {item.description && (
          <div style={styles16.description}>
            {highlightMatch(item.description, query)}
          </div>
        )}
      </div>

      {/* Right label */}
      <div style={styles16.rightLabel}>
        {item.rightLabel}
      </div>
    </div>
  );
};

/**
 * Two-Line 20px variant (larger icon)
 */
export const ResultCardTwoLine20: React.FC<ResultCardProps> = ({
  item,
  isSelected,
  onClick,
  query,
}) => {
  return (
    <div
      style={{
        ...styles20.container,
        ...(isSelected ? styles20.selected : {}),
      }}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
    >
      {/* Larger icon with background */}
      <div style={styles20.iconContainer}>
        <Icon name={item.icon} size="m" />
      </div>

      {/* Text content - two lines */}
      <div style={styles20.textContent}>
        <div style={styles20.topRow}>
          <span style={styles20.label}>
            {highlightMatch(item.label, query)}
          </span>
          {item.context && (
            <span style={styles20.context}>
              {highlightMatch(item.context, query)}
            </span>
          )}
        </div>
        {item.description && (
          <div style={styles20.description}>
            {highlightMatch(item.description, query)}
          </div>
        )}
      </div>

      {/* Right label */}
      <div style={styles20.rightLabel}>
        {item.rightLabel}
      </div>
    </div>
  );
};

// Styles for 16px variant
const styles16: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: `10px ${spacing.D}px`, // 10px 16px
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
    marginTop: 2,
  },
  textContent: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
  },
  label: {
    fontSize: 14,
    fontWeight: 375,
    lineHeight: '20px',
    color: systemColors.light['content-primary'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-tertiary'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
    whiteSpace: 'nowrap',
    flexShrink: 0,
    marginTop: 2,
  },
};

// Styles for 20px variant
const styles20: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: `12px ${spacing.D}px`, // 12px 16px - larger
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
    width: 36,
    height: 36,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: 8,
    color: systemColors.light['content-secondary'],
    flexShrink: 0,
  },
  textContent: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    color: systemColors.light['content-primary'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-tertiary'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
    whiteSpace: 'nowrap',
    flexShrink: 0,
    marginTop: 6,
  },
};

export default ResultCardTwoLine16;
