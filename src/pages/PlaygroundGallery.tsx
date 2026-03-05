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
            onClick={() => window.location.href = '/how-it-works.html'}
          >
            How prototyping works
          </Button>
        </div>
      </header>

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

      {/* Component Count Pills */}
      {(project.dsComponents != null || project.customComponents != null) && (
        <div style={styles.cardPills}>
          {project.dsComponents != null && project.dsComponents > 0 && (
            <span style={styles.cardPill}>
              <Icon name="grid-view" size="xs" />
              {project.dsComponents} DS
            </span>
          )}
          {project.customComponents != null && project.customComponents > 0 && (
            <span style={{ ...styles.cardPill, ...styles.cardPillCustom }}>
              <Icon name="plus" size="xs" />
              {project.customComponents} Custom
            </span>
          )}
        </div>
      )}

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
  cardPills: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    padding: `0 ${spacing.E}px ${spacing.D}px`,
    flexWrap: 'wrap',
  },
  cardPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.A}px`,
    fontSize: '12px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    background: referenceColors.blue['10'],
    padding: `3px ${spacing.B}px`,
    borderRadius: `${spacing.A}px`,
    border: `1px solid ${systemColors.light['background-information']}`,
  },
  cardPillCustom: {
    color: '#8B5CF6',
    background: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cardArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `${spacing.C}px ${spacing.E}px`,
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
