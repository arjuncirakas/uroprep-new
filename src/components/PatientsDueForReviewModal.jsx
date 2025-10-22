import React from 'react';
import { IoClose, IoEye, IoCalendar } from 'react-icons/io5';

const PatientsDueForReviewModal = ({ isOpen, onClose }) => {
  // Sample data for patients due for review
  const patientsDueForReview = [
    {
      id: 1,
      name: 'John Smith',
      age: 65,
      type: 'Post-Op Follow-up',
      date: '2024-01-15',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      age: 58,
      type: 'Surgery',
      date: '2024-01-16',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Robert Davis',
      age: 72,
      type: 'Post-Op Follow-up',
      date: '2024-01-17',
      priority: 'High'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      age: 61,
      type: 'Surgery',
      date: '2024-01-18',
      priority: 'Low'
    },
    {
      id: 5,
      name: 'Michael Brown',
      age: 69,
      type: 'Post-Op Follow-up',
      date: '2024-01-19',
      priority: 'High'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };


  const getTypeColor = (type) => {
    switch (type) {
      case 'Post-Op Follow-up':
        return 'bg-purple-100 text-purple-700';
      case 'Surgery':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Patients Due for Review</h2>
            <p className="text-gray-600 mt-1">Next 7-14 Days ({patientsDueForReview.length} patients)</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoClose className="text-2xl text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">

            {/* Patients Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-gray-50 border-b border-gray-200">
                     <tr>
                       <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Patient Name</th>
                       <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Age</th>
                       <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Type</th>
                       <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Review Date</th>
                       <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Priority</th>
                       <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
                     </tr>
                   </thead>
                  <tbody>
                     {patientsDueForReview.map((patient) => (
                       <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                         <td className="py-3 px-4 text-gray-900 font-medium">{patient.name}</td>
                         <td className="py-3 px-4 text-gray-700">{patient.age}</td>
                         <td className="py-3 px-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(patient.type)}`}>
                             {patient.type}
                           </span>
                         </td>
                         <td className="py-3 px-4 text-gray-700">{patient.date}</td>
                         <td className="py-3 px-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                             {patient.priority}
                           </span>
                         </td>
                         <td className="py-3 px-4">
                           <div className="flex space-x-3">
                             <button className="group flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium">
                               <IoEye className="text-sm" />
                               View
                             </button>
                             <button className="group flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                               <IoCalendar className="text-sm" />
                               Reschedule
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

         {/* Footer */}
         <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
           <button
             onClick={onClose}
             className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
           >
             Close
           </button>
         </div>
      </div>
    </div>
  );
};

export default PatientsDueForReviewModal;
