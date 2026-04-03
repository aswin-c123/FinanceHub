import React from 'react';
import { useApp } from '../context/AppContext';
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  formatCurrency,
  getCategoryBreakdown,
} from '../utils/calculations';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, TrendingDown, PieChart, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Progress } from '../components/ui/progress';

export const Insights: React.FC = () => {
  const { transactions } = useApp();

  const highestCategory = getHighestSpendingCategory(transactions);
  const monthlyComparison = getMonthlyComparison(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);

  const totalExpenses = categoryBreakdown.reduce((sum, cat) => sum + cat.value, 0);

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
        <h1 className="text-3xl font-bold mb-2">Insights</h1>
        <p className="text-muted-foreground">
          Understanding your spending patterns and trends
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Spending Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <Card className="transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Highest Spending Category</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{highestCategory.name}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Total spent: {formatCurrency(highestCategory.value)}
              </p>
              {totalExpenses > 0 && (
                <p className="text-sm text-muted-foreground">
                  {((highestCategory.value / totalExpenses) * 100).toFixed(1)}% of total expenses
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <Card className="transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Monthly Comparison</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-bold">{formatCurrency(monthlyComparison.current)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Month</span>
                  <span className="font-bold">{formatCurrency(monthlyComparison.previous)}</span>
                </div>
                <div className="pt-2 border-t">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, type: 'spring', stiffness: 200 }}
                    className={`flex items-center gap-2 ${
                      monthlyComparison.difference > 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      {monthlyComparison.difference > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                    </motion.div>
                    <span className="font-semibold">
                      {Math.abs(monthlyComparison.percentageChange).toFixed(1)}%
                    </span>
                    <span className="text-sm">
                      {monthlyComparison.difference > 0 ? 'increase' : 'decrease'}
                    </span>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Breakdown with Progress Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.01, y: -2 }}
      >
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryBreakdown.length > 0 ? (
              <div className="space-y-4">
                {categoryBreakdown.map((category, index) => {
                  const percentage = (category.value / totalExpenses) * 100;
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(category.value)} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No expense data available
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Observations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.01, y: -2 }}
      >
        <Card className="transition-shadow duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Key Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {highestCategory.value > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Your largest expense category is <strong>{highestCategory.name}</strong> with{' '}
                    {formatCurrency(highestCategory.value)} spent.
                  </span>
                </li>
              )}
              {monthlyComparison.percentageChange !== 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Your spending has{' '}
                    {monthlyComparison.difference > 0 ? 'increased' : 'decreased'} by{' '}
                    <strong>{Math.abs(monthlyComparison.percentageChange).toFixed(1)}%</strong>{' '}
                    compared to last month.
                  </span>
                </li>
              )}
              {categoryBreakdown.length >= 3 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Your top 3 spending categories are{' '}
                    <strong>
                      {categoryBreakdown
                        .slice(0, 3)
                        .map((c) => c.name)
                        .join(', ')}
                    </strong>
                    .
                  </span>
                </li>
              )}
              {totalExpenses > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Total expenses tracked: {formatCurrency(totalExpenses)} across{' '}
                    {categoryBreakdown.length} categories.
                  </span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};