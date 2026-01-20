import React, { useState } from 'react';
import { Tabs } from './components/Tabs';
import { PlaygroundShowcase } from './pages/PlaygroundShowcase';
import { ArchitectureShowcase } from './pages/ArchitectureShowcase';
import { ChipsShowcase } from './pages/ChipsShowcase';
import { AlertsShowcase } from './pages/AlertsShowcase';
import { SelectionControlsShowcase } from './pages/SelectionControlsShowcase';
import { ButtonsShowcase } from './pages/ButtonsShowcase';
import { FormShowcase } from './pages/FormShowcase';
import { brandColors } from './tokens/colors/brand';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('playground');

  const tabs = [
    { id: 'playground', label: 'Playground' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'chips', label: 'Chips' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'selection', label: 'Selection Controls' },
    { id: 'forms', label: 'Forms' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Radiant Design System</h1>
        <p style={styles.subtitle}>Component Library</p>
      </header>

      <div style={styles.tabsContainer}>
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      </div>

      <main style={styles.main}>
        {activeTab === 'playground' && <PlaygroundShowcase />}
        {activeTab === 'architecture' && <ArchitectureShowcase />}
        {activeTab === 'buttons' && <ButtonsShowcase />}
        {activeTab === 'chips' && <ChipsShowcase />}
        {activeTab === 'alerts' && <AlertsShowcase />}
        {activeTab === 'selection' && <SelectionControlsShowcase />}
        {activeTab === 'forms' && <FormShowcase />}
      </main>

      <footer style={styles.footer}>
        <p>Radiant Design System • Built with React + TypeScript</p>
      </footer>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: brandColors.gray[10],
  },
  header: {
    backgroundColor: brandColors.white,
    padding: '32px 48px 24px',
  },
  title: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '32px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  subtitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 375,
    color: brandColors.gray[60],
  },
  tabsContainer: {
    backgroundColor: brandColors.white,
    paddingLeft: '24px',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  main: {
    flex: 1,
    padding: '32px 48px',
  },
  footer: {
    backgroundColor: brandColors.white,
    padding: '24px 48px',
    borderTop: `1px solid ${brandColors.gray[20]}`,
    textAlign: 'center',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: brandColors.gray[60],
  },
};

export default App;
