import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionList } from '../components/TransactionList';
import { TransactionFilters } from '../components/TransactionFilters';
import { TransactionForm } from '../components/TransactionForm';
import { Button } from '../components/ui/button';
import { Plus, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { motion } from 'motion/react';

export const Transactions: React.FC = () => {
  const { role, exportTransactions } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportTransactions('csv')}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportTransactions('json')}>
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
          {role === 'admin' && (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <TransactionFilters />

      <TransactionList />

      {isFormOpen && (
        <TransactionForm open={isFormOpen} onOpenChange={setIsFormOpen} />
      )}
    </motion.div>
  );
};