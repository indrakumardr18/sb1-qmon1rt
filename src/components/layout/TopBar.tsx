import { Menu, Bell } from 'lucide-react';
import { useAtom } from 'jotai';
import { authAtom } from '../../store/auth';

interface TopBarProps {
  onMenuButtonClick: () => void;
}

export function TopBar({ onMenuButtonClick }: TopBarProps) {
  const [auth] = useAtom(authAtom);

  return (
    <div className="sticky top-0 z-40 lg:ml-72 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="lg:hidden -m-2.5 p-2.5 text-gray-700 hover:text-blue-600"
          onClick={onMenuButtonClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-500 hover:text-gray-900"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {auth.user && (
              <>
                <span className="text-sm font-medium">{auth.user.name}</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={auth.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}`}
                  alt={auth.user.name}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}