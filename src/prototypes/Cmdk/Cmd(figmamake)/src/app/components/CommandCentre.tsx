import { useState } from 'react';
import React from 'react';

interface CommandCentreProps {
  adminScope: 'instance' | 'org';
  onNavigate: (page: string, tab?: string) => void;
}

interface DashboardCardProps {
  title: string;
  subtitle: string;
  status: 'Healthy' | 'Warning' | 'On track';
  statusColor: 'green' | 'yellow' | 'green-track'; // Simplified for this example
  children?: React.ReactNode;
  footerActions: React.ReactNode;
}

const DashboardCard = ({ title, subtitle, status, statusColor, children, footerActions }: DashboardCardProps) => {
  let statusBg = '';
  let statusText = '';

  switch (statusColor) {
    case 'green':
    case 'green-track':
      statusBg = '#d1fae5';
      statusText = '#065f46';
      break;
    case 'yellow':
      statusBg = '#fef3c7';
      statusText = '#92400e';
      break;
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[#1d232f] mb-1">{title}</h3>
          <p className="text-xs text-[#777e8b]">{subtitle}</p>
        </div>
        <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{ backgroundColor: statusBg, color: statusText }}>
          {status}
        </span>
      </div>

      {/* Empty Content Box or Children */}
      {children || <div className="flex-grow bg-[#f9fafb] border border-[#e5e7eb] rounded-lg mb-4 min-h-[250px]"></div>}

      {/* Footer */}
      <div className="pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
        {footerActions}
      </div>
    </div>
  );
};

