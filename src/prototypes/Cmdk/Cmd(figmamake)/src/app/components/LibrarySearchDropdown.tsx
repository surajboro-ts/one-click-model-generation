import { useState, useEffect, useRef, useMemo } from 'react';
import { BarChart2, Layout, Folder } from 'lucide-react';
import { allMockObjects } from '../data/mockData';

interface LibrarySearchDropdownProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onNavigateToObject?: (objectId: string, objectType: string) => void;
  anchorRef: React.RefObject<HTMLElement>;
}

export function LibrarySearchDropdown({ 
  isOpen, 
  query, 
  onQueryChange,
  onClose, 
  onNavigateToObject,
  anchorRef
}: LibrarySearchDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter library objects (Liveboards, Answers, Collections)
  const libraryObjects = useMemo(() => {
    return allMockObjects.filter(obj => 
      obj.type === 'Liveboard' || obj.type === 'Answer' || obj.type === 'Collection'
    );
  }, []);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query) {
      return libraryObjects.slice(0, 3); // Show top 3 when no query
    }
    
    return libraryObjects.filter(obj =>
      obj.name.toLowerCase().includes(query.toLowerCase()) ||
      obj.author.toLowerCase().includes(query.toLowerCase()) ||
      obj.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 8); // Max 8 results when filtering
  }, [query, libraryObjects]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    // Delay to avoid immediate close on open click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

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
        onNavigateToObject?.(selected.id, selected.type);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onNavigateToObject, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Liveboard':
        return Layout;
      case 'Answer':
        return BarChart2;
      case 'Collection':
        return Folder;
      default:
        return Layout;
    }
  };

  if (!isOpen || !anchorRef.current) return null;

  // Calculate position
  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div
      ref={dropdownRef}
      className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 z-[100] w-[400px] max-h-[300px] overflow-hidden"
      style={{
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
      }}
    >
      {/* Results List */}
      {filteredResults.length > 0 && (
        <div className="max-h-[300px] overflow-y-auto">
          {filteredResults.map((item, index) => {
            const Icon = getIcon(item.type);
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateToObject?.(item.id, item.type);
                  onClose();
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  index === selectedIndex ? 'bg-gray-50' : ''
                }`}
              >
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 truncate font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.author}</div>
                </div>
                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded flex-shrink-0">
                  {item.type}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {filteredResults.length === 0 && query && (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-gray-500">No results found</p>
          <p className="text-xs text-gray-400 mt-2">Try searching for liveboards, answers, or collections</p>
        </div>
      )}

      {!query && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Search through your library
          </p>
        </div>
      )}
    </div>
  );
}
