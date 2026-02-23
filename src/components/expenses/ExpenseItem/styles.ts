import styled from 'styled-components';

export const StyledControlVisibility = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const StyledDetailsTable = styled.table`
  width: 100%;
`;

export const StyledDetailsRow = styled.tr`
  display: flex;
  align-items: center;

  &:hover {
    background: ${(props) => props.theme.colors.tableRowBackground};
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
