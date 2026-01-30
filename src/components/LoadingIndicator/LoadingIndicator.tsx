import React from 'react';
import styles from './LoadingIndicator.module.css';

export type LoaderSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface ContextualLoaderProps {
  /**
   * Size of the spinner
   * @default 'm'
   */
  size?: LoaderSize;
  /**
   * Additional class name
   */
  className?: string;
}

export interface GlobalLoaderProps {
  /**
   * Whether to use dark theme overlay
   * @default false
   */
  dark?: boolean;
  /**
   * Optional loading message to display
   */
  message?: string;
  /**
   * Additional class name
   */
  className?: string;
}

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  /**
   * Shape variant
   * @default 'text'
   */
  variant?: SkeletonVariant;
  /**
   * Width (CSS value)
   */
  width?: string | number;
  /**
   * Height (CSS value)
   */
  height?: string | number;
  /**
   * Whether to animate the shimmer effect
   * @default true
   */
  animation?: boolean;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Contextual Loading Indicator
 * 
 * Used inline within content areas to indicate loading state.
 * 
 * @example
 * ```tsx
 * <LoadingIndicator.Contextual size="m" />
 * ```
 */
const ContextualLoader: React.FC<ContextualLoaderProps> = ({
  size = 'm',
  className = '',
}) => {
  const classes = [
    styles.contextual,
    className,
  ].filter(Boolean).join(' ');

  const spinnerClasses = [
    styles.spinner,
    styles[size],
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-label="Loading">
      <div className={spinnerClasses} />
    </div>
  );
};

/**
 * Global Loading Indicator
 * 
 * Full-screen overlay with centered spinner for page-level loading states.
 * 
 * @example
 * ```tsx
 * <LoadingIndicator.Global message="Loading data..." />
 * ```
 */
const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  dark = false,
  message,
  className = '',
}) => {
  const classes = [
    styles.global,
    dark && styles.dark,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-label={message || 'Loading'}>
      <div className={styles.spinner} />
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
};

/**
 * Skeleton Loading Indicator (Shimmer)
 * 
 * Placeholder component that mimics content layout during loading.
 * 
 * @example
 * ```tsx
 * // Text skeleton
 * <LoadingIndicator.Skeleton variant="text" width="80%" />
 * 
 * // Avatar skeleton
 * <LoadingIndicator.Skeleton variant="circular" width={40} height={40} />
 * 
 * // Card skeleton
 * <LoadingIndicator.Skeleton variant="rounded" width="100%" height={200} />
 * ```
 */
const SkeletonLoader: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = true,
  className = '',
}) => {
  const classes = [
    styles.skeleton,
    styles[`skeleton-${variant}`],
    animation && styles.shimmer,
    className,
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <span 
      className={classes} 
      style={style}
      aria-hidden="true"
    />
  );
};

interface LoadingIndicatorComposition {
  Contextual: React.FC<ContextualLoaderProps>;
  Global: React.FC<GlobalLoaderProps>;
  Skeleton: React.FC<SkeletonProps>;
}

/**
 * LoadingIndicator Component
 * 
 * A compound component providing contextual, global, and skeleton loading indicators.
 * 
 * **Variants:**
 * - `Contextual` - Inline spinner for component-level loading
 * - `Global` - Full-screen overlay for page-level loading
 * - `Skeleton` - Shimmer/placeholder for content loading states
 * 
 * **Sizes (Contextual only):**
 * - `xs` - 12px
 * - `s` - 16px
 * - `m` - 24px (default)
 * - `l` - 32px
 * - `xl` - 48px
 * 
 * **Skeleton Variants:**
 * - `text` - Text line placeholder
 * - `circular` - Circular placeholder (avatar)
 * - `rectangular` - Sharp corner rectangle
 * - `rounded` - Rounded corner rectangle
 * 
 * @example
 * ```tsx
 * // Inline loading spinner
 * <LoadingIndicator.Contextual size="m" />
 * 
 * // Full-screen loading overlay
 * <LoadingIndicator.Global message="Loading..." />
 * 
 * // Dark theme overlay
 * <LoadingIndicator.Global dark message="Please wait..." />
 * 
 * // Skeleton loading placeholders
 * <LoadingIndicator.Skeleton variant="circular" width={40} height={40} />
 * <LoadingIndicator.Skeleton variant="text" width="60%" />
 * <LoadingIndicator.Skeleton variant="rounded" width="100%" height={120} />
 * ```
 */
export const LoadingIndicator: React.FC & LoadingIndicatorComposition = () => null;

LoadingIndicator.Contextual = ContextualLoader;
LoadingIndicator.Global = GlobalLoader;
LoadingIndicator.Skeleton = SkeletonLoader;

export default LoadingIndicator;
