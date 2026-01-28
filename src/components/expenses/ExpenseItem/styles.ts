import styled from 'styled-components';

export const StyledControl = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #f2f0f8;
`;

export const StyledDetailsTable = styled.table`
  width: 100%;
`;

export const StyledButtonIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;

export const StyledDetailsRow = styled.tr`
  display: flex;
  align-items: center;

  &:hover {
    background: #473b6d5d;
    border-radius: 8px;
  }
`;

export const StyledCost = styled.td`
  width: 20%;
  text-align: center;
`;

export const StyledDate = styled.td`
  width: 25%;
`;

export const StyledButtonsWrapper = styled.td`
  width: 15%;
  display: flex;
  gap: 10px;
`;

export const StyledNotes = styled.td`
  width: 30%;
`;

export const StyledRow = styled.tr`
  &:hover {
    background: #3c34585d;
    border-radius: 8px;
  }
`;
