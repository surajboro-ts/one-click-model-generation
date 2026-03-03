import React from 'react';
import { Checkbox } from '../../../components';
import { colors, font } from '../styles';
import type { TableDef } from '../data/mockData';

interface TableRecommendationProps {
  table: TableDef;
  checked: boolean;
  onToggle: () => void;
}

export const TableRecommendation: React.FC<TableRecommendationProps> = ({ table, checked, onToggle }) => (
  <div style={styles.item} onClick={onToggle}>
    <div style={styles.checkCol}>
      <Checkbox checked={checked} onChange={onToggle} showLabel={false} />
    </div>
    <div style={styles.info}>
      <div style={styles.titleRow}>
        <span style={styles.name}>{table.name}</span>
        <span style={{ ...styles.badge, backgroundColor: table.type === 'Fact' ? colors.bgInfo : colors.bgSuccess }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke={table.type === 'Fact' ? colors.textBrand : colors.textSuccess} strokeWidth="1" />
            <line x1="1" y1="4" x2="11" y2="4" stroke={table.type === 'Fact' ? colors.textBrand : colors.textSuccess} strokeWidth="1" />
          </svg>
          <span style={{ color: table.type === 'Fact' ? colors.textBrand : colors.textSuccess }}>{table.type}</span>
        </span>
      </div>
      <span style={styles.description}>{table.description}</span>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  item: {
    display: 'flex',
    gap: 12,
    padding: '8px 12px',
    borderBottom: `1px solid ${colors.borderDivider}`,
    cursor: 'pointer',
    transition: 'background-color 0.1s',
  },
  checkCol: {
    paddingTop: 2,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    color: colors.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '1px 6px',
    borderRadius: 4,
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.medium,
    flexShrink: 0,
  },
  description: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.regular,
    lineHeight: `${font.line.sm}px`,
    color: colors.textSecondary,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};
