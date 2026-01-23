import styled from 'styled-components';
import { colors } from '../../styled/colors';
export const StyledSelect = styled.select`
  border-radius: 4px;
  color: ${colors.text};
  background-color: ${colors.inputBackground};
  width: 100%;
  padding: 0.5rem 2rem;
`;
export const StyledErrorText = styled.p`
  font-size: 0.8rem;
  color: #ca3e3e;
  margin-top: 2px;
  margin-left: 2px;
`;
