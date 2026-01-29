import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  deleteExpense,
  editExpense,
  type ExpenseData,
} from '../../../../services/expenses/expenses';
import type { FormDataExpense } from '../../ExpenseForm/validation';

export const useExpenseItem = (
  expenses: ExpenseData[],
  groupedExpense: { category: string; cost: number },
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>,
  getExpenses: () => Promise<ExpenseData[]>
) => {
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
    console.log(data);
    try {
      await editExpense({
        id: editItem?.id || '',
        type: editItem?.type || 'income',
        category: data.category.value,
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userExpanses = await getExpenses();
      setExpenses(userExpanses);
      setIsEditVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onExpenseDelete = async (item: ExpenseData) => {
    await deleteExpense(item.id, item.type);
    const userExpanses = await getExpenses();
    setExpenses(userExpanses);
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
