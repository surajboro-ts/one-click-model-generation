import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import { brandColors } from '../tokens/colors/brand';

export const AlertsShowcase: React.FC = () => {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const isDismissed = (alertId: string) => dismissedAlerts.includes(alertId);

  const resetAlerts = () => setDismissedAlerts([]);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Alert / Banner Component</h2>
      <p style={styles.sectionDescription}>
        Notification components for displaying important messages to users.
        Supports different statuses (info, success, warning, failure, muted)
        and variants (page, section single-line, section multi-line).
      </p>

      {/* Page Variant */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Page Variant (Full Width)</h3>
        <p style={styles.hint}>Full-width banners typically shown at the top of a page.</p>
        <div style={styles.pageAlertContainer}>
          {!isDismissed('page-failure') && (
            <Alert 
              variant="page"
              status="failure"
              message="Something went wrong. Please try again."
              linkText="Learn more"
              onLinkClick={() => alert('Link clicked!')}
              buttonText="Retry"
              onButtonClick={() => alert('Button clicked!')}
              onDismiss={() => handleDismiss('page-failure')}
            />
          )}
          {!isDismissed('page-warning') && (
            <Alert 
              variant="page"
              status="warning"
              message="Your session will expire in 5 minutes."
              linkText="Extend session"
              onLinkClick={() => alert('Link clicked!')}
              buttonText="Extend"
              onButtonClick={() => alert('Button clicked!')}
              onDismiss={() => handleDismiss('page-warning')}
            />
          )}
          {!isDismissed('page-success') && (
            <Alert 
              variant="page"
              status="success"
              message="Your changes have been saved successfully."
              linkText="View changes"
              onLinkClick={() => alert('Link clicked!')}
              buttonText="Undo"
              onButtonClick={() => alert('Button clicked!')}
              onDismiss={() => handleDismiss('page-success')}
            />
          )}
          {!isDismissed('page-info') && (
            <Alert 
              variant="page"
              status="info"
              message="A new version is available."
              linkText="What's new"
              onLinkClick={() => alert('Link clicked!')}
              buttonText="Update"
              onButtonClick={() => alert('Button clicked!')}
              onDismiss={() => handleDismiss('page-info')}
            />
          )}
        </div>
      </div>

      {/* Status Variants */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Section Variant - Single Line</h3>
        <p style={styles.hint}>Compact alerts for inline notifications within sections.</p>
        <div style={styles.alertGrid}>
          <div style={styles.alertItem}>
            <span style={styles.label}>Failure</span>
            <Alert 
              variant="section"
              status="failure"
              message="Amet minim mollit non deserunt ulla estssd."
              linkText="Link here."
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Warning</span>
            <Alert 
              variant="section"
              status="warning"
              message="Amet minim mollit non deserunt ulla estssd."
              linkText="Link here."
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Success</span>
            <Alert 
              variant="section"
              status="success"
              message="Amet minim mollit non deserunt ulla estssd."
              linkText="Link here."
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Info</span>
            <Alert 
              variant="section"
              status="info"
              message="Amet minim mollit non deserunt ulla estssd."
              linkText="Link here."
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
        </div>
      </div>

      {/* Multi-line Variant */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Section Variant - Multi-line</h3>
        <p style={styles.hint}>For longer messages that require multiple lines.</p>
        <div style={styles.alertGrid}>
          <div style={styles.alertItem}>
            <span style={styles.label}>Failure</span>
            <Alert 
              variant="section-multiline"
              status="failure"
              message="Amet minim mollit non deserunt ullamco est sit aliqua dolosint didideserunt ullamco wudnudi ests."
              linkText="Link goes here"
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Warning</span>
            <Alert 
              variant="section-multiline"
              status="warning"
              message="Amet minim mollit non deserunt ullamco est sit aliqua dolosint didideserunt ullamco wudnudi ests."
              linkText="Link goes here"
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Success</span>
            <Alert 
              variant="section-multiline"
              status="success"
              message="Amet minim mollit non deserunt ullamco est sit aliqua dolosint didideserunt ullamco wudnudi ests."
              linkText="Link goes here"
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Info</span>
            <Alert 
              variant="section-multiline"
              status="info"
              message="Amet minim mollit non deserunt ullamco est sit aliqua dolosint didideserunt ullamco wudnudi ests."
              linkText="Link goes here"
              onLinkClick={() => alert('Link clicked!')}
              dismissible={false}
            />
          </div>
          <div style={styles.alertItem}>
            <span style={styles.label}>Muted</span>
            <Alert 
              variant="section-multiline"
              status="muted"
              message="Amet minim mollit non deserunt ullamco est sit aliqua dolosint didideserunt ullamco wudnudi ests."
              dismissible={false}
            />
          </div>
        </div>
      </div>

      {/* Dismissible Examples */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Dismissible Alerts</h3>
        <p style={styles.hint}>Click the X button to dismiss. Reset to show them again.</p>
        
        <div style={styles.dismissibleContainer}>
          {!isDismissed('section-1') && (
            <Alert 
              variant="section"
              status="failure"
              message="This alert can be dismissed."
              onDismiss={() => handleDismiss('section-1')}
            />
          )}
          {!isDismissed('section-2') && (
            <Alert 
              variant="section"
              status="warning"
              message="This alert can be dismissed too."
              onDismiss={() => handleDismiss('section-2')}
            />
          )}
          {!isDismissed('section-3') && (
            <Alert 
              variant="section-multiline"
              status="info"
              message="Multi-line alerts can also be dismissed. They work great for longer messages that need more space to display properly."
              linkText="Learn more"
              onDismiss={() => handleDismiss('section-3')}
            />
          )}
        </div>

        {dismissedAlerts.length > 0 && (
          <button 
            style={styles.resetButton}
            onClick={resetAlerts}
          >
            Reset Dismissed Alerts
          </button>
        )}
      </div>

      {/* Without Link/Button */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Without Link or Button</h3>
        <div style={styles.alertGrid}>
          <Alert 
            variant="section"
            status="info"
            message="A simple informational message without any actions."
            dismissible={false}
          />
          <Alert 
            variant="section-multiline"
            status="success"
            message="Your operation completed successfully. No further action is required at this time."
            dismissible={false}
          />
        </div>
      </div>

      {/* Real World Example */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Real World Usage</h3>
        <div style={styles.exampleCard}>
          <div style={styles.exampleHeader}>
            <span style={styles.exampleTitle}>Form Validation</span>
          </div>
          <div style={styles.exampleContent}>
            <Alert 
              variant="section-multiline"
              status="failure"
              message="Please correct the following errors before submitting: Email address is invalid, Password must be at least 8 characters."
              dismissible={false}
            />
            
            <div style={styles.formFields}>
              <div style={styles.field}>
                <label style={styles.fieldLabel}>Email</label>
                <input 
                  type="email" 
                  style={{...styles.input, borderColor: brandColors.red[60]}} 
                  placeholder="Enter email"
                  defaultValue="invalid-email"
                />
                <span style={styles.fieldError}>Please enter a valid email address</span>
              </div>
              <div style={styles.field}>
                <label style={styles.fieldLabel}>Password</label>
                <input 
                  type="password" 
                  style={{...styles.input, borderColor: brandColors.red[60]}} 
                  placeholder="Enter password"
                  defaultValue="abc"
                />
                <span style={styles.fieldError}>Password must be at least 8 characters</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{...styles.exampleCard, marginTop: '16px'}}>
          <div style={styles.exampleHeader}>
            <span style={styles.exampleTitle}>System Notification</span>
          </div>
          <div style={styles.exampleContent}>
            <Alert 
              variant="section"
              status="warning"
              message="Scheduled maintenance on Dec 15, 2024 from 2:00 AM - 4:00 AM UTC."
              linkText="More info"
              onLinkClick={() => alert('Showing maintenance details')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[60],
    marginBottom: '32px',
    lineHeight: '20px',
  },
  subsection: {
    marginBottom: '40px',
  },
  subsectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  hint: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[50],
    marginBottom: '16px',
  },
  label: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block',
  },
  pageAlertContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: brandColors.gray[10],
    padding: '24px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  alertGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  alertItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  dismissibleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '500px',
  },
  resetButton: {
    marginTop: '16px',
    padding: '8px 16px',
    backgroundColor: brandColors.blue[60],
    color: brandColors.white,
    border: 'none',
    borderRadius: '6px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  exampleCard: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '8px',
    overflow: 'hidden',
  },
  exampleHeader: {
    backgroundColor: brandColors.gray[10],
    padding: '12px 16px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  exampleTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  exampleContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fieldLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  input: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${brandColors.gray[30]}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    outline: 'none',
  },
  fieldError: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    color: brandColors.red[60],
  },
};

export default AlertsShowcase;

