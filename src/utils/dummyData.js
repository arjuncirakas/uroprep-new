// Dummy data for the application

export const patientsData = [
  {
    id: 1,
    name: 'Ethan Carter',
    patientId: '123456',
    mrn: '789012',
    age: 62,
    gender: 'Male',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com',
    pathwayStatus: 'Active',
    statusColor: 'teal',
    lastInteraction: '2024-03-15 10:30 AM',
    lastAppointment: '2024-09-10',
    pathway: {
      type: 'Active Monitoring',
      status: 'On Track',
      nextAction: 'Follow-up PSA due 2024-10-15',
    },
    vitals: {
      latestPSA: '4.5 ng/mL',
      psaDate: '2024-07-15',
      prostateVolume: '45 mL',
      volumeDate: '2024-08-05',
    },
    recentNotes: [
      {
        title: 'Post-Op Check',
        date: '2024-09-10',
        content: 'Patient recovering well from the procedure. Vitals are stable. Minimal pain reported. Incision site clean and dry.'
      },
      {
        title: 'Follow-up appointment',
        date: '2024-08-15',
        content: 'Discussed PSA results. Patient remains asymptomatic. Continue active monitoring.'
      },
      {
        title: 'Initial Consultation',
        date: '2024-07-20',
        content: 'Patient presented with urinary symptoms. Examination and initial PSA ordered.'
      }
    ],
    tasks: [
      { id: 1, text: 'Review latest blood results', completed: false },
      { id: 2, text: "Follow up on patient's call regarding medication side effects", completed: false },
      { id: 3, text: 'Prepare referral letter to Dr. Smith', completed: true }
    ]
  },
  {
    id: 2,
    name: 'Olivia Bennett',
    patientId: '654321',
    mrn: '210987',
    age: 58,
    gender: 'Female',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com',
    pathwayStatus: 'Completed',
    statusColor: 'gray',
    lastInteraction: '2024-03-14 02:45 PM',
    lastAppointment: '2024-09-05',
    pathway: {
      type: 'Post-Treatment Follow-up',
      status: 'Completed',
      nextAction: 'Annual check-up scheduled for 2025-01-15',
    },
    vitals: {
      latestPSA: '2.1 ng/mL',
      psaDate: '2024-08-20',
      prostateVolume: '-',
      volumeDate: '-',
    },
    recentNotes: [
      {
        title: 'Treatment Completion',
        date: '2024-09-05',
        content: 'Successfully completed treatment protocol. Patient showing excellent recovery. All post-treatment markers within normal range.'
      },
      {
        title: 'Mid-Treatment Review',
        date: '2024-07-10',
        content: 'Patient tolerating treatment well. Minor side effects managed effectively with medication adjustments.'
      },
      {
        title: 'Treatment Initiation',
        date: '2024-06-01',
        content: 'Started treatment protocol. Discussed potential side effects and management strategies with patient and family.'
      }
    ],
    tasks: [
      { id: 1, text: 'Send discharge summary to GP', completed: true },
      { id: 2, text: 'Schedule annual follow-up', completed: false }
    ]
  },
  {
    id: 3,
    name: 'Noah Parker',
    patientId: '987654',
    mrn: '456789',
    age: 55,
    gender: 'Male',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com',
    pathwayStatus: 'Pending',
    statusColor: 'yellow',
    lastInteraction: '2024-03-13 09:15 AM',
    lastAppointment: '2024-08-25',
    pathway: {
      type: 'Diagnostic Pathway',
      status: 'Awaiting Results',
      nextAction: 'Biopsy results expected by 2024-10-20',
    },
    vitals: {
      latestPSA: '6.8 ng/mL',
      psaDate: '2024-08-01',
      prostateVolume: '52 mL',
      volumeDate: '2024-08-10',
    },
    recentNotes: [
      {
        title: 'Biopsy Procedure',
        date: '2024-08-25',
        content: 'Transrectal ultrasound-guided biopsy performed. 12 core samples taken. Procedure tolerated well. Patient advised on post-procedure care.'
      },
      {
        title: 'Pre-Biopsy Consultation',
        date: '2024-08-18',
        content: 'Discussed elevated PSA findings. Explained biopsy procedure, risks, and benefits. Patient consented to procedure.'
      },
      {
        title: 'Referral from GP',
        date: '2024-07-28',
        content: 'New referral. Elevated PSA detected in routine screening. Patient reports mild LUTS. No family history of prostate cancer.'
      }
    ],
    tasks: [
      { id: 1, text: 'Chase pathology for biopsy results', completed: false },
      { id: 2, text: 'Schedule results discussion appointment', completed: false },
      { id: 3, text: 'Prepare management plan based on results', completed: false }
    ]
  },
  {
    id: 4,
    name: 'Ava Reynolds',
    patientId: '456123',
    mrn: '321654',
    age: 67,
    gender: 'Female',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com',
    pathwayStatus: 'Active',
    statusColor: 'teal',
    lastInteraction: '2024-03-12 04:00 PM',
    lastAppointment: '2024-09-08',
    pathway: {
      type: 'Bladder Cancer Surveillance',
      status: 'Active',
      nextAction: 'Cystoscopy scheduled for 2024-11-01',
    },
    vitals: {
      latestPSA: '-',
      psaDate: '-',
      prostateVolume: '-',
      volumeDate: '-',
    },
    recentNotes: [
      {
        title: '3-Month Cystoscopy',
        date: '2024-09-08',
        content: 'Surveillance cystoscopy performed. No evidence of recurrence. Bladder mucosa appears healthy. Continue surveillance protocol.'
      },
      {
        title: 'Post-TURBT Follow-up',
        date: '2024-06-15',
        content: 'Patient recovering well from TURBT. Pathology confirmed Ta low-grade urothelial carcinoma. Commenced on surveillance protocol.'
      },
      {
        title: 'TURBT Procedure',
        date: '2024-05-20',
        content: 'Transurethral resection of bladder tumor performed. Single lesion resected from lateral wall. Hemostasis achieved.'
      }
    ],
    tasks: [
      { id: 1, text: 'Book next surveillance cystoscopy', completed: true },
      { id: 2, text: 'Send surveillance schedule to patient', completed: false },
      { id: 3, text: 'Update patient on latest findings', completed: true }
    ]
  },
  {
    id: 5,
    name: 'Liam Foster',
    patientId: '321987',
    mrn: '654789',
    age: 71,
    gender: 'Male',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com',
    pathwayStatus: 'Completed',
    statusColor: 'gray',
    lastInteraction: '2024-03-11 11:20 AM',
    lastAppointment: '2024-08-30',
    pathway: {
      type: 'Post-Surgical Recovery',
      status: 'Discharged',
      nextAction: '6-month post-op review scheduled for 2025-02-28',
    },
    vitals: {
      latestPSA: '0.1 ng/mL',
      psaDate: '2024-08-25',
      prostateVolume: '-',
      volumeDate: '-',
    },
    recentNotes: [
      {
        title: 'Final Post-Op Check',
        date: '2024-08-30',
        content: 'Excellent recovery from radical prostatectomy. PSA undetectable. Continence improving. Patient very satisfied with outcome.'
      },
      {
        title: '6-Week Post-Op',
        date: '2024-07-18',
        content: 'Wound healing well. Some stress incontinence, improving with pelvic floor exercises. PSA <0.1. Pathology: pT2c, clear margins.'
      },
      {
        title: 'Radical Prostatectomy',
        date: '2024-06-05',
        content: 'Robot-assisted laparoscopic radical prostatectomy performed successfully. Nerve-sparing technique attempted bilaterally. No intraoperative complications.'
      }
    ],
    tasks: [
      { id: 1, text: 'Send final discharge summary', completed: true },
      { id: 2, text: 'Book 6-month follow-up', completed: true }
    ]
  }
];

