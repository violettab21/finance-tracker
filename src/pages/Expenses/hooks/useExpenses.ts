import { useCallback, useEffect, useState } from 'react';
import {
  addExpense,
  getExpensesByUser,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import type { FormDataExpense } from '../../../components/expenses/ExpenseForm/validation';

export const useExpenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModalIncome, setShowModalIncome] = useState(false);
  const [incomes, setIncomes] = useState<ExpenseData[]>([]);
  const [isIncomesLoading, setIsIncomesLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [saved, setSaved] = useState<number>(0);

  const getExpanses = useCallback(async () => {
    const userExpanses = await getExpensesByUser('expense');
    const filteredExpensesByMonth = userExpanses.filter(
      (expense) =>
        new Date(expense.date).getMonth() === month &&
        new Date(expense.date).getFullYear() === year
    );
    return filteredExpensesByMonth;
  }, [month, year]);

  const getIncomes = useCallback(async () => {
    const userExpanses = await getExpensesByUser('income');
    const filteredExpensesByMonth = userExpanses.filter(
      (expense) =>
        new Date(expense.date).getMonth() === month &&
        new Date(expense.date).getFullYear() === year
    );
    return filteredExpensesByMonth;
  }, [month, year]);

  function getTotalExpenses(expenses: ExpenseData[]) {
    const sum = expenses.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue.cost,
      0
    );
    return sum;
  }

  const getBalance = useCallback(async () => {
    const allExpenses = await getExpensesByUser('expense');
    const allIncomes = await getExpensesByUser('income');

    const totalExpenses = getTotalExpenses(allExpenses);
    const totalIncomes = getTotalExpenses(allIncomes);

    return totalIncomes - totalExpenses;
  }, []);

  const getSavedFromPreviousMonths = useCallback(async () => {
    const allExpenses = await getExpensesByUser('expense');
    const allIncomes = await getExpensesByUser('income');
    const filteredExpensesByMonth = allExpenses.filter(
      (expense) => new Date(expense.date) < new Date(year, month, 1)
    );
    const filteredIncomesByMonth = allIncomes.filter(
      (expense) => new Date(expense.date) < new Date(year, month, 1)
    );

    const totalExpenses = getTotalExpenses(filteredExpensesByMonth);
    const totalIncomes = getTotalExpenses(filteredIncomesByMonth);

    return totalIncomes - totalExpenses;
  }, [month, year]);

  useEffect(() => {
    getExpanses()
      .then((result) => {
        setExpenses(result);
        setIsExpensesLoading(false);
      })
      .catch((err) => console.log(err));
  }, [getExpanses, month, year]);

  const onExpenseCreate = async (data: FormDataExpense) => {
    try {
      await addExpense({
        category: data.category.value,
        type: 'expense',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userExpanses = await getExpanses();

      setExpenses(userExpanses);
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
      const userIncomes = await getIncomes();

      setIncomes(userIncomes);
      setShowModalIncome(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIncomes()
      .then((result) => {
        setIncomes(result);
        setIsIncomesLoading(false);
      })
      .catch((err) => console.log(err));
  }, [getIncomes, month, year]);

  useEffect(() => {
    getBalance()
      .then((result) => setBalance(result))
      .catch((err) => console.log(err));
  }, [expenses, incomes, getBalance]);

  useEffect(() => {
    getSavedFromPreviousMonths()
      .then((result) => {
        setSaved(result);
      })
      .catch((err) => console.log(err));
  }, [expenses, incomes, getSavedFromPreviousMonths]);

  return {
    isExpensesLoading,
    showModal,
    setShowModal,
    expenses,
    month,
    showModalIncome,
    setShowModalIncome,
    incomes,
    balance,
    getTotalExpenses,
    onExpenseCreate,
    onIncomeCreate,
    setExpenses,
    setIncomes,
    setMonth,
    isIncomesLoading,
    year,
    setYear,
    saved,
    getIncomes,
    getExpanses,
  };
};
