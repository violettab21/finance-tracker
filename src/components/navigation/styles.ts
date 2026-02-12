import { Link } from 'react-router';
import styled from 'styled-components';
import { colors } from '../../styled/colors';

export const StyledNavLink = styled(Link)`
  color: ${colors.textLight};
  text-decoration: none;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  width: 100%;
  display: inline-block;

  &:hover {
    background-color: ${colors.navigationHover};
    border-radius: 8px;
  }
`;

export interface StyledNavButtonProps {
  selected?: boolean;
}

export const StyledNavButton = styled.button<StyledNavButtonProps>`
  border: none;
  background: ${(props) => (props.selected ? colors.backgroundDark : 'none;')};
  font-family: 'Poppins', sans-serif;
  color: ${colors.textLight};
  font-size: 16px;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  text-align: start;

  &:hover {
    background-color: ${colors.navigationHover};
    border-radius: 8px;
  }
`;
