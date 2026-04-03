import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/calculations';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { TransactionForm } from './TransactionForm';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

type SortField = 'date' | 'amount' | 'category';
type SortOrder = 'asc' | 'desc';

export const TransactionList: React.FC = () => {
  const { transactions, filters, role, deleteTransaction } = useApp();
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter((txn) => txn.type === filters.type);
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((txn) => txn.category === filters.category);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (txn) =>
          txn.description.toLowerCase().includes(searchLower) ||
          txn.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filters
    if (filters.dateFrom) {
      filtered = filtered.filter((txn) => txn.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter((txn) => txn.date <= filters.dateTo);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, filters, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTransaction(undefined);
  };

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No transactions found</p>
        <p className="text-sm text-muted-foreground">
          {filters.search || filters.type !== 'all' || filters.category !== 'all'
            ? 'Try adjusting your filters'
            : 'Add your first transaction to get started'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1"
                >
                  Date
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('amount')}
                  className="flex items-center gap-1"
                >
                  Amount
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1"
                >
                  Category
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              {role === 'admin' && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredTransactions.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  layout
                  className="border-b"
                >
                  <TableCell>{formatDate(txn.date)}</TableCell>
                  <TableCell
                    className={
                      txn.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {txn.type === 'income' ? '+' : '-'}
                    {formatCurrency(txn.amount)}
                  </TableCell>
                  <TableCell>{txn.category}</TableCell>
                  <TableCell>
                    <Badge variant={txn.type === 'income' ? 'default' : 'secondary'}>
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.description}</TableCell>
                  {role === 'admin' && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(txn)}
                            aria-label="Edit transaction"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(txn.id)}
                            aria-label="Delete transaction"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </motion.div>
                      </div>
                    </TableCell>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {isFormOpen && (
        <TransactionForm
          open={isFormOpen}
          onOpenChange={handleFormClose}
          transaction={editingTransaction}
        />
      )}
    </>
  );
};