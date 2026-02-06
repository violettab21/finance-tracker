import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledChartWrapper = styled(StyledFlexWrapper)`
  background-color: #3d3d4f;
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
