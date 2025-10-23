import React, { useState, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import PatientDetailsModalWrapper from '../../components/PatientDetailsModalWrapper';
import NotificationModal from '../../components/NotificationModal';
import { getPatientsByCategory } from '../../utils/dummyData';

const Patients = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const patientDetailsModalRef = useRef();

  // Determine the category from the URL path
  const category = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/patients/new')) return 'new';
    if (path.includes('/patients/surgery-pathway')) return 'surgery-pathway';
    if (path.includes('/patients/post-op-followup')) return 'post-op-followup';
    return 'all';
  }, [location.pathname]);

  // Get page title based on category
  const pageTitle = useMemo(() => {
    switch (category) {
      case 'new':
        return 'New Patients';
      case 'surgery-pathway':
        return 'Surgery Pathway';
      case 'post-op-followup':
        return 'Post-op Followup';
      default:
        return 'All Patients';
    }
  }, [category]);

  // Get page subtitle based on category
  const pageSubtitle = useMemo(() => {
    switch (category) {
      case 'new':
        return 'Recently registered patients requiring initial assessment';
      case 'surgery-pathway':
        return 'Patients in active surgical pathway';
      case 'post-op-followup':
        return 'Patients requiring post-operative follow-up care';
      default:
        return 'Manage patient records and pathways';
    }
  }, [category]);

  const patients = getPatientsByCategory(category);

  const handleViewPatient = (patient) => {
    patientDetailsModalRef.current?.openPatientDetails(patient.name);
  };

  const getPriorityBadge = (priority, color) => {
    const colorClasses = {
      red: 'bg-red-100 text-red-700',
      purple: 'bg-purple-100 text-purple-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      green: 'bg-green-100 text-green-700',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="pl-12 lg:pl-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-500 text-sm mt-1">{pageSubtitle}</p>
          </div>
          {/* Search Bar and Notification */}
          <div className="w-full lg:w-96 flex items-center gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
            {/* Notification Icon */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoNotificationsOutline className="text-2xl" />
                {/* Notification Badge */}
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">PATIENT NAME</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">PATIENT ID / MRN</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">PRIORITY</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">LAST INTERACTION</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        ID: {patient.patientId} / MRN: {patient.mrn}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getPriorityBadge(patient.priority, patient.priorityColor)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-700">{patient.lastInteraction}</div>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleViewPatient(patient)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Patient Details Modal Wrapper */}
      <PatientDetailsModalWrapper ref={patientDetailsModalRef} />

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default Patients;
