import React from 'react';
import { Icon } from '../../../components/icons';
import { colors, spacing, typography, borderRadius } from '../styles';

interface CommandSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

/**
 * CommandSearch Component
 * 
 * Search input for the command palette with filter hint.
 */
export const CommandSearch: React.FC<CommandSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search objects or navigate anywhere in Thoughtspot',
  autoFocus = true,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <Icon name="magnifying-glass" size="m" color={colors.iconDefault} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={styles.input}
          autoFocus={autoFocus}
        />
      </div>
      <div style={styles.filterHint}>
        <span style={styles.filterKey}>/</span>
        <span style={styles.filterText}>to filter</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderBottom: `1px solid ${colors.border}`,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 14,
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
    backgroundColor: 'transparent',
  },
  filterHint: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  filterKey: {
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
  filterText: {
    fontSize: 12,
    color: colors.textMuted,
  },
};

export default CommandSearch;
