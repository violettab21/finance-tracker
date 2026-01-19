import styled from 'styled-components';
import type { StyledButtonType } from './types';
import { colors } from '../../styled/colors';

export const StyledButton = styled.button<StyledButtonType>`
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  transition-duration: 0.5s;
  ${(props) =>
    props.primary &&
    `background-color: ${colors.primary}; color: ${colors.backgroundLight};`}
  ${(props) =>
    props.secondary &&
    `background-color: ${colors.secondary};color: ${colors.backgroundDark};`}
&:hover {
    ${(props) =>
      props.primary &&
      `background-color: ${colors.secondary}; color: ${colors.backgroundDark};`}
    ${(props) =>
      props.secondary &&
      `background-color: ${colors.primary}; color: ${colors.backgroundLight};`}
  }
`;
