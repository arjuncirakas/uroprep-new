import React, { useState, useEffect } from 'react';
import { 
  FiX, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiAlertCircle, 
  FiCheck, 
  FiPlus,
  FiEdit3,
  FiRefreshCw,
  FiMessageSquare,
  FiPhoneCall,
  FiMail as FiEmail,
  FiClock as FiTime
} from 'react-icons/fi';
import RescheduleConfirmationModal from './RescheduleConfirmationModal';

const NoShowPatientModal = ({ isOpen, onClose, patient, onReschedule, onAddTimelineEntry }) => {
  const [timelineEntries, setTimelineEntries] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && patient) {
      // Load existing timeline entries for this patient
      loadTimelineEntries();
      setNewNote('');
    }
  }, [isOpen, patient]);

  const loadTimelineEntries = () => {
    // In a real app, this would fetch from an API
    // For now, we'll use sample data
    const sampleEntries = [
      {
        id: 1,
        notes: 'Called at 10:15 AM, no answer after 3 rings',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        createdBy: 'Nurse Sarah'
      },
      {
        id: 2,
        notes: 'SMS reminder sent to patient about missed appointment',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        createdBy: 'System'
      }
    ];
    setTimelineEntries(sampleEntries);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) {
      return;
    }

    setIsAddingNote(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const entry = {
        id: Date.now(),
        notes: newNote,
        timestamp: new Date().toISOString(),
        createdBy: 'Current User' // In real app, get from auth context
      };
      
      setTimelineEntries(prev => [entry, ...prev]);
      
      // Call parent callback if provided
      if (onAddTimelineEntry) {
        onAddTimelineEntry(patient.id, entry);
      }
      
      // Reset form
      setNewNote('');
      
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleReschedule = () => {
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleConfirm = async (appointmentId, newDate, newTime) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call parent callback
      if (onReschedule) {
        onReschedule(patient.id, {
          appointmentId,
          newDate,
          newTime,
          reason: 'No-show reschedule'
        });
      }
      
      setIsRescheduleModalOpen(false);
      onClose();
      
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !patient) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] border border-gray-200 flex flex-col">
          
          {/* Header */}
          <div className="bg-teal-600 px-6 py-5 flex items-center justify-between border-b border-teal-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                <FiAlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">No-Show Patient Details</h3>
                <p className="text-teal-50 text-sm mt-0.5">Track follow-up actions and reschedule appointment</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Patient Information */}
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 border border-red-200 rounded flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900">{patient.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1.5">
                      <FiUser className="w-3.5 h-3.5" />
                      UPI: {patient.upi}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiTime className="w-3.5 h-3.5" />
                      Age: {patient.age} • {patient.gender}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiAlertCircle className="w-3.5 h-3.5" />
                      PSA: {patient.psa} ng/mL
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Missed Appointment</div>
                  <div className="text-xs text-gray-600">
                    {patient.scheduledDate} at {patient.scheduledTime}
                  </div>
                  <div className="text-xs text-red-600 font-medium mt-1">
                    {patient.appointmentType === 'investigation' ? 'Investigation' : 'Urologist'} Appointment
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                    <FiMessageSquare className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Follow-up Notes</h4>
                    <p className="text-sm text-gray-600">Add notes about contact attempts and follow-up actions</p>
                  </div>
                </div>
              </div>

              {/* Add New Note Form */}
              <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-3">Add Note</h5>
                <div className="space-y-3">
                  <div>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                      placeholder="Add details about follow-up actions, phone calls, messages sent, etc..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddNote}
                      disabled={!newNote.trim() || isAddingNote}
                      className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isAddingNote ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <FiCheck className="w-4 h-4" />
                          Add Note
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setNewNote('')}
                      className="px-4 py-2 text-gray-600 text-sm rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes Timeline */}
              <div className="space-y-3">
                {timelineEntries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FiMessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No notes yet</p>
                    <p className="text-xs text-gray-400">Add notes to track follow-up actions</p>
                  </div>
                ) : (
                  timelineEntries.map((entry, index) => (
                    <div key={entry.id} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMessageSquare className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h6 className="text-sm font-medium text-gray-900">Note</h6>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(entry.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{entry.notes}</p>
                        <p className="text-xs text-gray-500">by {entry.createdBy}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Fixed Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-semibold text-gray-900">Next Actions</h5>
                <p className="text-xs text-gray-600">Choose what to do next with this patient</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReschedule}
                  className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Reschedule
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <RescheduleConfirmationModal
        isOpen={isRescheduleModalOpen}
        onCancel={() => setIsRescheduleModalOpen(false)}
        onConfirm={handleRescheduleConfirm}
        appointment={{
          id: patient.id,
          patientName: patient.name,
          date: patient.scheduledDate,
          time: patient.scheduledTime,
          type: patient.appointmentType === 'investigation' ? 'Investigation' : 'Urologist',
          typeColor: patient.appointmentType === 'investigation' ? 'purple' : 'teal',
          phone: 'N/A', // These would come from patient data in real app
          email: 'N/A'
        }}
        newDate=""
        newTime=""
      />
    </>
  );
};

export default NoShowPatientModal;