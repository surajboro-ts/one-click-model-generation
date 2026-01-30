import React from 'react';
import { Icon } from '../../../components/icons';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { Avatar } from '../../../components/Avatar';
import { Tooltip } from '../../../components/Tooltip';
import { colors, spacing, typography } from '../styles';
import { navigationTabs, userProfile } from '../data/mockData';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onStylingClick?: () => void;
  onMenuClick?: () => void;
}

/**
 * Header Component
 * 
 * Top navigation header with logo, title, tabs, search, and user profile.
 * Based on the Figma design for TSE Business Overview.
 * 
 * Figma Reference: Top header bar with navigation
 * Radiant Components Used:
 * - Icon: For all icons (hamburger, status, actions)
 * - SearchInput: Search field in header
 * - Button: AI highlights button
 * - Avatar: User profile avatar
 * - Tooltip: Icon button tooltips
 */
export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  onStylingClick,
  onMenuClick,
}) => {
  return (
    <header style={styles.header}>
      {/* Left section: Logo and title */}
      <div style={styles.leftSection}>
        <Tooltip content="Open navigation menu" placement="bottom">
          <button style={styles.menuButton} onClick={onMenuClick}>
            <Icon name="hamburger" size="m" color={colors.textOnDark} />
          </button>
        </Tooltip>
        
        <div style={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h7v7H4V4z" fill="#48D1E0" />
            <path d="M13 4h7v7h-7V4z" fill="#2770EF" />
            <path d="M4 13h7v7H4v-7z" fill="#2770EF" />
            <path d="M13 13h7v7h-7v-7z" fill="#48D1E0" />
          </svg>
        </div>

        <div style={styles.titleSection}>
          <div style={styles.titleRow}>
            <Icon name="checkmark-circle" size="s" color="#06BF7F" />
            <h1 style={styles.title}>TSE Business Overview</h1>
            <div style={styles.statusIcons}>
              <Tooltip content="Visible to all" placement="bottom">
                <span style={styles.statusIcon}>
                  <Icon name="eye" size="xs" color={colors.textMuted} />
                </span>
              </Tooltip>
              <Tooltip content="Pinned" placement="bottom">
                <span style={styles.statusIcon}>
                  <Icon name="pin" size="xs" color={colors.textMuted} />
                </span>
              </Tooltip>
              <Tooltip content="Last updated" placement="bottom">
                <span style={styles.statusIcon}>
                  <Icon name="clock" size="xs" color={colors.textMuted} />
                </span>
              </Tooltip>
              <span style={styles.timestamp}>59m ago</span>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav style={styles.tabsNav}>
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {}),
              }}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right section: Search and actions */}
      <div style={styles.rightSection}>
        <div style={styles.searchWrapper}>
          <SearchInput
            placeholder="Search in your library"
            style={{ width: 200, backgroundColor: 'rgba(255,255,255,0.1)' }}
          />
        </div>

        <Button
          variant="primary"
          size="small"
          style={{
            backgroundColor: colors.purple,
            border: 'none',
          }}
        >
          <Icon name="star" size="s" color={colors.textOnDark} />
          AI highlights
        </Button>

        <Tooltip content="Help" placement="bottom">
          <button style={styles.iconButton}>
            <Icon name="question-mark" size="s" color={colors.textOnDark} />
          </button>
        </Tooltip>

        <Tooltip content="Notifications" placement="bottom">
          <button style={styles.iconButton}>
            <div style={styles.notificationBadge}>
              <Icon name="exclamation-point-circle" size="s" color={colors.textOnDark} />
              <span style={styles.badge} />
            </div>
          </button>
        </Tooltip>

        {/* User profile with Avatar component */}
        <button style={styles.profileButton}>
          <span style={styles.profileName}>{userProfile.name}</span>
          <Icon name="chevron-down" size="xs" color={colors.textOnDark} />
          <Avatar
            name={userProfile.name}
            size="s"
          />
        </button>

        <Tooltip content="Share" placement="bottom">
          <button style={styles.iconButton}>
            <Icon name="upload" size="s" color={colors.textOnDark} />
          </button>
        </Tooltip>

        {/* Styling button */}
        <Tooltip content="Styling settings" placement="bottom">
          <button 
            style={styles.iconButton}
            onClick={onStylingClick}
          >
            <Icon name="cog" size="s" color={colors.textOnDark} />
          </button>
        </Tooltip>

        <Tooltip content="More options" placement="bottom">
          <button style={styles.iconButton}>
            <Icon name="more" size="s" color={colors.textOnDark} />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.headerBg,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    height: 56,
    fontFamily: typography.fontFamily,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuButton: {
    background: 'none',
    border: 'none',
    padding: spacing.xs,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    transition: 'background-color 150ms ease',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textOnDark,
    margin: 0,
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    marginLeft: spacing.sm,
  },
  statusIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  tabsNav: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    marginLeft: spacing.xl,
  },
  tab: {
    background: 'none',
    border: 'none',
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: 13,
    fontWeight: 500,
    color: colors.textMuted,
    cursor: 'pointer',
    borderRadius: 4,
    transition: 'all 150ms ease',
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: colors.textOnDark,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  searchWrapper: {
    position: 'relative',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    padding: spacing.sm,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    transition: 'background-color 150ms ease',
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: colors.negative,
    borderRadius: '50%',
    border: `2px solid ${colors.headerBg}`,
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    background: 'none',
    border: 'none',
    padding: `${spacing.xs}px ${spacing.sm}px`,
    cursor: 'pointer',
    borderRadius: 4,
  },
  profileName: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.textOnDark,
  },
};

export default Header;
