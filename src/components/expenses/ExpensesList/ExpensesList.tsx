import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { StyledTable } from './styles';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import { StyledFlexWrapper } from '../../../styled/flex';
import Loader from '../../Loader/Loader';

interface ExpensesListProps {
  expenses: ExpenseData[];
  isLoading: boolean;
}

export default function ExpensesList({
  expenses,
  isLoading,
}: ExpensesListProps) {
  if (isLoading) {
    return <Loader />;
  }

  if (expenses.length === 0) {
    return <p>No Data</p>;
  }

  return (
    <StyledFlexWrapper width="100%">
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
              key={expense.category}
              expenses={expenses}
              groupedExpense={expense}
            />
          ))}
        </tbody>
      </StyledTable>
    </StyledFlexWrapper>
  );
}
