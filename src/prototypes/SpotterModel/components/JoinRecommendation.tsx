import React from 'react';
import { Checkbox } from '../../../components';
import { colors, font } from '../styles';
import type { JoinDef } from '../data/mockData';

interface JoinRecommendationProps {
  join: JoinDef;
  checked: boolean;
  onToggle: () => void;
}

export const JoinRecommendation: React.FC<JoinRecommendationProps> = ({ join, checked, onToggle }) => (
  <div style={styles.item} onClick={onToggle}>
    <div style={styles.top}>
      <div style={styles.checkCol}>
        <Checkbox checked={checked} onChange={onToggle} showLabel={false} />
      </div>
      <div style={styles.info}>
        <span style={styles.title}>
          {join.leftTable} → {join.rightTable}
        </span>
        <span style={styles.description}>{join.description}</span>
      </div>
    </div>
    <div style={styles.diagram}>
      <div style={styles.tableCol}>
        <span style={styles.diagramTable}>{join.leftTable}</span>
        <span style={styles.diagramColumn}>{join.leftColumn}</span>
      </div>
      <div style={styles.joinCenter}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="5.5" cy="8" r="4" stroke={colors.textBrand} strokeWidth="1" fill="none" />
          <circle cx="10.5" cy="8" r="4" stroke={colors.textBrand} strokeWidth="1" fill="none" />
        </svg>
        <span style={styles.cardinality}>{join.cardinality}</span>
      </div>
      <div style={styles.lineLeft} />
      <div style={styles.lineRight} />
      <div style={styles.tableColRight}>
        <span style={styles.diagramTable}>{join.rightTable}</span>
        <span style={styles.diagramColumn}>{join.rightColumn}</span>
      </div>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  item: {
    padding: '12px',
    borderBottom: `1px solid ${colors.borderDivider}`,
    cursor: 'pointer',
    transition: 'background-color 0.1s',
  },
  top: {
    display: 'flex',
    gap: 12,
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
  title: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    color: colors.textPrimary,
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
  diagram: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginLeft: 28,
    position: 'relative',
    padding: '0 0',
  },
  tableCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    minWidth: 72,
  },
  tableColRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 0,
    minWidth: 72,
  },
  diagramTable: {
    fontFamily: font.family,
    fontSize: 10,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 72,
  },
  diagramColumn: {
    fontFamily: font.family,
    fontSize: 10,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
  },
  joinCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  cardinality: {
    fontFamily: font.family,
    fontSize: 10,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
    whiteSpace: 'nowrap',
  },
  lineLeft: {
    position: 'absolute',
    left: 72,
    top: '40%',
    width: 'calc(50% - 80px)',
    height: 1,
    backgroundColor: colors.borderDefault,
  },
  lineRight: {
    position: 'absolute',
    right: 72,
    top: '40%',
    width: 'calc(50% - 80px)',
    height: 1,
    backgroundColor: colors.borderDefault,
  },
};
