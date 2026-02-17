import { useState } from 'react';

interface BillingStatsProps {
  adminScope: 'instance' | 'org';
}

export function BillingStats({ adminScope }: BillingStatsProps) {
  const [activeTab, setActiveTab] = useState<'billing-query-stats' | 'subscriptions'>('billing-query-stats');

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-8">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#1d232f] mb-1">Billing stats</h2>
          <p className="text-sm text-[#777e8b]">
            Monitor billing, query usage, and subscription details
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#e5e7eb] mb-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('billing-query-stats')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'billing-query-stats'
                  ? 'border-[#71a1f4] text-[#1d232f]'
                  : 'border-transparent text-[#777e8b] hover:text-[#1d232f] hover:border-[#d1d5db]'
              }`}
            >
              Billing query stats
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'subscriptions'
                  ? 'border-[#71a1f4] text-[#1d232f]'
                  : 'border-transparent text-[#777e8b] hover:text-[#1d232f] hover:border-[#d1d5db]'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'billing-query-stats' && (
          <div>
            {/* Query Stats Overview */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Stat Card 1 */}
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
                <div className="text-xs text-[#777e8b] mb-1">Total queries this month</div>
                <div className="text-2xl font-semibold text-[#1d232f] mb-1">1,247,583</div>
                <div className="flex items-center gap-1 text-xs text-[#10b981]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>12.5% vs last month</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
                <div className="text-xs text-[#777e8b] mb-1">Average query cost</div>
                <div className="text-2xl font-semibold text-[#1d232f] mb-1">$0.0042</div>
                <div className="flex items-center gap-1 text-xs text-[#ef4444]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span>3.2% vs last month</span>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
                <div className="text-xs text-[#777e8b] mb-1">Total cost this month</div>
                <div className="text-2xl font-semibold text-[#1d232f] mb-1">$5,239.85</div>
                <div className="flex items-center gap-1 text-xs text-[#10b981]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>8.7% vs last month</span>
                </div>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#1d232f] mb-4">Query volume over time</h3>
              <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg h-[300px] flex items-center justify-center">
                <span className="text-sm text-[#777e8b]">Chart visualization</span>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e5e7eb]">
                <h3 className="font-semibold text-[#1d232f]">Top queries by cost</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Query ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Execution time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#e5e7eb]">
                    <tr>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">QRY-8472</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">sarah.johnson@company.com</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">2.3s</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1d232f]">$12.45</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">QRY-8471</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">mike.chen@company.com</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">1.8s</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1d232f]">$9.87</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">QRY-8470</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">amy.rodriguez@company.com</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">3.1s</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1d232f]">$8.92</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div>
            {/* Current Plan */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#1d232f] mb-1">Current plan</h3>
                  <p className="text-sm text-[#777e8b]">Enterprise subscription</p>
                </div>
                <span className="px-3 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-medium rounded-full">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-6 py-4 border-t border-[#e5e7eb]">
                <div>
                  <div className="text-xs text-[#777e8b] mb-1">Monthly cost</div>
                  <div className="text-lg font-semibold text-[#1d232f]">$4,999/mo</div>
                </div>
                <div>
                  <div className="text-xs text-[#777e8b] mb-1">Billing cycle</div>
                  <div className="text-lg font-semibold text-[#1d232f]">Annual</div>
                </div>
                <div>
                  <div className="text-xs text-[#777e8b] mb-1">Renewal date</div>
                  <div className="text-lg font-semibold text-[#1d232f]">Dec 15, 2026</div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#e5e7eb] flex gap-3">
                <button className="px-4 py-2 bg-[#71a1f4] text-white text-sm font-medium rounded hover:bg-[#5a8ce0] transition-colors">
                  Upgrade plan
                </button>
                <button className="px-4 py-2 bg-white border border-[#d0d5dd] text-[#1d232f] text-sm font-medium rounded hover:bg-[#f6f8fa] transition-colors">
                  View details
                </button>
              </div>
            </div>

            {/* Usage Limits */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#1d232f] mb-4">Usage limits</h3>
              
              {/* Users */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#1d232f]">Users</span>
                  <span className="text-sm text-[#777e8b]">847 / 1000</span>
                </div>
                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                  <div className="bg-[#71a1f4] h-2 rounded-full" style={{ width: '84.7%' }}></div>
                </div>
              </div>

              {/* Storage */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#1d232f]">Storage</span>
                  <span className="text-sm text-[#777e8b]">2.3 TB / 5 TB</span>
                </div>
                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                  <div className="bg-[#10b981] h-2 rounded-full" style={{ width: '46%' }}></div>
                </div>
              </div>

              {/* API calls */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#1d232f]">API calls (monthly)</span>
                  <span className="text-sm text-[#777e8b]">4.2M / 5M</span>
                </div>
                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                  <div className="bg-[#f59e0b] h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e5e7eb]">
                <h3 className="font-semibold text-[#1d232f]">Billing history</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#777e8b] uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#e5e7eb]">
                    <tr>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">INV-2026-001</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">Jan 1, 2026</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1d232f]">$4,999.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-medium rounded-full">Paid</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-[#71a1f4] hover:underline">Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">INV-2025-012</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">Dec 1, 2025</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1d232f]">$4,999.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-medium rounded-full">Paid</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-[#71a1f4] hover:underline">Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">INV-2025-011</td>
                      <td className="px-6 py-4 text-sm text-[#1d232f]">Nov 1, 2025</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1d232f]">$4,999.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-medium rounded-full">Paid</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-[#71a1f4] hover:underline">Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
