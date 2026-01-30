import type { ExpenseData } from '../services/expenses/expenses';

export function getTotalExpenses(expenses: ExpenseData[]) {
  const sum = expenses.reduce(
    (accumulator, currentValue) => +accumulator + +currentValue.cost,
    0
  );
  return sum;
}
