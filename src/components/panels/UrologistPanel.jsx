import React from 'react';

const UrologistPanel = () => {
  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Urologist Panel</h1>
          <p className="text-gray-600 mt-1">Welcome, Dr. Thompson - Urology Specialist</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Urology Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Active Cases</h3>
            <div className="text-3xl font-bold text-blue-600">24</div>
            <div className="text-sm text-blue-700">+3 this week</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Surgeries Scheduled</h3>
            <div className="text-3xl font-bold text-green-600">8</div>
            <div className="text-sm text-green-700">Next 2 weeks</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">MDT Discussions</h3>
            <div className="text-3xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-700">This month</div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                EC
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Ethan Carter - Biopsy Results</div>
                <div className="text-sm text-gray-600">Reviewed pathology report - Benign</div>
              </div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                OB
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Olivia Bennett - Follow-up</div>
                <div className="text-sm text-gray-600">Scheduled surveillance appointment</div>
              </div>
              <div className="text-sm text-gray-500">4 hours ago</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Urology Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Review biopsy results for Ethan Carter</div>
                <div className="text-xs text-gray-500">Due: Today</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Schedule surgery for Noah Davis</div>
                <div className="text-xs text-gray-500">Due: Tomorrow</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Prepare MDT presentation</div>
                <div className="text-xs text-gray-500">Due: 2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrologistPanel;
