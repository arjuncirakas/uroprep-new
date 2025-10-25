import React, { useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import NurseHeader from '../../components/layout/NurseHeader';
import NursePatientDetailsModal from '../../components/NursePatientDetailsModal';
import UpdateAppointmentModal from '../../components/UpdateAppointmentModal';

const ActiveMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [isUpdateAppointmentModalOpen, setIsUpdateAppointmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Active monitoring patients data
  const monitoringPatients = [
    {
      id: 1,
      name: 'David Wilson',
      upi: 'URP2024008',
      age: 71,
      gender: 'Male',
      pathway: 'Active Surveillance',
      latestPsa: 5.2,
      nextAppointment: '2026-01-08',
      monitoringStatus: 'Stable',
      lastCheckUp: '2025-10-15',
      currentDoctor: 'Dr. Michael Chen',
      appointmentTime: '14:00'
    },
    {
      id: 2,
      name: 'Emma Davis',
      upi: 'URP2024011',
      age: 62,
      gender: 'Female',
      pathway: 'Active Surveillance',
      latestPsa: 3.2,
      nextAppointment: '2026-02-14',
      monitoringStatus: 'Stable',
      lastCheckUp: '2025-09-20',
      currentDoctor: 'Dr. Michael Chen',
      appointmentTime: '13:00'
    },
    {
      id: 3,
      name: 'Richard Anderson',
      upi: 'URP2024020',
      age: 68,
      gender: 'Male',
      pathway: 'Active Surveillance',
      latestPsa: 6.5,
      nextAppointment: '2025-12-01',
      monitoringStatus: 'Needs Attention',
      lastCheckUp: '2025-10-05',
      currentDoctor: 'Dr. Sarah Wilson',
      appointmentTime: '10:30'
    },
    {
      id: 4,
      name: 'Margaret Thompson',
      upi: 'URP2024021',
      age: 64,
      gender: 'Female',
      pathway: 'Active Surveillance',
      latestPsa: 2.8,
      nextAppointment: '2026-03-15',
      monitoringStatus: 'Stable',
      lastCheckUp: '2025-10-10',
      currentDoctor: 'Dr. Lisa Davis',
      appointmentTime: '15:00'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get pathway status styling
  const getPathwayStyle = (pathway) => {
    switch (pathway) {
      case 'OPD Queue':
        return 'bg-blue-100 text-blue-800';
      case 'Active Surveillance':
        return 'bg-green-100 text-green-800';
      case 'Surgical Pathway':
        return 'bg-orange-100 text-orange-800';
      case 'Post-Op Follow-up':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get monitoring status styling
  const getMonitoringStatusStyle = (status) => {
    switch (status) {
      case 'Stable':
        return 'bg-green-100 text-green-800';
      case 'Needs Attention':
        return 'bg-red-100 text-red-800';
      case 'Monitoring':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get PSA styling and dot color
  const getPsaStyle = (psa) => {
    if (psa > 4.0) {
      return { textColor: 'text-orange-600', dotColor: 'bg-orange-500' };
    } else {
      return { textColor: 'text-green-600', dotColor: 'bg-green-500' };
    }
  };

  // Filter patients based on search query
  const filteredPatients = monitoringPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.upi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.pathway.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.monitoringStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle patient actions
  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailsModalOpen(true);
  };

  const handleUpdateAppointment = (patient) => {
    setSelectedPatient(patient);
    setIsUpdateAppointmentModalOpen(true);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <NurseHeader 
          title="Active Monitoring"
          subtitle="Patients under active surveillance monitoring"
          onSearch={setSearchQuery}
          searchPlaceholder="Search by name, UPI, or monitoring status..."
        />

        {/* Monitoring Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATIENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">LATEST PSA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">NEXT APPOINTMENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">DOCTOR</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">BOOK APPOINTMENT</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500 text-sm">
                      No monitoring patients found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    const psaStyle = getPsaStyle(patient.latestPsa);
                    return (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {getInitials(patient.name)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-sm">{patient.name}</span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                  <FiCalendar className="w-3 h-3" />
                                  Scheduled
                                </span>
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                UPI: {patient.upi}
                              </div>
                              <div className="text-xs text-gray-600">
                                Age: {patient.age} • {patient.gender}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${psaStyle.dotColor}`}></div>
                            <span className={`text-sm font-medium ${psaStyle.textColor}`}>
                              {patient.latestPsa} ng/mL
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          <div>{patient.nextAppointment}</div>
                          <div className="text-xs text-gray-500">{patient.appointmentTime}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          {patient.currentDoctor}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button 
                            onClick={() => handleUpdateAppointment(patient)}
                            className="px-3 py-1 bg-teal-50 text-teal-600 text-xs rounded-md border border-teal-200 hover:bg-teal-100 transition-colors flex items-center space-x-1 mx-auto"
                          >
                            <FiCalendar className="w-3 h-3" />
                            <span>Update Appointment</span>
                          </button>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button 
                            onClick={() => handleViewDetails(patient)}
                            className="px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-1 mx-auto"
                          >
                            <FiEye className="w-3 h-3" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
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

      {/* Update Appointment Modal */}
      <UpdateAppointmentModal 
        isOpen={isUpdateAppointmentModalOpen}
        onClose={() => setIsUpdateAppointmentModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default ActiveMonitoring;
