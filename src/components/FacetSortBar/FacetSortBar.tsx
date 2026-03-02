import React from 'react';
import styles from './FacetSortBar.module.css';

export interface FacetOption {
  id: string;
  label: string;
  count?: number;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface FacetSortBarProps {
  facets?: FacetOption[];
  selectedFacet?: string;
  onFacetChange?: (id: string) => void;
  sortOptions?: SortOption[];
  selectedSort?: string;
  onSortChange?: (id: string) => void;
  className?: string;
}

export const FacetSortBar: React.FC<FacetSortBarProps> = ({
  facets = [],
  selectedFacet,
  onFacetChange,
  sortOptions = [],
  selectedSort,
  onSortChange,
  className,
}) => {
  return (
    <div className={[styles.bar, className].filter(Boolean).join(' ')}>
      {/* Facets */}
      {facets.length > 0 && (
        <div className={styles.facets} role="group" aria-label="Filter by">
          {facets.map((facet) => {
            const isSelected = selectedFacet === facet.id;
            return (
              <button
                key={facet.id}
                type="button"
                className={[
                  styles.facetPill,
                  isSelected && styles.facetPillSelected,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onFacetChange?.(facet.id)}
                aria-pressed={isSelected}
              >
                {facet.label}
                {facet.count !== undefined && (
                  <span className={styles.facetCount}>({facet.count})</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Sort selector */}
      {sortOptions.length > 0 && (
        <div className={styles.sortGroup}>
          <span className={styles.sortLabel}>Sort:</span>
          <select
            className={styles.sortSelect}
            value={selectedSort ?? ''}
            onChange={(e) => onSortChange?.(e.target.value)}
            aria-label="Sort options"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FacetSortBar;
