import React from 'react';
import { CommandCentre } from './CommandCentre';
import { BillingStats } from './BillingStats';

interface AdminContentProps {
  adminPrimaryNav: string;
  adminPage: string;
  adminScope: 'instance' | 'org';
  activeContentTab: string;
  setAdminPage: (page: string) => void;
  setAdminPrimaryNav: (nav: string) => void;
  setActiveContentTab: (tab: string) => void;
}

export function AdminContent({
  adminPrimaryNav,
  adminPage,
  adminScope,
  activeContentTab,
  setAdminPage,
  setAdminPrimaryNav,
  setActiveContentTab
}: AdminContentProps) {

  const pageTabsMap: Record<string, string[]> = {
    'User management': ['Users', 'Groups', 'Authentication'],
    'Usage insights': ['User adoption', 'Object usage', 'User productivity', 'Performance tracking'],
    'General settings': ['Language', 'Time Zone', 'Currency', 'Administration'],
    'Agent settings': ['Spotter', 'Spotter Viz', 'Spotter model', 'Spotter code'],
    'Simulations & Impersonation': ['Policy sandbox', 'Impersonation'],
    'Feature management': ['General access', 'Early access', 'Beta access'],
    'Customisations': ['Style', 'Chart', 'Homepage', 'Email', 'Help'],
    'Core features': ['Search and Spot IQ', 'Data modelling', 'Downloads & schedules'],
    'Governance & Security': ['Security overview', 'Audit & logs', 'Security policies'],
    'Connections & Integrations': ['Connections', 'Webhooks', 'API & service accounts'],
    'Infrastructure & Support': ['Cluster info', 'Network', 'Upgrades', 'Support']
  };

  const isClusterOnlyTab = (page: string, tab: string) => {
    if (adminScope === 'instance') return false;
    if (page === 'Users & Orgs' && tab === 'Orgs') return true;
    if (page === 'Infrastructure & Support' && (tab === 'Cluster info' || tab === 'Network')) return true;
    return false;
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {adminPrimaryNav === 'Resource control centre' && (
        <CommandCentre 
          adminScope={adminScope}
          onNavigate={(page: string, tab?: string) => {
            setAdminPage(page);
            setAdminPrimaryNav(page);
            if (tab) {
              setActiveContentTab(tab.toLowerCase());
            }
          }}
        />
      )}

      {adminPrimaryNav === 'Billing stats' && (
        <BillingStats adminScope={adminScope} />
      )}

      {/* Pages with Tabs */}
      {adminPage && pageTabsMap[adminPage] && (
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#1d232f]">{adminPage}</h2>
            {adminPage === 'Customisations' && (
              <button className="px-4 py-2 bg-white border border-[#d0d5dd] text-[#1d232f] text-sm font-medium rounded hover:bg-[#f6f8fa] transition-colors">
                Global settings
              </button>
            )}
          </div>
          
          {/* Tabs for pages with multiple tabs */}
          <div className="border-b border-[#d0d5dd] mb-6">
            <div className="flex gap-1">
              {pageTabsMap[adminPage].filter(tab => !isClusterOnlyTab(adminPage, tab)).map((tab) => {
                const isActive = activeContentTab === tab.toLowerCase();
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveContentTab(tab.toLowerCase())}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      isActive
                        ? 'text-[#71a1f4] border-[#71a1f4]'
                        : 'text-[#777e8b] border-transparent hover:text-[#1d232f]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-[#f6f8fa] border border-[#d0d5dd] rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {adminPage === 'Users & Orgs' && '👥'}
              {adminPage === 'Authentication' && '🔐'}
              {adminPage === 'General settings' && '⚙️'}
              {adminPage === 'Agent settings' && '🤖'}
              {adminPage === 'Simulations & Impersonation' && '🎭'}
              {adminPage === 'Feature management' && '🎛️'}
              {adminPage === 'Customisations' && '🎨'}
              {adminPage === 'Core features' && '⚡'}
              {adminPage === 'Governance & Security' && '🛡️'}
              {adminPage === 'Connections & Integrations' && '🔗'}
              {adminPage === 'Infrastructure & Support' && '⚙️'}
            </div>
            <h3 className="text-lg font-semibold text-[#1d232f] mb-2">{activeContentTab.charAt(0).toUpperCase() + activeContentTab.slice(1)}</h3>
            <p className="text-[#777e8b]">Content for {activeContentTab} under {adminPage}</p>
          </div>
        </div>
      )}

      {/* Pages without Tabs (Application Settings items) */}
      {adminPage && !pageTabsMap[adminPage] && adminPrimaryNav !== 'Resource control centre' && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-[#1d232f] mb-2">{adminPage}</h2>
          <p className="text-[#777e8b] mb-6">
            {adminPage === 'Org management' && adminScope === 'org' 
              ? 'View and manage your ThoughtSpot instance configuration and settings.'
              : `Configure ${adminPage.toLowerCase()} for your ThoughtSpot instance.`
            }
          </p>
          
          {/* Special rendering for Org management in All Orgs mode */}
          {adminPage === 'Org management' && adminScope === 'org' ? (
            <div className="space-y-6">
              {/* Instance Information Card */}
              <div className="bg-white border border-[#d0d5dd] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1d232f] mb-4">Instance Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Instance Name</p>
                    <p className="text-sm text-[#1d232f] font-medium">thoughtspot-prod-01</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Instance ID</p>
                    <p className="text-sm text-[#1d232f] font-mono">ts-inst-7a8b9c0d</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Region</p>
                    <p className="text-sm text-[#1d232f]">US West (Oregon)</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Environment</p>
                    <p className="text-sm text-[#1d232f]">Production</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Version</p>
                    <p className="text-sm text-[#1d232f]">9.10.5.cl</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Last Updated</p>
                    <p className="text-sm text-[#1d232f]">Jan 5, 2026</p>
                  </div>
                </div>
              </div>

              {/* Instance Stats Card */}
              <div className="bg-white border border-[#d0d5dd] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1d232f] mb-4">Instance Statistics</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Total Organizations</p>
                    <p className="text-2xl text-[#1d232f] font-semibold">24</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Total Users</p>
                    <p className="text-2xl text-[#1d232f] font-semibold">1,847</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Active Sessions</p>
                    <p className="text-2xl text-[#1d232f] font-semibold">342</p>
                  </div>
                </div>
              </div>

              {/* Instance Configuration Card */}
              <div className="bg-white border border-[#d0d5dd] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1d232f] mb-4">Configuration</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">License Type</p>
                    <p className="text-sm text-[#1d232f]">Enterprise</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Max User Limit</p>
                    <p className="text-sm text-[#1d232f]">5,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Storage Capacity</p>
                    <p className="text-sm text-[#1d232f]">2.5 TB / 5 TB</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#777e8b] mb-1">Backup Status</p>
                    <p className="text-sm text-[#22c55e]">Active (Daily)</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#f6f8fa] border border-[#d0d5dd] rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">
                {adminPage === 'AI and BI Stats' && '📈'}
                {adminPage === 'Org management' && '🏢'}
                {adminPage === 'ThoughtSpot AI' && '🤖'}
                {adminPage === 'Variables' && '💾'}
                {adminPage === 'Version control' && '🔀'}
                {!['AI and BI Stats', 'Org management', 'ThoughtSpot AI', 'Variables', 'Version control'].includes(adminPage) && '⚙️'}
              </div>
              <p className="text-[#777e8b]">Content area for {adminPage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
