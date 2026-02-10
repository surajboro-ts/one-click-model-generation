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

      {/* Dark Background Area */}
      <div style={styles.previewArea}>
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
