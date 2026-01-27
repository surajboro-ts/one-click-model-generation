import React, { useState } from 'react';
import { Button, SearchInput, Tabs, Select } from '../components';
import { Icon } from '../components/icons';
import { brandColors } from '../tokens/colors/brand';

// === TYPES ===
interface WatchlistItem {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  chartData: number[];
}

interface LibraryItem {
  id: string;
  type: 'Exploration' | 'Lenses' | 'Report';
  name: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  lastViewed: string;
}

interface TrendingItem {
  id: string;
  title: string;
  author: string;
  type: string;
  verified: boolean;
}

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail?: string;
  isActive?: boolean;
}

// === MINI CHART COMPONENT ===
const MiniSparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// === WATCHLIST CARD COMPONENT ===
const WatchlistCard: React.FC<{ item: WatchlistItem }> = ({ item }) => {
  const isPositive = item.change >= 0;
  const changeColor = isPositive ? '#06BF7F' : '#E54B4B';
  const chartColor = isPositive ? '#06BF7F' : '#E54B4B';
  
  return (
    <div style={cardStyles.watchlistCard}>
      <div style={cardStyles.watchlistHeader}>
        <span style={cardStyles.watchlistTitle}>{item.title}</span>
        <Icon name="more" size="s" color="#777E8B" />
      </div>
      <div style={cardStyles.watchlistValue}>{item.value}</div>
      <div style={cardStyles.watchlistFooter}>
        <div style={cardStyles.changeContainer}>
          <Icon 
            name={isPositive ? 'arrow-up' : 'arrow-down'} 
            size="xs" 
            color={changeColor} 
          />
          <span style={{ ...cardStyles.changeText, color: changeColor }}>
            {Math.abs(item.change)}% {item.changeLabel}
          </span>
        </div>
        <MiniSparkline data={item.chartData} color={chartColor} />
      </div>
    </div>
  );
};

// === LIBRARY TABLE ROW COMPONENT ===
const LibraryRow: React.FC<{ item: LibraryItem }> = ({ item }) => {
  const typeColors: Record<string, string> = {
    'Exploration': '#2770EF',
    'Lenses': '#8B5CF6',
    'Report': '#F59E0B',
  };
  
  return (
    <tr style={tableStyles.row}>
      <td style={tableStyles.cell}>
        <div style={{ 
          ...tableStyles.typeTag, 
          backgroundColor: `${typeColors[item.type]}15`,
          color: typeColors[item.type],
        }}>
          {item.type}
        </div>
      </td>
      <td style={{ ...tableStyles.cell, ...tableStyles.nameCell }}>{item.name}</td>
      <td style={tableStyles.cell}>
        <div style={tableStyles.tagsContainer}>
          {item.tags.map((tag, i) => (
            <span key={i} style={tableStyles.tag}>{tag}</span>
          ))}
        </div>
      </td>
      <td style={tableStyles.cell}>
        <div style={tableStyles.authorContainer}>
          <div style={tableStyles.avatar}>
            {item.author.name.charAt(0).toUpperCase()}
          </div>
          <span>{item.author.name}</span>
        </div>
      </td>
      <td style={{ ...tableStyles.cell, color: '#777E8B' }}>{item.lastViewed}</td>
      <td style={tableStyles.cell}>
        <Button variant="tertiary" size="small" icon="share" iconPosition="leading">
          Share
        </Button>
      </td>
    </tr>
  );
};

// === TRENDING CARD COMPONENT ===
const TrendingCard: React.FC<{ item: TrendingItem }> = ({ item }) => (
  <div style={cardStyles.trendingCard}>
    <div style={cardStyles.trendingInfo}>
      <div style={cardStyles.trendingIcon}>
        <Icon name="folder" size="s" color="#2770EF" />
      </div>
      <div style={cardStyles.trendingText}>
        <span style={cardStyles.trendingTitle}>{item.title}</span>
        <span style={cardStyles.trendingMeta}>
          by {item.author} • {item.type}
        </span>
      </div>
    </div>
    {item.verified && (
      <div style={cardStyles.verifiedBadge}>
        <Icon name="checkmark-circle" size="xs" color="#06BF7F" />
        <span>Verified</span>
      </div>
    )}
  </div>
);

// === VIDEO ITEM COMPONENT ===
const VideoPlaylistItem: React.FC<{ item: VideoItem }> = ({ item }) => (
  <div style={{ 
    ...cardStyles.videoItem, 
    backgroundColor: item.isActive ? '#F0F6FF' : 'transparent' 
  }}>
    <div style={cardStyles.videoThumbnail}>
      <Icon name="play" size="s" color="#ffffff" />
    </div>
    <div style={cardStyles.videoInfo}>
      <span style={cardStyles.videoTitle}>{item.title}</span>
      <span style={cardStyles.videoDuration}>{item.duration}</span>
    </div>
  </div>
);

