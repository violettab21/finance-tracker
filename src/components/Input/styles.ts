import styled from 'styled-components';
import { colors } from '../../styled/colors';
import type { InputProps } from './Input';

export const StyledInput = styled.input<InputProps>`
  border: ${({ error }) =>
    !error ? `${colors.border} solid 1px;` : `${colors.errorText} solid 1px;`};
  border-radius: 4px;
  color: ${colors.textLight};
  background-color: ${colors.inputBackground};
  width: 100%;
  padding: 0.5rem 0.5rem;

  &:disabled {
    background: ${colors.disabledField};
  }
`;

export const StyledErrorText = styled.p`
  font-size: 0.8rem;
  color: ${colors.errorText};
  margin-top: 2px;
  margin-left: 2px;
`;
