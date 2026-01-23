import { Link } from 'react-router';
import styled from 'styled-components';
import { colors } from '../../styled/colors';

export const StyledNavLink = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
`;

export const StyledNavButton = styled.button`
  border: none;
  background: none;
  font-family: 'Poppins', sans-serif;
  color: ${colors.text};
  font-size: 16px;
  cursor: pointer;
`;
