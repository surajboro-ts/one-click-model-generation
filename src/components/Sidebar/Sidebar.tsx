import React from 'react';
import styles from './Sidebar.module.css';
import { useInspector } from '../../context/InspectorContext';

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

// Inspect icon component
const InspectIcon: React.FC<{ active?: boolean }> = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 14L10.5 10.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

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
  const { inspectMode, toggleInspectMode } = useInspector();
  
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
        <div className={styles.version}>v1.1.0</div>
        <button 
          className={`${styles.inspectButton} ${inspectMode ? styles.inspectActive : ''}`}
          onClick={toggleInspectMode}
          title={inspectMode ? 'Disable inspect mode' : 'Enable inspect mode'}
        >
          <InspectIcon active={inspectMode} />
          <span>{inspectMode ? 'Inspecting' : 'Inspect'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
