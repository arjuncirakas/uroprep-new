import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NurseSidebar from '../components/layout/NurseSidebar';
import { HiMenu, HiX } from 'react-icons/hi';

const NurseLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

      <NurseSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      
      <main className="flex-1 flex flex-col w-full lg:w-auto overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default NurseLayout;

