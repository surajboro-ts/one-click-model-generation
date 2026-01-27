import React from 'react';
import styles from './LoadingIndicator.module.css';

/**
 * LoadingIndicator Size
 */
export type LoadingIndicatorSize = 'small' | 'medium' | 'large';

/**
 * LoadingIndicator Props
 */
export interface LoadingIndicatorProps {
  /** Size of the spinner */
  size?: LoadingIndicatorSize;
  /** Loading text to display */
  text?: string;
  /** Whether to center in container */
  centered?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * LoadingOverlay Props
 */
export interface LoadingOverlayProps {
  /** Whether the overlay is visible */
  isVisible: boolean;
  /** Loading text to display */
  text?: string;
  /** Content to overlay */
  children: React.ReactNode;
  /** Additional className for the container */
  className?: string;
}

/**
 * LoadingIndicator Component
 * 
 * A spinning loader indicator for async operations.
 * 
 * **Features:**
 * - Multiple sizes (small, medium, large)
 * - Optional loading text
 * - Can be centered in container
 * 
 * @example
 * ```tsx
 * <LoadingIndicator size="medium" text="Loading..." />
 * ```
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'medium',
  text,
  centered = false,
  className,
}) => {
  const containerClasses = [
    styles.container,
    centered && styles.centered,
    className,
  ].filter(Boolean).join(' ');

  const spinnerClasses = [
    styles.spinner,
    styles[size],
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle 
            className={styles.track} 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="3"
          />
          <path 
            className={styles.arc}
            d="M12 2C6.47715 2 2 6.47715 2 12"
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

/**
 * LoadingOverlay Component
 * 
 * Overlays content with a loading indicator when active.
 * 
 * @example
 * ```tsx
 * <LoadingOverlay isVisible={isLoading} text="Saving...">
 *   <FormContent />
 * </LoadingOverlay>
 * ```
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  text,
  children,
  className,
}) => {
  return (
    <div className={`${styles.overlayContainer} ${className || ''}`}>
      {children}
      {isVisible && (
        <div className={styles.overlay}>
          <LoadingIndicator size="large" text={text} />
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator;
