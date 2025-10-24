import React, { useState } from 'react';
import NurseHeader from '../../components/layout/NurseHeader';

const Surgery = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <NurseHeader 
          title="Surgery"
          subtitle="Manage surgical procedures and schedules"
          onSearch={setSearchQuery}
          searchPlaceholder="Search surgeries by patient name or procedure type"
        />

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🏥</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Surgery - Coming Soon</h2>
            <p className="text-gray-500">This panel is under development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surgery;
