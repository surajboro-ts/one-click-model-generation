import React, { useState } from 'react';
import styles from './Tree.module.css';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  nodes: TreeNode[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelect?: (id: string) => void;
  onExpand?: (id: string) => void;
  checkable?: boolean;
  className?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  selectedIds: string[];
  expandedIds: string[];
  onSelect?: (id: string) => void;
  onToggleExpand: (id: string) => void;
  checkable?: boolean;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  depth,
  selectedIds,
  expandedIds,
  onSelect,
  onToggleExpand,
  checkable,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedIds.includes(node.id);

  const handleRowClick = () => {
    if (node.disabled) return;
    onSelect?.(node.id);
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    if (node.disabled) return;
    e.stopPropagation();
    onToggleExpand(node.id);
  };

  const rowClasses = [
    styles.row,
    isSelected && styles.selected,
    node.disabled && styles.disabled,
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        className={rowClasses}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={handleRowClick}
        role={checkable ? 'checkbox' : 'treeitem'}
        aria-selected={isSelected}
        aria-disabled={node.disabled}
        aria-checked={checkable ? isSelected : undefined}
        tabIndex={node.disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRowClick();
          }
        }}
      >
        {hasChildren ? (
          <span
            className={[styles.chevron, isExpanded && styles.chevronExpanded].filter(Boolean).join(' ')}
            onClick={handleChevronClick}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span className={styles.leafSpacer} />
        )}

        {checkable && (
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected}
            onChange={() => {}}
            disabled={node.disabled}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        {node.icon && <span className={styles.icon}>{node.icon}</span>}

        <span className={styles.label}>{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              checkable={checkable}
            />
          ))}
        </div>
      )}
    </>
  );
};

export const Tree: React.FC<TreeProps> = ({
  nodes,
  selectedIds = [],
  expandedIds: controlledExpandedIds,
  onSelect,
  onExpand,
  checkable = false,
  className,
}) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>([]);

  const expandedIds = controlledExpandedIds ?? internalExpandedIds;

  const handleToggleExpand = (id: string) => {
    const isExpanded = expandedIds.includes(id);
    const next = isExpanded
      ? expandedIds.filter((eid) => eid !== id)
      : [...expandedIds, id];

    if (!controlledExpandedIds) {
      setInternalExpandedIds(next);
    }
    onExpand?.(id);
  };

  return (
    <div
      className={[styles.tree, className].filter(Boolean).join(' ')}
      role="tree"
    >
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          depth={0}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          onSelect={onSelect}
          onToggleExpand={handleToggleExpand}
          checkable={checkable}
        />
      ))}
    </div>
  );
};

export default Tree;
