import React, { useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoChevronForward, IoNotificationsOutline } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';
import NotificationModal from '../../components/NotificationModal';
import GPPatientDetailsModal from '../../components/GPPatientDetailsModal';

const Dashboard = () => {
  // State for tracking active tab
  const [activeTab, setActiveTab] = useState('referrals');
  // State for notification modal
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // State for patient details modal
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Sample data for GP dashboard
  const recentReferrals = [
    { 
      date: '2024-01-15', 
      patient: 'John Smith', 
      age: 65, 
      psa: 4.2, 
      status: 'Pending Review', 
      statusColor: 'yellow',
      priority: 'Normal'
    },
    { 
      date: '2024-01-14', 
      patient: 'Mary Johnson', 
      age: 58, 
      psa: 6.8, 
      status: 'Under Investigation', 
      statusColor: 'purple',
      priority: 'High'
    },
    { 
      date: '2024-01-13', 
      patient: 'Robert Brown', 
      age: 72, 
      psa: 3.1, 
      status: 'Active Monitoring', 
      statusColor: 'green',
      priority: 'Normal'
    },
    { 
      date: '2024-01-12', 
      patient: 'Sarah Davis', 
      age: 61, 
      psa: 8.5, 
      status: 'Surgical Pathway', 
      statusColor: 'blue',
      priority: 'Urgent'
    },
  ];

  const activeMonitoringPatients = [
    { 
      patient: 'Robert Brown', 
      age: 72, 
      lastPSA: 3.1, 
      lastPSADate: '2024-01-10',
      nextReview: '2024-04-10',
      status: 'Stable',
      statusColor: 'green'
    },
    { 
      patient: 'Michael Wilson', 
      age: 68, 
      lastPSA: 4.8, 
      lastPSADate: '2024-01-08',
      nextReview: '2024-03-15',
      status: 'Stable',
      statusColor: 'green'
    },
    { 
      patient: 'David Miller', 
      age: 70, 
      lastPSA: 5.2, 
      lastPSADate: '2024-01-05',
      nextReview: '2024-02-20',
      status: 'Review Required',
      statusColor: 'yellow'
    },
  ];


  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'Normal': 'bg-gray-100 text-gray-700',
      'High': 'bg-yellow-100 text-yellow-700',
      'Urgent': 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority]}`}>
        {priority}
      </span>
    );
  };

  // Handle patient details modal
  const handleViewPatient = (patientName) => {
    setSelectedPatient(patientName);
    setIsPatientDetailsModalOpen(true);
  };


  return (
    <div className="h-full overflow-y-auto">
      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="pl-12 lg:pl-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">GP Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome, Dr. Smith</p>
          </div>
          {/* Search Bar and Notification */}
          <div className="w-full lg:w-96 flex items-center gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Quick Access to Patient Records"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
            {/* Notification Icon */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoNotificationsOutline className="text-2xl" />
                {/* Notification Badge */}
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>


        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Recent Referrals / Active Monitoring */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    {activeTab === 'referrals' ? "Recent Referrals" : "Active Monitoring"}
                  </h2>
                  {/* Tabs */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab('referrals')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'referrals'
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Referrals
                    </button>
                    <button
                      onClick={() => setActiveTab('monitoring')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'monitoring'
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Monitoring
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">
                        {activeTab === 'referrals' ? 'Date' : 'Patient'}
                      </th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Patient Name</th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">
                        {activeTab === 'referrals' ? 'PSA Level' : 'Last PSA'}
                      </th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'referrals' ? (
                      recentReferrals.map((referral, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm">{referral.date}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 text-xs sm:text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{referral.patient}</span>
                              {getPriorityBadge(referral.priority)}
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <span className="text-sm font-medium text-gray-900">{referral.psa} ng/mL</span>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <button
                              onClick={() => handleViewPatient(referral.patient)}
                              className="px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      activeMonitoringPatients.map((patient, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm">{patient.lastPSADate}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 text-xs sm:text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{patient.patient}</span>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <span className="text-sm font-medium text-gray-900">{patient.lastPSA} ng/mL</span>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <button
                              onClick={() => handleViewPatient(patient.patient)}
                              className="px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors"
                            >
                              View
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

          {/* Right Column - Takes 1/3 width */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            {/* Latest Doctor Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Latest Doctor Notes</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div 
                    onClick={() => handleViewPatient('Sarah Davis')}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Latest Update</h3>
                      <BsCalendar3 className="text-blue-600" />
                    </div>
                    <div className="text-sm text-gray-700 font-medium mb-1">
                      Sarah Davis
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      Dr. James Brown • Jan 15, 2024
                    </div>
                    <div className="text-xs text-gray-500">
                      "Patient scheduled for surgery on Feb 10th. Pre-op assessment completed successfully."
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div 
                      onClick={() => handleViewPatient('Mary Johnson')}
                      className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">Mary Johnson</div>
                        <div className="text-xs text-gray-500 mb-1">Dr. Michael Chen • Jan 14, 2024</div>
                        <div className="text-xs text-gray-600">
                          "Biopsy results confirm diagnosis. Discussing treatment options with patient."
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => handleViewPatient('Robert Brown')}
                      className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">Robert Brown</div>
                        <div className="text-xs text-gray-500 mb-1">Dr. Lisa Davis • Jan 13, 2024</div>
                        <div className="text-xs text-gray-600">
                          "PSA levels stable. Continue active surveillance protocol. Next review in 3 months."
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleViewPatient('John Smith')}
                      className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">John Smith</div>
                        <div className="text-xs text-gray-500 mb-1">Dr. Sarah Wilson • Jan 12, 2024</div>
                        <div className="text-xs text-gray-600">
                          "Initial consultation completed. Patient referred for further investigations."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* GP Patient Details Modal */}
      <GPPatientDetailsModal 
        isOpen={isPatientDetailsModalOpen}
        onClose={() => setIsPatientDetailsModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};

export default Dashboard;

