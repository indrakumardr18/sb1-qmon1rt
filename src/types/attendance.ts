export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface AttendanceRecord {
  date: string;
  students: {
    id: string;
    name: string;
    status: Attendance['status'];
  }[];
}