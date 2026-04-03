import { Transaction } from '../types';

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  
  // Generate transactions for the last 6 months
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  // Income transactions
  const incomeData = [
    { category: 'Salary' as const, amount: 5000, description: 'Monthly Salary' },
    { category: 'Freelance' as const, amount: 1500, description: 'Web Development Project' },
    { category: 'Investment' as const, amount: 500, description: 'Stock Dividends' },
  ];

  // Expense transactions
  const expenseData = [
    { category: 'Groceries' as const, amounts: [150, 200, 180, 220], descriptions: ['Weekly Groceries', 'Supermarket', 'Fresh Produce', 'Grocery Shopping'] },
    { category: 'Dining' as const, amounts: [45, 60, 35, 50, 75], descriptions: ['Restaurant Dinner', 'Lunch Out', 'Coffee Shop', 'Pizza Night', 'Brunch'] },
    { category: 'Transportation' as const, amounts: [80, 60, 70], descriptions: ['Gas', 'Public Transit Pass', 'Uber'] },
    { category: 'Utilities' as const, amounts: [120, 150, 85], descriptions: ['Electric Bill', 'Internet & Phone', 'Water Bill'] },
    { category: 'Entertainment' as const, amounts: [50, 30, 100, 25], descriptions: ['Movie Theater', 'Streaming Services', 'Concert Tickets', 'Books'] },
    { category: 'Healthcare' as const, amounts: [200, 45, 60], descriptions: ['Doctor Visit', 'Pharmacy', 'Gym Membership'] },
    { category: 'Shopping' as const, amounts: [150, 80, 200, 120], descriptions: ['Clothing', 'Electronics', 'Home Decor', 'Shoes'] },
    { category: 'Education' as const, amounts: [300, 50], descriptions: ['Online Course', 'Books & Supplies'] },
  ];

  let id = 1;

  // Generate monthly data
  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const monthDate = new Date();
    monthDate.setMonth(today.getMonth() - monthOffset);
    
    // Add income transactions (monthly)
    incomeData.forEach((income) => {
      const date = new Date(monthDate);
      if (income.category === 'Salary') {
        date.setDate(1); // First of month
      } else {
        date.setDate(Math.floor(Math.random() * 28) + 1);
      }
      
      transactions.push({
        id: `txn-${id++}`,
        date: date.toISOString().split('T')[0],
        amount: income.amount + (Math.random() * 200 - 100), // Add some variance
        category: income.category,
        type: 'income',
        description: income.description,
      });
    });

    // Add expense transactions (multiple per category)
    expenseData.forEach((expense) => {
      const count = Math.floor(Math.random() * 3) + 1; // 1-3 transactions per category per month
      for (let i = 0; i < count; i++) {
        const date = new Date(monthDate);
        date.setDate(Math.floor(Math.random() * 28) + 1);
        
        const randomAmount = expense.amounts[Math.floor(Math.random() * expense.amounts.length)];
        const randomDesc = expense.descriptions[Math.floor(Math.random() * expense.descriptions.length)];
        
        transactions.push({
          id: `txn-${id++}`,
          date: date.toISOString().split('T')[0],
          amount: randomAmount + (Math.random() * 20 - 10), // Add small variance
          category: expense.category,
          type: 'expense',
          description: randomDesc,
        });
      }
    });
  }

  // Sort by date (most recent first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockTransactions = generateMockTransactions();
