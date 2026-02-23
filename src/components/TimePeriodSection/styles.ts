import styled from 'styled-components';

export const StyledButtonMonth = styled.button`
  background: ${(props) => props.theme.colors.inputBackground};
  cursor: pointer;
  padding: 0 10px;
  color: #ffffff;
  border-color: #cccccc;
  border-radius: 4px;
  border-style: ridge;
`;
