import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export function ProtectedRoute({ children, roles }) {
  const { profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(profile.role)) {
    if (profile.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (profile.role === 'professional') {
      return <Navigate to="/profissional/agenda" replace />;
    }
    return <Navigate to="/cliente/servicos" replace />;
  }

  return children;
}
