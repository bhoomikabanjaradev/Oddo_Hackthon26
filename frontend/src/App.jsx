import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

// Core Dashboard Pages Allocation
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Vehicles from './pages/Vehicles.jsx';
import Drivers from './pages/Drivers.jsx';
import Trips from './pages/Trips.jsx';
import Maintenance from './pages/Maintenance.jsx';

// Connect global Tailwind configurations directly
import './index.css';

// Separate Dashboard Layout Wrapper to isolate Tailwind structures cleanly
function DashboardLayout({ setIsAuthenticated }) {
  return (
    <div className="flex bg-slate-50 h-screen w-screen overflow-hidden">
      {/* Fixed Control Panel Navigation Sidebar */}
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      
      {/* Dynamic Content Operations Workspace */}
      <div className="flex-1 lg:pl-64 flex flex-col h-full w-full bg-slate-50 overflow-hidden">
        {/* Global Header Operations */}
        <Navbar /> 
        
        {/* Pages Padding Wrapper with isolated scrolling container */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if token already exists from a previous active session
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-mono text-sm tracking-wider">
        Initializing Control Protocols...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes Terminal */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          } 
        />

        {/* Protected System Wrapper */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          {/* Main Dashboard Layout Element Wrapper */}
          <Route element={<DashboardLayout setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/maintenance" element={<Maintenance />} />
            {/* Catch-all to fallback safely */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
        
        {/* Fallback route outside login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
