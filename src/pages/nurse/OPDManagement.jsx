import React, { useState, useRef } from 'react';
import { FiEye, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { IoChevronForward } from 'react-icons/io5';
import NursePatientDetailsModal from '../../components/NursePatientDetailsModal';
import BookInvestigationModal from '../../components/BookInvestigationModal';
import AddScheduleModal from '../../components/AddScheduleModal';
import NoShowPatientModal from '../../components/NoShowPatientModal';
import NurseHeader from '../../components/layout/NurseHeader';

const OPDManagement = () => {
  // State for tracking active tabs
  const [activeAppointmentTab, setActiveAppointmentTab] = useState('investigation');
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for modals
  const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [isNoShowModalOpen, setIsNoShowModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedNoShowPatient, setSelectedNoShowPatient] = useState(null);

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

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientName: 'Christopher Lee',
      upi: 'URP2024011',
      age: 59,
      gender: 'Male',
      psa: 4.2,
      appointmentDate: '2025-10-21',
      appointmentTime: '3:30 PM',
      urologist: 'Dr. James Brown',
      mri: 'completed',
      biopsy: 'completed',
      trus: 'pending',
      type: 'investigation'
    },
    {
      id: 2,
      patientName: 'Paul Rodriguez',
      upi: 'URP2024018',
      age: 57,
      gender: 'Male',
      psa: 5.1,
      appointmentDate: '2025-10-28',
      appointmentTime: '7:00 PM',
      urologist: 'Dr. Michael Chen',
      mri: 'pending',
      biopsy: 'pending',
      trus: 'pending',
      type: 'investigation'
    },
    {
      id: 3,
      patientName: 'James Anderson',
      upi: 'URP2024005',
      age: 55,
      gender: 'Male',
      psa: 6.8,
      appointmentDate: '2025-10-16',
      appointmentTime: '10:30 AM',
      urologist: 'Dr. Sarah Wilson',
      type: 'urologist'
    },
    {
      id: 4,
      patientName: 'Robert Brown',
      upi: 'URP2024007',
      age: 58,
      gender: 'Male',
      psa: 5.2,
      appointmentDate: '2025-10-16',
      appointmentTime: '11:00 AM',
      urologist: 'Dr. Michael Chen',
      type: 'urologist'
    },
    {
      id: 5,
      patientName: 'Thomas White',
      upi: 'URP2024013',
      age: 61,
      gender: 'Male',
      psa: 5.8,
      appointmentDate: '2025-10-16',
      appointmentTime: '2:00 PM',
      urologist: 'Dr. Lisa Davis',
      type: 'urologist'
    },
    {
      id: 6,
      patientName: 'Daniel Martinez',
      upi: 'URP2024017',
      age: 69,
      gender: 'Male',
      psa: 8.9,
      appointmentDate: '2025-10-16',
      appointmentTime: '3:30 PM',
      urologist: 'Dr. James Brown',
      type: 'urologist'
    },
    {
      id: 7,
      patientName: 'James Wilson',
      upi: 'URP2024023',
      age: 59,
      gender: 'Male',
      psa: 4.3,
      appointmentDate: '2025-10-16',
      appointmentTime: '4:00 PM',
      urologist: 'Dr. Sarah Wilson',
      type: 'urologist'
    },
    {
      id: 8,
      patientName: 'Richard Miller',
      upi: 'URP2024026',
      age: 68,
      gender: 'Male',
      psa: 7.9,
      appointmentDate: '2025-10-16',
      appointmentTime: '4:30 PM',
      urologist: 'Dr. Michael Chen',
      type: 'urologist'
    }
  ];

  // Sample no-show patients data
  const noShowPatients = [
    {
      id: 1,
      name: 'Robert Taylor',
      upi: 'URP2024010',
      age: 68,
      gender: 'Male',
      psa: 6.2,
      appointmentType: 'investigation',
      scheduledDate: '2025-01-20',
      scheduledTime: '10:00 AM'
    },
    {
      id: 2,
      name: 'Emma Davis',
      upi: 'URP2024011',
      age: 62,
      gender: 'Female',
      psa: 3.8,
      appointmentType: 'urologist',
      scheduledDate: '2025-01-20',
      scheduledTime: '2:00 PM'
    },
    {
      id: 3,
      name: 'James Wilson',
      upi: 'URP2024012',
      age: 74,
      gender: 'Male',
      psa: 9.1,
      appointmentType: 'investigation',
      scheduledDate: '2025-01-19',
      scheduledTime: '11:30 AM'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get pathway status styling
  const getPathwayStatusStyle = (status) => {
    switch (status) {
      case 'Surgical':
        return 'bg-blue-100 text-blue-800';
      case 'Postop Followup':
        return 'bg-green-100 text-green-800';
      case 'Investigation':
        return 'bg-purple-100 text-purple-800';
      case 'Urology':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get appointment type styling
  const getAppointmentTypeStyle = (type) => {
    switch (type) {
      case 'investigation':
        return 'bg-purple-100 text-purple-800';
      case 'urologist':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon for investigation procedures
  const getStatusIcon = (status) => {
    if (status === 'completed') {
      return (
        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
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

  const handleNoShowClick = (patient) => {
    setSelectedNoShowPatient(patient);
    setIsNoShowModalOpen(true);
  };

  const handleNoShowReschedule = (patientId, rescheduleData) => {
    console.log('Rescheduling no-show patient:', patientId, rescheduleData);
    // In a real app, this would make an API call to reschedule
    // For now, we'll just log it
  };

  const handleAddTimelineEntry = (patientId, entry) => {
    console.log('Adding timeline entry for patient:', patientId, entry);
    // In a real app, this would make an API call to save the timeline entry
    // For now, we'll just log it
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

        {/* Main Layout Grid - 3 columns like urologist dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Today's Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Today's Appointments</h2>
                  {/* Tabs */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveAppointmentTab('investigation')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeAppointmentTab === 'investigation'
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Investigation
                    </button>
                    <button
                      onClick={() => setActiveAppointmentTab('urologist')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeAppointmentTab === 'urologist'
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Urologist
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      {activeAppointmentTab === 'investigation' ? (
                        <>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-1/3">PATIENT</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-1/6">DATE</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-1/6">UROLOGIST</th>
                          <th className="text-center py-3 px-1 sm:px-2 font-medium text-gray-600 text-xs sm:text-sm w-16">MRI</th>
                          <th className="text-center py-3 px-1 sm:px-2 font-medium text-gray-600 text-xs sm:text-sm w-16">BIOPSY</th>
                          <th className="text-center py-3 px-1 sm:px-2 font-medium text-gray-600 text-xs sm:text-sm w-16">TRUS</th>
                          <th className="text-center py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-20">ACTIONS</th>
                        </>
                      ) : (
                        <>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-1/3">PATIENT</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-1/4">DATE OF APPOINTMENT</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-1/4">UROLOGIST</th>
                          <th className="text-center py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm w-20">ACTIONS</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.filter(apt => apt.type === activeAppointmentTab).length === 0 ? (
                      <tr>
                        <td colSpan={activeAppointmentTab === 'investigation' ? "7" : "4"} className="text-center py-8 text-gray-500 text-sm">
                          No {activeAppointmentTab} appointments found
                        </td>
                      </tr>
                    ) : (
                      appointments.filter(apt => apt.type === activeAppointmentTab).map((appointment) => (
                        <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-2 sm:px-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                                {getInitials(appointment.patientName)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">{appointment.patientName}</div>
                                <div className="text-xs text-gray-600 truncate">
                                  UPI: {appointment.upi} • Age: {appointment.age} • {appointment.gender}
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-1 sm:mr-2 flex-shrink-0"></div>
                                  <span className="text-xs text-orange-600">PSA: {appointment.psa} ng/mL</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">
                            <div className="truncate">{appointment.appointmentDate}</div>
                            <div className="text-xs text-gray-500">{appointment.appointmentTime}</div>
                          </td>
                          {activeAppointmentTab === 'investigation' ? (
                            <>
                              <td className="py-3 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">
                                <div className="truncate">{appointment.urologist}</div>
                              </td>
                              <td className="py-3 px-1 sm:px-2 text-center">
                                {getStatusIcon(appointment.mri)}
                              </td>
                              <td className="py-3 px-1 sm:px-2 text-center">
                                {getStatusIcon(appointment.biopsy)}
                              </td>
                              <td className="py-3 px-1 sm:px-2 text-center">
                                {getStatusIcon(appointment.trus)}
                              </td>
                            </>
                          ) : (
                            <td className="py-3 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">
                              <div className="truncate">{appointment.urologist}</div>
                            </td>
                          )}
                          <td className="py-3 px-2 sm:px-4 text-center">
                            <button
                              onClick={() => handleViewEdit(appointment)}
                              className="px-2 sm:px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-1 mx-auto"
                            >
                              <FiEye className="w-3 h-3" />
                              <span className="hidden sm:inline">View/Edit</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* No Show Patients - Side by Side under appointments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Investigation No Show */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Investigation No Show</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {noShowPatients.filter(patient => patient.appointmentType === 'investigation').map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer" onClick={() => handleNoShowClick(patient)}>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold text-xs">
                            {getInitials(patient.name)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{patient.name}</div>
                            <div className="text-xs text-gray-600">
                              {patient.scheduledDate} at {patient.scheduledTime}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNoShowClick(patient);
                          }}
                          className="text-teal-600 hover:text-teal-700"
                        >
                          <IoChevronForward className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Urologist No Show */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Urologist No Show</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {noShowPatients.filter(patient => patient.appointmentType === 'urologist').map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer" onClick={() => handleNoShowClick(patient)}>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold text-xs">
                            {getInitials(patient.name)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{patient.name}</div>
                            <div className="text-xs text-gray-600">
                              {patient.scheduledDate} at {patient.scheduledTime}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNoShowClick(patient);
                          }}
                          className="text-teal-600 hover:text-teal-700"
                        >
                          <IoChevronForward className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Takes 1/3 width - New Patients */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            {/* New Patients */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">New Patients</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4 max-h-[58vh] overflow-y-auto">
                  {patients.filter(patient => patient.status === 'newPatient').map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(patient.name)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{patient.name}</div>
                          <div className="text-xs text-gray-600">
                            UPI: {patient.upi} • Age: {patient.age} • {patient.gender}
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-xs text-gray-700">PSA: {patient.psa} ng/mL</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Entry: {patient.dateOfEntry}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => handleViewEdit(patient)}
                          className="px-2 py-1 bg-white text-teal-600 text-xs rounded-md border border-teal-600 hover:bg-teal-50 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleBookInvestigation(patient)}
                          className="px-2 py-1 bg-teal-500 text-white text-xs rounded-md hover:bg-teal-600 transition-colors"
                        >
                          Book Investigation
                        </button>
                        <button
                          onClick={() => handleBookUrologist(patient)}
                          className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-md border border-teal-200 hover:bg-teal-100 transition-colors"
                        >
                          Book Urologist
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add some additional sample patients to fill the height */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        MJ
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Maria Johnson</div>
                        <div className="text-xs text-gray-600">
                          UPI: URP2024013 • Age: 59 • Female
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-700">PSA: 3.2 ng/mL</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Entry: 2025-01-21
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <button className="px-2 py-1 bg-white text-teal-600 text-xs rounded-md border border-teal-600 hover:bg-teal-50 transition-colors">
                        View
                      </button>
                      <button className="px-2 py-1 bg-teal-500 text-white text-xs rounded-md hover:bg-teal-600 transition-colors">
                        Book Investigation
                      </button>
                      <button className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-md border border-teal-200 hover:bg-teal-100 transition-colors">
                        Book Urologist
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        RK
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Robert Kim</div>
                        <div className="text-xs text-gray-600">
                          UPI: URP2024014 • Age: 66 • Male
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-700">PSA: 7.8 ng/mL</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Entry: 2025-01-22
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <button className="px-2 py-1 bg-white text-teal-600 text-xs rounded-md border border-teal-600 hover:bg-teal-50 transition-colors">
                        View
                      </button>
                      <button className="px-2 py-1 bg-teal-500 text-white text-xs rounded-md hover:bg-teal-600 transition-colors">
                        Book Investigation
                      </button>
                      <button className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-md border border-teal-200 hover:bg-teal-100 transition-colors">
                        Book Urologist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* No Show Patient Modal */}
      <NoShowPatientModal 
        isOpen={isNoShowModalOpen}
        onClose={() => setIsNoShowModalOpen(false)}
        patient={selectedNoShowPatient}
        onReschedule={handleNoShowReschedule}
        onAddTimelineEntry={handleAddTimelineEntry}
      />
    </div>
  );
};

export default OPDManagement;