export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Groceries'
  | 'Dining'
  | 'Transportation'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export type UserRole = 'admin' | 'viewer';

export interface AppState {
  transactions: Transaction[];
  role: UserRole;
  theme: 'light' | 'dark';
  filters: {
    type: TransactionType | 'all';
    category: Category | 'all';
    search: string;
    dateFrom: string;
    dateTo: string;
  };
}
