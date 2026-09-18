import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledSummary = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.summaryBackground};
  padding: 2rem;
  min-width: 100px;
  border-radius: 8px;
`;

export const StyledSummaryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
