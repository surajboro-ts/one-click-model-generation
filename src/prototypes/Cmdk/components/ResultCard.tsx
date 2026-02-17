/**
 * ResultCard - Default Figma Spec Variant
 * 
 * Exact match to Figma design specifications:
 * - Padding: 16px horizontal, 8px vertical
 * - Icon: 14px
 * - Gap: 12px between icon and text, 8px between text lines
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

export const ResultCard: React.FC<ResultCardProps> = ({
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
      {/* Icon */}
      <div style={styles.iconContainer}>
        <Icon name={item.icon} size="s" />
      </div>

      {/* Text content */}
      <div style={styles.textContent}>
        <div style={styles.topRow}>
          <span style={styles.label}>
            {highlightMatch(item.label, query)}
          </span>
          {item.context && (
            <span style={styles.context}>
              {item.context}
            </span>
          )}
        </div>
        {item.description && (
          <div style={styles.bottomRow}>
            <span style={styles.description}>
              {item.description}
            </span>
            {item.author && (
              <span style={styles.author}>
                by {item.author}
              </span>
            )}
          </div>
        )}
      </div>

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
    padding: `${spacing.B}px ${spacing.D}px`, // 8px 16px
    gap: `${spacing.C}px`, // 12px
    cursor: 'pointer',
    borderRadius: 4,
    margin: `0 ${spacing.D}px`, // 16px horizontal margin for hover effect
    transition: 'background-color 0.1s ease',
  },
  selected: {
    backgroundColor: systemColors.light['background-sunken'], // #F6F8FA
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    color: systemColors.light['content-tertiary'], // #A5ACB9
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
    fontWeight: 375, // Plain Light
    lineHeight: '20px',
    color: systemColors.light['content-primary'], // #1D232F
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  context: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'], // #777E8B
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-tertiary'], // #A5ACB9
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  author: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-tertiary'], // #A5ACB9
    whiteSpace: 'nowrap',
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'], // #777E8B
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
};

export default ResultCard;
