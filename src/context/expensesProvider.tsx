import { useContext, useEffect, useMemo, useState } from 'react';
import {
  getAllExpensesByUser,
  type ExpenseData,
} from '../services/expenses/expenses';
import { getTotalExpenses } from '../helpers/expenses';
import { ExpensesContext } from './expensesContext';
import { getAllPlansByUser } from '../services/plans/plans';
import type { Plan } from '../pages/Plans/Plans';
import { AuthContext } from './authContext';
import { FirebaseError } from 'firebase/app';
import { DATA_ERROR_TEXT, GENERIC_ERROR_TEXT } from '../constants/constants';

export default function ExpensesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expensesData, setExpensesData] = useState<ExpenseData[]>([]);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);
  const [isPlansLoading, setIsPlansLoading] = useState(true);
  const [expansesError, setExpansesError] = useState<string | null>(null);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const plans = await getAllPlansByUser();
        setPlans(plans);
        setIsPlansLoading(false);
      } catch (err) {
        if (err instanceof FirebaseError) {
          setPlansError(DATA_ERROR_TEXT);
        } else {
          setPlansError(GENERIC_ERROR_TEXT);
        }
        setIsPlansLoading(false);
      }
    };
    getPlans();
  }, [userData]);

  const balance = useMemo(() => {
    const totalExpenses = getTotalExpenses(
      expensesData.filter((expense) => expense.type === 'expense')
    );
    const totalIncomes = getTotalExpenses(
      expensesData.filter((expense) => expense.type === 'income')
    );

    return totalIncomes - totalExpenses;
  }, [expensesData, userData]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const expenses = await getAllExpensesByUser();
        setExpensesData(expenses);
        setIsExpensesLoading(false);
      } catch (err) {
        if (err instanceof FirebaseError) {
          setExpansesError(DATA_ERROR_TEXT);
        } else {
          setExpansesError(GENERIC_ERROR_TEXT);
        }
        setIsExpensesLoading(false);
      }
    };
    void getAll();
  }, [userData]);

  return (
    <ExpensesContext
      value={{
        expensesData,
        setExpensesData,
        isExpensesLoading,
        setIsExpensesLoading,
        expansesError,
        setExpansesError,
        plansError,
        setPlansError,
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
