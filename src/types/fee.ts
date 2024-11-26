export interface Fee {
  id: string;
  studentId: string;
  type: 'tuition' | 'transportation' | 'library' | 'laboratory' | 'other';
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  paymentMethod?: 'cash' | 'card' | 'bank_transfer';
  transactionId?: string;
}

export interface FeeFilters {
  type?: Fee['type'];
  status?: Fee['status'];
  startDate?: string;
  endDate?: string;
  search?: string;
}