import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledTopNavbar = styled(StyledFlexWrapper)`
  background-color: #3d3d4f;
  align-items: center;
  padding: 0.5rem;
`;

export const StyledTopNavbarList = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 20px;
  align-items: center;
`;
