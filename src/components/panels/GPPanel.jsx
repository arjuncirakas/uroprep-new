import React from 'react';

const GPPanel = () => {
  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GP Panel</h1>
          <p className="text-gray-600 mt-1">Welcome, Dr. Thompson - General Practitioner</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">GP Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Referrals Sent</h3>
            <div className="text-3xl font-bold text-orange-600">12</div>
            <div className="text-sm text-orange-700">This month</div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <h3 className="text-lg font-semibold text-teal-900 mb-2">Follow-ups Due</h3>
            <div className="text-3xl font-bold text-teal-600">7</div>
            <div className="text-sm text-teal-700">Next week</div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Lab Results</h3>
            <div className="text-3xl font-bold text-indigo-600">15</div>
            <div className="text-sm text-indigo-700">Pending review</div>
          </div>
        </div>

        {/* Patient Referrals */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Referrals</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                MC
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Michael Chen - PSA Elevated</div>
                <div className="text-sm text-gray-600">Referred for urology consultation</div>
              </div>
              <div className="text-sm text-gray-500">1 day ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                SW
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Sarah Wilson - Hematuria</div>
                <div className="text-sm text-gray-600">Urgent referral sent</div>
              </div>
              <div className="text-sm text-gray-500">2 days ago</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">GP Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Review lab results for Michael Chen</div>
                <div className="text-xs text-gray-500">Due: Today</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Follow up with Sarah Wilson</div>
                <div className="text-xs text-gray-500">Due: Tomorrow</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Update patient records</div>
                <div className="text-xs text-gray-500">Due: 2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPPanel;
