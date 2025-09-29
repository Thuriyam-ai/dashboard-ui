import React from 'react';
import { Megaphone, Play, Pause, BarChart3, Users, Calendar, TrendingUp, Plus, Settings } from 'lucide-react';

export function CampaignManagement() {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h1>
            <p className="text-gray-600">Create and manage marketing campaigns</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Megaphone size={20} className="text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Campaigns</h3>
          <p className="text-3xl font-bold text-gray-900">6</p>
          <p className="text-sm text-gray-500 mt-1">2 launching this week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Users size={20} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Reach</h3>
          <p className="text-3xl font-bold text-gray-900">24.7K</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-purple-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900">3.2%</p>
          <p className="text-sm text-gray-500 mt-1">+0.5% improvement</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
            <BarChart3 size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">ROI</h3>
          <p className="text-3xl font-bold text-gray-900">285%</p>
          <p className="text-sm text-gray-500 mt-1">Average across campaigns</p>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
          <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-gray-800 p-2">
              <Settings size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Campaign 1 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">Holiday Sales Campaign</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
                <p className="text-gray-600 mb-3">Promote holiday discounts and special offers to drive Q4 sales</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Nov 15 - Dec 31</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>8.2K reached</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} />
                    <span>4.1% conversion</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <Pause size={16} />
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-800">
                  <BarChart3 size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">8.2K</p>
                <p className="text-sm text-gray-500">Impressions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">336</p>
                <p className="text-sm text-gray-500">Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">14</p>
                <p className="text-sm text-gray-500">Conversions</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Progress: 68%</span>
              <span>46 days remaining</span>
            </div>
          </div>

          {/* Campaign 2 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">Product Launch - AI Assistant</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    Scheduled
                  </span>
                </div>
                <p className="text-gray-600 mb-3">Launch campaign for new AI-powered customer service assistant</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Dec 1 - Jan 15</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>Target: 15K</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} />
                    <span>Goal: 3.5%</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-emerald-600 hover:text-emerald-800">
                  <Play size={16} />
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-800">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-400">-</p>
                <p className="text-sm text-gray-500">Impressions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-400">-</p>
                <p className="text-sm text-gray-500">Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-400">-</p>
                <p className="text-sm text-gray-500">Conversions</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Starts in 8 days</span>
              <span>45 days duration</span>
            </div>
          </div>

          {/* Campaign 3 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">Customer Retention Program</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
                <p className="text-gray-600 mb-3">Re-engage inactive customers with personalized offers</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Oct 1 - Dec 31</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>5.8K reached</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} />
                    <span>2.8% conversion</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <Pause size={16} />
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-800">
                  <BarChart3 size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">5.8K</p>
                <p className="text-sm text-gray-500">Impressions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">174</p>
                <p className="text-sm text-gray-500">Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">16</p>
                <p className="text-sm text-gray-500">Conversions</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Progress: 82%</span>
              <span>38 days remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}