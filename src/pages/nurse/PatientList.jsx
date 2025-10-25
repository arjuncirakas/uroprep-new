import React, { useState } from 'react';
import { FiEye, FiCalendar } from 'react-icons/fi';
import NurseHeader from '../../components/layout/NurseHeader';
import NursePatientDetailsModal from '../../components/NursePatientDetailsModal';
import UpdateAppointmentModal from '../../components/UpdateAppointmentModal';

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [isUpdateAppointmentModalOpen, setIsUpdateAppointmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Sample patient data
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      upi: 'URP2024001',
      age: 65,
      gender: 'Male',
      pathway: 'OPD Queue',
      latestPsa: 8.5,
      nextAppointment: '2025-10-20',
      currentDoctor: 'Dr. Sarah Wilson',
      appointmentTime: '10:30',
      appointmentNotes: 'Follow-up for elevated PSA levels. Patient reports no new symptoms.'
    },
    {
      id: 2,
      name: 'David Wilson',
      upi: 'URP2024008',
      age: 71,
      gender: 'Male',
      pathway: 'Active Surveillance',
      latestPsa: 5.2,
      nextAppointment: '2026-01-08',
      currentDoctor: 'Dr. Michael Chen',
      appointmentTime: '14:00',
      appointmentNotes: 'Routine surveillance appointment. Continue monitoring PSA levels.'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      upi: 'URP2024003',
      age: 58,
      gender: 'Female',
      pathway: 'Surgical Pathway',
      latestPsa: 4.8,
      nextAppointment: '2025-11-15',
      currentDoctor: 'Dr. Lisa Davis',
      appointmentTime: '09:00',
      appointmentNotes: 'Pre-surgical consultation. Discuss surgical options and preparation.'
    },
    {
      id: 4,
      name: 'Michael Brown',
      upi: 'URP2024005',
      age: 72,
      gender: 'Male',
      pathway: 'Post-Op Follow-up',
      latestPsa: 0.02,
      nextAppointment: '2025-12-10',
      currentDoctor: 'Dr. James Brown',
      appointmentTime: '11:30',
      appointmentNotes: 'Post-operative follow-up. Excellent recovery progress noted.'
    },
    {
      id: 5,
      name: 'Robert Taylor',
      upi: 'URP2024010',
      age: 68,
      gender: 'Male',
      pathway: 'OPD Queue',
      latestPsa: 6.8,
      nextAppointment: '2025-10-25',
      currentDoctor: 'Dr. Sarah Wilson',
      appointmentTime: '15:30',
      appointmentNotes: 'New patient consultation. Review initial test results.'
    },
    {
      id: 6,
      name: 'Emma Davis',
      upi: 'URP2024011',
      age: 62,
      gender: 'Female',
      pathway: 'Active Surveillance',
      latestPsa: 3.2,
      nextAppointment: '2026-02-14',
      currentDoctor: 'Dr. Michael Chen',
      appointmentTime: '13:00',
      appointmentNotes: 'Annual surveillance appointment. Patient doing well on current protocol.'
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

  // Get PSA styling
  const getPsaStyle = (psa) => {
    if (psa > 4.0) {
      return 'text-red-600';  // Red for high values
    } else {
      return 'text-gray-900'; // Black for all other values
    }
  };

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.upi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.pathway.toLowerCase().includes(searchQuery.toLowerCase())
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
          title="Patient List"
          subtitle="All patients under urology care"
          onSearch={setSearchQuery}
          searchPlaceholder="Search by name, UPI, or GP..."
        />

        {/* Patient Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATIENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PATHWAY</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">LATEST PSA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">NEXT APPOINTMENT</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">BOOK APPOINTMENT</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500 text-sm">
                      No patients found matching your search
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
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPathwayStyle(patient.pathway)}`}>
                          {patient.pathway}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-medium ${getPsaStyle(patient.latestPsa)}`}>
                          {patient.latestPsa} ng/mL
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700 text-sm">
                        {patient.nextAppointment}
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

      {/* Update Appointment Modal */}
      <UpdateAppointmentModal 
        isOpen={isUpdateAppointmentModalOpen}
        onClose={() => setIsUpdateAppointmentModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientList;
