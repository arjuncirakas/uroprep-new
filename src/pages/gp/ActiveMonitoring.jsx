import React, { useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import GPHeader from '../../components/layout/GPHeader';
import GPPatientDetailsModal from '../../components/GPPatientDetailsModal';

const ActiveMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Active monitoring patients data
  const monitoringPatients = [
    {
      id: 1,
      name: 'Robert Brown',
      upi: 'URP2024003',
      age: 72,
      gender: 'Male',
      latestPsa: 3.1,
      lastPSADate: '2024-01-10',
      nextReview: '2024-04-10',
      monitoringStatus: 'Stable',
      currentDoctor: 'Dr. Lisa Davis',
      nextAppointment: '2026-01-08',
      appointmentTime: '09:00'
    },
    {
      id: 2,
      name: 'Michael Wilson',
      upi: 'URP2024005',
      age: 68,
      gender: 'Male',
      latestPsa: 4.8,
      lastPSADate: '2024-01-08',
      nextReview: '2024-03-15',
      monitoringStatus: 'Stable',
      currentDoctor: 'Dr. Sarah Wilson',
      nextAppointment: '2026-03-15',
      appointmentTime: '15:30'
    },
    {
      id: 3,
      name: 'David Miller',
      upi: 'URP2024007',
      age: 70,
      gender: 'Male',
      latestPsa: 5.2,
      lastPSADate: '2024-01-05',
      nextReview: '2024-02-20',
      monitoringStatus: 'Review Required',
      currentDoctor: 'Dr. Michael Chen',
      nextAppointment: '2025-12-01',
      appointmentTime: '10:30'
    },
    {
      id: 4,
      name: 'Emma Thompson',
      upi: 'URP2024006',
      age: 62,
      gender: 'Female',
      latestPsa: 3.2,
      lastPSADate: '2024-01-03',
      nextReview: '2024-07-03',
      monitoringStatus: 'Stable',
      currentDoctor: 'Dr. Michael Chen',
      nextAppointment: '2026-02-14',
      appointmentTime: '13:00'
    },
    {
      id: 5,
      name: 'James Anderson',
      upi: 'URP2024008',
      age: 69,
      gender: 'Male',
      latestPsa: 4.1,
      lastPSADate: '2024-01-01',
      nextReview: '2024-04-01',
      monitoringStatus: 'Stable',
      currentDoctor: 'Dr. Lisa Davis',
      nextAppointment: '2025-11-20',
      appointmentTime: '14:30'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get monitoring status styling
  const getMonitoringStatusStyle = (status) => {
    switch (status) {
      case 'Stable':
        return 'bg-green-100 text-green-800';
      case 'Review Required':
        return 'bg-yellow-100 text-yellow-800';
      case 'Needs Attention':
        return 'bg-red-100 text-red-800';
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
    patient.monitoringStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.currentDoctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle patient actions
  const handleViewDetails = (patient) => {
    setSelectedPatient(patient.name);
    setIsPatientDetailsModalOpen(true);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <GPHeader 
          title="Active Monitoring"
          subtitle="Patients under active surveillance monitoring"
          onSearch={setSearchQuery}
          searchPlaceholder="Search by name, UPI, monitoring status, or doctor..."
        />

        {/* Monitoring Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATIENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">LATEST PSA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">NEXT REVIEW</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">DOCTOR</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 text-sm">
                      No monitoring patients found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    const psaStyle = getPsaStyle(patient.latestPsa);
                    return (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {getInitials(patient.name)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-sm">{patient.name}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getMonitoringStatusStyle(patient.monitoringStatus)}`}>
                                  {patient.monitoringStatus}
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
                          <div className="text-xs text-gray-500 mt-1">
                            Last: {patient.lastPSADate}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          <div>{patient.nextReview}</div>
                          <div className="text-xs text-gray-500">Next appointment: {patient.nextAppointment}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          {patient.currentDoctor}
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

      {/* GP Patient Details Modal */}
      <GPPatientDetailsModal 
        isOpen={isPatientDetailsModalOpen}
        onClose={() => setIsPatientDetailsModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default ActiveMonitoring;
