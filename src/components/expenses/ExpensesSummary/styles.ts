import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';
import { colors } from '../../../styled/colors';

export const StyledSummary = styled(StyledFlexWrapper)`
  background-color: ${colors.summaryBackground};
  padding: 2rem;
  width: 50%;
  min-width: 100px;
  max-width: 250px;
  border-radius: 8px;
`;

export const StyledSummaryWrapper = styled(StyledFlexWrapper)`
  flex-wrap: wrap;
`;
