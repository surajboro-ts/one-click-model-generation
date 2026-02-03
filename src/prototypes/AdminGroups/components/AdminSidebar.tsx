import React, { useState } from 'react';
import { Icon } from '../../../components/icons';
import { sidebarStyles as styles } from '../styles';
import { adminNavSections } from '../data/mockData';

interface AdminSidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

/**
 * AdminSidebar Component
 * 
 * Left navigation sidebar for Admin Settings.
 * Features All Orgs / Primary Org toggle and multi-section navigation.
 */
export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeItem = 'groups',
  onItemClick,
}) => {
  const [orgToggle, setOrgToggle] = useState<'all' | 'primary'>('all');

  return (
    <nav style={styles.container}>
      {/* Header with toggle */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>Admin Settings</div>
        <div style={styles.toggleContainer}>
          <button
            style={{
              ...styles.toggleButton,
              ...(orgToggle === 'all' ? styles.toggleButtonActive : {}),
            }}
            onClick={() => setOrgToggle('all')}
          >
            All Orgs
          </button>
          <button
            style={{
              ...styles.toggleButton,
              ...(orgToggle === 'primary' ? styles.toggleButtonActive : {}),
            }}
            onClick={() => setOrgToggle('primary')}
          >
            Primary Org
          </button>
        </div>
      </div>

      {/* Navigation sections */}
      {adminNavSections.map((section) => (
        <div key={section.id}>
          {section.label && (
            <div style={styles.sectionLabel}>{section.label}</div>
          )}
          {section.items.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(item.active || item.id === activeItem ? styles.navItemActive : {}),
                ...(item.nested ? styles.navItemNested : {}),
              }}
              onClick={() => onItemClick?.(item.id)}
            >
              {item.icon && <Icon name={item.icon as any} size="s" />}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default AdminSidebar;
