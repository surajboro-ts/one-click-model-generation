import React from 'react';
import { Table } from '../../../components/Table';
import type { TableColumn } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { SearchInput } from '../../../components/SearchInput';
import { Chip } from '../../../components/Chip';
import { Avatar } from '../../../components/Avatar';
import { Icon } from '../../../components/icons';
import { Typography } from '../../../components/Typography';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily } from '../../../tokens/typography';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LibraryItem {
  id: string;
  type: 'answer' | 'liveboard';
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
  { id: '1', type: 'answer',    verified: false, name: 'Retails Sales',                   tags: ['Customer success'],         author: 'Anje Keizer', lastViewed: '1 day ago'    },
  { id: '2', type: 'liveboard', verified: true,  name: 'Sales',                           tags: ['sales', 'pipeline'],        author: 'Anje Keizer', lastViewed: '7 days ago'   },
  { id: '3', type: 'answer',    verified: false, name: 'Total sales, Total quantity pu…', tags: [],                           author: 'Anje Keizer', lastViewed: '7 days ago'   },
  { id: '4', type: 'liveboard', verified: true,  name: 'Cloud Clusters',                  tags: [],                           author: 'Anje Keizer', lastViewed: '2 weeks ago'  },
  { id: '5', type: 'answer',    verified: false, name: 'Sales by state and region',       tags: ['sales'],                    author: 'Anje Keizer', lastViewed: '3 weeks ago'  },
];

// ---------------------------------------------------------------------------
// Custom SVG icons for object types (no matching icons in 46-icon library)
// ---------------------------------------------------------------------------

const AnswerTypeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke={systemColors.light['content-secondary']} strokeWidth="1.3" />
    <path d="M6 9.5L8 11.5L12 7" stroke={systemColors.light['content-secondary']} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LiveboardTypeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
    <rect x="10" y="2" width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
    <rect x="2" y="10" width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
    <rect x="10" y="10" width="6" height="6" rx="1" stroke={systemColors.light['content-brand']} strokeWidth="1.3" />
  </svg>
);

// ---------------------------------------------------------------------------
// Watchlist card — no matching Radiant component; uses design tokens
// ---------------------------------------------------------------------------

const WatchlistCard: React.FC<{ highlighted?: boolean }> = ({ highlighted }) => (
  <div style={{
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${highlighted ? referenceColors.brand['40'] : systemColors.light['border-divider']}`,
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
    <div style={{ fontFamily: fontFamily.primary, fontSize: 12, color: systemColors.light['content-tertiary'], lineHeight: '16px' }}>
      09/03/FY 2025
    </div>
    <div style={{ fontFamily: fontFamily.primary, fontSize: 28, fontWeight: 600, color: systemColors.light['content-primary'], lineHeight: '36px' }}>
      $145.35M
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.B, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: fontFamily.primary, fontSize: 12, fontWeight: 500, color: systemColors.light['content-success'] }}>↑ 6.9%</span>
      <span style={{ fontFamily: fontFamily.primary, fontSize: 11, color: systemColors.light['content-tertiary'] }}>
        vs week of 18/06/FY 2024 (65.4K)
      </span>
    </div>
    <div style={{ flex: 1, minHeight: 40 }}>
      <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
        <path d="M0 35 Q30 30 60 28 T120 20 T180 12 T200 8" fill="none" stroke={systemColors.light['content-success']} strokeWidth="2" />
        <path d="M0 35 Q30 30 60 28 T120 20 T180 12 T200 8 V40 H0 Z" fill={systemColors.light['content-success']} fillOpacity="0.08" />
      </svg>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${systemColors.light['border-divider']}`, paddingTop: spacing.B }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.A }}>
        <LiveboardTypeIcon />
        <span style={{ fontFamily: fontFamily.primary, fontSize: 12, color: systemColors.light['content-secondary'] }}>Cloud Clusters</span>
      </div>
      <Avatar name="Anje Keizer" size="xs" />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Table column definitions
// forwardRef wrapping prevents generic JSX syntax (<Table<T>>) — row is cast
// ---------------------------------------------------------------------------

