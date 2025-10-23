import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FaUsers, FaCalendarAlt, FaChevronDown, FaChevronRight, FaClipboardList, FaProcedures, FaHeartbeat } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';

const UrologistSidebar = ({ isOpen, onClose, onOpenAddPatient }) => {
  const location = useLocation();
  const [isPatientsExpanded, setIsPatientsExpanded] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', icon: HiHome, path: '/urologist/dashboard', active: location.pathname === '/urologist/dashboard' || location.pathname === '/urologist' },
    { 
      name: 'Patients', 
      icon: FaUsers, 
      path: '/urologist/patients', 
      active: location.pathname.startsWith('/urologist/patients'),
      hasSubItems: true,
      subItems: [
        { name: 'New Patients', icon: FaClipboardList, path: '/urologist/patients/new', active: location.pathname === '/urologist/patients/new' },
        { name: 'Surgery Pathway', icon: FaProcedures, path: '/urologist/patients/surgery-pathway', active: location.pathname === '/urologist/patients/surgery-pathway' },
        { name: 'Post-op Followup', icon: FaHeartbeat, path: '/urologist/patients/post-op-followup', active: location.pathname === '/urologist/patients/post-op-followup' },
      ]
    },
    { name: 'Appointments', icon: FaCalendarAlt, path: '/urologist/appointments', active: location.pathname === '/urologist/appointments' },
  ];

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };


  return (
    <div className={`
      w-[280px] bg-white flex flex-col h-screen border-r border-gray-200
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
        <div className="mt-2 text-xs text-gray-500">Urologist Panel</div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.name}>
                {item.hasSubItems ? (
                  <>
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        setIsPatientsExpanded(!isPatientsExpanded);
                        handleLinkClick();
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        item.active
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className={`text-xl mr-4 ${item.active ? 'text-teal-600' : 'text-gray-500'}`} />
                        <span className="font-medium text-base">{item.name}</span>
                      </div>
                      {isPatientsExpanded ? (
                        <FaChevronDown className={`text-sm ${item.active ? 'text-teal-600' : 'text-gray-500'}`} />
                      ) : (
                        <FaChevronRight className={`text-sm ${item.active ? 'text-teal-600' : 'text-gray-500'}`} />
                      )}
                    </Link>
                    {isPatientsExpanded && (
                      <div className="mt-2 ml-4 relative">
                        {/* Main vertical line */}
                        <div className="absolute left-[20px] top-0 w-[2px] h-full bg-teal-300"></div>
                        
                        <ul className="space-y-1">
                          {item.subItems.map((subItem, index) => {
                            const SubIconComponent = subItem.icon;
                            return (
                              <li key={subItem.name} className="relative">
                                {/* Horizontal line connecting to vertical line */}
                                <div className="absolute left-[20px] top-[20px] w-[16px] h-[2px] bg-teal-300"></div>
                                
                                <Link
                                  to={subItem.path}
                                  onClick={handleLinkClick}
                                  className={`flex items-center pl-8 py-2.5 rounded-lg transition-all relative ${
                                    subItem.active
                                      ? 'bg-teal-50 text-teal-700 shadow-sm'
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                    subItem.active 
                                      ? 'bg-teal-100' 
                                      : 'bg-gray-100'
                                  }`}>
                                    <SubIconComponent className={`text-sm ${subItem.active ? 'text-teal-600' : 'text-gray-500'}`} />
                                  </div>
                                  <span className="text-sm font-medium">{subItem.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
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
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-4">
        <button 
          onClick={onOpenAddPatient}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
        >
          <span className="text-xl mr-2">+</span>
          New Patient
        </button>
        
        <Link
          to="/login"
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

export default UrologistSidebar;

