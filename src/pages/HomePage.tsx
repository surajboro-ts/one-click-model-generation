import React from 'react';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../tokens/colors/brand';

/**
 * HomePage - Simple split landing page
 * 
 * Two large cards for navigating to:
 * - Radiant: Design system preview (components, tokens, icons)
 * - Playground: Project gallery for designer prototypes
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>R</div>
          <span style={styles.logoText}>Radiant</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.heroText}>
          <h1 style={styles.title}>Design and prototype with Radiant</h1>
          <p style={styles.subtitle}>
            Explore the design system or build your own prototypes using ThoughtSpot's component library.
          </p>
        </div>

        {/* Split Cards */}
        <div style={styles.cardsContainer}>
          {/* Radiant Card */}
          <button
            style={styles.card}
            onClick={() => navigate('/radiant')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(39, 112, 239, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={styles.cardIconWrapper}>
              <div style={{ ...styles.cardIcon, background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 style={styles.cardTitle}>Radiant</h2>
            <p style={styles.cardDescription}>
              Explore the complete design system. Browse components, design tokens, icons, and documentation.
            </p>
            <div style={styles.cardStats}>
              <span style={styles.cardStat}>17 Components</span>
              <span style={styles.cardStatDivider}>·</span>
              <span style={styles.cardStat}>46 Icons</span>
              <span style={styles.cardStatDivider}>·</span>
              <span style={styles.cardStat}>150+ Tokens</span>
            </div>
            <div style={styles.cardCta}>
              <span>Browse components</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Playground Card */}
          <button
            style={styles.card}
            onClick={() => navigate('/playground')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(6, 191, 127, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={styles.cardIconWrapper}>
              <div style={{ ...styles.cardIcon, background: 'linear-gradient(135deg, #06BF7F 0%, #059669 100%)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 14.66V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H9.34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 2L22 6L12 16H8V12L18 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 style={styles.cardTitle}>Playground</h2>
            <p style={styles.cardDescription}>
              Build interactive prototypes with AI assistance. Create, experiment, and iterate on your designs.
            </p>
            <div style={styles.cardStats}>
              <span style={styles.cardStat}>Full-page experience</span>
              <span style={styles.cardStatDivider}>·</span>
              <span style={styles.cardStat}>AI-powered</span>
            </div>
            <div style={{ ...styles.cardCta, color: '#06BF7F' }}>
              <span>Open projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Footer Links */}
        <div style={styles.footer}>
          <a 
            href="https://github.com/faris-ts/figmaradiant" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            GitHub
          </a>
          <span style={styles.footerDivider}>·</span>
          <button 
            onClick={() => navigate('/radiant/architecture')}
            style={styles.footerLink}
          >
            Documentation
          </button>
          <span style={styles.footerDivider}>·</span>
          <button 
            onClick={() => navigate('/radiant/icons')}
            style={styles.footerLink}
          >
            Icons
          </button>
        </div>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(180deg, ${brandColors.gray[10]} 0%, ${brandColors.white} 100%)`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 32px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(39, 112, 239, 0.3)',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    letterSpacing: '-0.5px',
  },

  // Main
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 32px 48px',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
  },

  // Hero Text
  heroText: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    color: brandColors.gray[90],
    marginBottom: '16px',
    letterSpacing: '-1px',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: 1.6,
    maxWidth: '560px',
    margin: '0 auto',
  },

  // Cards Container
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    width: '100%',
    marginBottom: '48px',
  },

  // Card
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px 32px',
    background: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  cardIconWrapper: {
    marginBottom: '24px',
  },
  cardIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '12px',
    letterSpacing: '-0.5px',
  },
  cardDescription: {
    fontSize: '15px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: 1.6,
    marginBottom: '20px',
    maxWidth: '280px',
  },
  cardStats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  cardStat: {
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.gray[40],
  },
  cardStatDivider: {
    color: brandColors.gray[30],
  },
  cardCta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    fontWeight: 500,
    color: brandColors.blue[60],
  },

  // Footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  footerLink: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[50],
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'color 150ms ease',
  },
  footerDivider: {
    color: brandColors.gray[30],
  },
};

export default HomePage;
