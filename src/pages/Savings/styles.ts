import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledSavingSummary = styled(StyledFlexWrapper)`
  gap: 1rem;
`;

export const StyledSavedTableWrapper = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.tableBackground};
  padding: 1rem;
  border-radius: 8px;
`;
