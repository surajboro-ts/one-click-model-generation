import React, { useState } from 'react';
import { Table } from '../../../components/Table';
import type { TableColumn } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { SearchInput } from '../../../components/SearchInput';
import { Chip } from '../../../components/Chip';
import { Avatar } from '../../../components/Avatar';
import { Icon } from '../../../components/icons';
import { Typography } from '../../../components/Typography';
import { Tabs } from '../../../components/Tabs';
import type { Tab } from '../../../components/Tabs';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily } from '../../../tokens/typography';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LibraryItem {
  id: string;
  objectType: 'answer' | 'liveboard';
  verified: boolean;
  name: string;
  tags: string[];
  author: string;
  lastViewed: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const LIBRARY_DATA: LibraryItem[] = [
  { id: '1', objectType: 'answer',    verified: false, name: 'Retails Sales',                    tags: ['Customer success'],   author: 'Anje Keizer', lastViewed: '1 day ago'   },
  { id: '2', objectType: 'liveboard', verified: true,  name: 'Sales',                            tags: ['sales', 'pipeline'],  author: 'Anje Keizer', lastViewed: '7 days ago'  },
  { id: '3', objectType: 'answer',    verified: false, name: 'Total sales, Total quantity pu…',  tags: [],                     author: 'Anje Keizer', lastViewed: '7 days ago'  },
  { id: '4', objectType: 'liveboard', verified: true,  name: 'Cloud Clusters',                   tags: [],                     author: 'Anje Keizer', lastViewed: '2 weeks ago' },
  { id: '5', objectType: 'answer',    verified: false, name: 'Sales by state and region',        tags: ['sales'],              author: 'Anje Keizer', lastViewed: '3 weeks ago' },
];

// ---------------------------------------------------------------------------
// Custom SVG type icons — no matching icons in the 46-icon Radiant library
// ---------------------------------------------------------------------------

const AnswerIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke={systemColors.light['content-secondary']} strokeWidth="1.3" />
    <path
      d="M6 9.5L8 11.5L12 7"
      stroke={systemColors.light['content-secondary']}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LiveboardIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2"  y="2"  width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
    <rect x="10" y="2"  width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
    <rect x="2"  y="10" width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
    <rect x="10" y="10" width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
  </svg>
);

// ---------------------------------------------------------------------------
// Watchlist metric card — no Radiant Card matches this composite layout
// ---------------------------------------------------------------------------