// Helper function to get patient by ID
export const getPatientById = (id) => {
  return patientsData.find(patient => patient.id === id);
};

// Helper function to get all patients
export const getAllPatients = () => {
  return patientsData;
};

// Dummy appointment data
export const appointmentsData = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-11',
    time: '09:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Follow-up PSA review',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 2,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-11',
    time: '10:30',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Consultation for treatment options',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 3,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-18',
    time: '09:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 45,
    status: 'confirmed',
    notes: 'Annual check-up',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  },
  {
    id: 4,
    patientId: 3,
    patientName: 'Noah Parker',
    date: '2025-10-18',
    time: '10:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 60,
    status: 'confirmed',
    notes: 'Biopsy results discussion',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com'
  },
  {
    id: 5,
    patientId: 4,
    patientName: 'Ava Reynolds',
    date: '2025-10-18',
    time: '14:00',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 30,
    status: 'confirmed',
    notes: 'Cystoscopy procedure',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com'
  },
  {
    id: 6,
    patientId: 5,
    patientName: 'Liam Foster',
    date: '2025-10-18',
    time: '15:30',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Post-surgical follow-up',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com'
  },
  {
    id: 7,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-25',
    time: '09:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 45,
    status: 'pending',
    notes: 'PSA blood test',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 8,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-25',
    time: '11:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Treatment review',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  },
  {
    id: 9,
    patientId: 3,
    patientName: 'Noah Parker',
    date: '2025-10-28',
    time: '14:30',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 45,
    status: 'confirmed',
    notes: 'Treatment planning consultation',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com'
  },
  {
    id: 10,
    patientId: 4,
    patientName: 'Ava Reynolds',
    date: '2025-10-30',
    time: '10:00',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 60,
    status: 'pending',
    notes: 'Surveillance cystoscopy',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com'
  },
  {
    id: 11,
    patientId: 5,
    patientName: 'Liam Foster',
    date: '2025-11-01',
    time: '09:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: '6-month follow-up',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com'
  },
  {
    id: 12,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-11-05',
    time: '15:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Active monitoring review',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 13,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-03',
    time: '14:00',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 45,
    status: 'confirmed',
    notes: 'Follow-up cystoscopy',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  },
  {
    id: 14,
    patientId: 3,
    patientName: 'Noah Parker',
    date: '2025-10-07',
    time: '10:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Treatment consultation',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com'
  },
  {
    id: 15,
    patientId: 4,
    patientName: 'Ava Reynolds',
    date: '2025-10-12',
    time: '11:30',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Post-procedure check',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com'
  },
  {
    id: 16,
    patientId: 5,
    patientName: 'Liam Foster',
    date: '2025-10-15',
    time: '09:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 60,
    status: 'confirmed',
    notes: 'PSA monitoring',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com'
  },
  {
    id: 17,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-22',
    time: '13:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 45,
    status: 'confirmed',
    notes: 'Treatment review',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 18,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-29',
    time: '16:00',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 30,
    status: 'confirmed',
    notes: 'Surveillance appointment',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  },
  {
    id: 19,
    patientId: 3,
    patientName: 'Noah Parker',
    date: '2025-10-01',
    time: '08:30',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Initial consultation',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com'
  },
  {
    id: 20,
    patientId: 4,
    patientName: 'Ava Reynolds',
    date: '2025-10-02',
    time: '15:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 45,
    status: 'confirmed',
    notes: 'Diagnostic imaging',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com'
  },
  {
    id: 21,
    patientId: 5,
    patientName: 'Liam Foster',
    date: '2025-10-04',
    time: '11:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Follow-up consultation',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com'
  },
  {
    id: 22,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-05',
    time: '14:15',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 60,
    status: 'confirmed',
    notes: 'Biopsy procedure',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 23,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-08',
    time: '09:45',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 45,
    status: 'confirmed',
    notes: 'Treatment planning',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  },
  {
    id: 24,
    patientId: 3,
    patientName: 'Noah Parker',
    date: '2025-10-09',
    time: '13:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 30,
    status: 'confirmed',
    notes: 'Lab results review',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com'
  },
  {
    id: 25,
    patientId: 4,
    patientName: 'Ava Reynolds',
    date: '2025-10-14',
    time: '10:15',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Post-treatment check',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com'
  },
  {
    id: 26,
    patientId: 5,
    patientName: 'Liam Foster',
    date: '2025-10-16',
    time: '16:45',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 45,
    status: 'confirmed',
    notes: 'Monitoring scan',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com'
  },
  {
    id: 27,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-19',
    time: '08:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Early morning consultation',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 28,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-21',
    time: '12:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 60,
    status: 'confirmed',
    notes: 'Comprehensive evaluation',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  },
  {
    id: 29,
    patientId: 3,
    patientName: 'Noah Parker',
    date: '2025-10-23',
    time: '15:00',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 45,
    status: 'confirmed',
    notes: 'Treatment discussion',
    phone: '(555) 345-6789',
    email: 'noah.parker@example.com'
  },
  {
    id: 30,
    patientId: 4,
    patientName: 'Ava Reynolds',
    date: '2025-10-24',
    time: '11:45',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 30,
    status: 'confirmed',
    notes: 'Follow-up procedure',
    phone: '(555) 456-7890',
    email: 'ava.reynolds@example.com'
  },
  {
    id: 31,
    patientId: 5,
    patientName: 'Liam Foster',
    date: '2025-10-26',
    time: '09:15',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Recovery assessment',
    phone: '(555) 567-8901',
    email: 'liam.foster@example.com'
  },
  {
    id: 32,
    patientId: 1,
    patientName: 'Ethan Carter',
    date: '2025-10-27',
    time: '14:30',
    type: 'Investigation',
    typeColor: 'purple',
    duration: 45,
    status: 'confirmed',
    notes: 'Diagnostic review',
    phone: '(555) 123-4567',
    email: 'ethan.carter@example.com'
  },
  {
    id: 33,
    patientId: 2,
    patientName: 'Olivia Bennett',
    date: '2025-10-31',
    time: '10:30',
    type: 'Urologist',
    typeColor: 'teal',
    duration: 30,
    status: 'confirmed',
    notes: 'Monthly check-up',
    phone: '(555) 234-5678',
    email: 'olivia.bennett@example.com'
  }
];

// Helper function to get appointments by date
export const getAppointmentsByDate = (date) => {
  return appointmentsData.filter(appointment => appointment.date === date);
};

// Helper function to get appointment by ID
export const getAppointmentById = (id) => {
  return appointmentsData.find(appointment => appointment.id === id);
};

// Helper function to get all appointments
export const getAllAppointments = () => {
  return appointmentsData;
};

// Helper function to update appointment date
export const updateAppointmentDate = (appointmentId, newDate, newTime) => {
  const appointmentIndex = appointmentsData.findIndex(app => app.id === appointmentId);
  if (appointmentIndex !== -1) {
    appointmentsData[appointmentIndex].date = newDate;
    appointmentsData[appointmentIndex].time = newTime;
    return appointmentsData[appointmentIndex];
  }
  return null;
};

