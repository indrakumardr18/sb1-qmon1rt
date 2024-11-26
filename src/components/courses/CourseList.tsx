import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Course, CourseFilters } from '../../types/course';

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'MATH101',
    name: 'Advanced Mathematics',
    description: 'Advanced mathematics course covering algebra and calculus',
    credits: 4,
    instructor: 'Dr. Smith',
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '10:30' },
      { day: 'Wednesday', startTime: '09:00', endTime: '10:30' },
    ],
    grade: '10',
    maxStudents: 30,
    enrolledStudents: 25,
    status: 'active',
  },
  // Add more mock data as needed
];

export function CourseList() {
  const [filters, setFilters] = useState<CourseFilters>({});
  const [courses] = useState<Course[]>(mockCourses);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search courses..."
            className="w-64"
            icon={<Search className="h-4 w-4" />}
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <Button>Add Course</Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrollment
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {course.name}
                      </div>
                      <div className="text-sm text-gray-500">{course.code}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.instructor}</div>
                  <div className="text-sm text-gray-500">Grade {course.grade}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.schedule.map((schedule, index) => (
                    <div key={index} className="text-sm text-gray-900">
                      {schedule.day} {schedule.startTime}-{schedule.endTime}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {course.enrolledStudents}/{course.maxStudents}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(course.enrolledStudents / course.maxStudents) * 100}%`,
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}