import React, { useState } from 'react';
import styles from './TreeTable.module.css';
import type { TreeNode } from '../Tree';

export interface TreeTableColumn {
  id: string;
  label: string;
  width?: number | string;
  render?: (node: TreeTableNode) => React.ReactNode;
}

export interface TreeTableNode extends TreeNode {
  data?: Record<string, unknown>;
  children?: TreeTableNode[];
}

export interface TreeTableProps {
  nodes: TreeTableNode[];
  columns: TreeTableColumn[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelect?: (id: string) => void;
  onExpand?: (id: string) => void;
  className?: string;
}

interface TreeTableRowProps {
  node: TreeTableNode;
  columns: TreeTableColumn[];
  depth: number;
  selectedIds: string[];
  expandedIds: string[];
  onSelect?: (id: string) => void;
  onToggleExpand: (id: string) => void;
  gridTemplateColumns: string;
}

const TreeTableRow: React.FC<TreeTableRowProps> = ({
  node,
  columns,
  depth,
  selectedIds,
  expandedIds,
  onSelect,
  onToggleExpand,
  gridTemplateColumns,
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
        style={{ gridTemplateColumns }}
        onClick={handleRowClick}
        role="row"
        aria-selected={isSelected}
      >
        {/* First column: tree structure */}
        <div className={styles.cell} style={{ paddingLeft: `${depth * 20 + 8}px` }}>
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
          {node.icon && <span className={styles.icon}>{node.icon}</span>}
          <span className={styles.cellLabel}>{node.label}</span>
        </div>

        {/* Additional columns */}
        {columns.slice(1).map((col) => (
          <div key={col.id} className={styles.cell}>
            {col.render
              ? col.render(node)
              : (node.data?.[col.id] as React.ReactNode) ?? null}
          </div>
        ))}
      </div>

      {hasChildren && isExpanded && (
        <>
          {node.children!.map((child) => (
            <TreeTableRow
              key={child.id}
              node={child}
              columns={columns}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              gridTemplateColumns={gridTemplateColumns}
            />
          ))}
        </>
      )}
    </>
  );
};

function buildGridTemplateColumns(columns: TreeTableColumn[]): string {
  return columns
    .map((col) => {
      if (!col.width) return '1fr';
      if (typeof col.width === 'number') return `${col.width}px`;
      return col.width;
    })
    .join(' ');
}

export const TreeTable: React.FC<TreeTableProps> = ({
  nodes,
  columns,
  selectedIds = [],
  expandedIds: controlledExpandedIds,
  onSelect,
  onExpand,
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

  const gridTemplateColumns = buildGridTemplateColumns(columns);

  return (
    <div
      className={[styles.treeTable, className].filter(Boolean).join(' ')}
      role="treegrid"
    >
      {/* Header */}
      <div className={styles.header} style={{ gridTemplateColumns }}>
        {columns.map((col) => (
          <div key={col.id} className={styles.headerCell}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className={styles.body}>
        {nodes.map((node) => (
          <TreeTableRow
            key={node.id}
            node={node}
            columns={columns}
            depth={0}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            onSelect={onSelect}
            onToggleExpand={handleToggleExpand}
            gridTemplateColumns={gridTemplateColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeTable;
