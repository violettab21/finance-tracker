import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';
import { colors } from '../../styled/colors';

export const StyledLoaderWrapper = styled(StyledFlexWrapper)`
  height: 100%;
`;

export const StyledLoader = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${colors.loader};
  border-top-color: white;
  animation: loading 1s linear infinite;
  margin: 1rem;

  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
