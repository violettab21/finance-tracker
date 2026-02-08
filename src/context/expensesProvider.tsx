import { useEffect, useMemo, useState } from 'react';
import {
  getAllExpensesByUser,
  type ExpenseData,
} from '../services/expenses/expenses';
import { getTotalExpenses } from '../helpers/expenses';
import { ExpensesContext } from './expensesContext';
import { getAllPlansByUser } from '../services/plans/plans';
import type { Plan } from '../pages/Plans/Plans';

export default function ExpensesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expensesData, setExpensesData] = useState<ExpenseData[]>([]);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);
  const [isPlansLoading, setIsPlansLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const plans = await getAllPlansByUser();
        setPlans(plans);
        setIsPlansLoading(false);
      } catch {
        console.log('error');
        setIsPlansLoading(false);
      }
    };
    getPlans();
  }, []);

  const balance = useMemo(() => {
    const totalExpenses = getTotalExpenses(
      expensesData.filter((expense) => expense.type === 'expense')
    );
    const totalIncomes = getTotalExpenses(
      expensesData.filter((expense) => expense.type === 'income')
    );

    return totalIncomes - totalExpenses;
  }, [expensesData]);

  useEffect(() => {
    const getAll = async () => {
      const expenses = await getAllExpensesByUser();
      setExpensesData(expenses);
      setIsExpensesLoading(false);
    };
    void getAll();
  }, []);

  return (
    <ExpensesContext
      value={{
        expensesData,
        setExpensesData,
        isExpensesLoading,
        setIsExpensesLoading,
        balance,
        plans,
        setPlans,
        isPlansLoading,
      }}
    >
      {children}
    </ExpensesContext>
  );
}
