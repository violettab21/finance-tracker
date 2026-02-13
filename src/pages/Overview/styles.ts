import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledChartWrapper = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.summaryBackground};
  border-radius: 10px;
  min-width: 300px;
  padding: 1rem;
`;

export const StyledOverviewWrapper = styled(StyledFlexWrapper)`
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  align-items: stretch;
`;
