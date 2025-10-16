import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import UrologistPanel from './components/panels/UrologistPanel'
import GPPanel from './components/panels/GPPanel'
import NursePanel from './components/panels/NursePanel'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="urologist" element={<UrologistPanel />} />
          <Route path="gp" element={<GPPanel />} />
          <Route path="nurse" element={<NursePanel />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App