import React from 'react';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../tokens/colors/brand';
import { spacing } from '../tokens/spacing';
import { getComponentCount, getIconCount, getTokenCountLabel } from '../data/componentRegistry';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { Link } from '../components/Link';

/**
 * HomePage - Simple split landing page
 * 
 * Two large cards for navigating to:
 * - Radiant: Design system preview (components, tokens, icons)
 * - Playground: Project gallery for designer prototypes
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Random footer messages that cycle on each page load
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
      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.heroText}>
          <h1 style={styles.title}>Radiant Design System and Playground</h1>
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

        {/* Getting Started Guide */}
        <section style={styles.guideSection}>
          <div style={styles.guideSectionHeader}>
            <h2 style={styles.guideTitle}>Getting started</h2>
            <p style={styles.guideSubtitle}>
              Set up your environment and start building prototypes in minutes.
            </p>
          </div>

          {/* Step 1: Fork and start the project */}
          <div style={styles.stepCard}>
            <div style={styles.stepHeader}>
              <div style={styles.stepBadge}>
                <span style={styles.stepNumber}>1</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={styles.stepTitle}>Fork and start the project</h3>
                <p style={styles.stepDescription}>
                  Get the Radiant Prototyping Kit running locally in under 5 minutes.
                </p>
              </div>
            </div>
            <div style={styles.stepBody}>
              <div style={styles.stepPrereqs}>
                <span style={styles.prereqLabel}>Prerequisites</span>
                <span style={styles.prereqItem}>Node.js 18+</span>
                <span style={styles.prereqDot}>&middot;</span>
                <span style={styles.prereqItem}>Cursor IDE</span>
                <span style={styles.prereqDot}>&middot;</span>
                <span style={styles.prereqItem}>GitHub access (invite required)</span>
              </div>
              <div style={styles.stepInstructions}>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>a.</span>
                  <span style={styles.instructionText}>
                    Get access to the{' '}
                    <a
                      href="https://github.com/faris-ts/figmaradiant"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.inlineLink}
                    >
                      figmaradiant GitHub repository
                    </a>
                    {' '}(private — request an invite from the design systems team)
                  </span>
                </div>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>b.</span>
                  <span style={styles.instructionText}>
                    Fork the repository, then clone your fork locally
                  </span>
                </div>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>c.</span>
                  <span style={styles.instructionText}>
                    Open the folder in <strong>Cursor IDE</strong> — AI rules load automatically from{' '}
                    <code style={styles.inlineCode}>.cursor/rules/</code>
                  </span>
                </div>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>d.</span>
                  <span style={styles.instructionText}>
                    Install dependencies and start the dev server
                  </span>
                </div>
              </div>
              <div style={styles.codeBlock}>
                <div style={styles.codeBlockHeader}>Terminal</div>
                <pre style={styles.codePre}>
                  <code style={styles.code}>
{`git clone https://github.com/YOUR-USERNAME/figmaradiant.git
cd figmaradiant
npm install
npm run dev`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2: Create your first prototype */}
          <div style={styles.stepCard}>
            <div style={styles.stepHeader}>
              <div style={{ ...styles.stepBadge, background: 'linear-gradient(135deg, #06BF7F 0%, #059669 100%)', boxShadow: '0 4px 12px rgba(6, 191, 127, 0.3)' }}>
                <span style={styles.stepNumber}>2</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={styles.stepTitle}>Create your first prototype</h3>
                <p style={styles.stepDescription}>
                  Use the CLI to scaffold a prototype, then describe your UI to Cursor AI.
                </p>
              </div>
            </div>
            <div style={styles.stepBody}>
              <div style={styles.stepInstructions}>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>a.</span>
                  <span style={styles.instructionText}>
                    Open a second terminal and run the scaffold command
                  </span>
                </div>
              </div>
              <div style={styles.codeBlock}>
                <div style={styles.codeBlockHeader}>Terminal</div>
                <pre style={styles.codePre}>
                  <code style={styles.code}>
{`npm run new-prototype MyPrototype`}
                  </code>
                </pre>
              </div>
              <div style={styles.stepInstructions}>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>b.</span>
                  <span style={styles.instructionText}>
                    Open the generated file and use <code style={styles.inlineCode}>Cmd+K</code> (inline edit) or the <strong>Chat panel</strong> to describe your UI
                  </span>
                </div>
              </div>
              <div style={styles.promptExamples}>
                <div style={styles.promptLabel}>Example prompts</div>
                <div style={styles.promptItem}>
                  <span style={styles.promptQuote}>"</span>
                  Create a user onboarding wizard with 3 steps: welcome screen, profile form, and notification preferences with toggles
                  <span style={styles.promptQuote}>"</span>
                </div>
                <div style={styles.promptItem}>
                  <span style={styles.promptQuote}>"</span>
                  Build a data dashboard with 4 KPI cards, a tab bar, and a data table with search and filters
                  <span style={styles.promptQuote}>"</span>
                </div>
                <div style={styles.promptItem}>
                  <span style={styles.promptQuote}>"</span>
                  Recreate this UI using Radiant components
                  <span style={styles.promptQuote}>"</span>
                  <span style={styles.promptHint}> — paste a Figma screenshot</span>
                </div>
              </div>
              <div style={styles.stepInstructions}>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionMarker}>c.</span>
                  <span style={styles.instructionText}>
                    Preview at <code style={styles.inlineCode}>localhost:5173</code> — navigate to the Playground to see your prototype listed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Give context to Cursor */}
          <div style={styles.stepCard}>
            <div style={styles.stepHeader}>
              <div style={{ ...styles.stepBadge, background: 'linear-gradient(135deg, #F0A92B 0%, #D4910E 100%)', boxShadow: '0 4px 12px rgba(240, 169, 43, 0.3)' }}>
                <span style={styles.stepNumber}>3</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={styles.stepTitle}>Give context to Cursor</h3>
                <p style={styles.stepDescription}>
                  Help Cursor understand your designs, product requirements, and project context for better code generation.
                </p>
              </div>
            </div>
            <div style={styles.stepBody}>
              <div style={styles.contextGrid}>
                <div style={styles.contextCard}>
                  <div style={styles.contextIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15L17 21H7L12 15Z" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 style={styles.contextTitle}>Figma MCP</h4>
                  <p style={styles.contextDescription}>
                    Connect Figma to Cursor via the Figma MCP server. Paste design URLs directly in chat for AI to reference your live designs.
                  </p>
                </div>
                <div style={styles.contextCard}>
                  <div style={styles.contextIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke={brandColors.blue[60]} strokeWidth="2"/>
                      <path d="M21 15L16 10L5 21" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 style={styles.contextTitle}>Screenshots</h4>
                  <p style={styles.contextDescription}>
                    Paste Figma screenshots directly into Cursor chat and say "Recreate this using Radiant components" for instant prototypes.
                  </p>
                </div>
                <div style={styles.contextCard}>
                  <div style={styles.contextIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke={brandColors.blue[60]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 style={styles.contextTitle}>Product knowledge</h4>
                  <p style={styles.contextDescription}>
                    Add feature specs, user stories, and design decisions to <code style={styles.inlineCode}>project.config.ts</code> so AI understands the "why" behind your prototypes.
                  </p>
                </div>
              </div>
              <div style={styles.contextTip}>
                <div style={{ flexShrink: 0, marginTop: '1px', color: brandColors.blue[60] }}>
                  <Icon name="info-circle" size="s" />
                </div>
                <span style={styles.contextTipText}>
                  The <code style={styles.inlineCode}>.cursor/rules/</code> directory already contains Radiant design system rules that Cursor loads automatically — no setup needed.
                </span>
              </div>
            </div>
          </div>
        </section>

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
    background: `linear-gradient(180deg, ${brandColors.gray[10]} 0%, ${brandColors.white} 100%)`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Main
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.M}px ${spacing.H}px ${spacing.L}px`, // 80px 32px 64px
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
  },

  // Hero Text
  heroText: {
    textAlign: 'center',
    marginBottom: `${spacing.J}px`, // 48px
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    color: brandColors.gray[90],
    marginBottom: `${spacing.D}px`, // 16px
    letterSpacing: '-1px',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: 1.6,
    maxWidth: '560px',
    margin: '0 auto',
  },

  // Cards Container
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: `${spacing.F}px`, // 24px
    width: '100%',
    marginBottom: `${spacing.J}px`, // 48px
  },

  // Card
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: `${spacing.I}px ${spacing.H}px`, // 40px 32px
    background: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: `${spacing.E}px`, // 20px
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  cardIconWrapper: {
    marginBottom: `${spacing.F}px`, // 24px
  },
  cardIcon: {
    width: '72px',
    height: '72px',
    borderRadius: `${spacing.E}px`, // 20px
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.C}px`, // 12px
    letterSpacing: '-0.5px',
  },
  cardDescription: {
    fontSize: '15px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: 1.6,
    marginBottom: `${spacing.E}px`, // 20px
    maxWidth: '280px',
  },
  cardStats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.F}px`, // 24px
    flexWrap: 'wrap',
  },
  cardStatPill: {
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.gray[60],
    background: brandColors.gray[10],
    padding: `${spacing.A}px ${spacing.C}px`, // 4px 12px
    borderRadius: `${spacing.A}px`, // 4px (using 6px originally but rounding to token)
    border: `1px solid ${brandColors.gray[20]}`,
  },
  cardCtaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.blue[60],
    background: brandColors.blue[10],
    padding: `${spacing.B}px ${spacing.E}px`, // 8px 20px (using 10px → 8px)
    borderRadius: `${spacing.B}px`, // 8px (using 10px → 8px)
    border: `1px solid ${brandColors.blue[20]}`,
    transition: 'all 150ms ease',
  },

  // Guide Section
  guideSection: {
    width: '100%',
    marginBottom: `${spacing.J}px`, // 48px
  },
  guideSectionHeader: {
    textAlign: 'center',
    marginBottom: `${spacing.H}px`, // 32px
  },
  guideTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: brandColors.gray[90],
    marginBottom: `${spacing.C}px`, // 12px
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
  },
  guideSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: 1.6,
    maxWidth: '480px',
    margin: '0 auto',
  },

  // Step Card
  stepCard: {
    background: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: `${spacing.D}px`, // 16px
    padding: `${spacing.H}px`, // 32px
    marginBottom: `${spacing.E}px`, // 20px
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.D}px`, // 16px
    marginBottom: `${spacing.F}px`, // 24px
  },
  stepBadge: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: `${spacing.C}px`, // 12px
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(39, 112, 239, 0.3)',
  },
  stepNumber: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1,
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.A}px`, // 4px (snapped from 6px)
    letterSpacing: '-0.3px',
    lineHeight: 1.3,
  },
  stepDescription: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: 1.5,
    margin: 0,
  },
  stepBody: {
    paddingLeft: `${spacing.K}px`, // 56px
  },

  // Prerequisites
  stepPrereqs: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.E}px`, // 20px
    flexWrap: 'wrap' as const,
  },
  prereqLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: brandColors.gray[50],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginRight: `${spacing.A}px`, // 4px
  },
  prereqItem: {
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.gray[60],
    background: brandColors.gray[10],
    padding: `${spacing.A-1}px ${spacing.B}px`, // 3px 8px (using B for horizontal)
    borderRadius: `${spacing.A}px`, // 4px (using 6px → 4px)
    border: `1px solid ${brandColors.gray[20]}`,
  },
  prereqDot: {
    color: brandColors.gray[30],
    fontSize: '12px',
  },

  // Instructions
  stepInstructions: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.C}px`, // 12px
    marginBottom: `${spacing.D}px`, // 16px
  },
  instructionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px (using 10px → 8px)
  },
  instructionMarker: {
    fontSize: '13px',
    fontWeight: 600,
    color: brandColors.gray[50],
    minWidth: '20px',
    lineHeight: '22px',
  },
  instructionText: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[80],
    lineHeight: '22px',
  },

  // Code Block
  codeBlock: {
    background: '#1E1E2E',
    borderRadius: `${spacing.C}px`, // 12px
    overflow: 'hidden',
    marginBottom: `${spacing.D}px`, // 16px
  },
  codeBlockHeader: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.4)',
    padding: `${spacing.B}px ${spacing.D}px 0`, // 8px 16px 0 (using 10px → 8px)
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  codePre: {
    margin: 0,
    padding: `${spacing.C}px ${spacing.D}px ${spacing.C}px`, // 12px 16px 12px (using 14px → 12px)
    overflow: 'auto',
  },
  code: {
    fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
    fontSize: '13px',
    lineHeight: 1.7,
    color: '#CDD6F4',
    whiteSpace: 'pre' as const,
  },

  // Inline Code
  inlineCode: {
    fontFamily: '"SF Mono", "Fira Code", Consolas, monospace',
    fontSize: '12.5px',
    fontWeight: 500,
    color: brandColors.blue[60],
    background: `${brandColors.blue[10]}`,
    padding: `2px ${spacing.A}px`, // 2px 4px (using 6px → 4px)
    borderRadius: `${spacing.A}px`, // 4px
    border: `1px solid ${brandColors.blue[20]}`,
  },

  // Inline Link
  inlineLink: {
    color: brandColors.blue[60],
    textDecoration: 'none',
    fontWeight: 500,
    borderBottom: `1px solid ${brandColors.blue[30]}`,
  },

  // Prompt Examples
  promptExamples: {
    background: brandColors.gray[10],
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.D}px ${spacing.E}px`, // 16px 20px
    marginBottom: `${spacing.D}px`, // 16px
  },
  promptLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: brandColors.gray[50],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: `${spacing.C}px`, // 12px
  },
  promptItem: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[70],
    lineHeight: 1.6,
    fontStyle: 'italic',
    marginBottom: `${spacing.B}px`, // 8px
    paddingLeft: `${spacing.B}px`, // 8px
    borderLeft: `2px solid ${brandColors.gray[20]}`,
  },
  promptQuote: {
    color: brandColors.gray[30],
    fontStyle: 'normal',
  },
  promptHint: {
    fontStyle: 'normal',
    color: brandColors.gray[50],
    fontSize: '12px',
  },

  // Context Grid (Step 3)
  contextGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: `${spacing.D}px`, // 16px
    marginBottom: `${spacing.D}px`, // 16px
  },
  contextCard: {
    background: brandColors.gray[10],
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.E}px`, // 20px
  },
  contextIconWrapper: {
    width: '36px',
    height: '36px',
    borderRadius: `${spacing.B}px`, // 8px (using 10px → 8px)
    background: brandColors.blue[10],
    border: `1px solid ${brandColors.blue[20]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: `${spacing.C}px`, // 12px
  },
  contextTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.A}px`, // 4px (using 6px → 4px)
    letterSpacing: '-0.2px',
  },
  contextDescription: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: 1.5,
    margin: 0,
  },
  contextTip: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px (using 10px → 8px)
    background: brandColors.blue[10],
    border: `1px solid ${brandColors.blue[20]}`,
    borderRadius: `${spacing.B}px`, // 8px (using 10px → 8px)
    padding: `${spacing.C}px ${spacing.D}px`, // 12px 16px (using 14px → 12px)
  },
  contextTipText: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.C}px`, // 12px
  },
  footerLink: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[60],
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'color 150ms ease',
    fontFamily: 'inherit',
  },
  footerDivider: {
    color: brandColors.gray[30],
  },
  funFooter: {
    marginTop: `${spacing.F}px`, // 24px
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[50],
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export default HomePage;
