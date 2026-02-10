import React from 'react';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../tokens/colors/brand';
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
  const projects = getAllProjects();

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
        <button style={styles.backButton} onClick={handleBackToHome}>
          <Icon name="arrow-left" size="m" />
          <span>Home</span>
        </button>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>Playground</h1>
          <p style={styles.subtitle}>Your prototypes and experiments</p>
        </div>
        <div style={styles.headerActions} />
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {projects.length > 0 ? (
          <div style={styles.grid}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleOpenProject(project.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      {/* Getting Started Section */}
      <section style={styles.helpSection}>
        <div style={styles.helpCard}>
          <div style={styles.helpIcon}>
            <Icon name="info-circle" size="l" />
          </div>
          <div style={styles.helpContent}>
            <h3 style={styles.helpTitle}>Creating new projects</h3>
            <p style={styles.helpDescription}>
              To create a new project, copy the <code style={styles.code}>src/prototypes/_template</code> folder 
              and rename it. Then register your project in <code style={styles.code}>src/prototypes/registry.ts</code>.
              Use AI assistance to generate UI components from descriptions or Figma screenshots.
            </p>
          </div>
        </div>
      </section>
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

/**
 * Empty State Component
 */
const EmptyState: React.FC = () => {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>
        <Icon name="folder" size="l" />
      </div>
      <h2 style={styles.emptyTitle}>No projects yet</h2>
      <p style={styles.emptyDescription}>
        Create your first prototype by copying the template folder and registering it in the registry.
      </p>
    </div>
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
    padding: '24px 32px',
    backgroundColor: brandColors.white,
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[60],
    transition: 'all 150ms ease',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[50],
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },

  // Main
  main: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
  },

  // Card
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '16px',
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
    padding: '20px',
    flex: 1,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  cardDescription: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: '20px',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  cardAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[40],
  },
  cardArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '12px 20px',
    borderTop: `1px solid ${brandColors.gray[20]}`,
    color: brandColors.gray[40],
  },

  // Empty State
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 32px',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    backgroundColor: brandColors.gray[20],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: brandColors.gray[40],
    marginBottom: '24px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  emptyDescription: {
    fontSize: '15px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: '24px',
    maxWidth: '400px',
  },

  // Help Section
  helpSection: {
    padding: '0 32px 32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  helpCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '20px 24px',
    backgroundColor: brandColors.blue[10],
    borderRadius: '12px',
    border: `1px solid ${brandColors.blue[20]}`,
  },
  helpIcon: {
    color: brandColors.blue[60],
    flexShrink: 0,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '4px',
  },
  helpDescription: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[60],
    lineHeight: '22px',
    margin: 0,
  },
  code: {
    padding: '2px 6px',
    backgroundColor: 'rgba(39, 112, 239, 0.1)',
    borderRadius: '4px',
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '13px',
  },
};

export default PlaygroundGallery;
