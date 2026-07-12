import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated }) {
  // Agar user authorized nahi hai, toh use access block karke seedha login interface par bhej do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}