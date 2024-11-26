import { Users, BookOpen, Calendar, CreditCard } from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '2,100', icon: Users },
  { name: 'Active Courses', value: '48', icon: BookOpen },
  { name: 'Classes Today', value: '12', icon: Calendar },
  { name: 'Revenue (Monthly)', value: '$48,352', icon: CreditCard },
];

export function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Activities
            </h2>
            <div className="mt-6">
              <p className="text-sm text-gray-500">No recent activities</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Upcoming Events
            </h2>
            <div className="mt-6">
              <p className="text-sm text-gray-500">No upcoming events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}