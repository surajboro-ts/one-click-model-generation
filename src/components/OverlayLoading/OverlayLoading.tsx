import React from 'react';
import styles from './OverlayLoading.module.css';

export interface OverlayLoadingProps {
  isVisible: boolean;
  text?: string;
  transparent?: boolean;
  className?: string;
}

export const OverlayLoading: React.FC<OverlayLoadingProps> = ({
  isVisible,
  text,
  transparent = false,
  className,
}) => {
  if (!isVisible) return null;

  const overlayClasses = [
    styles.overlay,
    transparent ? styles.transparent : styles.solid,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses} aria-busy="true" aria-live="polite">
      <div className={styles.content}>
        <svg
          className={styles.spinner}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
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
        {text && <span className={styles.text}>{text}</span>}
      </div>
    </div>
  );
};

export default OverlayLoading;
