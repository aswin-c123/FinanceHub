import { Transaction } from '../types';

export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((acc, txn) => {
    return txn.type === 'income' ? acc + txn.amount : acc - txn.amount;
  }, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((txn) => txn.type === 'income')
    .reduce((acc, txn) => acc + txn.amount, 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((txn) => txn.type === 'expense')
    .reduce((acc, txn) => acc + txn.amount, 0);
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const expenses = transactions.filter((txn) => txn.type === 'expense');
  const categoryTotals: { [key: string]: number } = {};

  expenses.forEach((txn) => {
    categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + txn.amount;
  });

  return Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyTrend = (transactions: Transaction[]) => {
  const monthlyData: { [key: string]: { income: number; expenses: number; balance: number } } = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0, balance: 0 };
    }

    if (txn.type === 'income') {
      monthlyData[monthKey].income += txn.amount;
    } else {
      monthlyData[monthKey].expenses += txn.amount;
    }
  });

  // Calculate balance and format for chart
  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      income: Math.round(data.income),
      expenses: Math.round(data.expenses),
      balance: Math.round(data.income - data.expenses),
    }))
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
};

export const getHighestSpendingCategory = (transactions: Transaction[]) => {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown[0] || { name: 'None', value: 0 };
};

export const getMonthlyComparison = (transactions: Transaction[]) => {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastMonth = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;

  const currentMonthExpenses = transactions
    .filter((txn) => {
      const txnMonth = txn.date.substring(0, 7);
      return txn.type === 'expense' && txnMonth === currentMonth;
    })
    .reduce((acc, txn) => acc + txn.amount, 0);

  const lastMonthExpenses = transactions
    .filter((txn) => {
      const txnMonth = txn.date.substring(0, 7);
      return txn.type === 'expense' && txnMonth === lastMonth;
    })
    .reduce((acc, txn) => acc + txn.amount, 0);

  const difference = currentMonthExpenses - lastMonthExpenses;
  const percentageChange = lastMonthExpenses > 0 ? (difference / lastMonthExpenses) * 100 : 0;

  return {
    current: currentMonthExpenses,
    previous: lastMonthExpenses,
    difference,
    percentageChange,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
