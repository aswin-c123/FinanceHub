import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { useApp } from '../context/AppContext';
import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  formatCurrency,
} from '../utils/calculations';
import { SummaryCard } from '../components/SummaryCard';
import { BalanceTrendChart } from '../components/BalanceTrendChart';
import { CategoryBreakdownChart } from '../components/CategoryBreakdownChart';

export const Dashboard: React.FC = () => {
  const { transactions } = useApp();

  const balance = calculateBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your financial activity
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(balance)}
          icon={Wallet}
          delay={0}
        />
        <SummaryCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={TrendingUp}
          delay={0.08}
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown}
          delay={0.16}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart />
        <CategoryBreakdownChart />
      </div>
    </motion.div>
  );
};