import React, { forwardRef, useState, useMemo } from 'react';
import { Icon } from '../icons';
import styles from './Table.module.css';

/**
 * Table Column Definition
 */
export interface TableColumn<T = Record<string, unknown>> {
  /** Unique column key */
  key: string;
  /** Column header label */
  label: string;
  /** Column width (CSS value) */
  width?: string;
  /** Minimum width */
  minWidth?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom render function */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

/**
 * Table Props
 */
export interface TableProps<T = Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Table data rows */
  data: T[];
  /** Key extractor for row */
  rowKey?: string | ((row: T, index: number) => string);
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether rows are selectable */
  selectable?: boolean;
  /** Selected row keys */
  selectedKeys?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedKeys: string[]) => void;
  /** Callback when row is clicked */
  onRowClick?: (row: T, index: number) => void;
  /** Whether to show hover state on rows */
  hoverable?: boolean;
  /** Whether table has borders */
  bordered?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Compact size */
  compact?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;
}

/**
 * Table
 * 
 * A flexible data table component for displaying tabular data.
 * 
 * **Features:**
 * - Column definitions with custom renderers
 * - Sortable columns
 * - Row selection
 * - Loading and empty states
 * - Hover and striped styles
 * 
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *     { key: 'status', label: 'Status', render: (val) => <Chip label={val} /> },
 *   ]}
 *   data={users}
 *   rowKey="id"
 *   hoverable
 * />
 * ```
 */
export const Table = forwardRef<HTMLDivElement, TableProps>(({
  columns,
  data,
  rowKey = 'id',
  loading = false,
  emptyMessage = 'No data available',
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  onRowClick,
  hoverable = true,
  bordered = false,
  striped = false,
  compact = false,
  stickyHeader = false,
  className,
  ...props
}, ref) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Get row key
  const getRowKey = (row: Record<string, unknown>, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row, index);
    }
    return String(row[rowKey] ?? index);
  };

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortConfig.key];
      const bVal = (b as Record<string, unknown>)[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Handle row selection
  const handleSelectAll = () => {
    if (selectedKeys.length === data.length) {
      onSelectionChange?.([]);
    } else {
      const allKeys = data.map((row, index) => 
        getRowKey(row as Record<string, unknown>, index)
      );
      onSelectionChange?.(allKeys);
    }
  };

  const handleSelectRow = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelectionChange?.(selectedKeys.filter(k => k !== key));
    } else {
      onSelectionChange?.([...selectedKeys, key]);
    }
  };

  // Build class names
  const containerClasses = [
    styles.container,
    bordered && styles.bordered,
    className,
  ].filter(Boolean).join(' ');

  const tableClasses = [
    styles.table,
    compact && styles.compact,
    striped && styles.striped,
    stickyHeader && styles.stickyHeader,
  ].filter(Boolean).join(' ');

  const isAllSelected = data.length > 0 && selectedKeys.length === data.length;

  return (
    <div ref={ref} className={containerClasses} {...props}>
      <table className={tableClasses}>
        <thead className={styles.thead}>
          <tr>
            {selectable && (
              <th className={styles.th} style={{ width: '48px' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                className={`${styles.th} ${column.sortable ? styles.sortable : ''}`}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                  textAlign: column.align || 'left',
                }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className={styles.thContent}>
                  <span>{column.label}</span>
                  {column.sortable && (
                    <span className={styles.sortIcon}>
                      {sortConfig?.key === column.key ? (
                        <Icon
                          name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                          size="xs"
                        />
                      ) : (
                        <Icon name="sort" size="xs" className={styles.sortIconInactive} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={styles.loadingCell}
              >
                <div className={styles.loadingContent}>
                  <Icon name="sync" size="l" className={styles.loadingSpinner} />
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={styles.emptyCell}
              >
                <div className={styles.emptyContent}>
                  <Icon name="folder" size="l" className={styles.emptyIcon} />
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const key = getRowKey(row as Record<string, unknown>, rowIndex);
              const isSelected = selectedKeys.includes(key);

              const rowClasses = [
                styles.tr,
                hoverable && styles.hoverable,
                isSelected && styles.selected,
                onRowClick && styles.clickable,
              ].filter(Boolean).join(' ');

              return (
                <tr
                  key={key}
                  className={rowClasses}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {selectable && (
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(key);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={styles.checkbox}
                      />
                    </td>
                  )}
                  {columns.map(column => {
                    const value = (row as Record<string, unknown>)[column.key];
                    const content = column.render
                      ? column.render(value, row, rowIndex)
                      : String(value ?? '');

                    return (
                      <td
                        key={column.key}
                        className={styles.td}
                        style={{ textAlign: column.align || 'left' }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
});

Table.displayName = 'Table';
export default Table;
