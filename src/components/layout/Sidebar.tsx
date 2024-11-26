import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission } from '../../lib/auth';
import type { Role } from '../../types/auth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  allowedRoles: Role[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: GraduationCap, allowedRoles: ['admin', 'teacher', 'student'] },
  { name: 'Students', href: '/students', icon: Users, allowedRoles: ['admin', 'teacher'] },
  { name: 'Courses', href: '/courses', icon: BookOpen, allowedRoles: ['admin', 'teacher'] },
  { name: 'Schedule', href: '/schedule', icon: Calendar, allowedRoles: ['admin', 'teacher', 'student'] },
  { name: 'Attendance', href: '/attendance', icon: ClipboardList, allowedRoles: ['admin', 'teacher'] },
  { name: 'Fees', href: '/fees', icon: CreditCard, allowedRoles: ['admin'] },
  { name: 'Messages', href: '/messages', icon: MessageSquare, allowedRoles: ['admin', 'teacher', 'student'] },
  { name: 'Settings', href: '/settings', icon: Settings, allowedRoles: ['admin'] },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div
        className={twMerge(
          'fixed inset-0 z-50 bg-gray-900/80 lg:hidden',
          open ? 'block' : 'hidden'
        )}
        onClick={onClose}
      />

      <div
        className={twMerge(
          'fixed inset-y-0 left-0 z-50 w-72 bg-white lg:block',
          !open && 'hidden'
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <span className="text-xl font-semibold">School ERP</span>
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700 hover:text-blue-600"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col py-4">
          <ul className="flex-1 space-y-1 px-3">
            {navigation.map((item) => (
              hasPermission(user, item.allowedRoles) && (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      twMerge(
                        'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold',
                        isActive
                          ? 'bg-gray-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </NavLink>
                </li>
              )
            ))}
          </ul>

          {user && (
            <div className="mt-auto border-t border-gray-200 px-3 py-3">
              <div className="flex items-center gap-x-4">
                <img
                  className="h-10 w-10 rounded-full bg-gray-50"
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate capitalize">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}