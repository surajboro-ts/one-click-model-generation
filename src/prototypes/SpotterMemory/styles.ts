import { CSSProperties } from 'react';
import { brandColors } from '../../tokens/colors/brand';
import { spacing, componentSpacing } from '../../tokens/spacing';

/**
 * Styles for Spotter Memory prototype
 * Using CSS-in-JS for prototype-specific styling
 * Following Radiant design tokens and content guidelines
 */

export const styles = {
  // Main layout
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: brandColors.gray[10],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as CSSProperties,

  // Header area
  header: {
    flexShrink: 0,
    zIndex: 100,
  } as CSSProperties,

  // Body area (sidebar + main)
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  } as CSSProperties,

  // Sidebar
  sidebar: {
    width: '220px',
    flexShrink: 0,
    backgroundColor: brandColors.white,
    borderRight: `1px solid ${brandColors.gray[20]}`,
    overflowY: 'auto',
  } as CSSProperties,

  // Main content area
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: `${spacing.F}px ${spacing.H}px`,
    backgroundColor: brandColors.white,
  } as CSSProperties,

  // Content container
  content: {
    maxWidth: '1200px',
  } as CSSProperties,
};

// App Header styles - matching Liveboard header pattern
export const headerStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    padding: `0 ${spacing.F}px`,
    backgroundColor: brandColors.gray[90],
    color: brandColors.white,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as CSSProperties,

  left: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.D}px`,
  } as CSSProperties,

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    color: brandColors.white,
    fontWeight: 600,
    fontSize: '16px',
  } as CSSProperties,

  iconTabs: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.A}px`,
    marginLeft: `${spacing.C}px`,
    padding: `${spacing.A}px`,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '6px',
  } as CSSProperties,

  iconTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.6)',
    transition: 'all 0.15s ease',
  } as CSSProperties,

  iconTabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: brandColors.white,
  } as CSSProperties,

  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    margin: '0 auto',
  } as CSSProperties,

  searchContainer: {
    width: '100%',
    maxWidth: '280px',
  } as CSSProperties,

  searchInput: {
    width: '100%',
    height: '36px',
    padding: `0 ${spacing.C}px`,
    paddingLeft: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    color: brandColors.white,
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.15s ease',
  } as CSSProperties,

  right: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.D}px`,
  } as CSSProperties,

  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.15s ease',
    position: 'relative',
  } as CSSProperties,

  notificationDot: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '8px',
    height: '8px',
    backgroundColor: brandColors.red[60],
    borderRadius: '50%',
    border: `2px solid ${brandColors.gray[90]}`,
  } as CSSProperties,
};

// Navigation sidebar styles - matching proper spacing from componentSpacing
export const sidebarStyles = {
  container: {
    padding: `${spacing.C}px 0`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as CSSProperties,

  section: {
    padding: `${spacing.B}px ${spacing.D}px`,
  } as CSSProperties,

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.C}px ${spacing.D}px`,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    borderRadius: '0',
  } as CSSProperties,

  sectionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: brandColors.gray[90],
    letterSpacing: '-0.1px',
  } as CSSProperties,

  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: brandColors.gray[50],
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    padding: `${spacing.D}px ${spacing.D}px ${spacing.B}px`,
    marginTop: `${spacing.B}px`,
  } as CSSProperties,

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    padding: `${spacing.B}px ${spacing.D}px ${spacing.B}px ${spacing.F}px`,
    fontSize: '13px',
    color: brandColors.gray[70],
    cursor: 'pointer',
    borderLeft: '3px solid transparent',
    transition: 'all 0.15s ease',
    lineHeight: 1.4,
  } as CSSProperties,

  navItemActive: {
    color: brandColors.blue[60],
    backgroundColor: `${brandColors.blue[60]}08`,
    borderLeftColor: brandColors.blue[60],
    fontWeight: 500,
  } as CSSProperties,

  navItemHover: {
    backgroundColor: brandColors.gray[10],
  } as CSSProperties,

  externalLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: brandColors.gray[50],
  } as CSSProperties,
};

// Page header styles
export const pageHeaderStyles = {
  container: {
    marginBottom: `${spacing.D}px`,
  } as CSSProperties,

  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
    marginBottom: `${spacing.B}px`,
    letterSpacing: '-0.2px',
  } as CSSProperties,

  description: {
    fontSize: '14px',
    color: brandColors.gray[60],
    margin: 0,
    marginBottom: `${spacing.D}px`,
    lineHeight: 1.5,
    maxWidth: '720px',
  } as CSSProperties,

  tabs: {
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  } as CSSProperties,
};

// Toolbar styles
export const toolbarStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: `${spacing.D}px`,
    marginBottom: `${spacing.D}px`,
    gap: `${spacing.D}px`,
  } as CSSProperties,

  searchWrapper: {
    width: '260px',
  } as CSSProperties,
};

// Table styles
export const tableStyles = {
  container: {
    backgroundColor: brandColors.white,
    borderRadius: '8px',
    border: `1px solid ${brandColors.gray[20]}`,
    overflow: 'hidden',
  } as CSSProperties,

  linkCell: {
    color: brandColors.blue[60],
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '13px',
  } as CSSProperties,

  authorCell: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
  } as CSSProperties,

  modelsCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'wrap',
  } as CSSProperties,

  moreLink: {
    color: brandColors.blue[60],
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
  } as CSSProperties,

  actionsCell: {
    display: 'flex',
    justifyContent: 'flex-end',
  } as CSSProperties,

  moreButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: brandColors.gray[50],
    transition: 'background-color 0.15s ease',
  } as CSSProperties,

  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `${spacing.C}px ${spacing.D}px`,
    borderTop: `1px solid ${brandColors.gray[20]}`,
    gap: `${spacing.C}px`,
  } as CSSProperties,

  paginationText: {
    fontSize: '13px',
    color: brandColors.gray[60],
  } as CSSProperties,

  paginationLink: {
    fontSize: '13px',
    color: brandColors.blue[60],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 500,
  } as CSSProperties,
};
