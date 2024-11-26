import { AttendanceSheet } from '../../components/attendance/AttendanceSheet';

export function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>
      </div>
      <AttendanceSheet />
    </div>
  );
}