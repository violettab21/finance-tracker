import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';
import { colors } from '../../../styled/colors';

export const StyledTopNavbar = styled(StyledFlexWrapper)`
  background-color: ${colors.navigationBackground};
  align-items: center;
  padding: 1rem;
`;

export const StyledTopNavbarList = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 20px;
  align-items: center;
`;

export const StyledLogo = styled.p`
  padding: 1rem;
`;