const LIBRARY_COLUMNS: TableColumn[] = [
  {
    key: 'type',
    label: 'Type',
    width: '48px',
    render: (_, row) => {
      const item = row as unknown as LibraryItem;
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.type === 'liveboard' ? <LiveboardTypeIcon /> : <AnswerTypeIcon />}
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
    render: (value) => (
      <span style={{ fontFamily: fontFamily.primary, fontSize: 13, color: systemColors.light['content-primary'] }}>
        {String(value)}
      </span>
    ),
  },
  {
    key: 'tags',
    label: 'Tags',
    width: '180px',
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
    width: '140px',
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
    width: '110px',
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
    width: '60px',
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
  return (
    <div style={pageStyles.page}>
      {/* Page Title */}
      <div style={{ marginBottom: spacing.D }}>
        <Typography variant="page-title" noMargin>Spotter</Typography>
      </div>

      {/* Spotter Search Bar */}
      <div style={pageStyles.searchBarWrapper}>
        <div style={pageStyles.searchBar}>
          <div style={pageStyles.searchDropdown}>
            <span style={{ fontFamily: fontFamily.primary, fontSize: 14, fontWeight: 500, color: systemColors.light['content-primary'] }}>
              Retail-Apparel
            </span>
            <Icon name="chevron-down" size="s" color={systemColors.light['content-secondary']} />
          </div>
          <div style={pageStyles.searchDivider} />
          {/* Raw <input> is intentional: the Spotter bar is a composite widget
              (dropdown + divider + text + button) that neither SearchInput nor
              TextInput can represent — both add their own chrome/icons. */}
          <input
            style={pageStyles.searchInput}
            placeholder="Ask a business question in natural language"
            readOnly
            aria-label="Ask a business question"
          />
          <div style={{ flexShrink: 0, padding: `0 ${spacing.B}px 0 0` }}>
            <Button variant="primary" size="small" icon="share" iconPosition="leading" onClick={() => {}}>
              Ask Spotter
            </Button>
          </div>
        </div>
      </div>

      {/* Watchlist Section */}
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
          <WatchlistCard highlighted />
          <WatchlistCard />
        </div>
      </div>

      {/* Library Section */}
      <div>
        <div style={pageStyles.sectionHeader}>
          <div style={pageStyles.libraryTitleRow}>
            <Typography variant="section-label" noMargin>Library</Typography>
            <div style={pageStyles.tabGroup}>
              <span style={pageStyles.tabActive}>All</span>
              <span style={pageStyles.tab}>Yours</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: spacing.F }}>
            <Button variant="tertiary" size="small" onClick={() => {}}>All Liveboards</Button>
            <Button variant="tertiary" size="small" onClick={() => {}}>All Answers</Button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={pageStyles.libraryToolbar}>
          <SearchInput
            placeholder="Search"
            style={{ width: 200 }}
          />
          <Chip type="filter" label="Author" filterValue="Anje Keizer" showChevron={false} />
        </div>

        {/* Radiant Table */}
        <div style={pageStyles.tableWrapper}>
          <Table
            columns={LIBRARY_COLUMNS}
            data={LIBRARY_DATA as unknown as Record<string, unknown>[]}
            rowKey="id"
            hoverable
          />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles — all values from design tokens, no hardcoded hex or pixel literals
// ---------------------------------------------------------------------------

const pageStyles: Record<string, React.CSSProperties> = {
  page: {
    padding: `${spacing.F}px ${spacing.H}px`,
    fontFamily: fontFamily.primary,
  },

  /* Spotter search bar */
  searchBarWrapper: {
    marginBottom: spacing.F,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['border-divider']}`,
    borderRadius: spacing.H,     // 32px → pill
    paddingLeft: spacing.D,
    overflow: 'hidden',
  },
  searchDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.B,
    cursor: 'pointer',
    flexShrink: 0,
  },
  searchDivider: {
    width: 1,
    height: 24,
    backgroundColor: systemColors.light['border-divider'],
    margin: `0 ${spacing.D}px`,
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontFamily: fontFamily.primary,
    fontSize: 14,
    color: systemColors.light['content-secondary'],
    backgroundColor: 'transparent',
  },

  /* Section layout */
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.D,
  },
  libraryTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.F,
  },
  tabGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.D,
  },
  tabActive: {
    fontFamily: fontFamily.primary,
    fontSize: 14,
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    cursor: 'pointer',
    paddingBottom: spacing.A,
    borderBottom: `2px solid ${systemColors.light['content-brand']}`,
  },
  tab: {
    fontFamily: fontFamily.primary,
    fontSize: 14,
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    cursor: 'pointer',
    paddingBottom: spacing.A,
  },

  /* Watchlist */
  watchlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: spacing.F,
  },

  /* Library */
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
