import React, { useState } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { colors, spacing, typography } from '../styles';
import type { CommandItemData } from '../data/mockData';

interface CommandItemProps {
  item: CommandItemData;
  isSelected?: boolean;
  onClick?: () => void;
}

/**
 * CommandItem Component
 * 
 * Individual item row in the command palette.
 * Shows icon, title, metadata, and action type.
 */
export const CommandItem: React.FC<CommandItemProps> = ({
  item,
  isSelected = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconColor = () => {
    switch (item.iconColor) {
      case 'blue':
        return colors.iconBlue;
      case 'purple':
        return colors.iconPurple;
      case 'green':
        return colors.iconGreen;
      case 'orange':
        return colors.iconOrange;
      default:
        return colors.iconDefault;
    }
  };

  const getIconName = (): IconName => {
    switch (item.icon) {
      case 'chart':
        return 'funnel';
      case 'star':
        return 'star';
      case 'folder':
        return 'folder';
      case 'play':
        return 'play';
      case 'plus':
        return 'plus';
      default:
        return 'folder';
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isSelected
          ? colors.selectedBg
          : isHovered
          ? colors.hoverBg
          : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Icon */}
      <div style={styles.iconWrapper}>
        <Icon name={getIconName()} size="s" color={getIconColor()} />
      </div>

      {/* Content */}
      <div style={styles.content}>
        <span style={styles.title}>
          {item.title}
          {item.titleHighlight && (
            <span style={styles.titleHighlight}> {item.titleHighlight}</span>
          )}
          {item.context && (
            <span style={styles.titleContext}> by Region</span>
          )}
        </span>
        
        {(item.context || item.author) && (
          <span style={styles.metadata}>
            {item.context && <span>{item.context}</span>}
            {item.author && <span style={styles.author}>{item.author}</span>}
          </span>
        )}
      </div>

      {/* Right section: action buttons and type */}
      <div style={styles.rightSection}>
        {/* Action icons (only show on hover) */}
        {isHovered && (item.hasChat || item.hasMenu) && (
          <div style={styles.actionIcons}>
            {item.hasChat && (
              <button style={styles.actionButton}>
                <Icon name="star" size="s" color={colors.iconDefault} />
              </button>
            )}
            {item.hasMenu && (
              <button style={styles.actionButton}>
                <Icon name="more" size="s" color={colors.iconDefault} />
              </button>
            )}
          </div>
        )}
        
        {/* Action type label */}
        <span style={styles.actionType}>{item.actionType}</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.sm}px ${spacing.lg}px`,
    cursor: 'pointer',
    transition: 'background-color 100ms ease',
    fontFamily: typography.fontFamily,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  titleHighlight: {
    fontWeight: 600,
    color: colors.textPrimary,
  },
  titleContext: {
    fontWeight: 400,
    color: colors.textPrimary,
  },
  metadata: {
    fontSize: 12,
    color: colors.textSecondary,
    display: 'flex',
    gap: spacing.sm,
  },
  author: {
    color: colors.textMuted,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    marginLeft: spacing.lg,
  },
  actionIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  actionType: {
    fontSize: 12,
    color: colors.textSecondary,
    whiteSpace: 'nowrap',
  },
};

export default CommandItem;
