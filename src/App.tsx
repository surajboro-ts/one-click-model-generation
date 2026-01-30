import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Sidebar, NavItem } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { WelcomePage } from './pages/WelcomePage';
import { ComponentDocPage } from './pages/ComponentDocPage';
import { PlaygroundShowcase } from './pages/PlaygroundShowcase';
import { ArchitectureShowcase } from './pages/ArchitectureShowcase';
import { IconsShowcase } from './pages/IconsShowcase';
import { brandColors } from './tokens/colors/brand';

// Prototype examples
import { FilterDialogExample } from './prototypes/_examples/FilterDialog';
import { DataDashboardExample } from './prototypes/_examples/DataDashboard';
import { SettingsPanelExample } from './prototypes/_examples/SettingsPanel';

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

// Route definitions for cleaner mapping
const ROUTES = {
  welcome: '/',
  components: '/components',
  playground: '/playground',
  architecture: '/architecture',
  icons: '/icons',
  // Example prototypes
  filterDialog: '/examples/filter-dialog',
  dataDashboard: '/examples/data-dashboard',
  settingsPanel: '/examples/settings-panel',
  // Component documentation
  button: '/components/button',
  checkbox: '/components/checkbox',
  radio: '/components/radio',
  toggle: '/components/toggle',
  textinput: '/components/textinput',
  searchinput: '/components/searchinput',
  select: '/components/select',
  alert: '/components/alert',
  modal: '/components/modal',
  tooltip: '/components/tooltip',
  popover: '/components/popover',
  table: '/components/table',
  tabs: '/components/tabs',
  chip: '/components/chip',
} as const;

// Layout component with sidebar
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get active page ID from current path
  const getActiveId = (): string => {
    const path = location.pathname;
    
    // Find matching route
    for (const [key, route] of Object.entries(ROUTES)) {
      if (path === route) return key;
    }
    
    // Check if it's a component page
    if (path.startsWith('/components/')) {
      const componentId = path.replace('/components/', '');
      return componentId;
    }
    
    // Check if it's an example page
    if (path.startsWith('/examples/')) {
      const exampleId = path.replace('/examples/', '');
      return `example-${exampleId}`;
    }
    
    return 'components';
  };

  const handleNavigate = (id: string) => {
    // Map nav item IDs to routes
    const routeMap: Record<string, string> = {
      'components': '/components',
      'playground': '/playground',
      'architecture': '/architecture',
      'icons': '/icons',
      'example-filter-dialog': '/examples/filter-dialog',
      'example-data-dashboard': '/examples/data-dashboard',
      'example-settings-panel': '/examples/settings-panel',
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
      'tooltip': '/components/tooltip',
      'popover': '/components/popover',
      'table': '/components/table',
      'tabs': '/components/tabs',
      'chip': '/components/chip',
    };

    const route = routeMap[id] || '/components';
    navigate(route);
  };

  const navItems: NavItem[] = [
    { id: 'components', label: 'Components', icon: <HomeIcon />, type: 'item' },
    { id: 'playground', label: 'Playground', icon: <PlaygroundIcon />, type: 'item' },
    { id: 'architecture', label: 'Token Architecture', icon: <ArchitectureIcon />, type: 'item' },
    { id: 'icons', label: 'Icons', icon: <IconsIcon />, type: 'item', badge: '46' },
    { id: 'divider0', label: '', type: 'divider' },
    { id: 'examples-section', label: 'Example Prototypes', type: 'section' },
    { id: 'example-filter-dialog', label: 'Filter Dialog', icon: <ComponentIcon />, type: 'item' },
    { id: 'example-data-dashboard', label: 'Data Dashboard', icon: <ComponentIcon />, type: 'item' },
    { id: 'example-settings-panel', label: 'Settings Panel', icon: <ComponentIcon />, type: 'item' },
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
    { id: 'select', label: 'Select', icon: <ComponentIcon />, type: 'item', badge: 'New' },
    { id: 'divider3', label: '', type: 'divider' },
    { id: 'feedback-section', label: 'Feedback', type: 'section' },
    { id: 'alert', label: 'Alert', icon: <ComponentIcon />, type: 'item', badge: '5' },
    { id: 'modal', label: 'Modal', icon: <ComponentIcon />, type: 'item' },
    { id: 'tooltip', label: 'Tooltip', icon: <ComponentIcon />, type: 'item', badge: 'New' },
    { id: 'popover', label: 'Popover', icon: <ComponentIcon />, type: 'item', badge: 'New' },
    { id: 'divider4', label: '', type: 'divider' },
    { id: 'data-section', label: 'Data Display', type: 'section' },
    { id: 'table', label: 'Table', icon: <ComponentIcon />, type: 'item', badge: 'New' },
    { id: 'divider5', label: '', type: 'divider' },
    { id: 'navigation-section', label: 'Navigation', type: 'section' },
    { id: 'tabs', label: 'Tabs', icon: <ComponentIcon />, type: 'item' },
    { id: 'chip', label: 'Chip', icon: <ComponentIcon />, type: 'item', badge: '4' },
  ];

  const SidebarHeader = () => (
    <div style={styles.sidebarHeader}>
      <div 
        style={styles.logoWrapper}
        onClick={() => navigate('/')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
      >
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

// Wrapper component for pages that need navigation
const HomePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    const routeMap: Record<string, string> = {
      'playground': '/playground',
      'architecture': '/architecture',
      'button': '/components/button',
      'checkbox': '/components/checkbox',
      'radio': '/components/radio',
      'toggle': '/components/toggle',
      'textinput': '/components/textinput',
      'searchinput': '/components/searchinput',
      'chip': '/components/chip',
      'alert': '/components/alert',
      'modal': '/components/modal',
      'tabs': '/components/tabs',
    };
    navigate(routeMap[id] || `/components/${id}`);
  };
  return <HomePage onNavigate={handleNavigate} />;
};

const WelcomePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    const routeMap: Record<string, string> = {
      'playground': '/playground',
      'home': '/components',
      'components': '/components',
      'architecture': '/architecture',
      'icons': '/icons',
    };
    navigate(routeMap[id] || '/components');
  };
  return <WelcomePage onNavigate={handleNavigate} />;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Welcome page - full width, no sidebar */}
      <Route path="/" element={<WelcomePageWrapper />} />
      
      {/* Main pages with sidebar */}
      <Route path="/components" element={<MainLayout><HomePageWrapper /></MainLayout>} />
      <Route path="/playground" element={<MainLayout><PlaygroundShowcase /></MainLayout>} />
      <Route path="/architecture" element={<MainLayout><ArchitectureShowcase /></MainLayout>} />
      <Route path="/icons" element={<MainLayout><IconsShowcase /></MainLayout>} />
      
      {/* Example prototypes */}
      <Route path="/examples/filter-dialog" element={<MainLayout><FilterDialogExample /></MainLayout>} />
      <Route path="/examples/data-dashboard" element={<MainLayout><DataDashboardExample /></MainLayout>} />
      <Route path="/examples/settings-panel" element={<MainLayout><SettingsPanelExample /></MainLayout>} />
      
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
      <Route path="/components/tooltip" element={<MainLayout><ComponentDocPage componentId="tooltip" /></MainLayout>} />
      <Route path="/components/popover" element={<MainLayout><ComponentDocPage componentId="popover" /></MainLayout>} />
      <Route path="/components/table" element={<MainLayout><ComponentDocPage componentId="table" /></MainLayout>} />
      <Route path="/components/tabs" element={<MainLayout><ComponentDocPage componentId="tabs" /></MainLayout>} />
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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
