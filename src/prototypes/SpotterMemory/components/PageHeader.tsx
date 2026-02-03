import React from 'react';
import { Tabs } from '../../../components/Tabs';
import { pageHeaderStyles as styles } from '../styles';
import { tabItems } from '../data/mockData';

interface PageHeaderProps {
  title: string;
  description: string;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * PageHeader Component
 * 
 * Page title, description, and tab navigation.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  activeTab,
  onTabChange,
}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.description}>{description}</p>
      <div style={styles.tabs}>
        <Tabs
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
};

export default PageHeader;
