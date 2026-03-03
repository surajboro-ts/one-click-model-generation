import React from 'react';
import { Checkbox, SearchInput, Button } from '../../../components';
import { colors, font } from '../styles';
import { COLUMNS } from '../data/mockData';

export const ColumnsTable: React.FC = () => (
  <div style={styles.container}>
    <div style={styles.toolbar}>
      <div style={{ width: 200 }}>
        <SearchInput placeholder="Search" />
      </div>
      <Button variant="secondary" size="small">Model CSV import</Button>
    </div>
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: 40 }}>
              <Checkbox showLabel={false} />
            </th>
            <th style={styles.th}>Column name</th>
            <th style={styles.th}>Source table name</th>
            <th style={styles.th}>Source column na...</th>
            <th style={styles.th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS.map((col, i) => (
            <tr key={col.id} style={i === 1 ? styles.rowHighlight : undefined}>
              <td style={styles.td}><Checkbox showLabel={false} /></td>
              <td style={styles.td}>{col.name}</td>
              <td style={styles.td}>{col.sourceTable}</td>
              <td style={styles.td}>{col.sourceColumn}</td>
              <td style={{ ...styles.td, color: colors.textTertiary }}>Click to edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: colors.bg,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    borderBottom: `1px solid ${colors.borderDivider}`,
  },
  tableWrap: {
    flex: 1,
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: font.family,
    fontSize: font.size.sm,
  },
  th: {
    textAlign: 'left' as const,
    padding: '8px 16px',
    fontWeight: font.weight.medium,
    color: colors.textSecondary,
    fontSize: font.size.xs,
    borderBottom: `1px solid ${colors.borderDivider}`,
    whiteSpace: 'nowrap',
    backgroundColor: colors.bgSunken,
  },
  td: {
    padding: '10px 16px',
    color: colors.textPrimary,
    fontWeight: font.weight.regular,
    borderBottom: `1px solid ${colors.borderDivider}`,
    whiteSpace: 'nowrap',
  },
  rowHighlight: {
    backgroundColor: colors.bgGhostHighlight,
  },
};
