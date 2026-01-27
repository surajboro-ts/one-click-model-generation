import React, { useState, useMemo, useCallback } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { SearchInput } from '../SearchInput';
import styles from './FilterDialog.module.css';

/**
 * Filter Option
 */
export interface FilterOption {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
}

/**
 * FilterDialog Props
 */
export interface FilterDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Handler to close the dialog */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Array of filter options */
  options: FilterOption[];
  /** Currently selected option IDs */
  selectedIds: string[];
  /** Handler called when filter is applied */
  onApply: (selectedIds: string[]) => void;
  /** Apply button text */
  applyText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Show "Select All" button */
  showSelectAll?: boolean;
  /** Show selected count in footer */
  showSelectedCount?: boolean;
}

/**
 * FilterDialog Component
 * 
 * A modal dialog for filtering with checkbox selection.
 * Based on the FilterModal pattern from radiant-code.
 * 
 * **Features:**
 * - Search filtering
 * - Multi-select with checkboxes
 * - Select all / Clear buttons
 * - Selected count display
 * 
 * @example
 * ```tsx
 * <FilterDialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Filter by category"
 *   options={categories}
 *   selectedIds={selectedCategories}
 *   onApply={setSelectedCategories}
 * />
 * ```
 */
export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  title,
  options,
  selectedIds,
  onApply,
  applyText = 'Apply',
  cancelText = 'Cancel',
  searchPlaceholder = 'Search...',
  showSelectAll = true,
  showSelectedCount = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set(selectedIds));

  // Sync internal state when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setInternalSelected(new Set(selectedIds));
      setSearchQuery('');
    }
  }, [isOpen, selectedIds]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(query));
  }, [options, searchQuery]);

  // Toggle option selection
  const handleToggle = useCallback((id: string) => {
    setInternalSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Select all visible options
  const handleSelectAll = useCallback(() => {
    setInternalSelected(prev => {
      const newSet = new Set(prev);
      filteredOptions.forEach(opt => newSet.add(opt.id));
      return newSet;
    });
  }, [filteredOptions]);

  // Clear all selections
  const handleClearAll = useCallback(() => {
    setInternalSelected(new Set());
  }, []);

  // Apply selection
  const handleApply = useCallback(() => {
    onApply(Array.from(internalSelected));
    onClose();
  }, [internalSelected, onApply, onClose]);

  // Cancel and close
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const footer = (
    <div className={styles.footer}>
      {showSelectedCount && (
        <span className={styles.selectedCount}>
          {internalSelected.size} selected
        </span>
      )}
      <div className={styles.footerActions}>
        <Button variant="secondary" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={handleApply}>
          {applyText}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="small"
    >
      <div className={styles.container}>
        {/* Search */}
        <div className={styles.searchWrapper}>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>

        {/* Quick actions */}
        {showSelectAll && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleSelectAll}
            >
              Select all
            </button>
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleClearAll}
            >
              Clear
            </button>
          </div>
        )}

        {/* Options list */}
        <div className={styles.optionsList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div key={option.id} className={styles.optionItem}>
                <Checkbox
                  label={option.label}
                  checked={internalSelected.has(option.id)}
                  onChange={() => handleToggle(option.id)}
                />
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              No options match your search
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FilterDialog;
