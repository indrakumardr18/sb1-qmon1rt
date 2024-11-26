export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  enrollmentDate: string;
  grade: string;
  section: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface StudentFilters {
  grade?: string;
  section?: string;
  status?: Student['status'];
  search?: string;
}