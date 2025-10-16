import React from 'react';

const NursePanel = () => {
  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nurse Panel</h1>
          <p className="text-gray-600 mt-1">Welcome, Dr. Thompson - Nursing Care</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nursing Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
            <h3 className="text-lg font-semibold text-pink-900 mb-2">Patient Calls</h3>
            <div className="text-3xl font-bold text-pink-600">18</div>
            <div className="text-sm text-pink-700">Today</div>
          </div>
          
          <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
            <h3 className="text-lg font-semibold text-cyan-900 mb-2">Appointments</h3>
            <div className="text-3xl font-bold text-cyan-600">12</div>
            <div className="text-sm text-cyan-700">Scheduled today</div>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Vitals Checked</h3>
            <div className="text-3xl font-bold text-amber-600">9</div>
            <div className="text-sm text-amber-700">This morning</div>
          </div>
        </div>

        {/* Patient Care Tasks */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Tasks</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                AF
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Ava Foster - Post-op Care</div>
                <div className="text-sm text-gray-600">Wound dressing change completed</div>
              </div>
              <div className="text-sm text-gray-500">30 min ago</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                LG
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Liam Green - Medication Review</div>
                <div className="text-sm text-gray-600">Pain management assessment</div>
              </div>
              <div className="text-sm text-gray-500">1 hour ago</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nursing Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-pink-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Check vitals for Ava Foster</div>
                <div className="text-xs text-gray-500">Due: Today</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-pink-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Medication review for Liam Green</div>
                <div className="text-xs text-gray-500">Due: Tomorrow</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-pink-600 mt-1">✓</span>
              <div className="flex-1">
                <div className="text-sm text-gray-900">Patient education session</div>
                <div className="text-xs text-gray-500">Due: 2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursePanel;
