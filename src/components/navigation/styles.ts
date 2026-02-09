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
    background-color: #7979884d;
    border-radius: 8px;
  }
`;

export const StyledNavButton = styled.button`
  border: none;
  background: none;
  font-family: 'Poppins', sans-serif;
  color: ${colors.textLight};
  font-size: 16px;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    background-color: #7979884d;
    border-radius: 8px;
  }
`;
