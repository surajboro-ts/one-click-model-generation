import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import type { SidebarTab, SidebarCategory } from '../../components/AppSidebar';
import { Tooltip } from '../../components/Tooltip';
import { Popover } from '../../components/Popover';
import { Toast } from '../../components/Toast';
import {
  ImpersonationBorder,
  ImpersonationPopup,
  SpotterHomePage,
} from './components';
import { referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

// ---------------------------------------------------------------------------
// Sidebar configuration
// ---------------------------------------------------------------------------

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data',     label: 'Data',     headerTitle: 'Data Workspace' },
  { id: 'develop',  label: 'Develop',  headerTitle: 'Develop' },
  { id: 'admin',    label: 'Admin',    headerTitle: 'Admin' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [
    {
      title: 'Navigation',
      items: [
        { id: 'home',        label: 'Home' },
        { id: 'spotter',     label: 'Spotter' },
        { id: 'search-data', label: 'Search data' },
      ],
    },
    {
      title: 'Library',
      items: [
        { id: 'liveboards', label: 'Liveboards' },
        { id: 'answers',    label: 'Answers' },
      ],
    },
    {
      title: 'Analysis & Alerts',
      items: [
        { id: 'subscriptions',  label: 'Subscriptions' },
        { id: 'spotiq-analysis', label: 'SpotIQ analysis' },
      ],
    },
    {
      title: 'Favourites',
      items: [
        { id: 'retails-sales',      label: 'Retails Sales' },
        { id: 'total-sales',        label: 'Total sales, Total quantity pu...' },
        { id: 'cloud-clusters',     label: 'Cloud Clusters' },
        { id: 'sales-state-region', label: 'Sales by state and region' },
      ],
    },
  ],
  data: [
    {
      title: 'Data Workspace',
      items: [
        { id: 'data-objects', label: 'Data objects' },
        { id: 'connections',  label: 'Connections' },
      ],
    },
  ],
  develop: [
    {
      title: 'Developer',
      items: [
        { id: 'playground-dev', label: 'Playground' },
        { id: 'custom-actions', label: 'Custom actions' },
      ],
    },
  ],
  admin: [
    {
      title: 'Admin Settings',
      items: [
        { id: 'users',    label: 'Users' },
        { id: 'groups',   label: 'Groups' },
        { id: 'orgs',     label: 'Orgs' },
        { id: 'security', label: 'Security' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Custom impersonation icon — no matching icon in the 46-icon Radiant library
// ---------------------------------------------------------------------------

const ImpersonateIcon: React.FC<{ color?: string }> = ({ color = 'currentColor' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" />
    <circle cx="10" cy="9" r="2" stroke={color} strokeWidth="1.5" />
    <path
      d="M7 14C7 12.3431 8.34315 11 10 11C11.6569 11 13 12.3431 13 14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Session timer hook
// ---------------------------------------------------------------------------

function useSessionTimer(startTime: Date): string {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    const tick = () => {
      const totalSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const s = String(totalSeconds % 60).padStart(2, '0');
      setElapsed(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  return elapsed;
}

// ---------------------------------------------------------------------------
// Main prototype component
// ---------------------------------------------------------------------------

/**
 * ImpersonationV2
 *
 * Admin palette impersonation prototype (Figma node 2935-65873).
 * Shows a full-page Spotter experience with:
 *   - Blue viewport border while impersonating
 *   - Impersonation icon in GlobalHeader with Popover popup
 *   - Session timer inside the popup
 *   - Toast notification at the bottom
 *   - "Exit session" to end impersonation
 */
export const ImpersonationV2: React.FC = () => {
  const [isImpersonating, setIsImpersonating] = useState(true);
  const [showPopup,       setShowPopup]       = useState(false);
  const [showToast,       setShowToast]       = useState(true);
  const [sidebarTab,      setSidebarTab]      = useState<SidebarTabId>('insights');
  const [sidebarNav,      setSidebarNav]      = useState('home');

  // Pre-seeded start time so timer reads ~24 minutes on first render
  const [sessionStart] = useState(() => new Date(Date.now() - 24 * 60 * 1000 + 55 * 1000));
  const elapsedTime = useSessionTimer(sessionStart);

  const impersonatedUser = 'Simran Pandit';

  const handleExitSession = () => {
    setIsImpersonating(false);
    setShowPopup(false);
    setShowToast(false);
  };

  // Impersonation icon in GlobalHeader's rightSlot.
  // Raw <button> is intentional — an icon-only circular trigger where Button
  // would apply unwanted text padding and styling.
  const impersonationSlot = isImpersonating ? (
    <Tooltip content="Impersonation active" placement="bottom">
      <Popover
        content={
          <ImpersonationPopup
            userName={impersonatedUser}
            elapsedTime={elapsedTime}
            onExitSession={handleExitSession}
          />
        }
        placement="bottom-end"
        trigger="click"
        isOpen={showPopup}
        onOpenChange={setShowPopup}
        closeOnClickOutside
        closeOnEscape
        offset={spacing.B}
      >
        <button
          style={styles.impersonationTrigger}
          aria-label="Impersonation settings"
          aria-expanded={showPopup}
          aria-haspopup="dialog"
        >
          <ImpersonateIcon color={referenceColors.brand['60']} />
        </button>
      </Popover>
    </Tooltip>
  ) : undefined;

  return (
    <ImpersonationBorder active={isImpersonating}>
      <div style={styles.shellWrapper}>
        <AppShell
          headerProps={{
            searchPlaceholder: 'Search in your library',
            userName: impersonatedUser,
            notificationCount: 3,
            rightSlot: impersonationSlot,
          }}
          sidebarProps={{
            tabs: SIDEBAR_TABS,
            activeTab: sidebarTab,
            onTabChange: (tabId) => {
              setSidebarTab(tabId as SidebarTabId);
              setSidebarNav('');
            },
            categories: SIDEBAR_CATEGORIES,
            selectedNav: sidebarNav,
            onNavSelect: setSidebarNav,
          }}
          contentBackground={referenceColors.gray['10']}
        >
          <SpotterHomePage />
        </AppShell>

        {/* Persistent toast — shown until admin exits or dismisses */}
        {isImpersonating && showToast && (
          <div style={styles.toastContainer}>
            <Toast
              message={`You are now acting as <${impersonatedUser}>.`}
              type="info"
              duration={0}
              actionText="End session"
              onAction={handleExitSession}
              onDismiss={() => setShowToast(false)}
              position="bottom"
            />
          </div>
        )}
      </div>
    </ImpersonationBorder>
  );
};

// ---------------------------------------------------------------------------
// Styles — tokens only
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  shellWrapper: {
    height: '100vh',
    width: '100%',
    position: 'relative',
  },
  toastContainer: {
    position: 'fixed',
    bottom: spacing.F,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9998,
  },
  impersonationTrigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing.H,
    height: spacing.H,
    borderRadius: '50%',
    backgroundColor: referenceColors.brand['10'],
    border: `1px solid ${referenceColors.brand['30']}`,
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
  },
};

export default ImpersonationV2;
