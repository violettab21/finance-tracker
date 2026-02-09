import styled from 'styled-components';
import { colors } from './colors';

export const StyledTable = styled.table`
  background-color: ${colors.tableBackground};
  border-radius: 8px;
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 1rem;
    text-align: center;
  }
`;

export const StyledTableSecondary = styled.table`
  border-radius: 8px;
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #a5a1b35d;
  }
`;

export const StyledRow = styled.tr`
  &:hover {
    background: #a5a1b35d;
    border-radius: 8px;
  }
`;
