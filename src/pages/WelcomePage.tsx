import React from 'react';
import { Button } from '../components/Button';
import { Icon } from '../components/icons';
import { brandColors } from '../tokens/colors/brand';

/**
 * WelcomePage
 * 
 * The landing page for designers starting with the Radiant Prototyping Kit.
 * Provides quick start instructions and links to examples.
 */

interface WelcomePageProps {
  onNavigate: (id: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  const steps = [
    {
      number: '01',
      title: 'Describe your UI',
      description: 'Tell Cursor AI what you want to build. Paste a screenshot from Figma or describe the layout and interactions.',
      icon: 'pencil',
    },
    {
      number: '02',
      title: 'AI generates code',
      description: 'The AI uses Radiant components to create your prototype with proper styling and interactions.',
      icon: 'cog',
    },
    {
      number: '03',
      title: 'Preview and iterate',
      description: 'See your prototype live in the browser. Refine it by asking for changes or additions.',
      icon: 'eye',
    },
  ];

  const examples = [
    {
      id: 'filter-dialog',
      name: 'Filter Dialog',
      description: 'Modal with search, checkboxes, and toggle controls',
      components: ['Modal', 'SearchInput', 'Checkbox', 'Toggle', 'Button'],
    },
    {
      id: 'data-dashboard',
      name: 'Data Dashboard',
      description: 'Metrics, tabs, and data table for analytics',
      components: ['Tabs', 'Table', 'Chip', 'SearchInput', 'Button'],
    },
    {
      id: 'settings-panel',
      name: 'Settings Panel',
      description: 'Sidebar navigation with forms and toggles',
      components: ['Sidebar', 'TextInput', 'Toggle', 'Radio', 'Alert'],
    },
  ];

  const components = [
    { name: 'Button', count: '3 variants' },
    { name: 'Alert', count: '5 statuses' },
    { name: 'Modal', count: '3 sizes' },
    { name: 'Select', count: 'searchable' },
    { name: 'Table', count: 'sortable' },
    { name: 'Tabs', count: '2 sizes' },
    { name: 'Tooltip', count: '4 positions' },
    { name: 'Popover', count: 'click/hover' },
    { name: 'TextInput', count: 'with validation' },
    { name: 'Checkbox', count: 'with label' },
    { name: 'Radio', count: 'groups' },
    { name: 'Toggle', count: 'with label' },
    { name: 'Chip', count: '4 variants' },
    { name: 'SearchInput', count: 'with clear' },
    { name: 'Sidebar', count: 'with icons' },
    { name: 'Icon', count: '46 icons' },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <Icon name="star" size="s" />
            <span>Prototyping Kit</span>
          </div>
          <h1 style={styles.heroTitle}>
            Build interactive prototypes
            <br />
            <span style={styles.heroTitleAccent}>with AI and Radiant</span>
          </h1>
          <p style={styles.heroDescription}>
            Describe your UI or paste a screenshot. Cursor AI will generate
            production-quality React code using ThoughtSpot's Radiant design system.
          </p>
          <div style={styles.heroActions}>
            <Button 
              variant="primary" 
              size="large"
              icon="plus"
              onClick={() => onNavigate('playground')}
            >
              Start prototyping
            </Button>
            <Button 
              variant="secondary" 
              size="large"
              onClick={() => onNavigate('home')}
            >
              View Radiant System
            </Button>
          </div>
          <div style={styles.heroLinks}>
            <button 
              style={styles.textLink}
              onClick={() => onNavigate('architecture')}
            >
              Read the guide
            </button>
            <span style={styles.linkDivider}>|</span>
            <button 
              style={styles.textLink}
              onClick={() => onNavigate('icons')}
            >
              Browse icons
            </button>
          </div>
        </div>

        {/* Prompt Preview */}
        <div style={styles.promptPreview}>
          <div style={styles.promptHeader}>
            <div style={styles.promptDots}>
              <span style={{ ...styles.promptDot, backgroundColor: '#FF5F56' }} />
              <span style={{ ...styles.promptDot, backgroundColor: '#FFBD2E' }} />
              <span style={{ ...styles.promptDot, backgroundColor: '#27C93F' }} />
            </div>
            <span style={styles.promptTitle}>Cursor AI</span>
          </div>
          <div style={styles.promptBody}>
            <div style={styles.promptMessage}>
              <span style={styles.promptUser}>You:</span>
              <span style={styles.promptText}>
                Create a filter dialog with a search input, list of country checkboxes, 
                and a "Show selected" toggle at the bottom
              </span>
            </div>
            <div style={styles.promptResponse}>
              <span style={styles.promptAI}>AI:</span>
              <span style={styles.promptText}>
                I'll create a filter dialog using Modal, SearchInput, Checkbox, 
                and Toggle components...
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <div style={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} style={styles.stepCard}>
              <div style={styles.stepNumber}>{step.number}</div>
              <div style={styles.stepIcon}>
                <Icon name={step.icon as any} size="l" />
              </div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Example prototypes</h2>
          <p style={styles.sectionDescription}>
            Explore these examples to see what's possible
          </p>
        </div>
        <div style={styles.examplesGrid}>
          {examples.map((example) => (
            <div 
              key={example.id} 
              style={styles.exampleCard}
              onClick={() => onNavigate(`example-${example.id}`)}
            >
              <div style={styles.examplePreview}>
                <Icon name="folder" size="xl" />
              </div>
              <div style={styles.exampleContent}>
                <h3 style={styles.exampleTitle}>{example.name}</h3>
                <p style={styles.exampleDescription}>{example.description}</p>
                <div style={styles.exampleComponents}>
                  {example.components.slice(0, 3).map((comp, i) => (
                    <span key={i} style={styles.exampleChip}>{comp}</span>
                  ))}
                  {example.components.length > 3 && (
                    <span style={styles.exampleMore}>
                      +{example.components.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <div style={styles.exampleArrow}>
                <Icon name="arrow-right" size="m" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Components */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Available components</h2>
          <p style={styles.sectionDescription}>
            {components.length} components ready for prototyping
          </p>
        </div>
        <div style={styles.componentsGrid}>
          {components.map((comp, index) => (
            <div key={index} style={styles.componentChip}>
              <span style={styles.componentName}>{comp.name}</span>
              <span style={styles.componentCount}>{comp.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section style={styles.quickStart}>
        <div style={styles.quickStartContent}>
          <h2 style={styles.quickStartTitle}>Ready to start?</h2>
          <p style={styles.quickStartDescription}>
            Create a new file in <code style={styles.code}>src/prototypes/</code> and 
            describe what you want to build. The AI will handle the rest.
          </p>
          <div style={styles.quickStartActions}>
            <Button 
              variant="primary" 
              size="large"
              icon="plus"
              onClick={() => onNavigate('playground')}
            >
              Open playground
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  // Hero
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
    padding: '48px',
    background: `linear-gradient(135deg, ${brandColors.gray[90]} 0%, #0F1419 100%)`,
    borderRadius: '24px',
    marginBottom: '48px',
  },
  heroContent: {
    color: brandColors.white,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    backgroundColor: 'rgba(39, 112, 239, 0.2)',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#5B9AFF',
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '20px',
    letterSpacing: '-1px',
  },
  heroTitleAccent: {
    background: 'linear-gradient(135deg, #5B9AFF 0%, #06BF7F 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroDescription: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '32px',
    maxWidth: '440px',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  heroLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  textLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    transition: 'color 150ms ease',
  },
  linkDivider: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '14px',
  },

  // Prompt Preview
  promptPreview: {
    backgroundColor: '#1E2433',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  promptHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#151A24',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  promptDots: {
    display: 'flex',
    gap: '6px',
  },
  promptDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  promptTitle: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  promptBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  promptMessage: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  promptResponse: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingLeft: '16px',
    borderLeft: `2px solid ${brandColors.blue[60]}`,
  },
  promptUser: {
    fontSize: '11px',
    fontWeight: 600,
    color: brandColors.blue[40],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  promptAI: {
    fontSize: '11px',
    fontWeight: 600,
    color: brandColors.green[50],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  promptText: {
    fontSize: '13px',
    lineHeight: 1.5,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Section
  section: {
    marginBottom: '48px',
  },
  sectionHeader: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontSize: '15px',
    color: brandColors.gray[50],
  },

  // Steps
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  stepCard: {
    padding: '32px',
    backgroundColor: brandColors.white,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
  },
  stepNumber: {
    fontSize: '12px',
    fontWeight: 600,
    color: brandColors.blue[60],
    marginBottom: '16px',
  },
  stepIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    backgroundColor: brandColors.blue[10],
    borderRadius: '16px',
    color: brandColors.blue[60],
    marginBottom: '20px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  stepDescription: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: brandColors.gray[50],
    margin: 0,
  },

  // Examples
  examplesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  exampleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 24px',
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  examplePreview: {
    width: '64px',
    height: '64px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: brandColors.gray[40],
  },
  exampleContent: {
    flex: 1,
  },
  exampleTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '4px',
  },
  exampleDescription: {
    fontSize: '14px',
    color: brandColors.gray[50],
    marginBottom: '12px',
  },
  exampleComponents: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  exampleChip: {
    padding: '4px 10px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
  },
  exampleMore: {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[40],
  },
  exampleArrow: {
    color: brandColors.gray[30],
  },

  // Components
  componentsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  componentChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: brandColors.white,
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  componentName: {
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  componentCount: {
    fontSize: '12px',
    color: brandColors.gray[40],
  },

  // Quick Start
  quickStart: {
    padding: '48px',
    backgroundColor: brandColors.blue[60],
    borderRadius: '24px',
    textAlign: 'center',
  },
  quickStartContent: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  quickStartTitle: {
    fontSize: '28px',
    fontWeight: 600,
    color: brandColors.white,
    marginBottom: '16px',
  },
  quickStartDescription: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '24px',
  },
  code: {
    padding: '2px 8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '14px',
  },
  quickStartActions: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default WelcomePage;
