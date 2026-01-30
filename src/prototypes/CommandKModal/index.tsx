import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Icon } from '../../components/icons';
import { brandColors } from '../../tokens/colors/brand';
import { commandK } from '../../mocks';
import type { CommandKResult, CommandKResultType } from '../../mocks';

/**
 * CommandKModal
 * 
 * A Spotlight-style search and navigation modal for ThoughtSpot.
 * Provides quick access to search, navigate, and create actions.
 * 
 * Features:
 * - Real-time search filtering
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Result sections (Recent, Recommended, Quick links)
 * - Context filter bar
 * - Keyboard shortcuts footer
 * 
 * @see docs/specs/command-k-modal.md for full specification
 */

// Icon mapping for result types
const getIconForType = (type: CommandKResultType): string => {
  const iconMap: Record<CommandKResultType, string> = {
    'answer': 'folder',
    'answer-in-lb': 'folder',
    'model': 'save',
    'navigate': 'arrow-right',
    'admin-settings': 'cog',
    'spotter': 'star',
    'create': 'plus',
    'help': 'info-circle',
  };
  return iconMap[type] || 'folder';
};

// Highlight search term in title
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} style={{ fontWeight: 600 }}>{part}</span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

interface ResultCardProps {
  result: CommandKResult;
  isSelected: boolean;
  searchQuery: string;
  onClick: () => void;
  onMouseEnter: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  isSelected,
  searchQuery,
  onClick,
  onMouseEnter,
}) => {
  return (
    <div
      style={{
        ...styles.resultCard,
        backgroundColor: isSelected ? brandColors.gray[10] : 'transparent',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="option"
      aria-selected={isSelected}
    >
      <div style={styles.resultCardBg} />
      <div style={styles.resultCardContent}>
        <div style={styles.resultCardLeft}>
          <div style={styles.resultCardIcon}>
            <Icon name={getIconForType(result.type) as 'plus'} size="s" />
          </div>
          <div style={styles.resultCardInfo}>
            <span style={styles.resultCardTitle}>
              {highlightText(result.title, searchQuery)}
            </span>
            {(result.location || result.author) && (
              <span style={styles.resultCardMeta}>
                {result.location}
                {result.location && result.author && ' '}
                {result.author}
              </span>
            )}
          </div>
        </div>
        <span style={styles.resultCardType}>{result.typeLabel}</span>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  results: CommandKResult[];
  selectedIndex: number;
  startIndex: number;
  searchQuery: string;
  onSelect: (result: CommandKResult) => void;
  onHover: (index: number) => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  results,
  selectedIndex,
  startIndex,
  searchQuery,
  onSelect,
  onHover,
}) => {
  if (results.length === 0) return null;

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>{title}</span>
      </div>
      {results.map((result, index) => (
        <ResultCard
          key={result.id}
          result={result}
          isSelected={selectedIndex === startIndex + index}
          searchQuery={searchQuery}
          onClick={() => onSelect(result)}
          onMouseEnter={() => onHover(startIndex + index)}
        />
      ))}
    </div>
  );
};

interface KeyBadgeProps {
  keys: string;
}

const KeyBadge: React.FC<KeyBadgeProps> = ({ keys }) => (
  <span style={styles.keyBadge}>{keys}</span>
);

interface ShortcutProps {
  keys: string;
  label: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ keys, label }) => (
  <div style={styles.shortcut}>
    <KeyBadge keys={keys} />
    <span style={styles.shortcutLabel}>{label}</span>
  </div>
);

