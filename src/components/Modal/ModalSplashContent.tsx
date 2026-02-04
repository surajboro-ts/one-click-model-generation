import React from 'react';
import styles from './Modal.module.css';

export interface ModalSplashContentProps {
  /** Title text */
  title: string;
  /** Bullet points or description content */
  bulletPoints?: string[];
  /** Description paragraph (alternative to bullet points) */
  description?: string;
  /** Additional CSS class name */
  className?: string;
  /** Children for custom content */
  children?: React.ReactNode;
}

/**
 * ModalSplashContent Component
 * 
 * Text content area for splash screen modals.
 * Displays a title with bullet points or description.
 * 
 * @example
 * ```tsx
 * <ModalSplashContent
 *   title="Introducing Parameters"
 *   bulletPoints={[
 *     'Create formulas with adjustable values',
 *     'Run different scenarios without changing answers'
 *   ]}
 * />
 * ```
 */
export const ModalSplashContent: React.FC<ModalSplashContentProps> = ({
  title,
  bulletPoints,
  description,
  className,
  children,
}) => {
  const contentClasses = [styles.splashContent, className].filter(Boolean).join(' ');

  return (
    <div className={contentClasses}>
      <h2 className={styles.splashTitle}>{title}</h2>
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className={styles.splashBullets}>
          {bulletPoints.map((point, index) => (
            <li key={index} className={styles.splashBulletItem}>{point}</li>
          ))}
        </ul>
      )}
      {description && !bulletPoints && (
        <p className={styles.splashDescription}>{description}</p>
      )}
      {children}
    </div>
  );
};

export default ModalSplashContent;
