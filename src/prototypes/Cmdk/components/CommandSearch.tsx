/**
 * CommandSearch Component
 * 
 * Search input for the command palette.
 * Supports active filter chip display.
 * 
 * Matches Figma specs:
 * - Height: 56px
 * - Padding: pt-16 pb-12 px-16
 * - Search icon: 16px, color #a5acb9
 * - Input: 16px Plain Regular, color #1d232f
 */

import React, { useRef, useEffect } from 'react';
import { Icon } from '../../../components/icons';
import { brandColors } from '../../../tokens/colors/brand';
import { spacing } from '../../../tokens/spacing';
import { FilterChip } from './FilterChip';
import type { FilterOption } from '../types';

interface CommandSearchProps {
  /** Current search value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Active filter (shown as chip) */
  activeFilter?: FilterOption | null;
  /** Handler to clear active filter */
  onClearFilter?: () => void;
  /** Handler to clear search input */
  onClear?: () => void;
  /** Ref to the input element */
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search objects or navigate anywhere in ThoughtSpot',
  autoFocus = true,
  activeFilter,
  onClearFilter,
  onClear,
  inputRef: externalRef,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef || internalRef;

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  const showClearButton = value.length > 0 && !activeFilter;
  const showFilterHint = !activeFilter && value.length === 0;

  return (
    <div style={styles.container}>
      {/* Search icon */}
      <div style={styles.iconWrapper}>
        <Icon name="magnifying-glass" size="m" />
      </div>

      {/* Active filter chip */}
      {activeFilter && onClearFilter && (
        <FilterChip filter={activeFilter} onClear={onClearFilter} />
      )}

      {/* Input wrapper */}
      <div style={styles.inputWrapper}>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={activeFilter ? `Search ${activeFilter.label.toLowerCase()}...` : placeholder}
          style={styles.input}
          autoFocus={autoFocus}
        />
      </div>

      {/* Clear button */}
      {showClearButton && onClear && (
        <button
          style={styles.clearButton}
          onClick={onClear}
          aria-label="Clear search"
        >
          <Icon name="cross" size="s" />
        </button>
      )}

      {/* Filter hint */}
      {showFilterHint && (
        <div style={styles.filterHint}>
          <span style={styles.filterKey}>/</span>
          <span style={styles.filterText}>to filter</span>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    height: 56,
    padding: `${spacing.D}px`, // 16px all around
    paddingTop: 16,
    paddingBottom: 12,
    borderBottom: `1px solid ${brandColors.gray[20]}`, // #EAEDF2
    backgroundColor: brandColors.white,
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    color: brandColors.gray[50], // #A5ACB9
    flexShrink: 0,
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
  },
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: 16,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: 400,
    lineHeight: '24px',
    color: brandColors.gray[90], // #1D232F
    backgroundColor: 'transparent',
    padding: 0,
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: brandColors.gray[50],
    borderRadius: 4,
    flexShrink: 0,
  },
  filterHint: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  filterKey: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    height: 20,
    padding: '0 6px',
    backgroundColor: brandColors.gray[10], // #F6F8FA
    border: `1px solid ${brandColors.gray[20]}`, // #EAEDF2
    borderRadius: 4,
    fontSize: 11,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
    color: brandColors.gray[60], // #777E8B
  },
  filterText: {
    fontSize: 12,
    color: brandColors.gray[50], // #A5ACB9
  },
};

export default CommandSearch;
