import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledSummary = styled(StyledFlexWrapper)`
  background-color: #3d3d4f;
  padding: 2rem;
  width: 50%;
  min-width: 100px;
  max-width: 250px;
  border-radius: 8px;
`;

export const StyledSummaryWrapper = styled(StyledFlexWrapper)`
  flex-wrap: wrap;
`;
