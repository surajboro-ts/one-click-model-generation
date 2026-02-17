import { ArrowLeft, Maximize2, MoreHorizontal, Share2, Filter, Download, RotateCw } from 'lucide-react';
import { mockLiveboards } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface LiveboardDetailProps {
  liveboardId: string;
  onBack: () => void;
}

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function LiveboardDetail({ liveboardId, onBack }: LiveboardDetailProps) {
  const liveboard = mockLiveboards.find(lb => lb.id === liveboardId);

  if (!liveboard) {
    return <div>Liveboard not found</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#f6f8fa] overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#d0d5dd] px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-[#f0f2f5] rounded-full transition-colors text-[#596170]"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-[#1d232f] flex items-center gap-2">
                {liveboard.name}
                {liveboard.favorites && liveboard.favorites > 0 ? (
                  <span className="text-[#f59e42]">★</span>
                ) : (
                  <span className="text-[#d0d5dd]">★</span>
                )}
              </h1>
              <div className="flex items-center gap-2 text-xs text-[#777e8b] mt-1">
                <span>{liveboard.author}</span>
                <span>•</span>
                <span>{liveboard.modified}</span>
                <span>•</span>
                <span>{liveboard.views} views</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-[#596170] hover:bg-[#f0f2f5] rounded text-sm font-medium transition-colors">
              <RotateCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-[#596170] hover:bg-[#f0f2f5] rounded text-sm font-medium transition-colors">
              <Download size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-[#596170] hover:bg-[#f0f2f5] rounded text-sm font-medium transition-colors">
              <Maximize2 size={16} />
              Present
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2f75e0] text-white rounded text-sm font-medium hover:bg-[#2563bf] transition-colors">
              <Share2 size={16} />
              Share
            </button>
            <button className="p-2 hover:bg-[#f0f2f5] rounded text-[#596170]">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
        
        {/* Filters Bar Placeholder */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#f0f2f5] rounded-full text-xs font-medium text-[#596170] cursor-pointer hover:bg-[#e1e4e8]">
            <Filter size={12} />
            Add filter
          </div>
          <div className="h-4 w-px bg-[#d0d5dd]" />
          <span className="text-xs text-[#777e8b]">No active filters</span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-2 gap-6 pb-20">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e6e8eb] h-[400px]">
          <h3 className="text-base font-medium text-[#1d232f] mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#777e8b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#777e8b', fontSize: 12}} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2f75e0" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e6e8eb] h-[400px]">
          <h3 className="text-base font-medium text-[#1d232f] mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3 */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm border border-[#e6e8eb] h-[400px]">
          <h3 className="text-base font-medium text-[#1d232f] mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#777e8b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#777e8b', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f6f8fa'}} />
              <Bar dataKey="value" fill="#2f75e0" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
