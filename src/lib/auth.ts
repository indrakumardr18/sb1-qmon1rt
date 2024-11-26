import api from './api';
import type { User, LoginCredentials, SignupData } from '../types/auth';

export async function login({ email, password }: LoginCredentials) {
  const { data } = await api.post<{ token: string; user: User }>('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('auth_token', data.token);
  return data.user;
}

export async function signup(signupData: SignupData) {
  const { data } = await api.post<{ token: string; user: User }>('/auth/signup', signupData);
  localStorage.setItem('auth_token', data.token);
  return data.user;
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('auth_token');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/auth/me');
    return data;
  } catch {
    return null;
  }
}

export function hasPermission(user: User | null, allowedRoles: Role[]) {
  return user && allowedRoles.includes(user.role);
}