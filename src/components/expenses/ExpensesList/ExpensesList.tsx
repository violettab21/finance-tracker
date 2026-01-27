import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { StyledTable } from './styles';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import type { Dispatch, SetStateAction } from 'react';

export default function ExpensesList({
  expenses,
  setExpenses,
}: {
  expenses: ExpenseData[];
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>;
}) {
  if (expenses.length === 0) {
    return <p>No expenses. Click Add Expense to start track your expanses.</p>;
  }

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th></th>
            <th>Category</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {getTotalExpensesPerCategory(expenses).map((expense) => (
            <ExpenseItem
              setExpenses={setExpenses}
              key={expense.category}
              expenses={expenses}
              groupedExpense={expense}
            />
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}
