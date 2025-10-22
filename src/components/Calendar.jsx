import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import { getAllAppointments, getAppointmentsByDate, updateAppointmentDate } from '../utils/dummyData';
import RescheduleConfirmationModal from './RescheduleConfirmationModal';
import AppointmentDetailsModal from './AppointmentDetailsModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'day', 'week', 'month'
  const [draggedAppointment, setDraggedAppointment] = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState({ isOpen: false, appointment: null, newDate: null, newTime: null });
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, appointment: null });
  const [refreshKey, setRefreshKey] = useState(0); // Force re-render
  const dragRef = useRef(null);

  const appointments = getAllAppointments();

  // Get month name and year
  const getMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get week date range
  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  // Get day date string
  const getDayString = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get week days
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const today = new Date();
      days.push({
        date: day.getDate(),
        fullDate: day,
        dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
        monthName: day.toLocaleDateString('en-US', { month: 'short' }),
        isToday: day.toDateString() === today.toDateString()
      });
    }
    return days;
  };

  // Generate time slots (6 AM to 9 PM)
  const timeSlots = [];
  for (let hour = 6; hour <= 21; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    timeSlots.push(`${displayHour}:00 ${period}`);
  };

  // Helper function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  // Helper function to check if appointment time matches slot time
  const isTimeInSlot = (appointmentTime, slotTime) => {
    const convertedTime = convertTo12Hour(appointmentTime);
    // Check if the converted time starts with the slot hour (e.g., "9:00 AM" matches "9:15 AM", "9:30 AM", etc.)
    const slotHour = slotTime.split(':')[0];
    const slotPeriod = slotTime.split(' ')[1];
    const convertedHour = convertedTime.split(':')[0];
    const convertedPeriod = convertedTime.split(' ')[1];
    
    return slotHour === convertedHour && slotPeriod === convertedPeriod;
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date: prevMonthDay.getDate(),
        fullDate: prevMonthDay,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      const today = new Date();
      days.push({
        date: day,
        fullDate: fullDate,
        isCurrentMonth: true,
        isToday: fullDate.toDateString() === today.toDateString()
      });
    }

    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      days.push({
        date: nextMonthDay.getDate(),
        fullDate: nextMonthDay,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  // Format date for comparison
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Navigate months/weeks/days
  const navigate = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'month') {
        newDate.setMonth(prev.getMonth() + direction);
      } else if (view === 'week') {
        newDate.setDate(prev.getDate() + (direction * 7));
      } else if (view === 'day') {
        newDate.setDate(prev.getDate() + direction);
      }
      return newDate;
    });
  };

  // Handle drag start
  const handleDragStart = (e, appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e, targetDate) => {
    e.preventDefault();
    
    if (draggedAppointment) {
      // Get the date components directly from the target date
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
      const day = targetDate.getDate();
      
      // Create the date string in YYYY-MM-DD format directly
      const newDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const newTime = draggedAppointment.time; // Keep same time for now
      
      console.log('=== CALENDAR DEBUG ===');
      console.log('Target date object:', targetDate);
      console.log('Year:', year, 'Month:', month, 'Day:', day);
      console.log('Formatted newDate being passed:', newDate);
      console.log('=== END CALENDAR DEBUG ===');
      
      setRescheduleModal({
        isOpen: true,
        appointment: draggedAppointment,
        newDate: newDate,
        newTime: newTime
      });
    }
    
    setDraggedAppointment(null);
  };

  // Handle reschedule confirmation
  const handleRescheduleConfirm = (appointmentId, newDate, newTime) => {
    console.log('=== CONFIRMATION DEBUG ===');
    console.log('Appointment ID:', appointmentId);
    console.log('New Date:', newDate);
    console.log('New Time:', newTime);
    
    const updatedAppointment = updateAppointmentDate(appointmentId, newDate, newTime);
    console.log('Updated appointment:', updatedAppointment);
    
    // Force re-render to show updated appointments
    setRefreshKey(prev => prev + 1);
    setRescheduleModal({ isOpen: false, appointment: null, newDate: null, newTime: null });
    console.log('=== END CONFIRMATION DEBUG ===');
  };

  // Handle reschedule cancel
  const handleRescheduleCancel = () => {
    setRescheduleModal({ isOpen: false, appointment: null, newDate: null, newTime: null });
  };

  // Handle appointment details
  const handleAppointmentClick = (appointment) => {
    setDetailsModal({ isOpen: true, appointment: appointment });
  };

  // Handle details modal close
  const handleDetailsClose = () => {
    setDetailsModal({ isOpen: false, appointment: null });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {view === 'month' && getMonthYear(currentDate)}
            {view === 'week' && getWeekRange(currentDate)}
            {view === 'day' && getDayString(currentDate)}
          </h2>
          <button
            onClick={() => navigate(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['day', 'week', 'month'].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                view === viewType
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {viewType}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
        <div className="flex items-center gap-6 p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-600">Appointment for Investigation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded"></div>
            <span className="text-sm text-gray-600">Appointment for Urologist</span>
          </div>
        </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Month View */}
        {view === 'month' && (
          <>
            {/* Week day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div key={refreshKey} className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayAppointments = getAppointmentsByDate(formatDate(day.fullDate));
                const hasAppointments = dayAppointments.length > 0;

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] border border-gray-200 rounded-lg p-2 ${
                      day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                    } ${
                      day.isToday ? 'ring-2 ring-teal-500' : ''
                    } ${
                      hasAppointments ? 'bg-teal-50' : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day.fullDate)}
                  >
                    {/* Date number */}
                    <div className={`text-sm font-medium mb-1 ${
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {day.date}
                    </div>

                    {/* Appointments */}
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {dayAppointments.length > 0 ? (
                        dayAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, appointment)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(appointment);
                            }}
                            className={`p-1 rounded text-xs cursor-pointer group hover:opacity-90 transition-opacity ${
                              appointment.typeColor === 'teal' 
                                ? 'bg-teal-500 text-white' 
                                : 'bg-purple-500 text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">
                                  {convertTo12Hour(appointment.time)} {appointment.patientName}
                                </div>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAppointmentClick(appointment);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:bg-white/20 rounded p-0.5"
                                title="View details"
                              >
                                <FiMoreVertical className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400">No appointments</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Week View */}
        {view === 'week' && (
          <div key={refreshKey} className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Week header */}
              <div className="grid grid-cols-8 gap-px bg-gray-200 border-b border-gray-200">
                <div className="bg-white p-2 text-sm font-medium text-gray-500"></div>
                {getWeekDays(currentDate).map((day, index) => (
                  <div
                    key={index}
                    className={`bg-white p-2 text-center ${
                      day.isToday ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="text-xs text-gray-500">{day.dayName}</div>
                    <div className={`text-lg font-semibold ${
                      day.isToday ? 'text-teal-600' : 'text-gray-900'
                    }`}>
                      {day.date}
                    </div>
                    <div className="text-xs text-gray-500">{day.monthName}</div>
                  </div>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="grid grid-cols-8 gap-px bg-gray-200">
                {timeSlots.map((time, timeIndex) => (
                  <React.Fragment key={timeIndex}>
                    {/* Time label */}
                    <div className="bg-white p-2 text-xs text-gray-500 font-medium border-r border-gray-200">
                      {time}
                    </div>
                    
                    {/* Day columns */}
                    {getWeekDays(currentDate).map((day, dayIndex) => {
                      const dayAppointments = getAppointmentsByDate(formatDate(day.fullDate));
                      const timeAppointments = dayAppointments.filter(apt => isTimeInSlot(apt.time, time));
                      
                      return (
                        <div
                          key={dayIndex}
                          className={`bg-white p-1 min-h-[60px] relative ${
                            day.isToday ? 'bg-teal-50' : ''
                          }`}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, day.fullDate)}
                        >
                          {timeAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, appointment)}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAppointmentClick(appointment);
                              }}
                              className={`p-2 rounded text-xs cursor-pointer group hover:opacity-90 transition-opacity mb-1 ${
                                appointment.typeColor === 'teal' 
                                  ? 'bg-teal-500 text-white' 
                                  : 'bg-purple-500 text-white'
                              }`}
                            >
                              <div className="font-medium">{convertTo12Hour(appointment.time)}</div>
                              <div className="text-[10px] opacity-90">{appointment.patientName}</div>
                              <div className="text-[10px] opacity-80">{appointment.type}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Day View */}
        {view === 'day' && (
          <div key={refreshKey} className="max-w-2xl mx-auto">
            {timeSlots.map((time, timeIndex) => {
              const dayAppointments = getAppointmentsByDate(formatDate(currentDate));
              const timeAppointments = dayAppointments.filter(apt => isTimeInSlot(apt.time, time));
              
              return (
                <div
                  key={timeIndex}
                  className="flex border-b border-gray-200 hover:bg-gray-50"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, currentDate)}
                >
                  {/* Time label */}
                  <div className="w-24 p-3 text-sm text-gray-500 font-medium border-r border-gray-200">
                    {time}
                  </div>
                  
                  {/* Appointments */}
                  <div className="flex-1 p-2 min-h-[70px]">
                    {timeAppointments.length > 0 ? (
                      <div className="space-y-2">
                        {timeAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, appointment)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(appointment);
                            }}
                            className={`p-3 rounded-lg cursor-pointer group hover:opacity-90 transition-opacity ${
                              appointment.typeColor === 'teal' 
                                ? 'bg-teal-500 text-white' 
                                : 'bg-purple-500 text-white'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{convertTo12Hour(appointment.time)} - {appointment.patientName}</div>
                                <div className="text-xs opacity-90 mt-1">{appointment.type}</div>
                                {appointment.notes && (
                                  <div className="text-xs opacity-80 mt-1">{appointment.notes}</div>
                                )}
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAppointmentClick(appointment);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 rounded p-1"
                                title="View details"
                              >
                                <FiMoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 italic">No appointments</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reschedule Confirmation Modal */}
      <RescheduleConfirmationModal
        isOpen={rescheduleModal.isOpen}
        appointment={rescheduleModal.appointment}
        newDate={rescheduleModal.newDate}
        newTime={rescheduleModal.newTime}
        onConfirm={handleRescheduleConfirm}
        onCancel={handleRescheduleCancel}
      />

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={detailsModal.isOpen}
        appointment={detailsModal.appointment}
        onClose={handleDetailsClose}
      />
    </div>
  );
};

export default Calendar;
