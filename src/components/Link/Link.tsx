import React, { forwardRef } from 'react';
import styles from './Link.module.css';

export type LinkColor = 'blue' | 'black' | 'white' | 'gray';
export type LinkSize = 'small' | 'default' | 'large';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link color
   * @default 'blue'
   */
  color?: LinkColor;
  /**
   * Link size
   * @default 'default'
   */
  size?: LinkSize;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Disable underline on hover
   * @default false
   */
  noUnderline?: boolean;
  /**
   * Show external link icon
   * @default false
   */
  external?: boolean;
  /**
   * Link content
   */
  children: React.ReactNode;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * External link icon component
 */
const ExternalIcon: React.FC = () => (
  <svg 
    className={styles.externalIcon}
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M10.5 1.5L1.5 10.5M10.5 1.5H4.5M10.5 1.5V7.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Link Component
 * 
 * A styled anchor element for navigation.
 * 
 * **Colors:**
 * - `blue` - Primary link color (default)
 * - `black` - For use on light backgrounds
 * - `white` - For use on dark backgrounds
 * - `gray` - Subtle/secondary links
 * 
 * **Sizes:**
 * - `small` - 12px font
 * - `default` - 14px font
 * - `large` - 16px font
 * 
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/about">About Us</Link>
 * 
 * // External link
 * <Link href="https://example.com" target="_blank" external>
 *   Visit Example
 * </Link>
 * 
 * // Different colors
 * <Link href="/settings" color="black">Settings</Link>
 * 
 * // On dark background
 * <div style={{ background: '#1D232F' }}>
 *   <Link href="/help" color="white">Help Center</Link>
 * </div>
 * 
 * // Without underline on hover
 * <Link href="/home" noUnderline>Home</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  color = 'blue',
  size = 'default',
  disabled = false,
  noUnderline = false,
  external = false,
  children,
  className = '',
  target,
  rel,
  ...props
}, ref) => {
  const classes = [
    styles.link,
    styles[color],
    size !== 'default' && styles[size],
    disabled && styles.disabled,
    noUnderline && styles.noUnderline,
    className,
  ].filter(Boolean).join(' ');

  // Add security attributes for external links
  const secureRel = target === '_blank' 
    ? `${rel || ''} noopener noreferrer`.trim()
    : rel;

  return (
    <a
      ref={ref}
      className={classes}
      target={target}
      rel={secureRel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      {children}
      {external && <ExternalIcon />}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
