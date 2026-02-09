import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ExpenseData } from '../services/expenses/expenses';
import type { Plan } from '../pages/Plans/Plans';

export const ExpensesContext = createContext<{
  expensesData: ExpenseData[];
  setExpensesData: Dispatch<SetStateAction<ExpenseData[]>>;
  isExpensesLoading: boolean;
  setIsExpensesLoading: Dispatch<SetStateAction<boolean>>;
  expansesError: string | null;
  setExpansesError: Dispatch<SetStateAction<string | null>>;
  plansError: string | null;
  setPlansError: Dispatch<SetStateAction<string | null>>;
  balance: number;
  plans: Plan[];
  setPlans: Dispatch<SetStateAction<Plan[]>>;
  isPlansLoading: boolean;
}>({
  expensesData: [],
  setExpensesData: () => {},
  isExpensesLoading: true,
  isPlansLoading: true,
  setIsExpensesLoading: () => {},
  expansesError: null,
  setExpansesError: () => {},
  plansError: null,
  setPlansError: () => {},
  balance: 0,
  plans: [],
  setPlans: () => {},
});
