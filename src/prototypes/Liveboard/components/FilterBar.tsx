import React from 'react';
import { Icon } from '../../../components/icons';
import { Chip } from '../../../components/Chip';
import { colors, spacing, typography } from '../styles';
import { filterOptions } from '../data/mockData';

interface FilterState {
  view: string;
  region: string;
  opportunityScore: string;
  year: string;
  quarter: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

/**
 * FilterBar Component
 * 
 * Row of filter dropdowns and chips for filtering dashboard data.
 * Based on the Figma design filter bar.
 */
export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div style={styles.container}>
      <div style={styles.filtersRow}>
        {/* Select View dropdown */}
        <FilterDropdown
          label="Select view"
          value={filters.view}
          options={filterOptions.views}
          onChange={(value) => onFilterChange('view', value)}
          showChevron
        />

        {/* Filter chip */}
        <Chip
          type="filter"
          label="Temp TSE Filter"
          filterValue="true"
          deletable
          showChevron={false}
        />

        {/* Region dropdown */}
        <FilterDropdown
          label="Region:"
          value={filters.region}
          options={filterOptions.regions}
          onChange={(value) => onFilterChange('region', value)}
          displayValue={filterOptions.regions.find(r => r.id === filters.region)?.label}
        />

        {/* Opportunity Score dropdown */}
        <FilterDropdown
          label="Opportunity Score Cutoff"
          value={filters.opportunityScore}
          options={filterOptions.opportunityScores}
          onChange={(value) => onFilterChange('opportunityScore', value)}
          displayValue={filters.opportunityScore}
        />

        {/* Year dropdown */}
        <FilterDropdown
          label="Year"
          value={filters.year}
          options={filterOptions.years}
          onChange={(value) => onFilterChange('year', value)}
          displayValue={filters.year}
        />

        {/* Quarter dropdown */}
        <FilterDropdown
          label="Quarter"
          value={filters.quarter}
          options={filterOptions.quarters}
          onChange={(value) => onFilterChange('quarter', value)}
          displayValue={filters.quarter}
        />

        {/* Additional filter chip */}
        <Chip
          type="filter"
          label="Temp TSE Filter"
          filterValue="true"
          deletable
          showChevron={false}
        />

        {/* More filters arrow */}
        <button style={styles.moreButton}>
          <Icon name="chevron-right" size="s" color={colors.textSecondary} />
        </button>
      </div>
    </div>
  );
};

interface FilterDropdownProps {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (value: string) => void;
  displayValue?: string;
  showChevron?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  displayValue,
  showChevron = true,
}) => {
  const displayText = displayValue || value;

  return (
    <button style={styles.filterDropdown}>
      <span style={styles.filterLabel}>{label}</span>
      {displayValue && <span style={styles.filterValue}>{displayText}</span>}
      {showChevron && (
        <Icon name="chevron-down" size="xs" color={colors.textSecondary} />
      )}
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.cardBg,
    borderBottom: `1px solid ${colors.border}`,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    fontFamily: typography.fontFamily,
  },
  filtersRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  filterDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs}px ${spacing.md}px`,
    backgroundColor: 'transparent',
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: typography.fontFamily,
    transition: 'border-color 150ms ease',
    height: 32,
  },
  filterLabel: {
    color: colors.textSecondary,
  },
  filterValue: {
    color: colors.textPrimary,
    fontWeight: 500,
  },
  moreButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginLeft: 'auto',
  },
};

export default FilterBar;
