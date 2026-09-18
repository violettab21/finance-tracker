import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledBlockWrapper = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.backgroundSection};
  padding: 2rem;
  border-radius: 8px;

  @media (max-width: 1280px) {
    width: 100%;
  }
`;

export const StyledImageWrapper = styled(StyledFlexWrapper)`
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledFormWrapper = styled(StyledFlexWrapper)`
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
