import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../store/auth';
import { getCurrentUser } from '../../lib/auth';

const publicRoutes = ['/login', '/forgot-password', '/reset-password'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setAuth({ user, isAuthenticated: !!user, isLoading: false });

        if (!user && !publicRoutes.includes(location.pathname)) {
          navigate('/login', { replace: true });
        }
      } catch {
        setAuth({ user: null, isAuthenticated: false, isLoading: false });
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login', { replace: true });
        }
      }
    };

    initAuth();
  }, [setAuth, navigate, location.pathname]);

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}