/**
 * FilterOptions - Filter Selection List
 * 
 * Shown when "/" is typed, displays available filter options.
 * Supports keyboard navigation and context-aware ranking.
 */

import React from 'react';
import { Icon } from '../../../components/icons';
import { brandColors } from '../../../tokens/colors/brand';
import { spacing } from '../../../tokens/spacing';
import type { FilterOption } from '../types';

interface FilterOptionsProps {
  /** Available filter options (ranked by context) */
  options: FilterOption[];
  /** Currently selected index */
  selectedIndex: number;
  /** Handler when a filter is selected */
  onSelect: (filter: FilterOption) => void;
  /** Current search query after "/" */
  query?: string;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  options,
  selectedIndex,
  onSelect,
  query,
}) => {
  // Filter options by query if present
  const filteredOptions = query
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  if (filteredOptions.length === 0) {
    return (
      <div style={styles.emptyState}>
        <span style={styles.emptyText}>No matching filters</span>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerText}>Filter by type</span>
      </div>
      <div style={styles.list} role="listbox">
        {filteredOptions.map((option, index) => (
          <div
            key={option.id}
            style={{
              ...styles.item,
              ...(index === selectedIndex ? styles.itemSelected : {}),
            }}
            onClick={() => onSelect(option)}
            role="option"
            aria-selected={index === selectedIndex}
          >
            <div style={styles.iconContainer}>
              <Icon name={option.icon} size="s" />
            </div>
            <span style={styles.label}>{option.label}</span>
            <span style={styles.rightLabel}>{option.rightLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: `${spacing.B}px 0`, // 8px vertical
  },
  header: {
    padding: `${spacing.D}px ${spacing.D}px ${spacing.B}px`, // 16px 16px 8px
  },
  headerText: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: brandColors.gray[60], // #777E8B
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`, // 12px
    padding: `${spacing.B}px ${spacing.D}px`, // 8px 16px
    cursor: 'pointer',
    margin: `0 ${spacing.D}px`, // 16px horizontal margin
    borderRadius: 4,
    transition: 'background-color 0.1s ease',
  },
  itemSelected: {
    backgroundColor: brandColors.gray[10], // #F6F8FA
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    color: brandColors.gray[50], // #A5ACB9
    flexShrink: 0,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: 375,
    lineHeight: '20px',
    color: brandColors.gray[90], // #1D232F
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: brandColors.gray[60], // #777E8B
    flexShrink: 0,
  },
  emptyState: {
    padding: `${spacing.H}px ${spacing.D}px`, // 32px 16px
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: brandColors.gray[50],
  },
};

export default FilterOptions;