// === MAIN COMPONENT ===
export const SpotterDashboard: React.FC = () => {
  const [libraryTab, setLibraryTab] = useState('all');
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedView, setSelectedView] = useState('my-data');
  
  // Sample data
  const watchlistItems: WatchlistItem[] = [
    { id: '1', title: 'Total Revenue', value: '$842.5K', change: 12.4, changeLabel: 'vs last month', chartData: [30, 40, 35, 50, 49, 60, 70, 91] },
    { id: '2', title: 'Active Users', value: '24,521', change: 8.2, changeLabel: 'vs last week', chartData: [20, 25, 30, 35, 40, 38, 45, 52] },
    { id: '3', title: 'Conversion Rate', value: '3.42%', change: -2.1, changeLabel: 'vs last month', chartData: [45, 42, 40, 38, 35, 36, 34, 32] },
    { id: '4', title: 'Avg Order Value', value: '$156.00', change: 5.7, changeLabel: 'vs last month', chartData: [100, 110, 108, 115, 120, 125, 130, 140] },
  ];
  
  const libraryItems: LibraryItem[] = [
    { id: '1', type: 'Exploration', name: 'Q4 Revenue Analysis', tags: ['Finance', 'Revenue'], author: { name: 'Sarah Chen' }, lastViewed: '2 hours ago' },
    { id: '2', type: 'Lenses', name: 'Customer Segmentation', tags: ['Marketing', 'Customers'], author: { name: 'Mike Johnson' }, lastViewed: 'Yesterday' },
    { id: '3', type: 'Report', name: 'Weekly Sales Summary', tags: ['Sales', 'Weekly'], author: { name: 'Emma Davis' }, lastViewed: '3 days ago' },
    { id: '4', type: 'Exploration', name: 'Product Performance', tags: ['Products'], author: { name: 'Alex Kim' }, lastViewed: '1 week ago' },
    { id: '5', type: 'Lenses', name: 'Regional Breakdown', tags: ['Geography', 'Sales'], author: { name: 'Chris Lee' }, lastViewed: '2 weeks ago' },
  ];
  
  const trendingItems: TrendingItem[] = [
    { id: '1', title: 'Monthly KPI Dashboard', author: 'Analytics Team', type: 'Dashboard', verified: true },
    { id: '2', title: 'Sales Pipeline Report', author: 'Sales Ops', type: 'Report', verified: true },
    { id: '3', title: 'Customer Journey Map', author: 'UX Team', type: 'Exploration', verified: false },
    { id: '4', title: 'Budget Tracker 2025', author: 'Finance', type: 'Dashboard', verified: true },
  ];
  
  const videoItems: VideoItem[] = [
    { id: '1', title: 'Getting Started with Spotter', duration: '3:45', isActive: true },
    { id: '2', title: 'Creating Your First Exploration', duration: '5:20' },
    { id: '3', title: 'Working with Lenses', duration: '4:15' },
    { id: '4', title: 'Sharing & Collaboration', duration: '2:50' },
  ];
  
  const viewOptions = [
    { id: 'my-data', label: 'My Data' },
    { id: 'shared', label: 'Shared with me' },
    { id: 'all', label: 'All content' },
  ];
  
  const libraryTabs = [
    { id: 'all', label: 'All' },
    { id: 'shared', label: 'Shared' },
  ];
  
  return (
    <div style={styles.container}>
      {/* HEADER SECTION */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.pageTitle}>Spotter</h1>
          <Select
            options={viewOptions}
            value={selectedView}
            onChange={(value) => setSelectedView(value)}
            size="small"
          />
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchContainer}>
            <SearchInput 
              placeholder="Search content..." 
              style={{ width: '280px' }}
            />
          </div>
          <Button variant="primary" icon="plus" iconPosition="leading">
            New Exploration
          </Button>
        </div>
      </div>
      
      {/* WATCHLIST SECTION */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Watchlist</h2>
          <Button variant="tertiary" size="small" icon="pencil" iconPosition="leading">
            Edit
          </Button>
        </div>
        <div style={styles.watchlistGrid}>
          {watchlistItems.map(item => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      
      {/* LIBRARY SECTION */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Library</h2>
        </div>
        <div style={styles.libraryControls}>
          <Tabs 
            tabs={libraryTabs}
            activeTab={libraryTab}
            onTabChange={setLibraryTab}
          />
          <div style={styles.libraryActions}>
            <SearchInput 
              placeholder="Search library..." 
              value={librarySearch}
              onChange={(e) => setLibrarySearch(e.target.value)}
              style={{ width: '200px' }}
            />
            <Button variant="secondary" size="small" icon="filter" iconPosition="leading">
              Filter
            </Button>
          </div>
        </div>
        <div style={styles.tableContainer}>
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={tableStyles.headerCell}>Type</th>
                <th style={{ ...tableStyles.headerCell, width: '30%' }}>Name</th>
                <th style={tableStyles.headerCell}>Tags</th>
                <th style={tableStyles.headerCell}>Author</th>
                <th style={tableStyles.headerCell}>Last viewed</th>
                <th style={tableStyles.headerCell}>Share</th>
              </tr>
            </thead>
            <tbody>
              {libraryItems.map(item => (
                <LibraryRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* BOTTOM GRID: TRENDING + LEARNING */}
      <div style={styles.bottomGrid}>
        {/* TRENDING SECTION */}
        <section style={styles.trendingSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Trending</h2>
            <Button variant="tertiary" size="small">
              View all
            </Button>
          </div>
          <div style={styles.trendingGrid}>
            <div style={cardStyles.trendingPanel}>
              <div style={cardStyles.panelHeader}>
                <Icon name="star" size="s" color="#F59E0B" />
                <span style={cardStyles.panelTitle}>Popular this week</span>
              </div>
              <div style={cardStyles.panelContent}>
                {trendingItems.slice(0, 2).map(item => (
                  <TrendingCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div style={cardStyles.trendingPanel}>
              <div style={cardStyles.panelHeader}>
                <Icon name="clock" size="s" color="#2770EF" />
                <span style={cardStyles.panelTitle}>Recently updated</span>
              </div>
              <div style={cardStyles.panelContent}>
                {trendingItems.slice(2, 4).map(item => (
                  <TrendingCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* LEARNING VIDEOS SECTION */}
        <section style={styles.learningSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Learning Videos</h2>
            <Button variant="tertiary" size="small">
              Browse all
            </Button>
          </div>
          <div style={styles.videoContainer}>
            <div style={cardStyles.videoPlayer}>
              <div style={cardStyles.videoPlaceholder}>
                <div style={cardStyles.playButton}>
                  <Icon name="play" size="m" color="#ffffff" />
                </div>
                <span style={cardStyles.videoPlayerTitle}>Getting Started with Spotter</span>
              </div>
            </div>
            <div style={cardStyles.videoPlaylist}>
              {videoItems.map(item => (
                <VideoPlaylistItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// === MAIN STYLES ===
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '0',
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  pageTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    color: '#1D232F',
    margin: 0,
  },
  searchContainer: {
    display: 'flex',
  },
  section: {
    marginBottom: '32px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: '#1D232F',
    margin: 0,
  },
  watchlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  libraryControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  libraryActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E8ED',
    overflow: 'hidden',
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  trendingSection: {
    flex: 1,
  },
  trendingGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  learningSection: {
    flex: 1,
  },
  videoContainer: {
    display: 'flex',
    gap: '16px',
  },
};

// === CARD STYLES ===
const cardStyles: Record<string, React.CSSProperties> = {
  // Watchlist Card
  watchlistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E8ED',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  watchlistHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  watchlistTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    color: '#777E8B',
  },
  watchlistValue: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    color: '#1D232F',
  },
  watchlistFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  changeText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
  },
  
  // Trending Card
  trendingPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E8ED',
    padding: '16px',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  panelTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: '#1D232F',
  },
  panelContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  trendingCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '6px',
    backgroundColor: '#F6F8FA',
    cursor: 'pointer',
  },
  trendingInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  trendingIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#E8F0FE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  trendingTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#1D232F',
  },
  trendingMeta: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    color: '#777E8B',
  },
  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#06BF7F',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Video Player
  videoPlayer: {
    flex: 2,
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#1D232F',
    aspectRatio: '16/9',
    minHeight: '200px',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  playButton: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'rgba(39, 112, 239, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  videoPlayerTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#FFFFFF',
  },
  videoPlaylist: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E8ED',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxHeight: '220px',
    overflowY: 'auto',
  },
  videoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  videoThumbnail: {
    width: '40px',
    height: '28px',
    borderRadius: '4px',
    backgroundColor: '#1D232F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  videoTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: '#1D232F',
  },
  videoDuration: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    color: '#777E8B',
  },
};

// === TABLE STYLES ===
const tableStyles: Record<string, React.CSSProperties> = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  headerCell: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: '#777E8B',
    backgroundColor: '#F6F8FA',
    borderBottom: '1px solid #E5E8ED',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  row: {
    borderBottom: '1px solid #E5E8ED',
  },
  cell: {
    padding: '12px 16px',
    fontSize: '13px',
    color: '#1D232F',
    verticalAlign: 'middle',
  },
  nameCell: {
    fontWeight: 500,
  },
  typeTag: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 500,
  },
  tagsContainer: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  tag: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    backgroundColor: '#F0F2F5',
    color: '#5C6370',
  },
  authorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: brandColors.blue[60],
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 600,
  },
};

export default SpotterDashboard;
