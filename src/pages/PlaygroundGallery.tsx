import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { systemColors, referenceColors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { getAllProjects, ProjectMeta } from '../prototypes/registry';
import { Icon } from '../components/icons';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

/**
 * PlaygroundGallery
 * 
 * Displays a grid of all playground projects for designers to browse and open.
 * Each project is shown as a card with its name, description, and author.
 */
export const PlaygroundGallery: React.FC = () => {
  const navigate = useNavigate();
  const projects = getAllProjects();
  const [guideOpen, setGuideOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);

  const handleOpenProject = (projectId: string) => {
    navigate(`/playground/${projectId}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <Button
          variant="tertiary"
          icon="arrow-left"
          iconPosition="leading"
          onClick={handleBackToHome}
        >
          Home
        </Button>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>Playground</h1>
          <p style={styles.subtitle}>Your prototypes and experiments</p>
        </div>
        <div style={styles.headerActions}>
          <Button
            variant="secondary"
            size="small"
            icon="info-circle"
            iconPosition="leading"
            onClick={() => setGuideOpen(!guideOpen)}
          >
            How prototyping works
          </Button>
        </div>
      </header>

      {/* How Prototyping Works Guide */}
      {guideOpen && <HowItWorksGuide />}

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.grid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleOpenProject(project.id)}
            />
          ))}
          {/* Create New Project Card — always the last card */}
          <CreateNewProjectCard onClick={() => setNewProjectModalOpen(true)} />
        </div>
      </main>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
      />
    </div>
  );
};

/**
 * How It Works Guide
 * 
 * Explains the AI prototyping workflow — the orchestrator, priority system,
 * and how different guideline files are referenced during generation.
 */
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

const HowItWorksGuide: React.FC = () => {
  return (
    <div style={guideStyles.wrapper}>
      <div style={guideStyles.container}>
        {/* Intro */}
        <div style={guideStyles.intro}>
          <div style={guideStyles.introIcon}>✦</div>
          <div>
            <h2 style={guideStyles.introTitle}>How AI prototyping works</h2>
            <p style={guideStyles.introDesc}>
              When you ask Cursor to build a prototype, it follows a structured system of guideline files stored in{' '}
              <code style={styles.code}>.cursor/rules/</code>. An orchestrator routes the AI to the right files based on your request,
              ensuring consistent, production-quality output every time.
            </p>
          </div>
        </div>

        {/* 2x2 grid */}
        <div style={guideStyles.columns}>
          {/* Column 1: The Flow */}
          <div style={guideStyles.column}>
            <div style={guideStyles.columnHeader}>
              <span style={guideStyles.columnNumber}>1</span>
              <h3 style={guideStyles.columnTitle}>The orchestrator</h3>
            </div>
            <p style={guideStyles.columnDesc}>
              Every request starts at <code style={styles.code}>_orchestration.md</code> — the master router.
              It classifies your task and determines which guideline files to load.
            </p>
            <div style={guideStyles.flowDiagram}>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: systemColors.light['content-brand'] }} />
                <span style={guideStyles.flowLabel}>Your prompt</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: systemColors.light['content-success'] }} />
                <span style={guideStyles.flowLabel}>Orchestrator classifies task</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: '#8B5CF6' }} />
                <span style={guideStyles.flowLabel}>Loads priority-ordered guidelines</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: referenceColors.yellow['70'] }} />
                <span style={guideStyles.flowLabel}>Checks existing 40+ components</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: systemColors.light['content-failure'] }} />
                <span style={guideStyles.flowLabel}>Generates code (reuse or create local)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Decision Routing */}
          <div style={guideStyles.column}>
            <div style={guideStyles.columnHeader}>
              <span style={guideStyles.columnNumber}>2</span>
              <h3 style={guideStyles.columnTitle}>Smart routing</h3>
            </div>
            <p style={guideStyles.columnDesc}>
              The orchestrator reads your input type and routes to the most relevant files first.
              Different inputs trigger different file paths:
            </p>
            <div style={guideStyles.branchList}>
              {DECISION_BRANCHES.map((branch, i) => (
                <div key={i} style={guideStyles.branchItem}>
                  <div style={{ ...guideStyles.branchDot, backgroundColor: branch.color }} />
                  <div>
                    <div style={guideStyles.branchInput}>{branch.input}</div>
                    <div style={guideStyles.branchRoute}>{branch.route}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Priority Stack */}
          <div style={guideStyles.column}>
            <div style={guideStyles.columnHeader}>
              <span style={guideStyles.columnNumber}>3</span>
              <h3 style={guideStyles.columnTitle}>Priority reference files</h3>
            </div>
            <p style={guideStyles.columnDesc}>
              The AI consults these 10 files in priority order.
              Files marked "Always" are read on every request:
            </p>
            <div style={guideStyles.priorityList}>
              {PRIORITY_FILES.map((item) => (
                <div key={item.priority} style={guideStyles.priorityItem}>
                  <span style={guideStyles.priorityBadge}>{item.priority}</span>
                  <div style={guideStyles.priorityContent}>
                    <div style={guideStyles.priorityFile}>{item.file}</div>
                    <div style={guideStyles.priorityDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Component Reuse */}
          <div style={guideStyles.column}>
            <div style={guideStyles.columnHeader}>
              <span style={guideStyles.columnNumber}>4</span>
              <h3 style={guideStyles.columnTitle}>Component reuse</h3>
            </div>
            <p style={guideStyles.columnDesc}>
              The AI always prefers existing Radiant components. New components are only created
              when nothing suitable exists — and they stay local to your prototype.
            </p>
            <div style={guideStyles.reuseList}>
              <div style={guideStyles.reuseItem}>
                <div style={{ ...guideStyles.reuseDot, backgroundColor: systemColors.light['content-success'] }} />
                <div>
                  <div style={guideStyles.reuseLabel}>Exact match</div>
                  <div style={guideStyles.reuseDesc}>Imports from shared component library</div>
                </div>
              </div>
              <div style={guideStyles.reuseItem}>
                <div style={{ ...guideStyles.reuseDot, backgroundColor: systemColors.light['content-brand'] }} />
                <div>
                  <div style={guideStyles.reuseLabel}>Close match</div>
                  <div style={guideStyles.reuseDesc}>Uses existing component with props/styling</div>
                </div>
              </div>
              <div style={guideStyles.reuseItem}>
                <div style={{ ...guideStyles.reuseDot, backgroundColor: referenceColors.yellow['70'] }} />
                <div>
                  <div style={guideStyles.reuseLabel}>No match</div>
                  <div style={guideStyles.reuseDesc}>Creates local component in prototype folder</div>
                </div>
              </div>
            </div>
            <div style={guideStyles.reuseNote}>
              Local components follow the same design-system rules (tokens, forwardRef, TypeScript) but live in{' '}
              <code style={styles.code}>src/prototypes/YourProject/components/</code>
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div style={guideStyles.tip}>
          <Icon name="info-circle" size="s" />
          <span>
            All guideline files live in <code style={styles.code}>.cursor/rules/</code> and are automatically loaded by Cursor 
            based on glob patterns matching the files you're editing. The orchestrator ensures the AI never misses a relevant rule.
          </span>
        </div>
      </div>
    </div>
  );
};

const guideStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    backgroundColor: systemColors.light['background-base'],
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${spacing.G}px ${spacing.H}px ${spacing.F}px`, // 28px 32px 24px
  },
  intro: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.D}px`, // 16px
    marginBottom: `${spacing.F}px`, // 24px
  },
  introIcon: {
    fontSize: '20px',
    lineHeight: '28px',
    color: systemColors.light['content-brand'],
    flexShrink: 0,
  },
  introTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.A}px`, // 4px
  },
  introDesc: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '22px',
    margin: 0,
    maxWidth: '720px',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${spacing.D}px`, // 16px
    marginBottom: `${spacing.E}px`, // 20px
  },
  column: {
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.E}px`, // 20px
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.B}px`, // 8px
  },
  columnNumber: {
    width: '22px',
    height: '22px',
    borderRadius: `${spacing.A}px`, // 4px
    backgroundColor: systemColors.light['content-brand'],
    color: systemColors.light['background-base'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    flexShrink: 0,
  },
  columnTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  columnDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    margin: `0 0 ${spacing.D}px 0`, // 0 0 16px 0
  },

  // Flow diagram
  flowDiagram: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.A}px`, // 4px
  },
  flowStep: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    backgroundColor: systemColors.light['background-base'],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  flowDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  flowLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: systemColors.light['background-raised-inverse'],
  },
  flowArrow: {
    textAlign: 'center',
    fontSize: '11px',
    color: systemColors.light['content-tertiary'],
    lineHeight: '12px',
  },

  // Decision branches
  branchList: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`, // 8px
  },
  branchItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    backgroundColor: systemColors.light['background-base'],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  branchDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: `${spacing.A}px`, // 4px
  },
  branchInput: {
    fontSize: '12px',
    fontWeight: 600,
    color: systemColors.light['background-raised-inverse'],
    marginBottom: '2px',
  },
  branchRoute: {
    fontSize: '11px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    fontFamily: '"SF Mono", Monaco, monospace',
  },

  // Priority list
  priorityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.A}px`, // 4px
    maxHeight: '280px',
    overflowY: 'auto',
  },
  priorityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.A}px ${spacing.B}px`, // 4px 8px
    borderRadius: `${spacing.A}px`, // 4px
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  priorityBadge: {
    width: '18px',
    height: '18px',
    borderRadius: `${spacing.A}px`, // 4px
    backgroundColor: systemColors.light['background-subtle'],
    color: referenceColors.gray['70'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 700,
    flexShrink: 0,
    marginTop: '1px',
  },
  priorityContent: {
    flex: 1,
    minWidth: 0,
  },
  priorityFile: {
    fontSize: '11px',
    fontWeight: 600,
    color: systemColors.light['background-raised-inverse'],
    fontFamily: '"SF Mono", Monaco, monospace',
    marginBottom: '1px',
  },
  priorityDesc: {
    fontSize: '11px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '15px',
  },

  // Component reuse
  reuseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.C}px`, // 12px
  },
  reuseItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    backgroundColor: systemColors.light['background-base'],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  reuseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: `${spacing.A}px`, // 4px
  },
  reuseLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: systemColors.light['background-raised-inverse'],
    marginBottom: '2px',
  },
  reuseDesc: {
    fontSize: '11px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
  },
  reuseNote: {
    fontSize: '11px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '17px',
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    backgroundColor: systemColors.light['background-base'],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },

  // Tip
  tip: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.B}px ${spacing.D}px`, // 8px 16px
    backgroundColor: referenceColors.blue['10'],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${systemColors.light['background-information']}`,
    fontSize: '12px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '18px',
  },
};

