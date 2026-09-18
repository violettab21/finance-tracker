import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledChartWrapper = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.summaryBackground};
  border-radius: 10px;
  min-width: 350px;
  padding: 1rem;
`;

export const StyledOverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2.5fr;
  gap: 1rem;
  align-items: stretch;

  @media (max-width: 1440px) {
    grid-template-columns: 1fr;
  }
`;
