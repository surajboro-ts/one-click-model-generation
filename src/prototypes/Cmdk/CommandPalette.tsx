/**
 * CommandPalette - Main Component
 * 
 * Command palette with context-aware filtering and multiple UI variants.
 * 
 * Features:
 * - Type "/" to show filter options
 * - Context-aware filter ranking
 * - Keyboard navigation
 * - Multiple ResultCard variants
 * 
 * Fixed dimensions: 624px x 540px (matches Figma spec)
 */

import React, { useState, useEffect, useCallback, useRef, useMemo, ComponentType } from 'react';
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';
import { CommandSearch } from './components/CommandSearch';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { FilterOptions } from './components/FilterOptions';
import { ResultCard } from './components/ResultCard';
import {
  allItems,
  commandGroups,
  keyboardShortcuts,
  getItemsByFilter,
  getRankedFilterOptions,
} from './data/mockData';
import type {
  CommandItem,
  FilterOption,
  CommandPaletteProps,
  ResultCardProps,
  PageContext,
} from './types';

// Modal dimensions (fixed)
const MODAL_WIDTH = 624;
const MODAL_HEIGHT = 540;

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelect,
  onFilterSelect,
  ResultCardComponent = ResultCard,
  context = 'default',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get ranked filter options based on context
  const rankedFilterOptions = useMemo(
    () => getRankedFilterOptions(context),
    [context]
  );

  // Determine if showing filter mode (when "/" is typed)
  const isFilterMode = searchQuery.startsWith('/') && !activeFilter;
  const filterQuery = isFilterMode ? searchQuery.slice(1) : '';

  // Get filtered items based on search and active filter
  const filteredItems = useMemo(() => {
    let items: CommandItem[];

    if (activeFilter) {
      // Filter by active filter type
      items = getItemsByFilter(activeFilter.filterType);
    } else if (isFilterMode) {
      // Don't show items in filter mode
      return [];
    } else {
      // Show default groups
      items = commandGroups.flatMap(g => g.items);
    }

    // Apply text search
    if (searchQuery && !isFilterMode) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.label.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.context?.toLowerCase().includes(query)
      );
    }

    return items;
  }, [searchQuery, activeFilter, isFilterMode]);

  // Group items by their group property
  const groupedItems = useMemo(() => {
    if (isFilterMode) return [];
    
    const groups: { title: string; items: CommandItem[] }[] = [];
    const groupMap = new Map<string, CommandItem[]>();

    filteredItems.forEach(item => {
      const existing = groupMap.get(item.group);
      if (existing) {
        existing.push(item);
      } else {
        groupMap.set(item.group, [item]);
      }
    });

    groupMap.forEach((items, title) => {
      groups.push({ title, items });
    });

    return groups;
  }, [filteredItems, isFilterMode]);

  // Flatten items for navigation
  const flatItems = useMemo(() => {
    if (isFilterMode) {
      return rankedFilterOptions.filter(opt =>
        opt.label.toLowerCase().includes(filterQuery.toLowerCase())
      );
    }
    return filteredItems;
  }, [isFilterMode, rankedFilterOptions, filterQuery, filteredItems]);

  // Reset selection when items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [flatItems.length, activeFilter, isFilterMode]);

  // Scroll selected item into view
  useEffect(() => {
    if (contentRef.current && selectedIndex >= 0) {
      const selected = contentRef.current.querySelector('[aria-selected="true"]');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setActiveFilter(null);
      setSelectedIndex(0);
      setShowFilterOptions(false);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;

        case 'Enter':
          e.preventDefault();
          if (isFilterMode && flatItems[selectedIndex]) {
            // Select filter
            const filter = flatItems[selectedIndex] as FilterOption;
            setActiveFilter(filter);
            setSearchQuery('');
            onFilterSelect?.(filter);
          } else if (flatItems[selectedIndex]) {
            // Select item
            onSelect?.(flatItems[selectedIndex] as CommandItem);
          }
          break;

        case 'Escape':
          e.preventDefault();
          if (activeFilter) {
            setActiveFilter(null);
          } else if (searchQuery) {
            setSearchQuery('');
          } else {
            onClose();
          }
          break;

        case 'Backspace':
          // Clear filter when backspace on empty input
          if (searchQuery === '' && activeFilter) {
            setActiveFilter(null);
          }
          break;
      }
    },
    [isOpen, flatItems, selectedIndex, isFilterMode, activeFilter, searchQuery, onClose, onSelect, onFilterSelect]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle filter selection
  const handleFilterSelect = (filter: FilterOption) => {
    setActiveFilter(filter);
    setSearchQuery('');
    onFilterSelect?.(filter);
  };

  // Handle clear filter
  const handleClearFilter = () => {
    setActiveFilter(null);
    inputRef.current?.focus();
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  // Handle item click
  const handleItemClick = (item: CommandItem) => {
    onSelect?.(item);
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Render current index tracker for items
  let currentItemIndex = 0;

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Search Header */}
        <CommandSearch
          value={searchQuery}
          onChange={setSearchQuery}
          activeFilter={activeFilter}
          onClearFilter={handleClearFilter}
          onClear={handleClearSearch}
          inputRef={inputRef}
          autoFocus
        />

        {/* Content Area */}
        <div ref={contentRef} style={styles.content}>
          {/* Filter Options Mode */}
          {isFilterMode && (
            <FilterOptions
              options={rankedFilterOptions}
              selectedIndex={selectedIndex}
              onSelect={handleFilterSelect}
              query={filterQuery}
            />
          )}

          {/* Results Mode */}
          {!isFilterMode && groupedItems.length > 0 && (
            <>
              {groupedItems.map(group => (
                <div key={group.title} style={styles.group}>
                  <div style={styles.groupHeader}>{group.title}</div>
                  {group.items.map(item => {
                    const itemIndex = currentItemIndex++;
                    return (
                      <ResultCardComponent
                        key={item.id}
                        item={item}
                        isSelected={itemIndex === selectedIndex}
                        onClick={() => handleItemClick(item)}
                        query={searchQuery}
                      />
                    );
                  })}
                </div>
              ))}
            </>
          )}

          {/* Empty State */}
          {!isFilterMode && groupedItems.length === 0 && searchQuery && (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <KeyboardShortcuts shortcuts={keyboardShortcuts} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 35, 47, 0.5)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 80,
    zIndex: 1000,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  modal: {
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    backgroundColor: brandColors.white,
    borderRadius: 12,
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  group: {
    paddingTop: `${spacing.A}px`, // 4px
  },
  groupHeader: {
    padding: `${spacing.D}px ${spacing.D}px ${spacing.B}px`, // 16px 16px 8px
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: brandColors.gray[60], // #777E8B
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: 200,
    padding: `${spacing.H}px`,
  },
  emptyText: {
    fontSize: 14,
    color: brandColors.gray[50],
    textAlign: 'center',
  },
};

export default CommandPalette;
