import { useEffect, useMemo, useState } from 'react';
import {
  addExpense,
  getAllExpensesByUser,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import type { FormDataExpense } from '../../../components/expenses/ExpenseForm/validation';

export const useExpenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [allExpenses, setAllExpenses] = useState<ExpenseData[]>([]);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModalIncome, setShowModalIncome] = useState(false);

  const newExpenses = useMemo(() => {
    return allExpenses.filter(
      (expense) =>
        expense.type === 'expense' &&
        new Date(expense.date).getMonth() === month &&
        new Date(expense.date).getFullYear() === year
    );
  }, [allExpenses, month, year]);

  const newIncomes = useMemo(() => {
    return allExpenses.filter(
      (expense) =>
        expense.type === 'income' &&
        new Date(expense.date).getMonth() === month &&
        new Date(expense.date).getFullYear() === year
    );
  }, [allExpenses, month, year]);

  function getTotalExpenses(expenses: ExpenseData[]) {
    const sum = expenses.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue.cost,
      0
    );
    return sum;
  }

  const balance = useMemo(() => {
    const totalExpenses = getTotalExpenses(
      allExpenses.filter((expense) => expense.type === 'expense')
    );
    const totalIncomes = getTotalExpenses(
      allExpenses.filter((expense) => expense.type === 'income')
    );

    return totalIncomes - totalExpenses;
  }, [allExpenses]);

  const savedFromPreviousMonths = useMemo(() => {
    const filteredExpenses = allExpenses.filter(
      (expense) => expense.type === 'expense'
    );
    const filteredIncomes = allExpenses.filter(
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
  }, [month, year, allExpenses]);

  const onExpenseCreate = async (data: FormDataExpense) => {
    try {
      await addExpense({
        category: data.category.value,
        type: 'expense',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userExpanses = await getAllExpensesByUser();

      setAllExpenses(userExpanses);
      setShowModal(false);
    } catch (err) {
      console.log(err);
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

      setAllExpenses(userExpenses);
      setShowModalIncome(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAll = async () => {
      const expenses1 = await getAllExpensesByUser();
      setAllExpenses(expenses1);
      setIsExpensesLoading(false);
    };
    void getAll();
  }, [month, year]);

  return {
    isExpensesLoading,
    showModal,
    setShowModal,
    expenses,
    month,
    showModalIncome,
    setShowModalIncome,
    balance,
    getTotalExpenses,
    onExpenseCreate,
    onIncomeCreate,
    setExpenses,
    setMonth,
    year,
    setYear,
    allExpenses,
    newExpenses,
    newIncomes,
    setAllExpenses,
    savedFromPreviousMonths,
  };
};
