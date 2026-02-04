import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ExpenseData } from '../services/expenses/expenses';
import type { Plan } from '../pages/Plans/Plans';

export const ExpensesContext = createContext<{
  expensesData: ExpenseData[];
  setExpensesData: Dispatch<SetStateAction<ExpenseData[]>>;
  isExpensesLoading: boolean;
  setIsExpensesLoading: Dispatch<SetStateAction<boolean>>;
  balance: number;
  plans: Plan[];
  setPlans: Dispatch<SetStateAction<Plan[]>>;
}>({
  expensesData: [],
  setExpensesData: () => {},
  isExpensesLoading: true,
  setIsExpensesLoading: () => {},
  balance: 0,
  plans: [],
  setPlans: () => {},
});
