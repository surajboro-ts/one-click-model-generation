import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * WelcomePage - Landing page without sidebar
 * 
 * This is the entry point for the Radiant Design System.
 * Provides an overview and quick navigation to explore the system.
 */
export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🧩',
      title: '17+ Components',
      description: 'Production-ready React components with TypeScript support',
    },
    {
      icon: '🎨',
      title: 'Design Tokens',
      description: 'Consistent colors, typography, spacing, and shadows',
    },
    {
      icon: '🔍',
      title: 'Token Inspector',
      description: 'Inspect any component to see its design tokens in real-time',
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Components work seamlessly across all screen sizes',
    },
  ];

  const quickLinks = [
    {
      id: 'playground',
      icon: '🎮',
      title: 'Component Playground',
      description: 'Interact with components in real-world scenarios. Toggle inspect mode to see design tokens.',
      route: '/playground',
      color: '#2770EF',
    },
    {
      id: 'components',
      icon: '🧱',
      title: 'Browse Components',
      description: 'Explore all 17+ components with live examples, API documentation, and code snippets.',
      route: '/home',
      color: '#06BF7F',
    },
    {
      id: 'architecture',
      icon: '🏗️',
      title: 'Token Architecture',
      description: 'Understand the design token system - colors, typography, spacing, and more.',
      route: '/architecture',
      color: '#F5A623',
    },
    {
      id: 'icons',
      icon: '⭐',
      title: 'Icon Library',
      description: '46 carefully crafted icons with multiple sizes and customizable colors.',
      route: '/icons',
      color: '#8B5CF6',
    },
  ];

  const instructions = [
    {
      step: '1',
      title: 'Explore Components',
      description: 'Browse the sidebar to see all available components. Each component has live examples and API documentation.',
    },
    {
      step: '2',
      title: 'Use Token Inspector',
      description: 'Click the "Inspect" button in the sidebar footer to enable inspect mode. Hover over any component to see its design tokens.',
    },
    {
      step: '3',
      title: 'Check Design Tokens',
      description: 'Visit Token Architecture to understand how colors, typography, and spacing work together.',
    },
    {
      step: '4',
      title: 'Try Prototypes',
      description: 'Explore example prototypes like Spotter Dashboard and Settings Panel to see components in action.',
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContent}>
          <div style={styles.logoBadge}>
            <div style={styles.logoIcon}>R</div>
            <span style={styles.versionBadge}>v1.1</span>
          </div>
          <h1 style={styles.heroTitle}>Radiant Design System</h1>
          <p style={styles.heroSubtitle}>
            A comprehensive React component library built with TypeScript. 
            Designed for consistency, accessibility, and exceptional developer experience.
          </p>
          <div style={styles.heroActions}>
            <button 
              style={styles.primaryButton}
              onClick={() => navigate('/home')}
            >
              Get Started
            </button>
            <button 
              style={styles.secondaryButton}
              onClick={() => navigate('/playground')}
            >
              Open Playground
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <span style={styles.featureIcon}>{feature.icon}</span>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section style={styles.quickLinksSection}>
        <h2 style={styles.sectionTitle}>Quick Access</h2>
        <div style={styles.quickLinksGrid}>
          {quickLinks.map((link) => (
            <button
              key={link.id}
              style={styles.quickLinkCard}
              onClick={() => navigate(link.route)}
            >
              <div style={{ ...styles.quickLinkIcon, backgroundColor: `${link.color}20` }}>
                <span style={{ fontSize: '28px' }}>{link.icon}</span>
              </div>
              <div style={styles.quickLinkContent}>
                <h3 style={{ ...styles.quickLinkTitle, color: link.color }}>{link.title}</h3>
                <p style={styles.quickLinkDescription}>{link.description}</p>
              </div>
              <div style={styles.quickLinkArrow}>→</div>
            </button>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section style={styles.instructionsSection}>
        <h2 style={styles.sectionTitle}>How to Use This Design System</h2>
        <div style={styles.instructionsGrid}>
          {instructions.map((instruction) => (
            <div key={instruction.step} style={styles.instructionCard}>
              <div style={styles.stepNumber}>{instruction.step}</div>
              <div style={styles.instructionContent}>
                <h3 style={styles.instructionTitle}>{instruction.title}</h3>
                <p style={styles.instructionDescription}>{instruction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspector Highlight */}
      <section style={styles.inspectorSection}>
        <div style={styles.inspectorContent}>
          <div style={styles.inspectorIcon}>🔍</div>
          <div style={styles.inspectorText}>
            <h3 style={styles.inspectorTitle}>Token Inspector</h3>
            <p style={styles.inspectorDescription}>
              Once inside the app, click the <strong>"Inspect"</strong> button in the sidebar footer to enable inspect mode. 
              Hover over any component to see its design tokens including colors, typography, spacing, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with React + TypeScript • Radiant Design System v1.1
        </p>
      </footer>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0A0E14',
    color: '#ffffff',
  },

  // Hero
  hero: {
    position: 'relative',
    padding: '80px 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '500px',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(ellipse at 50% 0%, rgba(39, 112, 239, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
      radial-gradient(ellipse at 20% 80%, rgba(6, 191, 127, 0.15) 0%, transparent 40%)
    `,
  },
  heroContent: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '800px',
  },
  logoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  logoIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    color: '#ffffff',
    boxShadow: '0 8px 32px rgba(39, 112, 239, 0.4)',
  },
  versionBadge: {
    padding: '6px 12px',
    background: 'rgba(39, 112, 239, 0.2)',
    borderRadius: '20px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#5B9AFF',
  },
  heroTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '56px',
    fontWeight: 700,
    letterSpacing: '-2px',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff 0%, #A5ACB9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '32px',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  primaryButton: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    border: 'none',
    borderRadius: '12px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    boxShadow: '0 4px 20px rgba(39, 112, 239, 0.4)',
  },
  secondaryButton: {
    padding: '16px 32px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  // Features
  featuresSection: {
    padding: '40px 60px',
    background: 'rgba(255, 255, 255, 0.02)',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    textAlign: 'center',
    padding: '32px 24px',
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '16px',
    display: 'block',
  },
  featureTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  featureDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: '22px',
    margin: 0,
  },

  // Quick Links
  quickLinksSection: {
    padding: '60px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '32px',
    textAlign: 'center',
  },
  quickLinksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  quickLinkCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    textAlign: 'left',
  },
  quickLinkIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickLinkContent: {
    flex: 1,
  },
  quickLinkTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '6px',
  },
  quickLinkDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: '22px',
    margin: 0,
  },
  quickLinkArrow: {
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.3)',
    transition: 'all 200ms ease',
  },

  // Instructions
  instructionsSection: {
    padding: '60px',
    background: 'rgba(255, 255, 255, 0.02)',
  },
  instructionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  instructionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '16px',
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
  },
  instructionContent: {},
  instructionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  instructionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: '20px',
    margin: 0,
  },

  // Inspector Highlight
  inspectorSection: {
    padding: '60px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  inspectorContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    background: 'linear-gradient(135deg, rgba(39, 112, 239, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
    border: '1px solid rgba(39, 112, 239, 0.3)',
    borderRadius: '20px',
  },
  inspectorIcon: {
    fontSize: '48px',
    flexShrink: 0,
  },
  inspectorText: {
    flex: 1,
  },
  inspectorTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  inspectorDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '24px',
    margin: 0,
  },

  // Footer
  footer: {
    padding: '40px 60px',
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
  },
  footerText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.4)',
    margin: 0,
  },
};

export default WelcomePage;
