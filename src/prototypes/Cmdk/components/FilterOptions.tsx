/**
 * FilterOptions - Filter Selection List
 * 
 * Shown when "/" is typed, displays available filter options.
 * Supports keyboard navigation and context-aware ranking.
 */

import React from 'react';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
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
        <span style={styles.headerText}>Filter by</span>
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
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: `${spacing.B}px ${spacing.C}px`, // 8px 12px
  },
  headerText: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'], // #777E8B
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
    borderRadius: 4,
    transition: 'background-color 0.1s ease',
    position: 'relative' as const,
  },
  itemSelected: {
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
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: 375,
    lineHeight: '20px',
    color: systemColors.light['content-primary'], // #1D232F
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'], // #777E8B
    flexShrink: 0,
  },
  emptyState: {
    padding: `${spacing.H}px ${spacing.D}px`, // 32px 16px
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: systemColors.light['content-tertiary'],
  },
};

export default FilterOptions;
