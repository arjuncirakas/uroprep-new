import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FaUsers, FaCalendarAlt, FaTasks, FaChartBar } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', icon: HiHome, path: '/dashboard', active: location.pathname === '/dashboard' },
    { name: 'Patients', icon: FaUsers, path: '', active: location.pathname === '/patients' },
    { name: 'Appointments', icon: FaCalendarAlt, path: '', active: location.pathname === '/appointments' },
    { name: 'Tasks', icon: FaTasks, path: '', active: location.pathname === '/tasks' },
    { name: 'Reports', icon: FaChartBar, path: '', active: location.pathname === '/reports' },
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`
      w-[250px] bg-white flex flex-col h-screen border-r border-gray-200
      fixed lg:static z-40 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-800 rounded flex items-center justify-center">
            <span className="text-white text-lg">⚕</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">UroPrep</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className={`text-xl mr-4 ${item.active ? 'text-teal-600' : 'text-gray-500'}`} />
                  <span className="font-medium text-base">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-4">
        <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center">
          <span className="text-xl mr-2">+</span>
          New Patient
        </button>
        
        <Link
          to="/logout"
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <IoLogOutOutline className="text-xl mr-3" />
          <span className="font-medium">Logout</span>
        </Link>
        
        {/* Powered by AhimsaGlobal */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Powered by AhimsaGlobal</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
