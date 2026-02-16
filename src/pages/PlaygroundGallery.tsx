import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../tokens/colors/brand';
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
  { input: 'Figma screenshot or URL', route: 'figma-component-mapping.md → prototype-generation.md', color: brandColors.blue[60] },
  { input: 'Text description of a UI', route: 'prototype-generation.md + component-inventory.md', color: brandColors.green[60] },
  { input: 'Dashboard / admin / settings', route: 'layout-patterns.md → prototype-generation.md', color: '#8B5CF6' },
  { input: 'Modal / wizard / dialog', route: 'modal-patterns.md → prototype-generation.md', color: brandColors.yellow[70] },
  { input: 'Table / menu / alert / toast', route: 'widget-patterns.md → prototype-generation.md', color: brandColors.red[60] },
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
                <div style={{ ...guideStyles.flowDot, backgroundColor: brandColors.blue[60] }} />
                <span style={guideStyles.flowLabel}>Your prompt</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: brandColors.green[60] }} />
                <span style={guideStyles.flowLabel}>Orchestrator classifies task</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: '#8B5CF6' }} />
                <span style={guideStyles.flowLabel}>Loads priority-ordered guidelines</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: brandColors.yellow[70] }} />
                <span style={guideStyles.flowLabel}>Checks existing 40+ components</span>
              </div>
              <div style={guideStyles.flowArrow}>↓</div>
              <div style={guideStyles.flowStep}>
                <div style={{ ...guideStyles.flowDot, backgroundColor: brandColors.red[60] }} />
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
                <div style={{ ...guideStyles.reuseDot, backgroundColor: brandColors.green[60] }} />
                <div>
                  <div style={guideStyles.reuseLabel}>Exact match</div>
                  <div style={guideStyles.reuseDesc}>Imports from shared component library</div>
                </div>
              </div>
              <div style={guideStyles.reuseItem}>
                <div style={{ ...guideStyles.reuseDot, backgroundColor: brandColors.blue[60] }} />
                <div>
                  <div style={guideStyles.reuseLabel}>Close match</div>
                  <div style={guideStyles.reuseDesc}>Uses existing component with props/styling</div>
                </div>
              </div>
              <div style={guideStyles.reuseItem}>
                <div style={{ ...guideStyles.reuseDot, backgroundColor: brandColors.yellow[70] }} />
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
    backgroundColor: brandColors.white,
    borderBottom: `1px solid ${brandColors.gray[20]}`,
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
    color: brandColors.blue[60],
    flexShrink: 0,
  },
  introTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.A}px`, // 4px
  },
  introDesc: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    backgroundColor: brandColors.gray[10],
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.E}px`, // 20px
    border: `1px solid ${brandColors.gray[20]}`,
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
    backgroundColor: brandColors.blue[60],
    color: brandColors.white,
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
    color: brandColors.gray[90],
    margin: 0,
  },
  columnDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    backgroundColor: brandColors.white,
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${brandColors.gray[20]}`,
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
    color: brandColors.gray[80],
  },
  flowArrow: {
    textAlign: 'center',
    fontSize: '11px',
    color: brandColors.gray[50],
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
    backgroundColor: brandColors.white,
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${brandColors.gray[20]}`,
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
    color: brandColors.gray[80],
    marginBottom: '2px',
  },
  branchRoute: {
    fontSize: '11px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
  },
  priorityBadge: {
    width: '18px',
    height: '18px',
    borderRadius: `${spacing.A}px`, // 4px
    backgroundColor: brandColors.gray[20],
    color: brandColors.gray[70],
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
    color: brandColors.gray[80],
    fontFamily: '"SF Mono", Monaco, monospace',
    marginBottom: '1px',
  },
  priorityDesc: {
    fontSize: '11px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    backgroundColor: brandColors.white,
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${brandColors.gray[20]}`,
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
    color: brandColors.gray[80],
    marginBottom: '2px',
  },
  reuseDesc: {
    fontSize: '11px',
    fontWeight: 400,
    color: brandColors.gray[60],
  },
  reuseNote: {
    fontSize: '11px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: '17px',
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    backgroundColor: brandColors.white,
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${brandColors.gray[20]}`,
  },

  // Tip
  tip: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.B}px ${spacing.D}px`, // 8px 16px
    backgroundColor: brandColors.blue[10],
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${brandColors.blue[20]}`,
    fontSize: '12px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
        e.currentTarget.style.borderColor = brandColors.blue[40];
        e.currentTarget.style.backgroundColor = brandColors.blue[10];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = brandColors.gray[20];
        e.currentTarget.style.backgroundColor = brandColors.white;
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
              <div style={{ ...modalContentStyles.optionBadge, background: brandColors.blue[60] }}>A</div>
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
              <div style={{ ...modalContentStyles.optionBadge, background: brandColors.green[60] }}>B</div>
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
    color: brandColors.gray[70],
    lineHeight: '22px',
    margin: 0,
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${spacing.D}px`, // 16px
  },
  optionCard: {
    background: brandColors.gray[10],
    border: `1px solid ${brandColors.gray[20]}`,
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
    color: brandColors.white,
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
    color: brandColors.gray[90],
    margin: 0,
  },
  optionDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[70],
    lineHeight: '20px',
    margin: `0 0 ${spacing.C}px 0`, // 0 0 12px 0
  },
  optionHint: {
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[50],
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
    color: brandColors.blue[60],
    background: brandColors.blue[10],
    padding: `2px ${spacing.A}px`, // 2px 4px
    borderRadius: `${spacing.A}px`, // 4px
    border: `1px solid ${brandColors.blue[20]}`,
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
    color: brandColors.gray[70],
    lineHeight: '18px',
    padding: `${spacing.B}px ${spacing.B}px`, // 8px 8px
    background: brandColors.white,
    borderRadius: `${spacing.B}px`, // 8px
    border: `1px solid ${brandColors.gray[20]}`,
    fontStyle: 'italic',
  },
  componentSection: {
    background: brandColors.gray[10],
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: `${spacing.C}px`, // 12px
    padding: `${spacing.D}px ${spacing.E}px`, // 16px 20px
  },
  componentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    marginBottom: `${spacing.B}px`, // 8px
    color: brandColors.gray[80],
  },
  componentTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  componentDesc: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[70],
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
    color: brandColors.gray[70],
    lineHeight: '20px',
    padding: `${spacing.A}px ${spacing.B}px`, // 4px 8px
    background: brandColors.white,
    borderRadius: `${spacing.A}px`, // 4px
    border: `1px solid ${brandColors.gray[20]}`,
  },
  tip: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.B}px`, // 8px
    background: brandColors.blue[10],
    border: `1px solid ${brandColors.blue[20]}`,
    borderRadius: `${spacing.B}px`, // 8px
    padding: `${spacing.C}px ${spacing.D}px`, // 12px 16px
    color: brandColors.blue[60],
  },
  tipText: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[70],
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
        e.currentTarget.style.borderColor = brandColors.blue[40];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.borderColor = brandColors.gray[20];
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
    backgroundColor: brandColors.gray[10],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.D}px ${spacing.H}px`, // 16px 32px
    backgroundColor: brandColors.white,
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.A}px`, // 4px
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: `${spacing.D}px`, // 16px
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    textAlign: 'left',
  },
  cardThumbnail: {
    height: '160px',
    backgroundColor: brandColors.gray[10],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardPlaceholder: {
    color: brandColors.gray[40],
  },
  cardContent: {
    padding: `${spacing.E}px`, // 20px
    flex: 1,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.B}px`, // 8px
  },
  cardDescription: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    color: brandColors.gray[50],
  },
  cardArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `${spacing.C}px ${spacing.E}px`, // 12px 20px
    borderTop: `1px solid ${brandColors.gray[20]}`,
    color: brandColors.gray[40],
  },

  // Create New Project Card
  newProjectCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.white,
    border: `2px dashed ${brandColors.gray[20]}`,
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
    backgroundColor: brandColors.blue[10],
    border: `1px solid ${brandColors.blue[20]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: brandColors.blue[60],
    marginBottom: `${spacing.D}px`, // 16px
  },
  newProjectTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.B}px`, // 8px
  },
  newProjectDescription: {
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
