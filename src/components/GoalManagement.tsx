import React from 'react';
import { Target, TrendingUp, Calendar, Users, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export function GoalManagement() {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Management</h1>
            <p className="text-gray-600">Set and track team performance goals</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {/* Goal Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Target size={20} className="text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Goals</h3>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-500 mt-1">6 on track, 2 behind</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
            <CheckCircle size={20} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Completed Goals</h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500 mt-1">This quarter</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-purple-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Team Performance</h3>
          <p className="text-3xl font-bold text-gray-900">87%</p>
          <p className="text-sm text-gray-500 mt-1">Average goal completion</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-10 flex items-center justify-center mb-4">
            <Calendar size={20} className="text-yellow-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Due This Week</h3>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500 mt-1">Goals requiring attention</p>
        </div>
      </div>

      {/* Current Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Goals</h3>
        
        <div className="space-y-6">
          {/* Goal 1 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Increase Customer Satisfaction Score</h4>
                <p className="text-gray-600 mb-3">Target: Achieve 4.8/5 average rating by end of quarter</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Due: Dec 31, 2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>Team: Customer Support</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
                On Track
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">4.6/4.8 (96%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated: 2 hours ago
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>

          {/* Goal 2 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Reduce Average Response Time</h4>
                <p className="text-gray-600 mb-3">Target: Achieve sub-2 minute average response time</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Due: Nov 30, 2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>Team: All Agents</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">
                Behind
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">2.3min/2.0min (85%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated: 1 hour ago
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>

          {/* Goal 3 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Increase First Call Resolution Rate</h4>
                <p className="text-gray-600 mb-3">Target: Achieve 90% first call resolution rate</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Due: Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>Team: Technical Support</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
                On Track
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">87%/90% (97%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '97%' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated: 30 minutes ago
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Goal Performance Trends</h3>
        <div className="h-64 flex items-end space-x-2">
          {[75, 82, 78, 85, 88, 87, 89].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 bg-opacity-60 rounded-t-sm transition-all duration-500"
                style={{ height: `${value}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">
                {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'][index]}
              </span>
              <span className="text-xs text-gray-400">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}