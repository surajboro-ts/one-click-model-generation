import React, { useState } from 'react';
import { systemColors, referenceColors } from '../tokens/colors';

// Guideline sections data
const GUIDELINES_DATA = {
  designSystem: {
    title: 'Design System Rules',
    description: 'Core design system rules for creating and modifying React components',
    icon: '🎨',
    sections: [
      {
        title: 'File Structure',
        content: `Every component MUST follow this folder structure:

\`\`\`
src/components/ComponentName/
├── ComponentName.tsx        # Main component file
├── ComponentName.module.css # CSS Module styles
└── index.ts                 # Exports
\`\`\``,
      },
      {
        title: 'TypeScript Patterns',
        content: `• Use \`forwardRef\` for all interactive components
• Define and export all types with JSDoc comments
• Extend HTML element props when applicable
• Always include \`displayName\` for debugging`,
      },
      {
        title: 'Design Tokens',
        content: `NEVER hard-code colors, spacing, typography, or other visual values.

**In CSS Modules - Use CSS Variables:**
• Colors: \`var(--color-*)\`
• Spacing: \`var(--spacing-*)\`
• Typography: \`var(--font-*)\`
• Radius: \`var(--radius-*)\`
• Shadows: \`var(--shadow-*)\`
• Animation: \`var(--duration-*)\`, \`var(--easing-*)\``,
      },
      {
        title: 'CSS Module Conventions',
        content: `• Use camelCase for multi-word classes
• Use variant/size names directly as classes
• Build class names dynamically with \`filter(Boolean).join(' ')\`
• Always include passed className last`,
      },
      {
        title: 'Accessibility Requirements',
        content: `• Interactive elements must have focus styles
• Use semantic HTML elements (\`button\`, \`input\`, \`a\`, etc.)
• Add ARIA labels for icon-only buttons
• Use \`role="alert"\` for notification components
• Support keyboard navigation for custom interactive elements`,
      },
    ],
  },
  contentGuidelines: {
    title: 'Content Guidelines',
    description: 'ThoughtSpot content design rules for all UI text in components',
    icon: '✍️',
    sections: [
      {
        title: 'Core Principles',
        content: `1. **Sentence case** - Always (except ThoughtSpot features)
2. **Active voice** - User is the actor
3. **Imperative verbs** - Start with action words
4. **Present tense** - Describe results in present`,
      },
      {
        title: 'Buttons',
        content: `• 1-2 words max (e.g., "Save", "Export data")
• Use imperative verbs (e.g., "Delete", "Add filter")
• No periods
• No generic words like "Yes" or "OK"

**Approved verbs:** Create, Add, Delete, Remove, Save, Cancel, Edit, Export, Import, Search, Filter, Pin, View, Open, Close

**Avoid:** Submit, Proceed, Check, Modify, Refresh, Done, Confirm`,
      },
      {
        title: 'Labels & Titles',
        content: `**Labels:**
• 3 words max (e.g., "Pin to Liveboard")
• No articles (e.g., "Add filter" not "Add a filter")
• No punctuation

**Titles:**
• 4 words max (e.g., "Delete this Answer?")
• Modal: Start with verb (e.g., "Save your changes?")
• Match primary button text`,
      },
      {
        title: 'Errors & Alerts',
        content: `**Pattern:** Issue + Remedy + CTA

• System alert: message + action button
• Input error: remedy only, 3-5 words
• Toast: 4-6 words`,
      },
      {
        title: 'Capitalized Terms',
        content: `Always capitalize these ThoughtSpot features:
• Answer (the saved query result)
• Liveboard (never "Pinboard")
• SpotIQ, SpotApp
• Worksheet / Data Model
• Connection, Monitor
• Explore mode, Group`,
      },
    ],
  },
  productKnowledge: {
    title: 'Product Knowledge',
    description: 'ThoughtSpot product context and domain knowledge for development',
    icon: '💡',
    sections: [
      {
        title: 'Product Overview',
        content: `ThoughtSpot is an **AI-powered analytics platform** that enables business users to search and analyze data using natural language. The platform democratizes data access without requiring SQL or technical expertise.`,
      },
      {
        title: 'Core Objects',
        content: `• **Answer** - A saved search query result (chart, table, or visualization)
• **Liveboard** - A collection of pinned Answers forming a dashboard
• **Worksheet** - A curated data model for searching
• **Connection** - A link to an external data source
• **SpotIQ** - AI-powered automated insights feature
• **Monitor** - Scheduled alert on data thresholds
• **SpotApp** - Pre-built analytics application template`,
      },
      {
        title: 'User Roles',
        content: `• **Business User** - Search data, create Answers, build Liveboards, set Monitors
• **Data Analyst** - Create Worksheets, share insights, build SpotApps
• **Admin** - Manage Connections, configure security, deploy SpotApps`,
      },
      {
        title: 'UI Terminology',
        content: `**Navigation:**
• Search bar - Primary interface for natural language queries
• Data panel - Shows available columns/attributes
• Chart builder - Interface for customizing visualizations
• Side panel - Contextual settings and filters

**Actions:**
• "Save this chart" → Create Answer
• "Add to dashboard" → Pin to Liveboard
• "Share this" → Share (generates link or email)
• "Download" → Export (CSV, PDF, etc.)`,
      },
      {
        title: 'Brand Voice',
        content: `When building UI for ThoughtSpot, the tone should be:
• **Approachable** - Friendly, not intimidating
• **Genuine** - Honest, transparent about actions
• **Smart** - Concise, efficient language
• **Pioneering** - Forward-thinking, AI-first`,
      },
    ],
  },
};

