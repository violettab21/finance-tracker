import { useContext, useEffect, useState } from 'react';
import {
  deleteExpense,
  editExpense,
  type ExpenseData,
} from '../../../../services/expenses/expenses';
import type { FormDataExpense } from '../../ExpenseForm/validation';
import { ExpensesContext } from '../../../../context/expensesContext';

export const useExpenseItem = (
  expenses: ExpenseData[],
  groupedExpense: { category: string; cost: number }
) => {
  const { setExpensesData } = useContext(ExpensesContext);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [details, setDetails] = useState<ExpenseData[]>();
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editItem, setEditItem] = useState<ExpenseData | null>(null);

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

      setExpensesData(userExpenses);
      setIsEditVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onExpenseDelete = async (item: ExpenseData) => {
    try {
      const userExpenses = await deleteExpense(item.id);
      setExpensesData(userExpenses);
    } catch (err) {
      console.log(err);
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
