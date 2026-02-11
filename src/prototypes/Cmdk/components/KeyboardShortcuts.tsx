/**
 * KeyboardShortcuts Component
 * 
 * Footer bar showing keyboard shortcuts.
 * 
 * Matches Figma specs:
 * - Height: 34px
 * - Background: #f6f8fa
 * - Border top: 1px solid #eaedf2
 * - Padding: px-12 py-8
 */

import React from 'react';
import { brandColors } from '../../../tokens/colors/brand';
import { spacing } from '../../../tokens/spacing';
import type { KeyboardShortcut } from '../types';

interface KeyboardShortcutsProps {
  /** Array of keyboard shortcuts to display */
  shortcuts: KeyboardShortcut[];
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  shortcuts,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.shortcutsRow}>
        {shortcuts.map((shortcut, index) => (
          <div key={index} style={styles.shortcut}>
            <div style={styles.keys}>
              {shortcut.keys.map((key, keyIndex) => (
                <kbd key={keyIndex} style={styles.kbd}>{key}</kbd>
              ))}
            </div>
            <span style={styles.label}>{shortcut.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 34,
    padding: `${spacing.B}px ${spacing.C}px`, // 8px 12px
    borderTop: `1px solid ${brandColors.gray[20]}`, // #EAEDF2
    backgroundColor: brandColors.gray[10], // #F6F8FA
    flexShrink: 0,
  },
  shortcutsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`, // 12px
  },
  shortcut: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
  },
  keys: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  kbd: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    height: 18,
    padding: '1px 4px',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[30]}`, // #DBDFE7 -> matches #e5e7eb
    borderRadius: 4,
    fontSize: 10,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: 400,
    letterSpacing: '0.1172px',
    lineHeight: '15px',
    color: '#6a7282',
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    color: brandColors.gray[50], // #A5ACB9
    letterSpacing: '-0.072px',
    lineHeight: '18px',
  },
};

export default KeyboardShortcuts;
