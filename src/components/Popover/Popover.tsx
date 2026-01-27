import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Popover.module.css';

/**
 * Popover placement options
 */
export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Popover trigger type
 */
export type PopoverTrigger = 'click' | 'hover';

/**
 * Popover Props
 */
export interface PopoverProps {
  /** Element that triggers the popover */
  trigger: React.ReactNode;
  /** Content to display in the popover */
  children: React.ReactNode;
  /** Popover placement relative to trigger */
  placement?: PopoverPlacement;
  /** How to trigger the popover */
  triggerType?: PopoverTrigger;
  /** Whether the popover is open (controlled mode) */
  isOpen?: boolean;
  /** Callback when popover opens/closes (controlled mode) */
  onOpenChange?: (open: boolean) => void;
  /** Whether to close on clicking outside */
  closeOnClickOutside?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Offset from the trigger (in pixels) */
  offset?: number;
  /** Additional className for the popover content */
  className?: string;
  /** Additional className for the trigger wrapper */
  triggerClassName?: string;
  /** Whether the popover has an arrow */
  hasArrow?: boolean;
  /** Delay before showing (hover trigger only) */
  showDelay?: number;
  /** Delay before hiding (hover trigger only) */
  hideDelay?: number;
}

/**
 * Popover Component
 * 
 * A floating overlay component for contextual content.
 * 
 * **Features:**
 * - Multiple placement options
 * - Click or hover triggers
 * - Controlled and uncontrolled modes
 * - Optional arrow pointer
 * - Keyboard accessible
 * 
 * @example
 * ```tsx
 * <Popover
 *   trigger={<Button>Options</Button>}
 *   placement="bottom-start"
 * >
 *   <PopoverMenu>
 *     <PopoverMenuItem>Edit</PopoverMenuItem>
 *     <PopoverMenuItem>Delete</PopoverMenuItem>
 *   </PopoverMenu>
 * </Popover>
 * ```
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = 'bottom',
  triggerType = 'click',
  isOpen: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  offset = 8,
  className,
  triggerClassName,
  hasArrow = false,
  showDelay = 0,
  hideDelay = 100,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use controlled or internal state
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = useCallback((open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  }, [onOpenChange]);

  // Clear timeouts
  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Handle click trigger
  const handleClick = useCallback(() => {
    if (triggerType === 'click') {
      setIsOpen(!isOpen);
    }
  }, [triggerType, isOpen, setIsOpen]);

  // Handle hover trigger - show
  const handleMouseEnter = useCallback(() => {
    if (triggerType === 'hover') {
      clearTimeouts();
      if (showDelay > 0) {
        showTimeoutRef.current = setTimeout(() => {
          setIsOpen(true);
        }, showDelay);
      } else {
        setIsOpen(true);
      }
    }
  }, [triggerType, showDelay, setIsOpen, clearTimeouts]);

  // Handle hover trigger - hide
  const handleMouseLeave = useCallback(() => {
    if (triggerType === 'hover') {
      clearTimeouts();
      if (hideDelay > 0) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsOpen(false);
        }, hideDelay);
      } else {
        setIsOpen(false);
      }
    }
  }, [triggerType, hideDelay, setIsOpen, clearTimeouts]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, setIsOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, setIsOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Get placement styles
  const getPlacementStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    switch (placement) {
      case 'top':
        styles.bottom = '100%';
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        styles.marginBottom = offset;
        break;
      case 'top-start':
        styles.bottom = '100%';
        styles.left = 0;
        styles.marginBottom = offset;
        break;
      case 'top-end':
        styles.bottom = '100%';
        styles.right = 0;
        styles.marginBottom = offset;
        break;
      case 'bottom':
        styles.top = '100%';
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        styles.marginTop = offset;
        break;
      case 'bottom-start':
        styles.top = '100%';
        styles.left = 0;
        styles.marginTop = offset;
        break;
      case 'bottom-end':
        styles.top = '100%';
        styles.right = 0;
        styles.marginTop = offset;
        break;
      case 'left':
        styles.right = '100%';
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
        styles.marginRight = offset;
        break;
      case 'left-start':
        styles.right = '100%';
        styles.top = 0;
        styles.marginRight = offset;
        break;
      case 'left-end':
        styles.right = '100%';
        styles.bottom = 0;
        styles.marginRight = offset;
        break;
      case 'right':
        styles.left = '100%';
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
        styles.marginLeft = offset;
        break;
      case 'right-start':
        styles.left = '100%';
        styles.top = 0;
        styles.marginLeft = offset;
        break;
      case 'right-end':
        styles.left = '100%';
        styles.bottom = 0;
        styles.marginLeft = offset;
        break;
    }

    return styles;
  };

  // Get arrow placement class
  const getArrowClass = (): string => {
    if (placement.startsWith('top')) return styles.arrowBottom;
    if (placement.startsWith('bottom')) return styles.arrowTop;
    if (placement.startsWith('left')) return styles.arrowRight;
    if (placement.startsWith('right')) return styles.arrowLeft;
    return '';
  };

  const popoverClasses = [
    styles.popover,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <div
        className={`${styles.trigger} ${triggerClassName || ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {/* Popover content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={popoverClasses}
          style={getPlacementStyles()}
          role="dialog"
          aria-modal="false"
        >
          {hasArrow && <div className={`${styles.arrow} ${getArrowClass()}`} />}
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * PopoverMenu Component - Convenience wrapper for menu-style popovers
 */
export const PopoverMenu: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`${styles.menu} ${className || ''}`}>{children}</div>
);

/**
 * PopoverMenuItem Component
 */
export interface PopoverMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
}

export const PopoverMenuItem: React.FC<PopoverMenuItemProps> = ({
  children,
  onClick,
  disabled = false,
  danger = false,
  icon,
}) => {
  const itemClasses = [
    styles.menuItem,
    disabled && styles.menuItemDisabled,
    danger && styles.menuItemDanger,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={itemClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.menuItemIcon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Popover;
