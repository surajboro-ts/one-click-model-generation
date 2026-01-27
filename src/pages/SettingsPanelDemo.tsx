import React, { useState } from 'react';
import { brandColors } from '../tokens/colors/brand';
import { Select } from '../components/Select';
import { Toggle } from '../components/Toggle';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';

const COUNTRIES = [
  { id: 'us', label: 'United States' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'ca', label: 'Canada' },
  { id: 'au', label: 'Australia' },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'jp', label: 'Japan' },
  { id: 'in', label: 'India' },
];

const TIMEZONES = [
  { id: 'utc', label: 'UTC (Coordinated Universal Time)' },
  { id: 'pst', label: 'PST (Pacific Standard Time)' },
  { id: 'est', label: 'EST (Eastern Standard Time)' },
  { id: 'gmt', label: 'GMT (Greenwich Mean Time)' },
  { id: 'cet', label: 'CET (Central European Time)' },
  { id: 'jst', label: 'JST (Japan Standard Time)' },
  { id: 'ist', label: 'IST (India Standard Time)' },
];

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
  { id: 'ja', label: 'Japanese' },
  { id: 'zh', label: 'Chinese' },
];

export const SettingsPanelDemo: React.FC = () => {
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('utc');
  const [language, setLanguage] = useState('en');
  const [displayName, setDisplayName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Settings Panel</h1>
        <p style={styles.description}>
          An example prototype demonstrating the Select component and other form elements
          in a real-world settings panel layout.
        </p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <div style={styles.alertWrapper}>
          <Alert
            status="success"
            message="Settings saved successfully!"
            dismissible
            onDismiss={() => setShowSuccess(false)}
          />
        </div>
      )}

      {/* Settings Sections */}
      <div style={styles.sections}>
        {/* Profile Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Profile</h2>
          <div style={styles.sectionContent}>
            <div style={styles.formRow}>
              <div style={styles.formField}>
                <TextInput
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div style={styles.formField}>
                <TextInput
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Localization Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Localization</h2>
          <div style={styles.sectionContent}>
            <div style={styles.formRow}>
              <div style={styles.formField}>
                <Select
                  label="Country"
                  placeholder="Select a country"
                  options={COUNTRIES}
                  value={country}
                  onChange={(value) => setCountry(value)}
                  fullWidth
                />
              </div>
              <div style={styles.formField}>
                <Select
                  label="Language"
                  options={LANGUAGES}
                  value={language}
                  onChange={(value) => setLanguage(value)}
                  fullWidth
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formField}>
                <Select
                  label="Timezone"
                  options={TIMEZONES}
                  value={timezone}
                  onChange={(value) => setTimezone(value)}
                  searchable
                  searchPlaceholder="Search timezones..."
                  fullWidth
                />
              </div>
            </div>
          </div>
        </section>

        {/* Select States Demo */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Select Component States</h2>
          <p style={styles.sectionDescription}>
            Demonstration of different Select component states and configurations.
          </p>
          <div style={styles.sectionContent}>
            <div style={styles.formRow}>
              <div style={styles.formField}>
                <Select
                  label="Searchable select"
                  placeholder="Search and select..."
                  options={COUNTRIES}
                  value=""
                  onChange={() => {}}
                  searchable
                  fullWidth
                />
              </div>
              <div style={styles.formField}>
                <Select
                  label="Disabled"
                  placeholder="Cannot select"
                  options={COUNTRIES}
                  value=""
                  onChange={() => {}}
                  disabled
                  fullWidth
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formField}>
                <Select
                  label="Error state"
                  placeholder="Please select..."
                  options={COUNTRIES}
                  value=""
                  onChange={() => {}}
                  error
                  errorMessage="Please select a country"
                  fullWidth
                />
              </div>
              <div style={styles.formField}>
                <Select
                  label="With helper text"
                  placeholder="Select option"
                  options={COUNTRIES}
                  value=""
                  onChange={() => {}}
                  helperText="This field is optional"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Preferences</h2>
          <div style={styles.sectionContent}>
            <div style={styles.toggleRow}>
              <Toggle
                label="Dark mode"
                checked={darkMode}
                onChange={setDarkMode}
              />
              <span style={styles.toggleDescription}>
                Enable dark mode for the interface
              </span>
            </div>
            <div style={styles.toggleRow}>
              <Toggle
                label="Push notifications"
                checked={notifications}
                onChange={setNotifications}
              />
              <span style={styles.toggleDescription}>
                Receive push notifications for important updates
              </span>
            </div>
            <div style={styles.toggleRow}>
              <Toggle
                label="Email updates"
                checked={emailUpdates}
                onChange={setEmailUpdates}
              />
              <span style={styles.toggleDescription}>
                Receive weekly email digests
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div style={styles.footer}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '900px',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  description: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: '26px',
  },
  alertWrapper: {
    marginBottom: '24px',
  },
  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    border: `1px solid ${brandColors.gray[20]}`,
    padding: '24px',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: brandColors.gray[50],
    marginBottom: '16px',
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  formField: {
    flex: '1',
    minWidth: '250px',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: `1px solid ${brandColors.gray[10]}`,
  },
  toggleDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: brandColors.gray[50],
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: `1px solid ${brandColors.gray[20]}`,
  },
};

export default SettingsPanelDemo;
