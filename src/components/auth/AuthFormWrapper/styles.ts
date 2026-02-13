import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledFormWrapper = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.formBackground};
  padding: 2rem;
  border-radius: 8px;
`;
