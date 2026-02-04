import { useContext, useMemo, useState } from 'react';
import {
  addExpense,
  getAllExpensesByUser,
  getTotalExpensesPerCategory,
} from '../../../services/expenses/expenses';
import type { FormDataExpense } from '../../../components/expenses/ExpenseForm/validation';
import { ExpensesContext } from '../../../context/expensesContext';
import { getTotalExpenses } from '../../../helpers/expenses';
import { months } from '../../../components/TimePeriodSection/TimePeriodSection';

export const useExpenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const { expensesData, setExpensesData } = useContext(ExpensesContext);
  const [showModalIncome, setShowModalIncome] = useState(false);
  const { plans } = useContext(ExpensesContext);
  const [planWarning, setPlanWarning] = useState<string | null>(null);

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
      const specificExpenses = expensesData.filter(
        (expense) =>
          expense.type === 'expense' &&
          new Date(expense.date).getMonth() ===
            new Date(data.date).getMonth() &&
          new Date(expense.date).getFullYear() ===
            new Date(data.date).getFullYear()
      );
      const groupedExpenses = getTotalExpensesPerCategory(specificExpenses);
      console.log(groupedExpenses);

      const plannedExpense =
        plans.find(
          (plan) =>
            Number(months.findIndex((month) => plan.month === month.value)) ===
              new Date(data.date).getMonth() &&
            Number(plan.year) === new Date(data.date).getFullYear() &&
            plan.category === data.category.value
        )?.cost || 0;
      console.log(plannedExpense);

      const currentExpenseForCategory =
        groupedExpenses.find(
          (expense) => expense.category === data.category.value
        )?.cost || 0;
      console.log(currentExpenseForCategory);

      if (plannedExpense < currentExpenseForCategory + data.cost) {
        setPlanWarning('Plan limit is reached');
      } else {
        await addExpense({
          category: data.category.value,
          type: 'expense',
          cost: data.cost,
          date: data.date,
          notes: data.notes,
        });
        const userExpenses = await getAllExpensesByUser();

        setExpensesData(userExpenses);
        setShowModal(false);
      }
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

      setExpensesData(userExpenses);
      setShowModalIncome(false);
    } catch (err) {
      console.log(err);
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
    planWarning,
    setPlanWarning,
  };
};
