import React, { useState } from 'react';
import { 
  UserPlus, 
  X,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle,
  User,
  Stethoscope,
  Heart,
  MessageSquare,
  Activity,
  Save
} from 'lucide-react';

const AddPatientModal = ({ isOpen, onClose, onPatientAdded, isUrologist = false }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    city: '',
    state: '',
    
    // Medical Information
    referringDepartment: '',
    referralDate: '',
    initialPSA: '',
    initialPSADate: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    assignedUrologist: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Initial Assessment
    priority: 'Normal',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available urologists (same as in OPDManagement)
  const urologists = [
    { id: 'dr_smith', name: 'Dr. John Smith', specialization: 'Urologist', experience: '15 years' },
    { id: 'dr_johnson', name: 'Dr. Sarah Johnson', specialization: 'Urologist', experience: '12 years' },
    { id: 'dr_wilson', name: 'Dr. Michael Wilson', specialization: 'Urologist', experience: '18 years' },
    { id: 'dr_brown', name: 'Dr. Emily Brown', specialization: 'Urologist', experience: '10 years' },
    { id: 'dr_davis', name: 'Dr. Robert Davis', specialization: 'Urologist', experience: '20 years' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.initialPSA) newErrors.initialPSA = 'Initial PSA is required';
    
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate UPI
      const upi = `URP${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
      
      // Create patient object
      const newPatient = {
        id: `PAT${String(Math.floor(Math.random() * 10000)).padStart(3, '0')}`,
        upi,
        name: `${formData.firstName} ${formData.lastName}`,
        ...formData,
        status: 'Active',
        lastAppointment: formData.referralDate,
        nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        lastPSA: parseFloat(formData.initialPSA),
        lastPSADate: formData.initialPSADate,
        latestPSA: parseFloat(formData.initialPSA), // Also add latestPSA for consistency
        age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
        assignedUrologist: formData.assignedUrologist || 'Not Assigned'
      };
      
      console.log('New patient created:', newPatient);
      
      // Call the callback function to notify parent component
      if (onPatientAdded) {
        onPatientAdded(newPatient);
      }
      
      // Reset form and close modal
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        postcode: '',
        city: '',
        state: '',
        referringDepartment: '',
        referralDate: '',
        initialPSA: '',
        initialPSADate: '',
        medicalHistory: '',
        currentMedications: '',
        allergies: '',
        assignedUrologist: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        priority: 'Normal',
        notes: ''
      });
      setErrors({});
      onClose();
      
    } catch (error) {
      console.error('Error creating patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      postcode: '',
      city: '',
      state: '',
      referringDepartment: '',
      referralDate: '',
      initialPSA: '',
      initialPSADate: '',
      medicalHistory: '',
      currentMedications: '',
      allergies: '',
      assignedUrologist: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      priority: 'Normal',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] border border-gray-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-teal-600 px-6 py-5 flex items-center justify-between border-b border-teal-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Add New Patient</h3>
              <p className="text-teal-50 text-sm mt-0.5">Create a comprehensive patient record for the urology department</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information */}
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                  <User className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Personal Information</h4>
                  <p className="text-sm text-gray-600">Basic patient details and contact information</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.firstName 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.lastName 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.dateOfBirth 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.gender 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.phone 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="+61 412 345 678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.email 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="patient@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="2000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Sydney"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referring Department
                </label>
                <input
                  type="text"
                  name="referringDepartment"
                  value={formData.referringDepartment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="General Practice, Cardiology, Emergency, etc."
                />
              </div>
            </div>

            {/* PSA Information */}
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                  <Activity className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">PSA Information</h4>
                  <p className="text-sm text-gray-600">Prostate-specific antigen levels and testing details</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial PSA Level *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="initialPSA"
                    value={formData.initialPSA}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.initialPSA 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="4.5"
                  />
                  {errors.initialPSA && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.initialPSA}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PSA Test Date
                  </label>
                  <input
                    type="date"
                    name="initialPSADate"
                    value={formData.initialPSADate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>


            {/* Medical Information */}
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Medical Information</h4>
                  <p className="text-sm text-gray-600">Clinical details and treatment pathway</p>
                </div>
              </div>
                
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Urologist
                  </label>
                  <select
                    name="assignedUrologist"
                    value={formData.assignedUrologist}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select urologist</option>
                    {urologists.map((urologist) => (
                      <option key={urologist.id} value={urologist.name}>
                        {urologist.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Referral Date
                  </label>
                  <input
                    type="date"
                    name="referralDate"
                    value={formData.referralDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Previous medical conditions, surgeries, etc."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <textarea
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="List current medications"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Known allergies"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                  <Heart className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Emergency Contact</h4>
                  <p className="text-sm text-gray-600">Emergency contact information for the patient</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Emergency contact name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+61 412 345 678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Spouse, Child, etc."
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-50 border border-teal-200 rounded flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">Additional Notes</h4>
                  <p className="text-sm text-gray-600">Any additional notes or special considerations</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Any additional notes or special considerations"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded transition-colors mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Patient...' : 'Add Patient'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;

