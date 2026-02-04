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
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.D}px`, // 16px
    height: 34,
    padding: `${spacing.B}px ${spacing.C}px`, // 8px 12px
    borderTop: `1px solid ${brandColors.gray[20]}`, // #EAEDF2
    backgroundColor: brandColors.gray[10], // #F6F8FA
    flexShrink: 0,
  },
  shortcut: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
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
    padding: '0 4px',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[30]}`, // #DBDFE7
    borderRadius: 3,
    fontSize: 11,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
    color: brandColors.gray[60], // #777E8B
    boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
  },
  label: {
    fontSize: 12,
    color: brandColors.gray[60], // #777E8B
    letterSpacing: '-0.072px',
  },
};

export default KeyboardShortcuts;
