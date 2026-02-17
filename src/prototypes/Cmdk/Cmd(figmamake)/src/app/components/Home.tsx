import React from 'react';
import { mockLiveboards, mockAnswers } from '../data/mockData';
import { Layout, BarChart2, Plus, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-[#1d232f]">Home</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#dbdfe7] rounded-md text-[#1d232f] text-sm hover:bg-gray-50 transition-colors">
            Customize
          </button>
        </div>
      </div>
      
      {/* Watchlist Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#1d232f]">Watchlist</h2>
          <button className="text-[#71a1f4] text-sm font-medium hover:underline">Manage</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockLiveboards.slice(0, 4).map(board => (
            <div key={board.id} className="bg-white p-4 rounded-lg border border-[#eaedf2] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded text-[#71a1f4]">
                  <Layout size={18} />
                </div>
                {board.favorites && board.favorites > 0 && (
                   <span className="text-xs text-gray-400">★ {board.favorites}</span>
                )}
              </div>
              <h3 className="text-sm font-medium text-[#1d232f] mb-1 line-clamp-1">{board.name}</h3>
              <p className="text-xs text-[#777e8b] mb-3">Modified {board.modified}</p>
              
              <div className="h-24 bg-gray-50 rounded flex items-center justify-center">
                 <div className="w-16 h-16 opacity-20">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                       <rect x="2" y="10" width="4" height="10" />
                       <rect x="8" y="14" width="4" height="6" />
                       <rect x="14" y="6" width="4" height="14" />
                    </svg>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Section */}
      <div>
         <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#1d232f]">Recently Viewed</h2>
          <button className="text-[#71a1f4] text-sm font-medium hover:underline">View all</button>
        </div>
        
        <div className="bg-white rounded-lg border border-[#eaedf2] shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#eaedf2]">
                 <tr>
                    <th className="px-6 py-3 text-xs font-medium text-[#777e8b] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-[#777e8b] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-xs font-medium text-[#777e8b] uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-xs font-medium text-[#777e8b] uppercase tracking-wider">Last Viewed</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#eaedf2]">
                 {[...mockLiveboards.slice(4, 7), ...mockAnswers.slice(0, 3)].map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                       <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                             {item.type === 'Liveboard' ? <Layout size={16} className="text-[#71a1f4]" /> : <BarChart2 size={16} className="text-[#9b6dd6]" />}
                             <span className="text-sm font-medium text-[#1d232f]">{item.name}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#777e8b]">{item.type}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#777e8b]">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600">
                                {item.author.charAt(0)}
                             </div>
                             {item.author}
                          </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#777e8b]">{item.modified}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
