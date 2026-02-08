import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  min-height: 90vh;
  flex-grow: 1;
`;

export const StyledPageWrapper = styled(StyledFlexWrapper)`
  padding: 1rem;
  overflow-y: auto;
`;
