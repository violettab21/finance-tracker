import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ExpenseData } from '../services/expenses/expenses';

export const ExpensesContext = createContext<{
  expensesData: ExpenseData[];
  setExpensesData: Dispatch<SetStateAction<ExpenseData[]>>;
  isExpensesLoading: boolean;
  setIsExpensesLoading: Dispatch<SetStateAction<boolean>>;
  balance: number;
}>({
  expensesData: [],
  setExpensesData: () => {},
  isExpensesLoading: true,
  setIsExpensesLoading: () => {},
  balance: 0,
});
