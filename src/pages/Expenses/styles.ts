import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledButtonExpense = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 30%;
  min-width: 250px;

  @media (max-width: 1028px) {
    width: 100%;
  }
`;

export const StyledExpensesWrapper = styled(StyledFlexWrapper)`
  padding: 1rem;
  overflow: auto;

  @media (max-width: 728px) {
    padding: 0.5rem;
  }
`;

export const StyledExpensesTablesWrapper = styled(StyledFlexWrapper)`
  @media (max-width: 1028px) {
    flex-direction: column;
  }
`;
