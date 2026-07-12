import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route
            path="/*"
            element={
              <div className="flex bg-slate-50 min-h-screen w-full overflow-hidden">
                {/* Fixed Control Panel Navigation Sidebar */}
                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                
                {/* Dynamic Content Operations Workspace */}
                <main className="flex-1 lg:pl-64 flex flex-col min-h-screen w-full bg-slate-50 overflow-y-auto">
                  {/* Global Header Operations */}
                  <Navbar /> 
                  
                  {/* Pages Padding Wrapper */}
                  <div className="p-6 md:p-8 flex-1 w-full max-w-7xl mx-auto">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/drivers" element={<Drivers />} />
                      <Route path="/trips" element={<Trips />} />
                      <Route path="/maintenance" element={<Maintenance />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </div>
                </main>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}