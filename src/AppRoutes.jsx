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

// Nurse Pages
import NurseDashboard from './pages/nurse/Dashboard';

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
        {/* Add more GP routes here as needed */}
      </Route>

      {/* Nurse Routes */}
      <Route path="/nurse" element={<NurseLayout />}>
        <Route index element={<Navigate to="/nurse/dashboard" replace />} />
        <Route path="dashboard" element={<NurseDashboard />} />
        {/* Add more nurse routes here as needed */}
      </Route>

      {/* Default Route - Redirect to Urologist Dashboard */}
      <Route path="/" element={<Navigate to="/urologist/dashboard" replace />} />

      {/* Catch all - Redirect to Urologist Dashboard */}
      <Route path="*" element={<Navigate to="/urologist/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

