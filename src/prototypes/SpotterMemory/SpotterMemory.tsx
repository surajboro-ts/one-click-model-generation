import React, { useState } from 'react';
import { GlobalHeader } from '../../components/GlobalHeader';
import {
  NavigationSidebar,
  PageHeader,
  ObjectTableToolbar,
  MemorySourcesTable,
} from './components';
import { styles } from './styles';
import { liveboards, Liveboard } from './data/mockData';

export const SpotterMemory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('liveboard');
  const [searchValue, setSearchValue] = useState('');

  const filteredLiveboards = liveboards.filter(liveboard =>
    liveboard.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    liveboard.author.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddLiveboard = () => {
    console.log('Add Liveboard clicked');
  };

  const handleRowClick = (liveboard: Liveboard) => {
    console.log('Row clicked:', liveboard);
  };

  return (
    <div style={styles.layout}>
      <div style={styles.header}>
        <GlobalHeader
          searchPlaceholder="Search in your library"
          userName="User"
          notificationCount={1}
        />
      </div>

      <div style={styles.body}>
        <aside style={styles.sidebar}>
          <NavigationSidebar />
        </aside>

        <main style={styles.main}>
          <div style={styles.content}>
            <PageHeader
              title="Memory sources"
              description="Add trusted memory sources to help Spotter understand more context about your data and deliver accurate answers for all users."
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <ObjectTableToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onAddClick={handleAddLiveboard}
              addButtonLabel="Add Liveboard"
            />

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
