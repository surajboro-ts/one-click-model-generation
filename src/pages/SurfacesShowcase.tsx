import React, { useState } from 'react';
import {
  Modal,
  ModalFooter,
  ModalNavPanel,
  ModalNavItem,
  ModalSplashContent,
  ModalSize,
  ModalType,
} from '../components/Modal';
import { Button } from '../components/Button';
import { systemColors, referenceColors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type ModalDemo = {
  id: string;
  size: ModalSize;
  type: ModalType;
  title: string;
  description: string;
  width: string;
};

const MODAL_SIZES: ModalDemo[] = [
  { id: 'm1-simple', size: 'M1', type: 'simple', title: 'M1 - Compact', description: '394px - Confirmations, alerts', width: '394px' },
  { id: 'm2-simple', size: 'M2', type: 'simple', title: 'M2 - Standard', description: '788px - Forms, settings', width: '788px' },
  { id: 'm3-simple', size: 'M3', type: 'simple', title: 'M3 - Wide', description: '1182px - Data tables, complex layouts', width: '1182px' },
  { id: 'm4-simple', size: 'M4', type: 'simple', title: 'M4 - Full Screen', description: 'Immersive experiences, editors', width: 'Full' },
];

const MODAL_TYPES: ModalDemo[] = [
  { id: 'm2-simple', size: 'M2', type: 'simple', title: 'Simple', description: 'Header + Content + Footer', width: '788px' },
  { id: 'm2-wizard', size: 'M2', type: 'wizard', title: 'Wizard', description: 'Multi-step with progress bar', width: '788px' },
  { id: 'm2-subnav', size: 'M2', type: 'subnavigation', title: 'Sub-navigation', description: 'Settings with left panel', width: '788px' },
  { id: 'm2-splash', size: 'M2', type: 'splashscreen', title: 'Splash Screen', description: 'Feature announcements', width: '788px' },
];

export const SurfacesShowcase: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalDemo | null>(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedNav, setSelectedNav] = useState('general');

  const closeModal = () => {
    setActiveModal(null);
    setWizardStep(1);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const renderModalContent = () => {
    if (!activeModal) return null;

    if (activeModal.type === 'splashscreen') {
      return (
        <ModalSplashContent
          title="Introducing Parameters"
          bulletPoints={[
            'Create formulas with adjustable values to run different scenarios',
            'Click the plus button to make your first parameter',
          ]}
        />
      );
    }

    return (
      <div style={styles.sampleContent}>
        <p style={styles.sampleContentText}>Content Area</p>
        <p style={styles.sampleContentSubtext}>Swap with your component</p>
      </div>
    );
  };

  const renderModalFooter = () => {
    if (!activeModal) return null;

    if (activeModal.type === 'wizard') {
      return (
        <ModalFooter
          tertiaryAction={<Button variant="tertiary" onClick={closeModal}>Cancel</Button>}
          secondaryAction={
            wizardStep > 1 ? (
              <Button variant="secondary" onClick={() => setWizardStep(s => s - 1)}>Back</Button>
            ) : undefined
          }
          primaryAction={
            wizardStep < 3 ? (
              <Button variant="primary" onClick={() => setWizardStep(s => s + 1)}>Next</Button>
            ) : (
              <Button variant="primary" onClick={closeModal}>Done</Button>
            )
          }
        />
      );
    }

    if (activeModal.type === 'splashscreen') {
      return (
        <ModalFooter
          primaryAction={<Button variant="primary" onClick={closeModal}>Done</Button>}
        />
      );
    }

    return (
      <ModalFooter
        tertiaryAction={<Button variant="tertiary">Learn More</Button>}
        secondaryAction={<Button variant="secondary" onClick={closeModal}>Cancel</Button>}
        primaryAction={<Button variant="primary" onClick={closeModal}>Confirm</Button>}
      />
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <section style={styles.headerSection}>
        <h1 style={styles.pageTitle}>Surfaces</h1>
        <p style={styles.pageDescription}>
          Overlay components including Modals (M1-M4), with Simple, Wizard, Sub-navigation, and Splash Screen variants.
          Based on Radiant 3.0 Design System specifications.
        </p>
      </section>

      {/* Modal Sizes Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Modal Sizes</h2>
        <p style={styles.sectionDescription}>
          Four fixed-width sizes for different use cases. Width is fixed, height is flexible with min/max constraints.
        </p>
        <div style={styles.cardGrid}>
          {MODAL_SIZES.map((modal) => (
            <button
              key={modal.id}
              style={styles.card}
              onClick={() => setActiveModal(modal)}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = systemColors.light['content-brand'];
                e.currentTarget.style.boxShadow = `0 4px 12px ${systemColors.light['background-information']}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = systemColors.light['background-subtle'];
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>{modal.title}</span>
                <span style={styles.cardBadge}>{modal.width}</span>
              </div>
              <p style={styles.cardDescription}>{modal.description}</p>
              <div style={styles.cardPreview}>
                <div style={{
                  ...styles.miniModal,
                  width: modal.size === 'M1' ? 60 : modal.size === 'M2' ? 90 : modal.size === 'M3' ? 120 : '100%',
                }} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal Types Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Modal Types</h2>
        <p style={styles.sectionDescription}>
          Four type variants for different interaction patterns and content layouts.
        </p>
        <div style={styles.cardGrid}>
          {MODAL_TYPES.map((modal) => (
            <button
              key={modal.id}
              style={styles.card}
              onClick={() => setActiveModal(modal)}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = systemColors.light['content-brand'];
                e.currentTarget.style.boxShadow = `0 4px 12px ${systemColors.light['background-information']}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = systemColors.light['background-subtle'];
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>{modal.title}</span>
                <span style={styles.cardTypeBadge}>{modal.type}</span>
              </div>
              <p style={styles.cardDescription}>{modal.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Usage Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Usage</h2>
        <div style={styles.codeBlock}>
          <div style={styles.codeHeader}>
            <span>Basic Modal</span>
            <button 
              style={styles.copyButton} 
              onClick={() => handleCopyCode(`import { Modal, ModalFooter } from '@/components/Modal';
import { Button } from '@/components/Button';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="M2"
  type="simple"
  title="Modal Title"
  footer={
    <ModalFooter
      secondaryAction={<Button variant="secondary">Cancel</Button>}
      primaryAction={<Button variant="primary">Confirm</Button>}
    />
  }
>
  <YourContent />
</Modal>`)}
            >
              Copy
            </button>
          </div>
          <pre style={styles.code}>
{`import { Modal, ModalFooter } from '@/components/Modal';
import { Button } from '@/components/Button';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="M2"
  type="simple"
  title="Modal Title"
  footer={
    <ModalFooter
      secondaryAction={<Button variant="secondary">Cancel</Button>}
      primaryAction={<Button variant="primary">Confirm</Button>}
    />
  }
>
  <YourContent />
</Modal>`}
          </pre>
        </div>
      </section>

      {/* Spacing Reference */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Spacing Reference</h2>
        <div style={styles.specGrid}>
          <div style={styles.specCard}>
            <h4 style={styles.specTitle}>Header</h4>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Padding</span>
              <span style={styles.specValue}>20px 24px</span>
            </div>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Border</span>
              <span style={styles.specValue}>1px gray-20</span>
            </div>
          </div>
          <div style={styles.specCard}>
            <h4 style={styles.specTitle}>Content</h4>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Padding</span>
              <span style={styles.specValue}>24px</span>
            </div>
          </div>
          <div style={styles.specCard}>
            <h4 style={styles.specTitle}>Footer</h4>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Padding</span>
              <span style={styles.specValue}>20px 24px</span>
            </div>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Background</span>
              <span style={styles.specValue}>gray-10</span>
            </div>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Button Gap</span>
              <span style={styles.specValue}>16px</span>
            </div>
          </div>
          <div style={styles.specCard}>
            <h4 style={styles.specTitle}>Container</h4>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Border Radius</span>
              <span style={styles.specValue}>6px</span>
            </div>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Min Height</span>
              <span style={styles.specValue}>230px</span>
            </div>
            <div style={styles.specRow}>
              <span style={styles.specLabel}>Max Height</span>
              <span style={styles.specValue}>690px</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Alignment Reference */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Footer Button Alignment</h2>
        <p style={styles.sectionDescription}>
          Buttons follow Figma spec: Tertiary on left, Secondary and Primary on right.
        </p>
        <div style={styles.footerDemo}>
          <div style={styles.footerDemoRow}>
            <div style={styles.footerDemoLabel}>With Tertiary:</div>
            <div style={styles.footerDemoContent}>
              <span style={styles.tertiaryDemo}>[Tertiary]</span>
              <div style={styles.primaryGroup}>
                <span style={styles.secondaryDemo}>[Secondary]</span>
                <span style={styles.primaryDemo}>[Primary]</span>
              </div>
            </div>
          </div>
          <div style={styles.footerDemoRow}>
            <div style={styles.footerDemoLabel}>Without Tertiary:</div>
            <div style={styles.footerDemoContent}>
              <div style={styles.primaryGroup}>
                <span style={styles.secondaryDemo}>[Secondary]</span>
                <span style={styles.primaryDemo}>[Primary]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Modal */}
      {activeModal && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          size={activeModal.size}
          type={activeModal.type}
          title={activeModal.title}
          eyebrow={activeModal.type === 'wizard' ? `Step ${wizardStep} of 3` : undefined}
          currentStep={wizardStep}
          totalSteps={3}
          navigation={
            activeModal.type === 'subnavigation' ? (
              <ModalNavPanel>
                <ModalNavItem active={selectedNav === 'general'} onClick={() => setSelectedNav('general')}>
                  General
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'security'} onClick={() => setSelectedNav('security')}>
                  Security
                </ModalNavItem>
                <ModalNavItem active={selectedNav === 'notifications'} onClick={() => setSelectedNav('notifications')}>
                  Notifications
                </ModalNavItem>
              </ModalNavPanel>
            ) : undefined
          }
          mediaContent={
            activeModal.type === 'splashscreen' ? (
              <div style={styles.splashMediaArea}>
                <span>Feature Image / Video</span>
              </div>
            ) : undefined
          }
          footer={renderModalFooter()}
        >
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1000,
  },

  // Header
  headerSection: {
    marginBottom: 40,
  },
  pageTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 36,
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: 12,
  },
  pageDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '26px',
    maxWidth: 700,
  },

  // Sections
  section: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: 12,
    padding: spacing.F,
    marginBottom: spacing.F,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 20,
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: spacing.B,
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    color: systemColors.light['content-secondary'],
    marginBottom: spacing.D,
  },

  // Card Grid
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: spacing.D,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: spacing.D,
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 150ms ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.B,
  },
  cardTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  cardBadge: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: 11,
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    backgroundColor: referenceColors.blue['10'],
    padding: '2px 8px',
    borderRadius: 4,
  },
  cardTypeBadge: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 11,
    fontWeight: 500,
    color: referenceColors.purple['60'],
    backgroundColor: referenceColors.purple['10'],
    padding: '2px 8px',
    borderRadius: 4,
  },
  cardDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    color: systemColors.light['content-secondary'],
    margin: 0,
  },
  cardPreview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.C,
    height: 40,
  },
  miniModal: {
    height: 30,
    backgroundColor: systemColors.light['background-subtle'],
    borderRadius: 3,
    border: `1px solid ${referenceColors.gray['30']}`,
  },

  // Code Block
  codeBlock: {
    backgroundColor: systemColors.light['content-primary'],
    borderRadius: 8,
    overflow: 'hidden',
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    fontWeight: 500,
    color: systemColors.light['border-default'],
  },
  copyButton: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 11,
    fontWeight: 500,
    color: referenceColors.brand['40'],
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: 4,
  },
  code: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: 13,
    lineHeight: '22px',
    color: '#e5e5e5',
    padding: 16,
    margin: 0,
    overflowX: 'auto',
  },

  // Spec Grid
  specGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.D,
  },
  specCard: {
    padding: spacing.D,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: 8,
  },
  specTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: spacing.C,
    marginTop: 0,
  },
  specRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.B,
  },
  specLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: systemColors.light['content-secondary'],
  },
  specValue: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: 12,
    color: systemColors.light['content-primary'],
  },

  // Footer Demo
  footerDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.D,
  },
  footerDemoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.D,
  },
  footerDemoLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    fontWeight: 500,
    color: systemColors.light['content-secondary'],
    width: 120,
    flexShrink: 0,
  },
  footerDemoContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: 6,
  },
  primaryGroup: {
    display: 'flex',
    gap: spacing.D,
    marginLeft: 'auto',
  },
  tertiaryDemo: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: systemColors.light['content-brand'],
  },
  secondaryDemo: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: referenceColors.gray['70'],
    padding: '4px 12px',
    backgroundColor: systemColors.light['background-subtle'],
    borderRadius: 16,
  },
  primaryDemo: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: systemColors.light['background-base'],
    padding: '4px 12px',
    backgroundColor: systemColors.light['content-brand'],
    borderRadius: 16,
  },

  // Sample Content
  sampleContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.F,
    backgroundColor: referenceColors.purple['20'],
    borderRadius: 6,
    minHeight: 120,
  },
  sampleContentText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  sampleContentSubtext: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: systemColors.light['content-secondary'],
    margin: 0,
    marginTop: 4,
  },
  splashMediaArea: {
    width: '100%',
    height: '100%',
    backgroundColor: referenceColors.purple['20'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: systemColors.light['content-secondary'],
    fontSize: 14,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

export default SurfacesShowcase;
