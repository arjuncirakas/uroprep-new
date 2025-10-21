import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaFlask, FaUsers } from 'react-icons/fa';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { IoAddCircle } from 'react-icons/io5';
import { SiTicktick } from 'react-icons/si';

const PatientDetailsModal = ({ isOpen, onClose, patient }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Initialize checked tasks based on patient data
  const getInitialCheckedTasks = () => {
    if (!patient?.tasks) return new Set();
    return new Set(patient.tasks.filter(task => task.completed).map(task => task.id));
  };
  
  const [checkedTasks, setCheckedTasks] = useState(getInitialCheckedTasks());

  // Update checked tasks when patient changes
  React.useEffect(() => {
    if (patient?.tasks) {
      setCheckedTasks(getInitialCheckedTasks());
    }
  }, [patient?.id]);

  if (!isOpen || !patient) return null;

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

  const tasks = patient.tasks || [];
  const recentNotes = patient.recentNotes || [];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-xl shadow-2xl w-[95vw] h-[95vh] flex flex-col relative">
        {/* Fixed Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-900">Patient Details</h2>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Patient Information Header Card */}
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between h-full">
                <div className="flex items-start space-x-20 h-full">
                  <div className="flex-1">
                    <h1 className="text-3xl font-semibold text-gray-900">{patient.name}</h1>
                    <p className="text-gray-600 mt-1">{patient.age}, {patient.gender}</p>
                  </div>
                  <div className="border-l border-gray-200 pl-8 h-full flex flex-col justify-center">
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">PATIENT ID / MRN</p>
                    <p className="text-gray-900 font-semibold text-lg">{patient.patientId} / {patient.mrn}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-medium mb-1">
                    Last Appt: <span className="font-normal text-gray-700">{patient.lastAppointment}</span>
                  </p>
                  <p className="text-gray-900 font-medium mb-2">
                    Phone: <span className="font-normal text-gray-700">{patient.phone}</span>
                  </p>
                  <p className="text-gray-500 text-sm">{patient.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6">
            <div className="boeder border-b-gray-100 px-6">
              <div className="flex space-x-8 -mb-px">
                {['Overview', 'Medical History', 'Investigations', 'Pathways'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                    className={`pb-4 font-medium text-sm transition-colors relative ${
                      activeTab === tab.toLowerCase().replace(' ', '')
                        ? 'text-teal-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase().replace(' ', '') && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pathway/Monitoring Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-teal-600">{patient.pathway?.type || 'Pathway'}</h3>
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    patient.pathway?.status === 'On Track' || patient.pathway?.status === 'Active' 
                      ? 'bg-green-50 text-green-600' 
                      : patient.pathway?.status === 'Completed' || patient.pathway?.status === 'Discharged'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {patient.pathway?.status || 'Unknown'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-6">Next: {patient.pathway?.nextAction || 'No scheduled actions'}</p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">Latest PSA</p>
                    <div className="text-3xl font-semibold text-gray-900 mb-1">{patient.vitals?.latestPSA || '-'}</div>
                    <div className="text-xs text-gray-400">{patient.vitals?.psaDate || '-'}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">Prostate Volume</p>
                    <div className="text-3xl font-semibold text-gray-900 mb-1">{patient.vitals?.prostateVolume || '-'}</div>
                    <div className="text-xs text-gray-400">{patient.vitals?.volumeDate || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity / Notes Summary Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity / Notes Summary</h3>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-semibold">
                    View All Notes
                  </button>
                </div>
                <div className="space-y-5 mb-6">
                  {recentNotes.map((note, index) => (
                    <div key={index}>
                      <div className="font-semibold text-gray-900 mb-1">{note.title}</div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {note.date}: {note.content}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-teal-50 text-teal-600 py-3 px-4 rounded-lg hover:bg-teal-100 transition-colors flex items-center justify-center font-semibold text-sm">
                  <BiMessageSquareAdd className="mr-2 text-lg" />
                  Add New Note
                </button>
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-teal-100 text-teal-700 py-3 px-4 rounded-lg hover:bg-teal-200 transition-colors flex items-center justify-center font-semibold text-sm">
                    <FaFlask className="mr-2" />
                    Request Investigation
                  </button>
                  <button className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center font-semibold text-sm">
                    <FaUsers className="mr-2" />
                    Suggest MDT Discussion
                  </button>
                </div>
              </div>

              {/* Pending Tasks Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending tasks for {patient.name?.split(' ')[0]}</h3>
                <div className="space-y-3 mb-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 py-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-0.5 flex-shrink-0 hover:opacity-70 transition-opacity"
                      >
                        {checkedTasks.has(task.id) ? (
                          <MdCheckBox className="text-teal-600 text-xl" />
                        ) : (
                          <MdCheckBoxOutlineBlank className="text-gray-300 text-xl" />
                        )}
                      </button>
                      <span className={`text-sm leading-relaxed ${
                        checkedTasks.has(task.id) 
                          ? 'text-gray-400 line-through' 
                          : 'text-gray-700'
                      }`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-teal-50 text-teal-600 py-3 px-4 rounded-lg hover:bg-teal-100 transition-colors flex items-center justify-center font-semibold text-sm">
                  <SiTicktick className="mr-2 text-lg" />
                  Add New Task
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
