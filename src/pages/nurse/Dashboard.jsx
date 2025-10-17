import React from 'react';

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="pl-12 lg:pl-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nurse Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Nursing Care Panel</p>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">👩‍⚕️</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Nurse Dashboard - Coming Soon</h2>
            <p className="text-gray-500">This panel is under development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

