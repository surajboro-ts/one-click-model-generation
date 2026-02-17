import { useState, useMemo } from 'react';
import { X, ChevronDown, BarChart2, Layout, Folder, Database, Table as TableIcon, Link, Search } from 'lucide-react';
import exampleImage from 'figma:asset/00159964450380d255e9ec40e26cdcf48abee413.png';
import { allMockObjects, objectTypeMetadata } from '../data/mockData';

interface SearchResultsPageProps {
  query: string;
  objectType?: string;
  onClose: () => void;
  onNavigateToObject?: (objectId: string, objectType: string) => void;
  onSearchChange?: (newQuery: string) => void;
}

type ObjectType = 'Liveboard' | 'Answer' | 'Collection' | 'Data Model' | 'Table' | 'Connection';

export function SearchResultsPage({ query, objectType, onClose, onNavigateToObject, onSearchChange }: SearchResultsPageProps) {
  const [sortBy, setSortBy] = useState('Best match');
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  // Filter objects based on objectType prop
  const baseObjects = useMemo(() => {
    if (!objectType) return allMockObjects;
    
    const typeMap: Record<string, ObjectType> = {
      'liveboard': 'Liveboard',
      'answer': 'Answer',
      'collection': 'Collection',
      'datamodel': 'Data Model',
      'table': 'Table',
      'connection': 'Connection',
    };
    
    const targetType = typeMap[objectType];
    return targetType ? allMockObjects.filter(obj => obj.type === targetType) : allMockObjects;
  }, [objectType]);

  // Apply filters
  const filteredResults = useMemo(() => {
    return baseObjects.filter(obj => {
      // Search query filter
      const matchesQuery = obj.name.toLowerCase().includes(query.toLowerCase()) ||
                          obj.author.toLowerCase().includes(query.toLowerCase()) ||
                          obj.description?.toLowerCase().includes(query.toLowerCase()) ||
                          obj.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      if (!matchesQuery) return false;

      // Object type filter
      if (selectedObjectTypes.length > 0 && !selectedObjectTypes.includes(obj.type)) return false;

      // Tag filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => obj.tags.includes(tag))) return false;

      // Author filter
      if (selectedAuthors.length > 0 && !selectedAuthors.includes(obj.author)) return false;

      return true;
    });
  }, [baseObjects, query, selectedObjectTypes, selectedTags, selectedAuthors]);

  // Get counts for filters
  const objectTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    baseObjects.forEach(obj => {
      counts[obj.type] = (counts[obj.type] || 0) + 1;
    });
    return counts;
  }, [baseObjects]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    baseObjects.forEach(obj => {
      obj.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [baseObjects]);

  const authorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    baseObjects.forEach(obj => {
      counts[obj.author] = (counts[obj.author] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [baseObjects]);

  // Toggle functions
  const toggleObjectType = (type: string) => {
    setSelectedObjectTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev =>
      prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author]
    );
  };

  // Get icon for object type
  const getObjectIcon = (type: ObjectType) => {
    const icons: Record<string, any> = {
      'Liveboard': Layout,
      'Answer': BarChart2,
      'Collection': Folder,
      'Data Model': Database,
      'Table': TableIcon,
      'Connection': Link
    };
    return icons[type];
  };

  return (
    <div className="absolute inset-0 top-[60px] z-20 bg-white flex">
      {/* Left Sidebar - Filters */}
      <div className="w-56 bg-white border-r border-[#e5e7eb] overflow-y-auto">
        <div className="p-4">
          {/* Object Type Filter */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-[#6b7280] mb-3">Object type</h4>
            <div className="space-y-2">
              {Object.entries(objectTypeCounts).map(([type, count]) => (
                <label key={type} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedObjectTypes.includes(type)}
                      onChange={() => toggleObjectType(type)}
                      className="w-3.5 h-3.5 rounded border-gray-300 bg-white checked:bg-[#71a1f4] checked:border-[#71a1f4] focus:ring-2 focus:ring-[#71a1f4] focus:ring-offset-0 cursor-pointer"
                      style={{ accentColor: '#71a1f4' }}
                    />
                    <span className="text-sm text-[#374151] group-hover:text-[#1d232f]">{type}s</span>
                  </div>
                  <span className="text-xs text-[#9ca3af]">{count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-[#6b7280] mb-3">Tag</h4>
            <div className="space-y-2">
              {tagCounts.map(([tag, count]) => (
                <label key={tag} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="w-3.5 h-3.5 rounded border-gray-300 bg-white checked:bg-[#71a1f4] checked:border-[#71a1f4] focus:ring-2 focus:ring-[#71a1f4] focus:ring-offset-0 cursor-pointer"
                      style={{ accentColor: '#71a1f4' }}
                    />
                    <span className="text-sm text-[#374151] group-hover:text-[#1d232f] truncate">{tag}</span>
                  </div>
                  <span className="text-xs text-[#9ca3af] ml-2">{count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Author Filter */}
          <div>
            <h4 className="text-xs font-semibold text-[#6b7280] mb-3">Author</h4>
            <div className="space-y-2">
              {authorCounts.slice(0, 6).map(([author, count]) => (
                <label key={author} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedAuthors.includes(author)}
                      onChange={() => toggleAuthor(author)}
                      className="w-3.5 h-3.5 rounded border-gray-300 bg-white checked:bg-[#71a1f4] checked:border-[#71a1f4] focus:ring-2 focus:ring-[#71a1f4] focus:ring-offset-0 cursor-pointer"
                      style={{ accentColor: '#71a1f4' }}
                    />
                    <span className="text-sm text-[#374151] group-hover:text-[#1d232f] truncate">{author}</span>
                  </div>
                  <span className="text-xs text-[#9ca3af] ml-2">{count}</span>
                </label>
              ))}
              {authorCounts.length > 6 && (
                <button className="text-sm text-[#71a1f4] hover:text-[#5a8ad9] font-medium">
                  Show more
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header with Search Bar */}
        <div className="border-b border-[#e5e7eb] px-6 py-4 bg-white">
          <div className="flex items-center gap-4 mb-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
              <input
                type="text"
                value={query}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search in ThoughtSpot"
                className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg text-sm text-[#1d232f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#71a1f4] focus:border-transparent"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-[#6b7280]" />
            </button>
          </div>
          <div>
            <p className="text-sm text-[#6b7280]">
              Showing results for '<span className="font-semibold">{query}</span>'
            </p>
          </div>
        </div>

        {/* Subheader */}
        <div className="border-b border-[#e5e7eb] px-6 py-2 flex items-center justify-between bg-white">
          <p className="text-sm text-[#6b7280]">
            Found {filteredResults.length} results
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6b7280]">Sort by:</span>
            <button
              className="flex items-center gap-1 px-3 py-1 text-sm text-[#374151] hover:bg-gray-50 rounded transition-colors"
            >
              {sortBy}
              <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto">
          {filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <p className="text-[#6b7280] text-lg mb-2">No results found</p>
              <p className="text-[#9ca3af] text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-[#e5e7eb]">
              {filteredResults.map((obj) => {
                const Icon = getObjectIcon(obj.type);
                const metadata = objectTypeMetadata[obj.type];
                
                return (
                  <div
                    key={obj.id}
                    onClick={() => onNavigateToObject?.(obj.id, obj.type)}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {/* Title with icon */}
                    <div className="flex items-start gap-2 mb-2">
                      <Icon className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: metadata.color }} />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base text-[#2563eb] font-normal hover:underline mb-1">
                          {obj.name}
                        </h3>
                        
                        {/* Metadata line */}
                        <div className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
                          <span>Created {obj.modified} by <span className="text-[#2563eb] hover:underline cursor-pointer">{obj.author}</span></span>
                        </div>

                        {/* Views */}
                        <div className="text-sm text-[#6b7280] mb-3">
                          {obj.views !== undefined && `${obj.views} views`}
                        </div>

                        {/* Description or metadata */}
                        {obj.description && (
                          <p className="text-sm text-[#6b7280] mb-2">{obj.description}</p>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {obj.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#e0f2fe] text-[#0369a1] text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Type-specific info */}
                        {obj.type === 'Table' && obj.rowCount && (
                          <div className="mt-2 text-xs text-[#6b7280]">
                            {obj.rowCount.toLocaleString()} rows
                          </div>
                        )}
                        {obj.type === 'Connection' && obj.connectionType && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-[#6b7280]">{obj.connectionType}</span>
                            {obj.status && (
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                obj.status === 'Active' 
                                  ? 'bg-green-50 text-green-700'
                                  : obj.status === 'Error'
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-gray-50 text-gray-700'
                              }`}>
                                {obj.status}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Admin Links */}
        <div className="border-t border-[#e5e7eb] px-6 py-3 bg-[#f9fafb] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6 text-sm">
            <span className="font-semibold text-[#1d232f]">Admin Settings:</span>
            <button className="text-[#6b7280] hover:text-[#2563eb] hover:underline transition-colors">
              User Management
            </button>
            <button className="text-[#6b7280] hover:text-[#2563eb] hover:underline transition-colors">
              Application Settings
            </button>
            <button className="text-[#6b7280] hover:text-[#2563eb] hover:underline transition-colors">
              Data Management
            </button>
          </div>
          <div className="text-xs text-[#9ca3af]">
            Press <kbd className="font-mono bg-white border border-gray-300 rounded px-1">Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}