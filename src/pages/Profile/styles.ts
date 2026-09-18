import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledProfileWrapper = styled(StyledFlexWrapper)`
  width: 40%;
  min-width: 350px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
