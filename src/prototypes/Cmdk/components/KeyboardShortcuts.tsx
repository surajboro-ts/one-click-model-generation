import React from 'react';
import { colors, spacing, typography, borderRadius } from '../styles';

interface ShortcutItem {
  keys: string[];
  label: string;
}

interface KeyboardShortcutsProps {
  shortcuts: ShortcutItem[];
}

/**
 * KeyboardShortcuts Component
 * 
 * Bottom bar showing keyboard shortcuts for navigation.
 */
export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  shortcuts,
}) => {
  return (
    <div style={styles.container}>
      {shortcuts.map((shortcut, index) => (
        <div key={index} style={styles.shortcut}>
          <div style={styles.keys}>
            {shortcut.keys.map((key, keyIndex) => (
              <React.Fragment key={keyIndex}>
                <kbd style={styles.kbd}>{key}</kbd>
                {keyIndex < shortcut.keys.length - 1 && (
                  <span style={styles.plus}>+</span>
                )}
              </React.Fragment>
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
    gap: spacing.lg,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.modalBg,
    fontFamily: typography.fontFamily,
  },
  shortcut: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
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
    minWidth: 20,
    height: 20,
    padding: `0 ${spacing.xs}px`,
    backgroundColor: colors.kbdBg,
    border: `1px solid ${colors.kbdBorder}`,
    borderRadius: borderRadius.sm,
    fontSize: 11,
    fontFamily: typography.fontFamily,
    color: colors.kbdText,
  },
  plus: {
    fontSize: 10,
    color: colors.textMuted,
    margin: `0 2px`,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

export default KeyboardShortcuts;
