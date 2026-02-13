import styled from 'styled-components';
import type { StyledProps } from './types';

export const StyledButton = styled.button<StyledProps>`
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  transition-duration: 0.5s;
  display: block;
  width: 100%;
  ${({ $primary, theme }) =>
    $primary &&
    `
      background-color: ${theme.colors.primaryColor};
      color: ${theme.colors.textLight};
    `}
  ${({ $secondary, theme }) =>
    $secondary &&
    `
      background-color: ${theme.colors.secondaryColor};
      color: ${theme.colors.textDark};
    `}
&:hover {
    ${({ $primary, theme }) =>
      $primary &&
      `
        background-color: ${theme.colors.secondaryColor};
        color: ${theme.colors.textDark};
      `}
    ${({ $secondary, theme }) =>
      $secondary &&
      `
        background-color: ${theme.colors.primaryColor};
        color: ${theme.colors.textLight};
      `}
  }
`;
