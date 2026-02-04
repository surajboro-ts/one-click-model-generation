/**
 * CmdkDemo - Command Palette Demo Wrapper
 * 
 * Demo page for the Command Palette with:
 * - Liveboard preview as background
 * - Dropdown controls for variant and context selection
 * - ⌘K shortcut to toggle
 */

import React, { useState, useEffect, ComponentType } from 'react';
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';
import { CommandPalette } from './CommandPalette';
import { VariantDropdown } from './components/VariantDropdown';
import { ContextDropdown } from './components/ContextDropdown';
import { ResultCard } from './components/ResultCard';
import { ResultCardCompact } from './components/ResultCardCompact';
import { ResultCardSpacious } from './components/ResultCardSpacious';
import { ResultCardTwoLine16, ResultCardTwoLine20 } from './components/ResultCardTwoLine';
import type { CardVariant, PageContext, ResultCardProps } from './types';

// Card variant configuration
const VARIANT_COMPONENTS: Record<CardVariant, ComponentType<ResultCardProps>> = {
  figmaSpec: ResultCard,
  compact: ResultCardCompact,
  spacious: ResultCardSpacious,
  twoLine16: ResultCardTwoLine16,
  twoLine20: ResultCardTwoLine20,
};

export const CmdkDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardVariant, setCardVariant] = useState<CardVariant>('figmaSpec');
  const [pageContext, setPageContext] = useState<PageContext>('default');

  // Keyboard shortcut for command palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={styles.container}>
      {/* Top Controls Bar */}
      <div style={styles.topBar}>
        <div style={styles.controlsLeft}>
          <span style={styles.title}>Command Palette</span>
        </div>
        <div style={styles.controlsRight}>
          <VariantDropdown value={cardVariant} onChange={setCardVariant} />
          <ContextDropdown value={pageContext} onChange={setPageContext} />
        </div>
      </div>

      {/* Liveboard Preview Background */}
      <div style={styles.previewArea}>
        <div style={styles.liveboardPreview}>
          {/* Simulated Liveboard */}
          <div style={styles.liveboardHeader}>
            <div style={styles.liveboardTitle}>TSE Business Overview</div>
            <div style={styles.liveboardMeta}>Last updated: 2 hours ago</div>
          </div>
          
          {/* KPI Cards Row */}
          <div style={styles.kpiRow}>
            {['Total Revenue', 'Active Users', 'Conversion Rate', 'Avg Order Value'].map((label, i) => (
              <div key={i} style={styles.kpiCard}>
                <div style={styles.kpiLabel}>{label}</div>
                <div style={styles.kpiValue}>
                  {i === 0 ? '$2.4M' : i === 1 ? '15,234' : i === 2 ? '3.2%' : '$156'}
                </div>
                <div style={styles.kpiChange}>
                  {i === 2 ? '↓ 0.3%' : '↑ 12.4%'}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Placeholders */}
          <div style={styles.chartsRow}>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Revenue by Region</div>
              <div style={styles.chartPlaceholder}>
                {/* Simulated bar chart */}
                <div style={{ ...styles.chartBar, width: '80%', backgroundColor: brandColors.blue[60] }} />
                <div style={{ ...styles.chartBar, width: '65%', backgroundColor: brandColors.blue[50] }} />
                <div style={{ ...styles.chartBar, width: '50%', backgroundColor: brandColors.blue[40] }} />
                <div style={{ ...styles.chartBar, width: '35%', backgroundColor: brandColors.blue[30] }} />
              </div>
            </div>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Monthly Trends</div>
              <div style={styles.chartPlaceholder}>
                {/* Simulated line chart */}
                <svg viewBox="0 0 200 60" style={{ width: '100%', height: 60 }}>
                  <polyline
                    points="0,50 30,40 60,45 90,30 120,35 150,20 180,25 200,15"
                    fill="none"
                    stroke={brandColors.blue[60]}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Table Preview */}
          <div style={styles.tablePreview}>
            <div style={styles.tableHeader}>
              <span>Product</span>
              <span>Revenue</span>
              <span>Growth</span>
              <span>Status</span>
            </div>
            {['Enterprise', 'Pro', 'Starter', 'Free'].map((product, i) => (
              <div key={i} style={styles.tableRow}>
                <span>{product}</span>
                <span>${(800 - i * 200)}K</span>
                <span style={{ color: i === 3 ? brandColors.red[60] : brandColors.green[60] }}>
                  {i === 3 ? '-2.1%' : `+${15 - i * 3}%`}
                </span>
                <span style={styles.statusBadge}>Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open prompt */}
        {!isOpen && (
          <div style={styles.openPrompt}>
            <button style={styles.openButton} onClick={() => setIsOpen(true)}>
              <span>Open Command Palette</span>
              <kbd style={styles.shortcutKey}>⌘K</kbd>
            </button>
            <p style={styles.hint}>
              Type <kbd style={styles.inlineKey}>/</kbd> to filter by type
            </p>
          </div>
        )}
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={(item) => {
          console.log('Selected:', item);
          setIsOpen(false);
        }}
        onFilterSelect={(filter) => {
          console.log('Filter selected:', filter);
        }}
        ResultCardComponent={VARIANT_COMPONENTS[cardVariant]}
        context={pageContext}
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: brandColors.gray[90], // Dark background
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.D}px ${spacing.F}px`, // 16px 24px
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  controlsLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: brandColors.white,
  },
  controlsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`, // 12px
  },
  previewArea: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `80px ${spacing.F}px ${spacing.F}px`, // Top padding for fixed header
    position: 'relative',
  },
  liveboardPreview: {
    width: '100%',
    maxWidth: 1100,
    backgroundColor: brandColors.white,
    borderRadius: 12,
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
    padding: `${spacing.F}px`, // 24px
    opacity: 0.9,
  },
  liveboardHeader: {
    marginBottom: `${spacing.F}px`, // 24px
  },
  liveboardTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: 4,
  },
  liveboardMeta: {
    fontSize: 13,
    color: brandColors.gray[50],
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: `${spacing.D}px`, // 16px
    marginBottom: `${spacing.F}px`,
  },
  kpiCard: {
    backgroundColor: brandColors.gray[10],
    borderRadius: 8,
    padding: `${spacing.D}px`, // 16px
  },
  kpiLabel: {
    fontSize: 12,
    color: brandColors.gray[60],
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: 4,
  },
  kpiChange: {
    fontSize: 12,
    color: brandColors.green[60],
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: `${spacing.D}px`,
    marginBottom: `${spacing.F}px`,
  },
  chartCard: {
    backgroundColor: brandColors.gray[10],
    borderRadius: 8,
    padding: `${spacing.D}px`,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: brandColors.gray[90],
    marginBottom: `${spacing.C}px`,
  },
  chartPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    height: 80,
    justifyContent: 'center',
  },
  chartBar: {
    height: 12,
    borderRadius: 4,
  },
  tablePreview: {
    backgroundColor: brandColors.gray[10],
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: brandColors.gray[20],
    fontSize: 12,
    fontWeight: 500,
    color: brandColors.gray[60],
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    padding: `${spacing.C}px ${spacing.D}px`,
    fontSize: 14,
    color: brandColors.gray[90],
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  statusBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: brandColors.green[10],
    color: brandColors.green[60],
    borderRadius: 4,
    fontSize: 12,
    width: 'fit-content',
  },
  openPrompt: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: `${spacing.D}px`,
  },
  openButton: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`, // 12px
    padding: `${spacing.C}px ${spacing.F}px`, // 12px 24px
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    color: brandColors.white,
    fontSize: 16,
    fontWeight: 500,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'background-color 0.15s ease',
  },
  shortcutKey: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    fontSize: 13,
    fontFamily: '"Plain", -apple-system, sans-serif',
  },
  hint: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  inlineKey: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 6px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    fontSize: 12,
    margin: '0 4px',
  },
};

export default CmdkDemo;
