import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Settings, Filter, Search } from 'lucide-react';

export function AlertManagement() {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Management</h1>
            <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Settings size={16} />
            <span>Alert Settings</span>
          </button>
        </div>
      </div>

      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-red-500 bg-opacity-10 flex items-center justify-center mb-4">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Critical Alerts</h3>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500 mt-1">Require immediate attention</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Clock size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Alerts</h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
            <CheckCircle size={20} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Resolved Today</h3>
          <p className="text-3xl font-bold text-gray-900">28</p>
          <p className="text-sm text-gray-500 mt-1">Successfully handled</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Bell size={20} className="text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Alerts</h3>
          <p className="text-3xl font-bold text-gray-900">43</p>
          <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Priorities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Alerts</h3>
        
        <div className="space-y-4">
          {/* Critical Alert */}
          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle size={18} className="text-red-500" />
                  <h4 className="font-medium text-gray-900">System Response Time Critical</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                    Critical
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  Average response time has exceeded 5 seconds for the past 10 minutes. This may impact customer experience.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Triggered: 2:34 PM</span>
                  <span>Duration: 12 minutes</span>
                  <span>Affected: Customer Support System</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                  Investigate
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Acknowledge
                </button>
              </div>
            </div>
          </div>

          {/* High Priority Alert */}
          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={18} className="text-yellow-500" />
                  <h4 className="font-medium text-gray-900">High Call Volume Detected</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                    High
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  Incoming call volume is 150% above normal levels. Consider activating overflow protocols.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Triggered: 2:28 PM</span>
                  <span>Duration: 18 minutes</span>
                  <span>Affected: All Call Centers</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700">
                  Review
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Acknowledge
                </button>
              </div>
            </div>
          </div>

          {/* Medium Priority Alert */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Bell size={18} className="text-blue-500" />
                  <h4 className="font-medium text-gray-900">Agent Performance Below Target</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    Medium
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  Agent Vikram Singh's performance metrics are below target for customer satisfaction (4.2/5.0).
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Triggered: 1:45 PM</span>
                  <span>Duration: 1 hour</span>
                  <span>Affected: Agent VS-001</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Coach
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Acknowledge
                </button>
              </div>
            </div>
          </div>

          {/* Resolved Alert */}
          <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg opacity-75">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle size={18} className="text-emerald-500" />
                  <h4 className="font-medium text-gray-900">Database Connection Restored</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                    Resolved
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  Database connection issues have been resolved. All systems are now operating normally.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Resolved: 1:15 PM</span>
                  <span>Duration: 8 minutes</span>
                  <span>Resolved by: System Admin</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}