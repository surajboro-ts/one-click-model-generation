import React, { Suspense, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { brandColors } from '../tokens/colors/brand';
import { getProject } from '../prototypes/registry';
import { Icon } from '../components/icons';

/**
 * PlaygroundProject
 * 
 * Full-page wrapper for individual playground projects.
 * Provides a distraction-free environment with only a floating back button.
 */
export const PlaygroundProject: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();

  const project = projectName ? getProject(projectName) : undefined;

  // Handle escape key to go back
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate('/playground');
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBack = () => {
    navigate('/playground');
  };

  // Project not found
  if (!project) {
    return (
      <div style={styles.notFound}>
        <div style={styles.notFoundContent}>
          <div style={styles.notFoundIcon}>
            <Icon name="cross-circle" size="l" />
          </div>
          <h1 style={styles.notFoundTitle}>Project not found</h1>
          <p style={styles.notFoundDescription}>
            The project "{projectName}" does not exist or has not been registered.
          </p>
          <button style={styles.notFoundButton} onClick={handleBack}>
            <Icon name="arrow-left" size="m" />
            Back to Playground
          </button>
        </div>
      </div>
    );
  }

  const ProjectComponent = project.component;

  return (
    <div style={styles.container}>
      {/* Floating Back Button */}
      <button
        style={styles.backButton}
        onClick={handleBack}
        title="Back to Playground (Esc)"
      >
        <Icon name="arrow-left" size="m" />
        <span style={styles.backButtonText}>Back</span>
      </button>

      {/* Project Name Badge */}
      <div style={styles.projectBadge}>
        <Icon name="folder" size="s" />
        <span>{project.name}</span>
      </div>

      {/* Project Content */}
      <div style={styles.projectContainer}>
        <Suspense fallback={<LoadingState />}>
          <ProjectComponent />
        </Suspense>
      </div>
    </div>
  );
};

/**
 * Loading State Component
 */
const LoadingState: React.FC = () => {
  return (
    <div style={styles.loading}>
      <div style={styles.loadingSpinner} />
      <p style={styles.loadingText}>Loading project...</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Back Button
  backButton: {
    position: 'fixed',
    top: '16px',
    left: '16px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[70],
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 150ms ease',
  },
  backButtonText: {
    // Text shown alongside icon
  },

  // Project Badge
  projectBadge: {
    position: 'fixed',
    top: '16px',
    right: '16px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    backgroundColor: brandColors.gray[90],
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.white,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },

  // Project Container
  projectContainer: {
    minHeight: '100vh',
  },

  // Loading
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: `3px solid ${brandColors.gray[20]}`,
    borderTopColor: brandColors.blue[60],
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  loadingText: {
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[50],
  },

  // Not Found
  notFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
    padding: '32px',
  },
  notFoundContent: {
    textAlign: 'center',
    maxWidth: '400px',
  },
  notFoundIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    backgroundColor: brandColors.red[10],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: brandColors.red[60],
    margin: '0 auto 24px',
  },
  notFoundTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  notFoundDescription: {
    fontSize: '15px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: '24px',
    marginBottom: '24px',
  },
  notFoundButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: brandColors.blue[60],
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.white,
    transition: 'all 150ms ease',
  },
};

// Add keyframe animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default PlaygroundProject;
