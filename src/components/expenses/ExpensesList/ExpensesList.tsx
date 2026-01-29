import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { StyledTable } from './styles';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import type { Dispatch, SetStateAction } from 'react';
import { StyledFlexWrapper } from '../../../styled/flex';
import Loader from '../../Loader/Loader';

export default function ExpensesList({
  expenses,
  setExpenses,
  isLoading,
  getExpenses,
}: {
  expenses: ExpenseData[];
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>;
  isLoading: boolean;
  getExpenses: () => Promise<ExpenseData[]>;
}) {
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
              setExpenses={setExpenses}
              key={expense.category}
              expenses={expenses}
              groupedExpense={expense}
              getExpenses={getExpenses}
            />
          ))}
        </tbody>
      </StyledTable>
    </StyledFlexWrapper>
  );
}
