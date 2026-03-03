import React from 'react';
import { colors, font } from '../styles';
import type { TableDef } from '../data/mockData';

interface TableCardProps {
  table: TableDef;
  x: number;
  y: number;
  selected?: boolean;
  onSelect?: () => void;
  animate?: boolean;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  x,
  y,
  selected,
  onSelect,
  animate,
}) => (
  <div
    style={{
      ...styles.card,
      left: x,
      top: y,
      ...(selected ? styles.cardSelected : {}),
      ...(animate ? styles.cardAnimate : {}),
    }}
    onClick={onSelect}
  >
    {selected && (
      <div style={styles.floatingBadge}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1" />
          <line x1="1" y1="4" x2="11" y2="4" stroke="white" strokeWidth="1" />
        </svg>
        <span style={styles.badgeText}>Table</span>
      </div>
    )}
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <span style={styles.typeLabel}>Table</span>
      </div>
      <button style={styles.moreBtn}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="4" cy="8" r="1.2" fill={colors.textSecondary} />
          <circle cx="8" cy="8" r="1.2" fill={colors.textSecondary} />
          <circle cx="12" cy="8" r="1.2" fill={colors.textSecondary} />
        </svg>
      </button>
    </div>
    <div style={styles.body}>
      <span style={styles.tableName}>{table.name}</span>
    </div>
    <div style={styles.footer}>
      <span style={styles.columnCount}>0/{table.columnCount} Columns</span>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  floatingBadge: {
    position: 'absolute',
    top: -14,
    left: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bgBrand,
    borderRadius: 4,
    padding: '2px 8px',
    height: 22,
    zIndex: 1,
  },
  badgeText: {
    fontFamily: font.family,
    fontSize: 11,
    fontWeight: font.weight.medium,
    color: 'white',
  },
  card: {
    position: 'absolute',
    width: 240,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: 8,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  cardSelected: {
    borderColor: colors.borderBrand,
    boxShadow: `0 0 0 1px ${colors.borderBrand}`,
  },
  cardAnimate: {
    animation: 'spotterCardAppear 0.4s ease-out forwards',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  typeLabel: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  body: {
    padding: '4px 12px 12px',
  },
  tableName: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
    wordBreak: 'break-word',
  },
  footer: {
    padding: '8px 12px',
    borderTop: `1px solid ${colors.borderDivider}`,
  },
  columnCount: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
  },
};
