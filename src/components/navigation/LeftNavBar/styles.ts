import styled from 'styled-components';
import { colors } from '../../../styled/colors';

export const StyledLeftNavBar = styled.div`
  background-color: ${colors.navigationBackground};
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul {
    list-style-type: none;
  }
`;
