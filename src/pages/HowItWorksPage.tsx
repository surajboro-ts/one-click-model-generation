import React from 'react';
import { useNavigate } from 'react-router-dom';
import { systemColors, referenceColors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';

const PRIORITY_FILES = [
  { priority: 1, file: '_orchestration.md', role: 'Router', desc: 'Determines which guidelines to consult based on the task type' },
  { priority: 2, file: 'prototype-generation.md', role: 'Core hub', desc: 'Code structure, import patterns, and generation workflow steps' },
  { priority: 3, file: 'component-inventory.md', role: 'Component picker', desc: 'Decision tree to find the right component for each UI element' },
  { priority: 4, file: 'widget-patterns.md', role: 'Interaction rules', desc: 'Alert types, menu ordering, delete confirmation, tooltips, tables' },
  { priority: 5, file: 'layout-patterns.md', role: 'Page templates', desc: 'Dashboard, admin, form, table page, and wizard layouts' },
  { priority: 6, file: 'figma-component-mapping.md', role: 'Figma translator', desc: 'Maps Figma layer names and screenshots to Radiant components' },
  { priority: 7, file: 'modal-patterns.md', role: 'Modal guide', desc: 'Size selection (M1-M4), types, footer placement, wizard progress' },
  { priority: 8, file: 'token-usage.md', role: 'Styling ref', desc: 'Color scales, spacing values, typography — never hard-code' },
  { priority: 9, file: 'content-guidelines.md', role: 'UI text rules', desc: 'Button labels, titles, errors — ThoughtSpot content patterns' },
  { priority: 10, file: 'product-knowledge.md', role: 'Domain context', desc: 'ThoughtSpot features: Answers, Liveboards, Spotter, SpotIQ' },
];

const DECISION_BRANCHES = [
  { input: 'Figma screenshot or URL', route: 'figma-component-mapping.md → prototype-generation.md', color: systemColors.light['content-brand'] },
  { input: 'Text description of a UI', route: 'prototype-generation.md + component-inventory.md', color: systemColors.light['content-success'] },
  { input: 'Dashboard / admin / settings', route: 'layout-patterns.md → prototype-generation.md', color: '#8B5CF6' },
  { input: 'Modal / wizard / dialog', route: 'modal-patterns.md → prototype-generation.md', color: referenceColors.yellow['70'] },
  { input: 'Table / menu / alert / toast', route: 'widget-patterns.md → prototype-generation.md', color: systemColors.light['content-failure'] },
];

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* Back link */}
        <div style={styles.backRow}>
          <Button variant="tertiary" size="small" onClick={() => navigate('/playground')}>
            &larr; Back to Playground
          </Button>
        </div>

        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeIcon}>✦</span>
          </div>
          <h1 style={styles.heroTitle}>How Prototyping Works</h1>
          <p style={styles.heroSubtitle}>
            When you ask Cursor to build a prototype, it follows a structured system of guideline files.
            An orchestrator routes the AI to the right files based on your request, ensuring consistent,
            production-quality output every time.
          </p>
        </div>

        {/* Section 1: The AI Pipeline */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>The AI Pipeline</h2>
          <p style={styles.sectionDesc}>
            Every request flows through a 5-step pipeline. The orchestrator classifies your task,
            loads the right guidelines, checks existing components, and generates code.
          </p>

          <div style={styles.pipelineFlow}>
            {[
              { label: 'Your prompt', color: systemColors.light['content-brand'], desc: 'Describe what you want in Cursor chat' },
              { label: 'Orchestrator classifies task', color: systemColors.light['content-success'], desc: '_orchestration.md reads your input type' },
              { label: 'Loads priority-ordered guidelines', color: '#8B5CF6', desc: 'Up to 10 rule files consulted in order' },
              { label: 'Checks existing 40+ components', color: referenceColors.yellow['70'], desc: 'Reuses before creating new ones' },
              { label: 'Generates code', color: systemColors.light['content-failure'], desc: 'Outputs production-quality React + tokens' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div style={styles.pipelineStep}>
                  <div style={{ ...styles.pipelineDot, backgroundColor: step.color }} />
                  <div>
                    <div style={styles.pipelineLabel}>{step.label}</div>
                    <div style={styles.pipelineDesc}>{step.desc}</div>
                  </div>
                </div>
                {i < 4 && <div style={styles.pipelineArrow}>↓</div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Section 2: Smart Routing */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Smart Routing</h2>
          <p style={styles.sectionDesc}>
            The orchestrator reads your input type and routes to the most relevant guideline files first.
            Different inputs trigger different file paths.
          </p>

          <div style={styles.branchGrid}>
            {DECISION_BRANCHES.map((branch, i) => (
              <div key={i} style={styles.branchCard}>
                <div style={{ ...styles.branchDot, backgroundColor: branch.color }} />
                <div>
                  <div style={styles.branchInput}>{branch.input}</div>
                  <div style={styles.branchRoute}>{branch.route}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Priority Reference Files */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Priority Reference Files</h2>
          <p style={styles.sectionDesc}>
            The AI consults these 10 files in priority order. All live in <code style={styles.inlineCode}>.cursor/rules/</code> and
            are loaded automatically by Cursor based on glob patterns.
          </p>

          <div style={styles.priorityGrid}>
            {PRIORITY_FILES.map((item) => (
              <div key={item.priority} style={styles.priorityCard}>
                <span style={styles.priorityBadge}>{item.priority}</span>
                <div style={styles.priorityContent}>
                  <div style={styles.priorityFile}>{item.file}</div>
                  <div style={styles.priorityRole}>{item.role}</div>
                  <div style={styles.priorityDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Component Reuse */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Component Reuse Strategy</h2>
          <p style={styles.sectionDesc}>
            The AI always prefers existing Radiant components. New components are only created when nothing
            suitable exists — and they stay local to your prototype.
          </p>

          <div style={styles.reuseGrid}>
            <div style={styles.reuseCard}>
              <div style={{ ...styles.reuseDot, backgroundColor: systemColors.light['content-success'] }} />
              <div>
                <div style={styles.reuseLabel}>Exact match</div>
                <div style={styles.reuseDesc}>Imports directly from the shared component library</div>
              </div>
            </div>
            <div style={styles.reuseCard}>
              <div style={{ ...styles.reuseDot, backgroundColor: systemColors.light['content-brand'] }} />
              <div>
                <div style={styles.reuseLabel}>Close match</div>
                <div style={styles.reuseDesc}>Uses existing component with custom props or styling overrides</div>
              </div>
            </div>
            <div style={styles.reuseCard}>
              <div style={{ ...styles.reuseDot, backgroundColor: referenceColors.yellow['70'] }} />
              <div>
                <div style={styles.reuseLabel}>No match</div>
                <div style={styles.reuseDesc}>Creates a local component in <code style={styles.inlineCode}>src/prototypes/YourProject/components/</code></div>
              </div>
            </div>
          </div>

          <div style={styles.reuseNote}>
            Local components follow the same design-system rules (tokens, forwardRef, TypeScript) but live inside
            your prototype folder, keeping the shared library clean.
          </div>
        </section>

        {/* Section 5: Getting Started */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Start</h2>
          <p style={styles.sectionDesc}>
            Two ways to create a new prototype. Both auto-register the project in the Playground gallery.
          </p>

          <div style={styles.optionsGrid}>
            {/* Option A */}
            <div style={styles.optionCard}>
              <div style={styles.optionHeader}>
                <div style={{ ...styles.optionBadge, background: systemColors.light['content-brand'] }}>A</div>
                <h3 style={styles.optionTitle}>Tell Cursor in chat</h3>
              </div>
              <p style={styles.optionDesc}>
                Describe what you want in the Cursor chat panel. Cursor will create the prototype folder,
                register it, and generate the UI in one step.
              </p>
              <div style={styles.promptExamples}>
                <div style={styles.promptItem}>
                  "Create a new prototype called UserOnboarding with a 3-step wizard"
                </div>
                <div style={styles.promptItem}>
                  "Create a prototype from this" + paste a Figma screenshot
                </div>
              </div>
              <p style={styles.optionHint}>Best for: quick starts, Figma-to-code, when you know what you want</p>
            </div>

            {/* Option B */}
            <div style={styles.optionCard}>
              <div style={styles.optionHeader}>
                <div style={{ ...styles.optionBadge, background: systemColors.light['content-success'] }}>B</div>
                <h3 style={styles.optionTitle}>Scaffold via terminal</h3>
              </div>
              <p style={styles.optionDesc}>
                Run the CLI command to generate a boilerplate prototype, then open the file and describe your UI.
              </p>
              <div style={styles.codeBlock}>
                <div style={styles.codeBlockHeader}>Terminal</div>
                <pre style={styles.codePre}>
                  <code style={styles.code}>npm run new-prototype MyPrototype</code>
                </pre>
              </div>
              <p style={styles.optionDesc}>
                Then open <code style={styles.inlineCode}>src/prototypes/MyPrototype/index.tsx</code> and use <strong>Cmd+K</strong> or the Chat panel.
              </p>
              <p style={styles.optionHint}>Best for: iterating in stages, starting with template boilerplate</p>
            </div>
          </div>
        </section>

        {/* Tip */}
        <div style={styles.tipBar}>
          <Icon name="info-circle" size="s" />
          <span>
            All guideline files live in <code style={styles.inlineCode}>.cursor/rules/</code> and are automatically loaded by Cursor
            based on glob patterns matching the files you're editing. The orchestrator ensures the AI never misses a relevant rule.
          </span>
        </div>

        {/* CTA */}
        <div style={styles.ctaSection}>
          <button
            style={styles.ctaPrimary}
            onClick={() => navigate('/playground')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(39, 112, 239, 0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(39, 112, 239, 0.3)'; }}
          >
            Open Playground
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: `linear-gradient(180deg, ${systemColors.light['background-sunken']} 0%, ${systemColors.light['background-base']} 100%)`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  main: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: `${spacing.J}px ${spacing.H}px ${spacing.L}px`,
  },
  backRow: {
    marginBottom: `${spacing.F}px`,
  },

  // Hero
  hero: {
    textAlign: 'center',
    marginBottom: `${spacing.J}px`,
  },
  heroBadge: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: `${spacing.E}px`,
    boxShadow: '0 8px 24px rgba(39, 112, 239, 0.3)',
  },
  heroBadgeIcon: {
    fontSize: '24px',
    color: '#ffffff',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.D}px`,
    letterSpacing: '-1px',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: 1.6,
    maxWidth: '620px',
    margin: '0 auto',
  },

  // Sections
  section: {
    background: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.D}px`,
    padding: `${spacing.H}px`,
    marginBottom: `${spacing.E}px`,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.B}px`,
    letterSpacing: '-0.3px',
  },
  sectionDesc: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: 1.6,
    marginBottom: `${spacing.F}px`,
  },

  // Pipeline
  pipelineFlow: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.A}px`,
    maxWidth: '480px',
  },
  pipelineStep: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.C}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  pipelineDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '4px',
  },
  pipelineLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '2px',
  },
  pipelineDesc: {
    fontSize: '12px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
  },
  pipelineArrow: {
    textAlign: 'center',
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
    lineHeight: '14px',
    paddingLeft: '14px',
  },

  // Branches
  branchGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`,
  },
  branchCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.C}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  branchDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '4px',
  },
  branchInput: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '2px',
  },
  branchRoute: {
    fontSize: '12px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    fontFamily: '"SF Mono", Monaco, monospace',
  },

  // Priority files
  priorityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${spacing.B}px`,
  },
  priorityCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  priorityBadge: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    backgroundColor: systemColors.light['background-subtle'],
    color: referenceColors.gray['70'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
    flexShrink: 0,
    marginTop: '1px',
  },
  priorityContent: {
    flex: 1,
    minWidth: 0,
  },
  priorityFile: {
    fontSize: '12px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    fontFamily: '"SF Mono", Monaco, monospace',
    marginBottom: '1px',
  },
  priorityRole: {
    fontSize: '11px',
    fontWeight: 600,
    color: systemColors.light['content-brand'],
    marginBottom: '2px',
  },
  priorityDesc: {
    fontSize: '12px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '16px',
  },

  // Reuse
  reuseGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`,
    marginBottom: `${spacing.D}px`,
  },
  reuseCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.C}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  reuseDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '4px',
  },
  reuseLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '2px',
  },
  reuseDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '18px',
  },
  reuseNote: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    backgroundColor: systemColors.light['background-sunken'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '8px',
    padding: '12px 16px',
  },

  // Options
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${spacing.D}px`,
  },
  optionCard: {
    background: systemColors.light['background-sunken'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.C}px`,
    padding: `${spacing.E}px`,
  },
  optionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    marginBottom: `${spacing.B}px`,
  },
  optionBadge: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 700,
    flexShrink: 0,
  },
  optionTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  optionDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    margin: `0 0 ${spacing.C}px 0`,
  },
  optionHint: {
    fontSize: '12px',
    fontWeight: 500,
    color: systemColors.light['content-tertiary'],
    fontStyle: 'italic',
    margin: 0,
  },
  promptExamples: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`,
    marginBottom: `${spacing.C}px`,
  },
  promptItem: {
    fontSize: '12px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '18px',
    fontStyle: 'italic',
    padding: `${spacing.B}px`,
    background: systemColors.light['background-base'],
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },

  // Code block
  codeBlock: {
    background: '#1E1E2E',
    borderRadius: `${spacing.C}px`,
    overflow: 'hidden',
    marginBottom: `${spacing.C}px`,
  },
  codeBlockHeader: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.4)',
    padding: `${spacing.B}px ${spacing.D}px 0`,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  codePre: {
    margin: 0,
    padding: `${spacing.C}px ${spacing.D}px`,
    overflow: 'auto',
  },
  code: {
    fontFamily: '"SF Mono", "Fira Code", Consolas, monospace',
    fontSize: '13px',
    lineHeight: 1.7,
    color: '#CDD6F4',
    whiteSpace: 'pre' as const,
  },

  // Inline code
  inlineCode: {
    fontFamily: '"SF Mono", Consolas, monospace',
    fontSize: '12.5px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    background: referenceColors.blue['10'],
    padding: `2px ${spacing.A}px`,
    borderRadius: `${spacing.A}px`,
    border: `1px solid ${systemColors.light['background-information']}`,
  },

  // Tip bar
  tipBar: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: referenceColors.blue['10'],
    borderRadius: `${spacing.B}px`,
    border: `1px solid ${systemColors.light['background-information']}`,
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    marginBottom: `${spacing.F}px`,
  },

  // CTA
  ctaSection: {
    textAlign: 'center',
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 4px 16px rgba(39, 112, 239, 0.3)',
  },
};

export default HowItWorksPage;
