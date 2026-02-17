import { useState, useEffect, useRef, useMemo } from 'react';
import { X, Search } from 'lucide-react';

interface AdminCommand {
  id: string;
  label: string;
  page: string;
  category?: string;
}

const ADMIN_COMMANDS: AdminCommand[] = [
  { id: 'resource-control', label: 'Resource control centre', page: 'Resource control centre' },
  { id: 'billing-stats', label: 'Billing stats', page: 'Billing stats' },
  { id: 'org-management', label: 'Org management', page: 'Org management' },
  { id: 'users', label: 'Users', page: 'User management', category: 'User management' },
  { id: 'groups', label: 'Groups', page: 'User management', category: 'User management' },
  { id: 'authentication', label: 'Authentication', page: 'User management', category: 'User management' },
  { id: 'user-adoption', label: 'User adoption', page: 'Usage insights', category: 'Usage insights' },
  { id: 'object-usage', label: 'Object usage', page: 'Usage insights', category: 'Usage insights' },
  { id: 'user-productivity', label: 'User productivity', page: 'Usage insights', category: 'Usage insights' },
  { id: 'performance-tracking', label: 'Performance tracking', page: 'Usage insights', category: 'Usage insights' },
  { id: 'general-settings', label: 'General settings', page: 'General settings', category: 'Application Settings' },
  { id: 'language', label: 'Language', page: 'General settings', category: 'General settings' },
  { id: 'timezone', label: 'Time Zone', page: 'General settings', category: 'General settings' },
  { id: 'currency', label: 'Currency', page: 'General settings', category: 'General settings' },
  { id: 'agent-settings', label: 'Agent settings', page: 'Agent settings', category: 'Application Settings' },
  { id: 'spotter', label: 'Spotter', page: 'Agent settings', category: 'Agent settings' },
  { id: 'spotter-viz', label: 'Spotter Viz', page: 'Agent settings', category: 'Agent settings' },
  { id: 'spotter-model', label: 'Spotter model', page: 'Agent settings', category: 'Agent settings' },
  { id: 'spotter-code', label: 'Spotter code', page: 'Agent settings', category: 'Agent settings' },
  { id: 'core-features', label: 'Core features', page: 'Core features', category: 'Application Settings' },
  { id: 'access-control', label: 'Access control', page: 'Security', category: 'Security' },
  { id: 'sharing-visibility', label: 'Sharing visibility', page: 'Security', category: 'Security' },
  { id: 'data-security', label: 'Data security', page: 'Security', category: 'Security' },
  { id: 'connections', label: 'Connections', page: 'Data', category: 'Data' },
  { id: 'data-models', label: 'Data models', page: 'Data', category: 'Data' },
  { id: 'tables', label: 'Tables', page: 'Data', category: 'Data' },
  { id: 'worksheets', label: 'Worksheets', page: 'Data', category: 'Data' },
  { id: 'customizations', label: 'Customizations', page: 'Customizations', category: 'Customizations' },
  { id: 'styles', label: 'Styles', page: 'Customizations', category: 'Customizations' },
  { id: 'email-templates', label: 'Email templates', page: 'Customizations', category: 'Customizations' },
  { id: 'developer-playground', label: 'Developer playground', page: 'Developer', category: 'Developer' },
  { id: 'api-keys', label: 'API keys', page: 'Developer', category: 'Developer' },
  { id: 'webhooks', label: 'Webhooks', page: 'Developer', category: 'Developer' },
  { id: 'custom-actions', label: 'Custom actions', page: 'Developer', category: 'Developer' },
];

interface AdminLocalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, highlightPage: string) => void;
}

export function AdminLocalSearch({ isOpen, onClose, onNavigate }: AdminLocalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query) {
      return ADMIN_COMMANDS.slice(0, 3); // Show top 3 when no query
    }
    
    return ADMIN_COMMANDS.filter(cmd =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Max 8 results when filtering
  }, [query]);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Trigger animation after render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMounted(true);
        });
      });
    } else {
      setIsMounted(false);
      isClosingRef.current = true;
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        setQuery(''); // Reset query on unmount
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && isMounted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMounted]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredResults.length > 0) {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        if (selected) {
          onNavigate(selected.page, selected.label);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onNavigate, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef} 
      className={`absolute left-0 right-0 top-0 z-20 transition-all duration-300 ease-out ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {/* Search Bar - Mimics global search styling */}
      <div className="px-6 py-4">
        <div className="h-8 relative bg-[#1d232f] border border-[#71a1f4] rounded-full shadow-lg transition-all duration-200">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4">
            <Search className="w-4 h-4 text-[#a5acb9]" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search admin settings..."
            className="absolute inset-0 pl-10 pr-10 bg-transparent text-white text-sm placeholder-[#a5acb9] outline-none rounded-full"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
              setQuery('');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-[#323946] rounded-full p-0.5 transition-colors duration-150"
          >
            <X className="w-3.5 h-3.5 text-[#a5acb9]" />
          </button>
        </div>
      </div>

      {/* Results Dropdown */}
      {filteredResults.length > 0 && (
        <div className={`mx-6 mb-4 bg-[#1d232f] rounded-lg shadow-xl border border-[#323946] max-h-[180px] overflow-y-auto transition-all duration-200 ease-out ${
          isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {filteredResults.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.page, item.label);
                onClose();
                setQuery('');
              }}
              className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#232f43] transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                index === selectedIndex ? 'bg-[#232f43]' : ''
              }`}
            >
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm text-white truncate">{item.label}</span>
                {item.category && (
                  <span className="text-xs text-[#777e8b] mt-0.5">{item.category}</span>
                )}
              </div>
              <span className="text-xs text-[#777e8b] ml-3 flex-shrink-0">{item.page}</span>
            </button>
          ))}
        </div>
      )}

      {filteredResults.length === 0 && query && (
        <div className={`mx-6 mb-4 bg-[#1d232f] rounded-lg shadow-xl border border-[#323946] px-4 py-6 text-center transition-all duration-200 ease-out ${
          isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <p className="text-sm text-[#777e8b]">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}