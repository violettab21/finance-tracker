import styled from 'styled-components';

export const StyledTable = styled.table`
  background-color: #737388;
  border-radius: 8px;
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 1rem;
    text-align: center;
  }
`;

export const StyledRow = styled.tr`
  &:hover {
    background: #3c34585d;
    border-radius: 8px;
  }
`;