export const CommandKModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>('admin-settings');
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter results based on search query
  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    const filterFn = (result: CommandKResult) => {
      if (!query) return true;
      return (
        result.title.toLowerCase().includes(query) ||
        result.location?.toLowerCase().includes(query) ||
        result.typeLabel.toLowerCase().includes(query)
      );
    };

    return {
      recent: commandK.recent.filter(filterFn),
      recommended: commandK.recommended.filter(filterFn),
      quickLinks: commandK.quickLinks.filter(filterFn),
    };
  }, [searchQuery]);

  // Flatten results for keyboard navigation
  const allResults = useMemo(() => [
    ...filteredResults.recent,
    ...filteredResults.recommended,
    ...filteredResults.quickLinks,
  ], [filteredResults]);

  // Get section start indices
  const sectionStartIndices = useMemo(() => ({
    recent: 0,
    recommended: filteredResults.recent.length,
    quickLinks: filteredResults.recent.length + filteredResults.recommended.length,
  }), [filteredResults]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Focus input on mount
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : allResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (allResults[selectedIndex]) {
          handleSelect(allResults[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (searchQuery) {
          setSearchQuery('');
        } else {
          setIsOpen(false);
        }
        break;
    }
  }, [allResults, selectedIndex, searchQuery]);

  const handleSelect = useCallback((result: CommandKResult) => {
    console.log('Selected:', result);
    // In a real implementation, this would navigate or perform the action
  }, []);

  const handleClearFilter = useCallback(() => {
    setActiveFilter(null);
  }, []);

  if (!isOpen) {
    return (
      <div style={styles.closedState}>
        <button 
          style={styles.reopenButton}
          onClick={() => setIsOpen(true)}
        >
          Press <KeyBadge keys="⌘ K" /> to open Command+K
        </button>
      </div>
    );
  }

  return (
    <div style={styles.backdrop}>
      <div 
        style={styles.container}
        role="dialog"
        aria-modal="true"
        aria-label="Search objects or navigate anywhere"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div style={styles.searchHeader}>
          <div style={styles.searchRow}>
            <div style={styles.searchLeft}>
              <Icon name="search" size="m" color={brandColors.gray[50]} />
              <input
                ref={inputRef}
                type="text"
                style={styles.searchInput}
                placeholder={commandK.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={styles.searchRight}>
              <KeyBadge keys="/" />
              <span style={styles.filterHint}>to filter</span>
            </div>
          </div>
        </div>

        {/* Context Filter Bar */}
        {activeFilter && (
          <div style={styles.contextFilter}>
            <div style={styles.contextFilterInner}>
              <div style={styles.contextFilterLeft}>
                <Icon name="cog" size="s" color={brandColors.gray[90]} />
                <span style={styles.contextFilterLabel}>
                  Search in Admin Settings
                </span>
              </div>
              <button 
                style={styles.contextFilterAction}
                onClick={handleClearFilter}
              >
                Filter
              </button>
            </div>
          </div>
        )}

        {/* Results List */}
        <div style={styles.resultsList} ref={resultsRef} role="listbox">
          <Section
            title="Recent"
            results={filteredResults.recent}
            selectedIndex={selectedIndex}
            startIndex={sectionStartIndices.recent}
            searchQuery={searchQuery}
            onSelect={handleSelect}
            onHover={setSelectedIndex}
          />
          <Section
            title="Recommended"
            results={filteredResults.recommended}
            selectedIndex={selectedIndex}
            startIndex={sectionStartIndices.recommended}
            searchQuery={searchQuery}
            onSelect={handleSelect}
            onHover={setSelectedIndex}
          />
          <Section
            title="Quick links"
            results={filteredResults.quickLinks}
            selectedIndex={selectedIndex}
            startIndex={sectionStartIndices.quickLinks}
            searchQuery={searchQuery}
            onSelect={handleSelect}
            onHover={setSelectedIndex}
          />
          
          {allResults.length === 0 && (
            <div style={styles.emptyState}>
              <Icon name="search" size="l" color={brandColors.gray[40]} />
              <span style={styles.emptyText}>No results found</span>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Footer */}
        <div style={styles.shortcutsFooter}>
          <div style={styles.shortcutsRow}>
            {commandK.keyboardShortcuts.map((shortcut, index) => (
              <Shortcut key={index} keys={shortcut.keys} label={shortcut.label} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '80px 24px',
    backgroundColor: brandColors.gray[10],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  container: {
    width: '788px',
    height: '600px',
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    boxShadow: '0 24px 48px rgba(29, 35, 47, 0.16)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  
  // Search Header
  searchHeader: {
    padding: '12px 12px 8px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    backgroundColor: brandColors.white,
    position: 'sticky',
    top: 0,
    zIndex: 3,
  },
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    height: '40px',
    padding: '0 12px',
    backgroundColor: brandColors.white,
    borderRadius: '4px',
  },
  searchLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-0.064px',
    color: brandColors.gray[90],
    backgroundColor: 'transparent',
  },
  searchRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterHint: {
    fontSize: '12px',
    color: brandColors.gray[50],
    letterSpacing: '-0.072px',
  },

  // Context Filter
  contextFilter: {
    padding: '0 4px',
    marginTop: '12px',
  },
  contextFilterInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 8px',
    backgroundColor: '#f2f7ff',
    border: '1px solid #cedcf5',
    borderRadius: '8px',
    height: '32px',
  },
  contextFilterLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  contextFilterLabel: {
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[90],
    lineHeight: '20px',
  },
  contextFilterAction: {
    fontSize: '12px',
    color: brandColors.gray[50],
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
  },

  // Results List
  resultsList: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '8px 0',
  },

  // Section
  section: {
    marginBottom: '8px',
  },
  sectionHeader: {
    padding: '8px 12px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.gray[50],
    letterSpacing: '-0.072px',
    lineHeight: '18px',
  },

  // Result Card
  resultCard: {
    position: 'relative',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
  },
  resultCardBg: {
    position: 'absolute',
    top: '50%',
    left: '12px',
    right: '12px',
    height: '40px',
    transform: 'translateY(-50%)',
    backgroundColor: brandColors.white,
    borderRadius: '4px',
    zIndex: -1,
  },
  resultCardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  resultCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    minWidth: 0,
  },
  resultCardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    flexShrink: 0,
  },
  resultCardInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    minWidth: 0,
  },
  resultCardTitle: {
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[90],
    lineHeight: '20px',
    whiteSpace: 'nowrap',
  },
  resultCardMeta: {
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.gray[50],
    letterSpacing: '-0.072px',
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  resultCardType: {
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.gray[50],
    letterSpacing: '-0.072px',
    lineHeight: '18px',
    flexShrink: 0,
  },

  // Empty State
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    gap: '12px',
  },
  emptyText: {
    fontSize: '14px',
    color: brandColors.gray[50],
  },

  // Keyboard Shortcuts Footer
  shortcutsFooter: {
    padding: '8px 12px',
    backgroundColor: brandColors.gray[10],
    borderTop: `1px solid ${brandColors.gray[20]}`,
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
  },
  shortcutsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  shortcut: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  shortcutLabel: {
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.gray[50],
    letterSpacing: '-0.072px',
    lineHeight: '18px',
  },
  keyBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1px 4px',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: '15px',
    letterSpacing: '0.1172px',
  },

  // Closed State
  closedState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
  },
  reopenButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '8px',
    fontSize: '14px',
    color: brandColors.gray[60],
    cursor: 'pointer',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
};

export default CommandKModal;
