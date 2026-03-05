import React from 'react';
import { useNavigate } from 'react-router-dom';
import { systemColors, referenceColors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { getAllProjects, ProjectMeta } from '../prototypes/registry';
import { Icon } from '../components/icons';

/**
 * PlaygroundGallery
 * 
 * Displays a grid of all playground projects for designers to browse and open.
 * Each project is shown as a card with its name, description, and author.
 */
export const PlaygroundGallery: React.FC = () => {
  const navigate = useNavigate();
  const allProjects = getAllProjects();
  const myProjects = [...allProjects.filter(p => !p.section || p.section === 'mine')].reverse();
  const sampleProjects = [...allProjects.filter(p => p.section === 'sample')].reverse();

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
        <button style={styles.backBtn} onClick={handleBackToHome}
          onMouseEnter={(e) => { e.currentTarget.style.background = systemColors.light['background-subtle']; e.currentTarget.style.borderColor = systemColors.light['border-default']; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = systemColors.light['background-base']; e.currentTarget.style.borderColor = systemColors.light['background-subtle']; }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12.6667 8H3.33334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 3.33334L3.33334 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to home
        </button>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>Playground</h1>
          <p style={styles.subtitle}>Your prototypes and experiments</p>
        </div>
        <div style={styles.headerActions} />
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {myProjects.length > 0 && (
          <>
            <h2 style={styles.sectionHeader}>My prototypes</h2>
            <div style={styles.grid}>
              {myProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleOpenProject(project.id)}
                />
              ))}
            </div>
          </>
        )}

        {sampleProjects.length > 0 && (
          <>
            <h2 style={{ ...styles.sectionHeader, ...(myProjects.length > 0 ? { marginTop: `${spacing.H}px` } : {}) }}>Sample prototypes</h2>
            <div style={styles.grid}>
              {sampleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleOpenProject(project.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
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
          {project.lastModified && (
            <span style={styles.cardDate}>
              {new Date(project.lastModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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

    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: systemColors.light['background-sunken'],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Back button (light-mode version of guide's back-btn)
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-secondary'],
    background: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '100px',
    padding: '6px 16px 6px 12px',
    cursor: 'pointer',
    transition: 'all .18s',
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

  // Section header
  sectionHeader: {
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-secondary'],
    marginBottom: `${spacing.D}px`, // 16px
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: `${spacing.E}px`, // 20px
  },

  // Project Card
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: `${spacing.C}px`, // 12px
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    textAlign: 'left',
  },
  cardThumbnail: {
    height: '120px',
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
    padding: `${spacing.D}px`, // 16px
    flex: 1,
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.B}px`, // 8px
  },
  cardDescription: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    marginBottom: `${spacing.C}px`, // 12px
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
  cardDate: {
    fontSize: '12px',
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

};

export default PlaygroundGallery;
