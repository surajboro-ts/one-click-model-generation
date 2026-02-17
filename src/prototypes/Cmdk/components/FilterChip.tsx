/**
 * FilterChip - Active Filter Display
 * 
 * Blue chip showing the currently active filter.
 * Matches Figma Token/Editable blue style:
 * - Background: #f2f7ff (blue/10)
 * - Border: 1px solid #2770ef (blue/60)
 * - Text: #2770ef
 */

import React from 'react';
import { Icon } from '../../../components/icons';
import { systemColors, referenceColors } from '../../../tokens/colors';
import type { FilterOption } from '../types';

interface FilterChipProps {
  /** Active filter option */
  filter: FilterOption;
  /** Handler to clear the filter */
  onClear: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  filter,
  onClear,
}) => {
  return (
    <div style={styles.container}>
      <Icon name={filter.icon} size="xs" />
      <span style={styles.label}>{filter.label}</span>
      <button
        style={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        aria-label={`Remove ${filter.label} filter`}
      >
        <Icon name="cross" size="xs" />
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: 24,
    padding: '0 4px 0 8px',
    backgroundColor: referenceColors.blue['10'], // #F2F7FF
    border: `1px solid ${systemColors.light['content-brand']}`, // #2770EF
    borderRadius: 4,
    color: systemColors.light['content-brand'],
    fontSize: 14,
    fontWeight: 375, // Plain Light
    lineHeight: '20px',
    flexShrink: 0,
  },
  label: {
    color: systemColors.light['content-brand'],
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: systemColors.light['content-brand'],
    borderRadius: 2,
    transition: 'background-color 0.1s ease',
  },
};

export default FilterChip;
