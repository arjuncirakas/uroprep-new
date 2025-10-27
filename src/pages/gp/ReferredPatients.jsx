import React, { useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import GPHeader from '../../components/layout/GPHeader';
import GPPatientDetailsModal from '../../components/GPPatientDetailsModal';

const ReferredPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Sample referred patients data
  const referredPatients = [
    {
      id: 1,
      name: 'John Smith',
      upi: 'URP2024001',
      age: 65,
      gender: 'Male',
      psa: 4.2,
      referralDate: '2024-01-15',
      priority: 'Normal',
      status: 'Pending Review',
      currentDoctor: 'Dr. Sarah Wilson',
      nextAppointment: '2025-10-20',
      appointmentTime: '10:30'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      upi: 'URP2024002',
      age: 58,
      gender: 'Female',
      psa: 6.8,
      referralDate: '2024-01-14',
      priority: 'High',
      status: 'Under Investigation',
      currentDoctor: 'Dr. Michael Chen',
      nextAppointment: '2025-11-15',
      appointmentTime: '14:00'
    },
    {
      id: 3,
      name: 'Robert Brown',
      upi: 'URP2024003',
      age: 72,
      gender: 'Male',
      psa: 3.1,
      referralDate: '2024-01-13',
      priority: 'Normal',
      status: 'Active Monitoring',
      currentDoctor: 'Dr. Lisa Davis',
      nextAppointment: '2026-01-08',
      appointmentTime: '09:00'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      upi: 'URP2024004',
      age: 61,
      gender: 'Female',
      psa: 8.5,
      referralDate: '2024-01-12',
      priority: 'Urgent',
      status: 'Surgical Pathway',
      currentDoctor: 'Dr. James Brown',
      nextAppointment: '2025-12-10',
      appointmentTime: '11:30'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      upi: 'URP2024005',
      age: 68,
      gender: 'Male',
      psa: 4.8,
      referralDate: '2024-01-11',
      priority: 'Normal',
      status: 'Active Monitoring',
      currentDoctor: 'Dr. Sarah Wilson',
      nextAppointment: '2026-03-15',
      appointmentTime: '15:30'
    },
    {
      id: 6,
      name: 'Emma Thompson',
      upi: 'URP2024006',
      age: 62,
      gender: 'Female',
      psa: 3.2,
      referralDate: '2024-01-10',
      priority: 'Normal',
      status: 'Pending Review',
      currentDoctor: 'Dr. Michael Chen',
      nextAppointment: '2025-10-25',
      appointmentTime: '13:00'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'Normal': 'bg-gray-100 text-gray-700',
      'High': 'bg-yellow-100 text-yellow-700',
      'Urgent': 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority]}`}>
        {priority}
      </span>
    );
  };

  // Get PSA styling
  const getPsaStyle = (psa) => {
    if (psa > 4.0) {
      return 'text-red-600';  // Red for high values
    } else {
      return 'text-gray-900'; // Black for normal values
    }
  };

  // Filter patients based on search query
  const filteredPatients = referredPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.upi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.priority.toLowerCase().includes(searchQuery.toLowerCase())
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
          title="Referred Patients"
          subtitle="Patients referred to urology department"
          onSearch={setSearchQuery}
          searchPlaceholder="Search by name, UPI, status, or priority..."
        />

        {/* Referred Patients Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATIENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PSA LEVEL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">REFERRAL DATE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">NEXT APPOINTMENT</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 text-sm">
                      No referred patients found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(patient.name)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{patient.name}</div>
                            <div className="text-xs text-gray-600">
                              UPI: {patient.upi} • Age: {patient.age} • {patient.gender}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {getPriorityBadge(patient.priority)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-medium ${getPsaStyle(patient.psa)}`}>
                          {patient.psa} ng/mL
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700 text-sm">
                        {patient.referralDate}
                      </td>
                      <td className="py-4 px-4 text-gray-700 text-sm">
                        <div>{patient.nextAppointment}</div>
                        <div className="text-xs text-gray-500">{patient.appointmentTime}</div>
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
                  ))
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

export default ReferredPatients;
