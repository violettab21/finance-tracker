import styled from 'styled-components';
import type { StyledProps } from './types';
import { colors } from '../../styled/colors';

export const StyledButton = styled.button<StyledProps>`
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  transition-duration: 0.5s;
  display: block;
  width: 100%;
  ${({ $primary }) =>
    $primary &&
    `
      background-color: ${colors.primaryColor};
      color: ${colors.backgroundLight};
    `}
  ${({ $secondary }) =>
    $secondary &&
    `
      background-color: ${colors.secondaryColor};
      color: ${colors.backgroundDark};
    `}
&:hover {
    ${({ $primary }) =>
      $primary &&
      `
        background-color: ${colors.secondaryColor};
        color: ${colors.backgroundDark};
      `}
    ${({ $secondary }) =>
      $secondary &&
      `
        background-color: ${colors.primaryColor};
        color: ${colors.backgroundLight};
      `}
  }
`;
