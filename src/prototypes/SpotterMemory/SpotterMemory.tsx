import React, { useState } from 'react';
import {
  AppHeader,
  NavigationSidebar,
  PageHeader,
  ObjectTableToolbar,
  MemorySourcesTable,
} from './components';
import { styles } from './styles';
import { liveboards, Liveboard } from './data/mockData';

/**
 * SpotterMemory Component
 * 
 * Main page layout for the Memory Sources experience.
 * Demonstrates a data workspace object table with filtering, sorting, and pagination.
 */
export const SpotterMemory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('liveboard');
  const [searchValue, setSearchValue] = useState('');

  // Filter liveboards based on search
  const filteredLiveboards = liveboards.filter(liveboard =>
    liveboard.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    liveboard.author.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddLiveboard = () => {
    // Handle add liveboard action
    console.log('Add Liveboard clicked');
  };

  const handleRowClick = (liveboard: Liveboard) => {
    console.log('Row clicked:', liveboard);
  };

  return (
    <div style={styles.layout}>
      {/* Top Header */}
      <div style={styles.header}>
        <AppHeader />
      </div>

      {/* Body: Sidebar + Main Content */}
      <div style={styles.body}>
        {/* Left Sidebar */}
        <aside style={styles.sidebar}>
          <NavigationSidebar />
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          <div style={styles.content}>
            {/* Page Header with Title, Description, and Tabs */}
            <PageHeader
              title="Memory sources"
              description="Add trusted memory sources to help Spotter understand more context about your data and deliver accurate answers for all users."
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Toolbar with Search and Add Button */}
            <ObjectTableToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onAddClick={handleAddLiveboard}
              addButtonLabel="Add Liveboard"
            />

            {/* Data Table */}
            <MemorySourcesTable
              data={filteredLiveboards}
              onRowClick={handleRowClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpotterMemory;
