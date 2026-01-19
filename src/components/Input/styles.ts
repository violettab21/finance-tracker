import styled from 'styled-components';
import { colors } from '../../styled/colors';

export const StyledInput = styled.input`
  border: ${colors.border} solid 1px;
  border-radius: 4px;
  color: ${colors.text};
  background-color: ${colors.inputBackground};
  width: 100%;
  padding: 0.5rem 2rem;
`;
