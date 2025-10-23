import React, { useState } from 'react';
import { 
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Building2,
  ChevronRight,
  Edit,
  Trash2,
  Video,
  FileText,
  Stethoscope,
  Activity,
  CheckCircle,
  Plus,
  Upload,
  Eye,
  Download,
  Trash,
  AlertCircle,
  Save,
  Send
} from 'lucide-react';

const MDTScheduleDetailsModal = ({ isOpen, onClose, schedule }) => {
  if (!isOpen || !schedule) return null;

  // State management
  const [recommendations, setRecommendations] = useState([]);
  const [followUpActions, setFollowUpActions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState('');
  const [newFollowUpAction, setNewFollowUpAction] = useState('');
  const [discussionNotes, setDiscussionNotes] = useState('');
  const [mdtOutcome, setMdtOutcome] = useState('');

  // Add new recommendation
  const addRecommendation = () => {
    if (newRecommendation.trim()) {
      setRecommendations([...recommendations, {
        id: Date.now(),
        text: newRecommendation.trim(),
        timestamp: new Date().toISOString()
      }]);
      setNewRecommendation('');
    }
  };

  // Remove recommendation
  const removeRecommendation = (id) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  // Add new follow-up action
  const addFollowUpAction = () => {
    if (newFollowUpAction.trim()) {
      const newAction = {
        id: Date.now(),
        text: newFollowUpAction.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setFollowUpActions([...followUpActions, newAction]);
      setNewFollowUpAction('');
    }
  };

  // Toggle follow-up action completion
  const toggleFollowUpAction = (id) => {
    setFollowUpActions(followUpActions.map(action => 
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  // Remove follow-up action
  const removeFollowUpAction = (id) => {
    setFollowUpActions(followUpActions.filter(action => action.id !== id));
  };

  // Handle document upload
  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadDate: new Date().toLocaleDateString('en-GB')
    }));
    setDocuments([...documents, ...newDocs]);
  };

  // Remove document
  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Get patient data for this MDT meeting
  const getPatientForMdt = () => {
    const patientName = schedule.patientName || 'Ethan Carter';
    
    const patientData = {
      'Ethan Carter': {
        name: 'Ethan Carter',
        id: 'PT-123456',
        age: 62,
        gender: 'Male',
        mrn: 'MRN-789012',
        diagnosis: 'Prostate Cancer',
        stage: 'T2c',
        gleasonScore: '3+4=7',
        psa: '4.5 ng/mL',
        lastImaging: '15 Oct 2024',
        clinicalNotes: 'Patient presents with elevated PSA levels. Recent biopsy confirms Gleason 3+4=7 adenocarcinoma. Multidisciplinary review required for optimal treatment pathway determination.'
      },
      'Noah Parker': {
        name: 'Noah Parker',
        id: 'PT-987654',
        age: 55,
        gender: 'Male',
        mrn: 'MRN-456789',
        diagnosis: 'Prostate Cancer',
        stage: 'T1c',
        gleasonScore: '3+3=6',
        psa: '6.8 ng/mL',
        lastImaging: '01 Aug 2024',
        clinicalNotes: 'New diagnosis following elevated PSA screening. Biopsy results pending multidisciplinary discussion for treatment planning.'
      },
      'Ava Reynolds': {
        name: 'Ava Reynolds',
        id: 'PT-456123',
        age: 67,
        gender: 'Female',
        mrn: 'MRN-321654',
        diagnosis: 'Bladder Cancer',
        stage: 'Ta',
        gleasonScore: 'N/A',
        psa: 'N/A',
        lastImaging: '08 Sep 2024',
        clinicalNotes: 'Post-TURBT surveillance. Previous Ta low-grade urothelial carcinoma requiring MDT review for ongoing surveillance protocol.'
      },
      'Olivia Bennett': {
        name: 'Olivia Bennett',
        id: 'PT-654321',
        age: 58,
        gender: 'Female',
        mrn: 'MRN-210987',
        diagnosis: 'Prostate Cancer',
        stage: 'T2a',
        gleasonScore: '3+4=7',
        psa: '2.1 ng/mL',
        lastImaging: '20 Aug 2024',
        clinicalNotes: 'Post-treatment follow-up with excellent response. MDT review for long-term surveillance strategy.'
      },
      'Liam Foster': {
        name: 'Liam Foster',
        id: 'PT-321987',
        age: 71,
        gender: 'Male',
        mrn: 'MRN-654789',
        diagnosis: 'Prostate Cancer',
        stage: 'T2c',
        gleasonScore: '4+3=7',
        psa: '0.1 ng/mL',
        lastImaging: '25 Aug 2024',
        clinicalNotes: 'Post-radical prostatectomy with excellent recovery and undetectable PSA. MDT review for ongoing surveillance.'
      }
    };
    
    return patientData[patientName] || patientData['Ethan Carter'];
  };

  const patient = getPatientForMdt();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduleDate = new Date(date);
    scheduleDate.setHours(0, 0, 0, 0);
    
    if (scheduleDate.getTime() === today.getTime()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (scheduleDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format time to 12-hour format
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: { 
        color: 'bg-blue-50 text-blue-700 border-blue-200', 
        label: 'Upcoming',
        icon: Clock 
      },
      completed: { 
        color: 'bg-green-50 text-green-700 border-green-200', 
        label: 'Completed',
        icon: CheckCircle 
      },
      scheduled: { 
        color: 'bg-purple-50 text-purple-700 border-purple-200', 
        label: 'Scheduled',
        icon: Calendar 
      },
      cancelled: { 
        color: 'bg-red-50 text-red-700 border-red-200', 
        label: 'Cancelled',
        icon: AlertCircle 
      }
    };
    const config = statusConfig[status] || statusConfig.scheduled;
    const StatusIcon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border ${config.color}`}>
        <StatusIcon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  };

  // Check if virtual meeting
  const isVirtual = schedule.location?.toLowerCase().includes('virtual') || 
                    schedule.location?.toLowerCase().includes('zoom') || 
                    schedule.location?.toLowerCase().includes('teams');

  // Handle save
  const handleSave = () => {
    const mdtData = {
      schedule,
      patient,
      discussionNotes,
      mdtOutcome,
      recommendations,
      followUpActions,
      documents,
      completedAt: new Date().toISOString()
    };
    console.log('Saving MDT meeting data:', mdtData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-1">
                <h2 className="text-xl font-semibold text-white">
                  Multidisciplinary Team Meeting
                </h2>
              </div>
              <p className="text-teal-50 text-sm font-medium mb-2">
                {schedule.department} Department • {schedule.caseType || 'Patient Case Review'}
              </p>
              {schedule.date && schedule.time && (
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(schedule.date)}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                    <Clock className="h-3.5 w-3.5" />
                    {formatTime(schedule.time)}
                  </span>
                  {isVirtual && (
                    <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                      <Video className="h-3.5 w-3.5" />
                      Virtual Meeting
                    </span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
          
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Patient Information */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-teal-600" />
                  Patient Information
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{patient.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">{patient.id}</span>
                      <span>•</span>
                      <span>{patient.age} years, {patient.gender}</span>
                      <span>•</span>
                      <span>MRN: {patient.mrn}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Diagnosis</p>
                    <p className="text-sm font-semibold text-gray-900">{patient.diagnosis}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">PSA Level</p>
                    <p className="text-sm font-semibold text-gray-900">{patient.psa}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Clinical Summary
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{patient.clinicalNotes}</p>
                  <p className="text-xs text-gray-500 mt-2">Last imaging: {patient.lastImaging}</p>
                </div>
              </div>
            </section>

            {/* Team Members */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-teal-600" />
                    Attending Clinicians
                  </h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {schedule.attendees.length} Members
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {schedule.attendees.map((attendee, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-teal-100 text-teal-700 border-2 border-teal-200">
                        {attendee.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {attendee.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{attendee.role || 'Specialist'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Discussion Notes */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  Clinical Discussion Notes
                </h3>
              </div>
              <div className="p-6">
                <textarea
                  value={discussionNotes}
                  onChange={(e) => setDiscussionNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-sm"
                  rows="5"
                  placeholder="Document key discussion points, clinical findings, and team deliberations..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  {discussionNotes.length} characters
                </p>
              </div>
            </section>

            {/* MDT Outcome */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  MDT Decision & Outcome
                </h3>
              </div>
              <div className="p-6">
                <select
                  value={mdtOutcome}
                  onChange={(e) => setMdtOutcome(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm font-medium bg-white"
                >
                  <option value="">Select MDT Outcome</option>
                  <option value="treatment_approved">Treatment Plan Approved</option>
                  <option value="further_investigation">Further Investigation Required</option>
                  <option value="surgery_recommended">Surgical Intervention Recommended</option>
                  <option value="radiation_therapy">Radiation Therapy Recommended</option>
                  <option value="active_monitoring">Active Surveillance Protocol</option>
                  <option value="palliative_care">Palliative Care Pathway</option>
                  <option value="referral_required">Specialist Referral Required</option>
                  <option value="follow_up_scheduled">Follow-up Appointment Scheduled</option>
                </select>
              </div>
            </section>

            {/* Recommendations */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-teal-600" />
                  Clinical Recommendations
                </h3>
              </div>
              <div className="p-6">
                {recommendations.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {recommendations.map((recommendation) => (
                      <div 
                        key={recommendation.id} 
                        className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg group hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-800 flex-1 leading-relaxed">{recommendation.text}</p>
                        <button
                          onClick={() => removeRecommendation(recommendation.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                          aria-label="Remove recommendation"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRecommendation}
                    onChange={(e) => setNewRecommendation(e.target.value)}
                    placeholder="Add clinical recommendation..."
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addRecommendation()}
                  />
                  <button
                    onClick={addRecommendation}
                    disabled={!newRecommendation.trim()}
                    className="px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
            </section>

            {/* Follow-up Actions */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-600" />
                  Follow-up Action Items
                </h3>
              </div>
              <div className="p-6">
                {followUpActions.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {followUpActions.map((action) => (
                      <div 
                        key={action.id} 
                        className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg group hover:border-teal-300 transition-all"
                      >
                        <button
                          onClick={() => toggleFollowUpAction(action.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            action.completed 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300 hover:border-teal-400'
                          }`}
                          aria-label={action.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {action.completed && <CheckCircle className="h-3 w-3 text-white" />}
                        </button>
                        <span className={`flex-1 text-sm ${action.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {action.text}
                        </span>
                        <button
                          onClick={() => removeFollowUpAction(action.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                          aria-label="Remove action"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFollowUpAction}
                    onChange={(e) => setNewFollowUpAction(e.target.value)}
                    placeholder="Add follow-up action item..."
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addFollowUpAction()}
                  />
                  <button
                    onClick={addFollowUpAction}
                    disabled={!newFollowUpAction.trim()}
                    className="px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
            </section>

            {/* Documents */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  Supporting Documentation
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dcm"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-dashed border-gray-300 text-gray-700 rounded-lg hover:border-teal-400 hover:bg-teal-50 cursor-pointer transition-all font-medium text-sm"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Documents
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG, DICOM • Maximum file size: 10MB
                  </p>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg group hover:border-teal-300 hover:bg-teal-50/30 transition-all"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                          <button 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                            aria-label="View document"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-all"
                            aria-label="Download document"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeDocument(doc.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                            aria-label="Delete document"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-gray-500">
            Last modified: {new Date().toLocaleString('en-GB', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Meeting Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MDTScheduleDetailsModal;