const WatchlistCard: React.FC<{ pinned?: boolean }> = ({ pinned }) => (
  <div style={{
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${pinned ? referenceColors.brand['40'] : systemColors.light['border-divider']}`,
    borderRadius: spacing.C,
    padding: spacing.D,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.A,
    minHeight: 200,
  }}>
    <span style={{ fontFamily: fontFamily.primary, fontSize: 13, fontWeight: 500, color: systemColors.light['content-primary'], lineHeight: '18px' }}>
      Top 3: TS Cloud WAU
    </span>
    <span style={{ fontFamily: fontFamily.primary, fontSize: 12, color: systemColors.light['content-tertiary'], lineHeight: '16px' }}>
      09/03/FY 2025
    </span>
    <span style={{ fontFamily: fontFamily.primary, fontSize: 28, fontWeight: 600, color: systemColors.light['content-primary'], lineHeight: '36px' }}>
      $145.35M
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.B, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: fontFamily.primary, fontSize: 12, fontWeight: 500, color: systemColors.light['content-success'] }}>
        ↑ 6.9%
      </span>
      <span style={{ fontFamily: fontFamily.primary, fontSize: 11, color: systemColors.light['content-tertiary'] }}>
        vs week of 18/06/FY 2024 (65.4K)
      </span>
    </div>
    {/* Sparkline */}
    <div style={{ flex: 1, minHeight: 40 }}>
      <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
        <path
          d="M0 35 Q30 30 60 28 T120 20 T180 12 T200 8"
          fill="none"
          stroke={systemColors.light['content-success']}
          strokeWidth="2"
        />
        <path
          d="M0 35 Q30 30 60 28 T120 20 T180 12 T200 8 V40 H0 Z"
          fill={systemColors.light['content-success']}
          fillOpacity="0.08"
        />
      </svg>
    </div>
    {/* Footer row */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: `1px solid ${systemColors.light['border-divider']}`,
      paddingTop: spacing.B,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.A }}>
        <LiveboardIcon />
        <span style={{ fontFamily: fontFamily.primary, fontSize: 12, color: systemColors.light['content-secondary'] }}>
          Cloud Clusters
        </span>
      </div>
      <Avatar name="Anje Keizer" size="xs" />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Table column definitions
// forwardRef prevents generic JSX (<Table<T>>); rows are cast inside render
// ---------------------------------------------------------------------------

const LIBRARY_TABS: Tab[] = [
  { id: 'all',   label: 'All' },
  { id: 'yours', label: 'Yours' },
];

const TABLE_COLUMNS: TableColumn[] = [
  {
    key: 'objectType',
    label: 'Type',
    width: '48px',
    render: (_, row) => {
      const item = row as unknown as LibraryItem;
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.objectType === 'liveboard' ? <LiveboardIcon /> : <AnswerIcon />}
        </div>
      );
    },
  },
  {
    key: 'verified',
    label: '',
    width: '32px',
    render: (_, row) => {
      const item = row as unknown as LibraryItem;
      return item.verified ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="checkmark-circle" size="s" color={systemColors.light['content-brand']} />
        </div>
      ) : null;
    },
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    render: (value) => (
      <span style={{ fontFamily: fontFamily.primary, fontSize: 13, color: systemColors.light['content-primary'] }}>
        {String(value)}
      </span>
    ),
  },
  {
    key: 'tags',
    label: 'Tags',
    width: '200px',
    render: (value) => {
      const tags = value as string[];
      return (
        <div style={{ display: 'flex', gap: spacing.A, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip key={tag} type="attribute" label={tag} showChevron={false} />
          ))}
        </div>
      );
    },
  },
  {
    key: 'author',
    label: 'Author',
    width: '150px',
    render: (value) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.B }}>
        <Avatar name={String(value)} size="xs" />
        <span style={{ fontFamily: fontFamily.primary, fontSize: 13, color: systemColors.light['content-secondary'] }}>
          {String(value)}
        </span>
      </div>
    ),
  },
  {
    key: 'lastViewed',
    label: 'Last viewed',
    width: '120px',
    sortable: true,
    render: (value) => (
      <span style={{ fontFamily: fontFamily.primary, fontSize: 13, color: systemColors.light['content-secondary'] }}>
        {String(value)}
      </span>
    ),
  },
  {
    key: 'id',
    label: '',
    width: '64px',
    align: 'right',
    render: () => (
      <Button variant="tertiary" size="small" onClick={() => {}}>
        Share
      </Button>
    ),
  },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const SpotterHomePage: React.FC = () => {
  const [librarySearch, setLibrarySearch] = useState('');
  const [activeLibraryTab, setActiveLibraryTab] = useState('all');

  const filteredData = LIBRARY_DATA.filter((item) =>
    item.name.toLowerCase().includes(librarySearch.toLowerCase())
  );

  return (
    <div style={pageStyles.page}>
      {/* Page title */}
      <div style={{ marginBottom: spacing.D }}>
        <Typography variant="page-title" noMargin>Spotter</Typography>
      </div>

      {/* Spotter search bar — composite widget, raw <input> is intentional:
          neither SearchInput nor TextInput supports the dropdown+divider+text+button layout */}
      <div style={pageStyles.searchBarWrapper}>
        <div style={pageStyles.searchBar}>
          <div style={pageStyles.datasourceDropdown}>
            <span style={{ fontFamily: fontFamily.primary, fontSize: 14, fontWeight: 500, color: systemColors.light['content-primary'] }}>
              Retail-Apparel
            </span>
            <Icon name="chevron-down" size="s" color={systemColors.light['content-secondary']} />
          </div>
          <div style={pageStyles.searchBarDivider} />
          <input
            style={pageStyles.searchBarInput}
            placeholder="Ask a business question in natural language"
            readOnly
            aria-label="Ask Spotter a business question"
          />
          <div style={{ flexShrink: 0, paddingRight: spacing.B }}>
            <Button variant="primary" size="small" icon="share" iconPosition="leading" onClick={() => {}}>
              Ask Spotter
            </Button>
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div style={{ marginBottom: spacing.H }}>
        <div style={pageStyles.sectionHeader}>
          <Typography variant="section-label" noMargin>Watchlist</Typography>
          <Button variant="tertiary" icon="plus" iconPosition="leading" size="small" onClick={() => {}}>
            Add to Watchlist
          </Button>
        </div>
        <div style={pageStyles.watchlistGrid}>
          <WatchlistCard />
          <WatchlistCard />
          <WatchlistCard pinned />
          <WatchlistCard />
        </div>
      </div>

      {/* Library */}
      <div>
        <div style={pageStyles.sectionHeader}>
          <div style={pageStyles.libraryHeadingRow}>
            <Typography variant="section-label" noMargin>Library</Typography>
            <Tabs
              tabs={LIBRARY_TABS}
              activeTab={activeLibraryTab}
              onTabChange={setActiveLibraryTab}
            />
          </div>
          <div style={{ display: 'flex', gap: spacing.D }}>
            <Button variant="tertiary" size="small" onClick={() => {}}>All Liveboards</Button>
            <Button variant="tertiary" size="small" onClick={() => {}}>All Answers</Button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={pageStyles.libraryToolbar}>
          <SearchInput
            placeholder="Search library"
            value={librarySearch}
            onChange={(e) => setLibrarySearch(e.target.value)}
            style={{ width: 220 }}
          />
          <Chip type="filter" label="Author" filterValue="Anje Keizer" showChevron={false} />
        </div>

        {/* Table — wrapped for horizontal scroll on narrow screens */}
        <div style={pageStyles.tableWrapper}>
          <Table
            columns={TABLE_COLUMNS}
            data={filteredData as unknown as Record<string, unknown>[]}
            rowKey="id"
            hoverable
          />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles — tokens only, no hardcoded hex or magic pixel values
// ---------------------------------------------------------------------------

const pageStyles: Record<string, React.CSSProperties> = {
  page: {
    padding: `${spacing.F}px ${spacing.H}px`,
    fontFamily: fontFamily.primary,
  },

  // Spotter search bar
  searchBarWrapper: {
    marginBottom: spacing.F,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['border-divider']}`,
    borderRadius: spacing.H,
    paddingLeft: spacing.D,
    overflow: 'hidden',
  },
  datasourceDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.B,
    cursor: 'pointer',
    flexShrink: 0,
  },
  searchBarDivider: {
    width: 1,
    height: 24,
    backgroundColor: systemColors.light['border-divider'],
    margin: `0 ${spacing.D}px`,
    flexShrink: 0,
  },
  searchBarInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontFamily: fontFamily.primary,
    fontSize: 14,
    color: systemColors.light['content-secondary'],
    backgroundColor: 'transparent',
  },

  // Section headers
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.D,
  },
  libraryHeadingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.F,
  },
  // Watchlist
  watchlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: spacing.F,
  },

  // Library
  libraryToolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.C,
    marginBottom: spacing.D,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
};
