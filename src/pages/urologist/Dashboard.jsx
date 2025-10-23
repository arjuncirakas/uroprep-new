import React, { useState, useMemo, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoChevronForward, IoNotificationsOutline } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';
import NotificationModal from '../../components/NotificationModal';
import PatientsDueForReviewModal from '../../components/PatientsDueForReviewModal';
import PatientDetailsModalWrapper from '../../components/PatientDetailsModalWrapper';
import MDTScheduleDetailsModal from '../../components/MDTScheduleDetailsModal';
import MDTNotesModal from '../../components/MDTNotesModal';
import { getUpcomingMdtSchedules } from '../../utils/dummyData';

const UrologistDashboard = () => {
  // State for tracking active tab
  const [activeTab, setActiveTab] = useState('appointments');
  // State for notification modal
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // State for patients due for review modal
  const [isPatientsReviewOpen, setIsPatientsReviewOpen] = useState(false);
  // Ref for patient details modal wrapper
  const patientModalRef = useRef();
  // State for MDT schedule view (day/week/month)
  const [mdtView, setMdtView] = useState('week');
  // State for MDT schedule details modal
  const [isMdtDetailsOpen, setIsMdtDetailsOpen] = useState(false);
  // State for selected MDT schedule
  const [selectedMdtSchedule, setSelectedMdtSchedule] = useState(null);
  // State for MDT notes modal
  const [isMdtNotesOpen, setIsMdtNotesOpen] = useState(false);
  // State for selected MDT outcome
  const [selectedMdtOutcome, setSelectedMdtOutcome] = useState(null);

  const appointments = [
    { time: '9:00 AM', patient: 'Ethan Carter', age: 58, status: 'Surgical', statusColor: 'blue' },
    { time: '10:30 AM', patient: 'Olivia Bennett', age: 42, status: 'Postop Followup', statusColor: 'green' },
    { time: '1:00 PM', patient: 'MDT Discussion', age: '-', status: 'Investigation', statusColor: 'purple', tag: 'Urology' },
    { time: '2:30 PM', patient: 'Ava Reynolds', age: 67, status: 'Investigation', statusColor: 'purple' },
    { time: '4:00 PM', patient: 'Liam Foster', age: 71, status: 'Surgical', statusColor: 'blue' },
  ];


  const mdtOutcomes = [
    { 
      patient: 'Noah Davis', 
      outcome: 'Schedule for Biopsy',
      patientName: 'Noah Parker' // Match with actual patient name in patient data
    },
    { 
      patient: 'Chloe Miller', 
      outcome: 'Continue Active Surveillance',
      patientName: 'Ava Reynolds' // Match with actual patient name in patient data
    },
  ];

  // Get MDT schedules based on selected view
  const mdtSchedules = useMemo(() => {
    const allSchedules = getUpcomingMdtSchedules();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (mdtView === 'day') {
      // Show only today's schedules
      return allSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        scheduleDate.setHours(0, 0, 0, 0);
        return scheduleDate.getTime() === today.getTime();
      });
    } else if (mdtView === 'week') {
      // Show next 7 days
      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return allSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate >= today && scheduleDate < weekEnd;
      });
    } else {
      // Show next 30 days
      const monthEnd = new Date(today);
      monthEnd.setDate(monthEnd.getDate() + 30);
      return allSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate >= today && scheduleDate < monthEnd;
      });
    }
  }, [mdtView]);

  // Format date for display
  const formatMdtDate = (dateString) => {
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
    
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get color classes for attendee avatars
  const getAvatarColorClass = (color) => {
    const colorMap = {
      teal: 'bg-teal-100 text-teal-700',
      green: 'bg-green-100 text-green-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      blue: 'bg-blue-100 text-blue-700',
      purple: 'bg-purple-100 text-purple-700',
      pink: 'bg-pink-100 text-pink-700',
      indigo: 'bg-indigo-100 text-indigo-700',
      orange: 'bg-orange-100 text-orange-700',
      red: 'bg-red-100 text-red-700',
      gray: 'bg-gray-100 text-gray-700',
    };
    return colorMap[color] || 'bg-gray-100 text-gray-700';
  };

  const recentPatients = [
    { time: 'Yesterday', patient: 'Noah Parker', age: 55, status: 'Investigation', statusColor: 'purple' },
    { time: '2 days ago', patient: 'Ethan Carter', age: 62, status: 'Surgical', statusColor: 'blue' },
    { time: '3 days ago', patient: 'Olivia Bennett', age: 58, status: 'Postop Followup', statusColor: 'green' },
    { time: '5 days ago', patient: 'Ava Reynolds', age: 67, status: 'Investigation', statusColor: 'purple' },
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

  // Function to open MDT schedule details modal
  const openMdtScheduleDetails = (schedule) => {
    setSelectedMdtSchedule(schedule);
    setIsMdtDetailsOpen(true);
  };

  // Function to open MDT notes modal for MDT outcomes
  const openMdtOutcomeDetails = (outcome) => {
    setSelectedMdtOutcome(outcome);
    setIsMdtNotesOpen(true);
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
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    {activeTab === 'appointments' ? "Today's Appointments" : "Recent Patients"}
                  </h2>
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
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-600 text-xs sm:text-sm">Actions</th>
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
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <button
                              onClick={() => patientModalRef.current?.openPatientDetails(appointment.patient)}
                              className="px-3 py-1 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 transition-colors"
                            >
                              View
                            </button>
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
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <button
                              onClick={() => patientModalRef.current?.openPatientDetails(patient.patient)}
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

            {/* Patients Due for Review and Recent MDT Outcomes Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Patients Due for Review */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Patients Due for Review</h2>
                    <button
                      onClick={() => setIsPatientsReviewOpen(true)}
                      className="px-3 py-1 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div 
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setIsPatientsReviewOpen(true)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Next 7-14 Days</h3>
                        <div className="text-3xl font-bold text-teal-600 mb-2">12</div>
                        <div className="text-xs text-gray-500 mb-3">patients</div>
                        <div className="space-y-1 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <span>Postop Followup:</span>
                            <span className="font-medium">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Investigation:</span>
                            <span className="font-medium">4</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surgical:</span>
                            <span className="font-medium">3</span>
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
                      onClick={() => openMdtOutcomeDetails(outcome)}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-gray-900 text-sm hover:text-teal-600 transition-colors">
                          {outcome.patient}
                        </div>
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
            {/* MDT Schedule */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">MDT Schedule</h2>
              </div>
              <div className="p-4 sm:p-6">
                {/* Next MDT Discussion Card */}
                {mdtSchedules.length > 0 && (
                  <div 
                    onClick={() => openMdtScheduleDetails(mdtSchedules[0])}
                    className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200 mb-4 cursor-pointer hover:shadow-lg hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">Next MDT Discussion</h3>
                      <BsCalendar3 className="text-teal-600" />
                    </div>
                    <div className="text-sm text-gray-700 font-medium mb-1">
                      {formatMdtDate(mdtSchedules[0].date)} at {mdtSchedules[0].time}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      {mdtSchedules[0].department} • {mdtSchedules[0].location}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {mdtSchedules[0].attendees.slice(0, 3).map((attendee, idx) => (
                        <div 
                          key={idx} 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarColorClass(attendee.color)}`}
                        >
                          {attendee.initials}
                        </div>
                      ))}
                      {mdtSchedules[0].attendees.length > 3 && (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xs font-bold">
                          +{mdtSchedules[0].attendees.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {mdtSchedules[0].patientsCount} patients • Chair: {mdtSchedules[0].chair}
                    </div>
                  </div>
                )}
                
                {/* Day/Week/Month Toggle */}
                <div className="flex space-x-2 border-b border-gray-200 pb-3 mb-4">
                  <button 
                    onClick={() => setMdtView('day')}
                    className={`px-4 py-2 text-sm transition-colors ${
                      mdtView === 'day' 
                        ? 'text-teal-600 font-medium border-b-2 border-teal-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Day
                  </button>
                  <button 
                    onClick={() => setMdtView('week')}
                    className={`px-4 py-2 text-sm transition-colors ${
                      mdtView === 'week' 
                        ? 'text-teal-600 font-medium border-b-2 border-teal-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => setMdtView('month')}
                    className={`px-4 py-2 text-sm transition-colors ${
                      mdtView === 'month' 
                        ? 'text-teal-600 font-medium border-b-2 border-teal-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Month
                  </button>
                </div>

                {/* MDT Schedule List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mdtSchedules.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No MDT schedules for this period
                    </div>
                  ) : (
                    mdtSchedules.map((schedule) => (
                      <div 
                        key={schedule.id}
                        onClick={() => openMdtScheduleDetails(schedule)}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-teal-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-gray-900">
                                {formatMdtDate(schedule.date)}
                              </span>
                              <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-medium">
                                {schedule.department}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {schedule.time} • {schedule.location}
                            </div>
                          </div>
                          <IoChevronForward className="text-gray-400 text-sm flex-shrink-0" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            {schedule.attendees.slice(0, 4).map((attendee, idx) => (
                              <div 
                                key={idx}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${getAvatarColorClass(attendee.color)}`}
                                title={attendee.name}
                              >
                                {attendee.initials}
                              </div>
                            ))}
                            {schedule.attendees.length > 4 && (
                              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-[10px] font-bold">
                                +{schedule.attendees.length - 4}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {schedule.patientsCount} patients
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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


      {/* Patients Due for Review Modal */}
      <PatientsDueForReviewModal 
        isOpen={isPatientsReviewOpen}
        onClose={() => setIsPatientsReviewOpen(false)}
      />

      {/* Patient Details Modal Wrapper */}
      <PatientDetailsModalWrapper ref={patientModalRef} />

      {/* MDT Schedule Details Modal */}
      <MDTScheduleDetailsModal 
        isOpen={isMdtDetailsOpen}
        onClose={() => setIsMdtDetailsOpen(false)}
        schedule={selectedMdtSchedule}
      />

      {/* MDT Notes Modal */}
      <MDTNotesModal 
        isOpen={isMdtNotesOpen}
        onClose={() => setIsMdtNotesOpen(false)}
        patientName={selectedMdtOutcome?.patientName}
        outcome={selectedMdtOutcome?.outcome}
      />
    </div>
  );
};

export default UrologistDashboard;

