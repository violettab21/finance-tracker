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

  li {
    cursor: pointer;
    transition: all 0.3s ease-out;
    padding: 0.5rem;
  }

  li:hover {
    background-color: #7979884d;
    border-radius: 8px;
  }
`;
