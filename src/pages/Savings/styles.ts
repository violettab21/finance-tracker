import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';
import { colors } from '../../styled/colors';

export const StyledSavingSummary = styled(StyledFlexWrapper)`
  gap: 1rem;
`;

export const StyledSavedTableWrapper = styled(StyledFlexWrapper)`
  background-color: ${colors.tableBackground};
  padding: 1rem;
  border-radius: 8px;
`;
