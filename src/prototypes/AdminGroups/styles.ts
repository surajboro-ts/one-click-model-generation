import { CSSProperties } from 'react';
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';

/**
 * Styles for Admin Groups prototype
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
    width: '240px',
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

// App Header styles
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

// Admin sidebar styles
export const sidebarStyles = {
  container: {
    padding: `${spacing.D}px 0`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as CSSProperties,

  header: {
    padding: `${spacing.C}px ${spacing.D}px`,
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    marginBottom: `${spacing.C}px`,
  } as CSSProperties,

  headerTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.B}px`,
  } as CSSProperties,

  toggleContainer: {
    display: 'flex',
    backgroundColor: brandColors.gray[10],
    borderRadius: '6px',
    padding: '2px',
    gap: '2px',
  } as CSSProperties,

  toggleButton: {
    flex: 1,
    padding: `${spacing.B}px ${spacing.C}px`,
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.gray[60],
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  } as CSSProperties,

  toggleButtonActive: {
    backgroundColor: brandColors.white,
    color: brandColors.gray[90],
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
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
    padding: `${spacing.B}px ${spacing.D}px`,
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

  navItemNested: {
    paddingLeft: `${spacing.F}px`,
  } as CSSProperties,
};

// Page header styles
export const pageHeaderStyles = {
  container: {
    marginBottom: `${spacing.D}px`,
  } as CSSProperties,

  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    fontSize: '13px',
    color: brandColors.gray[50],
    marginBottom: `${spacing.B}px`,
  } as CSSProperties,

  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
    marginBottom: `${spacing.D}px`,
    letterSpacing: '-0.3px',
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
};

// Modal styles - M2 pattern from Figma
export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 35, 47, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as CSSProperties,

  container: {
    width: '600px',
    maxHeight: '90vh',
    backgroundColor: brandColors.white,
    borderRadius: '6px',
    boxShadow: '0px 24px 32px rgba(25, 35, 49, 0.16), 0px 0px 4px rgba(25, 35, 49, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as CSSProperties,

  header: {
    padding: `${spacing.E}px ${spacing.F}px`,
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  } as CSSProperties,

  contextLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[50],
    marginBottom: `${spacing.A}px`,
  } as CSSProperties,

  stepTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    letterSpacing: '-0.4px',
    margin: 0,
  } as CSSProperties,

  content: {
    flex: 1,
    padding: `${spacing.F}px`,
    overflowY: 'auto',
    minHeight: '400px',
  } as CSSProperties,

  progressContainer: {
    display: 'flex',
    gap: '6px',
    height: '4px',
  } as CSSProperties,

  progressSegment: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    backgroundColor: brandColors.gray[20],
    transition: 'background-color 0.2s ease',
  } as CSSProperties,

  progressSegmentActive: {
    backgroundColor: brandColors.blue[60],
  } as CSSProperties,

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.E}px ${spacing.F}px`,
    backgroundColor: brandColors.gray[10],
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
  } as CSSProperties,

  cancelButton: {
    background: 'none',
    border: 'none',
    color: brandColors.blue[60],
    fontSize: '14px',
    fontWeight: 400,
    cursor: 'pointer',
    padding: `6px ${spacing.A}px`,
    borderRadius: '6px',
  } as CSSProperties,

  buttonGroup: {
    display: 'flex',
    gap: `${spacing.D}px`,
  } as CSSProperties,

  backButton: {
    backgroundColor: brandColors.gray[20],
    color: brandColors.gray[90],
    border: 'none',
    padding: `6px ${spacing.D}px`,
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 400,
    cursor: 'pointer',
    height: '32px',
  } as CSSProperties,

  nextButton: {
    backgroundColor: brandColors.blue[60],
    color: brandColors.white,
    border: 'none',
    padding: `6px ${spacing.D}px`,
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 400,
    cursor: 'pointer',
    height: '32px',
  } as CSSProperties,

  nextButtonDisabled: {
    backgroundColor: brandColors.gray[30],
    cursor: 'not-allowed',
  } as CSSProperties,
};

// Org select list styles
export const orgSelectStyles = {
  sectionLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.C}px`,
    letterSpacing: '-0.4px',
  } as CSSProperties,

  searchContainer: {
    marginBottom: `${spacing.C}px`,
  } as CSSProperties,

  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: `${spacing.B}px`,
  } as CSSProperties,

  countLabel: {
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.gray[90],
    letterSpacing: '-0.6px',
  } as CSSProperties,

  actionLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
  } as CSSProperties,

  actionLink: {
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.blue[60],
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  } as CSSProperties,

  divider: {
    width: '1px',
    height: '18px',
    backgroundColor: brandColors.gray[20],
  } as CSSProperties,

  listContainer: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: brandColors.white,
  } as CSSProperties,

  listScroll: {
    maxHeight: '276px',
    overflowY: 'auto',
    padding: `${spacing.C}px ${spacing.D}px`,
  } as CSSProperties,

  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
    padding: `${spacing.B}px 0`,
  } as CSSProperties,

  listItemLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[90],
  } as CSSProperties,

  toggleFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    borderTop: `1px solid ${brandColors.gray[20]}`,
    backgroundColor: brandColors.white,
  } as CSSProperties,

  toggleLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[90],
  } as CSSProperties,
};

// Form step styles
export const formStyles = {
  fieldGroup: {
    marginBottom: `${spacing.E}px`,
  } as CSSProperties,

  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
    marginBottom: `${spacing.B}px`,
    display: 'block',
  } as CSSProperties,

  required: {
    color: brandColors.red[60],
  } as CSSProperties,

  helperText: {
    fontSize: '12px',
    color: brandColors.gray[50],
    marginTop: `${spacing.A}px`,
  } as CSSProperties,
};

// Role assignment styles
export const roleAssignStyles = {
  description: {
    fontSize: '14px',
    color: brandColors.gray[60],
    marginBottom: `${spacing.D}px`,
  } as CSSProperties,

  bulkAction: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: brandColors.gray[10],
    borderRadius: '6px',
    marginBottom: `${spacing.D}px`,
  } as CSSProperties,

  bulkLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  } as CSSProperties,

  tableContainer: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '6px',
    overflow: 'hidden',
  } as CSSProperties,

  tableHeader: {
    display: 'flex',
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: brandColors.gray[10],
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    fontSize: '12px',
    fontWeight: 600,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  } as CSSProperties,

  tableRow: {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.C}px ${spacing.D}px`,
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  } as CSSProperties,

  orgName: {
    flex: 1,
    fontSize: '14px',
    color: brandColors.gray[90],
  } as CSSProperties,

  roleSelect: {
    width: '180px',
  } as CSSProperties,
};

// Users & parent step styles
export const usersParentStyles = {
  section: {
    marginBottom: `${spacing.F}px`,
  } as CSSProperties,

  sectionTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
    marginBottom: `${spacing.B}px`,
  } as CSSProperties,

  sectionDescription: {
    fontSize: '13px',
    color: brandColors.gray[50],
    marginBottom: `${spacing.C}px`,
  } as CSSProperties,

  selectedUsers: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: `${spacing.B}px`,
    marginTop: `${spacing.C}px`,
  } as CSSProperties,
};
