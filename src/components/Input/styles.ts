import styled from 'styled-components';
import type { InputProps } from './Input';

export const StyledInput = styled.input<InputProps>`
  border: ${({ error, theme }) =>
    !error
      ? `${theme.colors.border} solid 1px;`
      : `${theme.colors.errorText} solid 1px;`};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.textLight};
  background-color: ${(props) => props.theme.colors.inputBackground};
  width: 100%;
  padding: 0.5rem 0.5rem;

  &:disabled {
    background: ${(props) => props.theme.colors.disabledField};
  }
`;

export const StyledErrorText = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.errorText};
  margin-top: 2px;
  margin-left: 2px;
`;
