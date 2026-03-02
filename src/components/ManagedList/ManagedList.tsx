import React, { useState } from 'react';
import styles from './ManagedList.module.css';

export interface ManagedListItem {
  id: string;
  label: string;
  [key: string]: unknown;
}

export interface ManagedListProps {
  items: ManagedListItem[];
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  addLabel?: string;
  renderItem?: (item: ManagedListItem) => React.ReactNode;
  searchable?: boolean;
  className?: string;
}

// Inline SVG icons
const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M2 4H12M5 4V2.5H9V4M5 6V11M9 6V11M3 4L4 12H10L11 4H3Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M7 2V12M2 7H12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const ManagedList = React.forwardRef<HTMLDivElement, ManagedListProps>(
  (
    {
      items,
      onAdd,
      onRemove,
      onEdit,
      addLabel = 'Add item',
      renderItem,
      searchable = false,
      className,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = searchable && searchQuery.trim()
      ? items.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;

    const containerClasses = [styles.container, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses}>
        {/* Search input */}
        {searchable && (
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search items"
            />
          </div>
        )}

        {/* Item list */}
        <div className={styles.list} role="list">
          {filteredItems.length === 0 ? (
            <div className={styles.emptyState}>
              {searchQuery ? 'No results found' : 'No items'}
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className={styles.listItem} role="listitem">
                <div className={styles.itemContent}>
                  {renderItem ? renderItem(item) : (
                    <span className={styles.itemLabel}>{item.label}</span>
                  )}
                </div>
                <div className={styles.actions} aria-label="Item actions">
                  {onEdit && (
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => onEdit(item.id)}
                      aria-label={`Edit ${item.label}`}
                      title="Edit"
                    >
                      <PencilIcon />
                    </button>
                  )}
                  {onRemove && (
                    <button
                      type="button"
                      className={[styles.actionButton, styles.removeButton].join(' ')}
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.label}`}
                      title="Remove"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add button */}
        {onAdd && (
          <button type="button" className={styles.addButton} onClick={onAdd}>
            <PlusIcon />
            <span>{addLabel}</span>
          </button>
        )}
      </div>
    );
  }
);

ManagedList.displayName = 'ManagedList';

export default ManagedList;
