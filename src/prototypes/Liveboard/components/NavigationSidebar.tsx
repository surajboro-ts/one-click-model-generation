import React from 'react';
import { Icon, IconName } from '../../../components/icons';
import { Tooltip } from '../../../components/Tooltip';
import { Divider } from '../../../components/Divider';
import { colors, spacing, typography } from '../styles';

export interface NavMenuItem {
  id: string;
  label: string;
  icon: IconName;
  badge?: string;
}

interface NavigationSidebarProps {
  isOpen: boolean;
  activeItem: string;
  onItemClick: (itemId: string) => void;
  onClose: () => void;
}

/**
 * NavigationSidebar Component
 * 
 * Collapsible navigation sidebar for the Liveboard application.
 * Based on ThoughtSpot navigation structure.
 * 
 * Figma Reference: Left navigation panel with menu items
 * Radiant Components Used: Icon, Tooltip, Divider
 */
export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  isOpen,
  activeItem,
  onItemClick,
  onClose,
}) => {
  // Navigation menu items based on ThoughtSpot structure
  const primaryNavItems: NavMenuItem[] = [
    { id: 'home', label: 'Home', icon: 'profile' },
    { id: 'liveboards', label: 'Liveboards', icon: 'funnel' },
    { id: 'answers', label: 'Answers', icon: 'magnifying-glass' },
    { id: 'spotiq', label: 'SpotIQ', icon: 'star' },
    { id: 'monitor', label: 'Monitor', icon: 'eye' },
  ];

  const secondaryNavItems: NavMenuItem[] = [
    { id: 'data', label: 'Data', icon: 'folder' },
    { id: 'admin', label: 'Admin', icon: 'cog' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay backdrop */}
      <div style={styles.overlay} onClick={onClose} />
      
      {/* Sidebar panel */}
      <aside style={styles.sidebar}>
        {/* Logo and close button */}
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h7v7H4V4z" fill="#48D1E0" />
              <path d="M13 4h7v7h-7V4z" fill="#2770EF" />
              <path d="M4 13h7v7H4v-7z" fill="#2770EF" />
              <path d="M13 13h7v7h-7v-7z" fill="#48D1E0" />
            </svg>
            <span style={styles.logoText}>ThoughtSpot</span>
          </div>
          <Tooltip content="Close menu" placement="right">
            <button style={styles.closeButton} onClick={onClose}>
              <Icon name="cross" size="s" color={colors.textSecondary} />
            </button>
          </Tooltip>
        </div>

        {/* Primary navigation */}
        <nav style={styles.nav}>
          {primaryNavItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </nav>

        <div style={styles.dividerWrapper}>
          <Divider spacing="s" />
        </div>

        {/* Secondary navigation */}
        <nav style={styles.nav}>
          {secondaryNavItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </nav>

        {/* Footer with user info */}
        <div style={styles.footer}>
          <Divider spacing="s" />
          <button style={styles.footerItem}>
            <Icon name="question-mark" size="s" color={colors.textSecondary} />
            <span style={styles.footerLabel}>Help</span>
          </button>
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  item: NavMenuItem;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick }) => {
  return (
    <button
      style={{
        ...styles.navItem,
        ...(isActive ? styles.navItemActive : {}),
      }}
      onClick={onClick}
    >
      <Icon
        name={item.icon}
        size="s"
        color={isActive ? colors.accent : colors.textSecondary}
      />
      <span
        style={{
          ...styles.navItemLabel,
          ...(isActive ? styles.navItemLabelActive : {}),
        }}
      >
        {item.label}
      </span>
      {item.badge && (
        <span style={styles.badge}>{item.badge}</span>
      )}
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 240,
    height: '100vh',
    backgroundColor: colors.cardBg,
    boxShadow: '4px 0 16px rgba(0, 0, 0, 0.12)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: typography.fontFamily,
    animation: 'slideIn 200ms ease-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.lg}px ${spacing.md}px`,
    borderBottom: `1px solid ${colors.border}`,
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    padding: 0,
    border: 'none',
    background: 'transparent',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing.sm}px 0`,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md}px ${spacing.lg}px`,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: typography.fontFamily,
    fontSize: 14,
    textAlign: 'left',
    transition: 'background-color 150ms ease',
    width: '100%',
  },
  navItemActive: {
    backgroundColor: `${colors.accent}10`,
    borderRight: `3px solid ${colors.accent}`,
  },
  navItemLabel: {
    color: colors.textSecondary,
    fontWeight: 400,
  },
  navItemLabelActive: {
    color: colors.accent,
    fontWeight: 500,
  },
  badge: {
    marginLeft: 'auto',
    padding: `${spacing.xs}px ${spacing.sm}px`,
    backgroundColor: colors.accent,
    color: colors.textOnDark,
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 10,
  },
  dividerWrapper: {
    padding: `0 ${spacing.lg}px`,
  },
  footer: {
    marginTop: 'auto',
    padding: `${spacing.md}px 0`,
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md}px ${spacing.lg}px`,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: typography.fontFamily,
    fontSize: 14,
    width: '100%',
  },
  footerLabel: {
    color: colors.textSecondary,
  },
};

export default NavigationSidebar;
