import React, { useState, useRef, useEffect } from 'react';
import { IoClose, IoChevronDown } from 'react-icons/io5';

const BookInvestigationModal = ({ isOpen, onClose, patient, onSuccess }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  // Sample doctors list
  const doctors = [
    { id: 1, name: 'Dr. Sarah Wilson', specialization: 'Urologist' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Urologist' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Urologist' },
    { id: 4, name: 'Dr. David Kim', specialization: 'Radiologist' },
    { id: 5, name: 'Dr. Lisa Thompson', specialization: 'Pathologist' },
  ];

  // Generate time slots (9:00 AM to 5:00 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    const investigationData = {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      notes,
      patientName: patient?.name || 'Unknown',
      patientUPI: patient?.upi || 'Unknown',
      status: 'Scheduled',
      bookedDate: new Date().toISOString().split('T')[0],
    };

    console.log('Investigation Booked:', investigationData);
    
    // Call success callback
    if (onSuccess) {
      onSuccess(investigationData);
    }
    
    // Reset form
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
    
    // Close modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
    onClose();
  };

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-teal-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Book Investigation</h2>
              <p className="text-teal-100 mt-1">{patient?.name}</p>
            </div>
            <button
              onClick={handleCancel}
              className="bg-teal-500 hover:bg-teal-400 rounded-full p-2 transition-colors"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Patient Information Card */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-lg">
                {patient?.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{patient?.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>UPI: {patient?.upi}</div>
                <div>Age: {patient?.age}</div>
                <div>PSA: <span className="text-teal-600 font-medium">{patient?.psa} ng/mL</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column - Investigation Details */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900">Investigation Details</h3>
                
                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Doctor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <div 
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white cursor-pointer flex items-center justify-between"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className={selectedDoctor ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedDoctor || 'Choose a doctor...'}
                      </span>
                      <IoChevronDown 
                        className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {doctors.map((doctor) => (
                          <div
                            key={doctor.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => {
                              setSelectedDoctor(doctor.name);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {doctor.name} - {doctor.specialization}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Select Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Add any notes or special instructions for this investigation..."
                  />
                </div>
              </div>

              {/* Right Column - Time Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">Select Time</h3>
                  {selectedTime && (
                    <span className="text-sm text-teal-600 font-medium">Selected: {selectedTime}</span>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">Available Time Slots</h4>
                  </div>
                  
                  <div className="p-3">
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                            selectedTime === time
                              ? 'bg-teal-600 text-white border-teal-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-teal-50 hover:border-teal-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    
                    {!selectedTime && (
                      <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700">Please select a time slot</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedDoctor || !selectedDate || !selectedTime}
              className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Book Investigation
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookInvestigationModal;
