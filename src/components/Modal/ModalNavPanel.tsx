import React from 'react';
import styles from './Modal.module.css';

export interface ModalNavPanelProps {
  /** Navigation items */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * ModalNavPanel Component
 * 
 * Left navigation panel for sub-navigation type modals.
 * Contains ModalNavItem components for category/section navigation.
 * 
 * @example
 * ```tsx
 * <ModalNavPanel>
 *   <ModalNavItem active>General</ModalNavItem>
 *   <ModalNavItem>Security</ModalNavItem>
 *   <ModalNavItem>Notifications</ModalNavItem>
 * </ModalNavPanel>
 * ```
 */
export const ModalNavPanel: React.FC<ModalNavPanelProps> = ({
  children,
  className,
}) => {
  const panelClasses = [styles.navPanel, className].filter(Boolean).join(' ');

  return (
    <nav className={panelClasses} role="navigation" aria-label="Modal navigation">
      {children}
    </nav>
  );
};

export default ModalNavPanel;
