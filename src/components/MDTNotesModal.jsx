import React, { useState } from 'react';
import { 
  X,
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle,
  Download,
  Eye,
  Trash,
  Plus,
  Upload
} from 'lucide-react';

const MDTNotesModal = ({ isOpen, onClose, patientName, outcome }) => {
  if (!isOpen) return null;

  // Sample MDT notes data for the specific patient
  const getMDTNotesForPatient = (patientName) => {
    const mdtNotesData = {
      'Noah Parker': [
        {
          id: 1,
          date: '2024-10-20',
          time: '02:00 PM',
          author: 'Dr. Thompson',
          designation: 'Urologist',
          meetingDate: '2024-10-20',
          attendees: ['Dr. Thompson (Urologist)', 'Dr. Miller (Oncologist)', 'Dr. Peterson (Radiologist)', 'Dr. Williams (Pathologist)'],
          content: 'Latest MDT discussion for 55-year-old male with Gleason 6 (3+3) prostate cancer. Recent PSA levels have shown slight increase from 6.8 to 7.2 ng/mL. Patient remains asymptomatic with no evidence of disease progression on imaging.',
          recommendations: [
            'Schedule for biopsy to reassess disease status',
            'Consider targeted biopsy approach based on MRI findings',
            'Continue active surveillance if biopsy remains favorable'
          ],
          actionItems: [
            'Schedule TRUS-guided biopsy within 2 weeks',
            'Arrange pre-biopsy MRI if not recently performed',
            'Patient consultation to discuss biopsy procedure and risks'
          ],
          documents: [
            { id: 1, name: 'Latest PSA Results - Oct 2024.pdf', type: 'pdf', uploadDate: '2024-10-18', size: '1.1 MB' },
            { id: 2, name: 'MRI Prostate - Oct 2024.pdf', type: 'pdf', uploadDate: '2024-10-15', size: '4.2 MB' },
            { id: 3, name: 'PSA Trend Analysis - Updated.pdf', type: 'excel', uploadDate: '2024-10-19', size: '189 KB' }
          ]
        }
      ],
      'Ava Reynolds': [
        {
          id: 1,
          date: '2024-10-18',
          time: '02:00 PM',
          author: 'Dr. Thompson',
          designation: 'Urologist',
          meetingDate: '2024-10-18',
          attendees: ['Dr. Thompson (Urologist)', 'Dr. Miller (Oncologist)', 'Dr. Peterson (Radiologist)', 'Dr. Williams (Pathologist)'],
          content: 'Latest MDT discussion for 67-year-old female with bladder cancer. Recent surveillance cystoscopy shows no evidence of recurrence. Patient continues to do well with no new symptoms. All surveillance markers remain stable.',
          recommendations: [
            'Continue active surveillance protocol',
            'Maintain current cystoscopy schedule every 3 months',
            'Consider extending surveillance interval after 2 years of stability'
          ],
          actionItems: [
            'Schedule next cystoscopy in 3 months',
            'Continue routine surveillance blood work',
            'Patient education on ongoing surveillance importance'
          ],
          documents: [
            { id: 1, name: 'Cystoscopy Report - Oct 2024.pdf', type: 'pdf', uploadDate: '2024-10-17', size: '1.3 MB' },
            { id: 2, name: 'Surveillance Blood Work - Oct 2024.pdf', type: 'pdf', uploadDate: '2024-10-16', size: '0.8 MB' }
          ]
        }
      ]
    };

    return mdtNotesData[patientName] || [];
  };

  const mdtNotes = getMDTNotesForPatient(patientName);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-1">
                <h2 className="text-xl font-semibold text-white">
                  MDT Notes - {patientName}
                </h2>
              </div>
              <p className="text-teal-50 text-sm font-medium mb-2">
                Multidisciplinary Team Discussion History
              </p>
              {outcome && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Latest Outcome: {outcome}
                  </span>
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
          <div className="p-6">
            {mdtNotes.length > 0 ? (
              <div className="space-y-6">
                {mdtNotes.map((note, index) => (
                  <div key={note.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    {/* Note Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            MDT Discussion
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(note.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTime(note.time)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{note.author}</p>
                          <p className="text-xs text-gray-500">{note.designation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div className="p-6 space-y-4">
                      {/* Attendees */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-teal-600" />
                          Meeting Attendees
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {note.attendees.map((attendee, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200"
                            >
                              {attendee}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Discussion Content */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-teal-600" />
                          Discussion Summary
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                          {note.content}
                        </p>
                      </div>

                      {/* Recommendations */}
                      {note.recommendations && note.recommendations.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Clinical Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {note.recommendations.map((recommendation, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{recommendation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Items */}
                      {note.actionItems && note.actionItems.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            Action Items
                          </h4>
                          <ul className="space-y-2">
                            {note.actionItems.map((action, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <div className="w-4 h-4 border-2 border-blue-300 rounded mt-0.5 flex-shrink-0"></div>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Documents */}
                      {note.documents && note.documents.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-purple-600" />
                            Supporting Documents
                          </h4>
                          <div className="space-y-2">
                            {note.documents.map((doc) => (
                              <div 
                                key={doc.id} 
                                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:border-purple-300 hover:bg-purple-50/30 transition-all"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileText className="h-5 w-5 text-red-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.type.toUpperCase()} • {doc.size} • {doc.uploadDate}</p>
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
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No MDT Notes Found</h3>
                <p className="text-gray-500 text-sm">
                  No MDT discussions have been documented for {patientName} yet.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleString('en-GB', { 
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
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MDTNotesModal;
