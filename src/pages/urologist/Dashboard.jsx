import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { IoChevronForward, IoNotificationsOutline } from 'react-icons/io5';
import NotificationModal from '../../components/NotificationModal';

const UrologistDashboard = () => {
  // State for tracking checked tasks
  const [checkedTasks, setCheckedTasks] = useState(new Set());
  // State for tracking active tab
  const [activeTab, setActiveTab] = useState('appointments');
  // State for notification modal
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const appointments = [
    { time: '9:00 AM', patient: 'Ethan Carter', age: 58, status: 'Active', statusColor: 'green' },
    { time: '10:30 AM', patient: 'Olivia Bennett', age: 42, status: 'Monitoring', statusColor: 'yellow' },
    { time: '1:00 PM', patient: 'MDT Discussion', age: '-', status: 'Scheduled', statusColor: 'purple', tag: 'Urology' },
    { time: '2:30 PM', patient: 'Ava Foster', age: 71, status: 'Discharged', statusColor: 'gray' },
    { time: '4:00 PM', patient: 'Liam Green', age: 55, status: 'Urgent', statusColor: 'red' },
  ];

  const tasks = [
    { id: 1, text: 'Review lab results for Ethan Carter', due: 'Today' },
    { id: 2, text: 'Schedule follow-up for Olivia Bennett', due: 'Tomorrow' },
    { id: 3, text: "Prepare report for Noah Davis's procedure", due: '3 days' },
  ];

  // Function to toggle task completion
  const toggleTask = (taskId) => {
    setCheckedTasks(prev => {
      const newChecked = new Set(prev);
      if (newChecked.has(taskId)) {
        newChecked.delete(taskId);
      } else {
        newChecked.add(taskId);
      }
      return newChecked;
    });
  };

  const mdtOutcomes = [
    { patient: 'Noah Davis', outcome: 'Schedule for Biopsy' },
    { patient: 'Chloe Miller', outcome: 'Continue Active Surveillance' },
  ];

  const recentPatients = [
    { time: 'Yesterday', patient: 'Michael Rodriguez', age: 67, status: 'Follow-up', statusColor: 'blue' },
    { time: '2 days ago', patient: 'Sarah Johnson', age: 34, status: 'Consultation', statusColor: 'purple' },
    { time: '3 days ago', patient: 'Robert Chen', age: 49, status: 'Review', statusColor: 'green' },
    { time: '5 days ago', patient: 'Jennifer Lee', age: 56, status: 'Discharge', statusColor: 'gray' },
  ];

  const getStatusBadge = (status, color) => {
    const colorClasses = {
      green: 'bg-green-100 text-green-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      purple: 'bg-purple-100 text-purple-700',
      gray: 'bg-gray-100 text-gray-700',
      red: 'bg-red-100 text-red-700',
      blue: 'bg-blue-100 text-blue-700',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="pl-12 lg:pl-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Urologist Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome, Dr. Thompson</p>
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
                  5
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Today's Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Today's Appointments</h2>
                  {/* Tabs */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'appointments'
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Appointments
                    </button>
                    <button
                      onClick={() => setActiveTab('recentPatients')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'recentPatients'
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Recent Patients
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Time</th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Patient Name</th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Age</th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Pathway Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'appointments' ? (
                      appointments.map((appointment, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm">{appointment.time}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 text-xs sm:text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{appointment.patient}</span>
                              {appointment.tag && (
                                <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded font-medium">
                                  {appointment.tag}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm">{appointment.age}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            {getStatusBadge(appointment.status, appointment.statusColor)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      recentPatients.map((patient, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm">{patient.time}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 text-xs sm:text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{patient.patient}</span>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm">{patient.age}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            {getStatusBadge(patient.status, patient.statusColor)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Patients Due for Review and Recent MDT Outcomes Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Patients Due for Review */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Patients Due for Review</h2>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Next 7-14 Days</h3>
                        <div className="text-3xl font-bold text-teal-600 mb-2">12</div>
                        <div className="text-xs text-gray-500 mb-3">patients</div>
                        <div className="space-y-1 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <span>Post-Op Follow-up:</span>
                            <span className="font-medium">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surveillance:</span>
                            <span className="font-medium">7</span>
                          </div>
                        </div>
                      </div>
                      <IoChevronForward className="text-gray-400 text-lg ml-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent MDT Outcomes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent MDT Outcomes</h2>
                </div>
                <div className="p-4 space-y-2">
                  {mdtOutcomes.map((outcome, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{outcome.patient}</div>
                        <div className="text-xs text-gray-500">Outcome: {outcome.outcome}</div>
                      </div>
                      <IoChevronForward className="text-gray-400 text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Takes 1/3 width */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            {/* Pending Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Pending Tasks</h2>
                  <button className="bg-teal-600 text-white w-8 h-8 rounded-full hover:bg-teal-700 transition-colors flex items-center justify-center">
                    <span className="text-lg font-medium">+</span>
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      {checkedTasks.has(task.id) ? (
                        <MdCheckBox className="text-teal-600 text-lg" />
                      ) : (
                        <MdCheckBoxOutlineBlank className="text-gray-400 text-lg" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${checkedTasks.has(task.id) ? 'text-gray-500' : 'text-gray-900'}`}>
                        {task.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Due: {task.due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MDT Schedule */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">MDT Schedule</h2>
              </div>
              <div className="p-4 sm:p-6">
                {/* Next MDT Discussion Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">Next MDT Discussion</h3>
                  <div className="text-sm text-gray-600 mb-3">Today at 1:00 PM - Urology</div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 text-xs font-bold">ND</div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-xs font-bold">CM</div>
                    <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 text-xs font-bold">JP</div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xs font-bold">+2</div>
                  </div>
                </div>
                
                {/* Day/Week/Month Toggle */}
                <div className="flex space-x-2 border-b border-gray-200 pb-4">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Day</button>
                  <button className="px-4 py-2 text-sm text-teal-600 font-medium border-b-2 border-teal-600">Week</button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Month</button>
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
    </div>
  );
};

export default UrologistDashboard;

