import { useContext, useEffect, useState } from 'react';
import {
  deleteExpense,
  editExpense,
  type ExpenseData,
} from '../../../../services/expenses/expenses';
import type { FormDataExpense } from '../../ExpenseForm/validation';
import { ExpensesContext } from '../../../../context/expensesContext';
import { ToastContext } from '../../../../context/toastContext';
import { checkIfPlanReached } from '../../../../helpers/expenses';

export const useExpenseItem = (
  expenses: ExpenseData[],
  groupedExpense: { category: string; cost: number }
) => {
  const { expensesData, setExpensesData, plans } = useContext(ExpensesContext);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [details, setDetails] = useState<ExpenseData[]>();
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editItem, setEditItem] = useState<ExpenseData | null>(null);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const getCategoryDetails = () => {
      const data = expenses.filter((expenseData) => {
        return expenseData.category === groupedExpense.category;
      });
      setDetails(data);
    };
    getCategoryDetails();
  }, [expenses, groupedExpense.category]);

  const onExpenseUpdate = async (data: FormDataExpense) => {
    try {
      const userExpenses = await editExpense({
        id: editItem?.id || '',
        type: editItem?.type || 'income',
        category: data.category.value,
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      if (checkIfPlanReached(expensesData, plans, editItem, data)) {
        showToast({
          type: 'warning',
          message: `Plan limit is reached for ${data.category.value} category. Please review your plans and expenses.`,
        });
      }
      setExpensesData(userExpenses);
      setIsEditVisible(false);
    } catch {
      showToast({ type: 'error', message: 'Error occurred during update' });
    }
  };

  const onExpenseDelete = async (item: ExpenseData) => {
    try {
      const userExpenses = await deleteExpense(item.id);
      setExpensesData(userExpenses);
    } catch {
      showToast({ type: 'error', message: 'Error occurred during delete' });
    }
  };

  const openEditModal = (item: ExpenseData) => {
    setIsEditVisible(true);
    setEditItem(item);
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return {
    onExpenseUpdate,
    onExpenseDelete,
    openEditModal,
    toggleDetailsVisibility,
    setIsEditVisible,
    isDetailsVisible,
    details,
    isEditVisible,
    editItem,
  };
};
