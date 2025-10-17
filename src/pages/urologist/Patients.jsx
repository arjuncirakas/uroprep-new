import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import PatientDetailsModal from '../../components/PatientDetailsModal';
import NotificationModal from '../../components/NotificationModal';

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const patients = [
    {
      id: 1,
      name: 'Ethan Carter',
      patientId: '123456',
      mrn: '789012',
      pathwayStatus: 'Active',
      statusColor: 'teal',
      lastInteraction: '2024-03-15 10:30 AM'
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      patientId: '654321',
      mrn: '210987',
      pathwayStatus: 'Completed',
      statusColor: 'gray',
      lastInteraction: '2024-03-14 02:45 PM'
    },
    {
      id: 3,
      name: 'Noah Parker',
      patientId: '987654',
      mrn: '456789',
      pathwayStatus: 'Pending',
      statusColor: 'yellow',
      lastInteraction: '2024-03-13 09:15 AM'
    },
    {
      id: 4,
      name: 'Ava Reynolds',
      patientId: '456123',
      mrn: '321654',
      pathwayStatus: 'Active',
      statusColor: 'teal',
      lastInteraction: '2024-03-12 04:00 PM'
    },
    {
      id: 5,
      name: 'Liam Foster',
      patientId: '321987',
      mrn: '654789',
      pathwayStatus: 'Completed',
      statusColor: 'gray',
      lastInteraction: '2024-03-11 11:20 AM'
    }
  ];

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const getStatusBadge = (status, color) => {
    const colorClasses = {
      teal: 'bg-teal-100 text-teal-700',
      gray: 'bg-gray-100 text-gray-700',
      yellow: 'bg-yellow-100 text-yellow-700',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
        {status}
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-500 text-sm mt-1">Manage patient records and pathways</p>
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
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">PATHWAY STATUS</th>
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
                      {getStatusBadge(patient.pathwayStatus, patient.statusColor)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-700">{patient.lastInteraction}</div>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleViewPatient(patient)}
                        className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors cursor-pointer"
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

      {/* Patient Details Modal */}
      <PatientDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        patient={selectedPatient}
      />

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default Patients;
