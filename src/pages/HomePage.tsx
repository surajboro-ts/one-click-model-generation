import React from 'react';
import { useNavigate } from 'react-router-dom';
import { systemColors, referenceColors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { getComponentCount, getIconCount, getTokenCountLabel } from '../data/componentRegistry';
import { Button } from '../components/Button';
import { Link } from '../components/Link';

/**
 * HomePage - Landing page for RadiantPlay
 *
 * Hero with eyebrow + title + subtitle + stat chips,
 * two navigation cards, a prominent guide banner, and footer.
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const footerMessages = [
    'Made with coffee and tokens by Faris',
    'Scrapped together by Faris',
    'Built between meetings by Faris',
    'Fueled by design tokens and caffeine',
    'Assembled with love (and AI) by Faris',
    'Crafted pixel by pixel by Faris',
    'Made with borderRadius and box-shadow',
  ];

  const [footerMessage] = React.useState(() =>
    footerMessages[Math.floor(Math.random() * footerMessages.length)]
  );

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes hintPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <main style={styles.main}>
        {/* Hero */}
        <div style={styles.heroText}>
          <span style={styles.eyebrow}>ThoughtSpot Design System</span>
          <h1 style={styles.title}>
            Radiant<span style={styles.titleAccent}>Play</span>
          </h1>
          <p style={styles.subtitle}>
            A playground for building interactive prototypes with real Radiant components — so every screen stays consistent with the design system.
          </p>
          <div style={styles.statChips}>
            <span style={styles.statChip}>{getComponentCount()} components</span>
            <span style={styles.statChip}>{getIconCount()} icons</span>
            <span style={styles.statChip}>{getTokenCountLabel()} tokens</span>
            <span style={styles.statChip}>AI-powered</span>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.cardsContainer}>
          {/* Radiant Card */}
          <div style={styles.cardWrapper}>
            <div style={styles.cardHint}>
              <span style={styles.cardHintDot} />
              <span>You already know this</span>
            </div>
          <button
            style={styles.card}
            onClick={() => navigate('/radiant')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(39, 112, 239, 0.18), 0 0 0 1px rgba(39, 112, 239, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
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
            <h2 style={styles.cardTitle}>Radiant DS</h2>
            <p style={styles.cardDescription}>
              Explore the complete design system. Browse components, design tokens, icons, and documentation.
            </p>
            <div style={styles.cardStats}>
              <span style={styles.cardStatPill}>{getComponentCount()} Components</span>
              <span style={styles.cardStatPill}>{getIconCount()} Icons</span>
              <span style={styles.cardStatPill}>{getTokenCountLabel()} Tokens</span>
            </div>
            <div style={styles.cardCtaButton}>
              <span>Browse components</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          </div>

          {/* Playground Card */}
          <button
            style={styles.card}
            onClick={() => navigate('/playground')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(6, 191, 127, 0.18), 0 0 0 1px rgba(6, 191, 127, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
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
              <span style={styles.cardStatPill}>Full-page experience</span>
              <span style={styles.cardStatPill}>AI-powered</span>
            </div>
            <div style={{ ...styles.cardCtaButton, color: '#06BF7F', background: '#06BF7F12', borderColor: '#06BF7F30' }}>
              <span>Open projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Guide Banner */}
        <a
          href="/guide.html"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.guideBanner}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = referenceColors.blue['20'];
            el.style.borderColor = referenceColors.blue['30'];
            el.style.transform = 'translateY(-3px)';
            el.style.boxShadow = '0 12px 40px rgba(39, 112, 239, 0.16)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = referenceColors.blue['10'];
            el.style.borderColor = referenceColors.blue['20'];
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 4px 20px rgba(39, 112, 239, 0.08)';
          }}
        >
          <div style={styles.guideBannerIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={styles.guideBannerText}>
            <span style={styles.guideBannerTitle}>Getting started guide</span>
            <span style={styles.guideBannerDesc}>New to RadiantPlay? Walk through setup, scaffolding your first prototype, and building with AI — step by step.</span>
          </div>
          <div style={styles.guideBannerArrow}>
            <span>View guide</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>

        {/* Footer Links */}
        <div style={styles.footer}>
          <Link
            href="https://github.com/faris-ts/figmaradiant"
            target="_blank"
            color="gray"
            size="small"
            external
          >
            GitHub
          </Link>
          <span style={styles.footerDivider}>&middot;</span>
          <Button
            variant="tertiary"
            size="small"
            onClick={() => navigate('/radiant/architecture')}
          >
            Documentation
          </Button>
          <span style={styles.footerDivider}>&middot;</span>
          <Button
            variant="tertiary"
            size="small"
            onClick={() => navigate('/radiant/icons')}
          >
            Icons
          </Button>
        </div>

        {/* Fun Footer Message */}
        <div style={styles.funFooter}>
          {footerMessage}
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
    background: `linear-gradient(180deg, ${systemColors.light['background-sunken']} 0%, ${systemColors.light['background-base']} 100%)`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `96px ${spacing.H}px ${spacing.L}px`,
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
  },

  // Hero
  heroText: {
    textAlign: 'center',
    marginBottom: `${spacing.K}px`,
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: systemColors.light['content-brand'],
    background: referenceColors.blue['10'],
    border: `1px solid ${referenceColors.blue['20']}`,
    borderRadius: '99px',
    padding: `${spacing.A}px ${spacing.D}px`,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: `${spacing.E}px`,
  },
  title: {
    fontSize: '56px',
    fontWeight: 800,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.D}px`,
    letterSpacing: '-.03em',
    lineHeight: 1.1,
  },
  titleAccent: {
    color: systemColors.light['content-brand'],
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: 1.6,
    maxWidth: '520px',
    margin: '0 auto',
    marginBottom: `${spacing.F}px`,
  },
  statChips: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.B}px`,
    flexWrap: 'wrap',
  },
  statChip: {
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-secondary'],
    background: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '99px',
    padding: `${spacing.A}px ${spacing.C}px`,
  },

  // Cards
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: `${spacing.F}px`,
    width: '100%',
    marginBottom: `${spacing.F}px`,
  },

  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`,
  },
  cardHint: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 600,
    color: systemColors.light['content-tertiary'],
    letterSpacing: '0.02em',
  },
  cardHintDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: systemColors.light['content-brand'],
    animation: 'hintPulse 2s ease-in-out infinite',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: `${spacing.J}px ${spacing.H}px`,
    background: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 250ms cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  },
  cardIconWrapper: {
    marginBottom: `${spacing.F}px`,
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
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.C}px`,
    letterSpacing: '-0.5px',
  },
  cardDescription: {
    fontSize: '15px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: 1.6,
    marginBottom: `${spacing.E}px`,
    maxWidth: '280px',
  },
  cardStats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.B}px`,
    marginBottom: `${spacing.F}px`,
    flexWrap: 'wrap',
  },
  cardStatPill: {
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-secondary'],
    background: systemColors.light['background-sunken'],
    padding: `${spacing.A}px ${spacing.C}px`,
    borderRadius: '6px',
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  cardCtaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-brand'],
    background: referenceColors.blue['10'],
    padding: `${spacing.B}px ${spacing.E}px`,
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-information']}`,
    transition: 'all 150ms ease',
  },

  // Guide Banner
  guideBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.E}px`,
    width: '100%',
    padding: `${spacing.F}px ${spacing.H}px`,
    background: referenceColors.blue['10'],
    border: `1px solid ${referenceColors.blue['20']}`,
    borderRadius: '20px',
    textDecoration: 'none',
    color: systemColors.light['content-brand'],
    transition: 'all 250ms cubic-bezier(0.23, 1, 0.32, 1)',
    marginBottom: `${spacing.L}px`,
    boxShadow: '0 4px 20px rgba(39, 112, 239, 0.08)',
    cursor: 'pointer',
  },
  guideBannerIcon: {
    width: '52px',
    height: '52px',
    minWidth: '52px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(39, 112, 239, 0.3)',
  },
  guideBannerText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    flex: 1,
    minWidth: 0,
  },
  guideBannerTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    letterSpacing: '-0.3px',
  },
  guideBannerDesc: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: 1.5,
  },
  guideBannerArrow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-brand'],
    background: systemColors.light['background-base'],
    border: `1px solid ${referenceColors.blue['20']}`,
    borderRadius: '10px',
    padding: `${spacing.B}px ${spacing.D}px`,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  // Footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.C}px`,
  },
  footerDivider: {
    color: referenceColors.gray['30'],
  },
  funFooter: {
    marginTop: `${spacing.F}px`,
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-tertiary'],
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export default HomePage;
