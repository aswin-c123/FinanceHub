import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, UserRole, AppState, TransactionType, Category } from '../types';
import { mockTransactions } from '../data/mockData';

interface AppContextType extends AppState {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: UserRole) => void;
  toggleTheme: () => void;
  setFilter: (key: keyof AppState['filters'], value: string) => void;
  resetFilters: () => void;
  exportTransactions: (format: 'csv' | 'json') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'finance-dashboard-data';

const defaultFilters = {
  type: 'all' as TransactionType | 'all',
  category: 'all' as Category | 'all',
  search: '',
  dateFrom: '',
  dateTo: '',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [role, setRoleState] = useState<UserRole>('admin');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [filters, setFilters] = useState(defaultFilters);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setTransactions(data.transactions || mockTransactions);
        setRoleState(data.role || 'admin');
        setTheme(data.theme || 'light');
      } catch (error) {
        console.error('Error loading data:', error);
        setTransactions(mockTransactions);
      }
    } else {
      setTransactions(mockTransactions);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ transactions, role, theme })
    );
  }, [transactions, role, theme]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((txn) => (txn.id === id ? { ...txn, ...updates } : txn))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setFilter = (key: keyof AppState['filters'], value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const exportTransactions = (format: 'csv' | 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(transactions, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const exportFileDefaultName = `transactions-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else if (format === 'csv') {
      const headers = ['ID', 'Date', 'Amount', 'Category', 'Type', 'Description'];
      const csvRows = [
        headers.join(','),
        ...transactions.map((txn) =>
          [
            txn.id,
            txn.date,
            txn.amount.toFixed(2),
            txn.category,
            txn.type,
            `"${txn.description.replace(/"/g, '""')}"`,
          ].join(',')
        ),
      ];
      const csvString = csvRows.join('\n');
      const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvString)}`;
      const exportFileDefaultName = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const value: AppContextType = {
    transactions,
    role,
    theme,
    filters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setRole,
    toggleTheme,
    setFilter,
    resetFilters,
    exportTransactions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
