import React from 'react';
import { Button } from '../../../components/Button';
import { Toggle } from '../../../components/Toggle';
import { Checkbox } from '../../../components/Checkbox';
import { OptionButtonGroup } from './OptionButtonGroup';
import { colors, spacing, typography, shadows } from '../styles';

export interface StylingSettings {
  colorEnabled: boolean;
  density: 'compact' | 'comfortable' | 'spacious';
  cornerRadius: 'square' | 'rounded';
  spacing: 'tight' | 'normal';
  groupTitle: boolean;
  groupDescription: boolean;
  tilesDescription: boolean;
  tileDescription: boolean;
}

interface StylingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  settings: StylingSettings;
  onSettingsChange: (settings: StylingSettings) => void;
}

/**
 * StylingPanel Component
 * 
 * A slide-in panel from the right for customizing Liveboard styling.
 * Contains settings for Liveboard, Group, and Tile appearance.
 */
export const StylingPanel: React.FC<StylingPanelProps> = ({
  isOpen,
  onClose,
  onSave,
  settings,
  onSettingsChange,
}) => {
  const updateSetting = <K extends keyof StylingSettings>(
    key: K,
    value: StylingSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  // Density options with custom grid icons
  const densityOptions = [
    {
      id: 'compact',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'comfortable',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'spacious',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="4" cy="4" r="1.5" fill="currentColor" />
          <circle cx="8" cy="4" r="1.5" fill="currentColor" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="4" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
          <circle cx="4" cy="12" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  // Corner radius options
  const cornerRadiusOptions = [
    {
      id: 'square',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3h10v10H3V3z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'rounded',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 6a3 3 0 013-3h4a3 3 0 013 3v4a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  // Spacing options
  const spacingOptions = [
    {
      id: 'tight',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'normal',
      customIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6.5" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="12" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.panel,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Styling</h2>
          <div style={styles.headerActions}>
            <Button variant="tertiary" size="small" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="small" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Liveboard Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Liveboard</h3>
            
            <div style={styles.settingRow}>
              <span style={styles.settingLabel}>Color</span>
              <Toggle
                checked={settings.colorEnabled}
                onChange={(checked) => updateSetting('colorEnabled', checked)}
              />
            </div>

            <div style={styles.settingRow}>
              <span style={styles.settingLabel}>Density</span>
              <OptionButtonGroup
                options={densityOptions}
                value={settings.density}
                onChange={(value) => updateSetting('density', value as StylingSettings['density'])}
              />
            </div>

            <div style={styles.settingRow}>
              <span style={styles.settingLabel}>Corner radius</span>
              <OptionButtonGroup
                options={cornerRadiusOptions}
                value={settings.cornerRadius}
                onChange={(value) => updateSetting('cornerRadius', value as StylingSettings['cornerRadius'])}
              />
            </div>

            <div style={styles.settingRow}>
              <span style={styles.settingLabel}>Spacing</span>
              <OptionButtonGroup
                options={spacingOptions}
                value={settings.spacing}
                onChange={(value) => updateSetting('spacing', value as StylingSettings['spacing'])}
              />
            </div>
          </div>

          {/* Group Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Group</h3>
            
            <div style={styles.checkboxRow}>
              <Checkbox
                label="Title"
                checked={settings.groupTitle}
                onChange={(checked) => updateSetting('groupTitle', checked)}
              />
            </div>

            <div style={styles.checkboxRow}>
              <Checkbox
                label="Description"
                checked={settings.groupDescription}
                onChange={(checked) => updateSetting('groupDescription', checked)}
              />
            </div>

            <div style={styles.subSection}>
              <span style={styles.subSectionTitle}>Tiles inside group</span>
              <div style={styles.checkboxRow}>
                <Checkbox
                  label="Description"
                  checked={settings.tilesDescription}
                  onChange={(checked) => updateSetting('tilesDescription', checked)}
                />
              </div>
            </div>
          </div>

          {/* Tile Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Tile</h3>
            
            <div style={styles.checkboxRow}>
              <Checkbox
                label="Description"
                checked={settings.tileDescription}
                onChange={(checked) => updateSetting('tileDescription', checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  panel: {
    width: 280,
    height: '100%',
    backgroundColor: colors.cardBg,
    boxShadow: shadows.card,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 300ms ease-out',
    fontFamily: typography.fontFamily,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderBottom: `1px solid ${colors.border}`,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: spacing.sm,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing.md,
  },
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  settingLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  checkboxRow: {
    marginBottom: spacing.sm,
  },
  subSection: {
    marginTop: spacing.md,
    paddingLeft: spacing.md,
  },
  subSectionTitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    display: 'block',
  },
};

export default StylingPanel;
