import React from 'react';
import styles from './Modal.module.css';

export interface ModalNavItemProps {
  /** Item label */
  children: React.ReactNode;
  /** Whether this item is currently selected */
  active?: boolean;
  /** Leading icon */
  leadingIcon?: React.ReactNode;
  /** Trailing icon */
  trailingIcon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * ModalNavItem Component
 * 
 * Navigation list item for use within ModalNavPanel.
 * Supports selected state, leading/trailing icons.
 * 
 * @example
 * ```tsx
 * <ModalNavItem
 *   active
 *   leadingIcon={<SettingsIcon />}
 *   onClick={() => setSection('general')}
 * >
 *   General
 * </ModalNavItem>
 * ```
 */
export const ModalNavItem: React.FC<ModalNavItemProps> = ({
  children,
  active = false,
  leadingIcon,
  trailingIcon,
  onClick,
  className,
  disabled = false,
}) => {
  const itemClasses = [
    styles.navItem,
    active && styles.navItemSelected,
    disabled && styles.navItemDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={itemClasses}
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
    >
      {leadingIcon && <span className={styles.navItemIcon}>{leadingIcon}</span>}
      <span className={styles.navItemLabel}>{children}</span>
      {trailingIcon && <span className={styles.navItemIcon}>{trailingIcon}</span>}
    </button>
  );
};

export default ModalNavItem;