export function CommandCentre({ adminScope, onNavigate }: CommandCentreProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forecasting' | 'anomalies'>('dashboard');

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-8">
        {/* Alert Banner */}
        <div className="mb-6 bg-[#fef3c7] border-l-4 border-[#f59e0b] rounded p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm text-[#92400e]">3 issues need your attention</span>
          </div>
          <button className="text-xs font-medium text-[#71a1f4] hover:underline">
            Review all →
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#1d232f] mb-1">Resource control centre</h2>
          <p className="text-sm text-[#777e8b]">
            Key health, security, cost, and usage signals for this scope
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#e5e7eb] mb-8">
          <div className="flex gap-6">
            {['dashboard', 'forecasting', 'anomalies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-[#71a1f4] text-[#1d232f]'
                    : 'border-transparent text-[#777e8b] hover:text-[#1d232f] hover:border-[#d1d5db]'
                }`}
              >
                {tab === 'anomalies' ? 'Anomalies and alerts' : tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-2 gap-8">
            {/* Section 1: Instance/Org Health */}
            <DashboardCard
              title={adminScope === 'org' ? 'Instance health' : 'Primary Org health'}
              subtitle="No major incidents detected"
              status="Healthy"
              statusColor="green"
              footerActions={
                <>
                  <button 
                    onClick={() => onNavigate('Health & Performance', 'live performance')}
                    className="text-xs text-[#71a1f4] hover:underline"
                  >
                    System liveboards
                  </button>
                  <button 
                    onClick={() => onNavigate('Health & Performance', 'live performance')}
                    className="px-3 py-1.5 bg-white border border-[#d0d5dd] text-[#1d232f] text-xs font-medium rounded-full hover:bg-[#f6f8fa] transition-colors"
                  >
                    View details
                  </button>
                </>
              }
            />

            {/* Section 2: Security Score */}
            <DashboardCard
              title="Security score"
              subtitle="Good security posture"
              status="Healthy"
              statusColor="green"
              footerActions={
                <>
                  <button 
                    onClick={() => onNavigate('Authentication', 'single sign-on')}
                    className="text-xs text-[#71a1f4] hover:underline"
                  >
                    Configure MFA
                  </button>
                  <button 
                    onClick={() => onNavigate('Governance & Security', 'security overview')}
                    className="px-3 py-1.5 bg-white border border-[#d0d5dd] text-[#1d232f] text-xs font-medium rounded-full hover:bg-[#f6f8fa] transition-colors"
                  >
                    Improve security
                  </button>
                </>
              }
            />

            {/* Section 3: Cost & Performance */}
            <DashboardCard
              title="Cost & performance"
              subtitle="CPU usage trending up"
              status="Warning"
              statusColor="yellow"
              footerActions={
                <>
                  <button 
                    onClick={() => onNavigate('Core features', 'search and spot iq')}
                    className="text-xs text-[#71a1f4] hover:underline"
                  >
                    Adjust indexing
                  </button>
                  <button 
                    onClick={() => onNavigate('Resource control centre', '')}
                    className="px-3 py-1.5 bg-white border border-[#d0d5dd] text-[#1d232f] text-xs font-medium rounded-full hover:bg-[#f6f8fa] transition-colors"
                  >
                    Resource control
                  </button>
                </>
              }
            />

            {/* Section 4: Adoption & Usage */}
            <DashboardCard
              title="Adoption & usage"
              subtitle="Stable week over week"
              status="Healthy"
              statusColor="green"
              footerActions={
                <>
                  <button 
                    onClick={() => onNavigate('User adoption')}
                    className="text-xs text-[#71a1f4] hover:underline"
                  >
                    User adoption
                  </button>
                  <button 
                    onClick={() => onNavigate('User adoption')}
                    className="px-3 py-1.5 bg-white border border-[#d0d5dd] text-[#1d232f] text-xs font-medium rounded-full hover:bg-[#f6f8fa] transition-colors"
                  >
                    View details
                  </button>
                </>
              }
            />

            {/* Section 5: Data & Connections */}
            <DashboardCard
              title="Data & connections"
              subtitle="2 connections need attention"
              status="Warning"
              statusColor="yellow"
              footerActions={
                <>
                  <div className="relative">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === 'connections' ? null : 'connections')}
                      className="text-xs text-[#71a1f4] hover:underline flex items-center gap-1"
                    >
                      View more
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === 'connections' && (
                      <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#e5e7eb] rounded shadow-lg py-1 min-w-[140px] z-10">
                        <button className="w-full text-left px-3 py-1.5 text-xs text-[#1d232f] hover:bg-[#f6f8fa]">All connections</button>
                        <button className="w-full text-left px-3 py-1.5 text-xs text-[#1d232f] hover:bg-[#f6f8fa]">Webhook errors</button>
                        <button className="w-full text-left px-3 py-1.5 text-xs text-[#1d232f] hover:bg-[#f6f8fa]">Sync history</button>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => onNavigate('Connections & Integrations', 'connections')}
                    className="px-3 py-1.5 bg-white border border-[#d0d5dd] text-[#1d232f] text-xs font-medium rounded-full hover:bg-[#f6f8fa] transition-colors"
                  >
                    Fix issues
                  </button>
                </>
              }
            />

            {/* Section 6: Support & Upgrades */}
            <DashboardCard
              title="Support & upgrades"
              subtitle="Next upgrade Feb 15"
              status="On track"
              statusColor="green-track"
              footerActions={
                <>
                  <div className="relative">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === 'support' ? null : 'support')}
                      className="text-xs text-[#71a1f4] hover:underline flex items-center gap-1"
                    >
                      View more
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === 'support' && (
                      <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#e5e7eb] rounded shadow-lg py-1 min-w-[140px] z-10">
                        <button className="w-full text-left px-3 py-1.5 text-xs text-[#1d232f] hover:bg-[#f6f8fa]">Schedule upgrade</button>
                        <button className="w-full text-left px-3 py-1.5 text-xs text-[#1d232f] hover:bg-[#f6f8fa]">Release notes</button>
                        <button className="w-full text-left px-3 py-1.5 text-xs text-[#1d232f] hover:bg-[#f6f8fa]">Status page</button>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => onNavigate('Infrastructure & Support', 'support')}
                    className="px-3 py-1.5 bg-white border border-[#d0d5dd] text-[#1d232f] text-xs font-medium rounded-full hover:bg-[#f6f8fa] transition-colors"
                  >
                    View all tickets
                  </button>
                </>
              }
            />
          </div>
        )}
        {activeTab === 'forecasting' && (
          <div className="p-8">
            {/* Forecasting Content */}
            <h2 className="text-2xl font-semibold text-[#1d232f] mb-4">Forecasting</h2>
            <p className="text-sm text-[#777e8b] mb-6">Predictive analytics for resource usage and cost.</p>
            {/* Add forecasting charts or tables here */}
          </div>
        )}
        {activeTab === 'anomalies' && (
          <div className="p-8">
            {/* Anomalies and Alerts Content */}
            <h2 className="text-2xl font-semibold text-[#1d232f] mb-4">Anomalies and Alerts</h2>
            <p className="text-sm text-[#777e8b] mb-6">Identify and resolve anomalies in your system.</p>
            {/* Add anomalies and alerts tables or charts here */}
          </div>
        )}
      </div>
    </div>
  );
}
