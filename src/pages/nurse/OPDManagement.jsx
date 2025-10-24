import React, { useState, useRef } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import { IoChevronForward } from 'react-icons/io5';
import NursePatientDetailsModal from '../../components/NursePatientDetailsModal';
import BookInvestigationModal from '../../components/BookInvestigationModal';
import AddScheduleModal from '../../components/AddScheduleModal';
import NurseHeader from '../../components/layout/NurseHeader';

const OPDManagement = () => {
  // State for tracking active tab
  const [activeTab, setActiveTab] = useState('newPatient');
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for modals
  const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Sample patient data
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      upi: 'URP2024001',
      patientId: 'URP2024001',
      age: 65,
      gender: 'Male',
      psa: 8.5,
      dateOfEntry: '2025-10-03',
      status: 'newPatient',
      category: 'new'
    },
    {
      id: 2,
      name: 'David Wilson',
      upi: 'URP2024008',
      patientId: 'URP2024008',
      age: 71,
      gender: 'Male',
      psa: 4.8,
      dateOfEntry: '2025-10-07',
      status: 'newPatient',
      category: 'new'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      upi: 'URP2024003',
      patientId: 'URP2024003',
      age: 58,
      gender: 'Female',
      psa: 2.1,
      dateOfEntry: '2025-10-05',
      status: 'investigation',
      category: 'investigation'
    },
    {
      id: 4,
      name: 'Michael Brown',
      upi: 'URP2024005',
      patientId: 'URP2024005',
      age: 72,
      gender: 'Male',
      psa: 12.3,
      dateOfEntry: '2025-10-06',
      status: 'urologist',
      category: 'surgery-pathway'
    }
  ];

  // Filter patients based on active tab and search query
  const filteredPatients = patients.filter(patient => {
    const matchesTab = patient.status === activeTab;
    const matchesSearch = searchQuery === '' || 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.upi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.age.toString().includes(searchQuery) ||
      patient.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.psa.toString().includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  // Get patient count for each tab
  const getPatientCount = (status) => {
    return patients.filter(patient => patient.status === status).length;
  };

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Handle patient actions
  const handleViewEdit = (patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailsModalOpen(true);
  };

  const handleBookInvestigation = (patient) => {
    setSelectedPatient(patient);
    setIsInvestigationModalOpen(true);
  };

  const handleBookUrologist = (patient) => {
    setSelectedPatient(patient);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <NurseHeader 
          title="OPD Management"
          subtitle="Track patients in OPD queue and manage consultation flow"
          onSearch={setSearchQuery}
          searchPlaceholder="Search patients by name, UPI, or status"
        />

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('newPatient')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'newPatient'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>New Patient</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === 'newPatient'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {getPatientCount('newPatient')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('investigation')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'investigation'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Appointment for Investigation</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === 'investigation'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {getPatientCount('investigation')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('urologist')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'urologist'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Appointment for Urologist</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === 'urologist'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {getPatientCount('urologist')}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Section Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-teal-600">
              Patients waiting for urologist consultation
            </h2>
          </div>


          {/* Patient List */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">PATIENT</th>
                  <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">DATE OF ENTRY</th>
                  <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500 text-sm">
                      No patients found for the selected category
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-3 sm:px-6">
                        <div className="flex items-center space-x-3">
                          {/* Patient Avatar */}
                          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(patient.name)}
                          </div>
                          {/* Patient Details */}
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm">{patient.name}</div>
                            <div className="text-xs text-gray-600">
                              UPI: {patient.upi} • Age: {patient.age} • {patient.gender}
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              <span className="text-xs text-gray-700">PSA: {patient.psa} ng/mL</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 sm:px-6 text-gray-700 text-sm">
                        {patient.dateOfEntry}
                      </td>
                      <td className="py-4 px-3 sm:px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewEdit(patient)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <FiEye className="text-xs" />
                            <span>View/Edit</span>
                          </button>
                          <button
                            onClick={() => handleBookInvestigation(patient)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <FiCalendar className="text-xs" />
                            <span>Book Investigation</span>
                          </button>
                          <button
                            onClick={() => handleBookUrologist(patient)}
                            className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors"
                          >
                            <FiCalendar className="text-xs" />
                            <span>Book Urologist</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Nurse Patient Details Modal */}
      <NursePatientDetailsModal 
        isOpen={isPatientDetailsModalOpen}
        onClose={() => setIsPatientDetailsModalOpen(false)}
        patient={selectedPatient}
      />

      {/* Book Investigation Modal */}
      <BookInvestigationModal 
        isOpen={isInvestigationModalOpen}
        onClose={() => setIsInvestigationModalOpen(false)}
        patient={selectedPatient}
        onSuccess={(data) => {
          console.log('Investigation booked:', data);
          setIsInvestigationModalOpen(false);
        }}
      />

      {/* Schedule Modal */}
      <AddScheduleModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default OPDManagement;