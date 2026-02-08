import type { FormDataExpense } from '../components/expenses/ExpenseForm/validation';
import { MONTHS } from '../constants/constants';
import type { Plan } from '../pages/Plans/Plans';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../services/expenses/expenses';

export function getTotalExpenses(expenses: ExpenseData[]) {
  const sum = expenses.reduce(
    (accumulator, currentValue) => +accumulator + +currentValue.cost,
    0
  );
  return sum;
}

export function checkIfPlanReached(
  fullExpensesList: ExpenseData[],
  fullPLans: Plan[],
  editItem: ExpenseData | null,
  data: FormDataExpense
) {
  const specificExpenses = fullExpensesList.filter(
    (expense) =>
      expense.type === 'expense' &&
      new Date(expense.date).getMonth() === new Date(data.date).getMonth() &&
      new Date(expense.date).getFullYear() === new Date(data.date).getFullYear()
  );
  const groupedExpenses = getTotalExpensesPerCategory(specificExpenses);
  const plannedExpense =
    fullPLans.find(
      (plan) =>
        Number(MONTHS.findIndex((month) => plan.month === month.value)) ===
          new Date(data.date).getMonth() &&
        Number(plan.year) === new Date(data.date).getFullYear() &&
        plan.category === data.category.value
    )?.cost || null;

  const currentExpenseForCategory =
    groupedExpenses.find((expense) => expense.category === data.category.value)
      ?.cost || 0;
  if (
    !editItem &&
    plannedExpense !== null &&
    plannedExpense < currentExpenseForCategory + data.cost &&
    plannedExpense
  ) {
    return true;
  } else if (
    editItem &&
    plannedExpense !== null &&
    plannedExpense < currentExpenseForCategory + data.cost - editItem.cost
  ) {
    return true;
  }

  return false;
}