/**
 * Create New Project Card
 * 
 * A special card that is always the last item in the grid.
 * Clicking it opens a modal with detailed instructions on creating a new project.
 */
const CreateNewProjectCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      style={styles.newProjectCard}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = referenceColors.brand['40'];
        e.currentTarget.style.backgroundColor = referenceColors.blue['10'];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = systemColors.light['background-subtle'];
        e.currentTarget.style.backgroundColor = systemColors.light['background-base'];
      }}
    >
      <div style={styles.newProjectIconWrapper}>
        <Icon name="plus" size="l" />
      </div>
      <h3 style={styles.newProjectTitle}>Create new project</h3>
      <p style={styles.newProjectDescription}>
        Start a new prototype via chat or terminal
      </p>
    </button>
  );
};

/**
 * New Project Modal
 * 
 * Uses the Radiant Modal component (M2 size) to show detailed instructions
 * on how to create a new prototype project.
 */
const NewProjectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="M2"
      title="Create a new project"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div style={modalContentStyles.wrapper}>
        {/* Intro */}
        <p style={modalContentStyles.introText}>
          There are two ways to create a new prototype. Both auto-register the project in this gallery — no manual setup needed.
        </p>

        {/* Two options side by side */}
        <div style={modalContentStyles.optionsGrid}>
          {/* Option A: Chat */}
          <div style={modalContentStyles.optionCard}>
            <div style={modalContentStyles.optionHeader}>
              <div style={{ ...modalContentStyles.optionBadge, background: systemColors.light['content-brand'] }}>A</div>
              <h4 style={modalContentStyles.optionTitle}>Tell Cursor in chat</h4>
            </div>
            <p style={modalContentStyles.optionDesc}>
              Just describe what you want in the Cursor chat panel. Cursor will create the prototype folder, register it, and generate the UI in one step.
            </p>
            <div style={modalContentStyles.promptList}>
              <div style={modalContentStyles.promptItem}>
                <Icon name="ai" size="s" />
                <span>"Create a new prototype called UserOnboarding with a 3-step wizard"</span>
              </div>
              <div style={modalContentStyles.promptItem}>
                <Icon name="ai" size="s" />
                <span>"Create a prototype from this" + paste a Figma screenshot</span>
              </div>
            </div>
            <p style={modalContentStyles.optionHint}>
              Best for: quick starts, Figma-to-code, when you know what you want
            </p>
          </div>

          {/* Option B: Terminal */}
          <div style={modalContentStyles.optionCard}>
            <div style={modalContentStyles.optionHeader}>
              <div style={{ ...modalContentStyles.optionBadge, background: systemColors.light['content-success'] }}>B</div>
              <h4 style={modalContentStyles.optionTitle}>Scaffold via terminal</h4>
            </div>
            <p style={modalContentStyles.optionDesc}>
              Run the CLI command to generate a boilerplate prototype, then open the file and describe your UI to Cursor.
            </p>
            <div style={modalContentStyles.codeBlock}>
              <code style={modalContentStyles.codeText}>npm run new-prototype MyPrototype</code>
            </div>
            <p style={modalContentStyles.optionDesc}>
              Then open <code style={modalContentStyles.inlineCode}>src/prototypes/MyPrototype/index.tsx</code> and use <strong>Cmd+K</strong> or the Chat panel to describe your UI.
            </p>
            <p style={modalContentStyles.optionHint}>
              Best for: iterating in stages, starting with template boilerplate
            </p>
          </div>
        </div>

        {/* How components work */}
        <div style={modalContentStyles.componentSection}>
          <div style={modalContentStyles.componentHeader}>
            <Icon name="information" size="s" />
            <h4 style={modalContentStyles.componentTitle}>How component selection works</h4>
          </div>
          <p style={modalContentStyles.componentDesc}>
            Cursor always checks the 40+ existing Radiant components first. It only creates a new component when no suitable one exists — and places it inside your prototype folder, not the shared library.
          </p>
          <div style={modalContentStyles.componentRules}>
            <div style={modalContentStyles.ruleItem}>
              <Icon name="checkmark" size="s" />
              <span>Existing component matches? Imports from shared library</span>
            </div>
            <div style={modalContentStyles.ruleItem}>
              <Icon name="checkmark" size="s" />
              <span>Close match? Uses existing component with props/styling</span>
            </div>
            <div style={modalContentStyles.ruleItem}>
              <Icon name="plus" size="s" />
              <span>Nothing suitable? Creates local component in your prototype folder</span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div style={modalContentStyles.tip}>
          <Icon name="info-circle" size="s" />
          <span style={modalContentStyles.tipText}>
            Cursor automatically loads Radiant design rules from <code style={modalContentStyles.inlineCode}>.cursor/rules/</code> — 
            no setup needed. It knows about all components, design tokens, and interaction patterns.
          </span>
        </div>
      </div>
    </Modal>
  );
};

const modalContentStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.E}px`, // 20px
    padding: `${spacing.A}px 0`, // 4px 0
  },
  introText: {
    fontSize: '14px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '22px',
    margin: 0,
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${spacing.D}px`, // 16px
  },
  optionCard: {
    background: systemColors.light['background-sunken'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.E}px`, // 20px
  },
  optionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.B}px`, // 8px
  },
  optionBadge: {
    width: '24px',
    height: '24px',
    borderRadius: `${spacing.A}px`, // 4px
    color: systemColors.light['background-base'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    flexShrink: 0,
  },
  optionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  optionDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '20px',
    margin: `0 0 ${spacing.C}px 0`, // 0 0 12px 0
  },
  optionHint: {
    fontSize: '12px',
    fontWeight: 500,
    color: systemColors.light['content-tertiary'],
    lineHeight: '18px',
    margin: 0,
    fontStyle: 'italic',
  },
  codeBlock: {
    background: '#1E1E2E',
    borderRadius: `${spacing.B}px`, // 8px
    padding: `${spacing.C}px ${spacing.D}px`, // 12px 16px
    marginBottom: `${spacing.C}px`, // 12px
    overflowX: 'auto',
  },
  codeText: {
    fontFamily: '"SF Mono", "Fira Code", Consolas, monospace',
    fontSize: '13px',
    lineHeight: 1.7,
    color: '#CDD6F4',
    whiteSpace: 'pre',
  },
  inlineCode: {
    fontFamily: '"SF Mono", Consolas, monospace',
    fontSize: '12.5px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    background: referenceColors.blue['10'],
    padding: `2px ${spacing.A}px`, // 2px 4px
    borderRadius: `${spacing.A}px`, // 4px
    border: `1px solid ${systemColors.light['background-information']}`,
  },
  promptList: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.C}px`, // 12px
  },
  promptItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px
    fontSize: '12px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '18px',
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    background: systemColors.light['background-base'],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${systemColors.light['background-subtle']}`,
    fontStyle: 'italic',
  },
  componentSection: {
    background: systemColors.light['background-sunken'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.D}px ${spacing.E}px`, // 16px 20px
  },
  componentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.B}px`, // 8px
    color: systemColors.light['background-raised-inverse'],
  },
  componentTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  componentDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '20px',
    margin: `0 0 ${spacing.C}px 0`, // 0 0 12px 0
  },
  componentRules: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.A}px`, // 4px
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    fontSize: '13px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '20px',
    padding: `${spacing.A}px ${spacing.B}px`, // 4px 8px
    background: systemColors.light['background-base'],
    borderRadius: `${spacing.A}px`, // 4px
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  tip: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px
    background: referenceColors.blue['10'],
    border: `1px solid ${systemColors.light['background-information']}`,
    borderRadius: `${spacing.B}px`, // 8px
    padding: `${spacing.C}px ${spacing.D}px`, // 12px 16px
    color: systemColors.light['content-brand'],
  },
  tipText: {
    fontSize: '13px',
    fontWeight: 400,
    color: referenceColors.gray['70'],
    lineHeight: '20px',
  },
};

/**
 * Project Card Component
 */
interface ProjectCardProps {
  project: ProjectMeta;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <button
      style={styles.card}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        e.currentTarget.style.borderColor = referenceColors.brand['40'];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.borderColor = systemColors.light['background-subtle'];
      }}
    >
      {/* Thumbnail */}
      <div style={styles.cardThumbnail}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} style={styles.cardImage} />
        ) : (
          <div style={styles.cardPlaceholder}>
            <Icon name="folder" size="l" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{project.name}</h3>
        {project.description && (
          <p style={styles.cardDescription}>{project.description}</p>
        )}
        <div style={styles.cardMeta}>
          {project.author && (
            <span style={styles.cardAuthor}>
              <Icon name="profile" size="s" />
              {project.author}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div style={styles.cardArrow}>
        <Icon name="arrow-right" size="m" />
      </div>
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: systemColors.light['background-sunken'],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.D}px ${spacing.H}px`, // 16px 32px
    backgroundColor: systemColors.light['background-base'],
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.A}px`, // 4px
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: `${spacing.C}px`, // 12px
    justifyContent: 'flex-end',
    minWidth: '220px',
  },

  // Main
  main: {
    padding: `${spacing.H}px`, // 32px
    maxWidth: '1200px',
    margin: '0 auto',
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: `${spacing.F}px`, // 24px
  },

  // Project Card
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.D}px`, // 16px
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    textAlign: 'left',
  },
  cardThumbnail: {
    height: '160px',
    backgroundColor: systemColors.light['background-sunken'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardPlaceholder: {
    color: systemColors.light['border-default'],
  },
  cardContent: {
    padding: `${spacing.E}px`, // 20px
    flex: 1,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.B}px`, // 8px
  },
  cardDescription: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '22px',
    marginBottom: `${spacing.D}px`, // 16px
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.D}px`, // 16px
  },
  cardAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.A}px`, // 4px
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-tertiary'],
  },
  cardArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `${spacing.C}px ${spacing.E}px`, // 12px 20px
    borderTop: `1px solid ${systemColors.light['background-subtle']}`,
    color: systemColors.light['border-default'],
  },

  // Create New Project Card
  newProjectCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: systemColors.light['background-base'],
    border: `2px dashed ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.D}px`, // 16px
    cursor: 'pointer',
    transition: 'all 200ms ease',
    textAlign: 'center',
    padding: `${spacing.J}px ${spacing.H}px`, // 48px 32px
    minHeight: '280px',
  },
  newProjectIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: `${spacing.D}px`, // 16px
    backgroundColor: referenceColors.blue['10'],
    border: `1px solid ${systemColors.light['background-information']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: systemColors.light['content-brand'],
    marginBottom: `${spacing.D}px`, // 16px
  },
  newProjectTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.B}px`, // 8px
  },
  newProjectDescription: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    maxWidth: '200px',
    margin: 0,
  },

  // Code inline (used by guide)
  code: {
    padding: `2px ${spacing.A}px`, // 2px 4px
    backgroundColor: 'rgba(39, 112, 239, 0.1)',
    borderRadius: `${spacing.A}px`, // 4px
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '13px',
  },
};

export default PlaygroundGallery;
