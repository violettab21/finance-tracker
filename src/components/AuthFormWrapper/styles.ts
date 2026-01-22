import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';
import { colors } from '../../styled/colors';

export const StyledFormWrapper = styled(StyledFlexWrapper)`
  background-color: ${colors.formBackground};
  padding: 2rem;
  border-radius: 8px;
`;
