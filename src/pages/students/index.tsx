import { StudentList } from '../../components/students/StudentList';

export function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
      </div>
      <StudentList />
    </div>
  );
}