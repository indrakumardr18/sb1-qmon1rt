import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar onMenuButtonClick={() => setSidebarOpen(true)} />
      
      <main className="lg:pl-72">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}