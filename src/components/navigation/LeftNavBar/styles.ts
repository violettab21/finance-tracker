import styled from 'styled-components';
import { MdExpandCircleDown } from 'react-icons/md';

interface NavProps {
  isCollapsed: boolean;
}

export const StyledLeftNavBar = styled.div<NavProps>`
  position: relative;
  background-color: ${(props) => props.theme.colors.navigationBackground};
  padding: ${(props) => (props.isCollapsed ? '0' : '1rem')};
  padding-top: 1rem;
  width: ${(props) => (props.isCollapsed ? '60px' : '300px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: ${({ theme }) => `1px solid ${theme.colors.border}`};

  ul {
    list-style-type: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledExpand = styled(MdExpandCircleDown)`
  rotate: -90deg;
  position: absolute;
  right: 0px;
  cursor: pointer;
`;

export const StyledCollapse = styled(MdExpandCircleDown)`
  rotate: 90deg;
  position: absolute;
  right: 0px;
  cursor: pointer;
`;
