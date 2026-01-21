import React from 'react';
import styles from './Sidebar.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  type?: 'section' | 'item' | 'divider';
  badge?: string;
}

export interface SidebarProps {
  /** Navigation items */
  items: NavItem[];
  /** Currently active item ID */
  activeId: string;
  /** Handler when an item is selected */
  onSelect: (id: string) => void;
  /** Header content */
  header?: React.ReactNode;
}

/**
 * Sidebar Component
 * 
 * A navigation sidebar for the Storybook-like interface.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onSelect,
  header,
}) => {
  return (
    <aside className={styles.sidebar}>
      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}
      
      <nav className={styles.nav}>
        {items.map((item, index) => {
          if (item.type === 'divider') {
            return <div key={`divider-${index}`} className={styles.divider} />;
          }
          
          if (item.type === 'section') {
            return (
              <div key={item.id} className={styles.section}>
                {item.label}
              </div>
            );
          }
          
          const isActive = activeId === item.id;
          
          return (
            <button
              key={item.id}
              className={`${styles.item} ${isActive ? styles.active : ''}`}
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.version}>v1.0.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
