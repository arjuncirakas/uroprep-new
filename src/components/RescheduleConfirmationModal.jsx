import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiArrowRight, FiCheck, FiAlertCircle } from 'react-icons/fi';

const RescheduleConfirmationModal = ({ isOpen, appointment, newDate, newTime, onConfirm, onCancel }) => {
  const [selectedTime, setSelectedTime] = useState(newTime || '09:00');
  const [selectedDate, setSelectedDate] = useState(newDate || '');
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isOpen && appointment) {
      // Use the date directly if it's already in YYYY-MM-DD format
      let formattedDate = newDate || '';
      
      // If the date is not in the correct format, try to parse it
      if (formattedDate && !formattedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const dateObj = new Date(formattedDate);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          formattedDate = `${year}-${month}-${day}`;
        }
      }
      
      setSelectedDate(formattedDate);
      setSelectedTime(newTime || appointment.time);
      setIsConfirming(false);
    }
  }, [isOpen, appointment, newDate, newTime]);

  if (!isOpen || !appointment) return null;

  const timeSlots = [];
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeString);
    }
  }

  const handleConfirm = async () => {
    setIsConfirming(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onConfirm(appointment.id, selectedDate, selectedTime);
    setIsConfirming(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
        
        {/* Header */}
        <div className="bg-teal-600 px-6 py-5 flex items-center justify-between border-b border-teal-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
              <FiCalendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Reschedule Appointment</h3>
              <p className="text-teal-50 text-sm mt-0.5">Confirm the new date and time</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <FiX className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Patient Information */}
          <div className="bg-gray-50 border border-gray-200 rounded p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                <FiUser className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">{appointment.patientName}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1.5">
                    <FiPhone className="w-3.5 h-3.5" />
                    {appointment.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiMail className="w-3.5 h-3.5" />
                    {appointment.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current vs New Appointment Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Current Appointment */}
            <div className="border-2 border-red-200 bg-red-50/50 rounded p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-red-200">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">Current Appointment</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Date</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(appointment.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiClock className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Time</p>
                    <p className="text-sm font-medium text-gray-900">{formatTime(appointment.time)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded mt-0.5 ${
                    appointment.typeColor === 'teal' ? 'bg-teal-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Type</p>
                    <p className="text-sm font-medium text-gray-900">{appointment.type}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* New Appointment */}
            <div className="border-2 border-green-200 bg-green-50/50 rounded p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">New Appointment</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedDate ? formatDate(selectedDate) : 'Select date'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiClock className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Time</p>
                    <p className="text-sm font-medium text-gray-900">{formatTime(selectedTime)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded mt-0.5 ${
                    appointment.typeColor === 'teal' ? 'bg-teal-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Type</p>
                    <p className="text-sm font-medium text-gray-900">{appointment.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Indicator */}
          <div className="flex justify-center py-2">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-xs font-medium">Rescheduling to</span>
              <FiArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="border border-gray-200 rounded p-5 bg-white">
            <h4 className="font-semibold text-gray-900 text-sm mb-4">Select New Date & Time</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* New Date */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  New Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* New Time */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  New Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Appointment Notes */}
          {appointment.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-blue-900 mb-1">Appointment Notes</h4>
                  <p className="text-sm text-blue-800">{appointment.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedDate && selectedTime ? (
              <span className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-green-600" />
                Ready to confirm
              </span>
            ) : (
              <span>Please select date and time</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              disabled={isConfirming}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || isConfirming}
              className="px-5 py-2 text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition-colors flex items-center gap-2"
            >
              {isConfirming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Confirming...
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  Confirm Reschedule
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleConfirmationModal;
