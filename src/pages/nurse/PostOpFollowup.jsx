import React, { useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import NurseHeader from '../../components/layout/NurseHeader';
import NursePatientDetailsModal from '../../components/NursePatientDetailsModal';
import UpdateAppointmentModal from '../../components/UpdateAppointmentModal';

const PostOpFollowup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [isUpdateAppointmentModalOpen, setIsUpdateAppointmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Post-op follow-up patients data
  const postOpPatients = [
    {
      id: 1,
      name: 'Robert Davis',
      upi: 'URP2024004',
      age: 62,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2024-01-20',
      surgeon: 'Dr. Sarah Wilson',
      latestPsa: 0.02,
      nextAppointment: '2024-02-20'
    },
    {
      id: 2,
      name: 'Michael Thompson',
      upi: 'URP2024009',
      age: 62,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2024-01-05',
      surgeon: 'Dr. Michael Chen',
      latestPsa: 0.08,
      nextAppointment: '2024-02-05'
    },
    {
      id: 3,
      name: 'Christopher Lee',
      upi: 'URP2024012',
      age: 59,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2024-01-28',
      surgeon: 'Dr. Emma Wilson',
      latestPsa: 0.12,
      nextAppointment: '2024-02-28'
    },
    {
      id: 4,
      name: 'Anthony Martinez',
      upi: 'URP2024015',
      age: 61,
      gender: 'Male',
      surgeryType: 'RALP',
      surgeryDate: '2024-02-01',
      surgeon: 'Dr. Michael Chen',
      latestPsa: 0.15,
      nextAppointment: '2024-03-01'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
  const filteredPatients = postOpPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.upi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.surgeryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.surgeon.toLowerCase().includes(searchQuery.toLowerCase())
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
          title="Post-Op Follow-up"
          subtitle="Patients recovering from surgical procedures"
          onSearch={setSearchQuery}
          searchPlaceholder="Search by name, UPI, or recovery status..."
        />

        {/* Post-Op Follow-up Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATIENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">SURGERY DETAILS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">LATEST PSA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">VIEW</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 text-sm">
                      No post-op patients found matching your search
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
                            {patient.surgeryDate}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Surgeon: {patient.surgeon}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${psaStyle.dotColor}`}></div>
                            <span className={`text-sm font-medium ${psaStyle.textColor}`}>
                              {patient.latestPsa} ng/mL
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Next: {patient.nextAppointment}
                          </div>
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

export default PostOpFollowup;
