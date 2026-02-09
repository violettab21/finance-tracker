import { useContext, useMemo, useState } from 'react';
import {
  addExpense,
  getAllExpensesByUser,
} from '../../../services/expenses/expenses';
import type { FormDataExpense } from '../../../components/expenses/ExpenseForm/validation';
import { ExpensesContext } from '../../../context/expensesContext';
import {
  checkIfPlanReached,
  getTotalExpenses,
} from '../../../helpers/expenses';
import { ToastContext } from '../../../context/toastContext';

export const useExpenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const { expensesData, setExpensesData } = useContext(ExpensesContext);
  const [showModalIncome, setShowModalIncome] = useState(false);
  const { plans } = useContext(ExpensesContext);
  const { showToast } = useContext(ToastContext);

  const expenses = useMemo(() => {
    return expensesData.filter(
      (expense) =>
        expense.type === 'expense' &&
        new Date(expense.date).getMonth() === month &&
        new Date(expense.date).getFullYear() === year
    );
  }, [expensesData, month, year]);

  const incomes = useMemo(() => {
    return expensesData.filter(
      (expense) =>
        expense.type === 'income' &&
        new Date(expense.date).getMonth() === month &&
        new Date(expense.date).getFullYear() === year
    );
  }, [expensesData, month, year]);

  const onExpenseCreate = async (data: FormDataExpense) => {
    try {
      await addExpense({
        category: data.category.value,
        type: 'expense',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userExpenses = await getAllExpensesByUser();
      if (checkIfPlanReached(expensesData, plans, null, data)) {
        showToast({
          type: 'warning',
          message: `Plan limit is reached for ${data.category.value} category. Please review your plans and expenses.`,
        });
      }
      setExpensesData(userExpenses);
      setShowModal(false);
    } catch {
      showToast({ type: 'error', message: 'Error occurred during creation' });
    }
  };

  const onIncomeCreate = async (data: FormDataExpense) => {
    try {
      await addExpense({
        category: data.category.value,
        type: 'income',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userExpenses = await getAllExpensesByUser();

      setExpensesData(userExpenses);
      setShowModalIncome(false);
    } catch {
      showToast({ type: 'error', message: 'Error occurred during creation' });
    }
  };

  const savedFromPreviousMonths = useMemo(() => {
    const filteredExpenses = expensesData.filter(
      (expense) => expense.type === 'expense'
    );
    const filteredIncomes = expensesData.filter(
      (expense) => expense.type === 'income'
    );
    const filteredExpensesByMonth = filteredExpenses.filter(
      (expense) => new Date(expense.date) < new Date(year, month, 1)
    );
    const filteredIncomesByMonth = filteredIncomes.filter(
      (expense) => new Date(expense.date) < new Date(year, month, 1)
    );

    const totalExpenses = getTotalExpenses(filteredExpensesByMonth);
    const totalIncomes = getTotalExpenses(filteredIncomesByMonth);

    return totalIncomes - totalExpenses;
  }, [month, year, expensesData]);

  return {
    showModal,
    setShowModal,
    showModalIncome,
    setShowModalIncome,
    onExpenseCreate,
    onIncomeCreate,
    month,
    setMonth,
    year,
    setYear,
    expenses,
    incomes,
    savedFromPreviousMonths,
  };
};
