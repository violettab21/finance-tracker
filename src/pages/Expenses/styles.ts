import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { StyledFlexWrapper } from '../../styled/flex';
import ExpensesSummary from '../../components/expenses/ExpensesSummary/ExpensesSummary';

export const StyledButtonExpense = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 30%;
`;

export const StyledExpensesWrapper = styled(StyledFlexWrapper)`
  padding: 1rem;
  overflow: auto;
`;

export const StyledSummaryExpenses = styled(ExpensesSummary)`
  justify-content: center;
  align-items: center;
`;
