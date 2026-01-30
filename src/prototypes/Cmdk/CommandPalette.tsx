import React, { useState, useEffect, useCallback } from 'react';
import {
  CommandSearch,
  CommandGroup,
  KeyboardShortcuts,
} from './components';
import { colors, spacing, typography, shadows, borderRadius } from './styles';
import { commandGroups, keyboardShortcuts } from './data/mockData';
import type { CommandItemData } from './data/mockData';

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * CommandPalette - Command-K Interface
 * 
 * A command palette for quick navigation and actions.
 * Features:
 * - Global search
 * - Recent items
 * - Quick create actions
 * - Keyboard navigation
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen: controlledIsOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Sync with controlled prop
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Cmd/Ctrl + K to toggle
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }

    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        onClose?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        navigateDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        navigateUp();
        break;
      case 'Enter':
        event.preventDefault();
        handleSelect();
        break;
    }
  }, [isOpen, selectedGroupIndex, selectedItemIndex, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Filter items based on search query
  const filteredGroups = commandGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.context?.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  // Navigation helpers
  const navigateDown = () => {
    const currentGroup = filteredGroups[selectedGroupIndex];
    if (!currentGroup) return;

    if (selectedItemIndex < currentGroup.items.length - 1) {
      setSelectedItemIndex((prev) => prev + 1);
    } else if (selectedGroupIndex < filteredGroups.length - 1) {
      setSelectedGroupIndex((prev) => prev + 1);
      setSelectedItemIndex(0);
    }
  };

  const navigateUp = () => {
    if (selectedItemIndex > 0) {
      setSelectedItemIndex((prev) => prev - 1);
    } else if (selectedGroupIndex > 0) {
      const prevGroupIndex = selectedGroupIndex - 1;
      setSelectedGroupIndex(prevGroupIndex);
      setSelectedItemIndex(filteredGroups[prevGroupIndex].items.length - 1);
    }
  };

  const handleSelect = () => {
    const currentGroup = filteredGroups[selectedGroupIndex];
    if (!currentGroup) return;
    const selectedItem = currentGroup.items[selectedItemIndex];
    if (selectedItem) {
      console.log('Selected:', selectedItem);
      // Handle selection action here
    }
  };

  const handleItemClick = (item: CommandItemData) => {
    console.log('Clicked:', item);
    // Handle click action here
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Calculate global selected index for highlighting
  const getGlobalIndex = (groupIdx: number, itemIdx: number) => {
    let idx = 0;
    for (let g = 0; g < groupIdx; g++) {
      idx += filteredGroups[g]?.items.length || 0;
    }
    return idx + itemIdx;
  };

  // Store for potential future use
  const _currentGlobalIndex = getGlobalIndex(selectedGroupIndex, selectedItemIndex);
  void _currentGlobalIndex; // Suppress unused variable warning

  if (!isOpen) {
    return (
      <div style={styles.demoContainer}>
        <div style={styles.demoContent}>
          <h2 style={styles.demoTitle}>Command Palette Demo</h2>
          <p style={styles.demoText}>
            Press <kbd style={styles.demoKbd}>⌘</kbd> + <kbd style={styles.demoKbd}>K</kbd> to open the command palette
          </p>
          <button
            style={styles.demoButton}
            onClick={() => setIsOpen(true)}
          >
            Open Command Palette
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Search */}
        <CommandSearch
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Results */}
        <div style={styles.results}>
          {filteredGroups.map((group, groupIdx) => {
            return (
              <CommandGroup
                key={group.id}
                title={group.title}
                items={group.items}
                selectedIndex={
                  groupIdx === selectedGroupIndex ? selectedItemIndex : undefined
                }
                onItemClick={handleItemClick}
              />
            );
          })}

          {filteredGroups.length === 0 && (
            <div style={styles.noResults}>
              <p style={styles.noResultsText}>No results found</p>
            </div>
          )}
        </div>

        {/* Keyboard shortcuts */}
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
    backgroundColor: colors.overlay,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 100,
    zIndex: 1000,
    fontFamily: typography.fontFamily,
  },
  modal: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.modalBg,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.modal,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 200px)',
  },
  results: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  noResults: {
    padding: `${spacing.xl}px`,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  
  // Demo page styles
  demoContainer: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.fontFamily,
  },
  demoContent: {
    textAlign: 'center',
    padding: spacing.xl,
  },
  demoTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  demoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  demoKbd: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
    height: 24,
    padding: `0 ${spacing.sm}px`,
    backgroundColor: colors.kbdBg,
    border: `1px solid ${colors.kbdBorder}`,
    borderRadius: borderRadius.sm,
    fontSize: 12,
    fontFamily: typography.fontFamily,
    color: colors.kbdText,
    margin: `0 4px`,
  },
  demoButton: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: colors.iconBlue,
    color: colors.modalBg,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
};

export default CommandPalette;
