import React, { useRef, useEffect } from 'react';
import styles from './NestedCheckbox.module.css';

export interface NestedCheckboxItem {
  id: string;
  label: string;
  checked?: boolean;
  children?: NestedCheckboxItem[];
}

export interface NestedCheckboxProps {
  items: NestedCheckboxItem[];
  onChange?: (items: NestedCheckboxItem[]) => void;
  className?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

type CheckState = 'checked' | 'unchecked' | 'indeterminate';

function getChildState(item: NestedCheckboxItem): CheckState {
  if (!item.children || item.children.length === 0) {
    return item.checked ? 'checked' : 'unchecked';
  }
  const childStates = item.children.map(getChildState);
  const allChecked = childStates.every((s) => s === 'checked');
  const allUnchecked = childStates.every((s) => s === 'unchecked');
  if (allChecked) return 'checked';
  if (allUnchecked) return 'unchecked';
  return 'indeterminate';
}

function setAllChecked(item: NestedCheckboxItem, checked: boolean): NestedCheckboxItem {
  return {
    ...item,
    checked,
    children: item.children?.map((child) => setAllChecked(child, checked)),
  };
}

function toggleItem(
  items: NestedCheckboxItem[],
  targetId: string
): NestedCheckboxItem[] {
  return items.map((item) => {
    if (item.id === targetId) {
      const newChecked = !item.checked;
      // Toggle all children to the same state
      return setAllChecked(item, newChecked);
    }
    if (item.children) {
      const newChildren = toggleItem(item.children, targetId);
      // Derive parent checked state from children
      const childStates = newChildren.map(getChildState);
      const allChecked = childStates.every((s) => s === 'checked');
      const allUnchecked = childStates.every((s) => s === 'unchecked');
      return {
        ...item,
        checked: allChecked ? true : allUnchecked ? false : item.checked,
        children: newChildren,
      };
    }
    return item;
  });
}

// ─── NestedCheckboxNode ────────────────────────────────────────────────────

const NestedCheckboxNode: React.FC<{
  item: NestedCheckboxItem;
  depth: number;
  onToggle: (id: string) => void;
}> = ({ item, depth, onToggle }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const checkState = getChildState(item);

  // Set indeterminate DOM property
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checkState === 'indeterminate';
    }
  }, [checkState]);

  return (
    <div className={styles.node}>
      <label
        className={styles.nodeLabel}
        style={{ paddingLeft: `calc(${depth} * 16px + var(--spacing-1))` }}
      >
        <input
          ref={inputRef}
          type="checkbox"
          className={styles.checkbox}
          checked={checkState === 'checked'}
          onChange={() => onToggle(item.id)}
          aria-checked={checkState === 'indeterminate' ? 'mixed' : checkState === 'checked'}
        />
        <span className={styles.labelText}>{item.label}</span>
      </label>

      {item.children && item.children.length > 0 && (
        <div className={styles.children}>
          {item.children.map((child) => (
            <NestedCheckboxNode
              key={child.id}
              item={child}
              depth={depth + 1}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── NestedCheckbox (root) ─────────────────────────────────────────────────

export const NestedCheckbox = React.forwardRef<HTMLDivElement, NestedCheckboxProps>(
  ({ items, onChange, className }, ref) => {
    const handleToggle = (id: string) => {
      const updated = toggleItem(items, id);
      onChange?.(updated);
    };

    const containerClasses = [styles.container, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses}>
        {items.map((item) => (
          <NestedCheckboxNode
            key={item.id}
            item={item}
            depth={0}
            onToggle={handleToggle}
          />
        ))}
      </div>
    );
  }
);

NestedCheckbox.displayName = 'NestedCheckbox';

export default NestedCheckbox;
