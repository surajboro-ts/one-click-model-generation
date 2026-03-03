import React, { useState } from 'react';
import { SearchInput, Toggle, Button } from '../../../components';
import { colors, font, SIDEBAR_WIDTH } from '../styles';
import { ALL_TABLES } from '../data/mockData';

export const TablesSidebar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showUnselected, setShowUnselected] = useState(false);
  const filtered = ALL_TABLES.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.connectionRow}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" fill={colors.textSuccess} />
          </svg>
          <span style={styles.connectionText}>Global sales connection</span>
        </div>
        <span style={styles.sectionTitle}>Tables</span>
      </div>

      <div style={styles.searchWrap}>
        <SearchInput
          placeholder="Search tables"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.filterRow}>
        <Button variant="tertiary" size="small">Add filters</Button>
        <Button variant="tertiary" size="small" icon="chevron-down" iconPosition="trailing">
          Sort by name
        </Button>
      </div>

      <div style={styles.tableList}>
        {filtered.map((table) => (
          <div key={table.id} style={styles.tableItem}>
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="2" cy="2" r="1" fill={colors.textTertiary} />
              <circle cx="2" cy="6" r="1" fill={colors.textTertiary} />
              <circle cx="2" cy="10" r="1" fill={colors.textTertiary} />
            </svg>
            <span style={styles.tableName}>{table.name}</span>
          </div>
        ))}
      </div>

      <div style={styles.toggleRow}>
        <Toggle checked={showUnselected} onChange={setShowUnselected} />
        <span style={styles.toggleLabel}>Show unselected</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: SIDEBAR_WIDTH,
    borderRight: `1px solid ${colors.borderDivider}`,
    backgroundColor: colors.bg,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flexShrink: 0,
  },
  header: {
    padding: '16px 16px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  connectionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  connectionText: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
  searchWrap: {
    padding: '0 16px 8px',
  },
  filterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px 8px',
  },
  tableList: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px',
  },
  tableItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 0',
    cursor: 'pointer',
  },
  tableName: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderTop: `1px solid ${colors.borderDivider}`,
  },
  toggleLabel: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    color: colors.textSecondary,
  },
};
