import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledTopNavbar = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.navigationBackground};
  align-items: center;
  padding: 1rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
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
