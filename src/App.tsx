import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { Sidebar, NavItem } from './components/Sidebar';
import { InspectorProvider } from './context/InspectorContext';
import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { ComponentDocPage } from './pages/ComponentDocPage';
import { PlaygroundShowcase } from './pages/PlaygroundShowcase';
import { ArchitectureShowcase } from './pages/ArchitectureShowcase';
import { IconsShowcase } from './pages/IconsShowcase';
import { ComponentStatusPage } from './pages/ComponentStatusPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { SettingsPanelDemo } from './pages/SettingsPanelDemo';
import { DataDashboardDemo } from './pages/DataDashboardDemo';
import { SpotterDashboard } from './pages/SpotterDashboard';
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

const StatusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChangelogIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V15C3 15.3978 3.15804 15.7794 3.43934 16.0607C3.72064 16.342 4.10218 16.5 4.5 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V6L10.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5 1.5V6H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 9H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrototypeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 2.25H2.25V7.5H7.5V2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 2.25H10.5V7.5H15.75V2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 10.5H10.5V15.75H15.75V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 10.5H2.25V15.75H7.5V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Layout component with sidebar
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get active page ID from current path
  const getActiveId = (): string => {
    const path = location.pathname;
    
    if (path === '/' || path === '/home') return 'home';
    if (path === '/playground') return 'playground';
    if (path === '/architecture') return 'architecture';
    if (path === '/icons') return 'icons';
    if (path === '/status') return 'status';
    if (path === '/changelog') return 'changelog';
    if (path === '/prototypes/filter-dialog') return 'filter-dialog';
    if (path === '/prototypes/settings-panel') return 'settings-panel';
    if (path === '/prototypes/data-dashboard') return 'data-dashboard';
    if (path === '/prototypes/spotter-dashboard') return 'spotter-dashboard';
    
    // Check if it's a component page
    if (path.startsWith('/components/')) {
      return path.replace('/components/', '');
    }
    
    return 'home';
  };

  const handleNavigate = (id: string) => {
    // Map nav item IDs to routes
    const routeMap: Record<string, string> = {
      'home': '/',
      'playground': '/playground',
      'architecture': '/architecture',
      'icons': '/icons',
      'status': '/status',
      'changelog': '/changelog',
      // Component pages
      'button': '/components/button',
      'checkbox': '/components/checkbox',
      'radio': '/components/radio',
      'toggle': '/components/toggle',
      'textinput': '/components/textinput',
      'searchinput': '/components/searchinput',
      'select': '/components/select',
      'alert': '/components/alert',
      'modal': '/components/modal',
      'confirmdialog': '/components/confirmdialog',
      'wizardmodal': '/components/wizardmodal',
      'formmodal': '/components/formmodal',
      'filterdialog': '/components/filterdialog',
      'popover': '/components/popover',
      'loadingindicator': '/components/loadingindicator',
      'tabs': '/components/tabs',
      'chip': '/components/chip',
      // Prototype pages
      'filter-dialog': '/prototypes/filter-dialog',
      'settings-panel': '/prototypes/settings-panel',
      'data-dashboard': '/prototypes/data-dashboard',
      'spotter-dashboard': '/prototypes/spotter-dashboard',
    };

    const route = routeMap[id] || '/';
    navigate(route);
  };

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon />, type: 'item' },
    { id: 'playground', label: 'Playground', icon: <PlaygroundIcon />, type: 'item' },
    { id: 'architecture', label: 'Token Architecture', icon: <ArchitectureIcon />, type: 'item' },
    { id: 'icons', label: 'Icons', icon: <IconsIcon />, type: 'item', badge: '46' },
    { id: 'status', label: 'Component Status', icon: <StatusIcon />, type: 'item' },
    { id: 'changelog', label: 'Changelog', icon: <ChangelogIcon />, type: 'item' },
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
    { id: 'select', label: 'Select', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'divider3', label: '', type: 'divider' },
    { id: 'feedback-section', label: 'Feedback', type: 'section' },
    { id: 'alert', label: 'Alert', icon: <ComponentIcon />, type: 'item', badge: '5' },
    { id: 'modal', label: 'Modal', icon: <ComponentIcon />, type: 'item' },
    { id: 'confirmdialog', label: 'ConfirmDialog', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'divider4', label: '', type: 'divider' },
    { id: 'modals-section', label: 'Modal Patterns', type: 'section' },
    { id: 'wizardmodal', label: 'WizardModal', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'formmodal', label: 'FormModal', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'filterdialog', label: 'FilterDialog', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'divider5', label: '', type: 'divider' },
    { id: 'overlay-section', label: 'Overlay', type: 'section' },
    { id: 'popover', label: 'Popover', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'loadingindicator', label: 'LoadingIndicator', icon: <ComponentIcon />, type: 'item', badge: 'new' },
    { id: 'divider6', label: '', type: 'divider' },
    { id: 'navigation-section', label: 'Navigation', type: 'section' },
    { id: 'tabs', label: 'Tabs', icon: <ComponentIcon />, type: 'item' },
    { id: 'chip', label: 'Chip', icon: <ComponentIcon />, type: 'item', badge: '4' },
    { id: 'divider7', label: '', type: 'divider' },
    { id: 'prototypes-section', label: 'Example Prototypes', type: 'section' },
    { id: 'spotter-dashboard', label: 'Spotter Dashboard', icon: <PrototypeIcon />, type: 'item', badge: 'new' },
    { id: 'filter-dialog', label: 'Filter Dialog', icon: <PrototypeIcon />, type: 'item' },
    { id: 'data-dashboard', label: 'Data Dashboard', icon: <PrototypeIcon />, type: 'item' },
    { id: 'settings-panel', label: 'Settings Panel', icon: <PrototypeIcon />, type: 'item' },
  ];

  const SidebarHeader = () => (
    <div style={styles.sidebarHeader}>
      <Link to="/" style={styles.logoWrapper}>
        <div style={styles.logo}>R</div>
        <div style={styles.logoText}>
          <span style={styles.logoTitle}>Radiant</span>
          <span style={styles.logoSubtitle}>Design System</span>
        </div>
      </Link>
    </div>
  );

  return (
    <div style={styles.app}>
      <Sidebar
        items={navItems}
        activeId={getActiveId()}
        onSelect={handleNavigate}
        header={<SidebarHeader />}
      />
      <main style={styles.main}>
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

// Wrapper component for HomePage that needs navigation
const HomePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    const routeMap: Record<string, string> = {
      'playground': '/playground',
      'architecture': '/architecture',
      'status': '/status',
      'changelog': '/changelog',
      'button': '/components/button',
      'checkbox': '/components/checkbox',
      'radio': '/components/radio',
      'toggle': '/components/toggle',
      'textinput': '/components/textinput',
      'searchinput': '/components/searchinput',
      'select': '/components/select',
      'chip': '/components/chip',
      'alert': '/components/alert',
      'modal': '/components/modal',
      'confirmdialog': '/components/confirmdialog',
      'wizardmodal': '/components/wizardmodal',
      'formmodal': '/components/formmodal',
      'filterdialog': '/components/filterdialog',
      'popover': '/components/popover',
      'loadingindicator': '/components/loadingindicator',
      'tabs': '/components/tabs',
    };
    navigate(routeMap[id] || `/components/${id}`);
  };
  return <HomePage onNavigate={handleNavigate} />;
};