// Accordion section component
const AccordionSection: React.FC<{
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, content, isOpen, onToggle }) => (
  <div style={styles.accordionItem}>
    <button style={styles.accordionHeader} onClick={onToggle}>
      <span style={styles.accordionTitle}>{title}</span>
      <span style={{
        ...styles.accordionIcon,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
    {isOpen && (
      <div style={styles.accordionContent}>
        {content.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line.startsWith('**') && line.endsWith('**') ? (
              <strong style={styles.boldText}>{line.replace(/\*\*/g, '')}</strong>
            ) : line.startsWith('•') ? (
              <div style={styles.bulletPoint}>{renderFormattedText(line)}</div>
            ) : line.startsWith('```') ? (
              <pre style={styles.codeBlock}>{line.replace(/```/g, '')}</pre>
            ) : line.match(/^\d\./) ? (
              <div style={styles.numberedItem}>{renderFormattedText(line)}</div>
            ) : (
              <p style={styles.paragraph}>{renderFormattedText(line)}</p>
            )}
          </React.Fragment>
        ))}
      </div>
    )}
  </div>
);

// Helper to render inline formatting
const renderFormattedText = (text: string): React.ReactNode => {
  // Handle **bold** and `code` formatting
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={styles.boldText}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} style={styles.inlineCode}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

// Guideline card component
const GuidelineCard: React.FC<{
  data: typeof GUIDELINES_DATA.designSystem;
  openSections: string[];
  onToggleSection: (sectionTitle: string) => void;
}> = ({ data, openSections, onToggleSection }) => (
  <div style={styles.guidelineCard}>
    <div style={styles.cardHeader}>
      <span style={styles.cardIcon}>{data.icon}</span>
      <div>
        <h2 style={styles.cardTitle}>{data.title}</h2>
        <p style={styles.cardDescription}>{data.description}</p>
      </div>
    </div>
    <div style={styles.accordionList}>
      {data.sections.map((section) => (
        <AccordionSection
          key={section.title}
          title={section.title}
          content={section.content}
          isOpen={openSections.includes(section.title)}
          onToggle={() => onToggleSection(section.title)}
        />
      ))}
    </div>
  </div>
);

export const GuidelinesPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([
    'File Structure',
    'Core Principles',
    'Product Overview',
  ]);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const expandAll = () => {
    const allTitles = [
      ...GUIDELINES_DATA.designSystem.sections,
      ...GUIDELINES_DATA.contentGuidelines.sections,
      ...GUIDELINES_DATA.productKnowledge.sections,
    ].map(s => s.title);
    setOpenSections(allTitles);
  };

  const collapseAll = () => {
    setOpenSections([]);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <section style={styles.headerSection}>
        <div style={styles.headerContent}>
          <h1 style={styles.pageTitle}>Guidelines</h1>
          <p style={styles.pageDescription}>
            Essential rules and best practices for building components in the Radiant Design System.
            These guidelines are automatically applied when you work in Cursor AI.
          </p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionButton} onClick={expandAll}>
            Expand all
          </button>
          <button style={styles.actionButton} onClick={collapseAll}>
            Collapse all
          </button>
        </div>
      </section>

      {/* Quick Reference Cards */}
      <section style={styles.quickRefSection}>
        <h3 style={styles.sectionTitle}>Quick Reference</h3>
        <div style={styles.quickRefGrid}>
          <div style={styles.quickRefCard}>
            <div style={styles.quickRefIcon}>📁</div>
            <div style={styles.quickRefTitle}>File Structure</div>
            <div style={styles.quickRefValue}>ComponentName.tsx + .module.css + index.ts</div>
          </div>
          <div style={styles.quickRefCard}>
            <div style={styles.quickRefIcon}>🎨</div>
            <div style={styles.quickRefTitle}>Colors</div>
            <div style={styles.quickRefValue}>var(--color-*) only, never hex</div>
          </div>
          <div style={styles.quickRefCard}>
            <div style={styles.quickRefIcon}>✍️</div>
            <div style={styles.quickRefTitle}>Text Case</div>
            <div style={styles.quickRefValue}>Sentence case everywhere</div>
          </div>
          <div style={styles.quickRefCard}>
            <div style={styles.quickRefIcon}>🔘</div>
            <div style={styles.quickRefTitle}>Buttons</div>
            <div style={styles.quickRefValue}>1-2 words, imperative verbs</div>
          </div>
        </div>
      </section>

      {/* Guideline Cards */}
      <div style={styles.guidelinesGrid}>
        <GuidelineCard
          data={GUIDELINES_DATA.designSystem}
          openSections={openSections}
          onToggleSection={toggleSection}
        />
        <GuidelineCard
          data={GUIDELINES_DATA.contentGuidelines}
          openSections={openSections}
          onToggleSection={toggleSection}
        />
        <GuidelineCard
          data={GUIDELINES_DATA.productKnowledge}
          openSections={openSections}
          onToggleSection={toggleSection}
        />
      </div>

      {/* Footer Note */}
      <section style={styles.footerNote}>
        <div style={styles.footerIcon}>💡</div>
        <div>
          <strong>Pro tip:</strong> These guidelines are defined in <code style={styles.inlineCode}>.cursor/rules/</code> and are automatically applied by Cursor AI when you create or modify components.
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },

  // Header
  headerSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '24px',
  },
  headerContent: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '32px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '12px',
  },
  pageDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 375,
    color: systemColors.light['content-secondary'],
    lineHeight: '24px',
    maxWidth: '600px',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  actionButton: {
    padding: '8px 16px',
    backgroundColor: systemColors.light['background-sunken'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '8px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: referenceColors.gray['70'],
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  // Quick Reference
  quickRefSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-tertiary'],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: 0,
  },
  quickRefGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  quickRefCard: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  quickRefIcon: {
    fontSize: '24px',
  },
  quickRefTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  quickRefValue: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 375,
    color: systemColors.light['content-secondary'],
  },

  // Guidelines Grid
  guidelinesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  // Guideline Card
  guidelineCard: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '24px',
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  },
  cardIcon: {
    fontSize: '32px',
    lineHeight: 1,
  },
  cardTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '4px',
  },
  cardDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: systemColors.light['content-secondary'],
    margin: 0,
  },

  // Accordion
  accordionList: {
    display: 'flex',
    flexDirection: 'column',
  },
  accordionItem: {
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  },
  accordionHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
  accordionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
  },
  accordionIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: systemColors.light['content-tertiary'],
    transition: 'transform 200ms ease',
  },
  accordionContent: {
    padding: '0 24px 20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  // Text styles
  paragraph: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: referenceColors.gray['70'],
    lineHeight: '22px',
    margin: 0,
  },
  boldText: {
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  bulletPoint: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: referenceColors.gray['70'],
    lineHeight: '22px',
    paddingLeft: '8px',
  },
  numberedItem: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: referenceColors.gray['70'],
    lineHeight: '22px',
  },
  inlineCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '13px',
    backgroundColor: systemColors.light['background-sunken'],
    padding: '2px 6px',
    borderRadius: '4px',
    color: systemColors.light['content-brand'],
  },
  codeBlock: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '13px',
    backgroundColor: systemColors.light['background-sunken'],
    padding: '12px 16px',
    borderRadius: '6px',
    color: systemColors.light['background-raised-inverse'],
    whiteSpace: 'pre-wrap',
    margin: '8px 0',
    lineHeight: '20px',
  },

  // Footer Note
  footerNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '20px',
    backgroundColor: referenceColors.blue['10'],
    borderRadius: '10px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: referenceColors.gray['70'],
    lineHeight: '22px',
  },
  footerIcon: {
    fontSize: '20px',
    lineHeight: 1,
  },
};

export default GuidelinesPage;
