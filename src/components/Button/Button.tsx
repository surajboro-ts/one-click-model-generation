import React, { forwardRef, useCallback, useState } from 'react';
import { brandColors } from '../../tokens/colors/brand';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'basic' | 'large';
export type ButtonColorway = 'standard' | 'white';
export type IconPosition = 'leading' | 'trailing' | 'none';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** The visual style variant */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** The color scheme - standard (light bg) or white (dark bg) */
  colorway?: ButtonColorway;
  /** The button text content */
  children: React.ReactNode;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Position of the icon */
  iconPosition?: IconPosition;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Whether the button is in active/pressed state */
  active?: boolean;
  /** Whether the button spans full width */
  fullWidth?: boolean;
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
}

/**
 * Button Component
 * 
 * A comprehensive button component supporting multiple variants, sizes, colorways, and states.
 * This is the most used component in the Radiant design system.
 * 
 * **Variants:**
 * - `primary` - Blue filled button for primary actions
 * - `secondary` - Gray filled button for secondary actions
 * - `tertiary` - Text-only button for tertiary actions
 * 
 * **Sizes:**
 * - `small` - 24px height, 12px font
 * - `basic` - 32px height, 14px font (default)
 * - `large` - 32px height, 14px font, full width container
 * 
 * **Colorways:**
 * - `standard` - For use on light backgrounds (default)
 * - `white` - For use on dark backgrounds
 * 
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Save Changes</Button>
 * 
 * // With icon
 * <Button variant="primary" icon={<PlusIcon />} iconPosition="leading">
 *   Add Item
 * </Button>
 * 
 * // Secondary small
 * <Button variant="secondary" size="small">Cancel</Button>
 * 
 * // Tertiary with dropdown
 * <Button variant="tertiary" icon={<ChevronDownIcon />} iconPosition="trailing">
 *   Options
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'basic',
  colorway = 'standard',
  children,
  icon,
  iconPosition = 'none',
  loading = false,
  active = false,
  fullWidth = false,
  disabled = false,
  htmlType = 'button',
  className,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...props
}, ref) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) setIsPressed(true);
    onMouseDown?.(e);
  }, [disabled, onMouseDown]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    onMouseUp?.(e);
  }, [onMouseUp]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  const isActive = active || isPressed;
  const hasIcon = icon && iconPosition !== 'none';

  // Build class names
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    styles[colorway],
    isActive && styles.active,
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    hasIcon && styles.hasIcon,
    iconPosition === 'leading' && styles.iconLeading,
    iconPosition === 'trailing' && styles.iconTrailing,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={htmlType}
      className={buttonClasses}
      disabled={disabled || loading}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading ? (
        <span className={styles.loader} />
      ) : (
        <>
          {hasIcon && iconPosition === 'leading' && (
            <span className={styles.icon}>{icon}</span>
          )}
          <span className={styles.label}>{children}</span>
          {hasIcon && iconPosition === 'trailing' && (
            <span className={styles.icon}>{icon}</span>
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

