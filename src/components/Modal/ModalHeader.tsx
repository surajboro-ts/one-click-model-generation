import React from 'react';
import styles from './Modal.module.css';

export interface ModalHeaderProps {
  /** Modal title */
  title?: string;
  /** Eyebrow text above title (for wizard type) */
  eyebrow?: string;
  /** Handler to close the modal */
  onClose?: () => void;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Use text "Close" instead of icon (for M4 full screen) */
  useTextClose?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Children to render in header (for custom content) */
  children?: React.ReactNode;
}

/**
 * ModalHeader Component
 * 
 * Reusable header component for modals with title, eyebrow, and close button.
 * Use this for composition pattern when you need full control over modal structure.
 * 
 * @example
 * ```tsx
 * <ModalHeader
 *   title="Create New Group"
 *   eyebrow="Step 1 of 3"
 *   onClose={handleClose}
 * />
 * ```
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  eyebrow,
  onClose,
  showCloseButton = true,
  useTextClose = false,
  className,
  children,
}) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className={styles.headerContent}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
        {children}
      </div>
      {showCloseButton && onClose && (
        useTextClose ? (
          <button 
            type="button" 
            className={styles.closeButtonText} 
            onClick={onClose}
            aria-label="Close modal"
          >
            Close
          </button>
        ) : (
          <button 
            type="button" 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )
      )}
    </div>
  );
};

export default ModalHeader;
