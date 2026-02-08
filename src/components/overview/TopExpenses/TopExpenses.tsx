import { useMemo } from 'react';
import { StyledRow, StyledTableSecondary } from '../../../styled/table';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../../services/expenses/expenses';

export default function TopExpenses({
  expenses,
  month,
  year,
}: {
  expenses: ExpenseData[];
  month: number;
  year: number;
}) {
  const topExpenses = useMemo(() => {
    const groupedExpensesByCategory = getTotalExpensesPerCategory(expenses);
    const copy = [...groupedExpensesByCategory];
    const topFiveExpenses = copy.sort((a, b) => b.cost - a.cost).slice(0, 5);
    return topFiveExpenses;
  }, [month, year, expenses]);

  return (
    <StyledTableSecondary>
      <thead>
        <tr>
          <th>Category</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {topExpenses.map((expense) => (
          <StyledRow key={expense.category}>
            <td>{expense.category}</td>
            <td>{expense.cost}</td>
          </StyledRow>
        ))}
      </tbody>
    </StyledTableSecondary>
  );
}
