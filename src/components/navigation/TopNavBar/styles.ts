import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledTopNavbar = styled(StyledFlexWrapper)`
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 10vh;
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
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledLogo = styled.p`
  padding: 1rem;
`;

export const StyledHamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const StyledHamburgerMenu = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: ${(props) => props.theme.colors.navigationBackground};

  z-index: 1000;
  padding: 1rem;
  ul {
    list-style: none;
  }
`;
