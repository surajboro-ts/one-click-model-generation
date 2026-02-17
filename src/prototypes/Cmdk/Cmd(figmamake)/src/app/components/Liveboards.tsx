import { useState } from 'react';
import { Search, Star, MoreHorizontal, Share2, Plus, Tag } from 'lucide-react';
import { mockLiveboards, ThoughtSpotObject } from '../data/mockData';

interface LiveboardsProps {
  onNavigateToDetail: (liveboardId: string) => void;
}

export function Liveboards({ onNavigateToDetail }: LiveboardsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'yours'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Filter liveboards based on tab and search
  const filteredLiveboards = mockLiveboards.filter(lb => {
    const matchesSearch = lb.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lb.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'yours') {
      // For demo purposes, let's assume "System User" is the current user or just filter some
      return matchesSearch && (lb.author === 'System User' || lb.favorites > 0);
    }
    
    return matchesSearch;
  });

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  const toggleAllSelection = () => {
    if (selectedItems.size === filteredLiveboards.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredLiveboards.map(lb => lb.id)));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Section */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-6 mb-6">
          <h1 className="text-2xl font-semibold text-[#1d232f]">Liveboards</h1>
          <div className="flex gap-6 relative top-[2px]">
            <button 
              onClick={() => setActiveTab('all')}
              className={`pb-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'all' 
                  ? 'text-[#1d232f] border-[#2f75e0]' 
                  : 'text-[#777e8b] border-transparent hover:text-[#1d232f]'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('yours')}
              className={`pb-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'yours' 
                  ? 'text-[#1d232f] border-[#2f75e0]' 
                  : 'text-[#777e8b] border-transparent hover:text-[#1d232f]'
              }`}
            >
              Yours
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[300px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a5acb9]">
              <Search size={16} />
            </div>
            <input 
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d0d5dd] rounded hover:border-[#a5acb9] focus:border-[#2f75e0] focus:outline-none transition-colors text-sm"
            />
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f6f8fa] border border-[#d0d5dd] rounded text-[#1d232f] text-sm font-medium hover:bg-[#ebf0f5] transition-colors">
              <Plus size={16} />
              Create Liveboard
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f6f8fa] border border-[#d0d5dd] rounded text-[#1d232f] text-sm font-medium hover:bg-[#ebf0f5] transition-colors">
              Manage tags
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 pb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e6e8eb]">
              <th className="w-10 py-3 pl-2 pr-2 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-[#2f75e0] focus:ring-[#2f75e0]"
                  checked={selectedItems.size === filteredLiveboards.length && filteredLiveboards.length > 0}
                  onChange={toggleAllSelection}
                />
              </th>
              <th className="w-8 py-3 px-2 text-left"></th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#777e8b] uppercase tracking-wider">Name</th>
              <th className="w-8 py-3 px-2 text-left"></th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#777e8b] uppercase tracking-wider">Tags</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#777e8b] uppercase tracking-wider">Author</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#777e8b] uppercase tracking-wider">Views</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#777e8b] uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#1d232f]">
                  Last viewed by you
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </div>
              </th>
              <th className="py-3 px-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filteredLiveboards.map((lb) => (
              <tr key={lb.id} className="group border-b border-[#f0f2f5] hover:bg-[#f8fafc] transition-colors">
                <td className="py-3 pl-2 pr-2">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-[#2f75e0] focus:ring-[#2f75e0]"
                    checked={selectedItems.has(lb.id)}
                    onChange={() => toggleSelection(lb.id)}
                  />
                </td>
                <td className="py-3 px-2 text-[#a5acb9]">
                  {/* Checkmark icon placeholder as seen in screenshot first row */}
                  {selectedItems.has(lb.id) && (
                    <div className="w-5 h-5 bg-[#e1e4e8] rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#596170]">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => onNavigateToDetail(lb.id)}
                    className="text-[#2f75e0] text-sm font-medium hover:underline text-left"
                  >
                    {lb.name}
                  </button>
                </td>
                <td className="py-3 px-2">
                  <button className={`hover:scale-110 transition-transform ${lb.favorites && lb.favorites > 0 ? 'text-[#f59e42]' : 'text-[#d0d5dd] hover:text-[#f59e42]'}`}>
                    <Star size={16} fill={lb.favorites && lb.favorites > 0 ? "currentColor" : "none"} />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {lb.tags.length > 0 ? (
                      lb.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#f0f2f5] text-[#596170] rounded text-xs">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#a5acb9]"></span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {lb.authorAvatar ? (
                      <img src={lb.authorAvatar} alt={lb.author} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#7d56c2] flex items-center justify-center text-white text-xs font-medium">
                        {lb.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-[#1d232f]">{lb.author}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[#1d232f]">{lb.views}</td>
                <td className="py-3 px-4 text-sm text-[#1d232f]">{lb.modified}</td>
                <td className="py-3 px-4 text-right">
                  <button className="text-[#2f75e0] text-sm font-medium hover:underline">
                    Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
