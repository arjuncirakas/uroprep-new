import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import UrologistLayout from './layouts/UrologistLayout';
import GPLayout from './layouts/GPLayout';
import NurseLayout from './layouts/NurseLayout';

// Auth
import Login from './components/auth/Login';

// Urologist Pages
import UrologistDashboard from './pages/urologist/Dashboard';
import Patients from './pages/urologist/Patients';
import Appointments from './pages/urologist/Appointments';

// GP Pages
import GPDashboard from './pages/gp/Dashboard';
import GPReferredPatients from './pages/gp/ReferredPatients';
import GPActiveMonitoring from './pages/gp/ActiveMonitoring';

// Nurse Pages
import OPDManagement from './pages/nurse/OPDManagement';
import PatientList from './pages/nurse/PatientList';
import NurseAppointments from './pages/nurse/Appointments';
import ActiveMonitoring from './pages/nurse/ActiveMonitoring';
import Surgery from './pages/nurse/Surgery';
import PostOpFollowup from './pages/nurse/PostOpFollowup';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Urologist Routes */}
      <Route path="/urologist" element={<UrologistLayout />}>
        <Route index element={<Navigate to="/urologist/dashboard" replace />} />
        <Route path="dashboard" element={<UrologistDashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="patients/new" element={<Patients />} />
        <Route path="patients/surgery-pathway" element={<Patients />} />
        <Route path="patients/post-op-followup" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
      </Route>

      {/* GP Routes */}
      <Route path="/gp" element={<GPLayout />}>
        <Route index element={<Navigate to="/gp/dashboard" replace />} />
        <Route path="dashboard" element={<GPDashboard />} />
        <Route path="referred-patients" element={<GPReferredPatients />} />
        <Route path="monitoring" element={<GPActiveMonitoring />} />
      </Route>

      {/* Nurse Routes */}
      <Route path="/nurse" element={<NurseLayout />}>
        <Route index element={<Navigate to="/nurse/opd-management" replace />} />
        <Route path="opd-management" element={<OPDManagement />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="appointments" element={<NurseAppointments />} />
        <Route path="monitoring" element={<ActiveMonitoring />} />
        <Route path="surgery" element={<Surgery />} />
        <Route path="followup" element={<PostOpFollowup />} />
      </Route>

      {/* Default Route - Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch all - Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

