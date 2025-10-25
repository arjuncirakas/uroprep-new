import React, { useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import NurseHeader from '../../components/layout/NurseHeader';
import NursePatientDetailsModal from '../../components/NursePatientDetailsModal';
import UpdateAppointmentModal from '../../components/UpdateAppointmentModal';

const Surgery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [isUpdateAppointmentModalOpen, setIsUpdateAppointmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Surgery patients data
  const surgeryPatients = [
    {
      id: 1,
      name: 'David Wilson',
      upi: 'URP2024003',
      age: 71,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2025-10-25',
      surgeryTime: '9:00 AM',
      surgeon: 'Dr. Michael Chen',
      riskCategory: 'Normal'
    },
    {
      id: 2,
      name: 'Christopher Lee',
      upi: 'URP2024012',
      age: 59,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2025-11-05',
      surgeryTime: '11:00 AM',
      surgeon: 'Dr. Emma Wilson',
      riskCategory: 'High Risk'
    },
    {
      id: 3,
      name: 'Anthony Martinez',
      upi: 'URP2024015',
      age: 61,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2025-11-12',
      surgeryTime: '10:00 AM',
      surgeon: 'Dr. Michael Chen',
      riskCategory: 'High Risk'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get risk category styling
  const getRiskStyle = (risk) => {
    switch (risk) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'High Risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter patients based on search query
  const filteredPatients = surgeryPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.upi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.surgeryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.riskCategory.toLowerCase().includes(searchQuery.toLowerCase())
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
          title="Surgery"
          subtitle="Patients scheduled for surgical procedures"
          onSearch={setSearchQuery}
          searchPlaceholder="Search by name, UPI, or surgery type..."
        />

        {/* Surgery Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
                             <thead>
                 <tr className="border-b border-gray-200 bg-gray-50">
                   <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATIENT</th>
                   <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">SURGERY DETAILS</th>
                   <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">RISK CATEGORY</th>
                   <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">VIEW</th>
                   <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                 </tr>
               </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 text-sm">
                      No surgery patients found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    return (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {getInitials(patient.name)}
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 text-sm">{patient.name}</span>
                              <div className="text-xs text-gray-600 mt-1">
                                UPI: {patient.upi}
                              </div>
                              <div className="text-xs text-gray-600">
                                Age: {patient.age} • {patient.gender}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          <div className="font-medium">{patient.surgeryType}</div>
                          <div className="text-xs text-gray-600">
                            {patient.surgeryDate} at {patient.surgeryTime}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Surgeon: {patient.surgeon}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskStyle(patient.riskCategory)}`}>
                            {patient.riskCategory}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button 
                            onClick={() => handleViewDetails(patient)}
                            className="px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-1"
                          >
                            <FiEye className="w-3 h-3" />
                            <span>View Details</span>
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <button 
                            onClick={() => handleUpdateAppointment(patient)}
                            className="px-3 py-1 bg-teal-50 text-teal-600 text-xs rounded-md border border-teal-200 hover:bg-teal-100 transition-colors flex items-center space-x-1"
                          >
                            <FiCalendar className="w-3 h-3" />
                            <span>Update Appointment</span>
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

export default Surgery;
