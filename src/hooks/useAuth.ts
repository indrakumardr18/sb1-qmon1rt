import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { authAtom } from '../store/auth';
import { login, signup, logout, getCurrentUser } from '../lib/auth';
import type { LoginCredentials, SignupData } from '../types/auth';

export function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);
  const queryClient = useQueryClient();

  // Query for getting current user
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: getCurrentUser,
    onSuccess: (user) => {
      setAuth({ user, isAuthenticated: !!user, isLoading: false });
    },
    onError: () => {
      setAuth({ user: null, isAuthenticated: false, isLoading: false });
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setAuth({ user, isAuthenticated: true, isLoading: false });
      queryClient.setQueryData(['auth'], user);
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      setAuth({ user, isAuthenticated: true, isLoading: false });
      queryClient.setQueryData(['auth'], user);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuth({ user: null, isAuthenticated: false, isLoading: false });
      queryClient.setQueryData(['auth'], null);
    },
  });

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: isLoading || auth.isLoading,
    login: (credentials: LoginCredentials) => loginMutation.mutateAsync(credentials),
    signup: (data: SignupData) => signupMutation.mutateAsync(data),
    logout: () => logoutMutation.mutateAsync(),
  };
}