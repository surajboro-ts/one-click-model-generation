import React from 'react';
import styles from './Grid.module.css';

// ─── Grid ──────────────────────────────────────────────────────────────────

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns or a CSS grid-template-columns string */
  columns?: number | string;
  /** Shorthand for both row and column gap. Accepts number (px) or CSS string */
  gap?: number | string;
  /** Row gap — overrides gap for rows if provided */
  rowGap?: number | string;
  /** Column gap — overrides gap for columns if provided */
  colGap?: number | string;
  /** CSS grid-auto-rows value */
  autoRows?: string;
}

function resolveGap(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

function resolveColumns(value: number | string): string {
  return typeof value === 'number' ? `repeat(${value}, 1fr)` : value;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns, gap, rowGap, colGap, autoRows, style, className, children, ...rest }, ref) => {
    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: columns !== undefined ? resolveColumns(columns) : undefined,
      gap: gap !== undefined ? resolveGap(gap) : undefined,
      rowGap: rowGap !== undefined ? resolveGap(rowGap) : undefined,
      columnGap: colGap !== undefined ? resolveGap(colGap) : undefined,
      gridAutoRows: autoRows,
      ...style,
    };

    const containerClasses = [styles.grid, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} style={gridStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// ─── RdGrid (alias for Scaligent/Radiant compatibility) ───────────────────

export type RdGridProps = GridProps;

export const RdGrid = React.forwardRef<HTMLDivElement, RdGridProps>((props, ref) => (
  <Grid ref={ref} {...props} />
));

RdGrid.displayName = 'RdGrid';

// ─── RdGridItem ────────────────────────────────────────────────────────────

export interface RdGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  colSpan?: number;
  /** Number of rows to span */
  rowSpan?: number;
  /** Starting column line */
  colStart?: number;
}

export const RdGridItem = React.forwardRef<HTMLDivElement, RdGridItemProps>(
  ({ colSpan, rowSpan, colStart, style, className, children, ...rest }, ref) => {
    const itemStyle: React.CSSProperties = {
      gridColumn: colSpan !== undefined ? `span ${colSpan}` : undefined,
      gridRow: rowSpan !== undefined ? `span ${rowSpan}` : undefined,
      gridColumnStart: colStart,
      ...style,
    };

    const containerClasses = [styles.item, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} style={itemStyle} {...rest}>
        {children}
      </div>
    );
  }
);

RdGridItem.displayName = 'RdGridItem';

export default Grid;
