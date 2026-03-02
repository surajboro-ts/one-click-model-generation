import React, { forwardRef, useState } from 'react';
import styles from './Image.module.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  rounded?: boolean;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({
  fallback,
  aspectRatio,
  objectFit = 'cover',
  rounded = false,
  className,
  style,
  onError,
  ...props
}, ref) => {
  const [hasError, setHasError] = useState(false);

  const containerClasses = [
    styles.container,
    rounded && styles.rounded,
    className,
  ].filter(Boolean).join(' ');

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <div
      className={containerClasses}
      style={{ aspectRatio, ...style }}
    >
      {hasError ? (
        fallback ? (
          <div className={styles.fallback}>{fallback}</div>
        ) : (
          <div className={styles.placeholder} />
        )
      ) : (
        <img
          ref={ref}
          className={styles.img}
          style={{ objectFit }}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
});

Image.displayName = 'Image';
export default Image;
