import React, { useState } from 'react';
import styles from './List.module.css';

export interface ListItem {
  id: string;
  [key: string]: unknown;
}

export interface ListProps<T extends ListItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  draggable?: boolean;
  onReorder?: (items: T[]) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

// Drag handle icon (6-dot grid)
const DragHandleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="5.5" cy="4" r="1" fill="currentColor" />
    <circle cx="5.5" cy="8" r="1" fill="currentColor" />
    <circle cx="5.5" cy="12" r="1" fill="currentColor" />
    <circle cx="10.5" cy="4" r="1" fill="currentColor" />
    <circle cx="10.5" cy="8" r="1" fill="currentColor" />
    <circle cx="10.5" cy="12" r="1" fill="currentColor" />
  </svg>
);

export function List<T extends ListItem>(props: ListProps<T>): React.ReactElement | null {
  const { items: initialItems, renderItem, draggable, onReorder, emptyState, className } = props;

  const [items, setItems] = useState<T[]>(initialItems);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Sync external items changes (controlled usage)
  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setHoverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setHoverIndex(null);
      return;
    }

    const reordered = [...items];
    const [removed] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, removed);

    setItems(reordered);
    setDragIndex(null);
    setHoverIndex(null);
    onReorder?.(reordered);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setHoverIndex(null);
  };

  const containerClasses = [styles.list, className].filter(Boolean).join(' ');

  if (items.length === 0 && emptyState) {
    return (
      <div className={containerClasses}>
        <div className={styles.emptyState}>{emptyState}</div>
      </div>
    );
  }

  return (
    <div className={containerClasses} role="list">
      {items.map((item, index) => {
        const isDragging = dragIndex === index;
        const isDropTarget = hoverIndex === index && dragIndex !== null && dragIndex !== index;

        const rowClasses = [
          styles.listItem,
          isDragging && styles.dragging,
          isDropTarget && styles.dropTarget,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={item.id}
            role="listitem"
            className={rowClasses}
            draggable={draggable}
            onDragStart={draggable ? () => handleDragStart(index) : undefined}
            onDragOver={draggable ? (e) => handleDragOver(e, index) : undefined}
            onDrop={draggable ? (e) => handleDrop(e, index) : undefined}
            onDragEnd={draggable ? handleDragEnd : undefined}
          >
            {draggable && (
              <span className={styles.dragHandle} aria-hidden="true">
                <DragHandleIcon />
              </span>
            )}
            <div className={styles.listItemContent}>{renderItem(item, index)}</div>
          </div>
        );
      })}
    </div>
  );
}

List.displayName = 'List';

export default List;
