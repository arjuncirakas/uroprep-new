import React, { useState, useImperativeHandle, forwardRef } from 'react';
import UrologistPatientDetailsModal from './UrologistPatientDetailsModal';
import { patientsData } from '../utils/dummyData';


const PatientDetailsModalWrapper = forwardRef((props, ref) => {
  const [isPatientDetailsOpen, setIsPatientDetailsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Function to open patient details modal
  const openPatientDetails = (patientName) => {
    // Find patient by name in dummy data
    const patientData = patientsData.find(p => p.name === patientName);
    
    // If patient not found, create a minimal patient object
    if (!patientData) {
      const minimalPatientData = {
        name: patientName,
        age: '-',
        gender: '-',
        patientId: 'N/A',
        mrn: 'N/A',
        lastAppointment: 'N/A',
        recentNotes: []
      };
      setSelectedPatient(minimalPatientData);
    } else {
      // Filter data for new patients to show only one set of results
      let filteredPatientData = { ...patientData };
      
      if (patientData.category === 'new') {
        // For new patients, limit recent notes to only the most recent one
        filteredPatientData = {
          ...patientData,
          recentNotes: patientData.recentNotes.slice(0, 1)
        };
      }
      // For existing patients (surgical pathway, post-op followup), keep all data
      
      setSelectedPatient(filteredPatientData);
    }
    
    setIsPatientDetailsOpen(true);
  };

  // Function to close the modal
  const closePatientDetails = () => {
    setIsPatientDetailsOpen(false);
  };

  // Expose methods to parent components via ref
  useImperativeHandle(ref, () => ({
    openPatientDetails,
    closePatientDetails
  }));

  return (
    <UrologistPatientDetailsModal 
      isOpen={isPatientDetailsOpen}
      onClose={closePatientDetails}
      patient={selectedPatient}
    />
  );
});

PatientDetailsModalWrapper.displayName = 'PatientDetailsModalWrapper';

export default PatientDetailsModalWrapper;

