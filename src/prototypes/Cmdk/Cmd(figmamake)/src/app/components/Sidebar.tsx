import svgPaths from '../../imports/svg-reay659j';
import { AdminLocalSearch } from './AdminLocalSearch';
import { Plus, ExternalLink } from 'lucide-react';
import React, { useCallback } from 'react';

interface SidebarProps {
  globalOption: 'option1' | 'option2' | 'option3';
  activeTab: 'insights' | 'data' | 'develop' | 'admin';
  setActiveTab: (tab: 'insights' | 'data' | 'develop' | 'admin') => void;
  selectedNav: string;
  setSelectedNav: (nav: string) => void;
  developOrg: 'all' | 'primary';
  setDevelopOrg: (org: 'all' | 'primary') => void;
  adminPrimaryNav: string;
  setAdminPrimaryNav: (nav: string) => void;
  adminPage: string;
  setAdminPage: (page: string) => void;
  adminScope: 'instance' | 'org';
  setAdminScope: (scope: 'instance' | 'org') => void;
  activeContentTab: string;
  setActiveContentTab: (tab: string) => void;
  highlightedPage: string | null;
  setHighlightedPage: (page: string | null) => void;
  adminSearchOpen: boolean;
  setAdminSearchOpen: (open: boolean) => void;
  setCommandPaletteFilter: (filter: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  className?: string;
  onClose?: () => void; // For overlay mode
  isOverlay?: boolean;
}

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const SidebarItem = React.memo(({ label, isActive, isHighlighted, onClick, children }: SidebarItemProps) => {
  let classes = 'flex items-center gap-2 px-6 py-1.5 relative transition-all duration-500 ';
  
  if (isHighlighted) {
    classes += 'bg-[rgba(113,161,244,0.3)] text-[#71a1f4]';
  } else if (isActive) {
    classes += 'text-[#71a1f4] bg-[rgba(113,161,244,0.12)]';
  } else {
    classes += 'text-[#dbdfe7] hover:bg-[rgba(113,161,244,0.06)]';
  }

  return (
    <button onClick={onClick} className={classes}>
      <span className={`text-sm ${isActive ? 'font-medium' : 'font-light'} truncate`}>
        {children || label}
      </span>
    </button>
  );
});

interface SidebarCategoryProps {
  title: string;
  children: React.ReactNode;
}

const SidebarCategory = React.memo(({ title, children }: SidebarCategoryProps) => (
  <div className="flex flex-col">
    <div className="px-6 py-1.5">
      <span className="text-[#a5acb9] text-[10px] font-bold tracking-[0.6px] uppercase">{title}</span>
    </div>
    {children}
  </div>
));

export function Sidebar({
  globalOption,
  activeTab,
  setActiveTab,
  selectedNav,
  setSelectedNav,
  developOrg,
  setDevelopOrg,
  adminPrimaryNav,
  setAdminPrimaryNav,
  adminPage,
  setAdminPage,
  adminScope,
  setAdminScope,
  activeContentTab,
  setActiveContentTab,
  highlightedPage,
  setHighlightedPage,
  adminSearchOpen,
  setAdminSearchOpen,
  setCommandPaletteFilter,
  setCommandPaletteOpen,
  className = '',
  onClose,
  isOverlay = false
}: SidebarProps) {
  
  const handleAdminNav = useCallback((page: string, contentTab?: string) => {
    setAdminPrimaryNav(page);
    setAdminPage(page);
    if (contentTab) setActiveContentTab(contentTab);
    if (isOverlay && onClose) onClose();
  }, [setAdminPrimaryNav, setAdminPage, setActiveContentTab, isOverlay, onClose]);

  const handleInsightsNav = useCallback((nav: string) => {
    setSelectedNav(nav);
    if (isOverlay && onClose) onClose();
  }, [setSelectedNav, isOverlay, onClose]);

  return (
    <div className={`flex flex-col bg-[#1d232f] border-r border-[#777e8b] ${className}`}>
      {/* App Tab Switcher */}
      <div className="flex items-center w-full shrink-0">
        <button 
          onClick={() => { setActiveTab('insights'); setSelectedNav('Home'); }}
          className={`flex-1 flex items-center justify-center py-[18px] transition-colors ${activeTab === 'insights' ? 'bg-[#232f43]' : 'bg-[#1d232f] hover:bg-[#232f43]'}`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8.5C0 7.94772 0.447715 7.5 1 7.5H4.29412C4.8464 7.5 5.29412 7.94772 5.29412 8.5V18H0V8.5Z" fill={activeTab === 'insights' ? "#FFFFFF" : "#DBDFE7"}/>
            <path d="M6.35294 1C6.35294 0.447716 6.80065 0 7.35294 0H10.6471C11.1993 0 11.6471 0.447715 11.6471 1V18H6.35294V1Z" fill={activeTab === 'insights' ? "#FFFFFF" : "#DBDFE7"}/>
            <path d="M12.7059 4C12.7059 3.44772 13.1536 3 13.7059 3H17C17.5523 3 18 3.44772 18 4V18H12.7059V4Z" fill={activeTab === 'insights' ? "#FFFFFF" : "#DBDFE7"}/>
          </svg>
        </button>
        <div className="w-px h-[54px] bg-[#323946]" />
        <button 
          onClick={() => { setActiveTab('data'); setSelectedNav('Data objects'); }}
          className={`flex-1 flex items-center justify-center py-[18px] transition-colors ${activeTab === 'data' ? 'bg-[#232f43]' : 'bg-[#1d232f] hover:bg-[#232f43]'}`}
        >
          <div className="size-[18px]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <path clipRule="evenodd" d={svgPaths.p251a6400} fill={activeTab === 'data' ? "#FFFFFF" : "#C0C6CF"} fillRule="evenodd" />
            </svg>
          </div>
        </button>
        <div className="w-px h-[54px] bg-[#323946]" />
        <button 
          onClick={() => { setActiveTab('develop'); setSelectedNav('Home'); }}
          className={`flex-1 flex items-center justify-center py-[18px] transition-colors ${activeTab === 'develop' ? 'bg-[#232f43]' : 'bg-[#1d232f] hover:bg-[#232f43]'}`}
        >
          <div className="size-[18px]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <path d={svgPaths.p33f7fb00} fill={activeTab === 'develop' ? "#FFFFFF" : "#C0C6CF"} />
              <path d={svgPaths.pe3ee880} fill={activeTab === 'develop' ? "#FFFFFF" : "#C0C6CF"} />
              <path d={svgPaths.p274b1e00} fill={activeTab === 'develop' ? "#FFFFFF" : "#C0C6CF"} />
            </svg>
          </div>
        </button>
        <div className="w-px h-[54px] bg-[#323946]" />
        <button 
          onClick={() => { setActiveTab('admin'); setAdminPrimaryNav('Resource control centre'); setAdminPage('Resource control centre'); }}
          className={`flex-1 flex items-center justify-center py-[18px] transition-colors ${activeTab === 'admin' ? 'bg-[#232f43]' : 'bg-[#1d232f] hover:bg-[#232f43]'}`}
        >
          <div className="size-[18px]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.68735 0.106065C7.65808 0.109354 7.63034 0.120865 7.60734 0.139266C7.58434 0.157666 7.56702 0.182203 7.55739 0.210038C7.48298 0.405375 7.44851 0.615692 7.41378 0.827587C7.38381 1.01044 7.35365 1.19447 7.29746 1.37106C7.15883 1.74362 6.91623 2.09886 6.25774 2.36746C5.59059 2.64471 5.16603 2.56674 4.8108 2.39345C4.64502 2.31258 4.49245 2.2053 4.33988 2.09801C4.16552 1.9754 3.99115 1.85279 3.79707 1.76962C3.77186 1.75847 3.74415 1.75419 3.71675 1.75724C3.68936 1.76028 3.66326 1.77053 3.64111 1.78695C2.93288 2.31063 2.30527 2.93533 1.77828 3.64111C1.76187 3.66326 1.75162 3.68936 1.74857 3.71675C1.74553 3.74415 1.7498 3.77186 1.76095 3.79707C1.84413 3.99115 1.96674 4.16552 2.08935 4.33988C2.19663 4.49245 2.30392 4.64502 2.38478 4.8108C2.55807 5.16603 2.64471 5.59059 2.35879 6.24908C2.0902 6.91623 1.73496 7.15883 1.36239 7.2888C1.17871 7.35141 0.988995 7.38386 0.800028 7.41618C0.596797 7.45094 0.394432 7.48555 0.201374 7.55739C0.174716 7.56635 0.150979 7.58236 0.132676 7.60372C0.114373 7.62507 0.102184 7.65098 0.0974013 7.67869C-0.0324671 8.55478 -0.0324671 9.44522 0.0974013 10.3213C0.106066 10.382 0.149388 10.4253 0.201374 10.4513C0.396711 10.5257 0.607027 10.5602 0.818922 10.5949C1.00177 10.6249 1.1858 10.655 1.36239 10.7112C1.73496 10.8498 2.0902 11.0924 2.35879 11.7509C2.63605 12.4181 2.55807 12.8426 2.38478 13.1979C2.30392 13.3636 2.19663 13.5162 2.08935 13.6688C1.96674 13.8431 1.84413 14.0175 1.76095 14.2116C1.7498 14.2368 1.74553 14.2645 1.74857 14.2919C1.75162 14.3193 1.76187 14.3454 1.77828 14.3676C2.29814 15.078 2.93064 15.7105 3.64111 16.2304C3.68443 16.265 3.74508 16.2737 3.79707 16.2477C3.99115 16.1645 4.16551 16.0419 4.33988 15.9193C4.49245 15.812 4.64502 15.7047 4.8108 15.6239C5.16603 15.4506 5.59059 15.364 6.24908 15.6499C6.91623 15.9185 7.15883 16.2737 7.2888 16.6463C7.35141 16.83 7.38386 17.0197 7.41618 17.2086C7.45094 17.4119 7.48555 17.6142 7.55739 17.8073C7.57472 17.8593 7.6267 17.8939 7.67869 17.9026C8.55478 18.0325 9.44522 18.0325 10.3213 17.9026C10.3487 17.9009 10.3751 17.8919 10.3979 17.8767C10.4207 17.8615 10.4391 17.8405 10.4513 17.816C10.5254 17.6169 10.5598 17.4054 10.5944 17.1935C10.6245 17.0088 10.6547 16.8238 10.7112 16.6463C10.8498 16.2737 11.0924 15.9185 11.7509 15.6499C12.4181 15.3726 12.8426 15.4506 13.1979 15.6239C13.3636 15.7047 13.5162 15.812 13.6688 15.9193C13.8432 16.0419 14.0175 16.1645 14.2116 16.2477C14.2636 16.2737 14.3242 16.265 14.3676 16.2304C15.0764 15.7041 15.7041 15.0764 16.2304 14.3676C16.2484 14.3445 16.2596 14.3168 16.2627 14.2877C16.2658 14.2586 16.2606 14.2292 16.2477 14.2029C16.1658 14.0164 16.0457 13.8466 15.925 13.676C15.8158 13.5216 15.7062 13.3666 15.6239 13.1979C15.4506 12.8426 15.364 12.4181 15.6499 11.7509C15.9185 11.0924 16.2737 10.8498 16.6463 10.7112C16.8236 10.6548 17.0066 10.6246 17.1892 10.5945C17.3989 10.5599 17.6081 10.5254 17.8073 10.4513C17.8315 10.4398 17.8527 10.4229 17.8692 10.4018C17.8857 10.3808 17.8972 10.3562 17.9026 10.33C18.0325 9.45389 18.0325 8.56344 17.9026 7.68735C17.9009 7.65999 17.8919 7.63356 17.8767 7.61074C17.8615 7.58792 17.8405 7.56952 17.816 7.55739C17.6169 7.48331 17.4054 7.44882 17.1935 7.41425C17.0088 7.38412 16.8238 7.35394 16.6463 7.29746C16.2737 7.15883 15.9185 6.91623 15.6499 6.25774C15.3726 5.59059 15.4506 5.16603 15.6239 4.8108C15.7047 4.64502 15.812 4.49245 15.9193 4.33988C16.0419 4.16551 16.1645 3.99115 16.2477 3.79707C16.2589 3.77186 16.2631 3.74415 16.2601 3.71675C16.257 3.68936 16.2468 3.66326 16.2304 3.64111C15.7041 2.93226 15.0764 2.30461 14.3676 1.77828C14.3454 1.76187 14.3193 1.75162 14.2919 1.74857C14.2645 1.74553 14.2368 1.7498 14.2116 1.76095C14.0175 1.84413 13.8431 1.96674 13.6688 2.08935C13.5162 2.19663 13.3636 2.30392 13.1979 2.38478C12.8426 2.55807 12.4181 2.64471 11.7509 2.35879C11.0924 2.0902 10.8498 1.73496 10.7112 1.36239C10.6548 1.18502 10.6246 1.00203 10.5945 0.819513C10.5599 0.609739 10.5254 0.400601 10.4513 0.201373C10.4423 0.174716 10.4263 0.150979 10.405 0.132675C10.3836 0.114372 10.3577 0.102184 10.33 0.0974013C9.45389 -0.0324671 8.56344 -0.0324671 7.68735 0.0974013V0.106065ZM9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z" fill={activeTab === 'admin' ? "#FFFFFF" : "#DBDFE7"}/>
            </svg>
          </div>
        </button>
      </div>
      <div className="h-px w-full bg-[#323946]" />

      {/* Main Menu */}
      <div className="flex-1 bg-[#232f43] overflow-y-auto">
        {/* Admin Tab Content */}
        {activeTab === 'admin' && (
          <>
            {/* Tab Header */}
            <div className={`px-6 ${(globalOption === 'option2' || globalOption === 'option3') ? 'py-4' : 'py-3'} relative`}>
              {/* Admin Local Search for Option 3 */}
              {globalOption === 'option3' && (
                <AdminLocalSearch
                  isOpen={adminSearchOpen}
                  onClose={() => setAdminSearchOpen(false)}
                  onNavigate={(page, highlightPage) => {
                    setAdminPrimaryNav(page);
                    setAdminPage(page);
                    setHighlightedPage(highlightPage);
                    if (isOverlay && onClose) onClose();
                  }}
                />
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-[#dbdfe7] text-lg font-medium">Admin</span>
                {globalOption === 'option2' && (
                  <button
                    onClick={() => {
                      setCommandPaletteFilter('admin');
                      setCommandPaletteOpen(true);
                    }}
                    className="p-1.5 hover:bg-[#1d232f] rounded transition-colors group"
                    title="Search admin settings"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 17.4142 17">
                      <path 
                        clipRule="evenodd" 
                        d={svgPaths.p2b964b80} 
                        fill="#A5ACB9" 
                        fillRule="evenodd"
                        className="group-hover:fill-[#71a1f4] transition-colors"
                      />
                    </svg>
                  </button>
                )}
                {globalOption === 'option3' && (
                  <button
                    onClick={() => setAdminSearchOpen(true)}
                    className="p-1.5 hover:bg-[#1d232f] rounded transition-colors group"
                    title="Search admin settings"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 17.4142 17">
                      <path 
                        clipRule="evenodd" 
                        d={svgPaths.p2b964b80} 
                        fill="#A5ACB9" 
                        fillRule="evenodd"
                        className="group-hover:fill-[#71a1f4] transition-colors"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Scope Toggle */}
            <div className="px-6 pb-4">
              <div className="flex gap-1 bg-[#1d232f] p-0.5 rounded-full">
                <button 
                  onClick={() => { setAdminScope('org'); if (isOverlay && onClose) onClose(); }}
                  className={`flex-1 px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${adminScope === 'org' ? 'bg-[#2f3a4e] text-[#dbdfe7]' : 'text-[#777e8b]'}`}
                >
                  All Orgs
                </button>
                <button 
                  onClick={() => { setAdminScope('instance'); if (isOverlay && onClose) onClose(); }}
                  className={`flex-1 px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${adminScope === 'instance' ? 'bg-[#2f3a4e] text-[#71a1f4]' : 'text-[#777e8b]'}`}
                >
                  Primary Org
                </button>
              </div>
            </div>

            {/* Category-Based Navigation */}
            <div className="flex flex-col gap-5">
              {/* Top-level pages */}
              <div className="flex flex-col">
                <SidebarItem 
                  label="Resource control centre"
                  isActive={adminPage === 'Resource control centre'}
                  isHighlighted={highlightedPage === 'Resource control centre'}
                  onClick={() => handleAdminNav('Resource control centre')}
                />
                <SidebarItem 
                  label="AI and BI Stats"
                  isActive={adminPage === 'AI and BI Stats'}
                  isHighlighted={highlightedPage === 'AI and BI Stats'}
                  onClick={() => handleAdminNav('AI and BI Stats')}
                />
                <SidebarItem 
                  label="Billing stats"
                  isActive={adminPage === 'Billing stats'}
                  isHighlighted={highlightedPage === 'Billing stats'}
                  onClick={() => handleAdminNav('Billing stats')}
                />
              </div>

              {/* CATEGORY 1: USERS & ORGS */}
              <SidebarCategory title="Users & Orgs">
                <SidebarItem 
                  label="Org management"
                  isActive={adminPage === 'Org management'}
                  isHighlighted={highlightedPage === 'Org management'}
                  onClick={() => handleAdminNav('Org management')}
                />
                <SidebarItem 
                  label="User management"
                  isActive={adminPage === 'User management'}
                  isHighlighted={highlightedPage === 'User management'}
                  onClick={() => handleAdminNav('User management', 'users')}
                />
                <SidebarItem 
                  label="Usage insights"
                  isActive={adminPage === 'Usage insights'}
                  isHighlighted={highlightedPage === 'Usage insights'}
                  onClick={() => handleAdminNav('Usage insights', 'user adoption')}
                />
              </SidebarCategory>
              
              {/* CATEGORY 2: APPLICATION SETTINGS */}
              <SidebarCategory title="Application Settings">
                <SidebarItem 
                  label="General settings"
                  isActive={adminPage === 'General settings'}
                  isHighlighted={highlightedPage === 'General settings'}
                  onClick={() => handleAdminNav('General settings', 'language')}
                />
                <SidebarItem 
                  label="Agent settings"
                  isActive={adminPage === 'Agent settings'}
                  isHighlighted={highlightedPage === 'Agent settings'}
                  onClick={() => handleAdminNav('Agent settings', 'spotter')}
                />
                <SidebarItem 
                  label="Feature management"
                  isActive={adminPage === 'Feature management'}
                  isHighlighted={highlightedPage === 'Feature management'}
                  onClick={() => handleAdminNav('Feature management', 'general access')}
                />
                <SidebarItem 
                  label="Customisations"
                  isActive={adminPage === 'Customisations'}
                  isHighlighted={highlightedPage === 'Customisations'}
                  onClick={() => handleAdminNav('Customisations', 'style')}
                />
                <SidebarItem 
                  label="Core features"
                  isActive={adminPage === 'Core features'}
                  isHighlighted={highlightedPage === 'Core features'}
                  onClick={() => handleAdminNav('Core features', 'search and spot iq')}
                />
                <SidebarItem 
                  label="Variables"
                  isActive={adminPage === 'Variables'}
                  isHighlighted={highlightedPage === 'Variables'}
                  onClick={() => handleAdminNav('Variables')}
                />
                <SidebarItem 
                  label="Version control"
                  isActive={adminPage === 'Version control'}
                  isHighlighted={highlightedPage === 'Version control'}
                  onClick={() => handleAdminNav('Version control')}
                />
              </SidebarCategory>

              {/* CATEGORY 3: SECURITY */}
              <SidebarCategory title="Security">
                <SidebarItem 
                  label="Simulations & Impersonation"
                  isActive={adminPage === 'Simulations & Impersonation'}
                  isHighlighted={highlightedPage === 'Simulations & Impersonation'}
                  onClick={() => handleAdminNav('Simulations & Impersonation', 'policy sandbox')}
                />
                <SidebarItem 
                  label="Governance & Security"
                  isActive={adminPage === 'Governance & Security'}
                  isHighlighted={highlightedPage === 'Governance & Security'}
                  onClick={() => handleAdminNav('Governance & Security', 'security overview')}
                />
              </SidebarCategory>

              {/* CATEGORY 4: SUPPORT AND INFRASTRUCTURE */}
              <SidebarCategory title="Support and Infrastructure">
                <SidebarItem 
                  label="Connections & Integrations"
                  isActive={adminPage === 'Connections & Integrations'}
                  isHighlighted={highlightedPage === 'Connections & Integrations'}
                  onClick={() => handleAdminNav('Connections & Integrations', 'connections')}
                />
                <SidebarItem 
                  label="Infrastructure & Support"
                  isActive={adminPage === 'Infrastructure & Support'}
                  isHighlighted={highlightedPage === 'Infrastructure & Support'}
                  onClick={() => handleAdminNav('Infrastructure & Support', 'cluster info')}
                />
              </SidebarCategory>

            </div>
          </>
        )}

        {/* Insights Tab Content */}
        {activeTab === 'insights' && (
          <>
            {/* Tab Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#323946]">
              <span className="text-[#dbdfe7] text-lg font-medium tracking-tight">Insights</span>
              <button className="text-[#dbdfe7] hover:opacity-80 transition-opacity">
                <Plus size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Sections */}
            <div className="flex flex-col gap-5 pt-4">
              {/* Main Navigation */}
              <div className="flex flex-col">
                <SidebarItem 
                  label="Home"
                  isActive={selectedNav === 'Home'}
                  onClick={() => handleInsightsNav('Home')}
                />
                <SidebarItem 
                  label="Spotter"
                  isActive={selectedNav === 'Spotter'}
                  onClick={() => handleInsightsNav('Spotter')}
                />
                <SidebarItem 
                  label="Search data"
                  isActive={selectedNav === 'Search data'}
                  onClick={() => handleInsightsNav('Search data')}
                />
              </div>

              {/* Library */}
              <SidebarCategory title="Library">
                <SidebarItem 
                  label="Liveboards"
                  isActive={selectedNav === 'Liveboards'}
                  onClick={() => handleInsightsNav('Liveboards')}
                />
                <SidebarItem 
                  label="Answers"
                  isActive={selectedNav === 'Answers'}
                  onClick={() => handleInsightsNav('Answers')}
                />
                <SidebarItem 
                  label="Collections"
                  isActive={selectedNav === 'Collections'}
                  onClick={() => handleInsightsNav('Collections')}
                />
              </SidebarCategory>

              {/* Analysis & Alerts */}
              <SidebarCategory title="Analysis & Alerts">
                <SidebarItem 
                  label="Liveboard schedules"
                  isActive={selectedNav === 'Liveboard schedules'}
                  onClick={() => handleInsightsNav('Liveboard schedules')}
                />
                <SidebarItem 
                  label="Monitor subscriptions"
                  isActive={selectedNav === 'Monitor subscriptions'}
                  onClick={() => handleInsightsNav('Monitor subscriptions')}
                />
              </SidebarCategory>

              {/* Favorites (Only in regular view or if needed) */}
              {!isOverlay && (
                <SidebarCategory title="Favorites">
                  <SidebarItem 
                    label="Sales by state and region"
                    isActive={selectedNav === 'Sales by state and region'}
                    onClick={() => handleInsightsNav('Sales by state and region')}
                  />
                  <SidebarItem 
                    label="Marketing analytics"
                    isActive={selectedNav === 'Marketing analytics'}
                    onClick={() => handleInsightsNav('Marketing analytics')}
                  />
                </SidebarCategory>
              )}
            </div>
          </>
        )}
        
        {/* Data Tab Content */}
        {activeTab === 'data' && (
          <>
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#323946]">
              <span className="text-[#dbdfe7] text-lg font-medium tracking-tight">Data workspace</span>
              <button className="text-[#dbdfe7] hover:opacity-80 transition-opacity">
                <Plus size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col gap-5 pt-4">
              {/* Main Navigation */}
              <div className="flex flex-col">
                <SidebarItem 
                  label="Data objects"
                  isActive={selectedNav === 'Data objects'}
                  onClick={() => setSelectedNav('Data objects')}
                />
                <SidebarItem 
                  label="Connections"
                  isActive={selectedNav === 'Connections'}
                  onClick={() => setSelectedNav('Connections')}
                />
                <SidebarItem 
                  label="Analyst Studio"
                  isActive={selectedNav === 'Analyst Studio'}
                  onClick={() => window.open('https://thoughtspot.com', '_blank')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Analyst Studio</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </div>
                </SidebarItem>
                <SidebarItem 
                  label="Utilities"
                  isActive={selectedNav === 'Utilities'}
                  onClick={() => setSelectedNav('Utilities')}
                />
                <SidebarItem 
                  label="Sync"
                  isActive={selectedNav === 'Sync'}
                  onClick={() => setSelectedNav('Sync')}
                />
              </div>

              {/* SPOTTER COACHING */}
              <SidebarCategory title="SPOTTER COACHING">
                <SidebarItem 
                  label="Reference questions"
                  isActive={selectedNav === 'Reference questions'}
                  onClick={() => setSelectedNav('Reference questions')}
                />
                <SidebarItem 
                  label="Business terms"
                  isActive={selectedNav === 'Business terms'}
                  onClick={() => setSelectedNav('Business terms')}
                />
              </SidebarCategory>

              {/* GOVERNANCE */}
              <SidebarCategory title="GOVERNANCE">
                <SidebarItem 
                  label="Data catalog"
                  isActive={selectedNav === 'Data catalog'}
                  onClick={() => setSelectedNav('Data catalog')}
                />
                <SidebarItem 
                  label="Usage"
                  isActive={selectedNav === 'Usage'}
                  onClick={() => setSelectedNav('Usage')}
                />
                <SidebarItem 
                  label="dbt"
                  isActive={selectedNav === 'dbt'}
                  onClick={() => setSelectedNav('dbt')}
                />
                <SidebarItem 
                  label="Liveboard verification"
                  isActive={selectedNav === 'Liveboard verification'}
                  onClick={() => setSelectedNav('Liveboard verification')}
                />
              </SidebarCategory>
            </div>
          </>
        )}
        
        {/* Develop Tab Content */}
        {activeTab === 'develop' && (
          <>
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#323946]">
              <span className="text-[#dbdfe7] text-lg font-medium tracking-tight">Develop</span>
            </div>

            {/* Scope Toggle */}
            <div className="px-6 py-4">
              <div className="flex gap-1 bg-[#1d232f] p-0.5 rounded-full border border-[#323946]">
                <button 
                  onClick={() => setDevelopOrg('all')}
                  className={`flex-1 px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${developOrg === 'all' ? 'bg-[#2f3a4e] text-[#dbdfe7]' : 'text-[#777e8b]'}`}
                >
                  All Orgs
                </button>
                <button 
                  onClick={() => setDevelopOrg('primary')}
                  className={`flex-1 px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${developOrg === 'primary' ? 'bg-[#2f3a4e] text-[#71a1f4]' : 'text-[#777e8b]'}`}
                >
                  Primary Org
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <SidebarItem 
                  label="Home"
                  isActive={selectedNav === 'Home'}
                  onClick={() => setSelectedNav('Home')}
                />
              </div>

              {/* VISUAL EMBED SDK */}
              <SidebarCategory title="VISUAL EMBED SDK">
                <SidebarItem 
                  label="Guide"
                  isActive={selectedNav === 'Guide'}
                  onClick={() => setSelectedNav('Guide')}
                />
                <SidebarItem 
                  label="Playground"
                  isActive={selectedNav === 'Playground'}
                  onClick={() => setSelectedNav('Playground')}
                />
              </SidebarCategory>

              {/* REST API */}
              <SidebarCategory title="REST API">
                <SidebarItem 
                  label="Guide"
                  isActive={selectedNav === 'REST API Guide'}
                  onClick={() => setSelectedNav('REST API Guide')}
                />
                <SidebarItem 
                  label="REST Playground v2.0"
                  isActive={selectedNav === 'REST Playground v2.0'}
                  onClick={() => setSelectedNav('REST Playground v2.0')}
                />
                <SidebarItem 
                  label="REST Playground v1"
                  isActive={selectedNav === 'REST Playground v1'}
                  onClick={() => setSelectedNav('REST Playground v1')}
                />
                <SidebarItem 
                  label="GraphQL v2.0"
                  isActive={selectedNav === 'GraphQL v2.0'}
                  onClick={() => setSelectedNav('GraphQL v2.0')}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>GraphQL v2.0</span>
                    <span className="px-1.5 py-0.5 bg-[#22c55e] text-[#052e16] text-[10px] font-bold rounded">Beta</span>
                  </div>
                </SidebarItem>
              </SidebarCategory>

              {/* CUSTOMISATIONS */}
              <SidebarCategory title="CUSTOMISATIONS">
                <SidebarItem 
                  label="Theme Builder"
                  isActive={selectedNav === 'Theme Builder'}
                  onClick={() => setSelectedNav('Theme Builder')}
                />
                <SidebarItem 
                  label="Custom actions"
                  isActive={selectedNav === 'Custom actions'}
                  onClick={() => setSelectedNav('Custom actions')}
                />
                <SidebarItem 
                  label="Styles"
                  isActive={selectedNav === 'Styles'}
                  onClick={() => setSelectedNav('Styles')}
                />
                <SidebarItem 
                  label="Links settings"
                  isActive={selectedNav === 'Links settings'}
                  onClick={() => setSelectedNav('Links settings')}
                />
                <SidebarItem 
                  label="Security settings"
                  isActive={selectedNav === 'Security settings'}
                  onClick={() => setSelectedNav('Security settings')}
                />
                <SidebarItem 
                  label="Webhooks"
                  isActive={selectedNav === 'Webhooks'}
                  onClick={() => setSelectedNav('Webhooks')}
                />
              </SidebarCategory>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
