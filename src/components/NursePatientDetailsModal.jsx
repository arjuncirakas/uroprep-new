import React, { useState } from 'react';
import { IoClose, IoTimeSharp, IoMedical, IoCheckmarkCircle, IoDocumentText, IoAnalytics, IoDocument, IoHeart, IoCheckmark, IoAlertCircle, IoCalendar } from 'react-icons/io5';
import { FaNotesMedical, FaUserMd, FaUserNurse, FaFileMedical, FaFlask, FaPills, FaStethoscope } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { Plus, Upload, Eye, Download, Trash } from 'lucide-react';
import SuccessModal from './SuccessModal';
import MDTSchedulingModal from './MDTSchedulingModal';
import AddInvestigationModal from './AddInvestigationModal';

const NursePatientDetailsModal = ({ isOpen, onClose, patient }) => {
  const [activeTab, setActiveTab] = useState('clinicalNotes');
  const [noteContent, setNoteContent] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successModalTitle, setSuccessModalTitle] = useState('');
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [isPSAHistoryModalOpen, setIsPSAHistoryModalOpen] = useState(false);
  const [isOtherTestsHistoryModalOpen, setIsOtherTestsHistoryModalOpen] = useState(false);
  const [isMDTSchedulingModalOpen, setIsMDTSchedulingModalOpen] = useState(false);
  const [isAddInvestigationModalOpen, setIsAddInvestigationModalOpen] = useState(false);
  
  
  const [medicationDetails, setMedicationDetails] = useState({
    medications: [{
      id: Date.now(),
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }]
  });
  
  const [appointmentBooking, setAppointmentBooking] = useState({
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });
  
  const [recurringAppointments, setRecurringAppointments] = useState({
    interval: '3'
  });

  // Helper functions for timeline icons and colors
  const getNoteIcon = (type) => {
    if (!type) return <IoDocumentText className="text-teal-600" />;
    
    switch (type.toLowerCase()) {
      case 'post-op check':
        return <IoCheckmarkCircle className="text-green-600" />;
      case 'follow-up appointment':
        return <IoMedical className="text-blue-600" />;
      case 'initial consultation':
        return <IoDocumentText className="text-purple-600" />;
      case 'pre-op assessment':
        return <IoMedical className="text-orange-600" />;
      case 'patient intake':
        return <IoDocumentText className="text-indigo-600" />;
      case 'vital signs check':
        return <IoCheckmarkCircle className="text-emerald-600" />;
      default:
        return <IoDocumentText className="text-teal-600" />;
    }
  };

  const getDesignationIcon = (designation) => {
    if (!designation) return <FaUserMd className="text-gray-600" />;
    
    switch (designation.toLowerCase()) {
      case 'urologist':
        return <FaUserMd className="text-teal-600" />;
      case 'nurse':
        return <FaUserNurse className="text-blue-600" />;
      default:
        return <FaUserMd className="text-gray-600" />;
    }
  };

  const getDesignationColor = (designation) => {
    if (!designation) return 'text-gray-600 bg-gray-50';
    
    switch (designation.toLowerCase()) {
      case 'urologist':
        return 'text-teal-600 bg-teal-50';
      case 'nurse':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isOpen || !patient) return null;

  // Sample clinical notes data - in a real app this would come from props or API
  // For new patients, clinical notes should be empty
  const clinicalNotes = patient.category === 'new' ? [] : [
    {
      id: 1,
      date: '2024-09-10 10:30 AM',
      author: 'Dr. Thompson',
      designation: 'Urologist',
      content: 'Patient recovering well from the procedure. Vitals are stable. Minimal pain reported. Incision site clean and dry.',
      type: 'Post-Op Check'
    },
    {
      id: 2,
      date: '2024-08-15 02:45 PM',
      author: 'Dr. Sarah Wilson',
      designation: 'Urologist',
      content: 'Discussed PSA results. Patient remains asymptomatic. Continue active monitoring.',
      type: 'Follow-up appointment'
    },
    {
      id: 3,
      date: '2024-07-20 09:15 AM',
      author: 'Nurse Jennifer Lee',
      designation: 'Nurse',
      content: 'Patient presented with urinary symptoms. Examination and initial PSA ordered.',
      type: 'Initial Consultation'
    },
    {
      id: 4,
      date: '2024-07-15 11:20 AM',
      author: 'Dr. Michael Chen',
      designation: 'Urologist',
      content: 'Pre-operative assessment completed. Patient cleared for procedure.',
      type: 'Pre-Op Assessment'
    },
    {
      id: 5,
      date: '2024-07-10 03:15 PM',
      author: 'Nurse Robert Davis',
      designation: 'Nurse',
      content: 'Initial patient intake completed. Medical history reviewed.',
      type: 'Patient Intake'
    },
    {
      id: 6,
      date: '2024-06-25 01:30 PM',
      author: 'Dr. Emily Rodriguez',
      designation: 'Urologist',
      content: 'Follow-up consultation completed. Patient shows good progress. Continue current treatment plan.',
      type: 'Follow-up appointment'
    },
    {
      id: 7,
      date: '2024-06-20 10:45 AM',
      author: 'Nurse David Kim',
      designation: 'Nurse',
      content: 'Vital signs recorded. Blood pressure stable. Patient reports no new symptoms.',
      type: 'Vital Signs Check'
    }
  ];

  // Sample MDT notes data
  const mdtNotes = [
    {
      date: '2024-09-15',
      time: '02:00 PM',
      author: 'Dr. Thompson',
      designation: 'Urologist',
      meetingDate: '2024-09-15',
      attendees: ['Dr. Thompson (Urologist)', 'Dr. Miller (Oncologist)', 'Dr. Peterson (Radiologist)', 'Dr. Williams (Pathologist)'],
      content: 'MDT reviewed case of 62-year-old male with elevated PSA (4.5 ng/mL) and positive biopsy showing Gleason 7 (3+4) prostate cancer. Imaging shows localized disease with no evidence of metastasis.',
      recommendations: [
        'Recommend active surveillance with PSA monitoring every 3 months',
        'Consider MRI in 6 months to assess disease progression',
        'Patient suitable for radical prostatectomy if progression noted'
      ],
      actionItems: [
        'Schedule follow-up PSA in 3 months',
        'Arrange patient consultation to discuss surveillance plan',
        'Book MRI for 6 months time'
      ],
      documents: [
        { id: 1, name: 'Biopsy Report - Sept 2024.pdf', type: 'pdf', uploadDate: '2024-09-14', size: '2.4 MB' },
        { id: 2, name: 'MRI Scan Results.pdf', type: 'pdf', uploadDate: '2024-09-12', size: '5.1 MB' },
        { id: 3, name: 'PSA Trend Analysis.xlsx', type: 'excel', uploadDate: '2024-09-14', size: '156 KB' }
      ]
    },
    {
      date: '2024-07-22',
      time: '02:00 PM',
      author: 'Dr. Sarah Wilson',
      designation: 'Urologist',
      meetingDate: '2024-07-22',
      attendees: ['Dr. Wilson (Urologist)', 'Dr. Chen (Oncologist)', 'Dr. Anderson (Radiologist)'],
      content: 'Initial MDT discussion following biopsy results. Histopathology confirms adenocarcinoma with clear margins. No evidence of lymph node involvement on CT.',
      recommendations: [
        'Patient is a good candidate for robotic-assisted radical prostatectomy',
        'Alternative option: External beam radiotherapy with hormone therapy',
        'Discuss fertility preservation if relevant'
      ],
      actionItems: [
        'Schedule surgical consultation',
        'Provide patient information leaflets',
        'Arrange pre-operative assessment'
      ],
      documents: [
        { id: 4, name: 'Histopathology Report.pdf', type: 'pdf', uploadDate: '2024-07-20', size: '1.8 MB' },
        { id: 5, name: 'CT Scan - Abdomen & Pelvis.pdf', type: 'pdf', uploadDate: '2024-07-18', size: '8.2 MB' }
      ]
    },
    {
      date: '2024-06-10',
      time: '02:00 PM',
      author: 'Dr. Michael Chen',
      designation: 'Urologist',
      meetingDate: '2024-06-10',
      attendees: ['Dr. Chen (Urologist)', 'Dr. Rodriguez (Oncologist)', 'Dr. Kim (Pathologist)'],
      content: 'Pre-biopsy MDT discussion. Patient presents with persistently elevated PSA (6.8 ng/mL) and abnormal DRE findings. Family history of prostate cancer noted.',
      recommendations: [
        'Proceed with TRUS-guided biopsy',
        'Consider mpMRI before biopsy to target suspicious areas',
        'Counsel patient on biopsy risks and benefits'
      ],
      actionItems: [
        'Book mpMRI scan',
        'Schedule biopsy procedure',
        'Provide patient information about biopsy'
      ],
      documents: [
        { id: 6, name: 'PSA History Report.pdf', type: 'pdf', uploadDate: '2024-06-08', size: '892 KB' },
        { id: 7, name: 'Family History Assessment.docx', type: 'word', uploadDate: '2024-06-09', size: '245 KB' }
      ]
    }
  ];

  // Sample discharge summary data
  const dischargeSummary = {
    dischargeDate: '2024-09-20',
    dischargeTime: '14:30',
    admissionDate: '2024-09-10',
    lengthOfStay: '10 days',
    consultantName: 'Dr. Thompson',
    ward: 'Urology Ward - Room 302',
    diagnosis: {
      primary: 'Localized Prostate Adenocarcinoma (Gleason 7, 3+4)',
      secondary: [
        'Benign Prostatic Hyperplasia',
        'Hypertension (controlled)'
      ]
    },
    procedure: {
      name: 'Robot-Assisted Laparoscopic Radical Prostatectomy',
      date: '2024-09-11',
      surgeon: 'Dr. Thompson',
      findings: 'Successful nerve-sparing radical prostatectomy performed. No intraoperative complications. Estimated blood loss: 150ml. All specimens sent for histopathology.'
    },
    clinicalSummary: 'Patient admitted for elective radical prostatectomy for localized prostate cancer. Pre-operative assessment satisfactory. Surgery performed without complications. Post-operative recovery uncomplicated with good pain control. Patient mobilizing well. Catheter in-situ with clear urine output. Patient educated on catheter care and pelvic floor exercises.',
    investigations: [
      { test: 'PSA', result: '4.5 ng/mL', date: '2024-09-05' },
      { test: 'Full Blood Count', result: 'Within normal limits', date: '2024-09-09' },
      { test: 'Renal Function', result: 'eGFR >60 ml/min', date: '2024-09-09' },
      { test: 'ECG', result: 'Normal sinus rhythm', date: '2024-09-09' }
    ],
    medications: {
      discharged: [
        { name: 'Tamsulosin', dose: '400mcg', frequency: 'Once daily', duration: '4 weeks', instructions: 'Take in the morning after food' },
        { name: 'Paracetamol', dose: '1g', frequency: 'Four times daily', duration: '1 week', instructions: 'For pain relief as needed' },
        { name: 'Diclofenac', dose: '50mg', frequency: 'Three times daily', duration: '5 days', instructions: 'Take with food. For pain relief' },
        { name: 'Amlodipine', dose: '5mg', frequency: 'Once daily', duration: 'Continue', instructions: 'Continue regular medication for hypertension' }
      ],
      stopped: [
        { name: 'Aspirin 75mg', reason: 'Stopped 1 week pre-operatively' }
      ]
    },
    followUp: {
      catheterRemoval: {
        date: '2024-09-27',
        location: 'Urology Outpatient Clinic',
        instructions: 'Catheter to remain in-situ for 7 days. Attend clinic for removal and trial without catheter.'
      },
      postOpReview: {
        date: '2024-10-18',
        location: 'Urology Outpatient Clinic',
        instructions: 'Post-operative review with histology results. PSA check at 6 weeks.'
      },
      additionalInstructions: [
        'Pelvic floor exercises - information leaflet provided',
        'Avoid heavy lifting (>10kg) for 6 weeks',
        'Avoid driving for 2 weeks',
        'Contact urology team if fever, heavy bleeding, or concerns'
      ]
    },
    gpActions: [
      'Continue antihypertensive medication (Amlodipine 5mg OD)',
      'Patient may require support with catheter care',
      'Monitor for any complications and refer back if concerns',
      'Patient may experience urinary incontinence initially - this should improve with pelvic floor exercises'
    ],
    dischargedBy: 'Dr. Sarah Wilson, Urology Registrar',
    documents: [
      { id: 1, name: 'Discharge Summary Letter.pdf', type: 'pdf', size: '245 KB' },
      { id: 2, name: 'Patient Information - Post-Prostatectomy.pdf', type: 'pdf', size: '1.2 MB' },
      { id: 3, name: 'Medication Chart.pdf', type: 'pdf', size: '890 KB' }
    ]
  };

  // Latest PSA result - conditional based on patient category
  const latestPSA = (() => {
    // For new patients, use patient data or dummy data
    if (patient?.category === 'new') {
      return patient?.vitals?.latestPSA && patient.vitals.latestPSA !== '-' ? {
        id: 1,
        date: patient.vitals.psaDate || 'N/A',
        result: patient.vitals.latestPSA,
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Available',
        statusColor: 'blue',
        notes: 'Latest PSA result from patient data.'
      } : {
        id: 1,
        date: '2024-08-01',
        result: '3.2 ng/mL',
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Normal',
        statusColor: 'green',
        notes: 'Initial PSA screening result.'
      };
    }
    
    // For existing patients, use patient data or default
    return patient?.vitals?.latestPSA && patient.vitals.latestPSA !== '-' ? {
      id: 1,
      date: patient.vitals.psaDate || 'N/A',
      result: patient.vitals.latestPSA,
      referenceRange: '0.0 - 4.0 ng/mL',
      status: 'Available',
      statusColor: 'blue',
      notes: 'Latest PSA result from patient data.'
    } : {
      id: 1,
      date: '2024-09-05',
      result: '4.2 ng/mL',
      referenceRange: '0.0 - 4.0 ng/mL',
      status: 'Elevated',
      statusColor: 'red',
      notes: 'Slightly elevated PSA level. Recommend follow-up in 3 months.'
    };
  })();

  // Complete PSA history for modal - conditional based on patient category
  const psaHistory = (() => {
    // For new patients, show limited data
    if (patient?.category === 'new') {
      return patient?.vitals?.latestPSA && patient.vitals.latestPSA !== '-' ? [
        {
          id: 1,
          date: patient.vitals.psaDate || 'N/A',
          result: patient.vitals.latestPSA,
          referenceRange: '0.0 - 4.0 ng/mL',
          status: 'Available',
          statusColor: 'blue',
          notes: 'Latest PSA result from patient data.'
        }
      ] : [
        // Dummy PSA result for new patients with no data
        {
          id: 1,
          date: '2024-08-01',
          result: '3.2 ng/mL',
          referenceRange: '0.0 - 4.0 ng/mL',
          status: 'Normal',
          statusColor: 'green',
          notes: 'Initial PSA screening result.'
        }
      ];
    }
    
    // For existing patients (surgical pathway, post-op followup), show full history
    return [
      {
        id: 1,
        date: '2024-09-05',
        result: '4.2 ng/mL',
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Elevated',
        statusColor: 'red',
        notes: 'Slightly elevated PSA level. Recommend follow-up in 3 months.'
      },
      {
        id: 2,
        date: '2024-06-15',
        result: '3.8 ng/mL',
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Normal',
        statusColor: 'green',
        notes: 'PSA level within normal range.'
      },
      {
        id: 3,
        date: '2024-03-20',
        result: '3.5 ng/mL',
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Normal',
        statusColor: 'green',
        notes: 'Stable PSA level. Continue monitoring.'
      },
      {
        id: 4,
        date: '2023-12-10',
        result: '3.2 ng/mL',
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Normal',
        statusColor: 'green',
        notes: 'PSA level stable.'
      },
      {
        id: 5,
        date: '2023-09-15',
        result: '3.0 ng/mL',
        referenceRange: '0.0 - 4.0 ng/mL',
        status: 'Normal',
        statusColor: 'green',
        notes: 'Baseline PSA level.'
      }
    ];
  })();

  // Latest other test results - conditional based on patient category
  const latestOtherTests = (() => {
    // For new patients, show no other test results (only PSA)
    if (patient?.category === 'new') {
      return [];
    }
    
    // For existing patients (surgical pathway, post-op followup), show full data
    return [
      {
        id: 1,
        testName: 'MRI Prostate',
        date: '2024-08-15',
        result: 'PI-RADS 3',
        referenceRange: 'PI-RADS 1-5',
        status: 'Intermediate',
        statusColor: 'yellow',
        notes: 'Intermediate suspicion lesion in peripheral zone. Consider biopsy.'
      },
      {
        id: 2,
        testName: 'Biopsy - Prostate',
        date: '2024-08-10',
        result: 'Gleason 3+3=6',
        referenceRange: 'Gleason 6-10',
        status: 'Low Risk',
        statusColor: 'green',
        notes: 'Low-grade prostate cancer. 2 of 12 cores positive.'
      },
      {
        id: 3,
        testName: 'TRUS (Transrectal Ultrasound)',
        date: '2024-08-05',
        result: 'Volume: 45cc',
        referenceRange: 'N/A',
        status: 'Normal',
        statusColor: 'green',
        notes: 'Prostate volume within normal range. No suspicious lesions detected.'
      }
    ];
  })();

  // Complete other tests history for modal - conditional based on patient category
  const otherTestsHistory = (() => {
    // For new patients, show no other test results (only PSA)
    if (patient?.category === 'new') {
      return [];
    }
    
    // For existing patients (surgical pathway, post-op followup), show full history
    return [
      {
        id: 1,
        testName: 'MRI Prostate',
        date: '2024-08-15',
        result: 'PI-RADS 3',
        referenceRange: 'PI-RADS 1-5',
        status: 'Intermediate',
        statusColor: 'yellow',
        notes: 'Intermediate suspicion lesion in peripheral zone. Consider biopsy.'
      },
      {
        id: 2,
        testName: 'Biopsy - Prostate',
        date: '2024-08-10',
        result: 'Gleason 3+3=6',
        referenceRange: 'Gleason 6-10',
        status: 'Low Risk',
        statusColor: 'green',
        notes: 'Low-grade prostate cancer. 2 of 12 cores positive.'
      },
      {
        id: 3,
        testName: 'TRUS (Transrectal Ultrasound)',
        date: '2024-08-05',
        result: 'Volume: 45cc',
        referenceRange: 'N/A',
        status: 'Normal',
        statusColor: 'green',
        notes: 'Prostate volume within normal range. No suspicious lesions detected.'
      },
      {
        id: 4,
        testName: 'CT Scan - Pelvis',
        date: '2024-07-20',
        result: 'Normal',
        referenceRange: 'N/A',
        status: 'Normal',
        statusColor: 'green',
        notes: 'No evidence of lymph node enlargement or distant metastases.'
      },
      {
        id: 5,
        testName: 'Urinalysis',
        date: '2024-07-15',
        result: 'Normal',
        referenceRange: 'N/A',
        status: 'Normal',
        statusColor: 'green',
        notes: 'No signs of infection or blood in urine.'
      }
    ];
  })();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'low risk':
        return 'bg-green-100 text-green-700';
      case 'elevated':
      case 'high risk':
        return 'bg-red-100 text-red-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'available':
        return 'bg-blue-100 text-blue-700';
      case 'not available':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      // In a real app, this would save to a database or API
      console.log('Saving note:', { content: noteContent });
      
      // Reset form fields
      setNoteContent('');
      
      // Show success modal
      setSuccessModalTitle('Note Saved');
      setSuccessModalMessage('Clinical note has been saved successfully!');
      setIsSuccessModalOpen(true);
    }
  };

  // Get document icon based on file type
  const getDocumentIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <IoDocument className="text-red-600" />;
      case 'word':
      case 'docx':
      case 'doc':
        return <IoDocument className="text-blue-600" />;
      case 'excel':
      case 'xlsx':
      case 'xls':
        return <IoDocument className="text-green-600" />;
      default:
        return <IoDocument className="text-gray-600" />;
    }
  };

  // Handle view document
  const handleViewDocument = (document) => {
    console.log('Viewing document:', document.name);
    setSuccessModalTitle('View Document');
    setSuccessModalMessage(`Opening ${document.name}...`);
    setIsSuccessModalOpen(true);
  };

  // Handle view test report
  const handleViewReport = (test) => {
    console.log('Viewing report for:', test.testName);
    // In a real app, this would open a report viewer or modal
    setSuccessModalTitle('View Report');
    setSuccessModalMessage(`Opening report for ${test.testName}...`);
    setIsSuccessModalOpen(true);
  };

  // Medication management functions
  const addMedication = () => {
    setMedicationDetails(prev => ({
      ...prev,
      medications: [...prev.medications, {
        id: Date.now(),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }]
    }));
  };

  const removeMedication = (id) => {
    if (medicationDetails.medications.length > 1) {
      setMedicationDetails(prev => ({
        ...prev,
        medications: prev.medications.filter(med => med.id !== id)
      }));
    }
  };

  const updateMedication = (id, field, value) => {
    setMedicationDetails(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.id === id ? { ...med, [field]: value } : med
      )
    }));
  };

  
  // Generate time slots for appointment booking
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="bg-teal-50 text-teal-900 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <div className="text-right">
                  <div className="text-sm font-medium text-teal-800">Referred by</div>
                  <div className="text-sm text-teal-700">Dr. Sarah Johnson (GP)</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-teal-700">
                <span>{patient.age}, {patient.gender}</span>
                <span>Patient ID: {patient.patientId}</span>
                <span>MRN: {patient.mrn}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white hover:bg-teal-50 text-teal-600 hover:text-teal-700 rounded-full p-2 transition-colors border border-teal-200 ml-4"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('clinicalNotes')}
              className={`px-4 py-3 font-medium text-sm relative flex items-center ${
                activeTab === 'clinicalNotes'
                  ? 'text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaNotesMedical className="mr-2" />
              Clinical Notes
              {activeTab === 'clinicalNotes' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('testResults')}
              className={`px-4 py-3 font-medium text-sm relative flex items-center ${
                activeTab === 'testResults'
                  ? 'text-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <IoAnalytics className="mr-2" />
              Clinical Investigation
              {activeTab === 'testResults' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
              )}
            </button>
            
            {/* MDT Notes tab - only visible for surgery-pathway and post-op-followup patients */}
            {(patient.category === 'surgery-pathway' || patient.category === 'post-op-followup') && (
              <button
                onClick={() => setActiveTab('mdtNotes')}
                className={`px-4 py-3 font-medium text-sm relative flex items-center ${
                  activeTab === 'mdtNotes'
                    ? 'text-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaUserMd className="mr-2" />
                MDT Notes
                {activeTab === 'mdtNotes' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                )}
              </button>
            )}
            
            {/* Discharge Summary tab - only visible for post-op-followup patients */}
            {patient.category === 'post-op-followup' && (
              <button
                onClick={() => setActiveTab('dischargeSummary')}
                className={`px-4 py-3 font-medium text-sm relative flex items-center ${
                  activeTab === 'dischargeSummary'
                    ? 'text-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <IoDocumentText className="mr-2" />
                Discharge Summary
                {activeTab === 'dischargeSummary' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          {activeTab === 'clinicalNotes' && (
            <div className="flex w-full">
              {/* Add Clinical Note Section - Fixed */}
              <div className="w-1/2 p-2 sm:p-3 lg:p-6 border-r border-gray-200 flex flex-col min-h-0">
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 lg:p-5 border border-gray-200 flex flex-col h-full min-h-0">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4 flex items-center flex-shrink-0">
                    <FaNotesMedical className="mr-1 sm:mr-2 text-teal-600" />
                    Add Clinical Note
                  </h3>
                  
                  <div className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 flex flex-col min-h-0 mb-3">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex-shrink-0">
                        Note Content
                      </label>
                      <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Enter clinical note details..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none flex-1 min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex justify-between space-x-3 flex-shrink-0">
                      <button
                        onClick={() => {
                          setNoteContent('');
                        }}
                        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleSaveNote}
                        className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center"
                      >
                        <FaNotesMedical className="mr-2" />
                        Save Note
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 mt-2 sm:mt-3 lg:mt-4 pt-2 sm:pt-3 lg:pt-4 flex-shrink-0">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsMDTSchedulingModalOpen(true)}
                        className="flex-1 px-3 py-3 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors flex items-center justify-center"
                      >
                        <FaUserNurse className="mr-2" />
                        Schedule MDT
                      </button>
                      <button
                        onClick={() => setIsAddInvestigationModalOpen(true)}
                        className="flex-1 px-3 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
                      >
                        <FaFlask className="mr-2" />
                        Add Investigation
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Notes Timeline - Scrollable */}
              <div className="w-1/2 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BsClockHistory className="mr-2 text-teal-600" />
                    Clinical Notes Timeline
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                  {clinicalNotes.length > 0 ? (
                    <div className="space-y-6">
                      {clinicalNotes.map((note, index) => (
                        <div key={note.id} className="flex gap-4">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                              <IoDocumentText className="text-teal-600" />
                            </div>
                            {index < clinicalNotes.length - 1 && (
                              <div className="w-0.5 h-16 bg-teal-100 mt-2"></div>
                            )}
                          </div>
                          
                          {/* Note content */}
                          <div className="flex-1 pb-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                              {/* Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
                                    {note.designation || 'Staff'}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500 flex items-center">
                                  <IoTimeSharp className="mr-1" />
                                  {note.date || 'No date'}
                                </span>
                              </div>
                              
                              {/* Content */}
                              <p className="text-gray-700 leading-relaxed mb-4">{note.content || 'No content available'}</p>
                              
                              {/* Author */}
                              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                  {getDesignationIcon(note.designation)}
                                  <span className="text-sm font-medium text-gray-900">{note.author}</span>
                                </div>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{note.designation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <BsClockHistory className="text-2xl text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No Clinical Notes</h4>
                      <p className="text-gray-500">No clinical notes have been recorded for this patient yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testResults' && (
            <div className="flex w-full h-full">
              {/* PSA Results Section - Left Side */}
              <div className="w-1/2 p-6 border-r border-gray-200">
                <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <IoAnalytics className="mr-2 text-teal-600" />
                      PSA Results
                    </h3>
                    <button
                      onClick={() => setIsPSAHistoryModalOpen(true)}
                      className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium"
                    >
                      View History
                    </button>
                  </div>
                </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    {latestPSA ? (
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">PSA (Prostate Specific Antigen)</h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(latestPSA.status)}`}>
                                  {latestPSA.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                Date: {latestPSA.date}
                              </div>
                            </div>
                            <button 
                              onClick={() => handleViewReport(latestPSA)}
                              className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                            >
                              View
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 mb-3">
                            <div>
                              <span className="text-sm font-medium text-gray-700">Result:</span>
                              <span className="ml-2 text-sm text-gray-900">{latestPSA.result}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700">Reference Range:</span>
                              <span className="ml-2 text-sm text-gray-600">{latestPSA.referenceRange}</span>
                            </div>
                          </div>
                          
                          {latestPSA.notes && (
                            <div className="pt-3 border-t border-gray-200">
                              <span className="text-sm font-medium text-gray-700">Notes:</span>
                              <p className="text-sm text-gray-600 mt-1">{latestPSA.notes}</p>
                            </div>
                          )}
                        </div>
                        
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                          <IoAnalytics className="text-xl text-gray-400" />
                        </div>
                        <h4 className="text-base font-medium text-gray-900 mb-1">No PSA Results</h4>
                        <p className="text-gray-500 text-sm">No PSA results have been recorded for this patient yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Other Test Results Section - Right Side */}
              <div className="w-1/2 p-6">
                <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <IoDocument className="mr-2 text-teal-600" />
                      Other Test Results & Reports
                    </h3>
                    <button
                      onClick={() => setIsOtherTestsHistoryModalOpen(true)}
                      className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium"
                    >
                      View History
                    </button>
                  </div>
                </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    {latestOtherTests.length > 0 ? (
                      <div className="space-y-4">
                        {latestOtherTests.map((test) => (
                          <div key={test.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-gray-900">{test.testName}</h4>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                                    {test.status}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  Date: {test.date}
                                </div>
                              </div>
                              <button 
                                onClick={() => handleViewReport(test)}
                                className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                              >
                                View
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 mb-3">
                              <div>
                                <span className="text-sm font-medium text-gray-700">Result:</span>
                                <span className="ml-2 text-sm text-gray-900">{test.result}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700">Reference Range:</span>
                                <span className="ml-2 text-sm text-gray-600">{test.referenceRange}</span>
                              </div>
                            </div>
                            
                            {test.notes && (
                              <div className="pt-3 border-t border-gray-200">
                                <span className="text-sm font-medium text-gray-700">Notes:</span>
                                <p className="text-sm text-gray-600 mt-1">{test.notes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                        
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                          <IoDocument className="text-xl text-gray-400" />
                        </div>
                        <h4 className="text-base font-medium text-gray-900 mb-1">No Test Results</h4>
                        <p className="text-gray-500 text-sm">No other test results have been recorded for this patient yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MDT Notes Tab - only for surgery-pathway and post-op-followup patients */}
          {activeTab === 'mdtNotes' && (patient.category === 'surgery-pathway' || patient.category === 'post-op-followup') && (
            <div className="flex w-full h-full p-6">
              {/* MDT Notes Timeline - Full Width */}
              <div className="w-full flex flex-col min-h-0">
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full min-h-0">
                  <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <BsClockHistory className="mr-2 text-teal-600" />
                      MDT Discussion History
                    </h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                    {mdtNotes.length > 0 ? (
                      mdtNotes.map((note, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={`p-2 rounded-full ${getDesignationColor(note.designation)}`}>
                                {getDesignationIcon(note.designation)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{note.author}</p>
                                <p className="text-xs text-gray-500">{note.designation}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">{note.date}</p>
                              <p className="text-xs text-gray-500">{note.time}</p>
                            </div>
                          </div>
                          
                          {note.meetingDate && (
                            <div className="mb-2 pb-2 border-b border-gray-200">
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">MDT Meeting Date:</span> {note.meetingDate}
                              </p>
                            </div>
                          )}
                          
                          {note.attendees && note.attendees.length > 0 && (
                            <div className="mb-2 pb-2 border-b border-gray-200">
                              <p className="text-xs font-medium text-gray-700 mb-1">Attendees:</p>
                              <div className="flex flex-wrap gap-1">
                                {note.attendees.map((attendee, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full">
                                    {attendee}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="mb-2">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                          </div>
                          
                          {note.recommendations && note.recommendations.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs font-medium text-gray-700 mb-1">Recommendations:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {note.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-xs text-gray-600">{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {note.actionItems && note.actionItems.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs font-medium text-gray-700 mb-1">Action Items:</p>
                              <ul className="space-y-1">
                                {note.actionItems.map((item, idx) => (
                                  <li key={idx} className="flex items-start space-x-1 text-xs text-gray-600">
                                    <IoCheckmarkCircle className="text-teal-600 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {note.documents && note.documents.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs font-medium text-gray-700 mb-2">Uploaded Documents:</p>
                              <div className="space-y-2">
                                {note.documents.map((doc) => (
                                  <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 hover:border-teal-300 transition-colors">
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                      <div className="flex-shrink-0 text-lg">
                                        {getDocumentIcon(doc.type)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-900 truncate">{doc.name}</p>
                                        <p className="text-[10px] text-gray-500">
                                          {doc.size} • Uploaded {doc.uploadDate}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleViewDocument(doc)}
                                      className="flex-shrink-0 ml-2 px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors flex items-center"
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      View
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaUserMd className="text-xl text-gray-400" />
                        </div>
                        <h4 className="text-base font-medium text-gray-900 mb-1">No MDT Notes</h4>
                        <p className="text-gray-500 text-sm">No MDT discussions have been documented for this patient yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discharge Summary Tab - only for post-op-followup patients */}
          {activeTab === 'dischargeSummary' && patient.category === 'post-op-followup' && (
            <div className="flex w-full h-full overflow-y-auto p-6">
              <div className="w-full mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Discharge Summary</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Discharged
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Patient Name</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{patient.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">MRN</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{patient.mrn}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Admission Date</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{dischargeSummary.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Discharge Date</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{dischargeSummary.dischargeDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Length of Stay</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{dischargeSummary.lengthOfStay}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Consultant</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{dischargeSummary.consultantName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Ward</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{dischargeSummary.ward}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Discharge Time</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{dischargeSummary.dischargeTime}</p>
                    </div>
                  </div>
                </div>

                {/* Diagnosis Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <IoMedical className="mr-2 text-teal-600" />
                    Diagnosis
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Primary Diagnosis:</p>
                      <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded">{dischargeSummary.diagnosis.primary}</p>
                    </div>
                    {dischargeSummary.diagnosis.secondary.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Secondary Diagnosis:</p>
                        <ul className="mt-1 space-y-1">
                          {dischargeSummary.diagnosis.secondary.map((diag, idx) => (
                            <li key={idx} className="text-sm text-gray-900 bg-gray-50 p-2 rounded">• {diag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Procedure Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaStethoscope className="mr-2 text-teal-600" />
                    Procedure Details
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Procedure:</p>
                        <p className="text-sm text-gray-900 mt-1">{dischargeSummary.procedure.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Date:</p>
                        <p className="text-sm text-gray-900 mt-1">{dischargeSummary.procedure.date}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-700">Surgeon:</p>
                        <p className="text-sm text-gray-900 mt-1">{dischargeSummary.procedure.surgeon}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Operative Findings:</p>
                      <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded">{dischargeSummary.procedure.findings}</p>
                    </div>
                  </div>
                </div>

                {/* Clinical Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <IoDocumentText className="mr-2 text-teal-600" />
                    Clinical Summary
                  </h3>
                  <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-4 rounded">{dischargeSummary.clinicalSummary}</p>
                </div>

                {/* Investigations */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <IoAnalytics className="mr-2 text-teal-600" />
                    Investigations
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Test</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Result</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dischargeSummary.investigations.map((inv, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-sm text-gray-900">{inv.test}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{inv.result}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{inv.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Medications */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaPills className="mr-2 text-teal-600" />
                    Medications on Discharge
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Current Medications:</p>
                      <div className="space-y-2">
                        {dischargeSummary.medications.discharged.map((med, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">{med.name} - {med.dose}</p>
                                <p className="text-xs text-gray-600 mt-1">{med.frequency} for {med.duration}</p>
                                <p className="text-xs text-gray-600 mt-1 italic">{med.instructions}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {dischargeSummary.medications.stopped.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Medications Stopped:</p>
                        <div className="space-y-2">
                          {dischargeSummary.medications.stopped.map((med, idx) => (
                            <div key={idx} className="bg-red-50 p-3 rounded border border-red-200">
                              <p className="text-sm font-semibold text-gray-900">{med.name}</p>
                              <p className="text-xs text-gray-600 mt-1">Reason: {med.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up Arrangements */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <IoCalendar className="mr-2 text-teal-600" />
                    Follow-up Arrangements
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded border border-blue-200">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Catheter Removal</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Date:</span> {dischargeSummary.followUp.catheterRemoval.date}</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Location:</span> {dischargeSummary.followUp.catheterRemoval.location}</p>
                      <p className="text-sm text-gray-700 mt-2">{dischargeSummary.followUp.catheterRemoval.instructions}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded border border-green-200">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Post-Operative Review</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Date:</span> {dischargeSummary.followUp.postOpReview.date}</p>
                      <p className="text-sm text-gray-700"><span className="font-medium">Location:</span> {dischargeSummary.followUp.postOpReview.location}</p>
                      <p className="text-sm text-gray-700 mt-2">{dischargeSummary.followUp.postOpReview.instructions}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Additional Instructions:</p>
                      <ul className="space-y-1">
                        {dischargeSummary.followUp.additionalInstructions.map((instruction, idx) => (
                          <li key={idx} className="text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-start">
                            <IoCheckmarkCircle className="text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* GP Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaUserMd className="mr-2 text-teal-600" />
                    Actions Required by GP
                  </h3>
                  <ul className="space-y-2">
                    {dischargeSummary.gpActions.map((action, idx) => (
                      <li key={idx} className="text-sm text-gray-900 bg-yellow-50 p-3 rounded border border-yellow-200 flex items-start">
                        <IoAlertCircle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <IoDocument className="mr-2 text-teal-600" />
                    Discharge Documents
                  </h3>
                  <div className="space-y-2">
                    {dischargeSummary.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:border-teal-300 transition-colors">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="flex-shrink-0 text-xl">
                            {getDocumentIcon(doc.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="flex-shrink-0 ml-3 px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Discharged by:</span> {dischargeSummary.dischargedBy}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Document generated on {dischargeSummary.dischargeDate} at {dischargeSummary.dischargeTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>


      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={successModalTitle}
        message={successModalMessage}
      />

      {/* PSA History Modal */}
      {isPSAHistoryModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-teal-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">PSA History</h2>
                  <p className="text-teal-100 mt-1">PSA monitoring history for {patient.name}</p>
                </div>
                <button
                  onClick={() => setIsPSAHistoryModalOpen(false)}
                  className="bg-teal-600 hover:bg-teal-500 rounded-full p-2 transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* PSA Trend Graph */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">PSA Trend</h3>
                  <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 p-4">
                    {/* Simple line chart representation */}
                    <div className="relative h-full">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                        <span>10</span>
                        <span>8</span>
                        <span>6</span>
                        <span>4</span>
                        <span>2</span>
                        <span>0</span>
                      </div>
                      
                      {/* Chart area */}
                      <div className="ml-8 h-full relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0">
                          {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className="absolute w-full border-t border-gray-200" style={{top: `${i * 20}%`}}></div>
                          ))}
                        </div>
                        
                        {/* Data points and line */}
                        <div className="absolute inset-0">
                          {/* Line connecting points */}
                          <svg className="w-full h-full">
                            <polyline
                              fill="none"
                              stroke="#0d9488"
                              strokeWidth="2"
                              points="20,80 120,60 220,40"
                            />
                            {/* Data points */}
                            <circle cx="20" cy="80" r="4" fill="#0d9488" />
                            <circle cx="120" cy="60" r="4" fill="#0d9488" />
                            <circle cx="220" cy="40" r="4" fill="#0d9488" />
                          </svg>
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                          <span>Apr 2024</span>
                          <span>Jul 2024</span>
                          <span>Sep 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PSA Test History Table */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">PSA Test History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">DATE</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">PSA VALUE (NG/ML)</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">STATUS</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">NOTES</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {psaHistory.map((psa) => (
                          <tr key={psa.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-sm text-gray-900">{psa.date}</td>
                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">{psa.result}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(psa.status)}`}>
                                {psa.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{psa.notes || 'No notes'}</td>
                            <td className="py-3 px-4">
                              <button 
                                onClick={() => handleViewReport(psa)}
                                className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsPSAHistoryModalOpen(false)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Tests History Modal */}
      {isOtherTestsHistoryModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-teal-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Test Results History</h2>
                <button
                  onClick={() => setIsOtherTestsHistoryModalOpen(false)}
                  className="bg-teal-600 hover:bg-teal-500 rounded-full p-2 transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <p className="text-teal-100 mt-1">for {patient.name}</p>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {otherTestsHistory.length > 0 ? (
                <div className="space-y-6">
                  {/* Group tests by date */}
                {(() => {
                  // Group tests by date
                  const groupedTests = otherTestsHistory.reduce((groups, test) => {
                    const date = test.date;
                    if (!groups[date]) {
                      groups[date] = [];
                    }
                    groups[date].push(test);
                    return groups;
                  }, {});

                  // Sort dates in descending order (most recent first)
                  const sortedDates = Object.keys(groupedTests).sort((a, b) => new Date(b) - new Date(a));

                  return sortedDates.map((date) => (
                    <div key={date} className="space-y-4">
                      {/* Date Title */}
                      <div className="flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <div className="px-4">
                          <h3 className="text-lg font-semibold text-gray-800 bg-white px-3 py-1 rounded-lg border border-gray-200">
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </h3>
                        </div>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>

                      {/* Tests for this date */}
                      <div className="space-y-3">
                        {groupedTests[date].map((test) => (
                          <div key={test.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-gray-900">{test.testName}</h4>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                                    {test.status}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  Time: {test.date}
                                </div>
                              </div>
                              <button 
                                onClick={() => handleViewReport(test)}
                                className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                              >
                                View
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <span className="text-sm font-medium text-gray-700">Result:</span>
                                <span className="ml-2 text-sm text-gray-900">{test.result}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700">Reference Range:</span>
                                <span className="ml-2 text-sm text-gray-600">{test.referenceRange}</span>
                              </div>
                            </div>
                            
                            {test.notes && (
                              <div className="pt-3 border-t border-gray-200">
                                <span className="text-sm font-medium text-gray-700">Notes:</span>
                                <p className="text-sm text-gray-600 mt-1">{test.notes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
                </div>
              ) : (
                /* Empty State for No Test Results */
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <IoDocument className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Test Results Available</h3>
                  <p className="text-center text-gray-500 max-w-md">
                    No other test results have been recorded for this patient yet. 
                    Test results will appear here once they are added to the patient's record.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MDT Scheduling Modal */}
      <MDTSchedulingModal
        isOpen={isMDTSchedulingModalOpen}
        onClose={() => setIsMDTSchedulingModalOpen(false)}
        onScheduled={(mdtData) => {
          console.log('MDT Scheduled:', mdtData);
          // Handle successful MDT scheduling
        }}
        patient={patient}
      />

      {/* Add Investigation Modal */}
      <AddInvestigationModal
        isOpen={isAddInvestigationModalOpen}
        onClose={() => setIsAddInvestigationModalOpen(false)}
        patient={patient}
        onSuccess={(message) => {
          setSuccessModalTitle('Investigation Requested');
          setSuccessModalMessage(message);
          setIsSuccessModalOpen(true);
          setIsAddInvestigationModalOpen(false);
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={successModalTitle}
        message={successModalMessage}
      />

      {/* Pathway Transfer Confirmation Modal - REMOVED FOR NURSE VERSION */}
      {false && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-teal-600 to-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <IoAlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Confirm Pathway Transfer
                    </h3>
                    <p className="text-white/80 text-sm">
                      Transfer to {selectedPathway}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsPathwayModalOpen(false);
                    setSelectedPathway('');
                    setTransferDetails({
                      reason: '',
                      priority: 'normal',
                      clinicalRationale: '',
                      additionalNotes: ''
                    });
                    setAppointmentBooking({
                      appointmentDate: '',
                      appointmentTime: '',
                      notes: ''
                    });
                    setRecurringAppointments({ interval: '3' });
                    setMedicationDetails({
                      medications: [{
                        id: Date.now(),
                        name: '',
                        dosage: '',
                        frequency: '',
                        duration: '',
                        instructions: ''
                      }]
                    });
                  }}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <IoClose className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {/* Patient Info Card */}
              <div className="mb-4 p-4 bg-white border-l-4 border-teal-600 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1">Patient</p>
                    <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-xs text-gray-600">ID: {patient.patientId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1 text-right">Transferring to</p>
                    <p className="text-sm font-semibold text-teal-600">{selectedPathway}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
                <div className="flex items-start space-x-2">
                  <IoAlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-900">
                    <span className="font-semibold">Note:</span> This action will update the patient's care pathway and notify the care team.
                  </p>
                </div>
              </div>

              {/* Medication Pathway Content */}
              {selectedPathway === 'Medication' && (
                <div className="mb-6">
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                          <FaPills className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">Medication Details</h4>
                          <p className="text-sm text-gray-600">Prescribe medications for patient</p>
                        </div>
                      </div>
                      <button
                        onClick={addMedication}
                        className="flex items-center px-3 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-sm"
                      >
                        <span className="mr-1">+</span> Add
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {medicationDetails.medications.map((medication, index) => (
                        <div key={medication.id} className="bg-gray-50 border border-gray-200 rounded p-3">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-gray-900 text-sm">Medication {index + 1}</h5>
                            {medicationDetails.medications.length > 1 && (
                              <button
                                onClick={() => removeMedication(medication.id)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <IoClose className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Medication Name *
                              </label>
                              <input
                                type="text"
                                value={medication.name}
                                onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                                placeholder="Enter medication name..."
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dosage *
                              </label>
                              <input
                                type="text"
                                value={medication.dosage}
                                onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                                placeholder="e.g., 5mg, 10ml"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Frequency *
                              </label>
                              <input
                                type="text"
                                value={medication.frequency}
                                onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                                placeholder="e.g., Once daily"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Duration
                              </label>
                              <input
                                type="text"
                                value={medication.duration}
                                onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                                placeholder="e.g., 30 days"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Special Instructions
                            </label>
                            <textarea
                              value={medication.instructions}
                              onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                              placeholder="Any special instructions..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Discharge Pathway Content */}
              {selectedPathway === 'Discharge' && (
                <div className="mb-6">
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                        <IoDocumentText className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Discharge Details</h4>
                        <p className="text-sm text-gray-600">Final discharge information</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discharge Reason *
                      </label>
                      <input
                        type="text"
                        value={transferDetails.reason}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, reason: e.target.value }))}
                        placeholder="Enter reason for discharge..."
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinical Summary *
                      </label>
                      <textarea
                        value={transferDetails.clinicalRationale}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, clinicalRationale: e.target.value }))}
                        placeholder="Provide detailed clinical summary..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={transferDetails.additionalNotes}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                        placeholder="Any additional notes..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Surgery Pathway Content */}
              {selectedPathway === 'Surgery Pathway' && (
                <div className="mb-6">
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                        <FaStethoscope className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Surgery Pathway Details</h4>
                        <p className="text-sm text-gray-600">Configure surgical pathway transfer</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reason for Surgery *
                        </label>
                        <input
                          type="text"
                          value={transferDetails.reason}
                          onChange={(e) => setTransferDetails(prev => ({ ...prev, reason: e.target.value }))}
                          placeholder="Enter reason..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority *
                        </label>
                        <select
                          value={transferDetails.priority}
                          onChange={(e) => setTransferDetails(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                        >
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinical Rationale *
                      </label>
                      <textarea
                        value={transferDetails.clinicalRationale}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, clinicalRationale: e.target.value }))}
                        placeholder="Provide detailed clinical justification for surgical pathway..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={transferDetails.additionalNotes}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                        placeholder="Any additional information or special considerations..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Radiotherapy Pathway Content */}
              {selectedPathway === 'Radiotherapy' && (
                <div className="mb-6">
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                        <IoMedical className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Radiotherapy Details</h4>
                        <p className="text-sm text-gray-600">Configure radiotherapy treatment pathway</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reason for Radiotherapy *
                        </label>
                        <input
                          type="text"
                          value={transferDetails.reason}
                          onChange={(e) => setTransferDetails(prev => ({ ...prev, reason: e.target.value }))}
                          placeholder="Enter reason..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority *
                        </label>
                        <select
                          value={transferDetails.priority}
                          onChange={(e) => setTransferDetails(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                        >
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinical Rationale *
                      </label>
                      <textarea
                        value={transferDetails.clinicalRationale}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, clinicalRationale: e.target.value }))}
                        placeholder="Provide detailed clinical justification for radiotherapy treatment..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={transferDetails.additionalNotes}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                        placeholder="Treatment plan, dosage requirements, or other considerations..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Post-op Transfer Content */}
              {selectedPathway === 'Post-op Transfer' && (
                <div className="mb-6">
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                        <FaStethoscope className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">Post-op Transfer Details</h4>
                        <p className="text-sm text-gray-600">Transfer patient to post-operative care</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transfer Reason *
                      </label>
                      <input
                        type="text"
                        value={transferDetails.reason}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, reason: e.target.value }))}
                        placeholder="Enter reason for post-op transfer..."
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Post-operative Notes *
                      </label>
                      <textarea
                        value={transferDetails.clinicalRationale}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, clinicalRationale: e.target.value }))}
                        placeholder="Post-operative care requirements and follow-up instructions..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={transferDetails.additionalNotes}
                        onChange={(e) => setTransferDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                        placeholder="Any additional post-operative instructions..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Default content for other pathways */}
              {selectedPathway !== 'Medication' && 
               selectedPathway !== 'Discharge' && 
               selectedPathway !== 'Surgery Pathway' && 
               selectedPathway !== 'Radiotherapy' && 
               selectedPathway !== 'Post-op Transfer' && (
                <>
                  <div className="mb-6">
                    <div className="bg-white border border-gray-200 rounded p-4">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                          <IoDocumentText className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">Transfer Details</h4>
                          <p className="text-sm text-gray-600">Required information for pathway transfer</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Transfer *
                          </label>
                          <input
                            type="text"
                            value={transferDetails.reason}
                            onChange={(e) => setTransferDetails(prev => ({ ...prev, reason: e.target.value }))}
                            placeholder="Enter reason..."
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority *
                          </label>
                          <select
                            value={transferDetails.priority}
                            onChange={(e) => setTransferDetails(prev => ({ ...prev, priority: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                          >
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Clinical Rationale *
                        </label>
                        <textarea
                          value={transferDetails.clinicalRationale}
                          onChange={(e) => setTransferDetails(prev => ({ ...prev, clinicalRationale: e.target.value }))}
                          placeholder="Provide clinical justification..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          value={transferDetails.additionalNotes}
                          onChange={(e) => setTransferDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                          placeholder="Any additional information..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Booking Section */}
                  {selectedPathway === 'Active Monitoring' && (
                    <div className="mb-6">
                      <div className="bg-white border border-gray-200 rounded p-4">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center mr-3">
                            <IoCalendar className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-gray-900">Schedule Follow-up</h4>
                            <p className="text-sm text-gray-600">Required for Active Monitoring</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date *
                            </label>
                            <input
                              type="date"
                              value={appointmentBooking.appointmentDate}
                              onChange={(e) => setAppointmentBooking(prev => ({ ...prev, appointmentDate: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Time *
                            </label>
                            <input
                              type="time"
                              value={appointmentBooking.appointmentTime}
                              onChange={(e) => setAppointmentBooking(prev => ({ ...prev, appointmentTime: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-up Frequency *
                          </label>
                          <select
                            value={recurringAppointments.interval}
                            onChange={(e) => setRecurringAppointments(prev => ({ ...prev, interval: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                            required
                          >
                            <option value="1">Monthly</option>
                            <option value="3">Every 3 months</option>
                            <option value="6">Every 6 months</option>
                            <option value="12">Annual</option>
                          </select>
                        </div>
                        
                        <div className="mt-4 bg-teal-50 border border-teal-200 rounded p-3">
                          <div className="flex items-start space-x-3">
                            <IoCalendar className="h-4 w-4 text-teal-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                {recurringAppointments.interval === '1' && 'Monthly Check-ups'}
                                {recurringAppointments.interval === '3' && 'Quarterly Check-ups'}
                                {recurringAppointments.interval === '6' && 'Bi-annual Check-ups'}
                                {recurringAppointments.interval === '12' && 'Annual Check-ups'}
                              </p>
                              <p className="text-xs text-gray-600">
                                Follow-up appointments will be automatically scheduled
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Fixed Footer */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setIsPathwayModalOpen(false);
                    setSelectedPathway('');
                    setTransferDetails({
                      reason: '',
                      priority: 'normal',
                      clinicalRationale: '',
                      additionalNotes: ''
                    });
                    setAppointmentBooking({
                      appointmentDate: '',
                      appointmentTime: '',
                      notes: ''
                    });
                    setRecurringAppointments({ interval: '3' });
                    setMedicationDetails({
                      medications: [{
                        id: Date.now(),
                        name: '',
                        dosage: '',
                        frequency: '',
                        duration: '',
                        instructions: ''
                      }]
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Validation
                    if (selectedPathway === 'Medication') {
                      const hasValidMedications = medicationDetails.medications.every(med => 
                        med.name.trim() && med.dosage.trim() && med.frequency.trim()
                      );
                      if (!hasValidMedications) {
                        alert('Please fill in all required medication fields');
                        return;
                      }
                      setIsDischargeSummaryModalOpen(true);
                      setIsPathwayModalOpen(false);
                    } else if (selectedPathway === 'Discharge') {
                      if (!transferDetails.reason || !transferDetails.clinicalRationale.trim()) {
                        alert('Please provide discharge reason and clinical summary');
                        return;
                      }
                      setIsDischargeSummaryModalOpen(true);
                      setIsPathwayModalOpen(false);
                    } else if (selectedPathway === 'Surgery Pathway') {
                      if (!transferDetails.reason || !transferDetails.clinicalRationale.trim()) {
                        alert('Please provide reason and clinical rationale for surgery pathway');
                        return;
                      }
                      setSuccessModalTitle('Transfer Successful');
                      setSuccessModalMessage(`Patient successfully transferred to ${selectedPathway}`);
                      setIsPathwayModalOpen(false);
                      setIsSuccessModalOpen(true);
                    } else if (selectedPathway === 'Radiotherapy') {
                      if (!transferDetails.reason || !transferDetails.clinicalRationale.trim()) {
                        alert('Please provide reason and clinical rationale for radiotherapy');
                        return;
                      }
                      setSuccessModalTitle('Transfer Successful');
                      setSuccessModalMessage(`Patient successfully transferred to ${selectedPathway}`);
                      setIsPathwayModalOpen(false);
                      setIsSuccessModalOpen(true);
                    } else if (selectedPathway === 'Post-op Transfer') {
                      if (!transferDetails.reason || !transferDetails.clinicalRationale.trim()) {
                        alert('Please provide reason and post-operative notes');
                        return;
                      }
                      setSuccessModalTitle('Transfer Successful');
                      setSuccessModalMessage(`Patient successfully transferred to ${selectedPathway}`);
                      setIsPathwayModalOpen(false);
                      setIsSuccessModalOpen(true);
                    } else if (selectedPathway === 'Active Monitoring') {
                      if (!transferDetails.reason || !transferDetails.clinicalRationale.trim() || 
                          !appointmentBooking.appointmentDate || !appointmentBooking.appointmentTime) {
                        alert('Please fill in all required fields');
                        return;
                      }
                      setSuccessModalTitle('Transfer Successful');
                      setSuccessModalMessage(`Patient successfully transferred to ${selectedPathway}`);
                      setIsPathwayModalOpen(false);
                      setIsSuccessModalOpen(true);
                    } else {
                      if (!transferDetails.reason || !transferDetails.clinicalRationale.trim()) {
                        alert('Please provide reason and clinical rationale');
                        return;
                      }
                      setSuccessModalTitle('Transfer Successful');
                      setSuccessModalMessage(`Patient successfully transferred to ${selectedPathway}`);
                      setIsPathwayModalOpen(false);
                      setIsSuccessModalOpen(true);
                    }
                    
                    // Reset states
                    setTransferDetails({
                      reason: '',
                      priority: 'normal',
                      clinicalRationale: '',
                      additionalNotes: ''
                    });
                    setAppointmentBooking({
                      appointmentDate: '',
                      appointmentTime: '',
                      notes: ''
                    });
                    setRecurringAppointments({ interval: '3' });
                    setMedicationDetails({
                      medications: [{
                        id: Date.now(),
                        name: '',
                        dosage: '',
                        frequency: '',
                        duration: '',
                        instructions: ''
                      }]
                    });
                  }}
                  disabled={
                    selectedPathway === 'Medication' 
                      ? !medicationDetails.medications.every(med => med.name.trim() && med.dosage.trim() && med.frequency.trim())
                      : selectedPathway === 'Discharge'
                        ? !transferDetails.reason || !transferDetails.clinicalRationale.trim()
                        : selectedPathway === 'Surgery Pathway'
                          ? !transferDetails.reason || !transferDetails.clinicalRationale.trim()
                          : selectedPathway === 'Radiotherapy'
                            ? !transferDetails.reason || !transferDetails.clinicalRationale.trim()
                            : selectedPathway === 'Post-op Transfer'
                              ? !transferDetails.reason || !transferDetails.clinicalRationale.trim()
                              : selectedPathway === 'Active Monitoring'
                                ? !transferDetails.reason || !transferDetails.clinicalRationale.trim() || 
                                  !appointmentBooking.appointmentDate || !appointmentBooking.appointmentTime
                                : !transferDetails.reason || !transferDetails.clinicalRationale.trim()
                  }
                  className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discharge Summary Modal - REMOVED FOR NURSE VERSION */}
      {false && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-teal-600 to-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <IoCheckmarkCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Summary Generated
                    </h3>
                    <p className="text-white/80 text-sm">
                      Will be sent to GP
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsDischargeSummaryModalOpen(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <IoClose className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-teal-50 border border-teal-200 rounded p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-teal-900 mb-1">Summary Created</h4>
                    <p className="text-sm text-teal-800">
                      Complete summary has been generated and will be sent to the GP.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded p-4">
                  <h5 className="font-semibold text-gray-900 mb-3 text-center">SUMMARY</h5>
                  
                  {/* Patient Information */}
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <h6 className="font-medium text-gray-900 mb-2">Patient Information</h6>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {patient.name}
                      </div>
                      <div>
                        <span className="font-medium">ID:</span> {patient.patientId}
                      </div>
                    </div>
                  </div>

                  {/* Clinical Summary */}
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <h6 className="font-medium text-gray-900 mb-2">Clinical Summary</h6>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {transferDetails.clinicalRationale || 'No summary provided.'}
                    </p>
                  </div>

                  {/* Medications if applicable */}
                  {selectedPathway === 'Medication' && medicationDetails.medications.length > 0 && (
                    <div className="mb-4 pb-3 border-b border-gray-200">
                      <h6 className="font-medium text-gray-900 mb-2">Prescribed Medications</h6>
                      <div className="space-y-2">
                        {medicationDetails.medications.map((med, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            <div className="font-medium">{med.name}</div>
                            <div>Dosage: {med.dosage} | Frequency: {med.frequency}</div>
                            {med.duration && <div>Duration: {med.duration}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
              <button
                onClick={() => {
                  setIsDischargeSummaryModalOpen(false);
                  setSuccessModalTitle('Transfer Successful');
                  setSuccessModalMessage(`Patient successfully transferred to ${selectedPathway}`);
                  setIsSuccessModalOpen(true);
                }}
                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors font-medium text-sm"
              >
                OK, Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NursePatientDetailsModal;