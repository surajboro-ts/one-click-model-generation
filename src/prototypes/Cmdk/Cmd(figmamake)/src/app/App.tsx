import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import svgPaths from '../imports/svg-reay659j';
import imgAvatar from "figma:asset/61cc84b8f1f365c92a666803a6efe65ea48ea1c9.png";
import { CommandPalette } from './components/CommandPalette';
import { LibrarySearchDropdown } from './components/LibrarySearchDropdown';
import { Liveboards } from './components/Liveboards';
import { LiveboardDetail } from './components/LiveboardDetail';
import { Sidebar } from './components/Sidebar';
import { SearchResultsPage } from './components/SearchResultsPage';
import { AdminContent } from './components/AdminContent';
import { Home } from './components/Home';
import { Spotter } from './components/Spotter';
import { GenericPageContent } from './components/GenericPageContent';

export default function App() {
  const [globalOption, setGlobalOption] = useState<'option1' | 'option2' | 'option3'>('option2');
  const [selectedNav, setSelectedNav] = useState('Home');
  const [activeTab, setActiveTab] = useState<'insights' | 'data' | 'develop' | 'admin'>('insights');
  const [developOrg, setDevelopOrg] = useState<'all' | 'primary'>('primary');
  const [adminPrimaryNav, setAdminPrimaryNav] = useState('Resource control centre');
  const [adminPage, setAdminPage] = useState('Resource control centre');
  const [adminScope, setAdminScope] = useState<'instance' | 'org'>('org');
  const [activeContentTab, setActiveContentTab] = useState('orgs');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandPaletteFilter, setCommandPaletteFilter] = useState<string | undefined>(undefined);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchObjectType, setSearchObjectType] = useState<string | undefined>(undefined);
  const [highlightedPage, setHighlightedPage] = useState<string | null>(null);
  const [adminSearchOpen, setAdminSearchOpen] = useState(false);
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [librarySearchOpen, setLibrarySearchOpen] = useState(false);
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [selectedLiveboardId, setSelectedLiveboardId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [spotterQuery, setSpotterQuery] = useState('');
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut for command palette (Cmd+K / Ctrl+K) - Only for option1 and option2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only enable Command K for option1 and option2
      if (globalOption === 'option3') return;
      
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        e.stopPropagation();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    // Use capture phase to catch the event before any other handlers
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [globalOption]);

  // Clear highlighted page after animation
  useEffect(() => {
    if (highlightedPage) {
      const timer = setTimeout(() => {
        setHighlightedPage(null);
      }, 2000); // Clear highlight after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [highlightedPage]);

  const sidebarProps = {
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
    setCommandPaletteOpen
  };

  return (
    <div className="bg-white relative size-full overflow-hidden flex flex-col">
      {/* Main Application Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="absolute bg-[#1d232f] border-[#323946] border-b h-[60px] left-0 right-0 top-0 z-20">
          {/* Hamburger Menu (Only in Liveboard Detail Mode) */}
          {selectedLiveboardId && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-[#dbdfe7] hover:text-white hover:bg-[#323946] p-2 rounded-md transition-colors"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Logo */}
          <button 
            onClick={() => {
              setActiveTab('insights');
              setSelectedNav('Home');
              setSelectedLiveboardId(null);
              setSearchResultsOpen(false);
              setAdminSearchOpen(false);
              setLibrarySearchOpen(false);
              setCommandPaletteOpen(false);
              setIsSidebarOpen(false);
            }}
            className={`absolute h-[24px] top-1/2 -translate-y-1/2 w-[119.792px] transition-all duration-300 ${selectedLiveboardId ? 'left-[60px]' : 'left-[24px]'} hover:opacity-80`}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119.792 24.001">
              <path d={svgPaths.p36bf9d00} fill="white" />
            </svg>
          </button>

          {/* Right Side Toolbar */}
          <div className="absolute flex gap-3 items-center right-6 top-1/2 -translate-y-1/2">
            {/* Search Bar - Click to open command palette or show dropdown for library search */}
            {globalOption === 'option3' ? (
              <div 
                ref={searchBarRef}
                className="h-8 relative w-[280px] group"
              >
                <div className={`absolute bg-[#232f43] border inset-0 rounded-full transition-colors ${
                  librarySearchOpen ? 'border-[#71a1f4]' : 'border-[#323946] group-hover:border-[#71a1f4]'
                }`} />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none">
                  <svg className="block size-full" fill="none" viewBox="0 0 17.4142 17">
                    <path clipRule="evenodd" d={svgPaths.p2b964b80} fill="#A5ACB9" fillRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={librarySearchQuery}
                  onChange={(e) => {
                    setLibrarySearchQuery(e.target.value);
                    setLibrarySearchOpen(true);
                  }}
                  onFocus={() => setLibrarySearchOpen(true)}
                  placeholder="Search library"
                  className="absolute inset-0 pl-10 pr-4 bg-transparent text-white text-sm placeholder-[#a5acb9] outline-none rounded-full"
                />
              </div>
            ) : (
              <div 
                className="h-8 relative w-[280px] cursor-pointer group"
                onClick={() => setCommandPaletteOpen(true)}
              >
                <div className="absolute bg-[#232f43] border border-[#323946] inset-0 rounded-full group-hover:border-[#71a1f4] transition-colors" />
                <div className="absolute left-10 top-1/2 -translate-y-1/2 text-[#a5acb9] text-sm pointer-events-none group-hover:text-[#dbdfe7]">
                  Search in ThoughtSpot
                </div>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4">
                  <svg className="block size-full" fill="none" viewBox="0 0 17.4142 17">
                    <path clipRule="evenodd" d={svgPaths.p2b964b80} fill="#A5ACB9" fillRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-[#1d232f] rounded text-[10px] text-[#777e8b] font-mono">⌘K</kbd>
                </div>
              </div>
            )}

            {/* Help Icon */}
            <button className="relative shrink-0 size-8 hover:opacity-80 transition-opacity">
              <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" fill="#232F43" r="16" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="block w-[8.5px] h-4" fill="none" viewBox="0 0 8.5 16">
                  <path d={svgPaths.p33c5c200} fill="#DBDFE7" />
                  <path d="M5.2 13H3.2V16H5.2V13Z" fill="#DBDFE7" />
                </svg>
              </div>
            </button>

            {/* Notification Icon with Badge */}
            <button className="relative shrink-0 size-8 hover:opacity-80 transition-opacity">
              <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" fill="#232F43" r="16" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="block w-[15.349px] h-[13.589px]" fill="none" viewBox="0 0 15.3491 13.5893">
                  <path d={svgPaths.p10054600} fill="#DBDFE7" />
                </svg>
              </div>
              <div className="absolute left-5 -top-0.5 size-3">
                <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" fill="#E22B3D" r="6" />
                </svg>
              </div>
            </button>

            {/* User Profile Dropdown */}
            <div className="flex items-center bg-[#232f43] rounded-full border-r border-[#323946]">
              <div className="flex gap-1 items-center px-2 py-1.5 rounded-l-full border-r border-[#323946]">
                <span className="text-[#dbdfe7] text-sm font-medium">Royal Enfiled</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                  <path clipRule="evenodd" d={svgPaths.p242b7bba} fill="#DBDFE7" fillRule="evenodd" />
                </svg>
              </div>
              <div className="p-0.5 rounded-r-full">
                <img alt="User Avatar" className="size-7 rounded-full" src={imgAvatar} />
              </div>
            </div>
          </div>
        </div>

        {/* Left Navigation (Persistent) */}
        {!selectedLiveboardId && (
          <Sidebar 
            className="absolute top-[60px] left-0 bottom-0 w-[261px] z-10"
            {...sidebarProps} 
          />
        )}

        {/* Overlay Sidebar (Visible only in Full Screen Mode when toggled) */}
        {selectedLiveboardId && isSidebarOpen && (
          <div className="absolute top-[60px] left-0 right-0 bottom-0 z-50 flex">
            <Sidebar 
              className="w-[261px] h-full shadow-xl bg-[#1d232f]"
              isOverlay={true}
              onClose={() => setIsSidebarOpen(false)}
              {...sidebarProps}
            />
            <div className="flex-1 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <div className={`absolute top-[60px] right-0 bottom-0 bg-[#f6f8fa] transition-all duration-300 ${selectedLiveboardId ? 'left-0' : 'left-[261px]'}`}>
          {activeTab === 'admin' ? (
            <AdminContent 
              adminPrimaryNav={adminPrimaryNav}
              adminPage={adminPage}
              adminScope={adminScope}
              activeContentTab={activeContentTab}
              setAdminPage={setAdminPage}
              setAdminPrimaryNav={setAdminPrimaryNav}
              setActiveContentTab={setActiveContentTab}
            />
          ) : (
            <>
              {activeTab === 'insights' && selectedNav === 'Liveboards' ? (
                selectedLiveboardId ? (
                  <LiveboardDetail 
                    liveboardId={selectedLiveboardId} 
                    onBack={() => setSelectedLiveboardId(null)}
                  />
                ) : (
                  <Liveboards onNavigateToDetail={(id) => setSelectedLiveboardId(id)} />
                )
              ) : activeTab === 'insights' && selectedNav === 'Home' ? (
                <Home />
              ) : activeTab === 'insights' && selectedNav === 'Spotter' ? (
                <Spotter initialQuery={spotterQuery} />
              ) : activeTab === 'data' ? (
                <GenericPageContent title={selectedNav} category="Data Workspace" />
              ) : activeTab === 'develop' ? (
                <GenericPageContent title={selectedNav} category="Develop" />
              ) : (
                <div className="p-8">
                  <h1 className="text-2xl font-medium text-[#1d232f] mb-6">
                    {activeTab === 'insights' && 'Insights'}
                  </h1>
                  <p className="text-[#777e8b]">
                    Switch to the Admin tab to see the comprehensive admin settings experience.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Search Results Page */}
        {searchResultsOpen && (
          <SearchResultsPage
            query={searchQuery}
            objectType={searchObjectType}
            onClose={() => setSearchResultsOpen(false)}
            onSearchChange={setSearchQuery}
            onNavigateToObject={(objectId: string, objectType: string) => {
              setSearchResultsOpen(false);
              console.log('Opening object:', objectId, objectType);
              if (objectType === 'Liveboard') {
                setActiveTab('insights');
                setSelectedNav('Liveboards');
                setSelectedLiveboardId(objectId);
              } else if (objectType === 'Answer' || objectType === 'Collection') {
                setActiveTab('insights');
                setSelectedLiveboardId(null);
              } else {
                setActiveTab('data');
                setSelectedLiveboardId(null);
              }
            }}
          />
        )}

        {/* Command Palette - Only for option1 and option2 */}
        {(globalOption === 'option1' || globalOption === 'option2') && (
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => {
              setCommandPaletteOpen(false);
              setCommandPaletteFilter(undefined);
            }}
            initialFilter={commandPaletteFilter}
            currentContext={{
              tab: activeTab,
              page: adminPage,
            }}
            onNavigate={(page: string, tab?: string, query?: string, appTab?: string) => {
              if (page === 'Spotter') {
                 setActiveTab('insights');
                 setSelectedNav('Spotter');
                 if (query) {
                   setSpotterQuery(query);
                   // Clear query after short delay so it doesn't persist if navigating back and forth manually
                   setTimeout(() => setSpotterQuery(''), 500); 
                 }
                 return;
              }

              if (appTab === 'data') {
                setActiveTab('data');
                setSelectedNav(page);
                return;
              }

              if (appTab === 'develop') {
                setActiveTab('develop');
                setSelectedNav(page);
                return;
              }

              // Switch to Admin tab
              setActiveTab('admin');
              setAdminPage(page);
              setAdminPrimaryNav(page);
              
              // Highlight the page in left nav - single smooth blink
              setHighlightedPage(page);
              setTimeout(() => setHighlightedPage(null), 800);
              
              if (tab) {
                setActiveContentTab(tab.toLowerCase());
              }
            }}
            onScopeChange={(scope: 'instance' | 'org') => {
              setAdminScope(scope);
            }}
            onObjectSearch={(query: string, objectType?: string) => {
              setSearchQuery(query);
              setSearchObjectType(objectType);
              setSearchResultsOpen(true);
            }}
            onOpenObject={(objectId: string, objectType: string) => {
              // Open object directly
              console.log('Opening object:', objectId, objectType);
              if (objectType === 'Liveboard') {
                setActiveTab('insights');
                setSelectedNav('Liveboards');
                setSelectedLiveboardId(objectId);
              } else if (objectType === 'Answer' || objectType === 'Collection') {
                setActiveTab('insights');
                setSelectedLiveboardId(null);
              } else {
                setActiveTab('data');
                setSelectedLiveboardId(null);
              }
            }}
            currentAdminPage={adminPage}
          />
        )}

        {/* Library Search Dropdown - Only for option3 */}
        {globalOption === 'option3' && (
          <LibrarySearchDropdown
            isOpen={librarySearchOpen}
            query={librarySearchQuery}
            onQueryChange={setLibrarySearchQuery}
            onClose={() => setLibrarySearchOpen(false)}
            onNavigateToObject={(objectId: string, objectType: string) => {
              setLibrarySearchOpen(false);
              setLibrarySearchQuery('');
              // Navigate to the object
              console.log('Opening object:', objectId, objectType);
              if (objectType === 'Liveboard') {
                setActiveTab('insights');
                setSelectedNav('Liveboards');
                setSelectedLiveboardId(objectId);
              } else if (objectType === 'Answer' || objectType === 'Collection') {
                setActiveTab('insights');
                setSelectedLiveboardId(null);
              } else {
                setActiveTab('data');
                setSelectedLiveboardId(null);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