const App: React.FC = () => {
  return (
    <InspectorProvider>
      <Routes>
        {/* Landing page without sidebar */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* Main pages with sidebar */}
        <Route path="/home" element={<MainLayout><HomePageWrapper /></MainLayout>} />
        <Route path="/playground" element={<MainLayout><PlaygroundShowcase /></MainLayout>} />
        <Route path="/architecture" element={<MainLayout><ArchitectureShowcase /></MainLayout>} />
        <Route path="/icons" element={<MainLayout><IconsShowcase /></MainLayout>} />
        <Route path="/status" element={<MainLayout><ComponentStatusPage /></MainLayout>} />
        <Route path="/changelog" element={<MainLayout><ChangelogPage /></MainLayout>} />
        
        {/* Component documentation pages */}
        <Route path="/components/button" element={<MainLayout><ComponentDocPage componentId="button" /></MainLayout>} />
        <Route path="/components/checkbox" element={<MainLayout><ComponentDocPage componentId="checkbox" /></MainLayout>} />
        <Route path="/components/radio" element={<MainLayout><ComponentDocPage componentId="radio" /></MainLayout>} />
        <Route path="/components/toggle" element={<MainLayout><ComponentDocPage componentId="toggle" /></MainLayout>} />
        <Route path="/components/textinput" element={<MainLayout><ComponentDocPage componentId="textinput" /></MainLayout>} />
        <Route path="/components/searchinput" element={<MainLayout><ComponentDocPage componentId="searchinput" /></MainLayout>} />
        <Route path="/components/select" element={<MainLayout><ComponentDocPage componentId="select" /></MainLayout>} />
        <Route path="/components/chip" element={<MainLayout><ComponentDocPage componentId="chip" /></MainLayout>} />
        <Route path="/components/alert" element={<MainLayout><ComponentDocPage componentId="alert" /></MainLayout>} />
        <Route path="/components/modal" element={<MainLayout><ComponentDocPage componentId="modal" /></MainLayout>} />
        <Route path="/components/confirmdialog" element={<MainLayout><ComponentDocPage componentId="confirmdialog" /></MainLayout>} />
        <Route path="/components/wizardmodal" element={<MainLayout><ComponentDocPage componentId="wizardmodal" /></MainLayout>} />
        <Route path="/components/formmodal" element={<MainLayout><ComponentDocPage componentId="formmodal" /></MainLayout>} />
        <Route path="/components/filterdialog" element={<MainLayout><ComponentDocPage componentId="filterdialog" /></MainLayout>} />
        <Route path="/components/popover" element={<MainLayout><ComponentDocPage componentId="popover" /></MainLayout>} />
        <Route path="/components/loadingindicator" element={<MainLayout><ComponentDocPage componentId="loadingindicator" /></MainLayout>} />
        <Route path="/components/tabs" element={<MainLayout><ComponentDocPage componentId="tabs" /></MainLayout>} />
        
        {/* Example Prototype pages */}
        <Route path="/prototypes/spotter-dashboard" element={<MainLayout><SpotterDashboard /></MainLayout>} />
        <Route path="/prototypes/filter-dialog" element={<MainLayout><PlaygroundShowcase /></MainLayout>} />
        <Route path="/prototypes/settings-panel" element={<MainLayout><SettingsPanelDemo /></MainLayout>} />
        <Route path="/prototypes/data-dashboard" element={<MainLayout><DataDashboardDemo /></MainLayout>} />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </InspectorProvider>
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
    textDecoration: 'none',
    cursor: 'pointer',
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
