import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Toggle } from '../../components/Toggle';
import { Radio } from '../../components/Radio';
import { Alert } from '../../components/Alert';
import { Sidebar } from '../../components/Sidebar';
import { Icon } from '../../components/icons';
import { brandColors } from '../../tokens/colors/brand';

/**
 * Settings Panel Example
 * 
 * A common ThoughtSpot pattern: settings/preferences interface with sidebar navigation.
 * Demonstrates: Sidebar, TextInput, Toggle, Radio, Alert, Button composition.
 * 
 * Use this as a reference for building settings/configuration interfaces.
 */

const SIDEBAR_ITEMS = [
  { id: 'profile', label: 'Profile', icon: 'profile' as const },
  { id: 'notifications', label: 'Notifications', icon: 'info-circle' as const },
  { id: 'security', label: 'Security', icon: 'lock' as const },
  { id: 'preferences', label: 'Preferences', icon: 'cog' as const },
];

export const SettingsPanelExample: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: 'Alex Johnson',
    email: 'alex.johnson@thoughtspot.com',
    timezone: 'pacific',
    emailNotifications: true,
    slackNotifications: false,
    weeklyDigest: true,
  });

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <Icon name="cog" size="l" />
          <h2 style={styles.sidebarTitle}>Settings</h2>
        </div>
        <Sidebar
          items={SIDEBAR_ITEMS}
          activeItem={activeSection}
          onItemClick={setActiveSection}
        />
      </div>

      {/* Content */}
      <div style={styles.content}>
        {showSuccess && (
          <Alert
            status="success"
            variant="page"
            message="Settings saved successfully"
            dismissible
            onDismiss={() => setShowSuccess(false)}
          />
        )}

        {activeSection === 'profile' && (
          <div style={styles.section}>
            <h1 style={styles.sectionTitle}>Profile settings</h1>
            <p style={styles.sectionDescription}>
              Manage your account information and preferences.
            </p>

            <div style={styles.formSection}>
              <h3 style={styles.formSectionTitle}>Basic information</h3>
              
              <div style={styles.formGroup}>
                <TextInput
                  label="Display name"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                />
              </div>

              <div style={styles.formGroup}>
                <TextInput
                  label="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Timezone</label>
                <div style={styles.radioGroup}>
                  <Radio
                    label="Pacific (PT)"
                    checked={formData.timezone === 'pacific'}
                    onChange={() => setFormData({ ...formData, timezone: 'pacific' })}
                  />
                  <Radio
                    label="Eastern (ET)"
                    checked={formData.timezone === 'eastern'}
                    onChange={() => setFormData({ ...formData, timezone: 'eastern' })}
                  />
                  <Radio
                    label="UTC"
                    checked={formData.timezone === 'utc'}
                    onChange={() => setFormData({ ...formData, timezone: 'utc' })}
                  />
                </div>
              </div>
            </div>

            <div style={styles.formSection}>
              <h3 style={styles.formSectionTitle}>Notifications</h3>
              
              <div style={styles.toggleGroup}>
                <div style={styles.toggleRow}>
                  <div style={styles.toggleInfo}>
                    <span style={styles.toggleLabel}>Email notifications</span>
                    <span style={styles.toggleDescription}>
                      Receive updates about your Answers and Liveboards
                    </span>
                  </div>
                  <Toggle
                    checked={formData.emailNotifications}
                    onChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
                  />
                </div>

                <div style={styles.toggleRow}>
                  <div style={styles.toggleInfo}>
                    <span style={styles.toggleLabel}>Slack notifications</span>
                    <span style={styles.toggleDescription}>
                      Get notified in Slack when monitors trigger
                    </span>
                  </div>
                  <Toggle
                    checked={formData.slackNotifications}
                    onChange={(checked) => setFormData({ ...formData, slackNotifications: checked })}
                  />
                </div>

                <div style={styles.toggleRow}>
                  <div style={styles.toggleInfo}>
                    <span style={styles.toggleLabel}>Weekly digest</span>
                    <span style={styles.toggleDescription}>
                      Summary of insights from your pinned Liveboards
                    </span>
                  </div>
                  <Toggle
                    checked={formData.weeklyDigest}
                    onChange={(checked) => setFormData({ ...formData, weeklyDigest: checked })}
                  />
                </div>
              </div>
            </div>

            <div style={styles.actions}>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" onClick={handleSave}>Save changes</Button>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div style={styles.section}>
            <h1 style={styles.sectionTitle}>Notification settings</h1>
            <Alert
              status="info"
              variant="section"
              message="Configure how and when you receive notifications."
            />
          </div>
        )}

        {activeSection === 'security' && (
          <div style={styles.section}>
            <h1 style={styles.sectionTitle}>Security settings</h1>
            <Alert
              status="warning"
              variant="section"
              message="Manage your password and authentication options."
            />
          </div>
        )}

        {activeSection === 'preferences' && (
          <div style={styles.section}>
            <h1 style={styles.sectionTitle}>Preferences</h1>
            <Alert
              status="muted"
              variant="section"
              message="Customize your ThoughtSpot experience."
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  sidebar: {
    width: '280px',
    backgroundColor: brandColors.white,
    borderRight: `1px solid ${brandColors.gray[20]}`,
    padding: '24px 0',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 24px 24px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    marginBottom: '16px',
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  content: {
    flex: 1,
    padding: '32px 48px',
    maxWidth: '800px',
  },
  section: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: '0 0 8px 0',
  },
  sectionDescription: {
    fontSize: '14px',
    color: brandColors.gray[60],
    margin: '0 0 32px 0',
  },
  formSection: {
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  formSectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: '0 0 20px 0',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  toggleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
  },
  toggleInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  toggleLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  toggleDescription: {
    fontSize: '13px',
    color: brandColors.gray[60],
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    paddingTop: '24px',
  },
};

export default SettingsPanelExample;
