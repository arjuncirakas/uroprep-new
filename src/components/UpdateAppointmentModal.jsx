import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiUser, FiFileText } from 'react-icons/fi';

const UpdateAppointmentModal = ({ isOpen, onClose, patient }) => {
  // Pre-populate with existing appointment details
  const [selectedDoctor, setSelectedDoctor] = useState(patient?.currentDoctor || 'Dr. Sarah Wilson');
  const [selectedDate, setSelectedDate] = useState(patient?.nextAppointment || '2025-10-20');
  const [selectedTime, setSelectedTime] = useState(patient?.appointmentTime || '10:30');
  const [notes, setNotes] = useState(patient?.appointmentNotes || '');

  const doctors = [
    'Dr. Sarah Wilson',
    'Dr. Michael Chen',
    'Dr. Lisa Davis',
    'Dr. James Brown',
    'Dr. Emily Rodriguez',
    'Dr. David Thompson'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Update form when patient changes
  useEffect(() => {
    if (patient) {
      setSelectedDoctor(patient.currentDoctor || 'Dr. Sarah Wilson');
      setSelectedDate(patient.nextAppointment || '2025-10-20');
      setSelectedTime(patient.appointmentTime || '10:30');
      setNotes(patient.appointmentNotes || '');
    }
  }, [patient]);

  const getPathwayStyle = (pathway) => {
    switch (pathway) {
      case 'OPD Queue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Active Surveillance':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Surgical Pathway':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Post-Op Follow-up':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating appointment:', {
      patient: patient?.name,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      notes: notes
    });
    onClose();
  };

  const handleClose = () => {
    // Reset to original values when closing
    setSelectedDoctor(patient?.currentDoctor || 'Dr. Sarah Wilson');
    setSelectedDate(patient?.nextAppointment || '2025-10-20');
    setSelectedTime(patient?.appointmentTime || '10:30');
    setNotes(patient?.appointmentNotes || '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        
        {/* Modal Header - Simplified */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Update Appointment</h2>
              <p className="text-sm text-gray-500 mt-0.5">Modify existing appointment details</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Card - Cleaner Design */}
        <div className="px-6 py-4 bg-gradient-to-br from-teal-50 to-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md">
              {getInitials(patient?.name || '')}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base">{patient?.name}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                <span>{patient?.age} years</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>PSA {patient?.latestPsa} ng/mL</span>
              </div>
            </div>
            <span className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${getPathwayStyle(patient?.pathway)}`}>
              {patient?.pathway}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Select Doctor */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiUser className="w-4 h-4 text-teal-600" />
              Select Doctor
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 appearance-none text-gray-900"
                required
              >
                <option value="" className="text-gray-500">Choose a doctor...</option>
                {doctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date and Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Select Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiCalendar className="w-4 h-4 text-teal-600" />
                Select Date
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 text-gray-900"
                required
              />
            </div>

            {/* Selected Time Display */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiClock className="w-4 h-4 text-teal-600" />
                Selected Time
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 flex items-center justify-between">
                <span>{selectedTime || 'No time selected'}</span>
                {selectedTime && (
                  <button
                    type="button"
                    onClick={() => setSelectedTime('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Available Time Slots
            </label>
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiFileText className="w-4 h-4 text-teal-600" />
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 resize-none text-gray-900"
              placeholder="Add symptoms, special instructions, or other relevant information..."
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Optional: Include any important details for this appointment
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!selectedDoctor || !selectedDate}
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2.5 rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
            >
              <FiCalendar className="w-4 h-4" />
              Update Appointment
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointmentModal;
