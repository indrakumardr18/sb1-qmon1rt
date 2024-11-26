export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  instructor: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  grade: string;
  maxStudents: number;
  enrolledStudents: number;
  status: 'active' | 'inactive' | 'archived';
}

export interface CourseFilters {
  grade?: string;
  instructor?: string;
  status?: Course['status'];
  search?: string;
}