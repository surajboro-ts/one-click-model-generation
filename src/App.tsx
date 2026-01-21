import React, { useState } from 'react';
import { Sidebar, NavItem } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { ComponentDocPage } from './pages/ComponentDocPage';
import { PlaygroundShowcase } from './pages/PlaygroundShowcase';
import { ArchitectureShowcase } from './pages/ArchitectureShowcase';
import { IconsShowcase } from './pages/IconsShowcase';
import { brandColors } from './tokens/colors/brand';

// Navigation icons
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 6.75L9 1.5L15.75 6.75V15C15.75 15.3978 15.592 15.7794 15.3107 16.0607C15.0294 16.342 14.6478 16.5 14.25 16.5H3.75C3.35218 16.5 2.97064 16.342 2.68934 16.0607C2.40804 15.7794 2.25 15.3978 2.25 15V6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 16.5V9H11.25V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlaygroundIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6.75L8.25 9L6 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.75 11.25H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArchitectureIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12.75V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9.75V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6.75V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.25 3.75L9 2.25L15.75 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6.75C4.24264 6.75 5.25 5.74264 5.25 4.5C5.25 3.25736 4.24264 2.25 3 2.25C1.75736 2.25 0.75 3.25736 0.75 4.5C0.75 5.74264 1.75736 6.75 3 6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ComponentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 2.25H2.25V7.5H7.5V2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 2.25H10.5V7.5H15.75V2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 10.5H10.5V15.75H15.75V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 10.5H2.25V15.75H7.5V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 5.25L10.545 8.385L14.0325 8.89125L11.5163 11.34L12.09 14.8125L9 13.185L5.91 14.8125L6.48375 11.34L3.9675 8.89125L7.455 8.385L9 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon />, type: 'item' },
    { id: 'playground', label: 'Playground', icon: <PlaygroundIcon />, type: 'item' },
    { id: 'architecture', label: 'Token Architecture', icon: <ArchitectureIcon />, type: 'item' },
    { id: 'icons', label: 'Icons', icon: <IconsIcon />, type: 'item', badge: '40+' },
    { id: 'divider1', label: '', type: 'divider' },
    { id: 'components-section', label: 'Components', type: 'section' },
    { id: 'button', label: 'Button', icon: <ComponentIcon />, type: 'item', badge: '3' },
    { id: 'checkbox', label: 'Checkbox', icon: <ComponentIcon />, type: 'item' },
    { id: 'radio', label: 'Radio', icon: <ComponentIcon />, type: 'item' },
    { id: 'toggle', label: 'Toggle', icon: <ComponentIcon />, type: 'item' },
    { id: 'divider2', label: '', type: 'divider' },
    { id: 'inputs-section', label: 'Inputs', type: 'section' },
    { id: 'textinput', label: 'TextInput', icon: <ComponentIcon />, type: 'item' },
    { id: 'searchinput', label: 'SearchInput', icon: <ComponentIcon />, type: 'item' },
    { id: 'divider3', label: '', type: 'divider' },
    { id: 'feedback-section', label: 'Feedback', type: 'section' },
    { id: 'alert', label: 'Alert', icon: <ComponentIcon />, type: 'item', badge: '5' },
    { id: 'modal', label: 'Modal', icon: <ComponentIcon />, type: 'item' },
    { id: 'divider4', label: '', type: 'divider' },
    { id: 'navigation-section', label: 'Navigation', type: 'section' },
    { id: 'tabs', label: 'Tabs', icon: <ComponentIcon />, type: 'item' },
    { id: 'chip', label: 'Chip', icon: <ComponentIcon />, type: 'item', badge: '4' },
  ];

  const componentPages = ['button', 'checkbox', 'radio', 'toggle', 'textinput', 'searchinput', 'chip', 'alert', 'modal', 'tabs'];

  const renderContent = () => {
    if (activePage === 'home') {
      return <HomePage onNavigate={setActivePage} />;
    }
    if (activePage === 'playground') {
      return <PlaygroundShowcase />;
    }
    if (activePage === 'architecture') {
      return <ArchitectureShowcase />;
    }
    if (activePage === 'icons') {
      return <IconsShowcase />;
    }
    if (componentPages.includes(activePage)) {
      return <ComponentDocPage componentId={activePage} />;
    }
    return <HomePage onNavigate={setActivePage} />;
  };

  const SidebarHeader = () => (
    <div style={styles.sidebarHeader}>
      <div style={styles.logoWrapper}>
        <div style={styles.logo}>R</div>
        <div style={styles.logoText}>
          <span style={styles.logoTitle}>Radiant</span>
          <span style={styles.logoSubtitle}>Design System</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <Sidebar
        items={navItems}
        activeId={activePage}
        onSelect={setActivePage}
        header={<SidebarHeader />}
      />
      <main style={styles.main}>
        <div style={styles.content}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    minHeight: '100vh',
    overflowY: 'auto',
  },
  content: {
    minHeight: '100%',
    padding: '32px',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(39, 112, 239, 0.4)',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  logoTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '-0.3px',
  },
  logoSubtitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '0.2px',
  },
};

export default App;
