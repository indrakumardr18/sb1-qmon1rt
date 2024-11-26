import { Navigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../store/auth';
import { hasPermission } from '../../lib/auth';
import type { Role } from '../../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const [auth] = useAtom(authAtom);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !hasPermission(auth.user, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}