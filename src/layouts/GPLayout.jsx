import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import GPSidebar from '../components/layout/GPSidebar';
import AddPatientModal from '../components/AddPatientModal';
import { HiMenu, HiX } from 'react-icons/hi';

const GPLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddPatient = (newPatient) => {
    console.log('New patient added:', newPatient);
    // You can add additional logic here like updating a global state or making an API call
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-teal-600 text-white p-2 rounded-lg shadow-lg hover:bg-teal-700 transition-colors"
      >
        {isSidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <GPSidebar 
        isOpen={isSidebarOpen} 
        onClose={toggleSidebar}
        onOpenAddPatient={() => setIsAddPatientOpen(true)}
      />
      
      <main className="flex-1 flex flex-col w-full lg:w-auto overflow-hidden">
        <Outlet />
      </main>

      {/* Add Patient Modal */}
      <AddPatientModal 
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onPatientAdded={handleAddPatient}
        isUrologist={false}
      />
    </div>
  );
};

export default GPLayout;

