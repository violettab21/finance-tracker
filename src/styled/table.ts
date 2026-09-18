import styled from 'styled-components';

export const StyledTable = styled.table`
  background-color: ${(props) => props.theme.colors.tableBackground};
  border-radius: 8px;
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 1rem;
    text-align: center;
    @media (max-width: 768px) {
      padding: 0.5rem;
    }
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
    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  }
`;

export const StyledRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: #a5a1b35d;
    border-radius: 8px;
  }
`;
