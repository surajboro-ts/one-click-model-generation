import React, { forwardRef, useRef, useCallback, useEffect, useState } from 'react';
import styles from './Menu.module.css';

export interface MenuItemProps {
  /**
   * Item label
   */
  children: React.ReactNode;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Leading icon
   */
  icon?: React.ReactNode;
  /**
   * Keyboard shortcut display
   */
  shortcut?: string;
  /**
   * Whether item is active/selected
   * @default false
   */
  active?: boolean;
  /**
   * Whether item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether item is a danger/destructive action
   * @default false
   */
  danger?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Menu Item Component
 */
const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(({
  children,
  description,
  icon,
  shortcut,
  active = false,
  disabled = false,
  danger = false,
  onClick,
  className = '',
}, ref) => {
  const classes = [
    styles.item,
    active && styles.itemActive,
    disabled && styles.itemDisabled,
    danger && styles.itemDanger,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemContent}>
        <span className={styles.itemLabel}>{children}</span>
        {description && <span className={styles.itemDescription}>{description}</span>}
      </span>
      {shortcut && <span className={styles.itemShortcut}>{shortcut}</span>}
    </button>
  );
});

MenuItem.displayName = 'MenuItem';

export interface MenuDividerProps {
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Menu Divider Component
 */
const MenuDivider: React.FC<MenuDividerProps> = ({ className = '' }) => (
  <div className={`${styles.divider} ${className}`} role="separator" />
);

export interface MenuGroupProps {
  /**
   * Group label
   */
  label?: string;
  /**
   * Group items
   */
  children: React.ReactNode;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Menu Group Component
 */
const MenuGroup: React.FC<MenuGroupProps> = ({
  label,
  children,
  className = '',
}) => (
  <div className={`${styles.group} ${className}`} role="group" aria-label={label}>
    {label && <span className={styles.groupLabel}>{label}</span>}
    {children}
  </div>
);

export type MenuVariant = 'default' | 'compact';
export type MenuTheme = 'light' | 'dark';

export interface MenuProps {
  /**
   * Menu items
   */
  children: React.ReactNode;
  /**
   * Whether menu is visible
   * @default true
   */
  show?: boolean;
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: MenuVariant;
  /**
   * Color theme
   * @default 'light'
   */
  theme?: MenuTheme;
  /**
   * Enable keyboard navigation
   * @default true
   */
  enableKeyboardNav?: boolean;
  /**
   * Callback when menu requests to close
   */
  onClose?: () => void;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * ID for the menu
   */
  id?: string;
}

type MenuComponent = React.FC<MenuProps> & {
  Item: typeof MenuItem;
  Divider: typeof MenuDivider;
  Group: typeof MenuGroup;
};

/**
 * Menu Component
 * 
 * A dropdown menu for displaying a list of actions.
 * 
 * **Features:**
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Grouped items with labels
 * - Dividers
 * - Active/selected state
 * - Disabled items
 * - Danger/destructive actions
 * - Keyboard shortcuts display
 * 
 * @example
 * ```tsx
 * // Basic menu
 * <Menu show={isOpen} onClose={() => setIsOpen(false)}>
 *   <Menu.Item onClick={handleEdit} icon={<PencilIcon />}>Edit</Menu.Item>
 *   <Menu.Item onClick={handleDuplicate}>Duplicate</Menu.Item>
 *   <Menu.Divider />
 *   <Menu.Item onClick={handleDelete} danger>Delete</Menu.Item>
 * </Menu>
 * 
 * // With groups
 * <Menu show>
 *   <Menu.Group label="Actions">
 *     <Menu.Item>Copy</Menu.Item>
 *     <Menu.Item>Paste</Menu.Item>
 *   </Menu.Group>
 *   <Menu.Divider />
 *   <Menu.Group label="More">
 *     <Menu.Item>Settings</Menu.Item>
 *   </Menu.Group>
 * </Menu>
 * ```
 */
const MenuBase: React.FC<MenuProps> = ({
  children,
  show = true,
  variant = 'default',
  theme = 'light',
  enableKeyboardNav = true,
  onClose,
  className = '',
  id,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(-1);

  // Get all focusable items
  const getItems = useCallback(() => {
    if (!menuRef.current) return [];
    return Array.from(menuRef.current.querySelectorAll('[role="menuitem"]:not([disabled])')) as HTMLButtonElement[];
  }, []);

  // Focus management
  useEffect(() => {
    if (show && focusIndex >= 0) {
      const items = getItems();
      items[focusIndex]?.focus();
    }
  }, [focusIndex, show, getItems]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!enableKeyboardNav) return;

    const items = getItems();
    const count = items.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex((prev) => (prev + 1) % count);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex((prev) => (prev - 1 + count) % count);
        break;
      case 'Home':
        e.preventDefault();
        setFocusIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusIndex(count - 1);
        break;
      case 'Escape':
        e.preventDefault();
        onClose?.();
        break;
    }
  }, [enableKeyboardNav, getItems, onClose]);

  if (!show) return null;

  const classes = [
    styles.menu,
    variant === 'compact' && styles.compact,
    theme === 'dark' && styles.dark,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={menuRef}
      id={id}
      className={classes}
      role="menu"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

export const Menu = MenuBase as MenuComponent;
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;

export default Menu;
