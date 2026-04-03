import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useApp } from '../context/AppContext';
import { getMonthlyTrend } from '../utils/calculations';
import { motion } from 'motion/react';

export const BalanceTrendChart: React.FC = () => {
  const { transactions, theme } = useApp();
  const data = getMonthlyTrend(transactions);
  const [animationComplete, setAnimationComplete] = useState(false);

  const chartColors = {
    income: theme === 'dark' ? '#4ade80' : '#22c55e',
    expenses: theme === 'dark' ? '#f87171' : '#ef4444',
    balance: theme === 'dark' ? '#60a5fa' : '#3b82f6',
    grid: theme === 'dark' ? '#374151' : '#e5e7eb',
    text: theme === 'dark' ? '#9ca3af' : '#6b7280',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <Card className="transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Financial Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} onAnimationEnd={() => setAnimationComplete(true)}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${chartColors.grid}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke={chartColors.income}
                strokeWidth={2}
                name="Income"
                animationDuration={1500}
                animationBegin={300}
                animationEasing="ease-out"
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke={chartColors.expenses}
                strokeWidth={2}
                name="Expenses"
                animationDuration={1500}
                animationBegin={450}
                animationEasing="ease-out"
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={chartColors.balance}
                strokeWidth={2}
                name="Net"
                animationDuration={1500}
                animationBegin={600}
                animationEasing="ease-out"
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};