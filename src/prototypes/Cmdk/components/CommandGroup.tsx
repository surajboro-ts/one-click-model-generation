import React from 'react';
import { CommandItem } from './CommandItem';
import { colors, spacing, typography } from '../styles';
import type { CommandItemData } from '../data/mockData';

interface CommandGroupProps {
  title: string;
  items: CommandItemData[];
  selectedIndex?: number;
  onItemClick?: (item: CommandItemData) => void;
}

/**
 * CommandGroup Component
 * 
 * A group/section in the command palette (e.g., Recent, Create).
 */
export const CommandGroup: React.FC<CommandGroupProps> = ({
  title,
  items,
  selectedIndex,
  onItemClick,
}) => {
  if (items.length === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
      </div>
      <div style={styles.items}>
        {items.map((item, index) => (
          <CommandItem
            key={item.id}
            item={item}
            isSelected={selectedIndex === index}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: typography.fontFamily,
  },
  header: {
    padding: `${spacing.sm}px ${spacing.lg}px`,
  },
  title: {
    fontSize: 11,
    fontWeight: 500,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default CommandGroup;
